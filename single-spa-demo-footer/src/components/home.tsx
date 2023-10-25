import React, { useEffect, useState } from "react";
// @ts-ignore
import { eventBus$, e } from '@han-demo/event-bus';

export const Home = props => {
  const [count, setCount] = useState();
  const [message, setMessage] = useState("message should appear here");

  useEffect(() => {
    eventBus$.subscribe(data => {
      setCount((data || []).length);
    });

    e.on('message', message => {
      setMessage(message.text);
      returnMessageToReactWhenReceived();
    });
  }, []);

  const returnMessageToReactWhenReceived = () => {
    e.emit('received', { text: 'Woohoo! Hello from Angular! 🎉' })
  }

  return (
    <div id="footer" style={{backgroundColor: 'orange', padding: '5em', marginTop: '1em'}}>
      <p>{ message }</p>
      <p>user count: { count }</p>
      { props.children }
    </div>
  );
}