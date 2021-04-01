class CreatePayments < ActiveRecord::Migration[6.0]
  def change
    create_table :payments do |t|
      t.integer :sponsor_id
      t.integer :project_id
      t.integer :amount_paid

      t.timestamps
    end
  end
end
