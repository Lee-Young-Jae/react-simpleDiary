import React, { useCallback, useEffect, useRef, useState } from "react";
import { message } from "antd";

const DiaryEditor = ({ onCreate }) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [emotionValue, setEmotionValue] = useState(1);
  const authorInput = useRef();
  const contentInput = useRef();

  const onChangeAutor = useCallback((e) => {
    setAuthor(e.target.value);
  }, []);
  const onChangeContent = useCallback((e) => {
    setContent(e.target.value);
  }, []);
  const onChageEmotionValue = useCallback((e) => {
    setEmotionValue(e.target.value);
  }, []);

  const onSubmit = () => {
    if (author.length <= 1) {
      message.warning("작성자는 최소 1글자 이상 입력해 주세요.");
      authorInput.current.focus();
      return;
    }
    if (content.length <= 4) {
      message.warning("일기 본문은 최소 5글자 이상 입력해 주세요.");

      contentInput.current.focus();

      return;
    }
    onCreate(author, content, emotionValue);
    // console.log(author, content, emotionValue);
    setAuthor("");
    setContent("");
    setEmotionValue(1);
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>

      <div>
        <input
          ref={authorInput}
          name="author"
          value={author}
          onChange={onChangeAutor}
          placeholder="작성자"
        ></input>
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={content}
          onChange={onChangeContent}
          placeholder="일기"
        ></textarea>
      </div>

      <div>
        <label htmlFor="emotionSelect">
          오늘의 감정점수 :
          <select
            name="emotion"
            id="emotionSelect"
            onChange={onChageEmotionValue}
            value={emotionValue}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
      </div>

      <div>
        <button onClick={onSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default React.memo(DiaryEditor);
