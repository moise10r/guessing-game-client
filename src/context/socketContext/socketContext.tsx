import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
  } from 'react';
  
  import { socket } from '@/services/socket.service';
  
  interface ProviderProps {
    children: ReactNode;
  }
  
  type SocketContextProps = {
    socketConnected: boolean;
  };
  
  const Context = createContext<SocketContextProps>({
    socketConnected: false,
  });
  
  const SocketProvider = ({ children }: ProviderProps) => {
    const [connected, setConnected] = useState(false);
  
    useEffect(() => {
      const onConnect = () => {
        setConnected(true);
        console.info('%c Connected to sockets');
      };
  
      const onDisconnect = () => {
        setConnected(false);
        console.info('%c Disconnected from sockets');
      };
  
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
  
      return () => {
        socket.removeListener('connect', onConnect);
        socket.removeListener('disconnect', onDisconnect);
      };
    }, []);
  
    const state: SocketContextProps = {
      socketConnected: connected,
    };
  
    return <Context.Provider value={state}>{children}</Context.Provider>;
  };
  
  const useSocketContext = () => useContext(Context);
  
  export { SocketProvider, useSocketContext };
  