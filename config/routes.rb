Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
      resources :charges
      delete '/save/:id', to: 'user_saved_projects#delete'
      get '/save/:id', to: 'user_saved_projects#show'
      post '/save', to: 'user_saved_projects#create'
      post '/projects', to: 'projects#create'
      post '/users', to: 'auth#create'
      post '/login', to: 'auth#create'
      get '/projects', to: 'projects#index'
      get '/profile', to: 'users#profile'
      patch '/projects/:id', to: 'projects#update'
    end
  end
end
