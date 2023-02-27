import {
	OpenAIStream,
	type OpenAIStreamPayload,
} from "@/utils/OpenAIStream";

export const config = {
	runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
	const { description, locale } = (await req.json()) as {
		description: string;
		locale: string;
	};

	if (!description) {
		return new Response("No prompt in the request", { status: 400 });
	}

	const payload: OpenAIStreamPayload = {
		model: "text-davinci-003",
		prompt: description,
		temperature: 0.7,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
		max_tokens: 1536,
		stream: true,
		n: 1,
		stop: ["<|im_end|>"],
	};

	const stream = await OpenAIStream(payload);
	return new Response(stream);
};

export default handler;
