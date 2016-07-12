'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

_mongoose2.default.connect(_config.dbConfig.db);
_mongoose2.default.set('debug', true);

app.use((0, _compression2.default)());
app.use((0, _morgan2.default)('combined'));
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json({ type: '*/*' }));
(0, _router2.default)(app);

var port = process.env.PORT || 3333;
var server = _http2.default.createServer(app);
server.listen(port);
console.log('server listening on:', port);