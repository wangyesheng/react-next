import { useContext } from "react";
import { ReactReduxContext } from "../ReactReduxContext";

export default function useDispatch() {
  const { store } = useContext(ReactReduxContext);
  return store.dispatch;
}
