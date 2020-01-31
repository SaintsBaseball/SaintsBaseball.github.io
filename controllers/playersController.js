function PlayersController(statsFilebase) {
    this.statsFilebase = statsFilebase;
}

PlayersController.prototype.getPlayerList = function () {
    const playerList = [];

    Object.values(this.statsFilebase).forEach(statsForASeason => {
        statsForASeason.forEach(playerStats => {
            playerList.push(playerStats.Player);
        });
    });

    const playersListNoDuplicates = playerList.filter((player, index) => {
        return playerList.indexOf(player) === index;
    });

    return playersListNoDuplicates.sort();
};

PlayersController.prototype.buildStatsForEachPlayer = function () {
    this.statsForEachPlayer = {};

    Object.keys(this.statsFilebase).forEach(seasonKey => {
        const statsForASeason = this.statsFilebase[seasonKey];
        statsForASeason.forEach(playerStats => {
            const playerName = playerStats.Player;
            delete playerStats.Player;
            this.statsForEachPlayer[playerName] = {};
            this.statsForEachPlayer[playerName][seasonKey] = playerStats;
        });
    });
};

module.exports = PlayersController;
