import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getExercises,
  createExercise,
  deleteExercise,
  getExerciseHistory,
} from '@/lib/exercises'

export function useExercises(workoutId: string) {
  return useQuery({
    queryKey: ['exercises', workoutId],
    queryFn: () => getExercises(workoutId),
    enabled: !!workoutId,
  })
}

export function useCreateExercise() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      workoutId,
      name,
      sets,
      reps,
      weight,
    }: {
      workoutId: string
      name: string
      sets: number
      reps: number
      weight: number
    }) => createExercise(workoutId, name, sets, reps, weight),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['exercises'],
      })
      queryClient.refetchQueries({ queryKey: ['exercises'] })
    },
  })
}

export function useDeleteExercise() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: string; workoutId: string }) =>
      deleteExercise(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['exercises'],
      })
      queryClient.refetchQueries({ queryKey: ['exercises'] })
    },
  })
}

export function useExerciseHistory(userId: string, exerciseName: string) {
  return useQuery({
    queryKey: ['exerciseHistory', userId, exerciseName],
    queryFn: () => getExerciseHistory(userId, exerciseName),
    enabled: !!userId && !!exerciseName,
  })
}
