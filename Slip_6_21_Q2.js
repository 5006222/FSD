
const events = require('events');

const eventEmitter = new events.EventEmitter();

function onMessageReceived(msg) {
  console.log(`Event Received: ${msg}`);
}

eventEmitter.on('message', onMessageReceived);

setInterval(() => {

  eventEmitter.emit('message', 'Hello! This is an event-driven message.');
}, 2000);
