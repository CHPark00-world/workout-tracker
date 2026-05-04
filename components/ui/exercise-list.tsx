'use client'

import { useState } from 'react'
import {
  useExercises,
  useCreateExercise,
  useDeleteExercise,
} from '@/hooks/use-exercises'

export default function ExerciseList({ workoutId }: { workoutId: string }) {
  const { data: exercises } = useExercises(workoutId)
  const createExercise = useCreateExercise()
  const deleteExercise = useDeleteExercise()

  const [name, setName] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')

  const handleSubmit = () => {
    if (!name || !sets || !reps || !weight) return
    createExercise.mutate(
      {
        workoutId,
        name,
        sets: Number(sets),
        reps: Number(reps),
        weight: Number(weight),
      },
      {
        onSuccess: () => {
          setName('')
          setSets('')
          setReps('')
          setWeight('')
        },
      }
    )
  }

  return (
    <div className="mt-3 border-t pt-3">
      {/* 종목 목록 */}
      <div className="mb-3 flex flex-col gap-2">
        {exercises?.map((exercise) => (
          <div
            key={exercise.id}
            className="flex items-center justify-between rounded bg-gray-100 px-3 py-2 dark:bg-gray-800"
          >
            <div className="text-sm">
              <span className="font-medium">{exercise.name}</span>
              <span className="ml-2 text-gray-500">
                {exercise.sets}세트 × {exercise.reps}회 / {exercise.weight}kg
              </span>
            </div>
            <button
              onClick={() =>
                deleteExercise.mutate({ id: exercise.id, workoutId })
              }
              className="text-xs text-red-500 hover:text-red-600"
            >
              삭제
            </button>
          </div>
        ))}
      </div>

      {/* 종목 추가 폼 */}
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="운동 이름 (예: 벤치프레스)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded border px-3 py-1.5 text-sm"
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="세트"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            className="w-full rounded border px-3 py-1.5 text-sm"
          />
          <input
            type="number"
            placeholder="횟수"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="w-full rounded border px-3 py-1.5 text-sm"
          />
          <input
            type="number"
            placeholder="무게(kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full rounded border px-3 py-1.5 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={createExercise.isPending}
          className="rounded bg-green-500 px-3 py-1.5 text-sm text-white hover:bg-green-600 disabled:opacity-50"
        >
          {createExercise.isPending ? '추가 중...' : '종목 추가'}
        </button>
      </div>
    </div>
  )
}
