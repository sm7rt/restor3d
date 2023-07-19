"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)());
app.get("/breaches", async (req, res) => {
    try {
        const email = req.query.email;
        const url = `https://haveibeenpwned.com/api/v3/breachedaccount/multiple-breaches@hibp-integration-tests.com?truncateResponse=false`;
        // Make a request to the haveibeenpwned API
        const response = await axios_1.default.get(url, {
            headers: {
                "hibp-api-key": "ee41ae9df8ee4ae899e622e43661f8dd",
            },
        });
        const breaches = response.data; // The array of breaches
        // Send the breaches data to the client
        res.json(breaches);
    }
    catch (error) {
        console.error("Error retrieving breaches:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
