import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import Toast from './components/Toast';
import io from 'socket.io-client';
import { checkSession } from './lib/api';

const socket = io('http://localhost:5000', {
  query: {token: checkSession()},
  transports: ['websocket', 'polling', 'flashsocket'],
  cors: {
    origin: 'http://localhost:3000',
    // Credential: true
  }
});

const App = () => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    socket.on('clientSpecificUpdate', (data) => {
      console.log('Received status update:', data);
      setMessage((prevUpdates) => [...prevUpdates, data]);
    });
    checkSession();
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen">
      <Card />
      {message && <Toast message={message} />}
    </div>
  );
}

export default App;
