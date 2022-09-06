import {
  Networks,
  WalletConstructor,
  WalletImplementation,
  Wallets
} from "../_types";

import { AlgoSignerWallet, MyAlgoWallet, PeraWallet } from "./impl";

type WalletMap = Record<Wallets, WalletConstructor<WalletImplementation>>;
export abstract class Factory<T> {
  abstract create(param: any, param2: any): T;
}

function isValidNetwork(network: string | Networks): network is Networks {
  return (network as Networks) !== undefined;
}
export class WalletFactory {
  constructor() {}

  static create(network: Networks, wallet: Wallets, defaultAccountIdx?: number, permissionCallback?: any): WalletImplementation {
    if (
      (wallet == Wallets.ALGOSIGNER || wallet == Wallets.MYALGO || wallet == Wallets.PERA)
      && isValidNetwork(network)
    ) {

      const walletMap: WalletMap = {
        MYALGO: MyAlgoWallet,
        ALGOSIGNER: AlgoSignerWallet,
        PERA: PeraWallet,
      };
      console.log("Creating wallet..", permissionCallback);
      const createdWallet: WalletImplementation = new walletMap[wallet](network, wallet, defaultAccountIdx, permissionCallback);
      return createdWallet;
    }
    else throw new Error("");
  }
}
