# Phase 4: Carts and Checkout (1 day)

## Rails
### Models
* Cart
* CartItem
* Transaction

### Controllers
* Api::CartController (create, show, update)
* Api::TransactionController (create, show, update)

### Views
* cart/show.json.jbuilder
* transactions/show.json.builder

## Flux
### Views (React Components)
* cart/show.jsx
* transactions/show.json.jbuilder
* transactions/index.json.jbuilder

### ApiUtil
* ApiUtil.createCart
* ApiUtil.fetchCart
* ApiUtil.addToCart
* ApiUtil.removeFromCart
* ApiUtil.createTransation
* ApiUtil.fetchAllTransactions
* ApiUtil.fetchSingleTransaction
* ApiUtil.editTransaction

### Actions
* CartActions.receiveCart
* CartActions.checkout
* CartActions.clear
* ListingsActions.renew
* TransactionsActions.receiveAllTransactions
* TransactionsActions.receiveSingleTransaction

### Constants
* cart_constants.js
* transaction_constants.js

### Stores
* Cart
* Transactions

## Gems/Libraries
