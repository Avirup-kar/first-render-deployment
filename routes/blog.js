import { Router } from "express";
import multer from "multer";
import path from "path";
import Blog from "../models/blog.js";
import coment from "../models/coment.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
})

const upload = multer({ storage: storage })

const router = Router();

router.get("/add/blog", (req, res) => {
  res.render("addBlog")
});

router.get("/blogs/:id", async (req, res) => {
  const blog  = await Blog.findById(req.params.id).populate("createdtBy");
  const coments = await coment.find({ blogId: req.params.id }).populate("createdtBy");
  res.render("blog", {
    blog: blog,
    user: req.user,
    coments: coments
  });
});

router.post("/blog/coments/:blogId", async (req, res) => {
   await coment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdtBy: req.user.id
  })
  res.redirect(`/blogs/${req.params.blogId}`);
})
   

router.post("/add/blog", upload.single('coverpic'), async (req, res) => {
  const { title, content } = req.body;
  const creatblog = await Blog.create({
    title,
    content,
    coverpic: `/uploads/${req.file.filename}`,
    createdtBy: req.user.id
  });
  res.redirect(`/blogs/${creatblog._id}`);
});

export default router;