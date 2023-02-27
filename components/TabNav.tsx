import React from "react";
import { prompt } from "@/utils/prompt";

interface IProps {
	tabKey: string;
	toggleKey: (k: string) => void;
}

export default function TabNav(props: IProps) {
	const { tabKey, toggleKey } = props;
	return (
		<div className="mt-20">
			<nav className="flex border-b border-gray-100 text-sm font-medium">
				{prompt.map((p) => (
					// rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<span
						key={p.key}
						onClick={() => toggleKey(p.key)}
						className={`-mb-px text-base cursor-pointer border-b px-4 sm:px-8 py-4 hover:text-cyan-500 ${
							tabKey === p.key
								? "border-current text-cyan-500"
								: "border-transparent"
						}`}
					>
						{p.label}
					</span>
				))}
			</nav>
		</div>
	);
}
