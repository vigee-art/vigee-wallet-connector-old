import { Transaction, TransactionSigner } from "algosdk";
import AlgoSignerWallet from "./wallets/algosigner";
import MyAlgoConnectWallet from "./wallets/myalgoconnect";
import { PermissionCallback as PopupPermissionCallback, SignedTxn, Wallet } from "./wallets/wallet";
import WC from "./wallets/walletconnect";
export { PermissionCallback, PermissionResult, SignedTxn, Wallet } from "./wallets/wallet";
declare enum ValidWallets {
    WALLET_CONNECT = "wallet-connect",
    ALGO_SIGNER = "algo-signer",
    MYALGO_CONNECT = "my-algo-connect"
}
export declare type WalletChoice = keyof typeof ValidWallets;
declare enum ValidNetworks {
    TEST = "TestNet",
    MAIN = "MainNet",
    VIGEE_DEV = "vigee-art-sandnet"
}
export declare type NetworkChoice = keyof typeof ValidNetworks;
export declare const allowedWallets: {
    WALLET_CONNECT: typeof WC;
    ALGO_SIGNER: typeof AlgoSignerWallet;
    MYALGO_CONNECT: typeof MyAlgoConnectWallet;
};
export declare enum WalletStorageKeys {
    WALLET_PREFERENCE = "wallet-preference",
    ACCOUNT_LIST = "acct-list",
    ACCOUNT_PREFERENCE = "acct-preference"
}
export declare class VigeeWallet {
    wallet: Wallet;
    walletChoice: WalletChoice;
    network: string;
    popupPermissionCallback?: PopupPermissionCallback;
    constructor(network: NetworkChoice, popupPermissionCallback?: PopupPermissionCallback, walletChoice?: WalletChoice);
    connect(): Promise<boolean>;
    connected(): boolean;
    getSigner(): TransactionSigner;
    setAccountList(accts: string[]): void;
    accountList(): string[];
    setAccountIndex(idx: number): void;
    accountIndex(): number;
    setWalletPreference(walletChoice: WalletChoice): void;
    walletPreference(): WalletChoice | "";
    disconnect(): void;
    getDefaultAccount(): string;
    signTxn(txns: Transaction[]): Promise<SignedTxn[]>;
}
