import { Home } from "./components/home";

export default function Root(props) {
  return (
    <Home>
      <section>{props.name} is mounted!</section>
    </Home>
  )
}
