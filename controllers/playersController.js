function playersController(statsFilebase) {

    function getPlayerList() {
        const playerList = [];

        Object.values(statsFilebase).forEach(statsForASeason => {
            statsForASeason.forEach(playerStats => {
                playerList.push(playerStats.Player);
            });
        });

        const playersListNoDuplicates = playerList.filter((player, index) => {
            return playerList.indexOf(player) === index;
        });

        return playersListNoDuplicates.sort();
    }

    return {
        getPlayerList
    };
}

module.exports = playersController;
