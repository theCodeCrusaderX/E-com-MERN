import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true, limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//api for user
import userRouter from "./routes/user.route.js"
app.use("/api/v1/users",userRouter)

//api for admin 
import adminRouter from "./routes/admin/products.route.js"
app.use("/api/v1/admin",adminRouter)

//api for shop/user
import shopRouter from "./routes/shop/product.route.js"
app.use("/api/v1/shop",shopRouter)


export {app}