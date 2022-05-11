import React, { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styledComponents from "styled-components";
import { todoListState } from "../stateManagement/atom";
import { todoFilters, todoStatus } from "../stateManagement/selectors";
import { TodoAddItems, TodoFilter, TodoItem } from "../components";

const TodoContainer = styledComponents.div`
   display:flex;
   flex-direction:column;
   align-items:center;
   justify-content:center
`;

const TodoListContainer = styledComponents.ul`
  flex:1;
  width:100%;
  max-width:calc(100%/1.6);
  padding:2rem;
  background:#ddd;
  border-radius:10px;
  background:#f4f4f4;
  min-height:5rem;
  border:2px solid #e5e5e5;
  & li{
      padding:0.8rem 0rem;
      font-size:18px;
      list-style:none;
      background:#ffffff;
      margin:0.8rem 0rem;
      padding:1rem;
      border-radius:1rem;
  }
`;

const TodoHeader = styledComponents(TodoContainer)`
   flex-direction:row;
   max-width:100%;
   width:100%;
`;

const TodoStatus = styledComponents(TodoHeader)`
   display:inline-flex;
   padding:1.5rem;
   background:#f4f4f4;
   margin-top:1.5rem;
   box-sizing:border-box;
   max-width:calc(100% /1.5);
   width:100%;
   border-radius:10px;
   border:2px solid #e5e5e5;
`;

const StausBox = styledComponents.div`
  border:5px solid #ffffff;
  padding:1.2rem;
  min-height:3rem;
  min-width:3rem;
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius: 25px;
  background: #5166ff;
  margin:0rem 1.3rem;
  color:#ffffff;
  font-size:40px;
  box-shadow:0px 0px 7px #d0d0d0;
`;

const StatusBoxWrapper = styledComponents.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  
  span{
    margin:1rem 0rem 0rem;
    text-transform:Capitalize;
  }
`;

const DefaultText = styledComponents.div`
  text-align:center;
    padding: 5rem;
    font-size: 2rem;
    text-transform: capitalize;
    font-weight: bold;
    background: #ffffff;
    width: calc(100% / 1.5);
    box-sizing: border-box;
    border-radius: 10px;
    border: 4px dotted #afafaf;
    margin: 2rem 0rem;
`;

const Todolist = () => {
  const todoValues = useRecoilValue(todoFilters);
  const setTodoVlues = useSetRecoilState(todoListState);
  const todoListStatus = useRecoilValue(todoStatus);
  const todoRef = useRef();

  useEffect(() => {
    const handleOutsiedeClick = (event) => {
      if (todoRef.current && !todoRef.current.contains(event.target)) {
        setTodoVlues((prevItems) => {
          const data = prevItems.map((item) => ({
            ...item,
            isEditable: false,
          }));
          return [...data];
        });
      }
    };
    document.addEventListener("mousedown", handleOutsiedeClick);
    return () => {
      document.addEventListener("mousedown", handleOutsiedeClick);
    };
  }, [todoRef]);

  const listOutTodo = todoValues.length ? (
    <TodoListContainer ref={todoRef}>
      {todoValues.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </TodoListContainer>
  ) : (
    <DefaultText>Add item to lists</DefaultText>
  );

  return (
    <TodoContainer>
      <h1> Add Your Task For The Day </h1>
      <TodoHeader>
        <TodoAddItems />
        <TodoFilter />
      </TodoHeader>
      <TodoStatus>
        {Object.entries(todoListStatus).map(([key, value], index) => (
          <StatusBoxWrapper>
            <StausBox key={index}>{value}</StausBox>
            <span>{key}</span>
          </StatusBoxWrapper>
        ))}
      </TodoStatus>
      {listOutTodo}
    </TodoContainer>
  );
};

export default Todolist;
