import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

// Setup local json DataBase
const adapter = new FileSync("db.json");
const db = low(adapter);
db.defaults({ olxScrape: [] }).write();

export default db;
