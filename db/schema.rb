# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160221030512) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "countries", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "countries", ["name"], name: "index_countries_on_name", unique: true, using: :btree

  create_table "currencies", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "currencies", ["name"], name: "index_currencies_on_name", unique: true, using: :btree

  create_table "languages", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "languages", ["name"], name: "index_languages_on_name", unique: true, using: :btree

  create_table "listing_images", force: :cascade do |t|
    t.integer  "listing_id",         null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  add_index "listing_images", ["listing_id"], name: "index_listing_images_on_listing_id", using: :btree

  create_table "listings", force: :cascade do |t|
    t.integer  "shop_id",     null: false
    t.string   "title",       null: false
    t.float    "price",       null: false
    t.integer  "quantity",    null: false
    t.text     "description", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "listings", ["shop_id"], name: "index_listings_on_shop_id", using: :btree

  create_table "shops", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.string   "shop_name",   null: false
    t.integer  "language_id", null: false
    t.integer  "country_id",  null: false
    t.integer  "currency_id", null: false
    t.string   "seller_type", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "shops", ["user_id", "shop_name"], name: "index_shops_on_user_id_and_shop_name", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "gender",             default: "rather", null: false
    t.string   "email",                                 null: false
    t.string   "username",                              null: false
    t.string   "password_digest",                       null: false
    t.string   "session_token",                         null: false
    t.string   "location"
    t.string   "birthday"
    t.text     "about"
    t.text     "materials"
    t.boolean  "shop_owner",         default: false,    null: false
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "cart"
    t.string   "provider"
    t.string   "uid"
  end

  add_index "users", ["email", "username", "session_token"], name: "index_users_on_email_and_username_and_session_token", unique: true, using: :btree
  add_index "users", ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree

end
