function PlayersController(statsFilebase) {
    this.statsFilebase = statsFilebase;
}

function buildStatsForEachPlayer (statsFilebase) {
    const statsForEachPlayer = {};
    Object.keys(statsFilebase).forEach(seasonKey => {
        const statsForASeason = statsFilebase[seasonKey];
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
}

function getListOfPlayers(statsForEachPlayer) {
    return Object.keys(statsForEachPlayer).sort();
}

function resetModalContents(modal) {
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

function buildTableHeader(document, playerStats) {
    const playerStatsTableHeader = document.createElement('thead');
    const playerStatsTableHeaderRow = document.createElement('tr');

    const seasonHeaderElement = document.createElement('th');
    const seasonHeaderElementTextNode = document.createTextNode('Season');
    seasonHeaderElement.appendChild(seasonHeaderElementTextNode);
    playerStatsTableHeaderRow.appendChild(seasonHeaderElement);

    const mostRecentSeasonStats = Object.values(playerStats)[0];
    Object.keys(mostRecentSeasonStats).forEach(statName => {
        if (statName !== '#') {
            const playerStatsTableHeaderElement = document.createElement('th');
            const playerStatsTableHeaderElementTextNode = document.createTextNode(statName);
            playerStatsTableHeaderElement.appendChild(playerStatsTableHeaderElementTextNode);
            playerStatsTableHeaderRow.appendChild(playerStatsTableHeaderElement);
        }
    });

    playerStatsTableHeader.appendChild(playerStatsTableHeaderRow);
    return playerStatsTableHeader;
}

function buildTableBody(document, playerStats) {
    const playerStatsTableBody = document.createElement('tbody');

    Object.keys(playerStats).forEach(season => {
        const seasonStatsTableRow = document.createElement('tr');
        const seasonTableDataElement = document.createElement('td');
        const seasonTableDataElementTextNode = document.createTextNode(season);
        seasonTableDataElement.appendChild(seasonTableDataElementTextNode);
        seasonStatsTableRow.appendChild(seasonTableDataElement);

        const statsForSeason = playerStats[season];
        Object.keys(statsForSeason).forEach(statisticName => {
            if (statisticName !== '#') {
                const statisticValue = statsForSeason[statisticName];
                const statisticTableDataElement = document.createElement('td');
                const statisticTableDataElementTextNode = document.createTextNode(statisticValue);
                statisticTableDataElement.appendChild(statisticTableDataElementTextNode);
                seasonStatsTableRow.appendChild(statisticTableDataElement);
            }
        });

        playerStatsTableBody.appendChild(seasonStatsTableRow);
    });
    return playerStatsTableBody;
}

function buildStatsTable(document, playerStats) {
    const playerStatsTable = document.createElement('table');
    const playerStatsTableHeader = buildTableHeader(document, playerStats);
    playerStatsTable.appendChild(playerStatsTableHeader);
    const playerStatsTableBody = buildTableBody(document, playerStats);
    playerStatsTable.appendChild(playerStatsTableBody);
    return playerStatsTable;
}

function buildModal(document, modal, playerName, playerStats) {
    resetModalContents(modal);

    const modalContentWrapper = document.createElement('div');
    modalContentWrapper.className = 'modal-content';

    const closeModalButton = buildCloseModalButton(document, modal);
    const playerModalHeader = buildPlayerModalHeader(document, playerName, playerStats);
    const playerStatsTable = buildStatsTable(document, playerStats);

    modalContentWrapper.appendChild(closeModalButton);
    modalContentWrapper.appendChild(playerModalHeader);
    modalContentWrapper.appendChild(playerStatsTable);
    modal.appendChild(modalContentWrapper);

    modal.style.display = 'block';
}

PlayersController.prototype.buildPlayersPage = function (document, playerListElement, modal) {
    const statsForEachPlayer = buildStatsForEachPlayer(this.statsFilebase);
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
