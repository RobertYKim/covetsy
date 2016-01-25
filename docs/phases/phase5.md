# Phase 5: Reviews

## Rails
### Models
* Reviews

### Controllers
* Api::ReviewsController (create, show, index, update, destroy)

### Views
* reviews/index.json.jbuilder
* reviews/show.json.jbuilder

## Flux
### Views (React Components)
* reviews/show.jsx
* reviews/edit.jsx
* reviews/index.jsx

### ApiUtil
* ApiUtil.fetchAllReviews
* ApiUtil.fetchSingleReview
* ApiUtil.createReview
* ApiUtil.updateReview
* ApiUtil.destroyReview

### Actions
* ReviewActions.receiveAllReviews
* ReviewActions.receiveSingleReview

### Constants
* review_constants.js

### Stores
* Reviews

## Gems/Libraries
