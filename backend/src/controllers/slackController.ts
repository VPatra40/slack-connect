import axios from 'axios';
import { Request, Response } from 'express';
import { saveToken, getToken } from '../database/tokenStorage';

const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID!;
const SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET!;
const REDIRECT_URI = process.env.REDIRECT_URI!;

export const slackAuth = async (req: Request, res: Response) => {
  const code = req.query.code;
  try {
    const result = await axios.post('https://slack.com/api/oauth.v2.access', null, {
      params: {
        code,
        client_id: SLACK_CLIENT_ID,
        client_secret: SLACK_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI
      }
    });
    const data = result.data;
    saveToken(data); // persist token in JSON file
    res.send("Slack connected successfully!");
  } catch (err) {
    res.status(500).send("Slack Auth Failed");
  }
};
