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
			"告诉我一个单词的词性和音标，并使用中文和英文解释该词的意思，同时告诉我这个词是怎么来的？是如何构造出来的？最后用这个词写3句英文例句，这个单词是[xxx0]",
	},
	{
		key: "phrase_explanation",
		label: "词组解释",
		type: TYPE.WORD,
		prompt:
			"告诉我一个词组的的所有含义和用法，并就不同的场景给出相应的例句来帮助记忆，这个词组是[xxx0]",
	},
	{
		key: "word_story",
		label: "单词故事",
		type: TYPE.WORD,
		prompt: "使用一个单词写一个能帮助记忆单词含义的英文故事，这个单词是[xxx0]",
	},
	// {
	// 	key: "word_compare",
	// 	label: "单词比对",
	// 	prompt: "xxxx0和xxx1的区别在哪里？",
	// },
	{
		key: "word_match",
		label: "动词搭配",
		type: TYPE.WORD,
		prompt:
			"请告诉我跟一个单词搭配使用的常见小品词有哪些，并使用这些短语分别写1个英文句子，这个单词是[xxx0]",
	},
	{
		key: "word_prefix",
		label: "单词词缀",
		type: TYPE.WORD,
		prompt:
			"请告诉我由一个单词构成的常见英文单词，并解释其中文含义，最后用所有这些词语写成一个能帮助我记忆单词含义的英文故事，这个单词是[xxx0]",
	},
	{
		key: "trans-en",
		label: "英译中",
		type: TYPE.TEXT,
		prompt: "请将[]中的内容翻译成中文，这段话是[xxx0]",
	},
	{
		key: "trans-zh",
		label: "中译英",
		type: TYPE.TEXT,
		prompt: "请将[]中的内容翻译成准确、符合语法的英文，这段话是[xxx0]",
	},
	{
		key: 'enhance-language',
		label: '语言改进',
		type: TYPE.TEXT,
		prompt: '请用简洁明了的语言，编辑一段话，以改善其逻辑流程，消除任何印刷错误，并以输入的语言作答，这段话是[xxx0]'
	},
	{
		key: 'sum-language',
		label: '内容总结',
		type: TYPE.TEXT,
		prompt: '请用简洁明了的语言且不超过100个字来概述一段话，改善其逻辑流程，消除任何印刷错误，并以输入的语言作答，这段话是[xxx0]'
	},
];

const getPrompt = (key: string, params: string[]) => {
	// find the prompt
	let promptValue = prompt.find((item) => item.key === key)?.prompt || "";
	// replace keywords in prompt
	params.forEach((item: string, index: number) => {
		promptValue = promptValue.replace(`xxx${index}`, item);
	});
	return `${promptValue}，将简洁精炼的答案以markdown格式给出，并要求整洁美观，不需要做出任何解释`;
};

const getType = (key: string) => {
	return prompt.find((item) => item.key === key)?.type || "";
};

export { prompt, getPrompt, getType, TYPE };
