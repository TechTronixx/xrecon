const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const routes = require('./routes/routes');
const chatRoutes = require('./routes/chatRoutes');

const http = require('http').createServer(app);
const socketIO = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});

require('dotenv').config();
app.use(cors());
app.use(express.json());

app.use('/api', routes);
app.use('/api/chat', chatRoutes);

// mongoose.connect(process.env.MONGO_LOCAL_URL, {
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
// const server = app.listen(PORT, () => {
//     console.log(`Server is running on port: ${PORT}`);
// });

global.onlineUsers = new Map();

http.listen(PORT, () => {
    socketIO.on('connection', (socket) => {
        console.log('New user connected');
        global.chatSocket = socket;
        socket.on("addUser", (userId) => {
            global.onlineUsers.set(userId, socket.id);
        });

        socket.on("sendMessage", ({ from, to, text }) => {
            const receiverSocketId = global.onlineUsers.get(to);
            if (receiverSocketId) {
                socketIO.to(receiverSocketId).emit("getMessage", {
                    from,
                    text,
                });
            }
        });
    });
});