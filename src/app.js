const express = require('express')
require('./db/mongoose')
const cors=require('cors')
const userRoutes = require('./routes/user')
const LeaguesRoutes = require('./routes/leagues')
const NewsRoutes=require('./routes/news')
const CommentsRoute=require('./routes/comments')
const matchesRouter=require('./routes/matches')
const ExceptionRouter=require('./routes/exception')
const app = express()
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.use(userRoutes)
app.use(LeaguesRoutes)
app.use(NewsRoutes)
app.use(CommentsRoute)
app.use(matchesRouter)
app.use(ExceptionRouter)


app.listen(port, ()=>{
    console.log(`server up on ${port}`)
})