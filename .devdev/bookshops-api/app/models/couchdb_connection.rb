# Talks to the CouchDB server configured via ENV. Connection settings come
# from docker-compose.yml (see the `api` service's `environment:` block).
module CouchdbConnection
  module_function

  def server
    @server ||= CouchRest.new(server_url)
  end

  def server_url
    host = ENV.fetch("COUCHDB_HOST", "localhost")
    port = ENV.fetch("COUCHDB_PORT", "5984")
    user = ENV.fetch("COUCHDB_USER", "admin")
    password = ENV.fetch("COUCHDB_PASSWORD", "password")
    "http://#{user}:#{password}@#{host}:#{port}"
  end

  def database_prefix
    ENV.fetch("COUCHDB_DB_PREFIX", "bookshop")
  end

  # Returns the CouchDB database for the given logical name, creating it on
  # the server first if it doesn't exist yet.
  def database(name)
    server.database!("#{database_prefix}_#{name}")
  end

  # Wipes and recreates a database. Used by db/seeds.rb so re-seeding is
  # idempotent.
  def reset_database(name)
    server.database("#{database_prefix}_#{name}").recreate!
  end
end
