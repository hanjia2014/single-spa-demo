import React, { useEffect, useState } from "react";
// @ts-ignore
import { eventBus$ } from '@han-demo/event-bus';

export const Home = props => {
  const [count, setCount] = useState();
  useEffect(() => {
    eventBus$.subscribe(data => {
      setCount((data || []).length);
    });
  }, []);

  return (
    <div id="footer" style={{backgroundColor: 'orange', padding: '5em', marginTop: '1em'}}>
      <p>user count: { count }</p>
      { props.children }
    </div>
  );
}