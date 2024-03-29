const playerInfoColumns: string[] = ['#', 'Player'];
const standardHittingStatisticColumns: string[] = ['G', 'AB', 'R', 'H', '2B', '3B', 'HR', 'RBI', 'BB', 'SO', 'SB', 'CS', 'AVG', 'OBP', 'SLG', 'OPS'];
const advancedHittingStatisticColumns: string[] = ['PA', 'HBP', 'SAC', 'SF', 'GIDP', 'GO/AO', 'XBH', 'TB', 'IBB', 'BABIP', 'ISO', 'AB/HR', 'BB/K', 'BB%', 'SO%'];
const standardPitchingStatisticColumns: string[] = ['W', 'L', 'ERA', 'G', 'GS', 'CG', 'SHO', 'SV', 'SVO', 'IP', 'H', 'R', 'ER', 'HR', 'HB', 'BB', 'SO', 'WHIP', 'AVG'];
const advancedPitchingStatisticColumns: string[] = ['TBF', 'NP', 'P/IP', 'QS', 'GF', 'HLD', 'IBB', 'WP', 'BK', 'GDP', 'GO/AO', 'SO/9', 'BB/9', 'K/BB', 'BABIP', 'SB', 'CS', 'PK'];
  
export const statisticGroupToStatisticColumns = {
  'hitting-standard': playerInfoColumns.concat(standardHittingStatisticColumns),
  'hitting-advanced': playerInfoColumns.concat(advancedHittingStatisticColumns),
  'pitching-standard': playerInfoColumns.concat(standardPitchingStatisticColumns),
  'pitching-advanced': playerInfoColumns.concat(advancedPitchingStatisticColumns)
}
