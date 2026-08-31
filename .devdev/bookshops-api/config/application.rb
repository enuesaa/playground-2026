require_relative "boot"

require "rails"
require "active_model/railtie"
require "action_controller/railtie"

Bundler.require(*Rails.groups)

module BookshopApi
  class Application < Rails::Application
    config.load_defaults 7.1

    # This is a plain JSON API with no ActiveRecord/database.yml involved:
    # all persistence goes through CouchDB via CouchModel (see app/models).
    config.api_only = true

    config.autoload_lib(ignore: %w[tasks])
  end
end
