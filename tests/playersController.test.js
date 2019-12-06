const assert = require('assert');
const playersControllerContstructor = require('../controllers/playersController');

describe('Players Controller', () => {
    let playersController;

    describe('getPlayerList', () => {
        it('should return an empty list if there are no seasons', () => {
            const statsFilebase = {};
            const expectedPlayerList = {};
            playersController = playersControllerContstructor(statsFilebase);

            const actualPlayerList = playersController.getPlayerList();

            assert.equal(JSON.stringify(actualPlayerList), JSON.stringify(expectedPlayerList));
        });

        it('should return an empty list if there are no players in any season', () => {
            const statsFilebase = {
                season1: [],
                season2: [],
                season3: []
            };
            const expectedPlayerList = {};
            playersController = playersControllerContstructor(statsFilebase);

            const actualPlayerList = playersController.getPlayerList();

            assert.equal(JSON.stringify(actualPlayerList), JSON.stringify(expectedPlayerList));
        });
    });
});