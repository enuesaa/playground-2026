### see https://crystal-lang.org/
require "http/server"

server = HTTP::Server.new do |context|
  context.response.content_type = "text/plain"
  context.response.print "Hello: got #{context.request.path}!"
end

address = server.bind_tcp(8080)
server.listen
