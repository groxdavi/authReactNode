import app from "./src/app.js"
import connectDatabase from "./src/config/database.js"
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5000;
const server = app;

connectDatabase().then(() => {
    server.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
});