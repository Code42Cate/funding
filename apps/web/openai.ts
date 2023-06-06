import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getEmbedding = async (text: string) => {
  const openaiRes = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input: text,
  });

  return openaiRes.data.data[0].embedding ? JSON.stringify(openaiRes.data.data[0].embedding) : null;
};
