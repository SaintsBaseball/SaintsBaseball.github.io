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

PlayersController.prototype.buildPlayersPage = function (document, listElement) {
    const statsForEachPlayer = this.buildStatsForEachPlayer();
    const playerList = this.getListOfPlayers(statsForEachPlayer);

    playerList.forEach(playerName => {
        const playerListItemElement = document.createElement('li');
        const playerTextNode = document.createTextNode(playerName);

        playerListItemElement.appendChild(playerTextNode);
        listElement.appendChild(playerListItemElement);
    });
};

module.exports = PlayersController;
