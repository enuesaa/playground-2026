Rails.application.routes.draw do
  get "health", to: "health#show"

  # Books are the master data (the catalog itself).
  resources :books, only: %i[index show create update destroy] do
    member do
      get :bookshops # which bookshops carry this book, and in what quantity
    end
  end

  # Bookshops are physical shops. Each one holds stock of some books.
  resources :bookshops, only: %i[index show create update destroy] do
    resources :stocks, only: %i[index create update destroy], controller: "bookshops/stocks"
  end
end
