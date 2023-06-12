import React from "react";

interface IHomeProps {
  title: string;
}
export const Home: React.FC<IHomeProps> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}