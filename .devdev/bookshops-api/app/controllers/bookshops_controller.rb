class BookshopsController < ApplicationController
  def index
    render json: Bookshop.all
  end

  def show
    render json: Bookshop.find(params[:id])
  end

  def create
    bookshop = Bookshop.create(bookshop_params)
    render json: bookshop, status: :created
  end

  def update
    bookshop = Bookshop.find(params[:id])
    bookshop.update(bookshop_params)
    render json: bookshop
  end

  def destroy
    Bookshop.find(params[:id]).destroy
    head :no_content
  end

  private

  def bookshop_params
    params.permit(:name, :address, :email, :url).to_h.symbolize_keys
  end
end
