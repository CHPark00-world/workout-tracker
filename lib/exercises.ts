import { supabase } from './supabase'
import type { Exercise } from '@/types/database'

export async function getExercises(workoutId: string): Promise<Exercise[]> {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('workout_id', workoutId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

export async function createExercise(
  workoutId: string,
  name: string,
  sets: number,
  reps: number,
  weight: number
): Promise<Exercise> {
  const { data, error } = await supabase
    .from('exercises')
    .insert({ workout_id: workoutId, name, sets, reps, weight })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteExercise(id: string): Promise<void> {
  const { error } = await supabase.from('exercises').delete().eq('id', id)
  if (error) throw error
}

export async function getExerciseHistory(
  userId: string,
  exerciseName: string
): Promise<{ date: string; weight: number }[]> {
  const { data, error } = await supabase
    .from('exercises')
    .select('weight, workouts(date)')
    .eq('name', exerciseName)
    .eq('workouts.user_id', userId)
    .order('workouts(date)', { ascending: true })

  if (error) throw error

  return data
    .filter((d) => d.workouts && !Array.isArray(d.workouts))
    .map((d) => ({
      date: (d.workouts as unknown as { date: string }).date,
      weight: d.weight,
    }))
}
