import {
    closestCenter,
    DragDropProvider,
    DragDropSensors,
    SortableProvider
} from "@thisbeyond/solid-dnd";
import type { DragEvent } from "@thisbeyond/solid-dnd";
import { For } from "solid-js";
import type { Component } from "solid-js";
import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItem";
import { addTodo, clearCheckedTodos, moveTodo, todos } from "./store";
import { TransitionGroup } from "solid-transition-group";
import Header from "./components/Header";

const App: Component = () => {
    const ids = () => todos().map((x) => x.id);
    const remaining = () => todos().filter((x) => !x.checked).length;

    const onDragEnd = (e: DragEvent) => {
        const { draggable, droppable } = e;

        if (!draggable || !droppable) {
            return;
        }

        const currentItems = ids();
        const fromIndex = currentItems.indexOf(draggable.id.toString());
        const toIndex = currentItems.indexOf(droppable.id.toString());

        if (fromIndex !== toIndex) {
            moveTodo(fromIndex, toIndex);
        }
    };

    return (
        <>
            <Header />
            <div class="flex flex-col items-center">
                <h1 class="mt-16 mb-8 text-5xl font-extralight text-slate-700 dark:text-slate-200 tracking-tight">
                    Todos
                </h1>
                <div class="w-full max-w-lg flex flex-col px-4">
                    <AddTodo onTodoCreated={addTodo} />

                    <DragDropProvider
                        onDragEnd={onDragEnd}
                        collisionDetector={closestCenter}
                    >
                        <DragDropSensors />
                        <ul class="mt-4">
                            <SortableProvider ids={ids()}>
                                <For each={todos()}>
                                    {(todo) => (
                                        <div class="mb-2">
                                            <TodoItem todo={todo} />
                                        </div>
                                    )}
                                </For>
                            </SortableProvider>
                        </ul>
                    </DragDropProvider>

                    <div class="text-slate-400 text-sm mt-4 mb-8 flex flex-col sm:flex-row items-center sm:justify-between">
                        <div class="mb-4 sm:mb-0">
                            {remaining()} todos remaining
                        </div>
                        <div
                            class="cursor-pointer hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                            onClick={clearCheckedTodos}
                        >
                            Clear checked todos
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
