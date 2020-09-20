Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
      post '/projects', to: 'projects#create'
      post '/users', to: 'auth#create'
      post '/login', to: 'auth#create'
      get '/projects', to: 'projects#index'
      get '/profile', to: 'users#profile'
    end
  end
end
