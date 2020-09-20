class Project < ApplicationRecord
        belongs_to :project_submitter, class_name: :User, optional: true
        belongs_to :project_developer, class_name: :User, optional: true
end
