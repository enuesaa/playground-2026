const http = require('http')

const [host, port] = process.env.AWS_LAMBDA_HTTP_ENDPOINT.split(':')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: 'hello' }))
})

server.listen(port, host)
