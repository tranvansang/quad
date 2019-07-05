const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')

app.use(
  bodyParser.json(),
  bodyParser.urlencoded({extended: true}),
)
app.post('/solve', (req, res) => {
  const {a, b} = req.body
  const delta = Math.sqrt(a ** 2 - 4 * b)
  res.status(200).json([(-a - delta) / 2, (-a + delta)/2]).end()
})
app.get('/script.js', (req, res, next) => {
  fs.readFile(path.resolve(__dirname, './script.js'), (err, data) => {
    if (err) return next(err)
    res.status(200).send(data).end()
  })
})
app.get('/', (req, res) => {
  res.status(200).send(`<html>
<head>
    <script defer src="/script.js"></script>
</head>
<body>
Please enter a and b<br/>
a = <input id="a"/><br/>
b = <input id="b"/><br/>
<button onclick="solve()">Solve</button><br/>
x's values are <span id="x1"></span> and <span id="x2"></span><br/>
<span id="err" style="color: red;"></span>
</body>
  </html>`).end()
})

const port = 8085
app.listen(port, () => { console.log(`app is listening on port ${port}`) })
