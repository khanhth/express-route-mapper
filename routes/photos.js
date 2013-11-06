module.exports = {
  index: {
    callback: function(req, res) {
      res.send("List photos!");
    }
  },

  new: {
    callback: function(req, res) {
      res.send("New photos!");
    }
  },

  show: {
    param: ':photo_id', // Register any parameter name you want
    callback: function(req, res, next) {
      if(req.params.photo_id != 'new') {
        return   res.send(req.params.photo_id);
      } else {
        next();
      }
    }
  }
}