import React from 'react'

// Stub component - not actively used but required for legacy hero components
export default function RichText({ content }: { content?: unknown }) {
  if (!content) return null
  return <div>RichText Component (Legacy)</div>
}
