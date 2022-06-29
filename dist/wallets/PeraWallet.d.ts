import { Transaction, TransactionParams } from "algosdk";
import WalletConnect from "@walletconnect/client";
import { IWallet, Networks, PopupPermissionCallback, SignedTxn } from "../_types";
declare class PeraWallet implements IWallet {
    accounts: string[];
    defaultAccount: number;
    connector: WalletConnect;
    permissionCallback?: PopupPermissionCallback;
    network: Networks;
    constructor(network: Networks);
    connect(): Promise<boolean>;
    static displayName(): string;
    displayName(): string;
    static img(_inverted: boolean): string;
    img(inverted: boolean): string;
    isConnected(): boolean;
    disconnect(): void;
    getDefaultAccount(): string;
    signTxn(txns: Transaction[]): Promise<SignedTxn[]>;
    sign(txn: TransactionParams): Promise<SignedTxn>;
    signBytes(b: Uint8Array): Promise<Uint8Array>;
    signTeal(teal: Uint8Array): Promise<Uint8Array>;
}
export default PeraWallet;
