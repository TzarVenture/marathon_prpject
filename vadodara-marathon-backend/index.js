require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT;
const cors = require("cors")
const path = require("path")

const connectDB = require("./config/connection")
connectDB()

const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Vadodara Marathon API",
    version: "1.0.0",
    description: "API documentation for Vadodara Marathon backend"
  },
  servers: [
    { url: "http://localhost:4000", description: "Local server" }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    }
  },
  security: [{
    bearerAuth: []
  }]
}

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./routes/**/*.js"]
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))



app.use(express.json())

// if sending urlencoded  data 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("hero_image"))
app.use(express.static("race_category"))
app.use(express.static("sponsors"))
app.use(express.static("partners"))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

const allowed_origin = [
    "http://localhost:3000",
    "http://187.127.155.47:4000",
    "https://rajgirmarathon.com",
    "https://rajgir.org",
]

app.use(cors({
    origin: allowed_origin,
    credentials: true
}))

app.get("/0", async (req, res) => {
    res.send("hello worl")
})




app.use("/api/login", require("./routes/login"))
app.use("/api/register", require("./routes/register"))
app.use("/api/hero-image", require("./routes/Admin/hero_image_home_page"))
app.use("/api/race-category", require("./routes/Admin/race_category"))
app.use("/api/sponsors", require("./routes/Admin/sponsors"))
app.use("/api/partners", require("./routes/Admin/partners"))
app.use("/api/associates", require("./routes/Admin/associates"))
app.use("/api/past-events", require("./routes/Admin/past_events"))
app.use("/api/faq", require("./routes/Admin/faq"))
app.use("/api/philanthropy", require("./routes/Admin/philanthropy"))
app.use("/api/know-us", require("./routes/Admin/knowUs"))
app.use("/api/vm-edition", require("./routes/Admin/vmEditions"))
app.use("/api/privacy-notice", require("./routes/Admin/privacy_notice"))
app.use("/api/contact-us", require("./routes/Admin/contact"))
app.use("/api/event", require("./routes/event"))
app.use("/api/registration", require("./routes/registration"))
app.use("/api/payment", require("./routes/payment"))
app.use("/api/site-settings", require("./routes/Admin/siteSettings"))
app.use("/api/brand", require("./routes/brand"))
app.use("/api/rules-and-regulations", require("./routes/Admin/rulesAndRegulations"))
app.use("/api/price-chart", require("./routes/Admin/priceChart"))

app.use((req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
})

app.listen(port, async (req, res) => {
    console.log(`server is running on ${port}`)
})