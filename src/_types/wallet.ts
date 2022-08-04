import { Transaction } from "algosdk";
import { SignedTxn } from ".";

export enum Wallets {
    DISCONNECTED = "DC",
    PERA = "PERA",
    MYALGO = "MYALGO",
    ALGOSIGNER = "ALGOSIGNER"
}

export type ImplementedWallets = Wallets.ALGOSIGNER | Wallets.MYALGO | Wallets.PERA;
export enum Networks {
    TESTNET = "TestNet",
    MAINNET = "MainNet",
    VIGEE_DEV = "vigee"
}

export enum StorageKeys {
    ACCOUNT_LIST = "acct-list",
    ACCOUNT_PREFERENCE = "acct-preference",
    WALLET_PREFERENCE = "wallet-preference",
    NETWORK_PREFERENCE = "network-preference"
}
export type WalletConstructor<T extends IWallet> = (new () => T) | (new (network: Networks) => T);

export interface IWallet {
    accounts: string[];
    defaultAccountIndex: number;
    network?: Networks;
    permissionCallback?: PopupPermissionCallback;
    displayName(): string;
    img(inverted: boolean): string;
    connect(settings?: any): Promise<boolean>;
    isConnected(): boolean;
    disconnect(): void;
    getDefaultAccountAddress(): string;
    signTxn(txns: Transaction[]): Promise<SignedTxn[]>;
    signBytes(b: Uint8Array): Promise<Uint8Array>;
    signTeal(teal: Uint8Array): Promise<Uint8Array>;
}

// Meant for wallets that require a popup (MyAlgo Connect) 
//  In most browsers triggering a popup requires the the user
//  to have taken an action (like clicking something)
//  so `request` this should trigger a popup where the click event
//  is passed back into the sign functions 

export interface PermissionResult {
    approved(): Promise<SignedTxn[]>;
    declined(): Promise<SignedTxn[]>;
}

export interface PopupPermissionCallback {
    request(permissionResult: PermissionResult): Promise<SignedTxn[]>;
}
