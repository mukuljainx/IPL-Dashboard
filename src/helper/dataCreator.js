const totalSeason = 9;
const seasonWinner = ["Rajasthan Royals","Deccan Chargers","Chennai Super Kings","Chennai Super Kings","Kolkata Knight Riders","Mumbai Indians","Kolkata Knight Riders","Mumbai Indians","Sunrisers Hyderabad","Mumbai Indians"];

export function seasonData(seasons, options) {

  const allKeys = ["average6s", "average4s", "averageMatchScore", "mostPlayerOfMatch[value]",
    "highestTeamScore[value]", "highestBatsmanScore[value]", "HighestWicket[value]", "HighestCatches[value]"];
  // const allKeys = ["averageMatchScore",
  //   "highestTeamScore[value]", "highestBatsmanScore[value]"];

  let data = [];
  let graphKeys = [];

  options.forEach(function (option) {
    graphKeys.push(allKeys[option]);
  });


  seasons.forEach(function (season) {
    let temp = {};
    temp.season = season.season;
    temp.winner = season.winner;

    if (options.indexOf(0) !== -1) {
      temp.average6s = parseFloat((season.total6s / season.totalMatch).toFixed(2));
    }

    if (options.indexOf(1) !== -1) {
      temp.average4s = parseFloat((season.total4s / season.totalMatch).toFixed(2));
    }

    if (options.indexOf(2) !== -1) {
      temp.averageMatchScore = parseFloat(season.averageMatchScore);
    }

    if (options.indexOf(3) !== -1) {
      temp.mostPlayerOfMatch = {};
      temp.mostPlayerOfMatch.name = season.mostPlayerOfMatch.name;
      temp.mostPlayerOfMatch.value = season.mostPlayerOfMatch.value;
    }

    if (options.indexOf(4) !== -1) {
      temp.highestTeamScore = {};
      temp.highestTeamScore.name = season.highestScoreMatch.name;
      temp.highestTeamScore.value = season.highestScoreMatch.value;
    }

    if (options.indexOf(5) !== -1) {
      temp.highestBatsmanScore = {};
      temp.highestBatsmanScore.name = season.highestScoreBatsman.name;
      temp.highestBatsmanScore.value = season.highestScoreBatsman.value;
    }

    if (options.indexOf(6) !== -1) {
      temp.HighestWicket = {};
      temp.HighestWicket.name = season.highestWicketsPlayer.name;
      temp.HighestWicket.value = season.highestWicketsPlayer.value;
    }

    if (options.indexOf(7) !== -1) {
      temp.HighestCatches = {};
      temp.HighestCatches.name = season.highestCatchesPlayer.name;
      temp.HighestCatches.value = season.highestCatchesPlayer.value;
    }

    data.push(temp);
  });

  return {data, graphKeys};
}

export function getTeamData(teams, teamNames, graphMode) {

  let graphData = [];
  let graphKeys = [];

  teamNames.forEach(function (team) {
    graphKeys.push(team + "[value]");
  });

  if (graphMode[0] === 0) {
    for (let i = 0; i < totalSeason; i++) {
      let temp = {label: 2008 + i, winner : seasonWinner[i]};
      teamNames.forEach(function (team) {
        temp[team] = {
          name: teams[name],
          value: parseFloat((parseInt(teams[team].totalScore[i]) / parseInt(teams[team].totalMatchPlayed[i])).toFixed(2))
        };
      });
      graphData.push(temp);
    }
    return {graphData, graphKeys};
  }

  if (graphMode[0] === 4) {
    for (let i = 0; i < totalSeason; i++) {
      let temp = {label: 2008 + i, winner : seasonWinner[i]};
      teamNames.forEach(function (team) {
        temp[team] = {
          name: teams[name],
          value: parseFloat((parseInt(teams[team].matchWon[i]) / parseInt(teams[team].totalMatchPlayed[i])).toFixed(2))
        };
      });
      graphData.push(temp);
    }
    return {graphData, graphKeys};
  }

  const keys = ["NA", "maxScore", "total6s4s", "matchWon", "NA", "matchWonTossWonPercentage", "matchWonBatFirst", "matchWonBowledFirst"];


  for (let i = 0; i < totalSeason; i++) {
    let temp = {label: 2008 + i, winner : seasonWinner[i]};
    teamNames.forEach(function (team) {
      temp[team] = {name: teams[name], value: parseFloat(teams[team][keys[graphMode]][i])};
    });
    graphData.push(temp);
  }


  return {graphData, graphKeys};
}


export function getPlayerData(players,playerNames,graphMode) {

  let graphData = [];
  let graphKeys = [];

  playerNames.forEach(function (player) {
    graphKeys.push(player + "[value]");
  });
  // 2,8,9;

  if(graphMode[0] === 2)  graphData = seasonByMatchid(players,playerNames,"totalScore","ballPlayed");
  else if(graphMode[0] === 8)  graphData = seasonByMatchid(players,playerNames,"totalRunGiven","ballThrown");
  else if(graphMode[0] === 9)  graphData = seasonByMatchid(players,playerNames,"ballThrown","totalRunGiven");
  else {
    const keys = ["totalScore", "maxScore", "NA", "total6s", "total4s", "matchPlayed", "nonStrikerRun", "wickets", "NA", "NA"];

    for (let i = 0; i < totalSeason; i++) {
      let temp = {label: 2008 + i};
      playerNames.forEach(function (player) {
        temp[player] = {name: players[name], value: parseFloat(players[player.toLowerCase()][keys[graphMode]][i])};
      });
      graphData.push(temp);
    }
  }
  return {graphData, graphKeys};
}




function seasonByMatchid(players,playerNames,A,B) {
  let graphData = [];
  for (let i = 0; i < totalSeason; i++) {
    let temp = {label: 2008 + i};
    playerNames.forEach(function (player) {
      temp[player] = {name: players[name], value: parseFloat((parseFloat(players[player.toLowerCase()][A][i])/parseFloat(players[player.toLowerCase()][B][i])).toFixed(2))};
    });
    graphData.push(temp);
  }

  return graphData;
}


