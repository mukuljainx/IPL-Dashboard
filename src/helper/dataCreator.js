export function seasonData(seasons,options) {

  const allKeys = ["average6s","average4s","averageMatchScore","mostPlayerOfMatch[value]",
                   "highestTeamScore[value]", "highestBatsmanScore[value]", "HighestWicket[value]", "HighestCatches[value]"];

  let data = [];
  let graphKeys = [];

  options.forEach(function (option) {
    graphKeys.push(allKeys[option]);
  });


  seasons.forEach(function (season) {
    let temp = {};
    temp.season = season.season;
    temp.winner = season.winner;

    if(options.indexOf(0) !== -1){
      temp.average6s = parseFloat((season.total6s/season.totalMatch).toFixed(2));
    }

    if(options.indexOf(1) !== -1){
      temp.average4s = parseFloat((season.total4s/season.totalMatch).toFixed(2));
    }

    if(options.indexOf(2) !== -1){
      temp.averageMatchScore = parseFloat(season.averageMatchScore);
    }

    if(options.indexOf(3) !== -1){
      temp.mostPlayerOfMatch = {};
      temp.mostPlayerOfMatch.name = season.mostPlayerOfMatch.name;
      temp.mostPlayerOfMatch.value = season.mostPlayerOfMatch.value;
    }

    if(options.indexOf(4) !== -1){
      temp.highestTeamScore = {};
      temp.highestTeamScore.name = season.highestScoreMatch.name;
      temp.highestTeamScore.value = season.highestScoreMatch.value;
    }

    if(options.indexOf(5) !== -1){
      temp.highestBatsmanScore = {};
      temp.highestBatsmanScore.name = season.highestScoreBatsman.name;
      temp.highestBatsmanScore.value = season.highestScoreBatsman.value;
    }

    if(options.indexOf(6) !== -1){
      temp.HighestWicket = {};
      temp.HighestWicket.name = season.highestWicketsPlayer.name;
      temp.HighestWicket.value = season.highestWicketsPlayer.value;
    }

    if(options.indexOf(7) !== -1){
      temp.HighestCatches = {};
      temp.HighestCatches.name = season.highestCatchesPlayer.name;
      temp.HighestCatches.value = season.highestCatchesPlayer.value;
    }

    data.push(temp);
  });

  return {data, graphKeys};
}
