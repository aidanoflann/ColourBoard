class PlayerList
{
    constructor(players)
    {
        this.players=players;  //obj
        this.totalPlayers = 0;  //int
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
}


class Player
{
    constructor(username, colour)
    {
        this.username = username;  //string
        this.colour = colour;  //string (hash)

        this.currentlyLoggedIn = false;  //bool
        this.logins = [];  //array<Login>
    }

    AddLogin(login) {
        this.logins.push(new Login(login, null));
    }

    AddLogout(logout) {
        if (this.logins[this.logins.length - 1].logout) {
            throw "Cannot add logout - value already present in most recent Login."
        }
        this.logins[this.logins.length - 1].logout = logout;
    }

}
class Login
{
    constructor(login, logout)
    {
        this.login = login;  // Datetime
        this.logout = logout; // Datetime
    }
}

module.exports = {PlayerList, Player, Login};