import { message, Modal } from "antd";
import React, { useContext, useRef, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({
  author,
  content,
  created_date,
  emotion,
  id,
  // onRemove,
  // onUpdate,
}) => {
  const { onRemove, onUpdate } = useContext(DiaryDispatchContext);

  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const editForm = useRef();

  const [updateContent, setupdateContent] = useState(content);

  const updateFormToggle = () => {
    setEditMode((prev) => !prev);
    setupdateContent(content);
  };

  const deleteModalOpen = () => {
    setIsRemoveModalVisible(true);
  };

  const updateModalOpen = () => {
    setIsUpdateModalVisible(true);
  };
  const handleCancel = () => {
    setIsRemoveModalVisible(false);
    setIsUpdateModalVisible(false);
  };
  const onChangeUpdateContent = (e) => {
    setupdateContent(e.target.value);
  };

  const onUpdateDiary = () => {
    if (updateContent.length <= 4) {
      message.warning("일기 본문은 최소 5글자 이상 입력해 주세요.");
      editForm.current.focus();
      return;
    }
    onUpdate(id, updateContent);
    setEditMode(false);
    setIsUpdateModalVisible(false);
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정 점수 : {emotion}
        </span>
        <br />
        <span className="date">
          {new Date(created_date).toLocaleDateString()}
        </span>
      </div>
      {editMode ? (
        <>
          <textarea
            ref={editForm}
            value={updateContent}
            onChange={onChangeUpdateContent}
          ></textarea>
          <br></br>
          <button onClick={updateFormToggle}>취소</button>
          <button onClick={updateModalOpen}>저장하기</button>
        </>
      ) : (
        <>
          <div className="content">{content}</div>
          <button onClick={deleteModalOpen}>지우기</button>
          <button onClick={updateFormToggle}>수정하기</button>
        </>
      )}

      <Modal
        title={
          <>
            <ExclamationCircleOutlined /> 일기 삭제
          </>
        }
        visible={isRemoveModalVisible}
        onOk={onRemove(id)}
        okType="danger"
        onCancel={handleCancel}
      >
        <p>
          {new Date(created_date).toLocaleDateString()} 에 작성한 일기를 정말로
          삭제하시겠습니까?
        </p>
      </Modal>
      <Modal
        title={
          <>
            <ExclamationCircleOutlined /> 일기 수정
          </>
        }
        visible={isUpdateModalVisible}
        onOk={onUpdateDiary}
        okType="default"
        onCancel={handleCancel}
      >
        <p>
          {new Date(created_date).toLocaleDateString()} 에 작성한 일기를 정말로
          수정하시겠습니까?
        </p>
      </Modal>
    </div>
  );
};

export default React.memo(DiaryItem);
