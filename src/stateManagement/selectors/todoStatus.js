import { selector } from "recoil";
import { todoListState } from "../atom/todoListState";

export const todoStatus = selector({
  key: "TodoStatus",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalItems = todoList.length;
    const itemCompleted = todoList.filter(
      (item) => item.isTaskCompleted
    ).length;
    const itemInCompleted = todoList.length && totalItems - itemCompleted;
    const itemCompletionPercent = todoList.length
      ? (itemCompleted / totalItems) * 100
      : 0;
    return {
      totalItems: totalItems,
      completed: itemCompleted,
      Incompleted: itemInCompleted,
      completion: `${
        Number.isInteger(itemCompletionPercent)
          ? itemCompletionPercent
          : itemCompletionPercent.toFixed(2)
      }%`,
    };
  },
});
