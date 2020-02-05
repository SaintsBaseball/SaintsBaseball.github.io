function PlayersController(statsFilebase) {
    this.statsFilebase = statsFilebase;
    this.statsForEachPlayer = {};
}

PlayersController.prototype.buildStatsForEachPlayer = function () {
    Object.keys(this.statsFilebase).forEach(seasonKey => {
        const statsForASeason = this.statsFilebase[seasonKey];
        statsForASeason.forEach(playerStats => {
            const playerStatsCopy = Object.assign({}, playerStats);
            const playerName = playerStatsCopy.Player;
            delete playerStatsCopy.Player;

            if (!this.statsForEachPlayer[playerName]) {
                this.statsForEachPlayer[playerName] = {};
            }

            this.statsForEachPlayer[playerName][seasonKey] = playerStatsCopy;
        });
    });
};

module.exports = PlayersController;
