# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
first_name      | string    |
last_name       | string    |
gender          | string    | not null, default: "Rather not say"
picture         | string    |
location        | string    |
birthday        | string    |
about           | text      |
materials       | text      |
shop_owner      | boolean   | not null, default: false

## shop
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed, unique
language    | string    | not null
country     | string    | not null
currency    | string    | not null
seller_type | string    | not null
shop_name   | string    | not null, unique

## listings
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
shop_id      | integer   | not null, foreign key (references shop), indexed
title        | string    | not null
maker        | string    | not null
use          | string    | not null
made         | string    | not null
category     | string    | not null
price        | float     | not null
quantity     | integer   | not null
auto_renew   | boolean   | not null, default: false
physical     | boolean   | not null, default: true
description  | text      | not null
origin       | string    | not null
process_time | string    |

## shipping option
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
listing_id   | integer   | not null, foreign key (references listings), indexed
destination  | string    | not null
itself_cost  | float     | not null
bundle_cost  | float     |

## gallery
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
listing_id   | integer   | not null, foreign key (references listings), indexed
photo_1      | string    | not null
photo_2      | string    |
photo_3      | string    |
photo_4      | string    |
photo_5      | string    |

## cart
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed

## cart items
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
cart_id     | integer   | not null, foreign key (references cart), indexed
listing_id  | integer   | not null, foreign key (references listings), indexed

## transactions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references user), indexed
listing_id  | integer   | not null, foreign key (references listings), indexed

## reviews
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
transaction_id | integer   | not null, foreign key (references transactions), indexed
stars          | integer   | not null
body           | text      | not null
