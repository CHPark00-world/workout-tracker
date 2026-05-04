'use client'

import WorkoutCalendar from '@/components/ui/workout-calendar'
import ExerciseChart from '@/components/ui/exercise-chart'
import { useAuth } from '@/hooks/use-auth'
import {
  useWorkouts,
  useCreateWorkout,
  useDeleteWorkout,
} from '@/hooks/use-workouts'
import { signOut } from '@/lib/auth'
import { useState, useEffect } from 'react'
import ExerciseList from '@/components/ui/exercise-list'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const { data: workouts } = useWorkouts(user?.id ?? '')
  const createWorkout = useCreateWorkout()
  const deleteWorkout = useDeleteWorkout()
  const router = useRouter()

  const [date, setDate] = useState('')
  const [note, setNote] = useState('')
  const [selectedExercise, setSelectedExercise] = useState('')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  if (loading) return <div className="p-8">로딩 중...</div>
  if (!user) return null

  const handleSubmit = () => {
    if (!date || !user) return
    createWorkout.mutate(
      { userId: user.id, date, note },
      {
        onSuccess: () => {
          setDate('')
          setNote('')
        },
      }
    )
  }

  return (
    <main className="mx-auto max-w-2xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">운동 기록</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{user?.email}</span>
          <button
            onClick={signOut}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
          >
            로그아웃
          </button>
        </div>
      </div>
      {workouts && <WorkoutCalendar workouts={workouts} />}
      <div className="mb-8">
        <input
          type="text"
          placeholder="운동 이름 입력 (예: 벤치프레스)"
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
          className="mb-4 w-full rounded-lg border px-3 py-2"
        />
        {selectedExercise && user && (
          <ExerciseChart userId={user.id} exerciseName={selectedExercise} />
        )}
      </div>
      <div className="mb-8 rounded-lg border p-4">
        <h2 className="mb-4 text-lg font-semibold">운동 추가</h2>
        <div className="flex flex-col gap-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border px-3 py-2"
          />
          <input
            type="text"
            placeholder="메모 (선택)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="rounded-lg border px-3 py-2"
          />
          <button
            onClick={handleSubmit}
            disabled={createWorkout.isPending}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {createWorkout.isPending ? '추가 중...' : '추가'}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {workouts?.map((workout) => (
          <div key={workout.id} className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{workout.date}</p>
                {workout.note && (
                  <p className="text-sm text-gray-500">{workout.note}</p>
                )}
              </div>
              <button
                onClick={() =>
                  deleteWorkout.mutate({ id: workout.id, userId: user!.id })
                }
                className="text-sm text-red-500 hover:text-red-600"
              >
                삭제
              </button>
            </div>
            <ExerciseList workoutId={workout.id} />
          </div>
        ))}
      </div>
    </main>
  )
}
