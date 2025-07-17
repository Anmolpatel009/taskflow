// src/ai/flows/smart-service-recommender.ts
'use server';

/**
 * @fileOverview A smart service recommender AI agent.
 *
 * - recommendServices - A function that handles the service recommendation process.
 * - RecommendServicesInput - The input type for the recommendServices function.
 * - RecommendServicesOutput - The return type for the recommendServices function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendServicesInputSchema = z.object({
  prompt: z
    .string()
    .describe("A prompt describing the type of service, task poster, or freelancer the user is looking for."),
});
export type RecommendServicesInput = z.infer<typeof RecommendServicesInputSchema>;

const RecommendServicesOutputSchema = z.object({
  recommendation: z.string().describe("A recommendation of a service, task poster, or freelancer based on the prompt."),
});
export type RecommendServicesOutput = z.infer<typeof RecommendServicesOutputSchema>;

export async function recommendServices(input: RecommendServicesInput): Promise<RecommendServicesOutput> {
  return recommendServicesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendServicesPrompt',
  input: {schema: RecommendServicesInputSchema},
  output: {schema: RecommendServicesOutputSchema},
  prompt: `You are a smart service recommender. Based on the user's prompt, you will recommend a service, task poster, or freelancer.

Prompt: {{{prompt}}}

Recommendation: `,
});

const recommendServicesFlow = ai.defineFlow(
  {
    name: 'recommendServicesFlow',
    inputSchema: RecommendServicesInputSchema,
    outputSchema: RecommendServicesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
