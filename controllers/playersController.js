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

module.exports = PlayersController;
