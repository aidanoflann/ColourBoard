class PlayerList
{
    constructor(players)
    {
        this.players=players;  //obj - maps player colour to its object
        this.totalPlayers = 0;  //int
        this.totalLogins = 0;
    }

    AddPlayer(player)
    {
        this.players[player.colour] = player;
        this.totalPlayers ++;
    }

    HasPlayer(colour)
    {
        return colour in this.players;
    }

    GetPlayer(colour)
    {
        return this.players[colour];
    }

    CurrentlyLoggedInPlayer()
    {
        let playerColour = null;
        Object.values(this.players).forEach((player) => {
            if (player.logins[player.logins.length - 1].logout === null)
            {
                playerColour = player.colour;
            }
        });
        return this.players[playerColour];
    }
}


class Player
{
    constructor(username, colour)
    {
        this.username = username;  //string
        this.colour = colour;  //string (hash)

        this.currentlyLoggedIn = false;  //bool
        this.logins = [];  //array<Login>
        this._score = 0;
    }

    AddLogin(loginString) {
        let login = new Date(loginString);
        // add the logout to the previous login (if it exists)
        this.logins.push(new Login(login, null));
    }

    AddLogout(logoutString) {
        let logout = new Date(logoutString);
        if (this.logins[this.logins.length - 1].logout) {
            throw "Cannot add logout - value already present in most recent Login."
        }
        let lastLogin = this.logins[this.logins.length - 1];
        lastLogin.logout = logout;
        this._score += lastLogin.duration();
    }

}
class Login
{
    constructor(login, logout)
    {
        this.login = login;  // Datetime
        this.logout = logout; // Datetime
    }

    duration() {
        return this.logout - this.login;
    }
}

module.exports = {PlayerList, Player, Login};