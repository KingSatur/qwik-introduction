import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.PUBLIC_OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getDataAboutPokemon = async (
  pokemonName: string
): Promise<string> => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Give me interesting facts about the following pokemon ${pokemonName}`,
    temperature: 0.7,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return (
    response.data.choices[0].text || `I dont have data about ${pokemonName}`
  );
};
