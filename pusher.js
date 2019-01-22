const Pusher = require('pusher');

const pusher = new Pusher({
    appId      : '689385',
    key        : '8042ee8184c51b5ff049',
    secret     : '9ee8d1d20c3ceb337d83',
    cluster    : 'eu',
    useTLS  : true,
});

module.exports = pusher;
