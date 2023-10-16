import { compareTwoVDOM, findDOM } from "./react-dom";

export const updateQueue = {
  isBatchingUpdate: false, // 是否批量更新
  updaters: new Set(),
  batchUpdate() {
    for (const updater of this.updaters) {
      updater.updateComponent();
    }
    this.updaters.clear();
  },
};

class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance;
    this.pendingStates = [];
    this.callbacks = [];
  }

  addState(partialState, cb) {
    this.pendingStates.push(partialState);
    if (typeof cb === "function") this.callbacks.push(cb);
    this.emitUpdate();
  }

  emitUpdate(nextProps) {
    nextProps && (this.nextProps = nextProps);
    if (updateQueue.isBatchingUpdate) {
      updateQueue.updaters.add(this);
    } else {
      this.updateComponent();
    }
  }

  updateComponent() {
    const { pendingStates, nextProps } = this;
    if (pendingStates.length > 0 || nextProps) {
      this.shouldUpdate();
    }
  }

  shouldUpdate() {
    const { classInstance, nextProps } = this;
    let nextState = this.getNextState();
    // getDerivedStateFromProps 执行时机在 shouldComponentUpdate 之前
    if (classInstance.constructor.getDerivedStateFromProps) {
      const partialState = classInstance.constructor.getDerivedStateFromProps(
        nextProps,
        classInstance.state
      );
      if (partialState) {
        nextState = {
          ...nextState,
          ...partialState,
        };
      }
    }
    let canUpdate = true;
    if (
      classInstance.shouldComponentUpdate &&
      !classInstance.shouldComponentUpdate(
        nextProps || classInstance.props,
        nextState,
        {}
      )
    ) {
      canUpdate = false;
    }
    if (canUpdate && classInstance.componentWillUpdate) {
      classInstance.componentWillUpdate(
        nextProps || classInstance.props,
        nextState,
        {}
      );
    }

    nextProps && (classInstance.props = nextProps);
    classInstance.state = nextState;
    canUpdate && classInstance.updateClassComponent();
    this.processCallbacks();
  }

  processCallbacks() {
    if (this.callbacks.length > 0) {
      this.callbacks.forEach((cb) => cb());
      this.callbacks.length = 0;
    }
  }

  getNextState() {
    const { classInstance, pendingStates } = this;
    let nextState = classInstance.state;
    pendingStates.forEach((state) => {
      if (typeof state === "function") {
        state = state.call(classInstance, nextState, classInstance.props);
      }

      nextState = {
        ...nextState,
        ...state,
      };
      // Object.assign(nextState, state);
    });
    pendingStates.length = 0;
    return nextState;
  }
}

export class Component {
  static isReactComponent = true;

  constructor(props) {
    this.props = props || {};
    this.state = {};
    this.updater = new Updater(this);
  }

  setState(partialState, cb) {
    this.updater.addState(partialState, cb);
  }

  updateClassComponent() {
    // if (this.constructor.contextType) {
    //   this.context = this.constructor.contextType.Provider._value;
    // }
    const newRenderVDOM = this.render();
    const oldRenderVDOM = this.oldRenderVDOM;
    const oldDOM = findDOM(oldRenderVDOM);
    const snapshot =
      this.getSnapshotBeforeUpdate &&
      this.getSnapshotBeforeUpdate(this.props, this.state);
    compareTwoVDOM(oldDOM.parentNode, oldRenderVDOM, newRenderVDOM);
    this.oldRenderVDOM = newRenderVDOM;
    this.vdom.oldRenderVDOM = newRenderVDOM;
    this.componentDidUpdate &&
      this.componentDidUpdate(this.props, this.state, snapshot);
  }

  forceUpdate(callback) {
    updateQueue.isBatchingUpdate = false;
    if (this.constructor.getDerivedStateFromProps) {
      const partialState = this.constructor.getDerivedStateFromProps(
        this.props,
        this.state
      );
      if (partialState) {
        this.state = {
          ...this.state,
          ...partialState,
        };
      }
    }
    this.updateClassComponent();
    callback && callback();
  }

  render() {
    throw new Error(
      "This method is an abstract method, implemented by subclasses."
    );
  }
}

export class PureComponent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    );
  }
}

function shallowEqual(obj1, obj2) {
  if (obj1 === obj2) {
    // 内存地址一样就相等, 不关心属性变没变
    return true;
  }
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    // 任意一方不是对象或者为 null 就视为不相等
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) return false;
  }

  return true;
}

export function memo(FunctionComponent) {
  return class extends PureComponent {
    render() {
      return FunctionComponent(this.props);
    }
  };
}
