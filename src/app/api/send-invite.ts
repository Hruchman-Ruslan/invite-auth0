import { getAccessToken } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const { email } = req.body

		try {
			const { accessToken } = await getAccessToken(req, res)

			const response = await fetch(`${process.env.DOMAIN}`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			})

			if (!response.ok) {
				throw new Error('Failed to send invitation email.')
			}

			res.status(200).json({ message: 'Invitation email sent!' })
		} catch (error) {
			console.error(error)
		}
	} else {
		res.setHeader('Allow', ['POST'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
