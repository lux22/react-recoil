import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styledcomponent from "styled-components";
import { todoListState } from "../../stateManagement/atom";

const ListItem = styledcomponent.li`
  text-decoration:${({ isTaskCompleted }) =>
    isTaskCompleted ? "line-through" : "none"}
`;

const InputControllWrapper = styledcomponent.div`
  display:flex;
  justify-content:space-between;
`;

const InputControl = styledcomponent.div`
  span{
    font-weight:500;
    text-transform:camelCase;
  }
`;

const DeleteControl = styledcomponent.div`
`;

export const TodoItem = ({ item }) => {
  const [listItem, setListItem] = useRecoilState(todoListState);
  const [inputVal, setInputVal] = useState("");
  const index = listItem.findIndex((items) => items === item);

  const handleTaskEdits = (listarray, index, value) => {
    return [
      ...listarray.slice(0, index),
      { ...value },
      ...listarray.slice(index + 1),
    ];
  };

  const handleTaskDelete = (listarray, item) => {
    return [...listarray.slice(0, index), ...listarray.slice(index + 1)];
  };

  const handleEditToggle = () => {
    const elemReset = listItem.map((item) => ({
      ...item,
      isEditable: false,
    }));
    const updatedValue = handleTaskEdits(elemReset, index, {
      ...item,
      isEditable: !item.isEditable,
    });
    setListItem(updatedValue);
    setInputVal(listItem[index].name);
  };

  const handleEditItem = (event) => {
    setListItem(
      handleTaskEdits(listItem, index, {
        ...item,
        name: event.target.value,
      })
    );
    setInputVal(event.target.value);
  };

  const handleTaskCompletion = () => {
    setListItem(
      handleTaskEdits(listItem, index, {
        ...item,
        isTaskCompleted: !item.isTaskCompleted,
      })
    );
  };

  const handleDelete = () => {
    setListItem(handleTaskDelete(listItem, index));
  };

  const isContentEditable = item.isEditable ? (
    <input
      name="itemBox"
      type="text"
      value={inputVal}
      onChange={handleEditItem}
    />
  ) : (
    <>
      <InputControllWrapper>
        <InputControl>
          <input
            name="itemCheckBox"
            type="checkbox"
            defaultValue={""}
            checked={item.isTaskCompleted}
            onChange={handleTaskCompletion}
          />
          <span onClick={(event) => handleEditToggle(event, item)}>
            {item.name}
          </span>
        </InputControl>
        <DeleteControl>
          <button onClick={handleDelete}>Delete</button>
        </DeleteControl>
      </InputControllWrapper>
    </>
  );
  return (
    <ListItem isTaskCompleted={item.isTaskCompleted}>
      {isContentEditable}
    </ListItem>
  );
};
