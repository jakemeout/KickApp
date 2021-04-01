class AddColumnToProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :completion_date, :string
  end
end
