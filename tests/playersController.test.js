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

        it('should build an object of players stats from all seasons with no duplicates', function () {
            const statsFilebase = {
                season1: [{Player: "Echo", OtherStats: 'some other fake stats'}, {Player: "Bravo", DifStats: 'some dif fake stats'}, {Player: "Foxtrot", blahStats: 'these are blah stats'}, {Player: "Alpha", season1Stats: 'some season1 stats'}, {Player: "Delta", DifferentStats: 'some different fake stats'}],
                season2: [{Player: "Echo", xStats: 'some x stats'}, {Player: "Charlie", DiffStats: 'some diff fake stats'}, {Player: "Bravo", aStats: 'some a stats'}],
                season3: [{Player: "Alpha", Stats: 'some fake stats'}, {Player: "Bravo", finalStats: 'some final stats'}, {Player: "Foxtrot", FakeStats: 'these are fake stats'}]
            };
            const statsFilebaseCopy = JSON.parse(JSON.stringify(statsFilebase));
            const expectedStatsForEachPlayer = {
                Alpha: {
                    season1: {season1Stats: 'some season1 stats'},
                    season3: {Stats: 'some fake stats'}
                },
                Bravo: {
                    season1: {DifStats: 'some dif fake stats'},
                    season2: {aStats: 'some a stats'},
                    season3: {finalStats: 'some final stats'}
                },
                Charlie: {
                    season2: {DiffStats: 'some diff fake stats'}
                },
                Delta: {
                    season1: {DifferentStats: 'some different fake stats'}
                },
                Echo: {
                    season1: {OtherStats: 'some other fake stats'},
                    season2: {xStats: 'some x stats'}
                },
                Foxtrot: {
                    season1: {blahStats: 'these are blah stats'},
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
