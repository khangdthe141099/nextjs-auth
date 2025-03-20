'use client'
import { clientSessionToken } from '@/lib/http'
import { useState } from 'react'

export default function AppProvider({
  children,
  inititalSessionToken = ''
}: {
  children: React.ReactNode
  inititalSessionToken?: string
}) {
  //get cookies từ trình duyệt bằng cookies của nextjs và set lại cho clientSessionToken
  //mỗi lần reload trang
  useState(() => {
    if (typeof window !== 'undefined') {
      clientSessionToken.value = inititalSessionToken
    }
  })

  return <>{children}</>
}
