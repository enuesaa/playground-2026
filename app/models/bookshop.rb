# A physical shop. Stock (which books it carries, and how many) lives in
# the Stock model rather than here.
#
# This is a sample/demo app (see db/seeds.rb): no real shops, addresses or
# contact details are ever stored. Intentionally, there is no phone number
# field at all.
class Bookshop
  include CouchModel

  database_name "bookshops"
  attributes :name, :address, :email, :url
end
