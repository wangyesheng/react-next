import * as types from "./action-types";

export const counter1 = {
  add: (payload) => ({
    type: types.COUNTER1_ADD,
    payload,
  }),
  minus: () => ({
    type: types.COUNTER1_MINUS,
  }),
};

export const counter2 = {
  add: (payload) => ({
    type: types.COUNTER2_ADD,
    payload,
  }),
  minus: () => ({
    type: types.COUNTER2_MINUS,
  }),
};
