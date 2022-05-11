import React from "react";
import { useRecoilState } from "recoil";
import { todoListFilter } from "../../stateManagement/atom";
import StyledComponent from "styled-components";

const SelectFilter = StyledComponent.select({
  padding: "1rem 1rem",
  margin: "0rem 1rem",
  appearance: "none",
  borderRadius: "10px",
  border: "2px solid #ddd",
  fontSize: "16px",
});

const SelectOption = StyledComponent.option({
  padding: "1rem 1rem",
  borderRadius: "0rem",
});

export const TodoFilter = () => {
  const [listFilter, setListFilter] = useRecoilState(todoListFilter);

  const handleSelectDropDown = (event) => {
    setListFilter(event.target.value);
  };

  return (
    <div className="selectFilter">
      <SelectFilter value={listFilter} onChange={handleSelectDropDown}>
        <SelectOption defaultValue="All">All</SelectOption>
        <SelectOption value="Incompleted">Incompleted</SelectOption>
        <SelectOption value="Completed">Completed</SelectOption>
      </SelectFilter>
    </div>
  );
};
