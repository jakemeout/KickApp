class RenameUserColumnNameToIsSponsor < ActiveRecord::Migration[6.0]
  def change
    rename_column :users, :is_sponser, :is_sponsor
  end
end
