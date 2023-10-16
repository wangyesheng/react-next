function createBrowserHistory() {
  const listeners = [];
  const globalHistory = window.history;

  const history = {
    action: "POP", // 当前最后一个动作是什么，
    location: {
      pathname: window.location.pathname,
      state: window.history.state,
    },
    go,
    goBack,
    goForward,
    push,
    listen,
  };

  window.addEventListener("popstate", (e) => {
    history.action = "POP";
    history.location.pathname = window.location.pathname;
    history.location.state = window.history.state;
    notify();
  });

  function listen(listener) {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  function go(n) {
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function push(pathnameOrRouteOptions, state) {
    history.action = "PUSH";
    if (typeof pathnameOrRouteOptions === "object") {
      history.location.pathname = pathnameOrRouteOptions.pathname;
      history.location.state = pathnameOrRouteOptions.state;
    } else {
      history.location.pathname = pathnameOrRouteOptions;
      history.location.state = state;
    }
    globalHistory.pushState(state, null, history.location.pathname);
    notify();
  }

  function notify() {
    listeners.forEach((listener) => listener(history.location));
  }

  return history;
}

export default createBrowserHistory;
