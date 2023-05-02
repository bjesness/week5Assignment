//week 5 Assignment, 5.1.2023


/****** creating a menu app, following along with week 5's video 
- creating a menu app for creating, viewing and deleting teams and players.  This is done following along with the video located here

https://learn.promineotech.com/mod/book/view.php?id=11765&chapterid=681

original attempt was at creating a different menu for games and players, it got messy and I had difficulty, so I went to just follow along the video.
I did clean up the description text slightly, something I thought was just easier for me or the user to read.

Assignment Requirements --------
- use at least one array
- use at least two class
- menu should have options to create, view and delete elements

*****/

//defining Player class
class Player {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }

    describe() {
        return `${this.name} plays ${this.position}.`
    }
}

//creating a Team class      
class Team {
    constructor(name) {
        this.name = name;
        this.players = [];
    }

    addPlayer(player) {
        if (player instanceof Player) {
            this.players.push(player);
        } else {
            throw new Error(`You can only add an instance of a Player.  ${player} is incorrect.`)
        }
    }
    describe() {
        return `${this.name} has ${this.players.length} player.`;
    }
}

//creating menu, following along with video
class Menu {
    constructor() {//no arguments
        this.teams = [];//empty array
        this.selectedTeam = null;//no team selected yet.
    }

    start() {
        let selection = this.showMainMenuOptions();//this method does not exist yet, top down development approach
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createTeam();//1 - create a new team
                    break;
                case '2':
                    this.viewTeam();//2 - view teams
                    break;
                case '3':
                    this.deleteTeam();//3 - delete a team
                    break;
                case '4':
                    this.displayTeams();//4 - display all team
                    break;
                default:
                    selection = 0; //exit
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye');//zero was selected, loop not entered
    }

    showMainMenuOptions() {
        return prompt(`
        - Enter # of Your Selection -
            0 - exit
            1 - create new Team
            2 - view a Team
            3 - delete a Team
            4 - display all Teams
        --------------------------------------
        
        `);
    }

    showTeamMenuOptions(teamInfo) {
        return prompt(`
         0 - back
         1 - create a player
         2 - delete a player
         --------------------------------------
         ${teamInfo}
         `)
    }


    //***** all team related methods, display, create, view and delete a team *******/

    displayTeams() {
        let teamString = '';
        for (let i = 0; i < this.teams.length; i++) {
            teamString += "Team " + i + ' - ' + this.teams[i].name + '\n'; //display all teams
        }
        alert(teamString);//line 78 in video
    }

    createTeam() {
        let name = prompt(`Enter name for new Team:`);
        this.teams.push(new Team(name));
    }

    viewTeam() {  //shows team and players with position
        let index = prompt(`Enter the Team # you would like to choose`);
        if (index > -1 && index < this.teams.length) { //confirming user input, making sure they choose a correct Team #
            this.selectedTeam = this.teams[index];
            let description =
                '**** Team: ' + this.selectedTeam.name + ' ****\n';

            for (let i = 0; i < this.selectedTeam.players.length; i++) {
                description += "Player " + i + ' - ' + this.selectedTeam.players[i].name + ' (' + this.selectedTeam.players[i].position + ')\n';
            }

            let selection = this.showTeamMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createPlayer();
                    break;
                case '2':
                    this.deletePlayer();
            }
        }
    }

    deleteTeam() {
        let index = prompt(`Enter the team # of the team you would like to delete.`);
        if (index > -1 && index < this.teams.length) {
            this.teams.splice(index, 1);//start at index, delete just one
        }
    }

    /*** methods for creating a player and deleting a player*****/

    createPlayer() {
        let name = prompt(`Enter name for new player:`);
        let position = prompt(`Enter position for new player`);
        this.selectedTeam.players.push(new Player(name, position));
    }

    deletePlayer() {
        let index = prompt(`Enter the player # you wish to delete`);
        if (index > -1 && index < this.selectedTeam.players.length) {
            this.selectedTeam.players.splice(index, 1);//start at index, remove just one element
        }
    }
}


//create instance of menu
let menu = new Menu();
menu.start();