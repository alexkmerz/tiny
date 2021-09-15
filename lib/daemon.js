const jobs = new Map()

process.send('scheduler ready')
process.on('message', async args => {
  const interval = `${ args[1] }`
  const existing = jobs.has(interval)
    ? jobs.get(interval).events
    : []
  const iteration = 0
  jobs.set(interval, {
    events: [ ...existing, args[0] ],
    iteration
  })
})

const start = new Date().getTime()
setInterval(() => {
  const now = new Date().getTime()
  const intervals = jobs.keys()
  for (const interval of intervals) {
    const iteration = Math.floor((now - start) / interval)
    const job = jobs.get(interval)
    if(job.iteration != iteration) {
      job.iteration = iteration
      jobs.set(interval, job)
      for (const event of job.events) process.send(event)
    }
  }
}, 1000)