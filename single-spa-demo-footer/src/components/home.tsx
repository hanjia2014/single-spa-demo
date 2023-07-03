import React from "react";

export const Home = props => {
  return (
    <div id="footer" style={{backgroundColor: 'orange', padding: '5em', marginTop: '1em'}}>
      { props.children }
    </div>
  );
}