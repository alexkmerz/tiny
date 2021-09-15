# Tiny

Smallest framework i can make

NOTE: Use at your own risk

---

## Http

Server routes and middleware

```javascript
import { app, listen } from '@alexkmerz/tiny'

app.middleware('world', async (req, res) => {
  const forbidden = Math.random() < 0.5
  if (forbidden) {
    res.writeHead(404)
    return res.end('Forbidden')
  }
})

app.get('/hello', async (req, res) => {
  res.writeHead(200)
  return res.end('Hello World')
})

listen(8080)
```

---

## Bus

```javascript
import { bus } from '@alexkmerz/tiny'

bus.on('event', async () => {
  console.log('event)
})
bus.emit('event')
```

---

## Schedule

```javascript
import { bus, register } from '@alexkmerz/tiny'

bus.on('scheduler ready', () => register('event', 5000))
bus.on('event', () => {
  console.log('event')
})

```