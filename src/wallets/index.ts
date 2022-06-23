import { Transaction, TransactionSigner } from "algosdk";
import { ImplementedWallets, IWallet, Networks, PopupPermissionCallback, SignedTxn, StorageKeys, Wallets } from "../_types";
import { WalletFactory } from "./WalletFactory";

function isImplementedWallet(wallet: Wallets | ImplementedWallets): wallet is ImplementedWallets {
    return (wallet as ImplementedWallets) !== undefined;
}
export class DynamicWallet {
    network: Networks;
    popupPermissionCallback?: PopupPermissionCallback;
    wallet: IWallet;
    walletChoice: Wallets;

    constructor(
        network?: Networks,
        walletChoice?: Wallets,
        popupPermissionCallback?: PopupPermissionCallback,
    ) {
        if (!network && !(network in Object.keys(Networks).values())) {
            this.network = this.storedNetworkPreference();
        }
        if (network) this.network = network;

        if (walletChoice) this.setStoredWalletChoice(walletChoice);
        this.walletChoice = this.storedWalletPreference();

        if (popupPermissionCallback) this.popupPermissionCallback = popupPermissionCallback;
        // this.wallet = WalletFactory.createWallet(this.network, this.walletChoice);
        if (!isImplementedWallet(this.walletChoice)) {
            this.walletChoice = Wallets.PeraWallet;
        }
        this.wallet = WalletFactory.create(this.network, this.walletChoice);

        this.popupPermissionCallback = popupPermissionCallback;
        this.wallet.permissionCallback = this.popupPermissionCallback;
        this.wallet.accounts = this.storedAccountList();
        this.wallet.defaultAccount = this.storedAccountPreference();
        console.log(this.wallet);
    }

    async connect(): Promise<boolean> {
        if (this.wallet === undefined) return false;

        switch (this.walletChoice) {
            case Wallets.PeraWallet:
                await this.wallet.connect((acctList: string[]) => {
                    this.setStoredAccountList(acctList);
                    console.log(acctList);
                    this.wallet.defaultAccount = this.storedAccountPreference();
                });

                return true;

            default:
                if (await this.wallet.connect()) {
                    this.setStoredAccountList(this.wallet.accounts);
                    this.wallet.defaultAccount = this.storedAccountPreference();
                    return true;
                }
                break;
        }
        this.setStoredWalletChoice(this.walletChoice);
        // Fail
        this.disconnect();
        return false;
    }

    connected(): boolean {
        return this.wallet !== undefined && this.wallet.isConnected();
    }

    getSigner(): TransactionSigner {
        return (txnGroup: Transaction[], indexesToSign?: number[]) => {
            if (indexesToSign) {
                txnGroup = txnGroup.filter(
                    (_txn, index) => !indexesToSign.includes(index));
            }
            return Promise.resolve(this.signTxn(txnGroup)).then((txns) => {
                return txns.map((tx) => {
                    return tx.blob;
                });
            });
        };
    }

    setStoredAccountList(accts: string[]) {
        localStorage.setItem(StorageKeys.ACCOUNT_LIST, JSON.stringify(accts));
    }

    storedAccountList(): string[] {
        const accts = localStorage.getItem(StorageKeys.ACCOUNT_LIST);
        return accts === "" || accts === null ? [] : JSON.parse(accts);
    }

    setStoredAccountPreference(idx: number) {
        this.wallet.defaultAccount = idx;
        localStorage.setItem(StorageKeys.ACCOUNT_PREFERENCE, idx.toString());
    }

    storedAccountPreference(): number {
        const idx = localStorage.getItem(StorageKeys.ACCOUNT_PREFERENCE);
        return idx === null || idx === "" ? 0 : parseInt(idx, 10);
    }

    setStoredWalletChoice(walletChoice: Wallets) {
        localStorage.setItem(StorageKeys.WALLET_PREFERENCE, walletChoice);
    }

    storedWalletPreference(): Wallets {
        const wp = localStorage.getItem(StorageKeys.WALLET_PREFERENCE) as Wallets;
        return wp === null ? Wallets.DISCONNECTED : wp;
    }

    setStoredNetworkPreference(networkChoice?: Networks) {
        if (!networkChoice) networkChoice = Networks.TestNet;
        localStorage.setItem(StorageKeys.NETWORK_PREFERENCE, networkChoice);
    }

    storedNetworkPreference(): Networks {
        const wp = localStorage.getItem(StorageKeys.NETWORK_PREFERENCE) as Networks;
        return wp === null ? Networks.TestNet : wp;
    }

    flushLocalStorage() {
        localStorage.clear();
    }

    disconnect() {
        if (this.wallet !== undefined) {
            this.wallet.disconnect();
        }
        this.flushLocalStorage();
    }

    getDefaultAccount(): string {
        if (!this.connected()) return "";
        return this.wallet.getDefaultAccount();
    }

    async signTxn(txns: Transaction[]): Promise<SignedTxn[]> {
        if (!this.connected() && !(await this.connect())) return [];
        return this.wallet.signTxn(txns);
    }
};

