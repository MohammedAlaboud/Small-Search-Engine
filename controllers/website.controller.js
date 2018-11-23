var Website = require('../models/Website.model');

exports.create = function(req, res) {
  var newWebsite = new Website();

  //retrieve properties of model
  newWebsite.title = req.body.title;
  newWebsite.url = req.body.url;
  newWebsite.description = req.body.description;
  newWebsite.submittedBy.id = req.body.id;

  newWebsite.save(function(err, result) { //save the inputted data
    if(err) {
      console.log('Error saving website');
    } else {
      console.log(result); //see it displayed in console
      res.status(200).end();
    }
  });
}

//search through websites using plugin from: https://github.com/pavelvlasov/mongoose-search-plugin
exports.searchResults = function(req, res) {
  var searchText = req.body.searchText;

  Website.search(searchText, {
    title: 1,
    description: 1,
    url: 1
  }, {
    conditions: {
      title: {
        $exists: true
      },
      description: {
        $exists: true
      },
      url: {
        $exists: true
      }
    },
    sort: {
      title: 1
    },
    limit: 10
  }, function(err, data) { //callback func
    if(err) {
      console.log('cant fetch results');
    } else {
      console.log(data.results);
      res.send(data.results);
    }
  });
}