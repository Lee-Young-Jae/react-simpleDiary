import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import "./App.css";

import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import reducer, { CREATE, EDIT, INIT, REMOVE } from "./reducer";

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((e) => {
      return {
        id: dataId.current++,
        author: e.email,
        content: e.body,
        emotion: Math.round(Math.random() * 4) + 1,
        created_date: new Date().getTime(),
      };
    });

    dispatch({ type: INIT, data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: CREATE,
      data: { author, content, emotion, id: dataId.current },
    });
    dataId.current += 1;
  }, []);

  const onUpdate = useCallback((id, content) => {
    dispatch({
      type: EDIT,
      data: { id, content },
    });
  }, []);

  const onRemove = useCallback(
    (item) => () => {
      dispatch({
        type: REMOVE,
        data: item,
      });
    },
    []
  );

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((e) => e.emotion >= 3).length;
    const badCount = data.length - goodCount;

    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onUpdate };
  }, []);

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor></DiaryEditor>
          <div>?????? ?????? : {data.length}</div>
          <div>?????? ?????? ?????? ?????? : {goodCount}</div>
          <div>?????? ?????? ?????? ?????? : {badCount}</div>
          <div>?????? ?????? ?????? ?????? : {goodRatio}%</div>
          <DiaryList></DiaryList>
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
