let socket; // Declare a socket variable to manage WebSocket

// Function to initialize the WebSocket connection
export const initSocket = () => {
  socket = new WebSocket('wss://dpbossess.com:3000/ws');
  
  socket.onopen = () => {
    console.log('WebSocket connection established');
  };

  socket.onerror = (error) => {
    console.error('WebSocket Error:', error);
  };

  socket.onclose = (event) => {
    if (event.wasClean) {
      console.log('WebSocket closed cleanly');
    } else {
      console.error('WebSocket closed with error');
    }
  };
};

// Function to close the WebSocket connection
export const closeSocket = () => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close();
    console.log('WebSocket connection closed');
  }
};
