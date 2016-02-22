# Covetsy

[Heroku link][heroku] Future link to production site

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

Covetsy is a web application inspired by Etsy built using Ruby on Rails
and React.js. Covetsy allows users to:

- [ ] Create, read, and update account (cannot delete, but can deactivate)
- [ ] Log in / Log out
- [ ] Create, read, and update shop (no delete function in Etsy)
- [ ] Read shops
- [ ] Create, read, update, and delete listings in their shop
- [ ] Read listings
- [ ] Add and remove listings to/from cart
- [ ] Checkout cart to add listings to purchased history
- [ ] Review purchased listings



## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Rails and Flux skeleton for Users and authentication (2 day)

Phase 1 begins with creating a basic landing page that will contain the
container for the application's root React component. I will create a navigation
bar that dynamically renders based on the current user. I will be implementing
both user signup and authentication (using BCrypt) with a modal. Once signed in,
the main landing page will update accordingly and greet the current user.
Then I will build out the front end for viewing, editing, and updating the user
including a basic React Router. This also includes the ability to upload a
profile picture.

[Details][phase-one]

### Phase 2: Shops (1 days)

Phase 2 introduces the user's ability to create a shop. This includes the Rails
MVC backend and Flux frontend architecture. At the end of Phase 2, Shops can be
created, viewed, and edited in the browser.

[Details][phase-two]

### Phase 3: Listings (1 days)

Phase 3 introduces the shop owner's ability to create listings. Listings belong
to a shop, which has its own `Index` view. Create JSON API for Listings.

[Details][phase-three]

### Phase 4: Carts and Checkout (2 day)

Phase 4 introduces the user's ability to add items to a cart. Items placed in
the cart will persist between sessions. If an item is added to the cart and a
user signs in, the items in the cart are added to their own cart. Upon signing
out, the items in the cart are no longer visible. Users can also checkout the
items in their cart, which creates transaction records for each item.

[Details][phase-four]

### Phase 5: Reviews (1 day)

Phase 5 introduces the user's ability to review purchased listings. Reviews
consist of a rating out of five starts along with a space for optional comments.
Shops with reviewed transactions have an `Index` for reviews and also display an
average rating.

[Details][phase-five]

### Phase 6: Styling Cleanup and Seeding (1 day)

Phase 6 will integrate all the features onto the main landing page, which will
now dynamically load content based on the database contents. Additional seeding
will make the application feel fuller and more immersive.

### Bonus Features (TBD)
- [ ] Tag listings with multiple tags and search listings by tag
- [ ] Follow people, admire shops, and favorite items
- [ ] Create treasuries (aka lists)
- [ ] Social media integration
- [ ] Viewing history based suggestions
- [ ] Statistics
- [ ] Messaging

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
