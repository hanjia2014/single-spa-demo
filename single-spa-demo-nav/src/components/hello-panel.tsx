export const HelloPanel = ({ message, children }) => {

  return (
    <div>
      <h1>{message}</h1>
      {children}
    </div>  
  );
}