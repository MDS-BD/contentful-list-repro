import type { JSX } from "preact";

import { locations } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import { useMemo } from "preact/compat";

import Field from "./locations/Field.jsx";

const ComponentLocationSettings = {
	[locations.LOCATION_ENTRY_FIELD]: Field,
};

const App = (): JSX.Element | undefined => {
	const sdk = useSDK();

	const Component = useMemo(() => {
		for (const [location, component] of Object.entries(ComponentLocationSettings)) {
			if (sdk.location.is(location)) {
				return component;
			}
		}
	}, [sdk.location]);

	return Component ? <Component /> : undefined;
};

export default App;
