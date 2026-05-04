export interface Workout {
  id: string
  user_id: string
  date: string
  note: string | null
  created_at: string
}

export interface Exercise {
  id: string
  workout_id: string
  name: string
  sets: number
  reps: number
  weight: number
  created_at: string
}
