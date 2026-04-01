// function fn() {
//   let num = 1;

//   function getNum() {
//     let _num = num;
//     return function () {
//       return _num;
//     };
//   }

//   function addNum() {
//     num++;
//   }

//   return [getNum, addNum];
// }

// const [getNum, addNum] = fn();
// const getNumFn = getNum();
// console.log(getNumFn());
// addNum();
// console.log(getNumFn());
// addNum();
// console.log(getNumFn());
// addNum();
// console.log(getNumFn());

function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("success");
    }, 3000);
  });
}

getData().then((res) => {
  console.log(res);
});

const middlewares = [
  async function (ctx, next) {
    console.log(ctx, typeof next);
    next();
  },
  function (ctx, next) {
    return new Promise((resolve, reject) => {
      console.log(ctx, next);
    });
  },
];

function compose(ctx) {
  function dispatch(index) {
    const fn = middlewares[index];
    return Promise.resolve(fn(ctx, dispatch.bind(null, index + 1)));
  }
  return dispatch(0);
}

compose({
  request: "request",
  response: "response",
});
