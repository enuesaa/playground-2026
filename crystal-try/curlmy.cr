require "http/client"
require "option_parser"

headers = HTTP::Headers.new
include_headers = false

parser = OptionParser.new do |p|
  p.banner = "Usage: curlmy [options] URL"

  p.on("-H HEADER", "Add a request header") do |h|
    k, _, v = h.partition(':')
    headers[k.strip] = v.strip
  end
  p.on("-i", "Include response headers in the output") { include_headers = true }
  p.on("-h", "Show this help") do
    puts p
    exit
  end

  p.invalid_option { |flag| abort "Invalid option: #{flag}\n#{p}" }
  p.missing_option { |flag| abort "Missing argument for: #{flag}\n#{p}" }
end

parser.parse

target : String = ARGV.first? || abort(parser.to_s)

# make a http request
response = HTTP::Client.get(target, headers: headers)

if include_headers
  puts "#{response.version} #{response.status_code} #{response.status_message}"
  response.headers.each { |k, v| puts "#{k}: #{v.join(", ")}" }
  puts
end

print response.body

exit(1) unless response.success?
