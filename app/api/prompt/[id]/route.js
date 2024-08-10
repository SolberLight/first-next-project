import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate('creator')

        if (!prompt) {
            return new Response('No prompt found', { status: 404 })
        }

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (e) {
        console.error('Can\'t fetch post', e)

        return new Response('Failed to fetch prompts', { status: 500 })
    }
}


export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json()

    try {
        await connectToDB()

        const existingPrompt = await Prompt.findById(params.id)

        if (!existingPrompt) {
            return new Response('No prompt found', { status: 404 })
        }

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save()

        return new Response(JSON.stringify(prompt, { status: 200 }))
    } catch (e) {
        return new Response('An error occured while editing prompt', { status: 500 })
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB()

        await Prompt.findByIdAndDelete(params.id)

        return new Response(JSON.stringify('DELETED', { status: 200 }))
    } catch (e) {
        return new Response('An error occured while deleting prompt', { status: 500 })
    }
}
