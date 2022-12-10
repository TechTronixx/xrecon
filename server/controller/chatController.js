const ChatModel = require('../Model/ChatModel');

exports.SendChat = async (req, res) => {
    const { msg, from, to } = req.body;
    try {
        const newChat = await ChatModel.create({
            message: { text: msg },
            users: [from, to],
            sender: from
        });
        console.log("Message Sent to DB")
        res.send({ status: true });
    } catch (err) {
        console.log(err);
        res.send({ status: false, err });
    }
}

exports.GetChats = async (req, res) => {
    const { msg, from, to } = req.body;
    try {
        // const newChat = await ChatModel.create({
        //     message: { text: msg },
        //     users: [from, to],
        //     sender: from
        // });
        console.log("GEt msg from DB")
        res.send({ status: true });
    } catch (err) {
        console.log(err);
        res.send({ status: false, err });
    }
}