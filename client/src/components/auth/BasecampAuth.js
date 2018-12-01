export default class BasecampAuth {

    //todo make explicit grant - remove tokens from URL

    static credentials = {

        client_id: '5fccfc8fcf0fa68e8ceab31a5ed7422beb4e1f2b',
        client_secret: 'ffa278b2c0a9d6b8430b33758899a1f679f9eb04',
        tokenHost: 'https://launchpad.37signals.com/',
        authorizeURI: 'https://launchpad.37signals.com/authorization/new?type=user_agent',
        tokenURI: 'https://launchpad.37signals.com/authorization/token?type=user_agent',
        redirect_uri: 'https://cwteam.ngrok.io/callback',


    };
}
