import { fork } from 'child_process'
import { bus } from './bus'

const __dirname = import.meta.url.split('/').slice(1,-1).join('/')
const scheduler = new fork(`${__dirname}/daemon.js`)
scheduler.on('message', job => bus.emit(job))

const register = async (...args) => scheduler.send(args)

export { register }