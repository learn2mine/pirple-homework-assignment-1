// Dependencies
var http = require('http');
var url = require('url');

//Configure the server to respond to all requests with a string
var server = http.createServer(function(req,res){
  // Get the route
  var requestUrl = url.parse(req.url, true);
  var path = requestUrl.path;
  var route = path.replace(/^\/+|\/+$/g, '');

  // Chose and run the handler
  var chosenHandler = typeof(router[route]) != 'undefined' ? router[route] : handlers.notFound;
  chosenHandler(function(status, payload){
    var payloadString = JSON.stringify(payload);
    res.setHeader('Content-Type','application/json');
    res.writeHead(status);
    res.end(payloadString);
  });
});

// Start the server
server.listen(6666, function(){
  console.log("Started server on port 6666!");
});

// Define handlers
var handlers = {}
handlers.hello = function(callback){
  callback(406,{'Message' : 'Hello World!'});
  console.log('Sent Hello World');
};

handlers.notFound = function(callback){
  callback(404);
console.log('Sent 404');
};

// Define the router
var router = {'hello' : handlers.hello};
