import Image from 'next/image'

import { getSession } from '@auth0/nextjs-auth0'

import InviteForm from '@/components/invite-form'

export default async function Home() {
	const session = await getSession()
	const user = session?.user

	return (
		user && (
			<div>
				<Image
					src={user.picture}
					alt={user.name}
					width={100}
					height={100}
					priority
				/>
				<h2>{user.name}</h2>
				<p>{user.email}</p>
				<InviteForm />
			</div>
		)
	)
}
