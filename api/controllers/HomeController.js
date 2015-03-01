/**
 * HomeController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var eventos = require('../../eventos.json');
var hashMap = [];

for(var index in eventos.resources){
    var event = eventos.resources[index];
    hashMap[event["dc:title"].toLowerCase().trim()] = event;
}

var getWordList=function (text){
    var result = [];
        result.push(text);
    
    //console.log(" *****",text);
    var temp = text.split(" ");
    //console.log("22", temp);
    if( 1 < temp.length ){
        //console.log("24", result);
        result = result.concat(temp)
        //console.log("26", result);
    }
    
    temp = text.split("/");
    //console.log("27", temp);
    if( 1 < temp.length ){
        result = result.concat(temp)
    }
    //console.log("30", result);
    return result;       
}


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
      var data = '';
      response.on('data', function (chunk) 
        {    data += chunk;});
        
      response.on('end', function () {
        var tageArray = JSON.parse(data).data;
            
        console.log("userTages: ", tageArray);
       // console.log("eventos: ", eventos);
                

        var count = 0;
        var foundArray = new Array();
        for(var eventName in hashMap){
            var event = hashMap[eventName];
            console.log("66",event);
            var description = event["dc:description"].toLowerCase();
            //console.log("68",description);
            for(var key in tageArray){
                var aThing = tageArray[key];
                // search category
                var tagsFound = [];
                var weFOUNDsomething = false;
                var wordlist = []
                wordlist=wordlist.concat(getWordList(aThing.name));
                wordlist=wordlist.concat(getWordList(aThing.category));
                //console.log("77",wordlist);
                if( !! aThing.category_list){
                    for(var count in aThing.category_list){
                       wordlist = wordlist.concat(getWordList(aThing.category_list[count].name));
                    }
                }
             
                
                // =======================================================
                
                
                for(var pointer in wordlist){
                    var word = wordlist[pointer];
                   // console.log(" checking for "+word);
                    if(description.search(word) >= 0 ){
                     //   console.log(" FOUND "+word);
                        tagsFound.push(word);
                        weFOUNDsomething = true;
                    }
                }
                
         
                if(weFOUNDsomething){
                   // console.log("FOUND")
                    if(eventName in foundArray){
                 //       console.log("existes",foundArray[eventName])
                        foundArray[eventName].interests = foundArray[eventName].interests.concat(tagsFound)
                    } else{
               //         console.log("new",foundArray[eventName])
                        foundArray[eventName] = event;
                        foundArray[eventName].interests = tagsFound;
                    }
                }
            }
            count++;
        }
          
          for(var index in foundArray){
              console.log(" 119 we found",foundArray[index]["dc:title"])
          }
          
      console.log("122", foundArray.toString());
      console.log("123", JSON.stringify(foundArray));
      
      res.view('homepage',{
         totleEvetns:count,
          user: req.user,
         events:foundArray    
       });      
  
      });
    }
    
    http.request(options, callback).end();
    
  }
};
