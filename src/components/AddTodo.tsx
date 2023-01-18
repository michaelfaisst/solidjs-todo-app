import { createSignal } from "solid-js";
import type { Component } from "solid-js";
import cuid from "cuid";
import type { Todo } from "../todo";

interface Props {
    onTodoCreated: (newTodo: Todo) => void;
}

const AddTodo: Component<Props> = (props) => {
    const [value, setValue] = createSignal("");

    const handleSubmit = (e: Event) => {
        e.preventDefault();

        props.onTodoCreated({
            id: cuid(),
            name: value(),
            checked: false
        });

        setValue("");
    };

    return (
        <form onSubmit={handleSubmit} class="w-full">
            <input
                class="w-full px-6 py-3 rounded-md text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-green-400 dark:focus:border-green-400 outline-none"
                placeholder="What needs to be done?"
                value={value()}
                onChange={(e) => setValue(e.currentTarget.value)}
            />
        </form>
    );
};

export default AddTodo;
