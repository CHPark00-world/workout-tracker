'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useExerciseHistory } from '@/hooks/use-exercises'

export default function ExerciseChart({
  userId,
  exerciseName,
}: {
  userId: string
  exerciseName: string
}) {
  const { data, isLoading } = useExerciseHistory(userId, exerciseName)

  if (isLoading) return <div className="p-4 text-sm">로딩 중...</div>
  if (!data || data.length < 2)
    return (
      <div className="p-4 text-sm text-gray-500">
        데이터가 부족해요 (2개 이상 필요)
      </div>
    )

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 font-semibold">{exerciseName} 무게 변화</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis unit="kg" tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => [`${value}kg`, '무게']} />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
