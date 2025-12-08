import { useQuery } from '@tanstack/vue-query'

export function useUsersExample() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => $fetch('https://jsonplaceholder.typicode.com/users')
  })
}
