import deliveries from '../src/iplData/deliveries.json';
import matches from '../src/iplData/matches.json';

const fs = require('fs');


let ifMax = (A,key,name,value) => {
  if(A[key].value < value){
    A[key].name = name;
    A[key].value= value;
  }
};

let ifMax6s4s = (A,key,name, total6s, total4s) => {
  if(A[key].value < total6s + total4s){
    A[key].name = name;
    A[key].value= (total6s + total4s);
    A[key].total6s= total6s;
    A[key].total4s= total4s;
  }
};


let match = [];
let matchId = 0;

let singleMatch = {
  date : matches[matchId].date,
  matchId : parseInt(matches[matchId].id),
  seasonId : parseInt(matches[matchId].season),
  results : matches[matchId].result,
  winner : matches[matchId].winner,
  closenessRun : parseInt(matches[matchId].win_by_runs),
  closenessWicket : parseInt(matches[matchId].win_by_wickets),
  tossWinner :  matches[matchId].toss_winner,
  batFirst:  matches[matchId].toss_decision === "field" ? (matches[matchId].toss_winner === matches[matchId].team1 ? matches[matchId].team2 : matches[matchId].team1) : matches[matchId].toss_winner,
  ballFirst: matches[matchId].toss_decision === "bat" ? (matches[matchId].toss_winner === matches[matchId].team1 ? matches[matchId].team2 : matches[matchId].team1) : matches[matchId].toss_winner,
  team1Score: {
    total4s : 0,
    total6s : 0,
    name : matches[matchId].toss_decision === "field" ? (matches[matchId].toss_winner === matches[matchId].team1 ? matches[matchId].team2 : matches[matchId].team1) : matches[matchId].toss_winner,
    value : 0,
  },
  team2Score: {
    total4s : 0,
    total6s : 0,
    name : matches[matchId].toss_decision === "bat" ? (matches[matchId].toss_winner === matches[matchId].team1 ? matches[matchId].team2 : matches[matchId].team1) : matches[matchId].toss_winner,
    value : 0,
  },
  max6s4s:{
    name : "",
    value : 0,
    total4s :0,
    total6s :0
},
  maxScore:{
    name : "",
    value : 0,
    strikeRate : 0,
  },
  maxWicket:{
    name : "",
    value : 0,
  },
  maxCatch:{
    name : "",
    value : 0,
  },
  playerOfMatch:matches[matchId].player_of_match,
  averageBatsmanScore : 0,
  totalBatsmanPlayed : 0,
  totalWicketTaken : 0,
  totalBowlerPlayed : 0,
  averageWicketTaken : 0,
};


let bowlers = {};
let fielders = {};
let batsman = {};
let max6s4s = {};

for(let i=0; i < deliveries.length; i++){
  if(singleMatch.matchId === parseInt(deliveries[i].match_id)){

    //max score
    if(batsman[deliveries[i].batsman] === undefined){
      batsman[deliveries[i].batsman] = {};
      batsman[deliveries[i].batsman].name = deliveries[i].batsman;
      batsman[deliveries[i].batsman].value = parseInt(deliveries[i].batsman_runs);
      batsman[deliveries[i].batsman].balls = 1 ;
      ifMax(singleMatch, "maxScore", deliveries[i].batsman, batsman[deliveries[i].batsman].value);

      singleMatch.totalBatsmanPlayed++;
      singleMatch.averageBatsmanScore += parseInt(deliveries[i].batsman_runs);

    }else{
      batsman[deliveries[i].batsman].value += parseInt(deliveries[i].batsman_runs);
      batsman[deliveries[i].batsman].balls = (parseInt(deliveries[i].extra_runs) === 0 || parseInt(deliveries[i].legbye_runs) !== 0)  ? batsman[deliveries[i].batsman].balls + 1 : batsman[deliveries[i].batsman].balls;
      ifMax(singleMatch, "maxScore", deliveries[i].batsman, batsman[deliveries[i].batsman].value);

      singleMatch.averageBatsmanScore += parseInt(deliveries[i].batsman_runs);
    }

    //wicket -  catches
    if(deliveries[i].player_dismissed !== ""){
      if(deliveries[i].dismissal_kind !== "run out") {

        if (bowlers[deliveries[i].bowler] === undefined) {
          bowlers[deliveries[i].bowler] = 1;
          ifMax(singleMatch, "maxWicket", deliveries[i].bowler, bowlers[deliveries[i].bowler]);

          singleMatch.totalBowlerPlayed++;
        } else {
          bowlers[deliveries[i].bowler] += 1;
          ifMax(singleMatch, "maxWicket", deliveries[i].bowler, bowlers[deliveries[i].bowler]);
        }


        singleMatch.totalWicketTaken++;


        if(deliveries[i].dismissal_kind === "caught") {
          if (fielders[deliveries[i].fielder] === undefined) {
            fielders[deliveries[i].fielder] = 1;
            ifMax(singleMatch, "maxCatch", deliveries[i].fielder, fielders[deliveries[i].fielder]);
          } else {
            fielders[deliveries[i].fielder] += 1;
            ifMax(singleMatch, "maxCatch", deliveries[i].fielder, fielders[deliveries[i].fielder]);
          }
        }
      }
    }

    //player with max 6s & 4s
    if(deliveries[i].batsman_runs === "6" || deliveries[i].batsman_runs === "4"){
      if(max6s4s[deliveries[i].batsman] === undefined){
        max6s4s[deliveries[i].batsman] = {};
        max6s4s[deliveries[i].batsman].value = 1;
        max6s4s[deliveries[i].batsman].total6s = deliveries[i].batsman_runs === "6" ? 1 : 0;
        max6s4s[deliveries[i].batsman].total4s = deliveries[i].batsman_runs === "4" ? 1 : 0;
        ifMax6s4s(singleMatch, "max6s4s", deliveries[i].batsman, max6s4s[deliveries[i].batsman].total6s, max6s4s[deliveries[i].batsman].total4s);
      }else{
        max6s4s[deliveries[i].batsman].value = max6s4s[deliveries[i].batsman].value + 1;
        max6s4s[deliveries[i].batsman].total6s = deliveries[i].batsman_runs === "6" ? max6s4s[deliveries[i].batsman].total6s+1 : max6s4s[deliveries[i].batsman].total6s;
        max6s4s[deliveries[i].batsman].total4s = deliveries[i].batsman_runs === "4" ? max6s4s[deliveries[i].batsman].total4s+1 : max6s4s[deliveries[i].batsman].total4s;
        ifMax6s4s(singleMatch, "max6s4s", deliveries[i].batsman, max6s4s[deliveries[i].batsman].total6s, max6s4s[deliveries[i].batsman].total4s);
      }
    }


    singleMatch.total4s = deliveries[i].batsman_runs === "4" ? (singleMatch.total4s + 1) : singleMatch.total4s;

    /** total team score **/
    if(deliveries[i].inning === "1"){
      singleMatch.team1Score.name = deliveries[i].batting_team;
      singleMatch.team1Score.value += parseInt(deliveries[i].total_runs);
      singleMatch.team1Score.total6s += deliveries[i].batsman_runs === "6" ? 1 : 0;
      singleMatch.team1Score.total4s += deliveries[i].batsman_runs === "4" ? 1 : 0;
    }else{
      singleMatch.team2Score.name = deliveries[i].batting_team;
      singleMatch.team2Score.value += parseInt(deliveries[i].total_runs);
      singleMatch.team2Score.total6s += deliveries[i].batsman_runs === "6" ? 1 : 0;
      singleMatch.team2Score.total4s += deliveries[i].batsman_runs === "4" ? 1 : 0;
    }


  }else{
    //calculating strike rate
    // console.log(batsman[singleMatch.maxScore.name].balls);
    singleMatch.maxScore.strikeRate = ((singleMatch.maxScore.value/batsman[singleMatch.maxScore.name].balls) * 100).toFixed(2);
    singleMatch.averageBatsmanScore = (singleMatch.averageBatsmanScore/singleMatch.totalBatsmanPlayed).toFixed(2);
    singleMatch.averageWicketTaken = (singleMatch.totalWicketTaken / singleMatch.totalBowlerPlayed).toFixed(2);
    match.push(singleMatch);
    matchId++;
    i--;
    singleMatch = {
      date : matches[matchId].date,
      matchId : parseInt(matches[matchId].id),
      seasonId : parseInt(matches[matchId].season),
      results : matches[matchId].result,
      winner : matches[matchId].winner,
      closenessRun : parseInt(matches[matchId].win_by_runs),
      closenessWicket : parseInt(matches[matchId].win_by_wickets),
      tossWinner :  matches[matchId].toss_winner,
      batFirst:  matches[matchId].toss_decision === "field" ? (matches[matchId].toss_winner === matches[matchId].team1 ? matches[matchId].team2 : matches[matchId].team1) : matches[matchId].toss_winner,
      ballFirst: matches[matchId].toss_decision === "bat" ? (matches[matchId].toss_winner === matches[matchId].team1 ? matches[matchId].team2 : matches[matchId].team1) : matches[matchId].toss_winner,
      team1Score: {
        total4s : 0,
        total6s : 0,
        name :  matches[matchId].toss_decision === "field" ? (matches[matchId].toss_winner === matches[matchId].team1 ? matches[matchId].team2 : matches[matchId].team1) : matches[matchId].toss_winner,
        value : 0,
      },
      team2Score: {
        total4s : 0,
        total6s : 0,
        name :  matches[matchId].toss_decision === "bat" ? (matches[matchId].toss_winner === matches[matchId].team1 ? matches[matchId].team2 : matches[matchId].team1) : matches[matchId].toss_winner,
        value : 0,
      },
      max6s4s:{
        name : "",
        value : 0,
        total4s :0,
        total6s :0
      },
      maxScore:{
        name : "",
        value : 0,
        strikeRate : 0,
      },
      maxWicket:{
        name : "",
        value : 0,
      },
      maxCatch:{
        name : "",
        value : 0,
      },
      playerOfMatch:matches[matchId].player_of_match,
      averageBatsmanScore : 0,
      totalBatsmanPlayed : 0,
      totalWicketTaken : 0,
      totalBowlerPlayed : 0,
      averageWicketTaken : 0,
    };
    bowlers = {};
    fielders = {};
    batsman = {};
    max6s4s = {};
  }
}

singleMatch.maxScore.strikeRate = ((singleMatch.maxScore.value/batsman[singleMatch.maxScore.name].balls) * 100).toFixed(2);
singleMatch.averageBatsmanScore = (singleMatch.averageBatsmanScore/singleMatch.totalBatsmanPlayed).toFixed(2);
singleMatch.averageWicketTaken = (singleMatch.totalWicketTaken / singleMatch.totalBowlerPlayed).toFixed(2);
match.push(singleMatch);

// const finalJson = JSON.stringify(match);
// fs.writeFile('matches.json', finalJson, 'utf8', function () {
//   console.log('matches written');
// });

//
/*****for seasons ****/
// // - Winner
// // - Match with highest score
// // - Batsman with highest score
// // - Player with highest wickets
// // - Player with highest catches
// // - Best closest match
//
// let seasons = [];
// let seasonId = match[0].seasonId;
//
// let singleSeason = {
//   season : match[0].seasonId,
//   winner : "",
//   finalMatchId :0,
//   highestScoreMatch : {
//     name : "",
//     value : 0,
//     matchId : 0,
//   },
//   highestScoreBatsman : {
//     name : "",
//     value: 0,
//     matchId : 0,
//   },
//   highestCatchesPlayer : {
//     name : "",
//     value: 0,
//     matchId : 0,
//   },
//   highestWicketsPlayer : {
//     name : "",
//     value: 0,
//     matchId : 0,
//   },
//   bestClosestMatch : {
//     name : "",
//     value: 0,
//     matchId : 0,
//   },
//   averageMatchScore : 0,
//   averageClosenessScore : 0,
//   totalMatch : 0,
//   mostPlayerOfMatch : {name: "", value : 0},
//   averageBatsmanScore : 0,
//   averageWicketTaken : 0,
//   total6s : 0,
//   total4s : 0,
// };
//
// let highestScoreMatch = {
//   value : 0,
//   closenessRun : 0
// };
// let highestScoreBatsman = {
//   value : 0,
//   strikeRate : 0
// };
// let highestCatchesPlayer = 0;
// let highestWicketsPlayer = 0;
// let bestClosestMatch = {
//   closenessRun : 500,
//   value : 0
// };
// let playerOfMatch = {};
//
//
// for(let i=0; i< match.length; i++){
//
//   if(seasonId === match[i].seasonId){
//
//     if(playerOfMatch[match[i].playerOfMatch] === undefined){
//       playerOfMatch[match[i].playerOfMatch] = 1;
//       if(playerOfMatch[match[i].playerOfMatch] > singleSeason.mostPlayerOfMatch.value){
//         singleSeason.mostPlayerOfMatch.value = playerOfMatch[match[i].playerOfMatch];
//         singleSeason.mostPlayerOfMatch.name = match[i].playerOfMatch;
//       }
//     }else{
//       playerOfMatch[match[i].playerOfMatch]++;
//       if(playerOfMatch[match[i].playerOfMatch] > singleSeason.mostPlayerOfMatch.value){
//         singleSeason.mostPlayerOfMatch.value = playerOfMatch[match[i].playerOfMatch];
//         singleSeason.mostPlayerOfMatch.name = match[i].playerOfMatch;
//       }
//     }
//
//     singleSeason.averageMatchScore += match[i].team1Score.value + match[i].team2Score.value;
//     singleSeason.totalMatch += 1;
//
//     //highest score
//     if(Math.max(match[i].team1Score.value, match[i].team2Score.value) > highestScoreMatch.value){
//       highestScoreMatch.value = Math.max(match[i].team1Score.value, match[i].team2Score.value);
//       singleSeason.highestScoreMatch.matchId = match[i].matchId;
//       singleSeason.highestScoreMatch.value = highestScoreMatch.value;
//       singleSeason.highestScoreMatch.name = match[i].winner;
//     }else if(Math.max(match[i].team1Score.value, match[i].team2Score.value) === highestScoreMatch.value && match[i].closenessRun > highestScoreMatch.closenessRun){
//       highestScoreMatch.closenessRun = match[i].closenessRun;
//       highestScoreMatch.value = Math.max(match[i].team1Score.value, match[i].team2Score.value);
//       singleSeason.highestScoreMatch.matchId = match[i].matchId;
//       singleSeason.highestScoreMatch.value = highestScoreMatch.value;
//       singleSeason.highestScoreMatch.name = match[i].winner;
//     }
//
//     // batsman
//     if(match[i].maxScore.value === highestScoreBatsman.value && match[i].maxScore.strikeRate > highestScoreBatsman.strikeRate ){
//       highestScoreBatsman.value = match[i].maxScore.value;
//       highestScoreBatsman.strikeRate = match[i].maxScore.strikeRate;
//       singleSeason.highestScoreBatsman.matchId = match[i].matchId;
//       singleSeason.highestScoreBatsman.value = highestScoreBatsman.value;
//       singleSeason.highestScoreBatsman.name = match[i].maxScore.name;
//     }
//     else if(match[i].maxScore.value > highestScoreBatsman.value){
//       highestScoreBatsman.value = match[i].maxScore.value;
//       highestScoreBatsman.strikeRate = match[i].maxScore.strikeRate;
//       singleSeason.highestScoreBatsman.matchId = match[i].matchId;
//       singleSeason.highestScoreBatsman.value = highestScoreBatsman.value;
//       singleSeason.highestScoreBatsman.name = match[i].maxScore.name;
//     }
//
//     //catcher
//     if(match[i].maxCatch.value >= highestCatchesPlayer) {
//       highestCatchesPlayer = match[i].maxCatch.value;
//       singleSeason.highestCatchesPlayer.matchId = match[i].matchId;
//       singleSeason.highestCatchesPlayer.value = highestCatchesPlayer;
//       singleSeason.highestCatchesPlayer.name = match[i].maxCatch.name;
//     }
//     //wickets
//     if(match[i].maxWicket.value >= highestWicketsPlayer) {
//       highestWicketsPlayer = match[i].maxWicket.value;
//       singleSeason.highestWicketsPlayer.matchId = match[i].matchId;
//       singleSeason.highestWicketsPlayer.value = highestWicketsPlayer;
//       singleSeason.highestWicketsPlayer.name = match[i].maxWicket.name;
//     }
//
//     //best closest match
//     if(match[i].closenessRun < bestClosestMatch.value) {
//       bestClosestMatch.closenessRun = match[i].closenessRun;
//       bestClosestMatch.value = Math.max(match[i].team1Score.value, match[i].team2Score.value);
//       singleSeason.bestClosestMatch.matchId = match[i].matchId;
//       singleSeason.bestClosestMatch.value = bestClosestMatch.closenessRun;
//       singleSeason.bestClosestMatch.name = match[i].team1Score.name + " VS " + match[i].team2Score;
//     }else if(match[i].closenessRun === bestClosestMatch.value && Math.max(match[i].team1Score.value, match[i].team2Score.value) > bestClosestMatch.value){
//       bestClosestMatch.closenessRun = match[i].closenessRun;
//       bestClosestMatch.value = Math.max(match[i].team1Score.value, match[i].team2Score.value);
//       singleSeason.bestClosestMatch.matchId = match[i].matchId;
//       singleSeason.bestClosestMatch.value = bestClosestMatch.closenessRun;
//       singleSeason.bestClosestMatch.name = match[i].team1Score.name + " VS " + match[i].team2Score;
//     }
//
//     singleSeason.averageClosenessScore =  match[i].closenessRun !== 0 ? singleSeason.averageClosenessScore + match[i].closenessRun : singleSeason.averageClosenessScore;
//     singleSeason.averageBatsmanScore += parseFloat(match[i].averageBatsmanScore);
//     singleSeason.averageWicketTaken += parseFloat(match[i].averageWicketTaken);
//
//     singleSeason.total6s += match[i].total6s;
//     singleSeason.total4s += match[i].total4s;
//
//   }else{
//     seasonId = match[i].seasonId;
//     i--;
//     singleSeason.averageMatchScore = (singleSeason.averageMatchScore/ (singleSeason.totalMatch*2)).toFixed(2);
//     singleSeason.winner = match[i].winner;
//     singleSeason.finalMatchId = match[i].matchId;
//     singleSeason.averageClosenessScore = (singleSeason.averageClosenessScore/singleSeason.totalMatch).toFixed(2);
//     singleSeason.averageBatsmanScore = (singleSeason.averageBatsmanScore/singleSeason.totalMatch).toFixed(2);
//     singleSeason.averageWicketTaken = (singleSeason.averageWicketTaken/singleSeason.totalMatch).toFixed(2);
//
//
//     seasons.push(singleSeason);
//     singleSeason = {
//       season : match[i+1].seasonId,
//       winner : "",
//       finalMatchId :0,
//       highestScoreMatch : {
//         name : "",
//         value : 0,
//         matchId : 0,
//       },
//       highestScoreBatsman : {
//         name : "",
//         value: 0,
//         matchId : 0,
//       },
//       highestCatchesPlayer : {
//         name : "",
//         value: 0,
//         matchId : 0,
//       },
//       highestWicketsPlayer : {
//         name : "",
//         value: 0,
//         matchId : 0,
//       },
//       bestClosestMatch : {
//         name : "",
//         value: 0,
//         matchId : 0,
//       },
//       averageMatchScore : 0,
//       averageClosenessScore : 0,
//       totalMatch : 0,
//       mostPlayerOfMatch : {name: "", value : 0},
//       averageBatsmanScore : 0,
//       averageWicketTaken : 0,
//       total6s : 0,
//       total4s : 0,
//     };
//     highestScoreMatch = {
//       value : 0,
//       closenessRun : 0
//     };
//     highestScoreBatsman = {
//       value : 0,
//       strikeRate : 0
//     };
//     highestCatchesPlayer = 0;
//     highestWicketsPlayer = 0;
//     bestClosestMatch = {
//       closenessRun : 500,
//       value : 0
//     };
//     playerOfMatch = {};
//   }
//
// }
//
//
// singleSeason.averageMatchScore = (singleSeason.averageMatchScore/ (singleSeason.totalMatch*2)).toFixed(2);
// singleSeason.winner = match[match.length-1].winner;
// singleSeason.finalMatchId = match[match.length-1].matchId;
// singleSeason.averageClosenessScore = (singleSeason.averageClosenessScore/singleSeason.totalMatch).toFixed(2);
// singleSeason.averageBatsmanScore = (singleSeason.averageBatsmanScore/singleSeason.totalMatch).toFixed(2);
// singleSeason.averageWicketTaken = (singleSeason.averageWicketTaken/singleSeason.totalMatch).toFixed(2);
// seasons.push(singleSeason);

// const finalSeasonJson = JSON.stringify(seasons);
// fs.writeFile('seasons.json', finalSeasonJson, 'utf8', function () {
//   console.log('seasons written');
// });


/********** Player data --new--********/

// let playersList = [];
//
// for(let i=0; i<deliveries.length; i++){
//   if(playersList.indexOf(deliveries[i].batsman) === -1) playersList.push(deliveries[i].batsman.replace(" (sub)", ""));
//   if(playersList.indexOf(deliveries[i].non_striker) === -1) playersList.push(deliveries[i].non_striker.replace(" (sub)", ""));
//   if(playersList.indexOf(deliveries[i].bowler) === -1) playersList.push(deliveries[i].bowler.replace(" (sub)", ""));
//   if(deliveries[i].fielder !== "" && playersList.indexOf(deliveries[i].fielder) === -1) playersList.push(deliveries[i].fielder.replace(" (sub)", ""));
// }
//
//
// playersList = new Set(playersList);
//
//
// let players = {};
//
//
// playersList.forEach(function (player,i) {
//   players[player.toLowerCase()] = {
//     name : player,
//     totalScore : [0,0,0,0,0,0,0,0,0],
//     ballPlayed : [0,0,0,0,0,0,0,0,0],
//     maxScore: [0,0,0,0,0,0,0,0,0],
//     total6s: [0,0,0,0,0,0,0,0,0],
//     total4s : [0,0,0,0,0,0,0,0,0],
//     matchPlayed: [0,0,0,0,0,0,0,0,0],
//     nonStrikerRun: [0,0,0,0,0,0,0,0,0],
//     wickets: [0,0,0,0,0,0,0,0,0],
//     ballThrown: [0,0,0,0,0,0,0,0,0],
//     totalRunGiven: [0,0,0,0,0,0,0,0,0]
//   };
//   playersList[i] = player.toLowerCase();
// });
//
// // const playersListJson = JSON.stringify(playersList);
// // fs.writeFile('playersList.json', playersListJson, 'utf8', function () {
// //   console.log('playersListJson written');
// // });
//
// matchId = deliveries[0].match_id;
//
// let totalScoreMatch = {};
// let totalBallsMatch = {};
// let totalmatchPlayed = {};
//
// for(let i=0; i<deliveries.length; i++){
//   const delivery = deliveries[i];
//
//   if(matchId !== deliveries[i].match_id){
//
//     for (let key in totalScoreMatch) {
//       const basex = seasonByMatchid((parseInt(deliveries[i].match_id) - 1));
//       players[key].maxScore[basex] = Math.max(players[key].maxScore[basex],totalScoreMatch[key]);
//       // players[key].maxStrikeRate[basex] = Math.max(players[key].maxStrikeRate[basex],(totalScoreMatch[key]/totalBallsMatch[key]).toFixed(2));
//       players[key].matchPlayed[basex] += totalmatchPlayed[key] === 1 ? 1 : 0;
//     }
//
//     totalScoreMatch = {};
//     totalBallsMatch = {};
//     totalmatchPlayed = {};
//     matchId = deliveries[i].match_id;
//   }
//
//   const base = seasonByMatchid(deliveries[i].match_id);
//
//   if(totalBallsMatch[delivery.batsman.toLowerCase()] === undefined) totalBallsMatch[delivery.batsman.toLowerCase()] = (delivery.wide_runs === "0") ? 1 : 0;
//   else totalBallsMatch[delivery.batsman.toLowerCase()] += (delivery.wide_runs === "0") ? 1 : 0;
//
//   if(totalScoreMatch[delivery.batsman.toLowerCase()] === undefined) totalScoreMatch[delivery.batsman.toLowerCase()] = parseInt(delivery.batsman_runs);
//   else totalScoreMatch[delivery.batsman.toLowerCase()] += parseInt(delivery.batsman_runs);
//
//   totalmatchPlayed[delivery.batsman.toLowerCase()] = 1;
//   totalmatchPlayed[delivery.bowler.toLowerCase()] = 1;
//   totalmatchPlayed[delivery.fielder.toLowerCase()] = 1;
//   totalmatchPlayed[delivery.non_striker.toLowerCase()] = 1;
//
//   players[delivery.batsman.toLowerCase()].totalScore[base] += parseInt(delivery.batsman_runs);
//   players[delivery.batsman.toLowerCase()].ballPlayed[base] += (delivery.wide_runs === "0") ? 1 : 0;
//   players[delivery.batsman.toLowerCase()].total6s[base] = delivery.batsman_runs === "6" ? players[delivery.batsman.toLowerCase()].total6s[base]+ 1 : players[delivery.batsman.toLowerCase()].total6s[base];
//   players[delivery.batsman.toLowerCase()].total4s[base] = delivery.batsman_runs === "4" ? players[delivery.batsman.toLowerCase()].total4s[base]+ 1 : players[delivery.batsman.toLowerCase()].total4s[base];
//   players[delivery.non_striker.toLowerCase()].nonStrikerRun[base] += parseInt(delivery.batsman_runs);
//   players[delivery.bowler.toLowerCase()].ballThrown[base] += 1;
//   players[delivery.bowler.toLowerCase()].totalRunGiven[base] += parseInt(delivery.total_runs);
//
//   if(delivery.player_dismissed !== "") {
//     if (delivery.dismissal_kind !== "run out") {
//       players[delivery.bowler.toLowerCase()].wickets[base] += 1;
//     }
//   }
//
// }
//
// for (let key in totalScoreMatch) {
//   players[key].maxScore[8] = Math.max(players[key].maxScore[8],totalScoreMatch[key]);
//   // players[key].maxStrikeRate[8] = Math.max(players[key].maxStrikeRate[8],(totalScoreMatch[key]/totalBallsMatch[key]).toFixed(2));
//   players[key].matchPlayed[8] += totalmatchPlayed[key] === 1 ? 1 : 0;
// }
//
// // // console.log(players["v kohli"]);
// //
function seasonByMatchid(matchId) {
  const id = parseInt(matchId);

  if(id <= 58 ) return 0;
  if(id <= 115 ) return 1;
  if(id <= 175 ) return 2;
  if(id <= 248 ) return 3;
  if(id <= 322 ) return 4;
  if(id <= 398 ) return 5;
  if(id <= 458 ) return 6;
  if(id <= 517 ) return 7;
  if(id <= 577 ) return 8;
  return 9;

}


// const playersJson = JSON.stringify(players);
// fs.writeFile('players.json', playersJson, 'utf8', function () {
//   console.log('playersJson written');
// });


/** Team data **/

let teamList = [];

for(let i=0; i<matches.length; i++){
  const match = matches[i];
  if(teamList.indexOf(match.team1) === -1) teamList.push(match.team1);
  if(teamList.indexOf(match.team2) === -1) teamList.push(match.team2);
}

let teams = {};

let matchWonTossWon = {};
let tossWon = {};

let matchWonBatFirst = {};
let batFirst = {};

let matchWonBowledFirst = {};
let ballFirst = {};

teamList.forEach(function (team) {
  teams[team] = {
    name : team,
    maxScore: [0,0,0,0,0,0,0,0,0], //x
    totalScore: [0,0,0,0,0,0,0,0,0], //x
    totalMatchPlayed: [0,0,0,0,0,0,0,0,0], //x
    matchWon: [0,0,0,0,0,0,0,0,0], //x
    matchWonTossWonPercentage: [0,0,0,0,0,0,0,0,0], //x
    total6s4s: [0,0,0,0,0,0,0,0,0], //x
    matchWonBatFirst: [0,0,0,0,0,0,0,0,0], //x
    matchWonBowledFirst: [0,0,0,0,0,0,0,0,0], //x
  };
  matchWonTossWon[team] = 0;
  tossWon[team] = 0;

  matchWonBatFirst[team] = 0;
  batFirst[team] = 0;

  matchWonBowledFirst[team] = 0;
  ballFirst[team] = 0;
});



for(let i=0; i<match.length; i++){

  const mat  = match[i];
  const base = seasonByMatchid(mat.matchId);
  // console.log(mat.team1Score.name,mat.team2Score.name);
  teams[mat.team1Score.name].maxScore[base] = Math.max( mat.team1Score.value, teams[mat.team1Score.name].maxScore[base]);
  teams[mat.team2Score.name].maxScore[base] = Math.max( mat.team2Score.value, teams[mat.team2Score.name].maxScore[base]);

  teams[mat.team1Score.name].totalScore[base] += mat.team1Score.value;
  teams[mat.team2Score.name].totalScore[base] += mat.team2Score.value;

  teams[mat.team1Score.name].totalMatchPlayed[base] += 1;
  teams[mat.team2Score.name].totalMatchPlayed[base] += 1;

  teams[mat.team1Score.name].matchWon[base] += mat.team1Score.name === mat.winner ? 1 : 0;
  teams[mat.team2Score.name].matchWon[base] += mat.team2Score.name === mat.winner ? 1 : 0;

  teams[mat.team1Score.name].total6s4s[base] += mat.team1Score.total6s + mat.team1Score.total4s;
  teams[mat.team2Score.name].total6s4s[base] += mat.team2Score.total6s + mat.team2Score.total4s;


  matchWonTossWon[mat.winner] += mat.winner === mat.tossWinner ? 1 : 0;
  tossWon[mat.tossWinner]++;

  matchWonBatFirst[mat.winner] += mat.winner === mat.batFirst ? 1 : 0;
  batFirst[mat.batFirst]++;

  matchWonBowledFirst[mat.winner] += mat.winner === mat.ballFirst ? 1 : 0;
  ballFirst[mat.ballFirst]++;

  if(base !== seasonByMatchid((mat.matchId + 1))){

    /** resetting **/
    teamList.forEach(function (team) {

      /** toss won **/
      teams[team].matchWonTossWonPercentage[base] = (matchWonTossWon[team]*100/tossWon[team]).toFixed(2);


      /** bat won **/
      teams[team].matchWonBatFirst[base] = (matchWonBatFirst[team]*100/batFirst[team]).toFixed(2);


      /** ball won **/
      teams[team].matchWonBowledFirst[base] = (matchWonBowledFirst[team]*100/ballFirst[team]).toFixed(2);

      matchWonTossWon[team] = 0;
      tossWon[team] = 0;

      matchWonBatFirst[team] = 0;
      batFirst[team] = 0;

      matchWonBowledFirst[team] = 0;
      ballFirst[team] = 0;
    });

  }
}


const teamJson = JSON.stringify(teams);
fs.writeFile('teams.json', teamJson, 'utf8', function () {
   console.log('teamJson written');
});




