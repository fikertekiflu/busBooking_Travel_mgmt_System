const express = require("express"); 
const dotenv = require("dotenv"); 
const connectDB = require("./config/dbConfig"); 
const authRoutes = require("./routes/Authroutes");
const busRoutes = require("./routes/busRoute");
const routeRoute = require("./routes/routeRoute");
dotenv.config(); 
connectDB();

const app = express(); 
app.use(express.json()); 

app.use("/api/auth", authRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/route", routeRoute);



const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)); 
