Rails.application.routes.draw do
  resources :confirmations
  resources :cable_car_views, only: [:index]
  root to: redirect("/confirmations")
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
