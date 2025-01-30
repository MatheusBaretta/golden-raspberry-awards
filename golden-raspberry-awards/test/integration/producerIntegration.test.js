const request = require('supertest');
const app = require('../../src');
const { db } = require('../../src/utils/csvLoader');

describe('Producer API', () => {
    beforeAll((done) => {
        db.serialize(() => {
            db.run('CREATE TABLE movies (year INTEGER, title TEXT, studios TEXT, producers TEXT, winner TEXT)', done);
        });
    });

    afterAll((done) => {
        db.close(done);
    });

    it('should return producers with intervals', async () => {
        const res = await request(app).get('/producers/intervals');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('min');
        expect(res.body).toHaveProperty('max');
    });
});