import { Transaction, TransactionParams } from 'algosdk';
import { IWallet, Networks, PopupPermissionCallback, SignedTxn } from '../_types';
declare class AlgoSignerWallet implements IWallet {
    accounts: string[];
    defaultAccount: number;
    permissionCallback?: PopupPermissionCallback;
    network: Networks;
    constructor(network: Networks);
    static displayName(): string;
    displayName(): string;
    static img(inverted: boolean): string;
    img(inverted: boolean): string;
    connect(): Promise<boolean>;
    waitForLoaded(): Promise<boolean>;
    isConnected(): boolean;
    disconnect(): void;
    getDefaultAccount(): string;
    signTxn(txns: Transaction[]): Promise<SignedTxn[]>;
    sign(txn: TransactionParams): Promise<SignedTxn>;
    signBytes(b: Uint8Array): Promise<Uint8Array>;
    signTeal(teal: Uint8Array): Promise<Uint8Array>;
}
export default AlgoSignerWallet;
