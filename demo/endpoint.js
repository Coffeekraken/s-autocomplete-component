const express = require('express')
const json = require('./data/mock.json')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('/', (req, res, next) => {
  const query = req.query.q ? req.query.q.toLowerCase() : ''
  if (!query) {
    res.json(json)
  } else {
    setTimeout(() => {
      const newJson = json.filter(j => {
        return (
          j.first_name.toLowerCase().match(query) ||
          j.last_name.toLowerCase().match(query) ||
          j.email.toLowerCase().match(query) ||
          j.gender.toLowerCase().match(query)
        )
      })
      res.json(newJson)
    }, 2000)
  }
})

app.listen(8888, () => {
  console.log('Endpoint running on port 8888')
})
