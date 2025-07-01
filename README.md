# JThreads

Welcome to our Merch Handling Website View what merch is available and start buying once you create an account with us ;)

Slay

## Content

## Nomenclature / Terminology

## Screengrabs of Application

## Wireframe

![Homepage](photosREADME/Homepage.png)
![Signin](photosREADME/SignIn.png)
![SignUp](photosREADME/SignUp.png)
![EditProfile](photosREADME/EditProfile.png)
![BuyAll](photosREADME/BuyAll.png)

## Planning

### FrontEnd Routes

![Frontend Routes](./photosREADME/FE_AllRoutes.png)

### Backend Routes

#### Routes for User Data

![User Routes](./photosREADME/BE_REST_UserRoutes.png)

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

## Credits

Backend Techniques from:

- [eCommerce Model Definitions](https://dev.to/ezzdinatef/ecommerce-database-design-1ggc)

Frontend Techniques from:

- [Private Route](https://medium.com/@bhairabpatra.iitd/private-routes-in-react-559a7d8d161f)
- [MUI Controlled Form](https://dev.to/melissajlw/how-to-create-a-controlled-form-in-mui-material-ui-4gm9)
- [Validation in Forms](https://muhimasri.com/blogs/mui-validation/)
