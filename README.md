# JThreads

Welcome to our Merch Handling Website View what merch is available and start buying once you create an account with us ;)

Slay

## Content

## Nomenclature / Terminology

## Wireframe

## Planning

### Routes

#### Routes for User Data

/public/register
/public/login
/:userId/about --> view & edit user details

##### Routes for Product Data

/public/buy --> List view of items to buy for public
/:userId/buy --> List view of items to buy for user
/:userId/buy/cart --> List view of items to buy for user [cart state stored in BuyPage, retained in Local storage? or only show cart via dialog box?]
/:userId/sell --> list view of items that user has put up to sell
/:userId/sell/:productId --> see One Product that use has put up (with all subproducts - colour, size, design)

##### Routes for Transaction Data

/:userId/buy/orders --> List view of transactions made by user
/:userId/buy/:orderId --> see view of one transaction
/:userId/sell/orders --> see view of all transactions
/:userId/sell/:orderId --> see view of one transaction

### Features & Splitting of Work
