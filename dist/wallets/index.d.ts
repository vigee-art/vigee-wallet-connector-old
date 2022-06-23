import { Transaction, TransactionSigner } from "algosdk";
import { IWallet, Networks, PopupPermissionCallback, SignedTxn, Wallets } from "../_types";
export declare class DynamicWallet {
    network: Networks;
    popupPermissionCallback?: PopupPermissionCallback;
    wallet: IWallet;
    walletChoice: Wallets;
    constructor(network?: Networks, walletChoice?: Wallets, popupPermissionCallback?: PopupPermissionCallback);
    connect(): Promise<boolean>;
    connected(): boolean;
    getSigner(): TransactionSigner;
    setStoredAccountList(accts: string[]): void;
    storedAccountList(): string[];
    setStoredAccountPreference(idx: number): void;
    storedAccountPreference(): number;
    setStoredWalletChoice(walletChoice: Wallets): void;
    storedWalletPreference(): Wallets;
    setStoredNetworkPreference(networkChoice?: Networks): void;
    storedNetworkPreference(): Networks;
    flushLocalStorage(): void;
    disconnect(): void;
    getDefaultAccount(): string;
    signTxn(txns: Transaction[]): Promise<SignedTxn[]>;
}
