const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

const routes = require('./routes/routes');
const chatRoutes = require('./routes/chatRoutes');

require('dotenv').config();
app.use(express.json());
app.use(cors(
    {
        origin: 'https://xrecon.onrender.com',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods'],
    }
));

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
// });

app.use('/api', routes);
app.use('/api/chat', chatRoutes);

// mongoose.connect(process.env.MONGO_LOCAL_URL, {
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// const server = app.listen(PORT, () => {
//     console.log(`Server is running on port: ${PORT}`);
// });

global.onlineUsers = new Map();

io.on('connection', (socket) => {
    console.log('New user connected');
    global.chatSocket = socket;
    socket.on("addUser", (userId) => {
        global.onlineUsers.set(userId, socket.id);
    });

    socket.on("sendMessage", ({ from, to, text }) => {
        const receiverSocketId = global.onlineUsers.get(to);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("getMessage", {
                from,
                text,
            });
        }
    });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});