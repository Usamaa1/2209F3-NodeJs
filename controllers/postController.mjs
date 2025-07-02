import Post from "../models/Post.mjs";





export const createPost = async (req, res) => {
  try {
    const { title, content, likes } = req.body;

    const post = new Post({
      title,
      content,
      likes
    });

    await post.save();
    res.status(201).send(post);
  } catch (err) {


    // res.status(400).send({error: err})
    // if (err.name === "ValidationError") {
    //   const messages = Object.values(err.errors).map((val) => val.message);
    //   return res.status(400).send({ error: messages });
    // }

   if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((error) =>
        error.name === "CastError" && error.path === "likes"
          ? "Likes must be a valid number."
          : error.message
      );

      return res.status(400).send({ error: messages });
    }

    res.status(500).send({ error: "Server error" });
  }
};




export const filterPostsByDate = async (req, res) => {
  try {
    const { start, end } = req.query;
    const startDate = new Date(start);
    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999);

    const posts = await Post.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    res.send(posts);
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
};
