import { Router } from "express";
import user from "../models/user.js";

const router = Router();

router.get("/signup", (req, res) => {
  res.render("signup")
})

router.get("/signin", (req, res) => {
  res.render("signin")
})

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try{
      const token = await user.matchPasswordAndGenerateToken(email, password)
      res.cookie('token', token).redirect("/");
  }catch(error){
     res.render("signin", { error: 'Invalid email or password' });
  }
})

router.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;
 const signupuser = await user.create({ 
    fullname, 
    email, 
    password 
})

  res.redirect("/signin");
})

router.get("/logout", (req, res) => {
  res.clearCookie('token').redirect("/");
})

export default router;