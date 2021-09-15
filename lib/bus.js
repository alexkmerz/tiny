const subscriptions = new Map()

const subscribe = async (type, fn) =>
  subscriptions.set(type, [ ...(subscriptions.get(type) || []), fn ])

const emit = async (type, ...args) => {
  for (const fn of (subscriptions.get(type) || [])) await fn(args)
}

export { subscribe, emit }