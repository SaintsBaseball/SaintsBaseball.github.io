const assert = require('assert');
const PlayersController = require("../controllers/playersController");

describe('Players Controller', () => {
    let playersController;

    describe('getPlayerList', () => {
        it('should return an empty list if there are no seasons', () => {
            const statsFilebase = {};
            const expectedPlayerList = [];
            playersController = new PlayersController(statsFilebase);

            const actualPlayerList = playersController.getPlayerList();

            assert.deepEqual(actualPlayerList, expectedPlayerList);
        });

        it('should return an empty list if there are no players in any season', () => {
            const statsFilebase = {
                season1: [],
                season2: [],
                season3: []
            };
            const expectedPlayerList = [];
            playersController = new PlayersController(statsFilebase);

            const actualPlayerList = playersController.getPlayerList();

            assert.deepEqual(actualPlayerList, expectedPlayerList);
        });

        it('should return the list of players from all seasons', () => {
            const statsFilebase = {
                season1: [{Player: "Alpha"}, {Player: "Bravo"}, {Player: "Charlie"}],
                season2: [{Player: "Delta"}],
                season3: [{Player: "Echo"}, {Player: "Foxtrot"}]
            };
            const expectedPlayerList = ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot"];
            playersController = new PlayersController(statsFilebase);

            const actualPlayerList = playersController.getPlayerList();

            assert.deepEqual(actualPlayerList, expectedPlayerList);
        });

        it('should return the list of players from all seasons sorted alphabetically', () => {
            const statsFilebase = {
                season1: [{Player: "Echo"}, {Player: "Foxtrot"}, {Player: "Delta"}],
                season2: [{Player: "Charlie"}],
                season3: [{Player: "Alpha"}, {Player: "Bravo"}]
            };
            const expectedPlayerList = ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot"];
            playersController = new PlayersController(statsFilebase);

            const actualPlayerList = playersController.getPlayerList();

            assert.deepEqual(actualPlayerList, expectedPlayerList);
        });

        it('should return the list of players with no duplicates', function () {
            const statsFilebase = {
                season1: [{Player: "Echo"}, {Player: "Bravo"}, {Player: "Foxtrot"}, {Player: "Alpha"}, {Player: "Delta"}],
                season2: [{Player: "Echo"}, {Player: "Charlie"}, {Player: "Bravo"}],
                season3: [{Player: "Alpha"}, {Player: "Bravo"}, {Player: "Foxtrot"}]
            };
            const expectedPlayerList = ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot"];
            playersController = new PlayersController(statsFilebase);

            const actualPlayerList = playersController.getPlayerList();

            assert.deepEqual(actualPlayerList, expectedPlayerList);
        });
    });
});
