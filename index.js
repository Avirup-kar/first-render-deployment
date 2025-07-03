import express from 'express'
import path from 'path'
import connectDB from './conectDb.js'
import cookieParser from 'cookie-parser'
import checkAuthentication from './middlewares/authentication.js'

//router
import userr from './routes/user.js'
import blog from './routes/blog.js'

//database
import Blog from './models/blog.js'

const app = express()
const port = 3000
connectDB()

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkAuthentication('token'))
app.use(express.static(path.resolve('./public')))

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))


app.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.render("home", {
    user: req.user,
    blogs: blogs
  })
})

app.use('/', userr)  
app.use('/', blog)  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
