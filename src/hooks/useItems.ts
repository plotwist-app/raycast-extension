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
        const response = await getUserItems({
          ...params,
          pageSize: '20',
          cursor: pageParam as string,
        })
        return response
      },
    },
  })

  // Extract the first page data
  const firstPageData = data?.pages?.[0]

  // Create a properly structured response that matches what your component expects
  const processedData = firstPageData
    ? {
        userItems: firstPageData.userItems || [],
      }
    : undefined

  return {
    data: processedData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    error,
    isError,
  }
}
