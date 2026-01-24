import { Form, useActionData } from 'react-router'
import type { Route } from './+types/new'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { createPost } from '../../apiclient/post'

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData()
  const res = await createPost({
    userId: 1,
    title: formData.get('title')?.toString() ?? '',
    body: formData.get('body')?.toString() ?? '',
  })
  return res
}

export default function Post({}: Route.ComponentProps) {
  const actionData = useActionData()
  const [open, setOpen] = useState(false)
  useEffect(() => actionData && setOpen(true), [actionData])

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
            <pre>{JSON.stringify(actionData, null, 2)}</pre>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}
