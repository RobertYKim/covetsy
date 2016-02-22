# covEtsy

[Live](http://www.covetsy.xyz)

A cover of Etsy, the online marketplace for handmade and vintage goods.

![hero](app/assets/images/hero.png?raw=true "Hero Screenshot")

## Features
* React.js and Flux frontend, Ruby on Rails backend
* Create accounts and authenticate through the app or Facebook/Google OAuth
* Stores passwords as encrypted hashes using BCrypt instead of plain text
* Responsive registration form performs client-side validations using RegEx
* Shop onboarding form uses AJAX to check for shop name availability
* CRUD functionality for listings
* Upload images through Paperclip and AWS S3
* Add listings to shopping cart, which is stored locally on cookies
* Persists shopping cart data between sessions on the database

## Walkthrough
### General
Just like most shopping sites, covEtsy allows users to explore all of the shops
and listings without having to sign in.

However, in order to access covEtsy's more powerful features, such as a
persisting shopping cart, shop creation, and listing manipulation, an account
must be created.

### Registration and Authentication
covEtsy provides three convenient ways to create accounts and to sign in:

* covEtsy
* Facebook
* Google

Using covEtsy requires users to fill out a form, while using Facebook or Google
will pull the same information from their profile.

![authform](app/assets/images/authform.png?raw=true "Auth Form Screenshot")

covEtsy combines registration and sign in of all three options into one modal
component.

With the registration form, client-side validations occur for each input
field as soon as the user loses focus on that field. This is accomplished
using RegEx. If a given input is invalid, a message appears to the right of
the input field.

For the username input, invalid inputs (non-alphanumeric characters) are
actively removed as the user types.

In addition to providing additional feedback, these client-side validations
prevent unnecessary server requests because the form does not initiate a
server request unless all the required fields have valid inputs.

### Homepage
Upon sign in the user is greeted by name. If a name is not available their
username is used instead. The user's profile picture is also used to
personalize the nav bar and profile modal, which allows the user to view their
own profile or sign out.

On the home page, users are shown a random selection of listings, which
encourage engagement and exploration.

![index](app/assets/images/index.png?raw=true "Index Screenshot")

### Profile
Profiles display basic information about the user. When viewing your own
profile, you have the option to change your profile picture by clicking on the
camera icon over your profile picture.

![profile](app/assets/images/profile.png?raw=true "Profile Screenshot")

Clicking on the camera icon opens up a modal where a photo can be selected.

![profilemodal](app/assets/images/profilemodal.png?raw=true "Profile Modal Screenshot")

Users are given a preview of their profile image before uploading. The
uploading is handled by Paperclip and stores the image on AWS S3.

![profilecheck](app/assets/images/profilecheck.png?raw=true "Profile Check Screenshot")

### Sell
In order to sell items, users are required to open up a shop.

![sell](app/assets/images/sell.png?raw=true "Sell Screenshot")

![onboarding](app/assets/images/onboarding.png?raw=true "Onboarding Screenshot")

Creating a shop requires additional information, the most important being the
shop name, which must be unique.

In order to assist with name selection, the onboarding form performs
background AJAX requests to check if the desired name is available. This form
also prevents a server request from being initiated should the shop name
input not be valid.

### Shops
Shop pages display all the listings in a given shop, along with information
about the shop and its owner. When viewing your own shop, you have the option
of adding a new listing.

![shop](app/assets/images/shop.png?raw=true "Shop Screenshot")

![listingform](app/assets/images/listingform.png?raw=true "Listing Form Screenshot")

### Listings
The listing view page displays the following details:
* Item Name
* Shop Name
* Price
* Quantity
* Picture of Item
* Detailed Description

Users can add listings to their cart, whose data is stored on a local cookie
until sign out, when the cart data is saved to the database and the local
cookie is cleared.

![listing](app/assets/images/listing.png?raw=true "Listing Screenshot")

![listingedit](app/assets/images/listingedit.png?raw=true "Listing Edit Screenshot")

On the listing page, users can add the item to their cart. If a user is viewing
their own listing, they have the option to edit the listing as well as delete
the listing.

### Cart
As the a user interacts with the site and adds and removes listings from their
cart, all that information is stored on a local cookie. Only when a user signs
in or out is cart data retrieved from or saved to the database.

![emptycart](app/assets/images/emptycart.png?raw=true "Empty Cart Screenshot")

![fullcart](app/assets/images/fullcart.png?raw=true "Full Cart Screenshot")


## Future Goals
* Search
* Taggings
* Reviews
