import dbConnect from '@/db/connect';
import Place from '@/db/models/Place';

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  try {
    if (request.method === 'GET') {
      const place = await Place.findById(id);

      if (!place) {
        response.status(404).json({ status: 'Not found' });
        return;
      }

      response.status(200).json(place);
      return;
    }

    //if (request.method === 'DELETE")
    //etc...
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Internal Server Error.' });
  }
}
