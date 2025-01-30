const { getProducersWithIntervals } = require('../models/producerModel');

const calculateIntervals = async () => {
    const rows = await getProducersWithIntervals();
    const producers = {};

    rows.forEach(row => {
        const producerList = row.producers.split(', ');
        producerList.forEach(producer => {
            if (!producers[producer]) {
                producers[producer] = [];
            }
            producers[producer].push(row.year);
        });
    });

    const intervals = [];

    Object.keys(producers).forEach(producer => {
        if (producers[producer].length > 1) {
            for (let i = 1; i < producers[producer].length; i++) {
                const interval = producers[producer][i] - producers[producer][i - 1];
                intervals.push({
                    producer,
                    interval,
                    previousWin: producers[producer][i - 1],
                    followingWin: producers[producer][i]
                });
            }
        }
    });

    const minInterval = Math.min(...intervals.map(i => i.interval));
    const maxInterval = Math.max(...intervals.map(i => i.interval));

    const min = intervals.filter(i => i.interval === minInterval);
    const max = intervals.filter(i => i.interval === maxInterval);

    return { min, max };
};

module.exports = { calculateIntervals };