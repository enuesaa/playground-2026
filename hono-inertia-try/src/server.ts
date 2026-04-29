import { Hono } from 'hono'
import { inertia } from '@hono/inertia'
import { rootView } from './view'

const app = new Hono()
app.use(inertia({ rootView }))

const routes = app
  .get('/aaa', (c) => c.json({'a': true}))
  .get('/', (c) => c.render('Home', { message: 'Hello, Inertia' }))
  .get('/memos/:id', (c) => c.render('Memos/Show', { id: c.req.param('id') }))

export default routes
