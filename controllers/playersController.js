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

function restModalContents(modal) {
    while (modal.hasChildNodes()) {
        modal.removeChild(modal.firstChild);
    }
}

function buildCloseModalButton(document, modal) {
    const closeSpan = document.createElement('span');
    closeSpan.className = 'close';
    closeSpan.innerHTML = '&times';

    closeSpan.onclick = function () {
        modal.style.display = 'none';
    };
    return closeSpan;
}

function buildPlayerModalHeader(document, playerName, playerStats) {
    const playerNameHeader = document.createElement('h2');
    const playerNumber = (Object.values(playerStats))[0]['#'];
    playerNameHeader.innerHTML = `${playerName} #${playerNumber}`;
    return playerNameHeader;
}

function buildModal(document, modal, playerName, playerStats) {
    restModalContents(modal);

    const modalContentWrapper = document.createElement('div');
    modalContentWrapper.className = 'modal-content';

    const closeModalButton = buildCloseModalButton(document, modal);
    const playerModalHeader = buildPlayerModalHeader(document, playerName, playerStats);

    const playerStatsTable = document.createElement('table');
    const playerStatsHeader = document.createElement('thead');
    const playerStatsHeaderRow = document.createElement('tr');

    const mostRecentSeasonStats = Object.values(playerStats)[0];
    Object.keys(mostRecentSeasonStats).forEach(statName => {
        if (statName !== '#') {
            const playerStatsHeaderElement = document.createElement('th');
            const playerStatsHeaderTextNode = document.createTextNode(statName);
            playerStatsHeaderElement.appendChild(playerStatsHeaderTextNode);
            playerStatsHeaderRow.appendChild(playerStatsHeaderElement);
        }
    });

    playerStatsHeader.appendChild(playerStatsHeaderRow);
    playerStatsTable.appendChild(playerStatsHeader);

    modalContentWrapper.appendChild(closeModalButton);
    modalContentWrapper.appendChild(playerModalHeader);
    modalContentWrapper.appendChild(playerStatsTable);
    modal.appendChild(modalContentWrapper);

    modal.style.display = 'block';
}

PlayersController.prototype.buildPlayersPage = function (document, playerListElement, modal) {
    const statsForEachPlayer = this.buildStatsForEachPlayer();
    const playerList = getListOfPlayers(statsForEachPlayer);

    playerList.forEach(playerName => {
        const listItemElement = document.createElement('li');
        const playerTextNode = document.createTextNode(playerName);

        const playerStats = statsForEachPlayer[playerName];
        listItemElement.onclick = buildModal.bind(null, document, modal, playerName, playerStats);

        listItemElement.appendChild(playerTextNode);
        playerListElement.appendChild(listItemElement);
    });
};

module.exports = PlayersController;
