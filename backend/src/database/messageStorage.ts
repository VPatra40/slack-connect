import fs from 'fs';
import path from 'path';

const file = path.join(__dirname, 'messages.json');

interface ScheduledMessage {
    id: string;
    channel: string;
    message: string;
    scheduledTime: string;
}

export const getScheduledMessages = (): ScheduledMessage[] => {
    if (!fs.existsSync(file)) return [];
    const raw = fs.readFileSync(file);
    return JSON.parse(raw.toString());
};

export const saveScheduledMessage = (message: ScheduledMessage) => {
    const messages = getScheduledMessages();
    messages.push(message);
    fs.writeFileSync(file, JSON.stringify(messages, null, 2));
};

export const cancelScheduledMessage = (id: string) => {
    let messages = getScheduledMessages();
    messages = messages.filter(msg => msg.id !== id);
    fs.writeFileSync(file, JSON.stringify(messages, null, 2));
};