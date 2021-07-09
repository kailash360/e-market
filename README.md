# 🛒 EasyCart - Anything But Ordinary

A simple but useful e-commerce platform to buy and sell products.The different features of our website gives an amazing user experience to our customers.

# 🔥 Screenshots

### 1. Landing page
**This is the landing page - the first appearance of our website to the user.**

![Landing Page](/static/screenshots/landing-page.jpeg)
### 2. Sign Up
**This is the Sign-Up page where users can sign up after provifing all the required details**

![Customer Sign Up](/static/screenshots/customer-sign-up.jpeg)


**After signing up, user will be redirected to a 'Hurray' page, from where one can log in with the credentials.**

![Customer Signed Up](/static/screenshots/customer-signed-up.jpeg)

### 3.Log In

**This is the Log-In page that requires username and password of any user to log in.**

![Log In](/static/screenshots/login.jpeg)



**Providing invalid credentials will redirect the user to an Invalid Login page.**

![Invalid Login](/static/screenshots/invalid-login.jpeg)


## 👱‍♂️ Customer view
### 4. Homepage
**This is the homepage that will be displayed once the customer logs in**

![Home Page Capture-1](/static/screenshots/home-img.png)

### 5. Products 
**These are the products that are available to the customers. Every product can abe added to wishlist, to the cart, or purchased immediately.**

![Products](/static/screenshots/products.jpeg)


### 6. Products with filters
**By applying filters, the products can be more personalised.** 
![Products Filter](/static/screenshots/products-filters.jpeg)

### 7. Cart 
**Initially, the cart is empty.**
![Empty Cart](/static/screenshots/empty-cart.jpeg)


### 8. Adding a product to the cart from Products page 
![Add To Cart](/static/screenshots/add-to-cart.jpeg)


### 9. Items in the cart 
**All items are now saved in the cart. User can also change the quantity one needs to buy.**

![Cart items](/static/screenshots/cart.jpeg)



**The total items, total costs are calculated simultaneously and displayed to the customer. A confirmation is also taken from the user before proceeding for payment.** 

![Cart Calculations](/static/screenshots/cart-calculations.jpeg)


### 10. Payment
**The customer will need to select a method of payment to complete the process.**

![Payment](/static/screenshots/payment.jpeg)


### 11. Thank You page
**After successful payment, customer will be redirected to a Thank You page, where one will have the option to shop again.** 

![Thank You Page](/static/screenshots/thank-you.jpeg)


### 12. Profile

**This will display all the details of a customer that he provided while signing up.**

![Profile Capture 1 ](/static/screenshots/profile-capture.png)


**Details can be changed with the edit button and it will be updated in the database.**

![Edit Profile](/static/screenshots/profile-edit.jpeg)

### 13. Previous Orders 
**This will show the previous orders of a customer.**

![History](/static/screenshots/customer_history.jpeg)


**If the customer has not made any purchase then it will look like this.**

![Empty History](/static/screenshots/empty-history.jpeg)


## 🏬 Seller View  
### 14. Adding product
**A new seller does not have any products added.**
![Empty History](/static/screenshots/empty-product.jpeg)

**One can add the products to sell.**
![Add History](/static/screenshots/add-product.jpeg)

### 15. My Products
**The products will be displyed to the seller. One will also have the liberty to change the details of any product one wants. Products can also be deleted.**

![Add History](/static/screenshots/edit-products.jpeg)

**The products which have run out of stock will be displayed to the seller with a special colour.**

![Add History](/static/screenshots/out-of-stock-product.jpeg)

### 16. Seller profile
**A seller will have a profile where all of his/her details will be listed. One can edit the details.**

![Add History](/static/screenshots/seller-profile.png)


### 17. About Us 
**This section contains a little information about the e-commerce platform.**
![Add History](/static/screenshots/about-us.png)

# 🌏Hosted URL
> https://e-market-site.herokuapp.com/

#### Credentials for testing purposes (both customer and seller)
```
Username: webkriti
Password: 123
```

# ⚡Features Implemented
## 🎨Frontend
- ### Both customers and sellers can register  
    A customer can sign up on the website using a unique username. One can then place orders from his/her account. Sellers will also need to register using a unique username and can add products to sell.

    It is always checked that users do not try to sign-up or login without providing all the required details.

- ### Editable profile

    A customer or seller can always edit his/her profile details including name, e-mail, contact number, addresses, etc. that he/she had given while signing up. The changes are updated in the database at the same time.

- ### Finances
    Sellers can see the total sales that they have made and the total orders that they have received. 

    Customers can see the total number of orders that they have made till date and also the number of supercoins that they have. For every purchase above Rs.500, a supercoin is given to the user. 

    *Finances cannot be edited by a user. It is strictly synchronized with the database.*

- ### Checks and Validations
    Checks and validations for specific interactions have been added so that the user does not provide any malicious data. These include:
    * A log-in or sign-up request is made only after filling all the required details.
    * Any data field in user-profile does not remain empty after editing.
    * Customers can search products only after providing a value in the search box.
    * Customers can place an order only for the available products.
    * Customers need to agree to the terms and conditions before purchasing the product.
    * Only integers are allowed as price and quantity of a product.

- ### Simple and Interactive UI
    Both customers and sellers have a simple, yet interactive user interface that provides them with best experinece of selling and shopping, respectively.
- ### Responsive Design
    All the pages are made responsive and work smoothly on most of the devices. 

> ### Frontend features available only to the customer
- ### Easy product search
    A customer can search for different products of his/her choice. The products will be displayed in alphabetical order by default.

    However, the search results can be customized by applying **Category** or **Price** filters.

- ### Special marking of scarce products
    Products which are less in number and are soon going to run out of stock will be flagged with Yellow colour.Also,products which have already run out of stock are marked with Red colour.

    *Customers cannot add a product to their cart, which has run out of stock.*

- ### Add-To-Wishlist
    Customers will have the option to add or remove any product they like, to their wishlist.
- ### Add-To-Cart and Buy-Now options for a product
    Customer have the option to add any product to the cart, which allows them to purchase multiple products together.The Buy-Now option takes the customer instantly to the cart and save his/her time while placing an order.

- ### Cart 
    Every customer is given a single cart. Items will remain saved in the cart, until the user proceeds to buy them or removes them from the cart. 

    All the changes will be reflected into the database parallely.

    The Total Items that have been ordered, Total Amount that the user need to pay (with and without Delivery Cost) - all are calculated in real-time and displayed to the user. 

    A confirmation is taken from the user before one proceeds to make a payment

- ### Payment
    Customers can complete their purchase only after selecting a mode of payment. After successful payment, the customer will be directed to a Thank-You page.
- ### Previous Orders
    Customers can also view the details of their previous orders. It includes name of the product, quantity of the product, amount paid for that particular product, and the date of purchase.
> ### Frontend features available only to the seller

- ### Adding a product
    Sellers can add the products they want to sell on the website. The UI allows them to choose the different details to be displayed to a customer.
- ### Edit current products
    A seller can see all of his/her current products and their respective details. One can also edit the details of a product. They can also delete a product from the list.

    All the changes made by the user will be updated in the database at the same time.  
- ### Special marking for depleted products
    Whenever all the units of a product have been purchased, it is displayed in the list with flag of red colour, so that seller can easily identify that product and refill the stocks.

## 🛠 Backend
- ### User verification
    During a login request, the credentials of the user are verified from the database, and a corresponding response is sent back to the client.

    Even during a sign-up request, it is checked if a user with the given credentials already exists or not. A new account is created only if the username is not already registered.
- ### JWT Authentication
    [JSON Web Tokens](https://jwt.io/) are used to maintain the individuality of a client request. They are also necessary to verify the authenticity of a user, using a middleware.

    The tokens are saved in the local storage of the client and expire in 2 hours. They are also deleted once the user opts to log out from the website.

- ### Security
    The users cannot interact with the website without logging in.The username is unique to each user.

    All the passwords are stored in the database after encrypting using [bcrypt](https://www.npmjs.com/package/bcrypt). They are decrypted once and only to verify the credentials of an incoming log-in request.
 
- ### Efficient database
    Separate schemas are maintained for customers, sellers, products, carts, previous orders. This allows the CRUD(Create, Read, Update, Delete) opeartions to be executed smoothly.

# ⚙ Techonologies/Libraries/Packages Used
## Frontend 
- **[Font-Awesome](https://fontawesome.com/)** - For getting different icons 
- **[Google Fonts](https://fonts.google.com/)** - For getting different fonts
- **[particles.js](https://vincentgarreau.com/particles.js/)** - For creative backgrounds 

## Backend
- **[NodeJS](https://nodejs.org/en/docs/)** - For the server
- **[ExpressJS](https://expressjs.com/)** - For handling the incoming requests from the clients
- **[PostgreSQL](https://www.postgresql.org/)** - Database that stores information of all users and products. It is used with [pg](https://www.npmjs.com/package/pg), a PostgreSQL client for NodeJS
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** - To hash passwords befoe saving them in database
- **[JSON Web Token](https://jwt.io/)** - To authenticate the client who has made any request
- **[dotenv](https://www.npmjs.com/package/dotenv)** - For storing the environment varibles

# 💻 Local Setup
### 1. Clone the project into local device and open terminal inside the corresponding folder
### 2. Make sure NodeJS is already installed. If not, download from [here](https://nodejs.org/en/download/)
### 4. Run the following command in the terminal
> ``` npm install ```
#### The project has been successfully installed in the device.
### 5. To run the project,run the command
> ``` nodemon index.js ```
### 6. Now go to your default browser, and type the following command
> ```localhost ```

*Steps 1-4 are needed for first-time installation only. Only steps 5 and 6 will be needed while devolping the project.*

# 🤝 Team Members
- ### Kailash Kejriwal (2020BCS-044)
- ### Gurpreet Singh (2020BCS-036)
- ### Gaurav Kishor Sukhramani (2020BCS-033)
