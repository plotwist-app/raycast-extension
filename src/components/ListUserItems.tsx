import { useGetUserItems } from '../hooks/useItems'

export  function ListUserItems() {
  const { data, isLoading } =  useGetUserItems({
    userId: "10d26cbe-dfaa-4bed-a04f-c5f53b853e02",
    status: "WATCHED",
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <div>ListUserItems</div>
}
