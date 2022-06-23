import { Transaction } from "algosdk";
import { SignedTxn } from ".";

export enum Wallets {
    PeraWallet = "PeraWallet",
    MyAlgoWallet = "MyAlgoWallet",
    AlgoSignerWallet = "AlgoSignerWallet"
}

export enum Networks {
    TestNet = "TestNet",
    MainNet = "MainNet",
    VIGEE_DEV = "vigee"
}

export enum StorageKeys {
    ACCOUNT_LIST = "acct-list",
    WALLET_PREFERENCE = "wallet-preference",
    ACCOUNT_PREFERENCE = "acct-preference",
    NETWORK_PREFERENCE = "network-preference"
}
export type WalletConstructor<T extends IWallet> = (new () => T) | (new (network: Networks) => T);

// export const walletConstructorMap: Record<WalletChoice, WalletConstructor<AllowedWallets>> = {
//     'wallet-connect': WalletConnectWallet,
//     'algo-signer': AlgoSignerWallet,
//     'my-algo-connect': MyAlgoWallet,
//     // "insecure-wallet": InsecureWallet,
// };

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

// export declare class AlgoSignerWallet implements Wallet {
//     accounts: string[];
//     defaultAccount: number;
//     network: string;
//     permissionCallback?: PopupPermissionCallback;
//     displayName(): string;
//     img(inverted: boolean): string;
//     connect(settings?: any): Promise<boolean>;
//     isConnected(): boolean;
//     disconnect(): void;
//     getDefaultAccount(): string;
//     signTxn(txns: Transaction[]): Promise<SignedTxn[]>;
//     signBytes(b: Uint8Array): Promise<Uint8Array>;
//     signTeal(teal: Uint8Array): Promise<Uint8Array>;
// }

// export declare class MyAlgoWallet extends BaseWallet {
//     displayName(): string;
//     img(inverted: boolean): string;
//     connect(settings?: any): Promise<boolean>;
//     isConnected(): boolean;
//     disconnect(): void;
//     getDefaultAccount(): string;
//     signTxn(txns: Transaction[]): Promise<SignedTxn[]>;
//     signBytes(b: Uint8Array): Promise<Uint8Array>;
//     signTeal(teal: Uint8Array): Promise<Uint8Array>;
// }

// export declare class WalletConnectWallet extends BaseWallet {
//     displayName(): string;
//     img(inverted: boolean): string;
//     connect(settings?: any): Promise<boolean>;
//     isConnected(): boolean;
//     disconnect(): void;
//     getDefaultAccount(): string;
//     signTxn(txns: Transaction[]): Promise<SignedTxn[]>;
//     signBytes(b: Uint8Array): Promise<Uint8Array>;
//     signTeal(teal: Uint8Array): Promise<Uint8Array>;
// }


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

// export interface Wallet {
//     accounts: string[];
//     defaultAccount: number;
//     network: string;
//     permissionCallback?: PopupPermissionCallback;

//     displayName(): string;

//     img(inverted: boolean): string;

//     connect(settings?: any): Promise<boolean>;
//     isConnected(): boolean;

//     disconnect(): void;

//     getDefaultAccount(): string;

//     signTxn(txns: Transaction[]): Promise<SignedTxn[]>;
//     signBytes(b: Uint8Array): Promise<Uint8Array>;
//     signTeal(teal: Uint8Array): Promise<Uint8Array>;
// }
