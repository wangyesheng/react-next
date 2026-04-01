// import React from "./libs/react";
// import ReactDOM from "./libs/react-dom";

import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { HistoryRouter } from "redux-first-history/rr6";
import ReduxFirstHistory from "./ReduxFirstHistory";
import store from "./@store";

function App() {
  return (
    <Provider store={store}>
      <HistoryRouter history={{}}>
        <ReduxFirstHistory />
      </HistoryRouter>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
