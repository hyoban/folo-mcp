import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { stringifyQuery } from 'ufo'

export async function sendApiQuery({
  args,
  path,
  method,
}: {
  args: any
  path: string
  method: string
}): Promise<CallToolResult> {
  const sessionToken = process.env.SESSION_TOKEN
  if (!sessionToken) {
    return {
      content: [
        {
          type: 'text',
          text: 'Without session token, I cannot access the data. Please provide it in the environment variable SESSION_TOKEN.',
        },
      ],
    }
  }

  const res = await fetch(
    `https://api.follow.is${path}${method === 'GET' ? `?${stringifyQuery(args)}` : ''}`,
    {
      method,
      headers: {
        'cookie': `__Secure-better-auth.session_token=${sessionToken};`,
        'content-type': 'application/json',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
      },
      body: method === 'GET' ? undefined : JSON.stringify(args),
    },
  )
  const text = await res.text()

  return {
    content: [
      {
        type: 'text',
        text,
      },
    ],
  }
}
