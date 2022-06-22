# vigee-wallet-connector


```sh
npm -i vigee-wallet-connector
```

```js
const sw = new SessionWallet("TestNet", "algosigner-wallet")
if(!sw.connect()) return alert("Couldnt connect")

//...

const accts = sw.accountList()

//...

sw.signTxn([txnblobs])

//...

sw.disconnect()

```
# vigee-wallet-connector
