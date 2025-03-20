let socket;
const maxRetries = 5;
let retries = 0;

// Determine WebSocket URL based on environment
const getWebSocketURL = () => {
  const isLocalhost = window.location.hostname === 'localhost';
  return isLocalhost ? 'ws://localhost:3000/ws' : 'wss://dpbossess.com/ws';
};

export const initSocket = () => {
  const wsURL = getWebSocketURL();
  socket = new WebSocket(wsURL);

  socket.onopen = () => {
    console.log('WebSocket connection established to:', wsURL);
    retries = 0; // Reset retries on successful connection
  };

  socket.onerror = (error) => {
    console.error('WebSocket Error:', error);
  };

  socket.onclose = (event) => {
    if (!event.wasClean) {
      console.error('WebSocket closed with error');
      if (retries < maxRetries) {
        console.log(`Retrying connection... Attempt ${retries + 1}/${maxRetries}`);
        retries++;
        setTimeout(initSocket, 3000); // Retry after 3 seconds
      } else {
        console.error('Max retries reached. WebSocket connection failed.');
      }
    } else {
      console.log('WebSocket closed cleanly');
    }
  };
};

export const closeSocket = () => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close();
    console.log('WebSocket connection closed');
  }
};
