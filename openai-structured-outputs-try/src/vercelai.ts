import { generateText, Output } from 'ai';
import { z } from 'zod'
import { createOpenAI } from '@ai-sdk/openai';

// see https://ai-sdk.dev/providers/ai-sdk-providers/openai
const openai = createOpenAI({
  apiKey: '',
})

// see https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data
const { output } = await generateText({
  model: openai('gpt-4o-2024-08-06'),
  output: Output.object({
    schema: z.object({
      recipe: z.object({
        name: z.string(),
        ingredients: z.array(
          z.object({ name: z.string(), amount: z.string() }),
        ),
        steps: z.array(z.string()),
      }),
    }),
  }),
  prompt: 'Generate a lasagna recipe.',
});

console.log(output)
// {
//   recipe: {
//     name: 'Classic Lasagna',
//     ingredients: [
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object]
//     ],
//     steps: [
//       'Preheat the oven to 375°F (190°C).',
//       'Cook the lasagna noodles according to package instructions; drain.',
//       'Heat olive oil in a large skillet over medium heat.',
//       'Add ground beef and cook until browned; remove excess fat.',
//       'Add onion and garlic; sauté until onion is translucent.',
//       'Stir in tomato sauce, tomato paste, diced tomatoes, basil, oregano, salt, and pepper. Simmer for 15 minutes.',
//       'In a bowl, mix ricotta cheese, egg, and Parmesan cheese until smooth.',
//       'Spread a layer of meat sauce in a 9x13 inch baking dish.',
//       'Top with a layer of noodles, then spread a layer of the ricotta mixture.',
//       'Sprinkle with 1 cup of mozzarella cheese.',
//       'Repeat layers twice, finishing with meat sauce and remaining mozzarella cheese on top.',
//       'Cover with foil and bake for 25 minutes.',
//       'Remove foil and bake for an additional 25 minutes, until cheese is bubbly and golden.',
//       'Let stand for 15 minutes before serving.'
//     ]
//   }
// }