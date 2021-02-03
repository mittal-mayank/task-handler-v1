const router = require('express').Router()

let list = []

router.get('/', (req, res) => res.send(list))

router.post('/', (req, res) => {
    // body.task
    list.unshift({
        checked: 'false',
        task: req.body.task
    })
    res.end()
})

router.put('/', (req, res) => {
    // body.pos, body.checked
    list[parseInt(req.body.pos)].checked = req.body.checked
    res.end()
})

router.delete('/', (req, res) => {
    list = list.filter((entry) => {
        return entry.checked === 'false'
    })
    res.end()
})

router.patch('/', (req, res) => {
    let size = list.length
    let i = 0
    while (i < size) {
        if (list[i].checked === 'true') {
            list.push(list.splice(i, 1).pop())
            size--
        } else {
            i++
        }
    }
    console.log(list)
    res.end()
})

module.exports = router