import { MongoClient } from 'mongodb'


async function handler (req, res) {
    if (req.method === 'POST') {
        const data = req.body

        const { title , image , address , description } = data

        const client = await MongoClient.connect(
          "mongodb+srv://satyasaran40:Binnu123@cluster0.fmhshy0.mongodb.net/meetups?retryWrites=true&w=majority"
        );
        const db = client.db();

        const meetupsCollection = db.collection('meetups')

        const result = meetupsCollection.insertOne(data)

        console.log(result)

        res.status(201).json({ message: 'Meetup inserted!' })
    }
}

export default handler 