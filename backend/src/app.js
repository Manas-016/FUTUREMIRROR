const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");




const authRoutes = require('./routes/auth.route');
const getUserMeRoute = require('./routes/me.route');
const scanRoute = require("./routes/scan.route");
const simulateRoute = require("./routes/simulate.route");
const searchRoute = require("./routes/search.route");
const manualRoute = require("./routes/manual.route");
const recentSimulationRoute = require("./routes/recentSimulation.route");



    



const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your frontend URL
    credentials: true, // Allow cookies to be sent
}));


app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', getUserMeRoute);
app.use("/api", scanRoute);
app.use("/api", simulateRoute);
app.use("/api", searchRoute);
app.use("/api", manualRoute);
app.use("/api", recentSimulationRoute);


module.exports = app;



