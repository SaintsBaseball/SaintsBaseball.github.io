const standardHittingStatisticColumns: string[] = ['#', 'Player', 'G', 'AB', 'R', 'H', '2B', '3B', 'HR', 'RBI', 'BB', 'SO', 'SB', 'CS', 'AVG', 'OBP', 'SLG', 'OPS'];
const advancedHittingStatisticColumns: string[] = ['#', 'Player', 'PA', 'HBP', 'SAC', 'SF', 'GIDP', 'GO/AO', 'XBH', 'TB', 'IBB', 'BABIP', 'ISO', 'AB/HR', 'BB/K', 'BB%', 'SO%'];
const standardPitchingStatisticColumns: string[] = ['#', 'Player', 'W', 'L', 'ERA', 'G', 'GS', 'CG', 'SHO', 'SV', 'SVO', 'IP', 'H', 'R', 'ER', 'HR', 'HB', 'BB', 'SO', 'AB', 'WHIP', 'AVG'];
const advancedPitchingStatisticColumns: string[] = ['#', 'Player', 'TBF', 'NP', 'P/IP', 'QS', 'GF', 'HLD', 'IBB', 'WP', 'BK', 'SF', 'GDP', 'GO', 'AO', 'GO/AO', 'SO/9', 'BB/9', 'K/BB', 'BABIP', 'SB', 'CS', 'PK'];
  
export const statisticGroupToStatisticColumns = {
  'hitting-standard': standardHittingStatisticColumns,
  'hitting-advanced': advancedHittingStatisticColumns,
  'pitching-standard': standardPitchingStatisticColumns,
  'pitching-advanced': advancedPitchingStatisticColumns
}
