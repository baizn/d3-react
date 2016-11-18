
import express from 'express'
import path from 'path'
import superAgent from 'superagent'
const { getPieData, items, getUser, getItem } = require('./mockApi')
let router = express.Router()

// mock apis
router.get('/api/pie', (req, res)=> {
  let data = getPieData()
  console.log('获取到的数据=', data)
  res.send(data)
})

router.get('/api/items', (req, res)=> {
  res.send(items);
});

router.get('/api/users/:id', (req, res)=> {
  res.send(getUser(req.params.id))
})
router.get('/api/item/:id', (req, res)=> {
  res.send(getItem(req.params.id))
})

export default router