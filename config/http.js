/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.http.html
 */
var passport = require('passport');
var FacebookStrategy= require('passport-facebook').Strategy

var verifyHandler = function(token, tokenSecret, profile, done) {
  
  
  process.nextTick(function() {
    User.findOne({uid: profile.id}, function(err, user) {
      
      
      
      
      
    if (user) {
      user.token = token;
      return done(null, user);
    } else {
      var data = {
      provider: profile.provider,
      uid: profile.id,
      name: profile.displayName,
      token : token
      };

      if (profile.emails && profile.emails[0] && profile.emails[0].value) {
      data.email = profile.emails[0].value;
      }
      if (profile.name && profile.name.givenName) {
      data.firstname = profile.name.givenName;
      }
      if (profile.name && profile.name.familyName) {
      data.lastname = profile.name.familyName;
      }
      User.create(data, function(err, user) {
      return done(err, user);
      });
    }
    });
  });
};

passport.serializeUser(function(user, done) {
done(null, user.uid);
});
passport.deserializeUser(function(uid, done) {
User.findOne({uid: uid}, function(err, user) {
done(err, user);
});
});



module.exports.http = {


customMiddleware: function(app) {

 passport.use(new FacebookStrategy({
clientID: "440747949407894",
clientSecret: "6272fdf6b690afaeb414274ce28f5418",
callbackURL: "http://localhost:1337/auth/facebook/callback"
}, verifyHandler));
 
 
app.use(passport.initialize());
app.use(passport.session());
}

  /****************************************************************************
  *                                                                           *
  * Express middleware to use for every Sails request. To add custom          *
  * middleware to the mix, add a function to the middleware config object and *
  * add its key to the "order" array. The $custom key is reserved for         *
  * backwards-compatibility with Sails v0.9.x apps that use the               *
  * `customMiddleware` config option.                                         *
  *                                                                           *
  ****************************************************************************/

  // middleware: {

  /***************************************************************************
  *                                                                          *
  * The order in which middleware should be run for HTTP request. (the Sails *
  * router is invoked by the "router" middleware below.)                     *
  *                                                                          *
  ***************************************************************************/

    // order: [
    //   'startRequestTimer',
    //   'cookieParser',
    //   'session',
    //   'myRequestLogger',
    //   'bodyParser',
    //   'handleBodyParserError',
    //   'compress',
    //   'methodOverride',
    //   'poweredBy',
    //   '$custom',
    //   'router',
    //   'www',
    //   'favicon',
    //   '404',
    //   '500'
    // ],

  /****************************************************************************
  *                                                                           *
  * Example custom middleware; logs each request to the console.              *
  *                                                                           *
  ****************************************************************************/

    // myRequestLogger: function (req, res, next) {
    //     console.log("Requested :: ", req.method, req.url);
    //     return next();
    // }


  /***************************************************************************
  *                                                                          *
  * The body parser that will handle incoming multipart HTTP requests. By    *
  * default as of v0.10, Sails uses                                          *
  * [skipper](http://github.com/balderdashy/skipper). See                    *
  * http://www.senchalabs.org/connect/multipart.html for other options.      *
  *                                                                          *
  ***************************************************************************/

    // bodyParser: require('skipper')

  // },

  /***************************************************************************
  *                                                                          *
  * The number of seconds to cache flat files on disk being served by        *
  * Express static middleware (by default, these files are in `.tmp/public`) *
  *                                                                          *
  * The HTTP static cache is only active in a 'production' environment,      *
  * since that's the only time Express will cache flat-files.                *
  *                                                                          *
  ***************************************************************************/

  // cache: 31557600000
};
