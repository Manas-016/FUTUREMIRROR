require('dotenv').config();
const {connectToDB} = require('./src/config/db');

connectToDB();
const app = require('./src/app');

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected successfully 🚀" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});