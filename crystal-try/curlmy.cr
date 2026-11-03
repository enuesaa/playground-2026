require "http/client"
require "option_parser"

headers = HTTP::Headers.new
include_headers = false
url = ""

# parse
OptionParser.parse do |p|
  p.banner = "Usage: curlmy [options] URL"

  p.on("-H HEADER", "Add a request header") do |h|
    name, _, value = h.partition(':')
    headers[name.strip] = value.strip
  end
  p.on("-i", "Include response headers in the output") do
    include_headers = true
  end
  p.on("-h", "Print help message") do
    puts p
    exit
  end

  p.unknown_args do |args|
    url = args.first? || abort(p.to_s)
  end

  p.invalid_option { |flag| abort "Invalid option: #{flag}\n#{p}" }
  p.missing_option { |flag| abort "Missing argument for: #{flag}\n#{p}" }
end

# make a http request
response = HTTP::Client.get(url, headers: headers)

# print
if include_headers
  puts "#{response.version} #{response.status_code} #{response.status_message}"
  response.headers.each do |name, values|
    puts "#{name}: #{values.join(", ")}"
  end
  puts
end

print response.body

# exit
exit(1) unless response.success?
