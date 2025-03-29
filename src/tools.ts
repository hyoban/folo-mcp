import { z } from 'zod'

const zodView = z.number().optional().describe('Filter by view type, 0 for Articles, 1 for Social Media, 2 for Pictures, 3 for Videos, 4 for Audios, 5 for Notifications')
const zodUserId = z.string().optional().describe('Filter by user ID, if not provided, the current user will be used')
const zodFeedId = z.string().optional().describe('Filter by feed ID')
const zodListId = z.string().optional().describe('Filter by list ID')
const zodFeedIdList = z.array(z.string()).optional().describe('Filter by list of feed IDs')
const zodInboxId = z.string().optional().describe('Filter by inbox ID')

export const tools = {
  entry_list: {
    name: 'entry_list',
    description: 'Get a list of entries from Folo',
    query: {
      path: '/entries',
      method: 'POST',
    },
    input: {
      view: zodView,
      feedId: zodFeedId,
      listId: zodListId,
      feedIdList: zodFeedIdList,
      read: z.boolean().optional().describe('Filter by read status'),
      limit: z.number().optional().describe('Limit the number of entries returned'),
      publishedAfter: z.string().datetime().optional().describe('Filter by published date after this date'),
      publishedBefore: z.string().datetime().optional().describe('Filter by published date before this date'),
      isCollection: z.boolean().optional().describe('Filter by collection status, set true for Starred'),
      withContent: z.boolean().optional().describe('Include content in the response'),
    },
  },
  subscription_list: {
    name: 'subscription_list',
    description: 'Get a list of subscriptions from Folo',
    query: {
      path: '/subscriptions',
      method: 'GET',
    },
    input: {
      view: zodView,
      userId: zodUserId,
    },
  },
  unread_count: {
    name: 'unread_count',
    description: 'Get the unread count from Folo grouped by feed',
    query: {
      path: '/reads',
      method: 'GET',
    },
    input: {
      view: zodView,
    },
  },
  feed_info: {
    name: 'feed_info',
    description: 'Get information about a specific feed by ID or URL',
    query: {
      path: '/feeds',
      method: 'GET',
    },
    input: {
      id: z.string().optional().describe('Feed ID'),
      url: z.string().url().optional().describe('Feed URL'),
    },
  },
  mark_read: {
    name: 'mark_read',
    description: 'Mark entries as read by view, feed ID, or list ID, or inbox ID',
    query: {
      path: '/reads/all',
      method: 'POST',
    },
    input: {
      view: zodView,
      feedId: zodFeedId,
      listId: zodListId,
      inboxId: zodInboxId,
      feedIdList: zodFeedIdList,
      startTime: z.number().optional(),
      endTime: z.number().optional(),
    },
  },
}
