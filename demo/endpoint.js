const express = require('express')
const json = require('./data/mock.json')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('/', (req, res, next) => {
  const keywords = req.query.keywords ? req.query.keywords.toLowerCase() : ''
  if (!keywords) {
    res.json(json)
  } else {
    setTimeout(() => {
      const newJson = json.filter(j => {
        return (
          j.first_name.toLowerCase().match(keywords) ||
          j.last_name.toLowerCase().match(keywords) ||
          j.email.toLowerCase().match(keywords) ||
          j.gender.toLowerCase().match(keywords)
        )
      })
      res.json(newJson)
    }, 2000)
  }
})

app.listen(8888, () => {
  console.log('Endpoint running on port 8888')
})
