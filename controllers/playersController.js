function PlayersController(statsFilebase) {
    this.statsFilebase = statsFilebase;
    this.statsForEachPlayer = {};
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
    Object.keys(this.statsFilebase).forEach(seasonKey => {
        const statsForASeason = this.statsFilebase[seasonKey];
        statsForASeason.forEach(playerStats => {
            const playerStatsCopy = Object.assign({}, playerStats);
            const playerName = playerStatsCopy.Player;
            delete playerStatsCopy.Player;
            this.statsForEachPlayer[playerName] = {};
            this.statsForEachPlayer[playerName][seasonKey] = playerStatsCopy;
        });
    });
};

module.exports = PlayersController;
