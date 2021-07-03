Rails.application.routes.draw do
  resources :cable_car_views, only: [:index]
  root to: redirect("/cable_car_views")
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
