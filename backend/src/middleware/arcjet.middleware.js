import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
    try {
        
        const descision = await aj.protect(req);

        if (descision.isDenied) {
            if (descision.reason.isRateLimit()) {
                return res.status(429).json({ message: "Too many requests. Please try again later." });
            } else if (descision.reason.isBot()) {
                return res.status(403).json({ message: "Access denied. Bot traffic is not allowed." });
            } else {
                return res.status(403).json({ message: "Access denied for security policy" });
            }
        }

        if (descision.results.some(isSpoofedBot)) {
            return res.status(403).json({ message: "Access denied. Spoofed bot traffic is not allowed." });
        }

        next();

    } catch (error) {
        console.error("Arcjet middleware error:", error);
        next();
    }
}