import { createServer } from 'http'

const routes = new Map()
const app = new Proxy({}, {
  get: (_,method) => (...args) => routes.set(`${method}:${args[0]}`, args.slice(1,4))
})

const start = async port => {
  createServer(async (req, res) => {
    const key = `${req.method.toLowerCase()}:${req.url.split('?')[0]}`
    if(routes.has(key)) {
      const route = [ ...routes.get(key) ]
      if(route.length != 1)
        for (const m of route[0]) await routes.get(`m:${m}`)[0](req, res)
      await route[route.length-1](req, res)
    }
    if(!routes.has(key)) {
      res.writeHead(404)
      res.end('Not found')
    }
  }).listen(port || 80, () => console.log(`Listening on port ${ port || 80 }...`))
}

export { start, app }