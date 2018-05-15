class PlayerList
{
    constructor(players)
    {
        this.players=players;  //obj
        this.totalLogins = 0;  //int
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

    AddLogin(player_colour, login, logout)
    {
        this.player[player_colour].AddLogin(login, logout);
        this.totalLogins ++;
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

    AddLogin(login, logout) {
        this.logins.push(new Login(login, logout));
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