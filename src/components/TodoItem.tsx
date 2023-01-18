import {
    createSortable,
    transformStyle,
    useDragDropContext
} from "@thisbeyond/solid-dnd";
import { HiOutlineX } from "solid-icons/hi";
import { FiMenu } from "solid-icons/fi";
import type { Component } from "solid-js";
import { createEffect, createSignal, Show } from "solid-js";
import { removeTodo, togglTodo, updateTodoName } from "../store";
import type { Todo } from "../todo";
import clickOutside from "../utils/click-outside";
false && clickOutside;

interface Props {
    todo: Todo;
}

const TodoItem: Component<Props> = (props) => {
    const { todo } = props;
    const sortable = createSortable(todo.id);
    const [state] = useDragDropContext()!;

    const [editMode, setEditMode] = createSignal(false);
    let editInputRef: HTMLInputElement | undefined;

    createEffect(() => {
        if (editMode() && editInputRef) {
            editInputRef.focus();
        }
    });

    return (
        <div
            ref={sortable.ref}
            class="relative bg-white dark:bg-slate-800 rounded-md px-6 py-3 border border-slate-100 dark:border-slate-700 shadow-sm flex flex-row gap-4 items-center text-slate-600 dark:text-slate-200 overflow-hidden"
            classList={{
                "opacity-75": sortable.isActiveDraggable,
                "transition-transform":
                    !!state.active.draggable && !sortable.isActiveDraggable
            }}
            style={transformStyle(sortable.transform)}
        >
            <div
                class="absolute left-0 top-0 w-1 h-full transition-colors"
                classList={{
                    "bg-green-300": todo.checked,
                    "bg-blue-300": !todo.checked
                }}
            />

            <input
                type="checkbox"
                class="w-4 h-4 rounded-full border bg-white border-slate-300 text-green-500"
                checked={todo.checked}
                onChange={() => togglTodo(todo)}
            />

            <Show when={!editMode()}>
                <div
                    class="flex-1"
                    classList={{
                        "line-through": todo.checked,
                        "text-slate-300": todo.checked
                    }}
                    onDblClick={() => setEditMode(true)}
                >
                    {todo.name}
                </div>
            </Show>

            <Show when={editMode()}>
                <input
                    ref={editInputRef}
                    value={todo.name}
                    use:clickOutside={() => setEditMode(false)}
                    class="flex-1 outline-none"
                    onChange={(e) =>
                        updateTodoName(todo, e.currentTarget.value)
                    }
                />
            </Show>

            <div
                class="text-slate-400 cursor-grab hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                {...sortable.dragActivators}
            >
                <FiMenu />
            </div>

            <div
                class="text-slate-400 cursor-pointer hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                onClick={() => removeTodo(todo)}
            >
                <HiOutlineX />
            </div>
        </div>
    );
};

export default TodoItem;
