import entries from './data.json'

type Entry = {
  about: string
  title: string
  link: string
  subjects: string[]
  comments: string[]
  imageUrl?: string
  count?: number
}

const items = entries as Entry[]

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 text-zinc-900 dark:from-black dark:via-zinc-950 dark:to-black dark:text-zinc-100'>
      <main className='mx-auto flex w-full max-w-4xl flex-col gap-8 px-5 py-12 text-[17px] sm:px-8 sm:text-[18px]'>
        <header className='flex flex-col gap-2'>
          <p className='text-xs font-semibold uppercase tracking-[0.12em] text-amber-700 dark:text-amber-300'>
            Fresh reads
          </p>
        </header>

        <section className='flex flex-col gap-4'>
          {items.map((entry) => {
            return (
              <article key={entry.link} className='group'>
                <a
                  href={entry.link}
                  target='_blank'
                  rel='noreferrer'
                  className='block overflow-hidden rounded-3xl bg-white/95 ring-1 ring-zinc-200 shadow-sm transition hover:-translate-y-[3px] hover:ring-amber-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 dark:bg-zinc-900/70 dark:ring-zinc-800 dark:hover:ring-amber-400/50'
                >
                  <div className='flex flex-col gap-3'>
                    {entry.imageUrl ? (
                      <div className='relative overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800'>
                        <img
                          src={entry.imageUrl}
                          className='h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-80'
                          loading='lazy'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent' />
                        <div className='absolute inset-0 flex flex-col justify-end gap-2 p-4 sm:p-5'>
                          <h2 className='text-2xl font-semibold leading-snug tracking-tight text-white drop-shadow-md sm:text-3xl'>
                            {entry.title}
                          </h2>
                        </div>
                      </div>
                    ) : (
                      <div className='flex flex-col gap-2 rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-800'>
                        <h2 className='text-2xl font-semibold leading-snug tracking-tight text-zinc-900 transition group-hover:text-amber-800 dark:text-zinc-50 dark:group-hover:text-amber-200 sm:text-3xl'>
                          {entry.title}
                        </h2>
                      </div>
                    )}

                  </div>
                </a>
              </article>
            )
          })}
        </section>
      </main>
    </div>
  )
}
