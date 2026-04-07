import { error } from '@sveltejs/kit'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = ({ params }) => {
	const id = Number(params.id)
	if (Number.isNaN(id)) {
		return error(404, 'Not found')
	}
	return { id: id }
}
