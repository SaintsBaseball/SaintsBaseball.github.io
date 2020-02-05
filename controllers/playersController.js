function PlayersController(statsFilebase) {
    this.statsFilebase = statsFilebase;
    this.statsForEachPlayer = {};
}

PlayersController.prototype.buildStatsForEachPlayer = function () {
    Object.keys(this.statsFilebase).forEach(seasonKey => {
        const statsForASeason = this.statsFilebase[seasonKey];
        statsForASeason.forEach(playerStats => {
            const playerName = playerStats.Player;

            const playerStatsWithNoName = Object.assign({}, playerStats);
            delete playerStatsWithNoName.Player;

            if (!this.statsForEachPlayer[playerName]) {
                this.statsForEachPlayer[playerName] = {};
            }

            this.statsForEachPlayer[playerName][seasonKey] = playerStatsWithNoName;
        });
    });
};

PlayersController.prototype.getListOfPlayers = function () {
    return Object.keys(this.statsForEachPlayer).sort();
};

module.exports = PlayersController;
