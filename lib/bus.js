const subscriptions = new Map()

const subscribe = async (type, fn) => {
  if(!subscriptions.has(type)) subscriptions.set(type, [])
  subscriptions.set(type, [ ...subscriptions.get(type), fn ])
}

const emit = async (type, payload) => {
  if(!subscriptions.get(type)) return
  subscriptions.get(type).map(fn => fn(payload))
}

export { subscribe, emit }