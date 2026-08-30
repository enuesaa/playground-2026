module Bookshops
  # Inventory for a single bookshop: /bookshops/:bookshop_id/stocks
  class StocksController < ApplicationController
    before_action :set_bookshop

    def index
      render json: Stock.for_bookshop(@bookshop.id).map { |stock| serialize(stock) }
    end

    def create
      stock = Stock.create(stock_params.merge(bookshop_id: @bookshop.id))
      render json: serialize(stock), status: :created
    end

    def update
      stock = Stock.find(params[:id])
      stock.update(quantity: params.require(:quantity))
      render json: serialize(stock)
    end

    def destroy
      Stock.find(params[:id]).destroy
      head :no_content
    end

    private

    def set_bookshop
      @bookshop = Bookshop.find(params[:bookshop_id])
    end

    def stock_params
      params.permit(:book_id, :quantity).to_h.symbolize_keys
    end

    def serialize(stock)
      book = Book.find(stock.book_id)
      {
        id: stock.id,
        book_id: stock.book_id,
        title: book.title,
        author: book.author,
        quantity: stock.quantity
      }
    end
  end
end
