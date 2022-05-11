import React, { useState } from "react";
import styledComponents from "styled-components";
import { useSetRecoilState } from "recoil";
import { todoListState } from "../../stateManagement/atom";

const getRandomId = () => (Math.random() + 1).toString(36).substring(7);

const InputWrapper = styledComponents.div`
   display:flex;
   width:100%;
   max-width:calc(100%/2);
   align-items:center;
   justify-content:center
   
`;

const Input = styledComponents.input`
  padding:1rem;
  box-shadow:none;
  flex:1;
  border-radius:0.5rem;
  margin:0rem 0.7rem;
  font-size:18px;
  border:2px solid #e2e2e2;
`;

const Button = styledComponents.button`
  padding:1rem 0rem;
  width:calc(100%/5);
  font-weight:bold;
  font-size:16px;
  border-radius:0.5rem;
border: 2px solid #e2e2e2;
    background: #f4f4f4;
`;

export const TodoAddItems = () => {
  const [inputVal, setInputVal] = useState("");
  const setTodoItems = useSetRecoilState(todoListState);

  const addItems = () => {
    inputVal &&
      setTodoItems((prevTodoItems) => [
        ...prevTodoItems,
        {
          id: getRandomId(),
          name: inputVal,
          isTaskCompleted: false,
          isEditable: false,
        },
      ]);
    setInputVal("");
  };

  const handleChange = ({ target: { value } }) => {
    setInputVal(value);
  };

  return (
    <InputWrapper>
      <Input value={inputVal || ""} onChange={handleChange} />
      <Button onClick={addItems}>Add Items</Button>
    </InputWrapper>
  );
};
