import { createServer } from 'http'

const routes = new Map([[
  '404', async (_,res) => {
    res.writeHead(404)
    return res.end('404')
  }
]])
const router = new Proxy({}, {
  get: (_,method) => (path, fn) => routes.set(`${method}:${path}`, fn)
})

const start = async port => {
  createServer(async (req, res) => {
    const key = `${req.method.toLowerCase()}:${req.url.split('?')[0]}`
    if(routes.has(key)) await routes.get(key)(req, res)
    await routes.get('404')(req, res)
  }).listen(port || 80, () => {
    console.log(`Listening on port ${ port || 80 }...`)
  })
}

export { start, router }