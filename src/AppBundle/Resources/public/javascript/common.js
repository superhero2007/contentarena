// require jQuery normally
const $ = require('jquery');

// create global $ and jQuery variables
global.$ = global.jQuery = $;

require('../scss/layout.scss');
require('../scss/navbar.scss');
require('../scss/ca.scss');
require('../scss/right.table.scss');
require('../scss/package.selector.scss');
require('../scss/buttons.scss');