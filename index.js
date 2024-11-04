require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./src/app');

async function connectDatabase() {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected!');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

async function startApp() {
    await connectDatabase();
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Server is running on url http://localhost:${PORT}`);
    });
}

startApp().catch(console.error);
