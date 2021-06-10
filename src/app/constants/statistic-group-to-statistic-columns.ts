const standardStatisticColumns: string[] = ['#', 'Player', 'G', 'AB', 'R', 'H', '2B', '3B', 'HR', 'RBI', 'BB', 'SO', 'SB', 'CS', 'AVG', 'OBP', 'SLG', 'OPS'];
const advancedStatisticColumns: string[] = ['#', 'Player', 'PA', 'HBP', 'SAC', 'SF', 'GIDP', 'GO/AO', 'XBH', 'TB', 'IBB', 'BABIP', 'ISO', 'AB/HR', 'BB/K', 'BB%', 'SO%'];
  
export const statisticGroupToStatisticColumns = {
  standard: standardStatisticColumns,
  advanced: advancedStatisticColumns
}
