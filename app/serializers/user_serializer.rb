class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :username, :password, :github, :website, :other_links, :is_developer, :is_sponsor
end
