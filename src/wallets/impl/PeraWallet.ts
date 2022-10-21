import algosdk, {
  Transaction,
  TransactionParams,
  TransactionSigner,
} from "algosdk";

import {
  Networks,
  SignedTxn,
  WalletImplementation,
  Wallets,
} from "../../_types";
import { PeraWalletConnect } from "@perawallet/connect";
import { SignerTransaction } from "@perawallet/connect/dist/util/model/peraWalletModels";

const logo =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDIwSDE3LjUwNDdMMTUuODY5MyAxMy45NkwxMi4zNjI1IDIwSDkuNTYzNzVMMTQuOTc1OCAxMC42NDU2TDE0LjA5OTEgNy4zODE3TDYuNzk4NzQgMjBINEwxMy4yNTYxIDRIMTUuNzE3NkwxNi43Nzk4IDcuOTg3MzhIMTkuMzA4N0wxNy41ODkgMTAuOTgyMUwyMCAyMFoiIGZpbGw9IiMyQjJCMkYiLz4KPC9zdmc+Cg==";

export class PeraWallet implements WalletImplementation {
  _peraWallet: PeraWalletConnect;

  constructor(
    network: Networks,
    walletChoice: Wallets,
    defaultAccountIdx: number = 0
  ) {
    this.walletChoice = walletChoice;
    this.network = network;
    this.defaultAccountIndex = defaultAccountIdx;
    this._peraWallet = new PeraWalletConnect();
  }

  network: Networks;
  walletChoice: Wallets;
  _accounts: string[];
  defaultAccountIndex: number;

  displayName(): string {
    return this.walletChoice;
  }

  getAccounts() {
    return this._peraWallet.connector?.accounts;
  }

  getSelectedAccountAddress(): string {
    return this.getAccounts()[this.defaultAccountIndex];
  }

  getSigner(): TransactionSigner {
    return (txnGroup: Transaction[], _indexesToSign?: number[]) => {
      return Promise.resolve(this.signTxn(txnGroup)).then((txns) => {
        return txns.map((tx) => {
          return tx;
        });
      });
    };
  }

  async reconnect(): Promise<string[]> {
    return await this._peraWallet.reconnectSession();
  }

  async connect(dcHandler?: Function): Promise<boolean> {
    // Check if connection is already established
    if (this._peraWallet.connector?.connected) {
      return true;
    }
    return this._peraWallet
      .connect()
      .then((accounts) => {
        this._accounts = accounts;
        this._peraWallet.connector?.on("disconnect", (error, _payload) => {
          if (error) throw error;
          this._peraWallet.disconnect().then(() => dcHandler);
        });

        return true;
      })
      .catch((e) => {
        console.log(e);
        return false;
      });
  }

  static img(_inverted: boolean): string {
    return logo;
  }
  img(inverted: boolean): string {
    return PeraWallet.img(inverted);
  }

  isConnected(): boolean {
    return this._peraWallet.connector?.connected;
  }

  disconnect() {
    this._peraWallet
      .disconnect()
      .then(() => console.log("sucessfully disconnected from pera wallet"))
      .catch((error) => console.log(error));
  }

  async signTxn(txns: Transaction[]): Promise<Uint8Array[]> {
    console.log("signing from pera");
    const txnsToSign: Array<SignerTransaction> = txns.map((txn) => {
      if (!this._accounts.includes(algosdk.encodeAddress(txn.from.publicKey))) {
        console.log("not the signer");
        return { txn: txn, signers: [] };
      }
      return { txn: txn };
    });

    const result = await this._peraWallet.signTransaction([txnsToSign]);

    return result;
  }

  async sign(txn: TransactionParams): Promise<SignedTxn> {
    throw new Error("Method not implemented." + txn);
  }

  async signBytes(b: Uint8Array): Promise<Uint8Array> {
    throw new Error("Method not implemented." + b);
  }

  async signTeal(teal: Uint8Array): Promise<Uint8Array> {
    throw new Error("Method not implemented." + teal);
  }
}

export default PeraWallet;
