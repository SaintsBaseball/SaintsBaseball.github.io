function PlayersController(statsFilebase) {
    this.statsFilebase = statsFilebase;
}

PlayersController.prototype.buildStatsForEachPlayer = function () {
    const statsForEachPlayer = {};
    Object.keys(this.statsFilebase).forEach(seasonKey => {
        const statsForASeason = this.statsFilebase[seasonKey];
        statsForASeason.forEach(playerStats => {
            const playerName = playerStats.Player;

            const playerStatsWithNoName = Object.assign({}, playerStats);
            delete playerStatsWithNoName.Player;

            if (!statsForEachPlayer[playerName]) {
                statsForEachPlayer[playerName] = {};
            }

            statsForEachPlayer[playerName][seasonKey] = playerStatsWithNoName;
        });
    });

    return statsForEachPlayer;
};

PlayersController.prototype.getListOfPlayers = function (statsForEachPlayer) {
    return Object.keys(statsForEachPlayer).sort();
};

PlayersController.prototype.buildPlayersPage = function (document, playerListElement) {
    const statsForEachPlayer = this.buildStatsForEachPlayer();
    const playerList = this.getListOfPlayers(statsForEachPlayer);

    playerList.forEach(playerName => {
        const tableRowElement = document.createElement('tr');
        const tableItemElement = document.createElement('td');
        const tableItemButtonElement = document.createElement('button');
        const playerTextNode = document.createTextNode(playerName);

        tableItemButtonElement.appendChild(playerTextNode);
        tableItemElement.appendChild(tableItemButtonElement);
        tableRowElement.appendChild(tableItemElement);
        playerListElement.appendChild(tableRowElement);
    });
};

module.exports = PlayersController;
