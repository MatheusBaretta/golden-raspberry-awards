const { calculateIntervals } = require('../services/producerService');

const getProducerIntervals = async (req, res) => {
    try {
        const intervals = await calculateIntervals();
        res.json(intervals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getProducerIntervals };