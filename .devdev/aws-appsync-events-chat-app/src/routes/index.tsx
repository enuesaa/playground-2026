import { createFileRoute } from '@tanstack/react-router'
import { Amplify } from 'aws-amplify';
import { events } from 'aws-amplify/data';
import config from './amplify_outputs.json';
import type { AmplifyOutputsUnknown } from 'aws-amplify/adapter-core/internals';

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()
    Amplify.configure(config as AmplifyOutputsUnknown);
    const channel = await events.connect('default/channel');
    console.log('start')

    channel.subscribe({
      next: (data) => {
        console.log('received', data);
      },
      error: (err) => console.error('error', err),
    })
  }
  return (
    <div className="p-8">
      a
      <button onClick={handleClick}>subscribe</button>
    </div>
  )
}
