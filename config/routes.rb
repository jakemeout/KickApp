Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
      post '/votes', to: 'user_votes#create'
      post '/charges', to: 'charges#create'
      post '/stripe', to: 'charges#update'
      post '/abandon_project', to: 'projects#abandon_project'
      post '/complete_project', to: 'projects#complete_project'
      post '/start_project', to: 'projects#start_project'
      get '/claimed', to: 'user_saved_projects#all_claimed'
      get '/claimed/:id', to: 'user_saved_projects#claimed'
      delete '/claim/:id', to: 'user_saved_projects#unclaim'
      post '/claim/', to: 'user_saved_projects#claim'
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
