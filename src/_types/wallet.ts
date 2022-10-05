import { Transaction, TransactionSigner } from "algosdk";
import { SignedTxn } from ".";

export interface WalletTransaction {
  txn: string;
  signers?: Array<string>;
  authAddr?: string;
  msig?: {
    version: number;
    treshold: number;
    addrs: Array<string>;
  };
}

export enum Wallets {
  PERA = "PERA",
  MYALGO = "MYALGO",
  ALGOSIGNER = "ALGOSIGNER",
}

export enum Networks {
  TESTNET = "TestNet",
  MAINNET = "MainNet",
  VIGEE_DEV = "vigee",
}

export enum StorageKeys {
  ACCOUNT_LIST = "acct-list",
  ACCOUNT_PREFERENCE = "acct-preference",
  WALLET_PREFERENCE = "wallet-preference",
  NETWORK_PREFERENCE = "network-preference",
}
export type WalletConstructor<T extends IWallet> = new (
  network: Networks,
  wallet: Wallets,
  accountIdx?: number,
  popupPermissionCallback?: PopupPermissionCallback
) => T; //| (new (network: Networks, wallet: Wallets, , accountIdx?: number) => T);

export interface IWallet {
  network: Networks;
  walletChoice: Wallets;
  accounts: string[];
  defaultAccountIndex: number;
  displayName(): string;
  getSelectedAccountAddress(): string;
}
export interface WalletImplementation extends IWallet {
  img(inverted: boolean): string;
  connect(settings?: any): Promise<boolean>;
  disconnect(): void;
  isConnected(): boolean;
  signTxn(txns: Transaction[]): Promise<SignedTxn[]>;
  signBytes(b: Uint8Array): Promise<Uint8Array>;
  signTeal(teal: Uint8Array): Promise<Uint8Array>;
  getSigner(): TransactionSigner;
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
