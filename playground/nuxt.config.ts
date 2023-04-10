import { Server } from 'socket.io';

export default defineNuxtConfig({
  modules: ['../src/module'],
  socketIO: {
    socketFunctions: (io: Server) => {
      io.on('connection', (socket) => {
        console.log('a user connected');


        socket.on('message', (msg:any) => {
          console.log('message: ' + msg);
        });

        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      });
    }
  }
})
