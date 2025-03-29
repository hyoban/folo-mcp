import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

import { tools } from '../tools'

const server = new McpServer({
  name: 'folo-mcp',
  version: '1.0.0',
})

server.tool(
  tools.entry_list.name,
  tools.entry_list.description,
  tools.entry_list.input,
  async (args) => {
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
      'https://api.follow.is/entries',
      {
        method: 'POST',
        headers: {
          'cookie': `__Secure-better-auth.session_token=${sessionToken};`,
          'content-type': 'application/json',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
        },
        body: JSON.stringify(args),
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
  },
)

const transport = new StdioServerTransport()
await server.connect(transport)
