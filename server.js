import Koa from 'koa'
import koaStatic from 'koa-static'
import compress from 'koa-compress'

const server = new Koa()

server.use(compress())
server.use(koaStatic('./www'))
server.use((ctx) => {
  ctx.compress = true
  // ctx.set('Content-Type', 'text/plain')
})
server.listen(2020)