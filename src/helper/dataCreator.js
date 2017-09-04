const totalSeason = 9;

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
      let temp = {label: 2008 + i, winner : "A"};
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
      let temp = {label: 2008 + i};
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
    let temp = {label: 2008 + i};
    teamNames.forEach(function (team) {
      temp[team] = {name: teams[name], value: parseFloat(teams[team][keys[graphMode]][i])};
    });
    graphData.push(temp);
  }


  return {graphData, graphKeys};
}


export function playerData(deliveries, players, option) {
  let data = [];

  switch (option) {
    case 0: { //total run per season
      data = playersTotalScore(deliveries, players);
      break;
    }

    case 1: { //average strike rate per season
      data = playersTotalScore(deliveries, players, option);
      break;
    }
  }

  return data;
}


function playersTotalScore(deliveries, players, option) {
  let data = [];
  let seasonId = seasonByMatchid(0);
  let temp = {label: seasonId};

  for (let i = 0; i < players.length; i++) {
    temp[players[i]] = {name: players[i], value: 0};
  }

  for (let i = 0; i < deliveries.length; i++) {
    if (seasonId === seasonByMatchid(deliveries[i].match_id)) {
      if (temp[deliveries[i].batsman] !== undefined) {
        temp[deliveries[i].batsman].value += parseInt(deliveries[i].batsman_runs);
      }
    } else {
      seasonId = seasonByMatchid(i);
      i--;
      data.push(temp);
      temp = {label: seasonId};
      for (let i = 0; i < players.length; i++) {
        temp[players[i]] = {name: players[i], value: 0};
      }
    }
  }
  data.push(temp);
  return data;
}

function seasonByMatchid(matchId) {
  const id = parseInt(matchId);

  if (id <= 58)  return 2008;
  if (id <= 115) return 2009;
  if (id <= 175) return 2010;
  if (id <= 248) return 2011;
  if (id <= 322) return 2012;
  if (id <= 398) return 2013;
  if (id <= 458) return 2014;
  if (id <= 517) return 2015;
  if (id <= 577) return 2016;
  return 2017;

}


