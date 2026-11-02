const http = require('http')
const port = process.env.PORT || 8080

http
  .createServer((req, res) => {
    const body = {
      message: 'hello',
      path: req.url,
    }
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(body))
  })
  .listen(port)
