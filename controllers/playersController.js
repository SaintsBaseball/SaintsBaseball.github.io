function playersController(statsFilebase) {

    function getPlayerList() {
        const playerList = [];

        Object.values(statsFilebase).forEach(statsForASeason => {
            statsForASeason.forEach(playerStats => {
                playerList.push(playerStats.Player);
            });
        });

        return playerList.sort();
    }

    return {
        getPlayerList
    };
}

module.exports = playersController;
