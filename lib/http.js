import { createServer } from 'http'

const ctx = new Map()
const app = new Proxy({}, {
  get: (_,type) => (...args) => ctx.set(`${type}${args.shift()}`, args.flat())
})

const listen = async (port = 8080) => {
  createServer(async (req, res) => {
    const fns = ctx.get(`${req.method.toLowerCase()}${req.url.split('?')[0]}`)
      .map(fn => ctx.has(`middleware${fn}`)
        ? ctx.get(`middleware${fn}`)[0] : fn)
    for (const fn of fns) await fn(req, res)
  }).listen(port)
}

export { app, listen }