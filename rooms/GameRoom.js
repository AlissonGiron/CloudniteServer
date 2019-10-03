"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colyseus_1 = require("colyseus");
const StateHandler_1 = require("./StateHandler");
const Player_1 = require("../entities/Player");
const DominationPoint_1 = require("../entities/DominationPoint");
const Enums_1 = require("../entities/Enums");
const GameState_1 = require("../entities/GameState");
class GameRoom extends colyseus_1.Room {
    constructor() {
        super(...arguments);
        this.maxClients = 4;
    }
    onCreate(options) {
        this.setSimulationInterval(() => this.onUpdate());
        this.setState(new StateHandler_1.StateHandler());
    }
    onJoin(client) {
        const player = new Player_1.Player(client.sessionId);
        var bluePlayers = 0;
        var redPlayers = 0;
        for (var key in this.state.players) {
            if (this.state.players[key].team == 0) {
                bluePlayers++;
            }
            else {
                redPlayers++;
            }
        }
        player.team = bluePlayers <= redPlayers ? 0 : 1;
        this.state.players[player.name] = player;
    }
    ResetGame() {
        this.state.domination = new DominationPoint_1.DominationPoint();
        this.state.state = new GameState_1.GameState();
        for (var key in this.state.players) {
            this.state.players[key].life = 10;
        }
    }
    onMessage(client, message) {
        if (this.state.state.currentState == Enums_1.State.Ended) {
            if (this.state.domination.percentage == 0) {
                this.state.state.ShowMessage("DRAW!!", 1, -1);
                this.broadcast(" ");
                setTimeout(() => {
                    this.ResetGame();
                    this.state.reset = true;
                    this.broadcast(" ");
                    this.state.reset = true;
                }, 5000);
                return;
            }
            var LMessage = "TEAM ";
            if (this.state.domination.team == 0) {
                LMessage += "BLUE";
            }
            else {
                LMessage += "RED";
            }
            LMessage += " WINS!!";
            this.state.state.ShowMessage(LMessage, 1, -1);
            this.broadcast(" ");
            setTimeout(() => {
                this.ResetGame();
                this.state.reset = true;
                this.broadcast(" ");
                this.state.reset = true;
            }, 5000);
            return;
        }
        const [event, data] = message;
        const player = this.state.players[data.name];
        if (!player) {
            return;
        }
        if (event === "position") {
            player.position.x = data.x;
            player.position.y = data.y;
            player.position.z = data.z;
            if (this.state.state.currentState == Enums_1.State.Playing) {
                if (player.position.x >= -14 && player.position.x <= 14 && player.position.z >= -14 && player.position.z <= 14) {
                    this.state.domination.dominate(player.team);
                }
            }
        }
        if (event === "attack") {
            player.executeAttack = data.attack;
            if (player.executeAttack) {
                var x = player.position.x;
                var z = player.position.z;
                for (var key in this.state.players) {
                    if (key != player.name) {
                        if (this.state.players[key].position.x >= (x - 5) && this.state.players[key].position.x <= (x + 5)) {
                            if (this.state.players[key].position.z >= (z - 5) && this.state.players[key].position.z <= (z + 5)) {
                                this.state.players[key].TakeDamage();
                            }
                        }
                    }
                }
            }
        }
        this.state.state.Tick();
        this.broadcast(" ");
    }
    onUpdate() {
    }
    onLeave(client) {
        delete this.state.players[client.sessionId];
    }
    onDispose() {
    }
}
exports.GameRoom = GameRoom;
