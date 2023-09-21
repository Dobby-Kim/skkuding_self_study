import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const USERS_FILE = path.join(__dirname, "../users.json");

export const getUsers = async () => {
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const saveUsers = async (users) => {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
};
