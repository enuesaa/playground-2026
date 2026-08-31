# Master data: the book catalog itself, independent of any bookshop.
class Book
  include CouchModel

  database_name "books"
  attributes :title, :author, :isbn, :publisher, :price, :published_on, :description
end
