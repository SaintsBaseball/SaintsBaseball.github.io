const assert = require('assert');
const sinon = require('sinon');
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
        });
    });

    describe('buildStatsForEachPlayer', () => {
        it('should build an empty object if there are no seasons', () => {
            const statsFilebase = {};
            const expectedStatsForEachPlayer = {};
            playersController = new PlayersController(statsFilebase);

            const actualStatsForEachPlayer = playersController.buildStatsForEachPlayer();

            assert.deepEqual(actualStatsForEachPlayer, expectedStatsForEachPlayer);
        });

        it('should build an empty object if there are no players in any season', () => {
            const statsFilebase = {
                season1: [],
                season2: [],
                season3: []
            };
            const expectedStatsForEachPlayer = {};
            playersController = new PlayersController(statsFilebase);

            const actualStatsForEachPlayer = playersController.buildStatsForEachPlayer();

            assert.deepEqual(actualStatsForEachPlayer, expectedStatsForEachPlayer);
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

            const actualStatsForEachPlayer = playersController.buildStatsForEachPlayer();

            assert.deepEqual(actualStatsForEachPlayer, expectedStatsForEachPlayer);
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

            const actualStatsForEachPlayer = playersController.buildStatsForEachPlayer();

            assert.deepEqual(actualStatsForEachPlayer, expectedStatsForEachPlayer);
            assert.deepEqual(playersController.statsFilebase, statsFilebaseCopy);
        });
    });

    describe('buildPlayersPage', () => {
        let documentMock;
        let listMock;
        let listItemMock;
        let textNodeMock;
        let modalMock;
        let divMock;
        let spanMock;
        let headerMock;
        let tableMock;
        let tableHeaderMock;
        let tableRowMock;
        let tableHeaderElementMock;
        let playersController;
        let hasChildNodesCallCount;

        beforeEach(() => {
            listItemMock = {
                appendChild: sinon.spy()
            };
            divMock = {
                appendChild: sinon.spy()
            };
            spanMock = {
                appendChild: sinon.spy()
            };
            headerMock = {
                appendChild: sinon.spy()
            };
            tableMock = {
                appendChild: sinon.spy()
            };
            tableHeaderMock = {
                appendChild: sinon.spy()
            };
            tableRowMock = {
                appendChild: sinon.spy()
            };
            tableHeaderElementMock = {
                appendChild: sinon.spy()
            };
            textNodeMock = {};
            documentMock = {
                createElement: sinon.spy((elementType) => {
                    switch(elementType) {
                        case 'li':
                            return listItemMock;
                        case 'div':
                            return divMock;
                        case 'span':
                            return spanMock;
                        case 'h2':
                            return headerMock;
                        case 'table':
                            return tableMock;
                        case 'thead':
                            return tableHeaderMock;
                        case 'tr':
                            return tableRowMock;
                        case 'th':
                            return tableHeaderElementMock;
                    }
                }),
                createTextNode: sinon.spy(() => {
                    return textNodeMock;
                })
            };

            listMock = {
                appendChild: sinon.spy()
            };

            hasChildNodesCallCount = 0;
            modalMock = {
                appendChild: sinon.spy(),
                hasChildNodes: sinon.spy(() => {
                    hasChildNodesCallCount++;
                    return hasChildNodesCallCount < 5;
                }),
                removeChild: sinon.spy(),
                style: {},
                firstChild: {
                    data: 'this is a fake child'
                }
            };

            playersController = new PlayersController();
        });

        it('should build an empty player list if there are no statistics', function () {
            playersController.statsFilebase = {};

            playersController.buildPlayersPage(documentMock, listMock, modalMock);

            assert.equal(documentMock.createElement.callCount, 0);
            assert.equal(documentMock.createTextNode.callCount, 0);
            assert.equal(listItemMock.appendChild.callCount, 0);
            assert.equal(listMock.appendChild.callCount, 0);
        });

        it('should build an empty player list if there are no players in any season', function () {
            playersController.statsFilebase = {
                season1: [],
                season2: [],
                season3: []
            };

            playersController.buildPlayersPage(documentMock, listMock, modalMock);

            assert.equal(documentMock.createElement.callCount, 0);
            assert.equal(documentMock.createTextNode.callCount, 0);
            assert.equal(listItemMock.appendChild.callCount, 0);
            assert.equal(listMock.appendChild.callCount, 0);
        });

        it('should build the player list of all players in all seasons with no duplicates sorted alphabetically', function () {
            playersController.statsFilebase = {
                season1: [{Player: "Echo"}, {Player: "Bravo"}, {Player: "Foxtrot"}, {Player: "Alpha"}, {Player: "Delta"}],
                season2: [{Player: "Echo"}, {Player: "Charlie"}, {Player: "Bravo"}],
                season3: [{Player: "Alpha"}, {Player: "Bravo"}, {Player: "Foxtrot"}]
            };

            playersController.buildPlayersPage(documentMock, listMock, modalMock);

            assert.equal(documentMock.createElement.withArgs('li').callCount, 6);
            assert.equal(documentMock.createTextNode.callCount, 6);
            assert.equal(documentMock.createTextNode.args[0][0], 'Alpha');
            assert.equal(documentMock.createTextNode.args[1][0], 'Bravo');
            assert.equal(documentMock.createTextNode.args[2][0], 'Charlie');
            assert.equal(documentMock.createTextNode.args[3][0], 'Delta');
            assert.equal(documentMock.createTextNode.args[4][0], 'Echo');
            assert.equal(documentMock.createTextNode.args[5][0], 'Foxtrot');
            assert.equal(listItemMock.appendChild.callCount, 6);
            assert(listItemMock.appendChild.alwaysCalledWithExactly(textNodeMock));
            assert.equal(listMock.appendChild.callCount, 6);
            assert(listMock.appendChild.alwaysCalledWithExactly(listItemMock));
        });

        it('should open a modal when selecting a player', function () {
            playersController.statsFilebase = {
                season1: [{Player: "Alpha", '#': 1}]
            };

            playersController.buildPlayersPage(documentMock, listMock, modalMock);
            listItemMock.onclick();

            assert.equal(documentMock.createElement.withArgs('div').callCount, 1);
            assert.equal(divMock.className, 'modal-content');
            assert.equal(documentMock.createElement.withArgs('span').callCount, 1);
            assert.equal(spanMock.className, 'close');
            assert.equal(spanMock.innerHTML, '&times');
            assert.equal(documentMock.createElement.withArgs('h2').callCount, 1);
            assert.equal(headerMock.innerHTML, 'Alpha #1');
            assert.equal(divMock.appendChild.args[0][0], spanMock);
            assert.equal(divMock.appendChild.args[1][0], headerMock);
            assert.equal(modalMock.appendChild.callCount, 1);
            assert.equal(modalMock.appendChild.args[0][0], divMock);
            assert.equal(modalMock.style.display, 'block');
        });

        it('should show the most recent number for a player in the modal header', function () {
            playersController.statsFilebase = {
                season3: [{Player: "Alpha", '#': 3}],
                season2: [{Player: "Alpha", '#': 2}],
                season1: [{Player: "Alpha", '#': 1}]
            };

            playersController.buildPlayersPage(documentMock, listMock, modalMock);
            listItemMock.onclick();

            assert.equal(headerMock.innerHTML, 'Alpha #3');
        });

        it('should clear the contents of the modal when opening it', function () {
            playersController.statsFilebase = {
                season1: [{Player: "Alpha"}]
            };

            playersController.buildPlayersPage(documentMock, listMock, modalMock);
            listItemMock.onclick();

            assert.equal(modalMock.hasChildNodes.callCount, hasChildNodesCallCount);
            assert.equal(modalMock.removeChild.callCount, hasChildNodesCallCount - 1);
            assert.equal(modalMock.removeChild.args[0][0], modalMock.firstChild);
        });

        it('should close the modal when clicking the X', function () {
            playersController.statsFilebase = {
                season1: [{Player: "Alpha"}]
            };

            playersController.buildPlayersPage(documentMock, listMock, modalMock);
            listItemMock.onclick();
            spanMock.onclick();

            assert.equal(modalMock.style.display, 'none');
        });

        it('should show the player stats for each season in a table in the modal', function () {
            playersController.statsFilebase = {
                season3: [{Player: "Alpha", '#': 3, stat: 'some final fake value', anotherStat: 9, lastStat: 5.24}],
                season2: [{Player: "Alpha", '#': 2, stat: 'some other fake value', anotherStat: 0, lastStat: 3.16}],
                season1: [{Player: "Alpha", '#': 1, stat: 'some fake value', anotherStat: 6, lastStat: 2.87}]
            };

            playersController.buildPlayersPage(documentMock, listMock, modalMock);
            listItemMock.onclick();

            assert.equal(documentMock.createElement.withArgs('table').callCount, 1);
            assert.equal(documentMock.createElement.withArgs('thead').callCount, 1);
            assert.equal(documentMock.createElement.withArgs('tr').callCount, 1);
            assert.equal(documentMock.createElement.withArgs('th').callCount, 3);
            assert.equal(documentMock.createTextNode.callCount, 4);
            assert.equal(documentMock.createTextNode.args[1][0], 'stat');
            assert.equal(documentMock.createTextNode.args[2][0], 'anotherStat');
            assert.equal(documentMock.createTextNode.args[3][0], 'lastStat');
            assert.equal(tableHeaderElementMock.appendChild.callCount, 3);
            assert.equal(tableHeaderElementMock.appendChild.withArgs(textNodeMock).callCount, 3);
            assert.equal(tableRowMock.appendChild.callCount, 3);
            assert.equal(tableRowMock.appendChild.withArgs(tableHeaderElementMock).callCount, 3);
            assert.equal(tableHeaderMock.appendChild.callCount, 1);
            assert.equal(tableHeaderMock.appendChild.withArgs(tableRowMock).callCount, 1);
            assert.equal(tableMock.appendChild.callCount, 1);
            assert.equal(tableMock.appendChild.withArgs(tableHeaderMock).callCount, 1);
            assert.equal(divMock.appendChild.callCount, 3);
            assert.equal(divMock.appendChild.args[2][0], tableMock);
        });
    });
});
