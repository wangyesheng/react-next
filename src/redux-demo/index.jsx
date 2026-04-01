// import React from "./libs/react";
// import ReactDOM from "./libs/react-dom";

import React, { useState } from "react";
import ReactDOM from "react-dom";

import { Provider } from "./react-redux";
import ReduxFirstHistory from "./ReduxFirstHistory";
import store from "./store";

function App() {
  const [count, setCount] = useState(0);
  return (
    <Provider store={store}>
      {count % 2 === 0 ? <ReduxFirstHistory /> : null}
      <button onClick={() => setCount(count + 1)}>+</button>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
