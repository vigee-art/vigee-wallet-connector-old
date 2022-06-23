import { Transaction } from "algosdk";
import { SignedTxn } from ".";
export declare enum Wallets {
    PeraWallet = "PeraWallet",
    MyAlgoWallet = "MyAlgoWallet",
    AlgoSignerWallet = "AlgoSignerWallet"
}
export declare enum Networks {
    TestNet = "TestNet",
    MainNet = "MainNet",
    VIGEE_DEV = "vigee"
}
export declare enum StorageKeys {
    ACCOUNT_LIST = "acct-list",
    WALLET_PREFERENCE = "wallet-preference",
    ACCOUNT_PREFERENCE = "acct-preference",
    NETWORK_PREFERENCE = "network-preference"
}
export declare type WalletConstructor<T extends IWallet> = (new () => T) | (new (network: Networks) => T);
export interface IWallet {
    accounts: string[];
    defaultAccount: number;
    network?: Networks;
    permissionCallback?: PopupPermissionCallback;
    displayName(): string;
    img(inverted: boolean): string;
    connect(settings?: any): Promise<boolean>;
    isConnected(): boolean;
    disconnect(): void;
    getDefaultAccount(): string;
    signTxn(txns: Transaction[]): Promise<SignedTxn[]>;
    signBytes(b: Uint8Array): Promise<Uint8Array>;
    signTeal(teal: Uint8Array): Promise<Uint8Array>;
}
export interface PermissionResult {
    approved(): Promise<SignedTxn[]>;
    declined(): Promise<SignedTxn[]>;
}
export interface PopupPermissionCallback {
    request(permissionResult: PermissionResult): Promise<SignedTxn[]>;
}
