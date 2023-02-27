import React, { useCallback, useState } from "react";
import TabNav from "./TabNav";
import QAContainer from "./QAContainer";
import { prompt } from "@/utils/prompt";

export default function Container() {
	const defaultPrompt = prompt[0] || { key: "word_explanation" };
	const [tabKey, setTabKey] = useState<string>(defaultPrompt.key);
	const toggleKey = useCallback((k: string) => {
		setTabKey(k);
	}, []);

	return (
		<div className="flex flex-col">
			<TabNav tabKey={tabKey} toggleKey={toggleKey} />
			<QAContainer tabKey={tabKey} />
		</div>
	);
}
