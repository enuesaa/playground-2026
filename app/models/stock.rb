# Inventory: how many copies of a given Book a given Bookshop has on hand.
class Stock
  include CouchModel

  database_name "stocks"
  attributes :bookshop_id, :book_id, :quantity

  def self.for_bookshop(bookshop_id)
    where(bookshop_id: bookshop_id)
  end

  def self.for_book(book_id)
    where(book_id: book_id)
  end
end
