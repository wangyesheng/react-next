import React from "./libs/react";
import ReactDOM from "./libs/react-dom";

// import React from "react";
// import ReactDOM from "react-dom";

let prevScrollHeight = 0;

class Counter extends React.Component {
  state = {
    nums: [],
  };

  numsRef = React.createRef();

  // 获取更新前的快照信息，并将其传入到 componentDidUpdate 的第三个参数中
  getSnapshotBeforeUpdate(prevProps, prevState) {
    return this.numsRef.current;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(
      "snapshot",
      this.numsRef.current.scrollHeight,
      snapshot.scrollHeight
    );
    // console.log(this.numsRef.current.scrollHeight - prevScrollHeight);
  }

  render() {
    this.numsRef.current &&
      (prevScrollHeight = this.numsRef.current.scrollHeight);
    return (
      <div style={{ border: "1px solid #1890ff" }}>
        <button
          onClick={() => {
            const nums = this.state.nums;
            nums.push(nums.length);
            this.setState({
              nums,
            });
          }}
        >
          Click
        </button>
        <ul ref={this.numsRef}>
          {this.state.nums.map((item, index) => (
            <li key={index}>
              {item}-{index}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById("root"));
