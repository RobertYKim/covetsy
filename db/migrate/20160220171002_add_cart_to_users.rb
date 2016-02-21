class AddCartToUsers < ActiveRecord::Migration
  def change
    add_column :users, :cart, :string
  end
end
