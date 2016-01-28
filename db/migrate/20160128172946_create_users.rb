class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :gender, {null: false, default: "rather"}
      t.string :email, null: false
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :location
      t.string :birthday
      t.text :about
      t.text :materials
      t.boolean :shop_owner, {null: false, default: false}
      t.timestamps null: false
    end

    add_index :users, [:email, :username, :session_token], unique: true
  end
end
