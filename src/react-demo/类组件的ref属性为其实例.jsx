import React, { useCallback, useRef } from "./libs/react";
import ReactDOM from "./libs/react-dom";

// import React, { forwardRef, useCallback, useRef } from "react";
// import ReactDOM from "react-dom";

class ClassChild extends React.Component {
  render() {
    console.log(this);
    return <input type="text" />;
  }
}

function Parent() {
  const childRef = useRef();
  const onGetFocus = () => {
    console.log(childRef);
  };
  return (
    <div>
      <ClassChild ref={childRef} />
      <button onClick={onGetFocus}>get child focus</button>
    </div>
  );
}

ReactDOM.render(<Parent />, document.getElementById("root"));
