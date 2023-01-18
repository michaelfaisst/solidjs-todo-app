import { Signal, createSignal } from "solid-js";
import type { Todo } from "./todo";

const createStoredSignal = <T>(
    key: string,
    defaultValue: T,
    storage = localStorage
): Signal<T> => {
    const initialValue = storage.getItem(key)
        ? (JSON.parse(storage.getItem(key) || "") as T)
        : defaultValue;

    const [value, setValue] = createSignal<T>(initialValue);

    const setValueAndStore = ((arg) => {
        const v = setValue(arg);
        storage.setItem(key, JSON.stringify(v));
        return v;
    }) as typeof setValue;

    return [value, setValueAndStore];
};

export const [todos, setTodos] = createStoredSignal<Todo[]>("todos", []);

export const addTodo = (newTodo: Todo) => {
    setTodos([newTodo, ...todos()]);
};

export const removeTodo = (todo: Todo) => {
    setTodos(todos().filter((x) => x.id !== todo.id));
};

export const clearTodos = () => {
    setTodos([]);
};

export const moveTodo = (fromIndex: number, toIndex: number) => {
    const updatedTodos = todos().slice();
    updatedTodos.splice(toIndex, 0, ...updatedTodos.splice(fromIndex, 1));
    setTodos(updatedTodos);
};

export const togglTodo = (todo: Todo) => {
    const updated = todos().map((x) => {
        if (x.id === todo.id) {
            return {
                ...todo,
                checked: !todo.checked
            };
        }

        return x;
    });

    setTodos([...updated]);
};

export const clearCheckedTodos = () => {
    setTodos([...todos().filter((x) => !x.checked)]);
};

export const updateTodoName = (todo: Todo, newName: string) => {
    console.log(todo, newName);
    const updated = todos().map((x) => {
        if (x.id === todo.id) {
            return {
                ...todo,
                name: newName
            };
        }

        return x;
    });

    setTodos([...updated]);
};
