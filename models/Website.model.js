var mongoose = require('mongoose');
var searchPlugin = require('mongoose-search-plugin');
var Schema = mongoose.Schema;

var WebsiteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  submittedBy: { //grab user that submits new entry
    id: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  },
  //data inputted and displayed
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

//reference search plugin (plugin from documentation: https://github.com/pavelvlasov/mongoose-search-plugin)
WebsiteSchema.plugin(searchPlugin, {
  fields: ['title', 'url', 'description']
})

module.exports = mongoose.model('Website', WebsiteSchema);