import { ImplementedWallets, IWallet, Networks, WalletConstructor } from "../_types";
import AlgoSignerWallet from "./AlgosignerWallet";
import MyAlgoWallet from "./MyAlgoWallet";
import PeraWallet from "./PeraWallet";

type WalletMap = Record<ImplementedWallets, WalletConstructor<IWallet>>;
export abstract class Factory<T> {
    abstract create(param: any, param2: any): T;
}
export class WalletFactory {
    constructor() {
    }

    static create(network: Networks, wallet: ImplementedWallets): IWallet {
        const walletMap: WalletMap = {
            "MyAlgoWallet": MyAlgoWallet,
            "AlgoSignerWallet": AlgoSignerWallet,
            "PeraWallet": PeraWallet
        };
        console.log("Creating wallet..");
        return new walletMap[wallet](network);
    }
}
