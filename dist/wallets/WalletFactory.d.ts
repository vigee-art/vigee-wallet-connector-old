import { Networks, Wallets } from "../_types";
import AlgoSignerWallet from "./AlgosignerWallet";
import MyAlgoWallet from "./MyAlgoWallet";
import PeraWallet from "./PeraWallet";
export declare class WalletFactory {
    constructor();
    static createWallet(network: Networks, walletChoice: Wallets): MyAlgoWallet | AlgoSignerWallet | PeraWallet;
}
