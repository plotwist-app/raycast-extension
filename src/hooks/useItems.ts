import type { GetAllUserItemsStatus } from '../api/endpoints.schemas'
import { getUserItems, useGetUserItemsInfinite } from '../api/user-items'

export type GetUserItemsProps = {
  userId: string
  status: GetAllUserItemsStatus
}

export function useGetUserItems(params: GetUserItemsProps) {
  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    error,
    isError,
  } = useGetUserItemsInfinite(params, {
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

  console.log('data', data?.userItems[0])

  return {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    error,
    isError,
  }
}
