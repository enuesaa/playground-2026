import { Form, useActionData } from 'react-router'
import type { Route } from './+types/new'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { createPost, createPostSchema } from '../../apiclient/post'

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData()
  const parsed = createPostSchema.safeParse({
    userId: 1,
    title: formData.get('title'),
    body: formData.get('body'),
  })
  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.message,
    }
  }
  const res = await createPost(parsed.data)
  return { ok: true, message: res }
}

export default function Post({}: Route.ComponentProps) {
  const actionData = useActionData()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (actionData?.ok !== undefined) {
      setOpen(true)
    }
  }, [actionData])

  return (
    <div className='mx-auto max-w-4/5 space-y-6'>
      <Form method='post' className='space-y-4'>
        <label className='block text-sm'>
          Title
          <input name='title' className='border px-2 py-1 w-full' />
        </label>

        <label className='block text-sm'>
          Body
          <textarea name='body' className='border px-2 py-1 w-full' />
        </label>

        <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded cursor-pointer'>
          Create
        </button>
      </Form>

      {/* after created modal */}
      <Dialog open={open} onClose={() => setOpen(false)} className='bg-gray-200 text-gray-800'>
        <div className="fixed inset-0 flex items-center justify-center">
          <DialogPanel className="bg-white p-6 rounded">
            <DialogTitle>Created</DialogTitle>
            <pre>{JSON.stringify(actionData?.message, null, 2)}</pre>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}
