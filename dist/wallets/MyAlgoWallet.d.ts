import MyAlgoConnect from '@randlabs/myalgo-connect';
import { Transaction } from "algosdk";
import { IWallet, Networks, PopupPermissionCallback, SignedTxn } from "../_types";
declare class MyAlgoWallet implements IWallet {
    accounts: string[];
    defaultAccount: number;
    permissionCallback?: PopupPermissionCallback;
    walletConn: MyAlgoConnect;
    network?: Networks;
    constructor();
    static displayName(): string;
    displayName(): string;
    static img(inverted: boolean): string;
    img(inverted: boolean): string;
    connect(): Promise<boolean>;
    isConnected(): boolean;
    disconnect(): void;
    getDefaultAccount(): string;
    doSign(defaultAcct: string, txns: Transaction[]): Promise<SignedTxn[]>;
    signTxn(txns: Transaction[]): Promise<SignedTxn[]>;
    signBytes(b: Uint8Array, permissionCallback?: PopupPermissionCallback): Promise<Uint8Array>;
    signTeal(teal: Uint8Array, _permissionCallback?: PopupPermissionCallback): Promise<Uint8Array>;
}
export default MyAlgoWallet;
