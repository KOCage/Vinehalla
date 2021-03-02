Rails.application.routes.draw do
  root to: 'vines#search'
  get 'vines/add'
  get 'vines/update'
  get 'vines/view'
  get 'vines/create'
  get 'vines/search'
  get 'vines/edit'
  get 'vines/selection'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
