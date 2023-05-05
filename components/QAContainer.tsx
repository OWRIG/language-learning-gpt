import React, { useState, useCallback, useEffect } from "react";
import { fetchWithTimeout } from "utils/fetchWithTimeout";
import { getPrompt, getType, TYPE } from "utils/prompt";
import { Toaster, toast } from "react-hot-toast";
import { marked } from "marked";

interface IProps {
	tabKey: string;
}

export default function QAContainer(props: IProps) {
	const { tabKey } = props;
	const [params, setParams] = useState<string[]>([]);
	const [generatedChat, setGeneratedChat] = useState<string>("");
	const [iframeValue, setIframeValue] = useState<string>("");
	const [toggle, setToggle] = useState<boolean>(false);

	useEffect(() => {
		setGeneratedChat("");
	}, [tabKey]);

	const type = getType(tabKey);

	const onInput = useCallback((e: { target: { value: string } }) => {
		const { value } = e.target;
		setParams([value]);
	}, []);

	const onGenerate = async () => {
		if (params.length === 0) {
			toast.error("请输入内容");
			return;
		}
		setGeneratedChat("");

		if (type === TYPE.WORD) {
			setIframeValue(params[0] || "");
		}

		let response;
		try {
			response = await fetchWithTimeout("/api/generate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					description: getPrompt(tabKey, params),
					locale: "zh",
				}),
			});
		} catch (e: unknown) {
			console.error("[fetch ERROR]", e);
			if (e instanceof Error && e?.name === "AbortError") {
				// timeout
				toast.error("timeout");
			}
			return;
		}

		if (!response.ok) {
			toast.error("ERROR: " + response.statusText);
			throw new Error(response.statusText);
		}

		// This data is a ReadableStream
		const data = response.body;
		if (!data) {
			return;
		}

		const reader = data.getReader();
		const decoder = new TextDecoder();
		let done = false;

		while (!done) {
			const { value, done: doneReading } = await reader.read();
			done = doneReading;
			const chunkValue = decoder.decode(value).replace("<|im_end|>", "");
			setGeneratedChat((prev) => prev + chunkValue);
		}
	};

	const onToggle = useCallback(() => {
		setToggle((prev) => !prev);
	}, []);

	return (
		<div className="mt-12">
			<div className="flex flex-row">
				{type === TYPE.WORD && (
					<input
						onChange={onInput}
						onKeyUp={(e) => {
							if (e.key === "Enter") {
								onGenerate();
							}
						}}
						placeholder="请输入问题"
						className="w-48 h-12 px-4 rounded-md border border-gray-200 shadow-sm sm:text-sm focus:border-cyan-500 focus:outline-none text-lg "
					/>
				)}
				{type === TYPE.TEXT && (
					<textarea
						onChange={onInput}
						onKeyUp={(e) => {
							if (e.key === "Enter") {
								onGenerate();
							}
						}}
						placeholder="请输入问题"
						className="w-64 sm:w-96 h-12 px-4 py-2 rounded-md border border-gray-200 shadow-sm sm:text-sm focus:border-cyan-500 focus:outline-none text-lg "
					/>
				)}
				{/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<div
					onClick={onGenerate}
					className="ml-4 sm:ml-8 cursor-pointer sm:block rounded-md border-2 border-black px-2 sm:px-8 py-3 text-sm font-semibold text-black transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:text-cyan-600"
				>
					生成答案
				</div>
				{iframeValue && (
					<div
						onClick={onToggle}
						className="ml-4 sm:ml-8 cursor-pointer sm:block rounded-md border-2 border-black px-2 sm:px-8 py-3 text-sm font-semibold text-black transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:text-cyan-600"
					>
						查看字典
					</div>
				)}
			</div>
			<div className="mt-12 relative block overflow-hidden rounded-lg border-2 border-gray-100 p-4 sm:p-6 lg:p-8">
				{generatedChat ? (
					<article className="prose w-full">
						<p
							className="w-full"
							dangerouslySetInnerHTML={{
								__html: marked(generatedChat.toString()),
							}}
						/>
					</article>
				) : (
					<div className="h-20 border-black">在这里将会生成答案</div>
				)}
				<span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-cyan-500" />
			</div>
			{!!iframeValue && toggle && (
				<div className="mt-12 h-1/3 relative block overflow-hidden rounded-lg border-2 border-gray-100">
					<iframe
						className="mt-8 w-full h-screen"
						src={`https://www.youdao.com/result?word=${iframeValue}&lang=en`}
					/>
					<span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-cyan-500" />
				</div>
			)}
			<Toaster
				position='top-center'
				reverseOrder={false}
				toastOptions={{ duration: 2000 }}
			/>
		</div>
	);
}
