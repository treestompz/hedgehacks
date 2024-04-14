import React from 'react'

interface Props {
  children: React.ReactNode
}

function LayoutOnboarding({ children }: Props) {
  return <div className="container">{children}</div>
}

export default LayoutOnboarding
