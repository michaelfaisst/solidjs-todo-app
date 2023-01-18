import { Component, createEffect, createSignal, Show } from "solid-js";
import { FiSun, FiMoon, FiGithub } from "solid-icons/fi";

const Header: Component = () => {
    const [darkMode, setDarkMode] = createSignal(
        localStorage.getItem("theme") === "dark" ||
            (localStorage.getItem("theme") == null &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
    );

    console.log(
        localStorage.getItem("theme"),
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    createEffect(() => {
        if (darkMode()) {
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
        } else {
            localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark");
        }
    });

    return (
        <div class="absolute top-4 right-4 w-full flex flex-row justify-end gap-2">
            <button
                class="w-10 h-10 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-white rounded-full"
                onClick={() => setDarkMode(!darkMode())}
            >
                <Show when={darkMode()} fallback={<FiMoon class="w-5 h-5" />}>
                    <FiSun class="w-5 h-5" />
                </Show>
            </button>
            <a
                href="https://github.com/michaelfaisst/solidjs-todo-app"
                target="_blank"
                class="w-10 h-10 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-white rounded-full"
            >
                <FiGithub />
            </a>
        </div>
    );
};

export default Header;
