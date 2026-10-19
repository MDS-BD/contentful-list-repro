import type { FieldAppSDK } from "@contentful/app-sdk";
import type { Entry } from "@contentful/field-editor-reference";
import type { PlainClientAPI } from "contentful-management";
import type { JSX } from "preact";

import { FormControl } from "@contentful/f36-components";
import tokens from "@contentful/f36-tokens";
import { ValidationErrors } from "@contentful/field-editor-validation-errors";
import { css, cx } from "@emotion/css";
import { useEffect, useState } from "preact/compat";

const styles = {
	withFocusBar: css({
		marginLeft: tokens.spacingL,
		marginRight: tokens.spacingL,
		marginBottom: "29px",
		marginTop: "19px",
		paddingLeft: tokens.spacingM,
		borderLeft: `3px solid ${tokens.gray300}`,
		transition: "border-color 0.18s linear",
		"&:focus-within": {
			borderColor: tokens.colorPrimary,
		},
		'&[aria-invalid="true"]': {
			borderLeftColor: tokens.red500,
		},
	}),
	label: css({
		display: "flex",
		width: "100%",
		maxWidth: "800px",
		color: tokens.gray500,
		fontSize: tokens.fontSizeM,
		fontWeight: tokens.fontWeightNormal,
		lineHeight: tokens.lineHeightDefault,
		whiteSpace: "pre-wrap",
	}),
	helpText: css({
		margin: `${tokens.spacingXs} 0`,
		fontStyle: "italic",
	}),
};

interface FieldWrapperProps {
	children: JSX.Element;
	className?: string;
	getEntryURL?: (entry: Entry) => string;
	name: string;
	renderHeading?: (name: string) => JSX.Element;
	renderHelpText?: (helpText: string) => JSX.Element;
	sdk: FieldAppSDK;
	showFocusBar?: boolean;
}

export function FieldWrapper(props: FieldWrapperProps): JSX.Element {
	const { ids } = props.sdk;
	const defaultGetEntryUrl = (entry: Entry): string =>
		`/spaces/${ids.space}/environments/${ids.environmentAlias || ids.environment}/entries/${entry.sys.id}`;
	const {
		name,
		sdk,
		className,
		children,
		renderHeading,
		renderHelpText,
		showFocusBar = true,
		getEntryURL = defaultGetEntryUrl,
	} = props;
	const { field } = sdk;
	const helpText = (sdk.parameters?.instance as { helpText?: string } | undefined)?.helpText ?? "";
	const [hasErrors, setHasErrors] = useState(false);

	useEffect(() => {
		return field.onSchemaErrorsChanged((errors) => {
			setHasErrors((errors || []).length > 0);
		});
	}, [field]);

	const fieldControlId = [field.id, field.locale, sdk.contentType?.sys?.id].filter((item) => item).join("-");

	// const click = useCallback(() => {
	// 	sdk.dialogs.selectMultipleResourceEntities({
	// 		allowedResources: [
	// 			{
	// 				source: "contentful",
	// 				type: "Entry",
	// 				contentTypes: ["listHeroBanner"],
	// 			},
	// 		],
	// 		locale: field.locale,
	// 		referencingEntryId: sdk.ids.entry,
	// 	});
	// }, [field.locale, sdk.dialogs, sdk.ids.entry]);

	return (
		<FormControl
			id={fieldControlId}
			testId="entity-field-controls"
			data-test-id="entity-field-controls"
			className={cx(showFocusBar && styles.withFocusBar, className)}
			aria-invalid={hasErrors}
			isRequired={field.required}
		>
			{renderHeading ? (
				renderHeading(name)
			) : (
				<>
					<FormControl.Label className={styles.label}>{name}</FormControl.Label>
					{/* <button onClick={click}>CLICK HERE</button> */}
				</>
			)}
			{children}
			<ValidationErrors
				field={field}
				cma={sdk.cma as unknown as PlainClientAPI}
				locales={sdk.locales}
				getEntryURL={getEntryURL || defaultGetEntryUrl}
			/>
			{renderHelpText ? (
				renderHelpText(helpText)
			) : (
				<FormControl.HelpText testId="field-hint" className={styles.helpText}>
					{helpText}
				</FormControl.HelpText>
			)}
		</FormControl>
	);
}
