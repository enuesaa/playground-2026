# Mock data for the Bookshop API sample app.
#
# Everything here is fictional, in the same spirit as Swagger's Petstore
# sample: no real books, authors, publishers or shops. Where a field would
# normally hold personal data it uses an obviously-fake value instead
# (an @example.com address; a fixed dummy street address). There is no
# phone number field anywhere in the app.
#
# Safe to re-run: it wipes and recreates the CouchDB databases first.

DUMMY_ADDRESS = "東京都千代田区1-1".freeze

puts "Resetting CouchDB databases..."
%w[books bookshops stocks].each { |name| CouchdbConnection.reset_database(name) }

puts "Seeding books..."
book_seeds = [
  { title: "銀河をわたる図書係", author: "架空 太郎", isbn: "978-4-00-000001-1",
    publisher: "サンプル出版", price: 1980, published_on: "2021-04-01",
    description: "Bookshop APIのデモ用に作られた架空の書籍です。" },
  { title: "午前0時の書店員", author: "見本 花子", isbn: "978-4-00-000002-8",
    publisher: "デモ書房", price: 1650, published_on: "2020-11-15",
    description: "Bookshop APIのデモ用に作られた架空の書籍です。" },
  { title: "図書館の亡霊", author: "ダミー 次郎", isbn: "978-4-00-000003-5",
    publisher: "サンプル文庫", price: 880, published_on: "2019-07-20",
    description: "Bookshop APIのデモ用に作られた架空の書籍です。" },
  { title: "活字と珈琲", author: "仮名 三郎", isbn: "978-4-00-000004-2",
    publisher: "テスト出版", price: 1320, published_on: "2022-01-10",
    description: "Bookshop APIのデモ用に作られた架空の書籍です。" },
  { title: "本棚の向こう側", author: "見本 花子", isbn: "978-4-00-000005-9",
    publisher: "デモ書房", price: 1450, published_on: "2018-09-05",
    description: "Bookshop APIのデモ用に作られた架空の書籍です。" },
  { title: "しおりの行方", author: "架空 太郎", isbn: "978-4-00-000006-6",
    publisher: "サンプル文庫", price: 990, published_on: "2023-03-12",
    description: "Bookshop APIのデモ用に作られた架空の書籍です。" },
  { title: "紙の匂いがする街で", author: "ダミー 次郎", isbn: "978-4-00-000007-3",
    publisher: "テスト出版", price: 1760, published_on: "2017-12-01",
    description: "Bookshop APIのデモ用に作られた架空の書籍です。" },
  { title: "最後のページをめくる前に", author: "仮名 三郎", isbn: "978-4-00-000008-0",
    publisher: "サンプル出版", price: 1210, published_on: "2024-02-28",
    description: "Bookshop APIのデモ用に作られた架空の書籍です。" }
]
books = book_seeds.map { |attrs| Book.create(attrs) }

puts "Seeding bookshops..."
# The address is deliberately the same fixed dummy value for every shop, and
# there is no phone number -- see the file header.
bookshop_seeds = [
  { name: "サンプル書店 神保町店", address: DUMMY_ADDRESS, email: "jimbocho@example.com", url: "https://jimbocho.example.com" },
  { name: "デモブックス 銀座本店", address: DUMMY_ADDRESS, email: "ginza@example.com", url: "https://ginza.example.com" },
  { name: "テスト堂書店 渋谷店", address: DUMMY_ADDRESS, email: "shibuya@example.com", url: "https://shibuya.example.com" },
  { name: "Sample Books 池袋店", address: DUMMY_ADDRESS, email: "ikebukuro@example.com", url: "https://ikebukuro.example.com" }
]
bookshops = bookshop_seeds.map { |attrs| Bookshop.create(attrs) }

puts "Seeding stock..."
# [bookshop index, book index, quantity]
stock_seeds = [
  [0, 0, 12], [0, 1, 4], [0, 2, 20], [0, 5, 7],
  [1, 1, 9], [1, 3, 15], [1, 4, 2], [1, 6, 11],
  [2, 0, 6], [2, 4, 18], [2, 5, 3], [2, 7, 10],
  [3, 2, 5], [3, 3, 8], [3, 6, 14], [3, 7, 1]
]
stock_seeds.each do |bookshop_index, book_index, quantity|
  Stock.create(bookshop_id: bookshops[bookshop_index].id, book_id: books[book_index].id, quantity: quantity)
end

puts "Done: #{books.size} books, #{bookshops.size} bookshops, #{stock_seeds.size} stock entries."
