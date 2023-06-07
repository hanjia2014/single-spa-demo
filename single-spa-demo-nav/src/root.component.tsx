import React from "react"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { Home } from "./components/home"

export default function Root(props) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <section>{props.name} is mounted!</section>
        <Home title="app home"/>
      </Provider>
    </React.StrictMode>
  )
}
