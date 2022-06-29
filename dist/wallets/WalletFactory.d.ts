import { ImplementedWallets, IWallet, Networks } from "../_types";
export declare abstract class Factory<T> {
    abstract create(param: any, param2: any): T;
}
export declare class WalletFactory {
    constructor();
    static create(network: Networks, wallet: ImplementedWallets): IWallet;
}
