import { selector } from "recoil";
import { todoListState } from "../atom/todoListState";
import { todoListFilter } from "../atom/todoListFilter";

export const todoFilters = selector({
  key: "TodoFilterSelector",
  get: ({ get }) => {
    // PureFuntion
    const todoListFiter = get(todoListFilter);
    const todoList = get(todoListState);

    switch (todoListFiter) {
      case "Completed":
        return todoList.filter((item) => item.isTaskCompleted);
      case "Incompleted":
        return todoList.filter((item) => !item.isTaskCompleted);
      default:
        return todoList;
    }
  },
});
