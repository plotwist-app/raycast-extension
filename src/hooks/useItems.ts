import type { GetAllUserItemsStatus } from '../api/endpoints.schemas'
import { getUserItems, useGetUserItemsInfinite } from '../api/user-items'

export type GetUserItemsProps = {
  userId: string
  status: GetAllUserItemsStatus
}

export function useGetUserItems(params: GetUserItemsProps) {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    useGetUserItemsInfinite(params, {
      query: {
        queryKey: ['userItems', params],
        initialPageParam: undefined,
        getNextPageParam: lastPage => lastPage.nextCursor,
        queryFn: async ({ pageParam }) => {
          return await getUserItems({
            ...params,
            pageSize: '20',
            cursor: pageParam as string,
          })
        },
      },
    })

  return { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading }
}
