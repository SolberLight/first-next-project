import mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('Mongo already connected')
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
            useUnifiedTopology: true,
        })

        isConnected = true

        console.log('Mongo connected')
    } catch (error) {
        console.error('Mongo not connected', error)
    }
}