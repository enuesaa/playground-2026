require "http/client"

url = ARGV[0]?
if url.nil?
  STDERR.puts "usage: mycurl <url>"
  exit 1
end

response = HTTP::Client.get(url)
STDERR.puts "HTTP #{response.status_code}"
puts response.body
