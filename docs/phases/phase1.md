# Phase 1: Rails and Flux skeleton for Users and authentication

## Rails
### Models
* User

### Controllers
* Api::UsersController (create, show, update)
* Api::SessionsController (create, destroy)

### Views
* static_pages/root.html.erb
* users/show.json.jbuilder
* session/show.json.jbuilder

## Flux
### Views (React Components)
* etsy_clone.jsx (Router)
* nav_bar.jsx
* users/register.jsx
* users/login.jsx
* users/show.jsx
* users/edit.jsx

### ApiUtil
* ApiUtil.createUser
* ApiUtil.fetchUser
* ApiUtil.editUser
* ApiUtil.createSession
* ApiUtil.destroySession

### Actions
* UserAction.receiveUser
* UserAction.logoutUser

### Constants
* user_constants.js
* session_constants.js

### Dispatcher
* dispatcher.js

### Stores
* user_store.js

## Gems/Libraries
* BCrypt (Gem)
* Flux Dispatcher (npm)
* React Router
