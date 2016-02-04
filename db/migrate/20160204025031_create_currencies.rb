class CreateCurrencies < ActiveRecord::Migration
  def change
    create_table :currencies do |t|
      t.string :name, null: false

      t.timestamps null: false
    end

    add_index :currencies, [:name], unique: true
  end
end
