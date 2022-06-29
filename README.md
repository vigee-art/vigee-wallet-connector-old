# vigee-wallet-connector


```sh
npm -i vigee-wallet-connector
```

```js
const sw = new DynamicWallet(Networks.TESTNET, Wallets.ALGOSIGNER)
if(!await sw.connect()) return alert("Couldnt connect")

//...

const accts = sw.accountList()

//...

sw.signTxn([txnblobs])

//...

sw.disconnect()

```
# vigee-wallet-connector
