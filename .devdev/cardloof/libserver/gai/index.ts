import { z } from 'zod'
import { generateText, Output } from 'ai'

type TitleComments = {
  title: string
  comments: string[]
}
export const summarizeTitleComments = async (data: TitleComments): Promise<TitleComments> => {
  const prompt = `
title と comments を口語調で、意味を変えずに簡潔にしてください。

ルール:
- 文意は絶対に変えない
- 一般名詞・固有名詞・技術用語は維持する
- 不要な語尾や口癖（例: 「まぁ」「とか」）は削除する
- 冗長な表現は自然な日本語になる範囲で短くする

データ: 
${JSON.stringify(data)}
`

  const { output } = await generateText({
    model: 'openai/gpt-4.1',
    output: Output.object({
      schema: z.object({
        title: z.string(),
        comments: z.array(z.string()),
      }),
    }),
    prompt,
  })
  return output
}
