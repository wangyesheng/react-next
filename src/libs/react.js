import { Component, PureComponent, memo } from "./Component";
import { REACT_TEXT } from "./constants";

function wrapToVDOM(el) {
  return typeof el === "string" || typeof el === "number"
    ? { type: REACT_TEXT, props: { content: el } }
    : el;
}

function createElement(type, config, children) {
  let ref, key;
  if (config) {
    key = config.key;
    delete config.key;

    ref = config.ref;
    delete config.ref;

    delete config.__source;
    delete config.__self;
  }
  const props = {
    ...config,
  };
  if (arguments.length > 3) {
    children = Array.prototype.slice.call(arguments, 2).map(wrapToVDOM);
  } else {
    children = wrapToVDOM(children);
  }
  props.children = children;
  // console.log("createElement", {
  //   type,
  //   key,
  //   ref,
  //   props,
  // });
  return {
    type,
    key,
    ref,
    props,
  };
}

function createRef() {
  return { current: null };
}

function createContext(defaultValue) {
  function Provider(props) {
    Provider._value = Object.assign(Provider._value, props.value);
    return props.children;
  }
  Provider._value = defaultValue || {};

  function Consumer(props) {
    return props.children(Provider._value);
  }

  return {
    Provider,
    Consumer,
  };
}

function cloneElement(element, newProps, ...newChildren) {
  return {
    ...element,
    props: {
      ...element.props,
      ...newProps,
      children:
        newChildren && newChildren.length > 0
          ? newChildren.map(wrapToVDOM)
          : element.props.children,
    },
  };
}

function forwardRef(FunctionComponent) {
  return class extends Component {
    render() {
      return FunctionComponent(this.props, this.ref);
    }
  };
}

function useImperativeHandle(ref, factory) {
  return (ref.current = factory());
}

export default {
  Component,
  PureComponent,
  createElement,
  createRef,
  createContext,
  cloneElement,
  memo,
  forwardRef,
  useImperativeHandle,
};

export {
  useState,
  useCallback,
  useMemo,
  useReducer,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "./react-dom";
