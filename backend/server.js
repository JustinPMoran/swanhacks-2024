const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000; // You can change the port if needed

// Serve static files from the current directory (or specify a 'public' directory)
app.use(express.static("C:/Users/legui/Documents/github/swanhacks-2024/Project"));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'my-ar-project', 'index.html'));
// });

// Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on http://0.0.0.0:3000');
});
