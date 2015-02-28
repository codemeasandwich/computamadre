/**
 * HomeController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  index: function(req, res) {
      
    console.log(req.user);
    
    var http = require('https');
    var options = {
        host : "graph.facebook.com",
      //  port : 443,
        path : "/"+req.user.uid+"/likes?access_token="+req.user.token,
        method : 'GET'
    };
    
    callback = function(response) {
      var str = '';
      
      //another chunk of data has been recieved, so append it to `str`
      response.on('data', function (chunk) {
        str += chunk;
      });
      
      //the whole response has been recieved, so we just print it out here
      response.on('end', function () {
        var likesinjsonFormat = JSON.parse(str);
        console.log(likesinjsonFormat);
  // loop over likes
  
  for(var index in likesinjsonFormat.date){
    console.log(likesinjsonFormat.date[index].name);
  }
  
        // loop over events to 
  
      res.view('homepage',{
         user: req.user,
         
         likes:str
         
       });      
  
      });
    }
    
    http.request(options, callback).end();
    
    
 
  }
};


