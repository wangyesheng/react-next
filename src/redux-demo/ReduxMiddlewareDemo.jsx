import React from "react";
import { useDispatch, useSelector } from "./react-redux";
import { ASYNC_ADD } from "./store/action-types";

function Counter() {
  const dispatch = useDispatch();
  const asyncState = useSelector((state) => state.asyncCounter);
  return (
    <div>
      <h1>Aysnc Count: {asyncState.count}</h1>
      <button
        onClick={() => {
          dispatch({
            type: ASYNC_ADD,
            payload: 5,
          });
        }}
      >
        sync +
      </button>
      <button
        onClick={() => {
          // dispatch(function ({ dispatch }) {
          //   setTimeout(() => {
          //     dispatch(function ({ dispatch }) {
          //       setTimeout(() => {
          //         dispatch({
          //           type: ASYNC_ADD,
          //           payload: 5,
          //         });
          //       }, 1000);
          //     });
          //   }, 1000);
          // });

          dispatch(function ({ dispatch }) {
            setTimeout(() => {
              dispatch({
                type: ASYNC_ADD,
                payload: 5,
              });
            }, 1000);
          });
        }}
      >
        thunk +
      </button>
      <button
        onClick={() => {
          dispatch(
            new Promise((resolve) => {
              resolve(function ({ dispatch }) {
                setTimeout(() => {
                  dispatch({
                    type: ASYNC_ADD,
                    payload: 15,
                  });
                }, 1000);
              });
            })
          );
        }}
      >
        promise +
      </button>
    </div>
  );
}

export default Counter;
