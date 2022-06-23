import { Networks, WalletConstructor, Wallets } from "../_types";
import AlgoSignerWallet from "./AlgosignerWallet";
import MyAlgoWallet from "./MyAlgoWallet";
import PeraWallet from "./PeraWallet";

export class WalletFactory {
    constructor() {}

    static createWallet(network: Networks, walletChoice: Wallets) {
        const walletMap: Record<keyof typeof Wallets, WalletConstructor<MyAlgoWallet | AlgoSignerWallet | PeraWallet>> = {
            "MyAlgoWallet": MyAlgoWallet,
            "AlgoSignerWallet": AlgoSignerWallet,
            "PeraWallet": PeraWallet
        };
        console.log("Creating wallet..");
        return new walletMap[walletChoice](network);
    }
}
