import { OpenAIStream, type OpenAIStreamPayload } from "@/utils/OpenAIStream";

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

	const payload = {
		model: "gpt-3.5-turbo",
		messages: [{ role: "assistant", content: description }],
		temperature: 0.2,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
		max_tokens: 1536,
		stream: true,
		n: 1,
		stop: ["<|im_end|>"],
	};

	const stream = await OpenAIStream(payload as any);
	return new Response(stream);
};

export default handler;
