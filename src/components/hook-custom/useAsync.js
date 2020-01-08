import { useReducer, useEffect } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        isLoading: true,
        data: [],
        error: null
      };
    case "SUCCESS":
      return {
        isLoading: false,
        data: action.data,
        error: null
      };
    case "ERROR":
      return {
        isLoading: false,
        data: null,
        error: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const useAsync = (callback, deps = []) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    data: null,
    error: false
  });

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    try {
      const data = await callback();
      dispatch({ type: "SUCCESS", data });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  // 리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook.
  // 클래스형 컴포넌트의 componentDidMount와 componentDidUpdate를 합친 형태로 보아도 무방하다.
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, deps);

  return [state, fetchData];
};

export default useAsync;
