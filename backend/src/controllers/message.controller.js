import Message from "../models/Message.js";
import user from "../models/User.js";

export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user.id; // Assuming req.user contains the authenticated user's info
        const filteredUsers = await user.find({ _id: { $ne: loggedInUserId } }).select("-password");
        
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getMessagesByUserId = async (req, res) => {
    try {
        
        const myId = req.user._id;
        const { id: otherUserId } = req.params;

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: otherUserId},
                {senderId: otherUserId, receiverId: myId}
            ]
        });

        res.status(200).json(messages);

    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const { text, image } = req.body;
        const senderId = req.user._id;

        let imageUrl;
        if(image) {
            // Process the image and get the URL
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        await newMessage.save();

        // TODO: Emit socket event here for real-time communication

        res.status(201).json(newMessage);

    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId }
            ]
        });

        const chatPartnerIds = [
            ...new Set(
                messages.map((msg) => 
                    msg.senderId.toString() === loggedInUserId.toString() 
                    ? msg.receiverId.toString() 
                    : msg.senderId.toString()
                )
            ),
        ];

        const chatPartners = await user.find({ _id: { $in: chatPartnerIds } }).select("-password");

        res.status(200).json(chatPartners);

    } catch (error) {
        console.error("Error fetching chat partners:", error);
        res.status(500).json({ message: "Server error" });
    }
}