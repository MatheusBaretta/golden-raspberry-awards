const csv = require('csv-parser');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

const loadCSV = (filePath) => {
    db.serialize(() => {
        db.run('CREATE TABLE movies (year INTEGER, title TEXT, studios TEXT, producers TEXT, winner TEXT)');

        const insert = db.prepare('INSERT INTO movies VALUES (?, ?, ?, ?, ?)');
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                insert.run(row.year, row.title, row.studios, row.producers, row.winner);
            })
            .on('end', () => {
                insert.finalize();
                console.log('CSV file successfully processed');
            });
    });
};

module.exports = { db, loadCSV };