import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign({ id: userId }, JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "strict",
        seccure: process.env.NODE_ENV === "development" ? false : true,
    });

    return token;
};