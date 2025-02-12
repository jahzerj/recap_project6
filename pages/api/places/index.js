import dbConnect from '@/db/connect';
import Place from '@/db/models/Place';

export default async function handler(request, response) {
  await dbConnect();

  try{

    if(request.method === "GET"){
      const places = await Place.find();

      response.status(200).json(places);
      return;
    }

    if(request.method === 'POST') {
      const place = await 
    }
  }

  
}
