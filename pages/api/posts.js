import { prisma } from "../../server/db/client"

import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

// const prisma = new PrismaClient()

export default async function handle(req, res) {

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const { method } = req

  switch (method) {
    case 'POST':
      // get the title and content from the request body
      const { title, content } = req.body
      // use prisma to create a new post using that data
      const post = await prisma.post.create({
        data: {
          title,
          content
        }
      })
      // send the post object back to the client
      res.status(201).json(post)
      break
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}