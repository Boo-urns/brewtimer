app.service('storage', function() {

  this.setItem    = function(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  };

  this.getItem    = function(key) {
    return JSON.parse(localStorage.getItem(key));
  };

  this.clear      = function() {
    localStorage.clear();
  };

  this.removeItem = function(key) {
    localStorage.removeItem(key);
  }
});