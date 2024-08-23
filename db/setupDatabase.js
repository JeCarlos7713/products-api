import sqlite3 from "sqlite3";

const db = new sqlite3.Database("products.db")
console.log("SQLITE")
// Crio tabela e insiro dados
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS products(
            id INTEGER PRIMARY KEY,
            title TEXT,
            value INTEGER,
            description TEXT,
            url_img TEXT
        )`
    )
})

db.close()