class Project < ApplicationRecord
        belongs_to :project_submitter, class_name: :User
        belongs_to :project_developer, class_name: :User
        has_many :project_comments
end
