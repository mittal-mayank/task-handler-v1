const express = require('express')
const tasks = require('./routes/tasks')

const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => console.log('<<<< Server running on port:', port, '>>>>'))

app.use(express.urlencoded({extended: true}))
app.use('/', express.static('./public'))
app.use('/tasks', tasks)