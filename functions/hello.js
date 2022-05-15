import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// GET requests to /filename would return "Hello, world!"
export const onRequestGet = () => {
  return new Response("Hello, world!")
}

// POST requests to /filename with a JSON-encoded body would return "Hello, <name>!"
export const onRequestPost = async ({ request }) => {
  const { name } = await request.json()
  const users = await prisma.users.findMany()

  return new Response(`Hello, ${name}! ${JSON.stringify(users)}`)
}