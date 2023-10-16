import { REACT_TEXT } from "./constants";
import { addEvent } from "./event";

let hookStates = [],
  hookIndex = 0,
  scheduleUpdate;

export function useState(defaultValue) {
  hookStates[hookIndex] =
    hookStates[hookIndex] ||
    (typeof defaultValue === "function" ? defaultValue() : defaultValue);

  const currentIndex = hookIndex;
  function setState(nextState) {
    if (typeof nextState === "function") {
      nextState = nextState(hookStates[currentIndex]);
    }
    // 此时 setState 与 currentIndex 形成了闭包，currentIndex 的值永远都是 useState 函数执行时 hookIndex 的值
    // 闭包：函数+函数能访问的自由变量
    hookStates[currentIndex] = nextState;
    scheduleUpdate && scheduleUpdate();
  }

  return [hookStates[hookIndex++], setState];
}

export function useReducer(reducer, defaultValue) {
  hookStates[hookIndex] =
    hookStates[hookIndex] ||
    (typeof defaultValue === "function" ? defaultValue() : defaultValue);
  const currentIndex = hookIndex;
  function dispatch(action) {
    hookStates[currentIndex] = reducer(hookStates[currentIndex], action);
    scheduleUpdate && scheduleUpdate();
  }
  return [hookStates[hookIndex++], dispatch];
}

export function useMemo(factory, deps) {
  if (hookStates[hookIndex]) {
    const [lastValue, lastDeps] = hookStates[hookIndex];
    const isNotSame = deps.some((item, index) => item !== lastDeps[index]);
    if (isNotSame) {
      const value = factory();
      hookStates[hookIndex++] = [value, deps];
      return value;
    } else {
      hookIndex++;
      return lastValue;
    }
  } else {
    const value = factory();
    hookStates[hookIndex++] = [value, deps];
    return value;
  }
}

export function useCallback(callback, deps) {
  if (hookStates[hookIndex]) {
    const [lastCallback, lastDeps] = hookStates[hookIndex];
    const isNotSame = deps.some((item, index) => item !== lastDeps[index]);
    if (isNotSame) {
      hookStates[hookIndex++] = [callback, deps];
      return callback;
    } else {
      hookIndex++;
      return lastCallback;
    }
  } else {
    hookStates[hookIndex++] = [callback, deps];
    return callback;
  }
}

// 浏览器绘制之后执行
export function useEffect(callback, deps) {
  if (hookStates[hookIndex]) {
    const [destoryFunction, lastDeps] = hookStates[hookIndex];
    const isNotSame =
      !deps || deps.some((item, index) => item !== lastDeps[index]);
    if (isNotSame) {
      destoryFunction && destoryFunction();
      setTimeout(() => {
        const destoryFunction = callback();
        hookStates[hookIndex++] = [destoryFunction, deps];
      });
    } else {
      hookIndex++;
    }
  } else {
    setTimeout(() => {
      const destoryFunction = callback();
      hookStates[hookIndex++] = [destoryFunction, deps];
    });
  }
}

// 浏览器绘制之前执行
export function useLayoutEffect(callback, deps) {
  if (hookStates[hookIndex]) {
    const [destoryFunction, lastDeps] = hookStates[hookIndex];
    const isNotSame =
      !deps || deps.some((item, index) => item !== lastDeps[index]);
    if (isNotSame) {
      destoryFunction && destoryFunction();
      queueMicrotask(() => {
        const destoryFunction = callback();
        hookStates[hookIndex++] = [destoryFunction, deps];
      });
    } else {
      hookIndex++;
    }
  } else {
    queueMicrotask(() => {
      const destoryFunction = callback();
      hookStates[hookIndex++] = [destoryFunction, deps];
    });
  }
}

export function useRef(initialState) {
  hookStates[hookIndex] = hookStates[hookIndex] || { current: initialState };
  return hookStates[hookIndex++];
}

/**
 * 1、将 vdom 转变成真实 dom
 * 2、更新 vdom 上的属性，同步到真实 dom 上
 * 3、将 vdom 的儿子们也变成真实 dom，并挂载到自身
 * 4、将自己（真实dom）挂载到容器上
 * @param {*} vdom string | number | unction | class
 * @param {*} container
 */
function render(vdom, container) {
  debugger;
  mount(vdom, container);
  scheduleUpdate = () => {
    hookIndex = 0;
    // vdom => 永远是最顶层的App
    compareTwoVDOM(container, vdom, vdom);
  };
}

function mount(vdom, container) {
  if (vdom === null || vdom === undefined) return;
  const dom = createDOM(vdom);
  dom && container.appendChild(dom);
  dom && dom.componentDidMount && dom.componentDidMount();
}

export function createDOM(vdom) {
  const { type, props, ref } = vdom;
  let dom;
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props.content);
  } else if (typeof type === "function") {
    if (type.isReactComponent) {
      return mountClassComponent(vdom);
    } else {
      return mountFunctionComponent(vdom);
    }
  } else {
    dom = document.createElement(type);
  }
  updateProps(dom, props);
  if (typeof props.children === "object" && props.children.type) {
    // 只有一个儿子，且儿子是虚拟dom
    mount(props.children, dom);
  } else if (Array.isArray(props.children)) {
    processChildren(props.children, dom);
  }
  vdom.dom = dom;
  ref && (ref.current = dom);
  return dom;
}

function mountClassComponent(vdom) {
  const { type: ClassComponent, props, ref } = vdom;
  const classInstance = new ClassComponent(props);
  ref && (ref.current = classInstance);
  vdom.classInstance = classInstance;
  classInstance.vdom = vdom;
  if (classInstance.componentWillMount) {
    classInstance.componentWillMount();
  }
  if (ClassComponent.getDerivedStateFromProps) {
    const partialState = ClassComponent.getDerivedStateFromProps(
      props,
      classInstance.state
    );
    if (partialState) {
      classInstance.state = {
        ...classInstance.state,
        ...partialState,
      };
    }
  }
  if (ClassComponent.contextType) {
    classInstance.context = ClassComponent.contextType.Provider._value;
  }
  const renderVDOM = classInstance.render();
  renderVDOM.classInstance = classInstance;
  classInstance.oldRenderVDOM = renderVDOM;
  // vdom => 类组件
  // oldRenderVDOM => 类组件render方法返回的虚拟dom元素
  vdom.oldRenderVDOM = renderVDOM;
  const dom = createDOM(renderVDOM);
  if (classInstance.componentDidMount) {
    dom.componentDidMount = classInstance.componentDidMount.bind(classInstance);
  }
  return dom;
}

function mountFunctionComponent(vdom) {
  const { type: FunctionComponent, props } = vdom;
  const renderVDOM = FunctionComponent(props);
  vdom.oldRenderVDOM = renderVDOM;
  return createDOM(renderVDOM);
}

/**
 *
 * @param {*} childrenVDOM 儿子们的虚拟dom
 * @param {*} parentDOM 父真实dom节点
 */
function processChildren(childrenVDOM, parentDOM) {
  for (let i = 0; i < childrenVDOM.length; i++) {
    const vdom = childrenVDOM[i];
    mount(vdom, parentDOM);
  }
}

function updateProps(dom, newProps, oldProps) {
  for (const key in newProps) {
    if (key === "children") continue;
    if (key === "style") {
      const styleObj = newProps[key];
      for (const styleKey in styleObj) {
        dom.style[styleKey] = styleObj[styleKey];
      }
    } else if (key.startsWith("on")) {
      addEvent(dom, key.toLocaleLowerCase(), newProps[key]);
    } else {
      dom[key] = newProps[key];
    }
  }
}

export function compareTwoVDOM(parentDOM, oldVDOM, newVDOM, nextDOM) {
  if (!oldVDOM && !newVDOM) {
  } else if (oldVDOM && !newVDOM) {
    const currentDOM = findDOM(oldVDOM);
    currentDOM && parentDOM.removeChild(currentDOM);
    if (oldVDOM.classInstance && oldVDOM.classInstance.componentWillUnmount) {
      oldVDOM.classInstance.componentWillUnmount();
    }
    if (hookStates[hookIndex]) {
      const [destoryFunction] = hookStates[hookIndex];
      destoryFunction && destoryFunction();
    }
  } else if (!oldVDOM && newVDOM) {
    const newDOM = createDOM(newVDOM);
    if (nextDOM) {
      parentDOM.insertBefore(newDOM, nextDOM);
    } else {
      parentDOM.appendChild(newDOM);
    }
    newDOM.componentDidMount && newDOM.componentDidMount();
  } else if (oldVDOM && newVDOM && oldVDOM.type !== newVDOM.type) {
    const oldDOM = findDOM(oldVDOM);
    const newDOM = createDOM(newVDOM);
    if (oldVDOM.classInstance && oldVDOM.classInstance.componentWillUnmount) {
      oldVDOM.classInstance.componentWillUnmount();
    }
    if (hookStates[hookIndex]) {
      const [destoryFunction] = hookStates[hookIndex];
      destoryFunction && destoryFunction();
    }
    parentDOM.replaceChild(newDOM, oldDOM);
    newDOM.componentDidMount && newDOM.componentDidMount();
  } else {
    updateElement(oldVDOM, newVDOM);
  }
}

function updateElement(oldVDOM, newVDOM) {
  const currentDOM = (newVDOM.dom = findDOM(oldVDOM));
  if (newVDOM.type === REACT_TEXT) {
    if (newVDOM.props.content !== oldVDOM.props.content)
      currentDOM.textContent = newVDOM.props.content;
  } else if (typeof newVDOM.type === "string") {
    updateProps(currentDOM, newVDOM.props, oldVDOM.props);
    updateChildren(currentDOM, newVDOM.props.children, oldVDOM.props.children);
  } else if (typeof newVDOM.type === "function") {
    if (newVDOM.type.isReactComponent && oldVDOM.type.isReactComponent) {
      updateClassComponent(newVDOM, oldVDOM);
    } else {
      updateFunctionComponent(newVDOM, oldVDOM);
    }
  }
}

function updateFunctionComponent(newVDOM, oldVDOM) {
  const parentDOM = findDOM(oldVDOM).parentNode;
  const { type: FunctionComponent, props } = newVDOM;
  const newRenderVDOM = FunctionComponent(props);
  compareTwoVDOM(parentDOM, oldVDOM.oldRenderVDOM, newRenderVDOM);
  newVDOM.oldRenderVDOM = newRenderVDOM;
}

function updateClassComponent(newVDOM, oldVDOM) {
  const classInstance = (newVDOM.classInstance = oldVDOM.classInstance);
  newVDOM.oldRenderVDOM = oldVDOM.oldRenderVDOM;

  if (classInstance.componentWillReceiveProps) {
    classInstance.componentWillReceiveProps(newVDOM.props, {});
  }

  classInstance.updater.emitUpdate(newVDOM.props);
}

function updateChildren(parentDOM, newVChildren, oldVChildren) {
  newVChildren = Array.isArray(newVChildren) ? newVChildren : [newVChildren];
  oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : [oldVChildren];
  const maxLength = Math.max(newVChildren.length, oldVChildren.length);
  for (let i = 0; i < maxLength; i++) {
    const oldVChild = oldVChildren[i];
    const newVChild = newVChildren[i];
    if (!oldVChild && newVChild) {
      const nextVDOM = oldVChildren.find(
        (child, index) => index > i && child && child.dom
      );
      compareTwoVDOM(parentDOM, oldVChild, newVChild, nextVDOM && nextVDOM.dom);
    } else {
      compareTwoVDOM(parentDOM, oldVChild, newVChild);
    }
  }
}

export function findDOM(vdom) {
  const { type } = vdom;
  let dom;
  if (typeof type === "function") {
    dom = findDOM(vdom.oldRenderVDOM);
  } else {
    dom = vdom.dom;
  }
  return dom;
}

const ReactDOM = {
  render,
};

export default ReactDOM;
