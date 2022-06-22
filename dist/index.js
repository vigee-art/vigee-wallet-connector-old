
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./vigee-wallet-connector.cjs.production.min.js')
} else {
  module.exports = require('./vigee-wallet-connector.cjs.development.js')
}
