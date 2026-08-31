# There is no ActiveRecord in this app (see app/models/concerns/couch_model.rb),
# so the usual ActiveRecord-provided `db:seed` task doesn't exist. This
# defines a small stand-in with the same name/UX.
namespace :db do
  desc "Reset CouchDB and load mock bookshop data (db/seeds.rb)"
  task seed: :environment do
    load Rails.root.join("db/seeds.rb")
  end
end
