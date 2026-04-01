import React, {
  Component,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ReactReduxContext } from "./ReactReduxContext";
import { bindActionCreators } from "../redux";

export function connect(mapStateToProps, mapDispatchToProps) {
  return function (WrappedComponent) {
    return class extends Component {
      static contextType = ReactReduxContext;
      constructor(props, context) {
        super(props);
        const { getState, dispatch, subscribe } = context.store;

        if (typeof mapStateToProps === "function") {
          this.state = mapStateToProps(getState());
        }

        this.dispatchProps = {};
        if (typeof mapDispatchToProps === "function") {
          this.dispatchProps = mapDispatchToProps(dispatch);
        } else if (
          typeof mapDispatchToProps === "object" &&
          mapDispatchToProps !== null
        ) {
          this.dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
        } else {
          this.dispatchProps = { dispatch };
        }

        this.unsubscribe = subscribe(() => {
          this.setState(mapStateToProps(getState()));
        });
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            {...this.state}
            {...this.dispatchProps}
          />
        );
      }
    };
  };
}

export function connectFn(mapStateToProps, mapDispatchToProps) {
  return function (WrappedComponent) {
    return function (props) {
      const context = useContext(ReactReduxContext);
      const { getState, dispatch, subscribe } = context.store;
      const [state, setState] = useState(mapStateToProps(getState()));

      const dispatchProps = useMemo(() => {
        let dispatchProps = {};
        if (typeof mapDispatchToProps === "function") {
          dispatchProps = mapDispatchToProps(dispatch);
        } else if (
          typeof mapDispatchToProps === "object" &&
          mapDispatchToProps !== null
        ) {
          dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
        } else {
          dispatchProps = { dispatch };
        }
        return dispatchProps;
      }, [dispatch]);

      useEffect(() => {
        const unsub = subscribe(() => {
          setState(mapStateToProps(getState()));
        });

        return () => {
          unsub();
        };
      }, [getState, subscribe]);

      return <WrappedComponent {...props} {...state} {...dispatchProps} />;
    };
  };
}
