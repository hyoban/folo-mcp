import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

import { sendApiQuery } from '../api'
import { tools } from '../tools'

const server = new McpServer({
  name: 'folo-mcp',
  version: '1.0.0',
})

for (const tool of Object.keys(tools)) {
  const { name, description, input, query } = tools[tool as keyof typeof tools]
  server.tool(
    name,
    description,
    input,
    async (args: any) => sendApiQuery({ ...query, args }),
  )
}

const transport = new StdioServerTransport()
await server.connect(transport)
