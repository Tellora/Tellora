"use server";

import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function getFilePath(collection: string) {
    return path.join(DATA_DIR, `${collection}.json`);
}

function readCollection(collection: string, defaultData: any = []) {
    try {
        const filePath = getFilePath(collection);
        if (!fs.existsSync(filePath)) {
            return defaultData;
        }
        const raw = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(raw);
    } catch (e) {
        return defaultData;
    }
}

function writeCollection(collection: string, data: any) {
    try {
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }
        const filePath = getFilePath(collection);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
        return true;
    } catch (e) {
        console.error(`Failed to write collection ${collection}`, e);
        return false;
    }
}

export async function getAdminData(collection: string, defaultData: any = []) {
    return readCollection(collection, defaultData);
}

export async function saveAdminData(collection: string, data: any) {
    return writeCollection(collection, data);
}
