'use client'

import { signInWithGoogle } from '@/lib/auth'

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">운동 기록 트래커</h1>
        <button
          onClick={signInWithGoogle}
          className="rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
        >
          Google로 로그인
        </button>
      </div>
    </main>
  )
}
