import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.get("/breaches", async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const url = `https://haveibeenpwned.com/api/v3/breachedaccount/multiple-breaches@hibp-integration-tests.com?truncateResponse=false`;

    // Make a request to the haveibeenpwned API
    const response = await axios.get(url, {
      headers: {
        "hibp-api-key": "ee41ae9df8ee4ae899e622e43661f8dd",
      },
    });

    const breaches = response.data; // The array of breaches

    // Send the breaches data to the client
    res.json(breaches);
  } catch (error) {
    console.error("Error retrieving breaches:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
