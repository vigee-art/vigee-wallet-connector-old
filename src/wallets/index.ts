import { Transaction, TransactionSigner } from "algosdk";
import { ImplementedWallets, IWallet, Networks, PopupPermissionCallback, SignedTxn, StorageKeys, Wallets } from "../_types";
import { WalletFactory } from "./WalletFactory";

function isImplementedWallet(wallet: Wallets | ImplementedWallets): wallet is ImplementedWallets {
    return (wallet as ImplementedWallets) !== undefined;
}
function isValidNetwork(network: string | Networks): network is Networks {
    return (network as Networks) !== undefined;
}
export class DynamicWallet {
    private _network: Networks;
    private _walletChoice: Wallets;
    wallet: IWallet;
    private readonly popupPermissionCallback?: PopupPermissionCallback;

    constructor(
        network: Networks,
        walletChoice?: Wallets,
        popupPermissionCallback?: PopupPermissionCallback,
    ) {
        if (walletChoice) this._walletChoice = walletChoice;

        if (!isImplementedWallet(this._walletChoice)) {
            this._walletChoice = Wallets.PeraWallet;
        }

        if (network) { this.setStoredNetworkPreference(network); }
        if (!(isValidNetwork(this.storedNetworkPreference()))) {
            this.setStoredNetworkPreference();
        }
        this._network = this.storedNetworkPreference();


        if (popupPermissionCallback) this.popupPermissionCallback = popupPermissionCallback;
        this.popupPermissionCallback = popupPermissionCallback;

        this.wallet = WalletFactory.create(this._network, this._walletChoice);
        this.wallet.permissionCallback = this.popupPermissionCallback;
        this.wallet.accounts = this.storedAccountList();
        this.wallet.defaultAccount = this.storedAccountPreference();
    }


    public get walletChoice(): Wallets {
        return this._walletChoice;
    }

    public set walletChoice(newChoice: Wallets) {
        this._walletChoice = newChoice;
    }

    public set network(newChoice: Networks) {
        this._network = newChoice;
    }

    public get network(): Networks {
        return this._network;
    }



    async connect(): Promise<boolean> {
        if (this.wallet === undefined) return false;

        if (await this.wallet.connect()) {
            this.setStoredAccountList(this.wallet.accounts);
            this.setStoredAccountPreference(parseInt(this.wallet.getDefaultAccount(), 10));
            this.setStoredNetworkPreference(this.wallet.network);
            return true;
        } else {
            this.walletChoice = this.storedWalletChoice();
            this.network = this.storedNetworkPreference();
            console.log("something went wrong");
            this.disconnect();
            return false;
        }
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
        sessionStorage.setItem(StorageKeys.ACCOUNT_LIST, JSON.stringify(accts));
    }

    storedAccountList(): string[] {
        const accts = sessionStorage.getItem(StorageKeys.ACCOUNT_LIST);
        return accts === "" || accts === null ? [] : JSON.parse(accts);
    }

    setStoredAccountPreference(idx: number) {
        this.wallet.defaultAccount = idx;
        sessionStorage.setItem(StorageKeys.ACCOUNT_PREFERENCE.concat(this.walletChoice), idx.toString());
    }

    storedAccountPreference(): number {
        const idx = sessionStorage.getItem(StorageKeys.ACCOUNT_PREFERENCE.concat(this.walletChoice));
        return idx === null || idx === "" ? 0 : parseInt(idx, 10);
    }

    setStoredWalletChoice(walletChoice: Wallets) {
        sessionStorage.setItem(StorageKeys.WALLET_PREFERENCE, walletChoice);
    }

    storedWalletChoice(): Wallets {
        const wp = sessionStorage.getItem(StorageKeys.WALLET_PREFERENCE) as Wallets;
        return wp === null ? Wallets.DISCONNECTED : wp;
    }

    setStoredNetworkPreference(networkChoice?: Networks) {
        if (!networkChoice) networkChoice = Networks.TestNet;
        sessionStorage.setItem(StorageKeys.NETWORK_PREFERENCE, networkChoice);
    }

    storedNetworkPreference(): Networks {
        const wp = sessionStorage.getItem(StorageKeys.NETWORK_PREFERENCE) as Networks;
        return wp === null ? Networks.TestNet : wp;
    }

    flushsessionStorage() {
        console.log("flushing storage");
        sessionStorage.setItem(StorageKeys.ACCOUNT_LIST, "");
        sessionStorage.setItem(StorageKeys.ACCOUNT_PREFERENCE, "");
        sessionStorage.setItem(StorageKeys.WALLET_PREFERENCE, "");
    }

    disconnect() {
        if (this.wallet !== undefined && !this.wallet.isConnected()) {
            this.wallet.disconnect();
            this.flushsessionStorage();
        } else {
            throw new Error("no wallet is connected and a disconnect was tried");
        }
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

