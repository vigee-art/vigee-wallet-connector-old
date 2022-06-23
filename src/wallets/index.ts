import { Transaction, TransactionSigner } from "algosdk";
import { IWallet, Networks, PopupPermissionCallback, SignedTxn, StorageKeys, Wallets } from "../_types";
import { WalletFactory } from "./WalletFactory";

// export const allowedWallets = {
//     "PeraWallet": PeraWallet,
//     "AlgoSignerWallet": AlgoSignerWallet,
//     "MyAlgoWallet": MyAlgoWallet
// };

export class DynamicWallet {
    network: Networks;
    popupPermissionCallback?: PopupPermissionCallback;
    wallet: IWallet;
    walletChoice: Wallets;

    constructor(
        network?: Networks,
        popupPermissionCallback?: PopupPermissionCallback,
        walletChoice?: Wallets,
    ) {
        if (!network && !(network in Object.keys(Networks).values())) {
            this.network = this.networkPreference();
        }
        this.walletChoice = this.walletPreference();

        if (network) this.network = network;
        if (walletChoice) this.walletChoice = walletChoice;
        if (popupPermissionCallback) this.popupPermissionCallback = popupPermissionCallback;

        // this.wallet = WalletFactory.createWallet(this.network, this.walletChoice);
        this.wallet = WalletFactory.createWallet(this.network, this.walletChoice);
        this.popupPermissionCallback = popupPermissionCallback;
        this.wallet.permissionCallback = this.popupPermissionCallback;
        this.wallet.accounts = this.accountList();
        this.wallet.defaultAccount = this.accountIndex();
        console.log(this.wallet);
    }

    async connect(): Promise<boolean> {
        if (this.wallet === undefined) return false;

        switch (this.walletChoice) {
            case Wallets.PeraWallet:
                await this.wallet.connect((acctList: string[]) => {
                    this.setAccountList(acctList);
                    console.log(acctList);
                    this.wallet.defaultAccount = this.accountIndex();
                });

                return true;

            default:
                if (await this.wallet.connect()) {
                    this.setAccountList(this.wallet.accounts);
                    this.wallet.defaultAccount = this.accountIndex();
                    return true;
                }

                break;
        }

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

    setAccountList(accts: string[]) {
        sessionStorage.setItem(StorageKeys.ACCOUNT_LIST, JSON.stringify(accts));
    }

    accountList(): string[] {
        const accts = sessionStorage.getItem(StorageKeys.ACCOUNT_LIST);
        return accts === "" || accts === null ? [] : JSON.parse(accts);
    }

    setAccountIndex(idx: number) {
        this.wallet.defaultAccount = idx;
        sessionStorage.setItem(StorageKeys.ACCOUNT_PREFERENCE, idx.toString());
    }

    accountIndex(): number {
        const idx = sessionStorage.getItem(StorageKeys.ACCOUNT_PREFERENCE);
        return idx === null || idx === "" ? 0 : parseInt(idx, 10);
    }

    setWalletPreference(walletChoice: Wallets) {
        sessionStorage.setItem(StorageKeys.WALLET_PREFERENCE, walletChoice);
    }

    walletPreference(): Wallets {
        const wp = sessionStorage.getItem(StorageKeys.WALLET_PREFERENCE) as Wallets | null;
        return wp === null ? Wallets.PeraWallet : wp;
    }

    networkPreference(): Networks {
        const wp = sessionStorage.getItem(StorageKeys.NETWORK_PREFERENCE) as Networks | null;
        return wp === null ? Networks.TestNet : wp;
    }

    disconnect() {
        if (this.wallet !== undefined) this.wallet.disconnect();
        sessionStorage.setItem(StorageKeys.ACCOUNT_LIST, "");
        sessionStorage.setItem(StorageKeys.ACCOUNT_PREFERENCE, "");
        sessionStorage.setItem(StorageKeys.WALLET_PREFERENCE, "");
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

