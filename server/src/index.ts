import app from './app';

const PORT = process.env.PORT || 5000;

// Startup the app
app.listen(PORT, () => {
    console.log(`SERVER IS UP ON PORT ${PORT}`);
});
