import AlgoSignerWallet from "./wallets/algosigner";
import MyAlgoConnectWallet from "./wallets/myalgoconnect";
import InsecureWallet from "./wallets/insecure";
import WC from "./wallets/walletconnect";
import { PermissionCallback as PopupPermissionCallback, Wallet, SignedTxn } from "./wallets/wallet";
import { Transaction, TransactionSigner } from "algosdk";

export {
  PermissionResult,
  PermissionCallback,
  Wallet,
  SignedTxn,
} from "./wallets/wallet";


enum ValidWallets {
  WALLET_CONNECT = "wallet-connect",
  ALGO_SIGNER = "algo-signer",
  MYALGO_CONNECT = "my-algo-connect"
}

export type WalletChoice = "" | keyof typeof ValidWallets;

enum ValidNetworks {
  TEST = "TestNet",
  MAIN = "MainNet",
  VIGEE_DEV = "vigee-art-sandnet"
}

export type NetworkChoice = keyof typeof ValidNetworks;

export const allowedWallets = {
  WALLET_CONNECT: WC,
  ALGO_SIGNER: AlgoSignerWallet,
  MYALGO_CONNECT: MyAlgoConnectWallet,
  // "insecure-wallet": InsecureWallet,
};

const walletPreferenceKey = "wallet-preference";
const acctListKey = "acct-list";
const acctPreferenceKey = "acct-preference";
const mnemonicKey = "mnemonic";

export enum WalletStorageKeys {
  WALLET_PREFERENCE = "wallet-preference",
  ACCOUNT_LIST = "acct-list",
  ACCOUNT_PREFERENCE = "acct-preference"
}

export class VigeeWallet {
  wallet: Wallet;
  walletChoice: WalletChoice;
  network: string;
  popupPermissionCallback?: PopupPermissionCallback;

  constructor(
    network: string,
    popupPermissionCallback?: PopupPermissionCallback,
    walletChoice?: WalletChoice
  ) {
    if (walletChoice) this.setWalletPreference(walletChoice);

    this.network = network;

    this.walletChoice = this.walletPreference();

    if (popupPermissionCallback) this.popupPermissionCallback = popupPermissionCallback;

    if (!(this.walletChoice in allowedWallets)) return;

    this.wallet = new allowedWallets[this.walletChoice](network);
    this.wallet.permissionCallback = this.popupPermissionCallback;
    this.wallet.accounts = this.accountList();
    this.wallet.defaultAccount = this.accountIndex();
  }

  async connect(): Promise<boolean> {
    if (this.wallet === undefined) return false;
    // Fail
    this.disconnect();
    return false;
  }

  connected(): boolean {
    return this.wallet !== undefined && this.wallet.isConnected();
  }

  getSigner(): TransactionSigner {
    return (txnGroup: Transaction[], indexesToSign: number[]) => {
      return Promise.resolve(this.signTxn(txnGroup)).then((txns) => {
        return txns.map((tx) => {
          return tx.blob;
        });
      });
    };
  }

  setAccountList(accts: string[]) {
    sessionStorage.setItem(WalletStorageKeys.ACCOUNT_LIST, JSON.stringify(accts));
  }

  accountList(): string[] {
    const accts = sessionStorage.getItem(WalletStorageKeys.ACCOUNT_LIST);
    return accts === "" || accts === null ? [] : JSON.parse(accts);
  }

  setAccountIndex(idx: number) {
    this.wallet.defaultAccount = idx;
    sessionStorage.setItem(WalletStorageKeys.ACCOUNT_PREFERENCE, idx.toString());
  }

  accountIndex(): number {
    const idx = sessionStorage.getItem(WalletStorageKeys.ACCOUNT_PREFERENCE);
    return idx === null || idx === "" ? 0 : parseInt(idx, 10);
  }

  setWalletPreference(walletChoice: WalletChoice) {
    this.walletChoice = walletChoice;
    sessionStorage.setItem(WalletStorageKeys.WALLET_PREFERENCE, walletChoice);
  }

  walletPreference(): WalletChoice {
    const wp = sessionStorage.getItem(WalletStorageKeys.WALLET_PREFERENCE) as WalletChoice;
    return wp === null ? "" : wp;
  }

  disconnect() {
    if (this.wallet !== undefined) this.wallet.disconnect();
    sessionStorage.setItem(walletPreferenceKey, "");
    sessionStorage.setItem(acctPreferenceKey, "");
    sessionStorage.setItem(acctListKey, "");
    sessionStorage.setItem(mnemonicKey, "");
  }

  getDefaultAccount(): string {
    if (!this.connected()) return "";
    return this.wallet.getDefaultAccount();
  }

  async signTxn(txns: Transaction[]): Promise<SignedTxn[]> {
    if (!this.connected() && !(await this.connect())) return [];
    return this.wallet.signTxn(txns);
  }
}
