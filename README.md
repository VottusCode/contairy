# Contairy

Simple Service Container for Node.js written in TypeScript.

(formerly `@matherioneu/container`)

## Setup

### Installation

```shell
$ yarn add contairy
# NPM:
$ npm i contairy
```

## Usage

### Registering services

You can register all your services by using the `useContainer()` to get the
Container instance and then calling `Container#register(services)`. Alternatively,
you can also use the `registerContainerServices(services)` function.

Both examples will assume you have a services object, for example this one:

```ts
const services = {
  redis: RedisController,
}
```

#### Usage 1 - `Container#register(services)`

```ts
import { useContainer } from 'contairy'

// ...

// The main Container instance
const container = useContainer()

// Register services in the container
container.register(services)
```

#### Usage 2 - `registerContainerServices(services)`

```ts
import { registerContainerServices } from 'contairy'

// ...

// The function returns the Container instance
const container = registerContainerServices(services)
```

### Using Services

To get your service, you can call the `Container#service(serviceName)` function
on your Container instance (which can be acquired by `useContainer()`).

```ts
const container = useContainer()

const redisService = container.service<RedisController>('redis')
```

Additionally, there's another hook called `useServices()` which returns all the registered
service in the main Container instance. Unlike `Container#service()`, result of useServices()
will stay the same, meaning that if a service gets modified, `Container#service()` will always get you
the latest one at the time of calling the function, but `useServices()` result will have the services
from when you first called `useServices()`.

### Main Container Instance

By `main Controller instance` we're referring to the instance that all exported functions and hooks use.
In your application, you can create more Container instance, but only the main one will be used by hooks.
You can set the main Controller instance with the `setContainer(container)` function:

```ts
import { useContainer, setContainer, Container } from 'contairy'

// Calling the useContainer will now
// give you the default Container instance
// which is empty.
const oldContainer = useContainer()

console.log(container.service('hello')) // null

// Creating your own Container instance.
const newContainer = new Container()

// Registering a `hello` service to `newContainer`.
newContainer.register({ hello: 'world' })

// Setting the `newContainer` as the main container
setContainer(newContainer)

// Calling the useContainer again will now give
// you `newContainer`
const currentContainer = useContainer()

console.log(currentContainer.service('hello')) // world
```

<hr>

This project is licensed under the GNU General Public License v3.0.
