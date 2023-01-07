// internal imports
require('dotenv').config();

// external imports
const app = require('./app');

// port
const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`Listing on port http://localhost:${PORT}`);
});
