import { List } from '@raycast/api'
import { useGetUserItems } from '../hooks/useItems'

export default function ListUserItems() {
  const { data, isLoading } = useGetUserItems({
    userId: '10d26cbe-dfaa-4bed-a04f-c5f53b853e02',
    status: 'WATCHED',
  })

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search your items...">
      {data?.userItems.map(item => (
        <List.Item key={item.id} title={item.title} />
      ))}
    </List>
  )
}
