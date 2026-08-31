class BooksController < ApplicationController
  def index
    render json: Book.all
  end

  def show
    render json: Book.find(params[:id])
  end

  def create
    book = Book.create(book_params)
    render json: book, status: :created
  end

  def update
    book = Book.find(params[:id])
    book.update(book_params)
    render json: book
  end

  def destroy
    Book.find(params[:id]).destroy
    head :no_content
  end

  # GET /books/:id/bookshops
  # Which bookshops carry this book, and how many copies each has.
  def bookshops
    book = Book.find(params[:id])
    shops = Stock.for_book(book.id).map do |stock|
      Bookshop.find(stock.bookshop_id).as_json.merge("quantity" => stock.quantity)
    end
    render json: shops
  end

  private

  def book_params
    params.permit(:title, :author, :isbn, :publisher, :price, :published_on, :description).to_h.symbolize_keys
  end
end
