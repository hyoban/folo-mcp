import { z } from 'zod'

export const tools = {
  entry_list: {
    name: 'entry_list',
    description: 'Get a list of entries from Folo',
    input: {
      view: z.number().optional().describe('Filter by view type, 0 for Articles, 1 for Social Media, 2 for Pictures, 3 for Videos, 4 for Audios, 5 for Notifications'),
      feedId: z.string().optional().describe('Filter by feed ID'),
      listId: z.string().optional().describe('Filter by list ID'),
      feedIdList: z.array(z.string()).optional().describe('Filter by list of feed IDs'),
      read: z.boolean().optional().describe('Filter by read status'),
      limit: z.number().optional().describe('Limit the number of entries returned'),
      publishedAfter: z.string().datetime().optional().describe('Filter by published date after this date'),
      publishedBefore: z.string().datetime().optional().describe('Filter by published date before this date'),
      isCollection: z.boolean().optional().describe('Filter by collection status, set true for Starred'),
      withContent: z.boolean().optional().describe('Include content in the response'),
    },
  },
}
