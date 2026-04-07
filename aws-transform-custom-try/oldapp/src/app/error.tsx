'use client'

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string }
}) {
  return (
    <h3 className="text-4xl font-bold m-1 mt-10 text-center w-full">
      {error.message || 'An unexpected error occurred'}
    </h3>
  )
}
