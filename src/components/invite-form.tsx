'use client'

import { useState } from 'react'

export default function InviteForm() {
	const [email, setEmail] = useState<string>('')

	const handleInvite = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		await fetch('/api/send-invite', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		})

		setEmail('')
	}

	return (
		<form onSubmit={handleInvite}>
			<input
				type='email'
				value={email}
				onChange={e => setEmail(e.target.value)}
				placeholder='Enter email to invite'
				required
			/>
			<button type='submit'>Send Invitation</button>
		</form>
	)
}
