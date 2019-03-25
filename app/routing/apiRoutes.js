// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendData = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    res.json(friendData);
  });


  app.post("/api/friends", function (req, res) {

    var user = req.body;
    var userScores = user.scores;
    var matchingFriend = {};
    var leastDifference = null;


    friendData.map(item => {

      var friendScores = item.scores;
      var difference = 0;

      for (var i = 0; i < userScores.length; i++) {
        difference += Math.abs(userScores[i] - friendScores[i]);
      }
      if (leastDifference == null) {
        leastDifference = difference;
        matchingFriend = item;
      }
      else if (difference < leastDifference) {
        leastDifference = difference;
        matchingFriend = item;
      }
    })

    if (user.name == matchingFriend.name) {
      matchingFriend = friendData[0];
    }
    friendData.push(user);
    res.json(matchingFriend);
  })
};
