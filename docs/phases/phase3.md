# Phase 3: Listings

## Rails
### Models
* Listing
* Gallery
* ShippingOption

### Controllers
* Api::ListingsController (create, show, update, destroy)

### Views
* listings/show.json.jbuilder

## Flux
### Views (React Components)
* listings/show.jsx
* listings/edit.jsx

### ApiUtil
* ApiUtil.createListing
* ApiUtil.fetchAllListings
* ApiUtil.fetchSingleListing
* ApiUtil.updateListing
* ApiUtil.destroyListing

### Actions
* ListingActions.receiveAllListings
* ListingActions.receiveSingleListing

### Constants
listing_constants.js

### Stores
* Listings

## Gems/Libraries
