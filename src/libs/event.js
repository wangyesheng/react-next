/**
 * 合成事件
 * 优势：1、做兼容处理，兼容不同的浏览器；2、在自己写的事件处理函数之前和之后做一些事情，比如批量更新
 */

import { updateQueue } from "./Component";

export function addEvent(dom, eventName, listener) {
  // 自己注册的事件 才有 store 属性
  dom.store = dom.store || (dom.store = {});
  dom.store[eventName] = listener;
  if (!document[eventName]) document[eventName] = dispatchEvent;
}

function createSyntheticEventParams(event) {
  const syntheticEventParams = {
    _wantedStopPropagation: false,
    _stopPropagation() {
      this._wantedStopPropagation = true;
    },
  };
  for (const key in event) {
    syntheticEventParams[key] = event[key];
  }
  return syntheticEventParams;
}

function dispatchEvent(event) {
  let { target, type } = event;
  updateQueue.isBatchingUpdate = true;
  const syntheticEventParams = createSyntheticEventParams(event);
  while (target) {
    if (target.store) {
      const listener = target.store[`on${type}`];
      listener && listener.call(undefined, syntheticEventParams);
      if (syntheticEventParams._wantedStopPropagation) break;
    }
    target = target.parentNode;
  }
  updateQueue.isBatchingUpdate = false;
  updateQueue.batchUpdate();
}
