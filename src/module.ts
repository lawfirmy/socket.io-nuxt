// import {resolve} from 'path'
// import { fileURLToPath } from 'url';
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

import { Server } from 'socket.io';
import errorOut from "./runtime/errorOut";


// Module options TypeScript interface definition
export interface ModuleOptions {
  socketFunctions: (io:any) => void
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'socket.io-nuxt', // Usually the npm package name of your module
    configKey: 'socketIO', // The key in `nuxt.config` that holds your module options
    // Compatibility constraints
    compatibility: {
      nuxt: '^3.0.0'
    }
  },

  // Default configuration options of the Nuxt module
  defaults: {
    socketFunctions: () => {},
  },

  // Shorthand sugar to register Nuxt hooks
  hooks: {},

  async setup (options, nuxt) {
    if(!options.socketFunctions) {
      errorOut('Please provide the socket functions')
      await nuxt.close()
      throw new Error('Please provide the socket functions')
    }

    nuxt.hook('listen', async (server, {host, port}) => {
      const io = new Server(server, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST']
        }
      });
      options.socketFunctions(io)
    })

    // addPlugin({
    //   src: resolve(__dirname, 'runtime/plugin.ts'),
    //   mode: 'server',
    // })

    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  }
})
