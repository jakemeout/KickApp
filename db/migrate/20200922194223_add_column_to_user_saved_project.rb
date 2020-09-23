class AddColumnToUserSavedProject < ActiveRecord::Migration[6.0]
  def change
    add_column :user_saved_projects, :claimed, :boolean,  null: false, default: false
    add_column :user_saved_projects, :claimed_by, :integer, foreign_key: {to_table: 'users'}
  end
end
