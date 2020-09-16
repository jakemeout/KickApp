class UserSavedProject < ApplicationRecord
    has_many: :user_saved_projects
    has_many: :projects, through: :user_saved_projects
end
