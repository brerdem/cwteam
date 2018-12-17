export default class AuthService {
    // Initializing important variables
    constructor() {
        this.fetch = this.fetch.bind(this); // React binding stuff
        this.login = this.login.bind(this);

    }








    getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    };






}
