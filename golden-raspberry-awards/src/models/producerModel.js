const { db } = require('../utils/csvLoader');

const getProducersWithIntervals = () => {
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT producers, year 
              FROM movies 
             WHERE winner = 'yes' ORDER BY year`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports = { getProducersWithIntervals };