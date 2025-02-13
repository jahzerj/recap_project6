// import dbConnect from '@/db/connect';
// import Comment from '@/db/models/Comment';

// export default async function handler(request, response) {
//   await dbConnect();
//   const { id } = request.query;

//   try {
//     if (request.method === 'GET') {
//       const comments = await Comment.find({ placeId: id });
//       response.status(200).json(comments);
//       return;
//     }
//     if (request.method === 'DELETE') {
//       await Comment.findByIdAndDelete(id);
//       response.status(200).json({ message: 'Successfully delete this comment' });
//       return;
//     }

//     if (request.method === 'PUT') {
//       const comment = await Comment.findById(id);

//       if (!commentId) {
//         response.status(404).json({ status: 'Not Found' });
//         return;
//       }
//       response.status(200).json(comment);
//       return;
//     }

//     if (request.method === "POST") {
//       const { name, comment } = request.body;

//       if (!name || !comment || !id) {
//         return response.status(400).json({ message: "Missing required fields" });
//       }

//       const newComment = await Comment.create({ name, comment, placeId: id });
//       return response.status(201).json(newComment);
//     }


//     response.status(405).json({ status: 'Method not allowed' });
//   } catch (error) {
//     console.error(error);
//     response.status(500).json({ message: 'Internal Server Error.' });
//   }
// }

import dbConnect from "../../../../lib/dbConnect";
import Comment from "../../../../models/Comment";

export default async function handler(request, response) {
  try {
    await dbConnect();
    const { id, commentId } = request.query;

    if (request.method === "GET") {
      const comments = await Comment.find({ placeId: id });
      return response.status(200).json(comments);
    }

    if (request.method === "POST") {
      const { name, comment } = request.body;

      if (!name || !comment || !id) {
        return response.status(400).json({ message: "Missing required fields" });
      }

      const newComment = await Comment.create({ name, comment, placeId: id });
      return response.status(201).json(newComment);
    }

    if (request.method === "PUT") {
      if (!commentId) {
        return response.status(400).json({ message: "Missing comment ID" });
      }

      const { name, comment } = request.body;
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { name, comment },
        { new: true }
      );

      if (!updatedComment) {
        return response.status(404).json({ message: "Comment not found" });
      }

      return response.status(200).json(updatedComment);
    }

    if (request.method === "DELETE") {
      if (!commentId) {
        return response.status(400).json({ message: "Missing comment ID" });
      }

      await Comment.findByIdAndDelete(commentId);
      return response.status(200).json({ message: "Comment deleted successfully" });
    }

    return response.status(405).json({ message: "Method Not Allowed" });

  } catch (error) {
    console.error("Database operation failed:", error);
    return response.status(500).json({ message: "Server error", error });
  }
}
