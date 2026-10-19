import { GlobalStyles } from "@contentful/f36-components";
import { SDKProvider } from "@contentful/react-apps-toolkit";
import { i18n } from "@lingui/core";

import "./index.css";

import { compileMessage } from "@lingui/message-utils/compileMessage";
import { render } from "preact";

import App from "./App.jsx";

i18n.setMessagesCompiler(compileMessage);
i18n.activate("en-US"); // use desired locale code

const root = document.getElementById("root");
if (!root) {
	throw new Error("Missing #root element");
}

render(
	<SDKProvider>
		<GlobalStyles />
		<App />
	</SDKProvider>,
	root,
);
