(function() {

App = Ember.Application.create();


/* Order and include as you please. */


})();

(function() {

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

})();

(function() {

App.Router.map(function() {
  // put your routes here
});

})();