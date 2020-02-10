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

function getListOfPlayers(statsForEachPlayer) {
    return Object.keys(statsForEachPlayer).sort();
}

function buildModal(document, modal) {
    while (modal.hasChildNodes()) {
        modal.removeChild(modal.firstChild);
    }

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    const closeSpan = document.createElement('span');
    closeSpan.className = 'close';
    closeSpan.innerHTML = '&times';
    const pElement = document.createElement('p');

    modalContent.appendChild(closeSpan);
    modalContent.appendChild(pElement);
    modal.appendChild(modalContent);

    closeSpan.onclick = function () {
        modal.style.display = 'none';
    };

    modal.style.display = 'block';
}

PlayersController.prototype.buildPlayersPage = function (document, playerListElement, modal) {
    const statsForEachPlayer = this.buildStatsForEachPlayer();
    const playerList = getListOfPlayers(statsForEachPlayer);

    playerList.forEach(playerName => {
        const tableRowElement = document.createElement('tr');
        const tableItemElement = document.createElement('td');
        const playerTextNode = document.createTextNode(playerName);

        tableItemElement.onclick = buildModal.bind(null, document, modal);

        tableItemElement.appendChild(playerTextNode);
        tableRowElement.appendChild(tableItemElement);
        playerListElement.appendChild(tableRowElement);
    });
};

module.exports = PlayersController;
