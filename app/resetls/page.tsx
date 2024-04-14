'use client'
import { useEffect } from 'react'
import LoggedInLayout from '../components/layout/LoggedInLayout'

export default function ResetLSPage() {
  useEffect(() => {
    localStorage.clear()
    window.location.href = '/'
  }, [])

  return (
    <LoggedInLayout>
      <div style={{ marginTop: '30px' }}>Resetting...</div>
    </LoggedInLayout>
  )
}
