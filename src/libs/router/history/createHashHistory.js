function getPathname() {
  return window.location.hash.slice(1);
}

function createHashHistory() {
  const listeners = [];
  const historyStack = [];
  let historyIndex = -1;

  const history = {
    action: "POP", // 当前最后一个动作是什么，
    location: {
      pathname: (() => {
        window.location.hash = window.location.pathname;
        return getPathname() || "/";
      })(),
      state: undefined,
    },
    go,
    goBack,
    goForward,
    push,
    listen,
  };

  window.addEventListener("hashchange", () => {
    if (history.action === "PUSH") {
      historyStack[++historyIndex] = history.location;
      console.log("historyStack", historyStack);
    }
    listeners.forEach((listener) => listener(history.location));
  });

  function listen(listener) {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
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
    window.location.hash = history.location.pathname;
  }

  window.addEventListener("popstate", () => {
    listeners.forEach((listener) => listener(history.location));
  });

  function go(n) {
    history.action = "POP";
    historyIndex += n;
    const location = historyStack[historyIndex];
    history.location = {
      pathname: location.pathname,
      state: location.state,
    };
    window.location.hash = location.pathname;
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  return history;
}

export default createHashHistory;
