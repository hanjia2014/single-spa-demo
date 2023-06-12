import { Home } from "./component/home";

export default function Root(props) {
  return (
    <>
      <section>{props.name} is mounted!</section>
      <Home title="Child Home"/>
    </>
  );
}
