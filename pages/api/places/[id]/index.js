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

    if (request.method === 'PUT') {
      const updatePlace = request.body;
      console.log('Updating this place', updatePlace);
      await Place.findByIdAndUpdate(id, updatePlace);
      response.status(200).json({ message: 'Successfully updated place' });
      return;
    }
    if (request.method === 'DELETE') {
      await Comment.deleteMany({ placeId: id });
      await Place.findByIdAndDelete(_id);
      response.status(200).json({ message: 'Successfully delete this place' });
      return;
    }

    response.status(405).json({ status: 'Method Not Allowed' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Internal Server Error.' });
  }
}
