'use client'

import type { Workout } from '@/types/database'

export default function WorkoutCalendar({ workouts }: { workouts: Workout[] }) {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  const workoutDates = new Set(workouts.map((w) => w.date))

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const blanks = Array.from({ length: firstDay }, (_, i) => i)

  const monthName = today.toLocaleString('ko-KR', { month: 'long' })

  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-4 text-center text-lg font-semibold">
        {year}년 {monthName}
      </h2>
      <div className="mb-2 grid grid-cols-7 text-center text-sm text-gray-500">
        {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {blanks.map((i) => (
          <div key={`blank-${i}`} />
        ))}
        {days.map((day) => {
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const hasWorkout = workoutDates.has(dateStr)
          const isToday = day === today.getDate()

          return (
            <div
              key={day}
              className={`flex h-8 w-8 mx-auto items-center justify-center rounded-full text-sm
                ${hasWorkout ? 'bg-blue-500 text-white' : ''}
                ${isToday && !hasWorkout ? 'border border-blue-500 text-blue-500' : ''}
              `}
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}
