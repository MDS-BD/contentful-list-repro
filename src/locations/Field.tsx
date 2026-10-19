import type { FieldAppSDK } from "@contentful/app-sdk";
import type { JSX } from "preact";

import { FieldWrapper } from "@contentful/default-field-editors";

import {
	MultipleResourceReferenceEditor,
} from "@contentful/field-editor-reference";
import { useAutoResizer, useSDK } from "@contentful/react-apps-toolkit";


const ListHelper = (): JSX.Element => {
	const sdk = useSDK<FieldAppSDK>();
	const field = sdk.field;

	useAutoResizer();

	const parameters =
		sdk.parameters && "instance" in sdk.parameters
			? sdk.parameters
			: { instance: { showCreateEntityAction: true, showLinkEntityAction: true } };

	return (
		<FieldWrapper sdk={sdk} name={field.name} showFocusBar={false}>
			<MultipleResourceReferenceEditor
				apiUrl={""}
				isInitiallyDisabled={false}
				parameters={parameters}
				getEntryRouteHref={(route) => {
					return `https://app.contentful.com/spaces/${route.spaceId}/environments/${route.environmentId}/entries/${route.entryId}`;
				}}
				sdk={sdk}
				viewType="link"
				hasCardEditActions
				renderCustomCard={() => (<>Foobar</>)}
			/>
		</FieldWrapper>
	);
};

export default ListHelper;
