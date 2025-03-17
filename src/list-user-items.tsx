import { List, ActionPanel, Action, Icon } from '@raycast/api'
import type { GetAllUserItemsStatus } from './api/endpoints.schemas'
import { useGetUserItems } from './hooks/useItems'
import { Providers } from './providers'

function UserItemsList() {
  const { data, isLoading, isError } = useGetUserItems({
    userId: '10d26cbe-dfaa-4bed-a04f-c5f53b853e02',
    status: 'WATCHED',
  })

  if (isError) {
    return (
      <List isLoading={isLoading}>
        <List.EmptyView
          title="Error fetching user items"
          description="Please try again later"
        />
      </List>
    )
  }

  return (
    <List isLoading={isLoading}>
      {data?.userItems.map(item => (
        <List.Item
          key={item.id}
          title={item.title}
          accessories={[{ icon: getStatusIcon(item.status) }]}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser
                title="Open in Plotwist"
                url={`https://plotwist.app/en-US/${item.mediaType === 'MOVIE' ? 'movies' : 'tv-series'}/${item.tmdbId}`}
              />
              <Action.CopyToClipboard title="Copy Title" content={item.title} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  )
}

export default function ListUserItems() {
  return (
    <Providers>
      <UserItemsList />
    </Providers>
  )
}

function getStatusIcon(status: GetAllUserItemsStatus) {
  switch (status) {
    case 'WATCHED':
      return Icon.Checkmark
    case 'WATCHING':
      return Icon.Play
    case 'DROPPED':
      return Icon.Trash
    case 'WATCHLIST':
      return Icon.Calendar
    default:
      return Icon.Circle
  }
}
