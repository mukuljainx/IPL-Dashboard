export function seasonData(seasons,options) {
  let data = [];

  seasons.forEach(function (season) {
    let temp = {};
    temp.season = season.season;

    if(options.indexOf(0) !== -1){
      temp.average6s = (season.total6s/season.totalMatch).toFixed(2);
    }

    if(options.indexOf(1) !== -1){
      temp.average4s = parseFloat((season.total4s/season.totalMatch).toFixed(2));
    }

    if(options.indexOf(2) !== -1){
      temp.averageMatchScore = season.averageMatchScore;
    }

    if(options.indexOf(3) !== -1){
      temp.mostPlayerOfMatch = {};
      temp.mostPlayerOfMatch.name = season.mostPlayerOfMatch.name;
      temp.mostPlayerOfMatch.value = season.mostPlayerOfMatch.value;
    }

    // if(options.indexOf(4) !== -1){
    //   temp.mostPlayerOfMatch = {};
    //   temp.mostPlayerOfMatch.name = season.mostPlayerOfMatch.name;
    //   temp.mostPlayerOfMatch.value = season.mostPlayerOfMatch.value;
    // }

    data.push(temp);
  });

  return data;
}
