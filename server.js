const WebSocket = require('w');
const PORT = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port: PORT });

console.log('WebSocket server listening on port ${PORT}');

wss.on('connection', ws => {
	ws.on('message', message => {
		wss.clients.forEach(client => {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(message.toString());
			}
		});
	});
});