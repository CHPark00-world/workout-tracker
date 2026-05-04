import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getWorkouts, createWorkout, deleteWorkout } from '@/lib/workouts'

export function useWorkouts(userId: string) {
  return useQuery({
    queryKey: ['workouts', userId],
    queryFn: () => getWorkouts(userId),
    enabled: !!userId,
    staleTime: 0,
  })
}

export function useCreateWorkout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      userId,
      date,
      note,
    }: {
      userId: string
      date: string
      note?: string
    }) => createWorkout(userId, date, note),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workouts'],
      })
      queryClient.refetchQueries({ queryKey: ['workouts'] })
    },
  })
}

export function useDeleteWorkout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: string; userId: string }) => deleteWorkout(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workouts'],
      })
      queryClient.refetchQueries({ queryKey: ['workouts'] })
    },
  })
}
