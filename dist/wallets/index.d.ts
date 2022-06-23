import { Transaction, TransactionSigner } from "algosdk";
import { IWallet, Networks, PopupPermissionCallback, SignedTxn, Wallets } from "../_types";
export declare class DynamicWallet {
    network: Networks;
    popupPermissionCallback?: PopupPermissionCallback;
    wallet: IWallet;
    walletChoice: Wallets;
    constructor(network?: Networks, popupPermissionCallback?: PopupPermissionCallback, walletChoice?: Wallets);
    connect(): Promise<boolean>;
    connected(): boolean;
    getSigner(): TransactionSigner;
    setAccountList(accts: string[]): void;
    accountList(): string[];
    setAccountIndex(idx: number): void;
    accountIndex(): number;
    setWalletPreference(walletChoice: Wallets): void;
    walletPreference(): Wallets;
    networkPreference(): Networks;
    disconnect(): void;
    getDefaultAccount(): string;
    signTxn(txns: Transaction[]): Promise<SignedTxn[]>;
}
