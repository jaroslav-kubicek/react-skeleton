React = require('react');

App = React.createClass({
  render: function() {
    return (
      <div>Hello world!</div>
    );
  }
});

var options = {};
var app = React.createElement(App, options);
React.render(app, document.getElementById('app'));
