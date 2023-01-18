/* @refresh reload */
import { render } from "solid-js/web";

import "@fontsource/raleway/400.css";
import "@fontsource/raleway/200.css";

import "./index.css";
import App from "./App";

declare module "solid-js" {
    namespace JSX {
        interface Directives {
            sortable?: boolean;
        }
    }
}

render(() => <App />, document.getElementById("root") as HTMLElement);
