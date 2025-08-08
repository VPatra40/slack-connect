import fs from 'fs';

const file = 'src/database/token.json';

export const saveToken = (data: any) => {
    fs.writeFileSync(file, JSON.stringify(data));
};

export const getToken = () => {
    if (!fs.existsSync(file)) return null;
    const raw = fs.readFileSync(file);
    return JSON.parse(raw.toString());
};