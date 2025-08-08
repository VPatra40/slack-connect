import { WebClient } from '@slack/web-api';

export const scheduleMessage = async (accessToken: string, channel: string, text: string, post_at: number) => {
    const web = new WebClient(accessToken);
    return await web.chat.scheduleMessage({
        channel,
        text,
        post_at
    });
};