import { Wallet, PermissionCallback, SignedTxn } from 'algorand-session-wallet';
import { Transaction, TransactionParams } from 'algosdk';
declare class InsecureWallet implements Wallet {
    accounts: string[];
    defaultAccount: number;
    network: string;
    permissionCallback?: PermissionCallback;
    pkToSk: any;
    constructor(network: string);
    connect(mnemonic: string): Promise<boolean>;
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
    signTeal(_teal: Uint8Array): Promise<Uint8Array>;
}
export default InsecureWallet;
