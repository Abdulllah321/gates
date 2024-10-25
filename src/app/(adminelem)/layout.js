"use client"
import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'

const layout = ({children}) => {
  return (
    <ClerkProvider>{children}</ClerkProvider>
  )
}

export default layout