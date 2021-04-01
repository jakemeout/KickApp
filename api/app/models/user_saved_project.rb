class UserSavedProject < ApplicationRecord
    belongs_to :user, optional: true
    belongs_to :project

    belongs_to :claimed_by, class_name: :User, optional: true
end
