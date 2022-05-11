import { atom } from "recoil";

export const todoListFilter = atom({
  key: "TodoListFilter",
  default: "All",
});
