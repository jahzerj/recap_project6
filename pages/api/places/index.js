import dbConnect from '@/db/connect';
import Place from '@/db/models/Place';

export default async function handler(request, response) {
  await dbConnect();

  try {
    if (request.method === 'GET') {
      const places = await Place.find();

      response.status(200).json(places);
      return;
    }

    if (request.method === 'POST') {
      const placeData = request.body;
      await Place.create(placeData);

      response.status(201).json({ status: 'Place createdff' });
      return;
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Internal Server Error.' });
    return;
  }
  response.status(405).json({ status: 'Method not allowed.' });
}
