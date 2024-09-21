import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const { email } = req.body

		const inviteData = {
			email,
			connection: 'Username-Password-Authentication',
		}

		try {
			const response = await fetch(
				`https://${process.env.AUTH0_DOMAIN}/api/v2/users`,
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(inviteData),
				}
			)

			if (!response.ok) {
				throw new Error(`Error creating user: ${response.status}`)
			}

			const data = await response.json()
			return res
				.status(200)
				.json({ message: 'Invitation successfully sent', data })
		} catch (error) {
			return res.status(500).json({ error: (error as Error).message })
		}
	} else {
		res.setHeader('Allow', ['POST'])
		res.status(405).end(`Method ${req.method} is not supported`)
	}
}
