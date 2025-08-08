import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;


app.use(express.static(path.join(__dirname, "public")));

// Step 1
app.get("/auth/slack", (req: Request, res: Response) => {
  const params = new URLSearchParams({
    client_id: process.env.SLACK_CLIENT_ID!,
    scope: "channels:read,chat:write,groups:read,im:read,mpim:read",
    redirect_uri: process.env.SLACK_REDIRECT_URI!,
  });

  res.redirect(`https://slack.com/oauth/v2/authorize?${params.toString()}`);
});

// Step 2: Handle Slack callback & exchange code for token
app.get("/auth/slack/callback", async (req: Request, res: Response) => {
  const code = req.query.code as string;

  if (!code) {
    return res.status(400).send("No code provided");
  }

  try {
    const tokenResponse = await axios.post(
      "https://slack.com/api/oauth.v2.access",
      new URLSearchParams({
        code,
        client_id: process.env.SLACK_CLIENT_ID!,
        client_secret: process.env.SLACK_CLIENT_SECRET!,
        redirect_uri: process.env.SLACK_REDIRECT_URI!,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    if (!tokenResponse.data.ok) {
      return res.status(400).json(tokenResponse.data);
    }

    const { access_token, bot_user_id, team } = tokenResponse.data;

    // Here you can store `access_token` in DB
    console.log("OAuth successful");
    console.log("Access Token:", access_token);
    console.log("Bot User ID:", bot_user_id);
    console.log("Workspace:", team.name);

    res.send("Slack OAuth successful! You can close this tab.");
  } catch (err) {
    console.error(err);
    res.status(500).send("OAuth failed");
  }
});


app.get("/", (req: Request, res: Response) => {
  res.send("Slack Connect Backend Running ");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
