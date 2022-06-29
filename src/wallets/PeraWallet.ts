import algosdk, { Transaction, TransactionParams } from "algosdk";

import WalletConnect from "@walletconnect/client";
import WalletConnectQRCodeModal from "algorand-walletconnect-qrcode-modal";

import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { IWallet, Networks, PopupPermissionCallback, SignedTxn } from "../_types";

const logo =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDIwSDE3LjUwNDdMMTUuODY5MyAxMy45NkwxMi4zNjI1IDIwSDkuNTYzNzVMMTQuOTc1OCAxMC42NDU2TDE0LjA5OTEgNy4zODE3TDYuNzk4NzQgMjBINEwxMy4yNTYxIDRIMTUuNzE3NkwxNi43Nzk4IDcuOTg3MzhIMTkuMzA4N0wxNy41ODkgMTAuOTgyMUwyMCAyMFoiIGZpbGw9IiMyQjJCMkYiLz4KPC9zdmc+Cg==";


class PeraWallet implements IWallet {
  accounts: string[];
  defaultAccount: number;
  connector: WalletConnect;
  permissionCallback?: PopupPermissionCallback;
  network: Networks;

  constructor(network: Networks) {
    this.accounts = [];
    this.defaultAccount = 0;
    this.network = network;
    const bridge = "https://bridge.walletconnect.org";
    this.connector = new WalletConnect({
      bridge,
      qrcodeModal: WalletConnectQRCodeModal,
    });
  }

  async connect(cb: any): Promise<boolean> {
    // Check if connection is already established
    if (this.connector.connected) return true;
    await this.connector.createSession();

    this.connector.on("connect", (error, payload) => {
      if (error) {
        console.log(error);
        throw error;
      }
      const { accounts } = payload.params[0];
      this.accounts = accounts;
    });

    this.connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }
      const { accounts } = payload.params[0];
      this.accounts = accounts;
    });

    this.connector.on("disconnect", (error, _payload) => {
      if (error) throw error;
    });

    return new Promise(resolve => {
      const reconn = setInterval(() => {
        if (this.connector.connected) {
          clearInterval(reconn);
          resolve(true);
          return;
        }
        this.connector.connect();
      }, 100);
    });
  }

  static displayName(): string {
    return "Wallet Connect";
  }
  displayName(): string {
    return PeraWallet.displayName();
  }

  static img(_inverted: boolean): string {
    return logo;
  }
  img(inverted: boolean): string {
    return PeraWallet.img(inverted);
  }

  isConnected(): boolean {
    return this.connector.connected;
  }

  disconnect() {
    this.connector.killSession();
  }

  getDefaultAccount(): string {
    if (!this.isConnected()) return "";
    return this.accounts[this.defaultAccount];
  }

  async signTxn(txns: Transaction[]): Promise<SignedTxn[]> {
    const defaultAddress = this.getDefaultAccount();
    const txnsToSign = txns.map((txn) => {
      const encodedTxn = Buffer.from(
        algosdk.encodeUnsignedTransaction(txn)
      ).toString("base64");

      if (algosdk.encodeAddress(txn.from.publicKey) !== defaultAddress)
        return { txn: encodedTxn, signers: [] };
      return { txn: encodedTxn };
    });

    const request = formatJsonRpcRequest("algo_signTxn", [txnsToSign]);

    const result: string[] = await this.connector.sendCustomRequest(request);

    return result.map((element, idx) => {
      return element
        ? {
          txID: txns[idx].txID(),
          blob: new Uint8Array(Buffer.from(element, "base64")),
        }
        : {
          txID: txns[idx].txID(),
          blob: new Uint8Array(),
        };
    });
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
