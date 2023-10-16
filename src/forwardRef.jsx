import React, { useCallback, useRef } from "./libs/react";
import ReactDOM from "./libs/react-dom";

// import React, { useCallback, useImperativeHandle, useRef } from "react";
// import ReactDOM from "react-dom";

function Child(props, childRef) {
  return <input type="text" ref={childRef} />;
}

const ForwordedChild = React.forwardRef(Child);

function Child1(props, childRef) {
  const domRef = useRef();
  React.useImperativeHandle(childRef, () => ({
    focus() {
      domRef.current.focus();
    },
  }));
  // childRef.current = {
  //   focus() {
  //     domRef.current.focus();
  //   },
  // };
  return <input type="text" ref={domRef} />;
}

const ForwordedChild1 = React.forwardRef(Child1);

function Parent() {
  const childRef = useRef();
  const onGetFocus = useCallback(() => {
    childRef.current.focus();
  }, []);
  return (
    <div>
      {/* Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()? */}
      <ForwordedChild ref={childRef} />
      <ForwordedChild1 ref={childRef} />
      <button onClick={onGetFocus}>get child focus</button>
    </div>
  );
}

ReactDOM.render(<Parent />, document.getElementById("root"));
