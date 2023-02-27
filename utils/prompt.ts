enum TYPE {
	WORD = "word",
	TEXT = "text",
}

const prompt = [
	{
		key: "word_explanation",
		label: "单词解释",
		type: TYPE.WORD,
		prompt:
			"告诉我'xxx0'的词性和音标，并使用中文和英文解释该词的意思，同时告诉我这个词是怎么来的？是如何构造出来的？最后用这个词写3句英文例句",
	},
	{
		key: "word_story",
		label: "单词故事",
		type: TYPE.WORD,
		prompt: "使用'xxx0'写一个能帮助记忆单词含义的英文故事",
	},
	// {
	// 	key: "word_compare",
	// 	label: "单词比对",
	// 	prompt: "xxx0和xxx1的区别在哪里？",
	// },
	{
		key: "word_match",
		label: "动词搭配",
		type: TYPE.WORD,
		prompt:
			"请告诉我跟'xxx0'搭配使用的常见小品词有哪些，并使用这些短语分别写1个英文句子。",
	},
	{
		key: "word_prefix",
		label: "单词词缀",
		type: TYPE.WORD,
		prompt:
			"请告诉我由'xxx0'构成的常见英文单词，并解释其中文含义，最后用所有这些词语写成一个能帮助我记忆单词含义的英文故事。",
	},
	{
		key: "trans-en",
		label: "英译中",
		type: TYPE.TEXT,
		prompt: "请将'xxx0'翻译成中文，直接给出答案",
	},
	{
		key: "trans-zh",
		label: "中译英",
		type: TYPE.TEXT,
		prompt: "请将'xxx0'翻译成英文，直接给出答案",
	},
];

const getPrompt = (key: string, params: string[]) => {
	// find the prompt
	let promptValue = prompt.find((item) => item.key === key)?.prompt || "";
	// replace keywords in prompt
	params.forEach((item: string, index: number) => {
		promptValue = promptValue.replace(`xxx${index}`, item);
	});
	return `你是一个英文学习助手，${promptValue}，将答案以markdown格式给出，并要求整洁美观，除了我需要的答案，请不要随意补充任何文本`;
};

const getType = (key: string) => {
	return prompt.find((item) => item.key === key)?.type || "";
};

export { prompt, getPrompt, getType, TYPE };
