const assert = require('assert');
const PlayersController = require("../controllers/playersController");

describe('Players Controller', () => {
    let playersController;

    describe('constructor', () => {
        it('should construct a players controller object with the statsFilebase and statsForEachPlayer', function () {
            const statsFilebase = {
                season1: [{Player: "Alpha", Stats: 'some fake stats'}, {Player: "Bravo", DifStats: 'some dif fake stats'}, {Player: "Charlie", DiffStats: 'some diff fake stats'}],
                season2: [{Player: "Delta", DifferentStats: 'some different fake stats'}],
                season3: [{Player: "Echo", OtherStats: 'some other fake stats'}, {Player: "Foxtrot", FakeStats: 'these are fake stats'}]
            };

            playersController = new PlayersController(statsFilebase);

            assert.equal(playersController.statsFilebase, statsFilebase);
            assert.deepEqual(playersController.statsForEachPlayer, {});
        });
    });

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

    describe('buildStatsForEachPlayer', () => {
        it('should build an empty object if there are no seasons', () => {
            const statsFilebase = {};
            const expectedStatsForEachPlayer = {};
            playersController = new PlayersController(statsFilebase);

            playersController.buildStatsForEachPlayer();

            assert.deepEqual(playersController.statsForEachPlayer, expectedStatsForEachPlayer);
        });

        it('should build an empty object if there are no players in any season', () => {
            const statsFilebase = {
                season1: [],
                season2: [],
                season3: []
            };
            const expectedStatsForEachPlayer = {};
            playersController = new PlayersController(statsFilebase);

            playersController.buildStatsForEachPlayer();

            assert.deepEqual(playersController.statsForEachPlayer, expectedStatsForEachPlayer);
        });

        it('should build an object of players stats from all seasons', () => {
            const statsFilebase = {
                season1: [{Player: "Alpha", Stats: 'some fake stats'}, {Player: "Bravo", DifStats: 'some dif fake stats'}, {Player: "Charlie", DiffStats: 'some diff fake stats'}],
                season2: [{Player: "Delta", DifferentStats: 'some different fake stats'}],
                season3: [{Player: "Echo", OtherStats: 'some other fake stats'}, {Player: "Foxtrot", FakeStats: 'these are fake stats'}]
            };
            const statsFilebaseCopy = JSON.parse(JSON.stringify(statsFilebase));
            const expectedStatsForEachPlayer = {
                Alpha: {
                    season1: {Stats: 'some fake stats'}
                },
                Bravo: {
                    season1: {DifStats: 'some dif fake stats'}
                },
                Charlie: {
                    season1: {DiffStats: 'some diff fake stats'}
                },
                Delta: {
                    season2: {DifferentStats: 'some different fake stats'}
                },
                Echo: {
                    season3: {OtherStats: 'some other fake stats'}
                },
                Foxtrot: {
                    season3: {FakeStats: 'these are fake stats'}
                }
            };
            playersController = new PlayersController(statsFilebase);

            playersController.buildStatsForEachPlayer();

            assert.deepEqual(playersController.statsForEachPlayer, expectedStatsForEachPlayer);
            assert.deepEqual(playersController.statsFilebase, statsFilebaseCopy);
        });
    });
});
