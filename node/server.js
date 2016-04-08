import express from 'express'
import path from 'path'
import compression from 'compression'

import redis from 'redis'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

import routes from './routes'
import index from './server_index.js'


var app = express()
app.use(compression())

app.use(express.static(path.join(__dirname, 'client', 'public')))


console.log(process.env.REDIS_PORT_6379_TCP_ADDR + ':' + process.env.REDIS_PORT_6379_TCP_PORT);

var client = redis.createClient('6379', 'redis');

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      const appHtml = renderToString(<RouterContext {...props}/>)
      res.send(index)
    } else {
      res.status(404).send('Not Found')
    }
  })
})


app.createServer(app)
  .listen(process.env.PORT || 8080, function () {
    console.log(process.env + ' Listening on port ' + (process.env.PORT || 8080));
  });
