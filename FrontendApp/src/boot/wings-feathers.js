import io from 'socket.io-client'

import feathers from '@feathersjs/feathers'
import auth from '@feathersjs/authentication-client'
import socketio from '@feathersjs/socketio-client'
// import feathers from '@feathersjs/client'
// let auth = feathers.authentication
// let socketio = feathers.socketio

import EventEmitter from 'events'
import { isEmpty, ceil, forEach, some, findIndex, isFunction } from 'lodash'
const localforage = require('localforage')

export default (host, services) => {
  host = host || 'http://localhost:3030' // IP and port of the server
  let socket = io(host)

  let app = feathers()

  app
    .configure(socketio(socket, {
      timeout: 180000
    }))
    .configure(auth({
      timeout: 180000,
      jwtStrategy: 'jwt', // the name of the JWT authentication strategy
      entity: 'user', // the entity you are authenticating (ie. a users)
      service: 'users', // the service to look up the entity
      cookie: host + '-jwt', // the name of the cookie to parse the JWT from when cookies are enabled server side
      storageKey: host + '-jwt', // the key to store the accessToken in localstorage or AsyncStorage on React Native
      storage: window.localStorage // Passing a WebStorage-compatible object to enable automatic storage on the client.
    }))

  app.serve = async (serviceName, defaultQuery) => {
    let service = app.service(serviceName)

    service.status = 'offline'
    service.total = 0
    service.data = []
    service.skip = 0
    service.page = 1
    service.limit = 10

    service.defaultQuery = { channels: [], query: {}, ...defaultQuery }

    let store = localforage.createInstance({
      name: `${app.io.io.uri}/${serviceName}`
    })

    let event = new EventEmitter()

    service.onDataChange = (listner) => {
      // event.removeAllListeners()
      event.on('dataChange', async data => {
        // console.log('event._events.dataChange', event._events.dataChange)
        let listners = event._events.dataChange
        // console.log('Event', listners.length - 1)
        let ind = (listners.length - 1) || -1
        listner(data, ind)
        if (service.data.length) {
          await store.setItem('total', service.total)
          await store.setItem('data', service.data)
          await store.setItem('skip', service.skip)
          await store.setItem('page', service.page)
          await store.setItem('limit', service.limit)
        }
      })
      event.emit('dataChange', service.data)
    }

    service.removeDataListener = (i) => {
      // event.removeAllListeners()
      if (i >= 0) {
        event._events.dataChange.splice(i, 1)
      } else {
        event.removeAllListeners()
      }
    }

    service.reQuery = (q, options) => {
      let opt = {
        triggerInit: true,
        action: 'update', // update
        ...options
      }
      // console.log(serviceName + ' reQuery po', q)
      if (opt.action === 'update') {
        service.defaultQuery = { channels: [], query: {}, ...q }
      } else if (opt.action === 'patch') {
        if (q) q.query = { ...service.defaultQuery.query, ...q.query }
        service.defaultQuery = { ...service.defaultQuery, ...q }
      }
      // console.log(serviceName, q, service.defaultQuery)
      service.defaultQuery.query.$skip = 0
      service.page = 1
      if (opt.triggerInit) return service.init()
    }

    service.init = async () => {
      let findPromise = service.find(service.defaultQuery)
      findPromise.catch(async error => {
        console.error(`${serviceName} service`, error)
        console.log('Auth', service.connection.authentication)
        if (service.connection.authentication) {
          service.total = await store.getItem('total') || 0
          service.data = await store.getItem('data') || []
          service.skip = await store.getItem('skip') || 0
          service.page = await store.getItem('page') || 0
          service.limit = await store.getItem('limit') || 0
        } else {
          service.total = 0
          service.data = []
          service.skip = 0
          service.page = 1
          service.limit = 0
        }

        if (!event._events) {
          service.status = 'offline'
        }
        event.emit('dataChange', [...service.data])
      })
      const result = await findPromise
      service.data = result.data
      service.status = 'online'
      service.total = result.total
      service.limit = result.limit
      event.emit('dataChange', result.data)

      return findPromise
    }

    service.loadMoreData = async () => {
      let pages = ceil(service.total / 10)
      if ((service.page) <= pages) {
        service.defaultQuery.query = Object.assign(service.defaultQuery.query, {
          $skip: service.page * service.limit
        })
        const result = await service.find(service.defaultQuery)
        service.total = result.total
        // console.log('result.skip', service.page)
        service.page++
        forEach(result.data, record => {
          if (!some(service.data, { _id: record._id })) {
            service.data.push(record)
            event.emit('dataChange', service.data)
          }
        })
      }
    }

    service.loadAllData = async () => {
      let pages = ceil(service.total / 10)
      if ((service.page) <= pages) {
        await service.loadMoreData()
        service.loadAllData()
      }
    }

    service.on(`created`, message => {
      // console.log('CREATED', service.defaultQuery.channels)
      service.total = service.total + 1
      const inChannel = service.defaultQuery.channels.filter(ch => {
        let nestedProp = ch.prop.split('.').reduce((o, i) => o[i], message)
        // console.log(ch.value, nestedProp)
        if (ch.prop === 'owner') console.log('owner', ch.value, nestedProp)
        if (isFunction(ch.value)) {
          return ch.value(nestedProp, message)
        } else {
          return ch.value === nestedProp
        }
      }).length
      let index = findIndex(service.data, { _id: message._id })
      let channelLength = service.defaultQuery.channels.length
      if (index === -1 && (!channelLength || inChannel)) {
        service.data.unshift(message)
        event.emit('dataChange', service.data)
      }
    })

    service.on(`removed`, message => {
      // Listen for when a message is deleted from the server and remove it from the view
      service.total = service.total - 1
      const inChannel = service.defaultQuery.channels.filter(ch => {
        let nestedProp = ch.prop.split('.').reduce((o, i) => o[i], message)
        if (isFunction(ch.value)) {
          return ch.value(nestedProp, message)
        } else {
          return ch.value === nestedProp
        }
      }).length
      let index = findIndex(service.data, { _id: message._id })
      let channelLength = service.defaultQuery.channels.length
      if (index > -1 && (!channelLength || inChannel)) {
        service.data.splice(index, 1)
        event.emit('dataChange', service.data)
      }
    })

    service.on(`patched`, message => {
      // update the view for all socket clients
      const inChannel = service.defaultQuery.channels.filter(ch => {
        let nestedProp = ch.prop.split('.').reduce((o, i) => o[i], message)
        if (ch.prop === 'owner') console.log('owner', ch.value, nestedProp)
        if (isFunction(ch.value)) {
          return ch.value(nestedProp, message)
        } else {
          return ch.value === nestedProp
        }
      }).length
      console.log('service.data', service.data)
      let index = findIndex(service.data, { _id: message._id })
      let channelLength = service.defaultQuery.channels.length
      console.log('PATCHED HOY!', index, inChannel, service.data, message)
      if (index > -1 && (!channelLength || inChannel)) { // meron sa data and meron sa channel
        service.data[index] = Object.assign(service.data[index], message)
        event.emit('dataChange', service.data)
      } else if (!channelLength || inChannel) { // wala sa data pero meron sa channel, so add it
        service.data.unshift(message)
        event.emit('dataChange', service.data)
      } else if (index > -1 && !(!channelLength || inChannel)) { // meron sa data pero WALA sa channel, so remove it
        service.data.splice(index, 1)
        event.emit('dataChange', service.data)
      }
    })

    service.on(`updated`, message => {
      const inChannel = service.defaultQuery.channels.filter(ch => {
        let nestedProp = ch.prop.split('.').reduce((o, i) => o[i], message)
        if (isFunction(ch.value)) {
          return ch.value(nestedProp, message)
        } else {
          return ch.value === nestedProp
        }
      }).length
      // update the view for all socket clients
      let index = findIndex(service.data, { _id: message._id })
      // console.log('UPDATED', message, 'InChannel', inChannel, 'Index', index)
      let channelLength = service.defaultQuery.channels.length
      if (index > -1 && (!channelLength || inChannel)) {
        service.data[index] = Object.assign(service.data[index], message)
        event.emit('dataChange', service.data)
      }
    })

    app.io.on('disconnect', () => {
      service.status = 'offline'
      event.emit('dataChange', [...service.data])
    })
    app.io.on('connect', () => {
      service.status = 'online'
      if (service.data.length) {
        service.reQuery()
      }
    })

    await service.init()

    return service
  }

  // Initialize and reQuery

  for (var key in services) {
    if (isEmpty(services[key])) {
      app.serve(key).catch(() => {})
    } else {
      app.serve(key, services[key]).catch(() => {})
    }
  }

  app.reQuery = async () => {
    for (var key in app.services) {
      // console.log(app.services[key])
      await app.services[key].reQuery()
    }
  }

  // app.authenticate()

  // app.on('authenticated', app.reQuery)
  app.on('logout', app.reQuery)

  return app
}
