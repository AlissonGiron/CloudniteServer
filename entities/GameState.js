"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("./Enums");
const schema_1 = require("@colyseus/schema");
class GameState extends schema_1.Schema {
    constructor() {
        super();
        this.StartGame = () => {
            this.currentState = Enums_1.State.Playing;
            this.SecondsToNextState = 60;
        };
        this.EndGame = () => {
            this.currentState = Enums_1.State.Ended;
        };
        this.ShowMessage = (message, priority, time) => {
            this.message = message;
            this.priority = priority;
            this.time = time;
        };
        this.Tick = () => {
            if (new Date().getTime() - this.lastTick < 1000) {
                return;
            }
            this.lastTick = new Date().getTime();
            if (this.SecondsToNextState == 0) {
                switch (this.currentState) {
                    case Enums_1.State.Waiting:
                        this.StartGame();
                        break;
                    case Enums_1.State.Playing:
                        this.EndGame();
                        break;
                }
            }
            else {
                this.SecondsToNextState--;
            }
            this.UpdateMessage();
        };
        this.UpdateMessage = () => {
            var LMessage = "";
            var LPriority = 1;
            if (this.SecondsToNextState < 10) {
                LPriority = 0;
                LMessage = this.SecondsToNextState.toString();
            }
            else {
                switch (this.currentState) {
                    case Enums_1.State.Waiting:
                        LMessage = "Waiting Players";
                        break;
                    case Enums_1.State.Ended:
                        LMessage = "Game Ended";
                        break;
                    case Enums_1.State.Playing:
                        LMessage = "Playing";
                        break;
                }
                LMessage += " " + this.SecondsToNextState.toString() + "s";
            }
            this.priority = LPriority;
            this.message = LMessage;
        };
        this.currentState = Enums_1.State.Waiting;
        this.SecondsToNextState = 30;
        this.lastTick = new Date().getTime();
        this.time = 500;
    }
}
__decorate([
    schema_1.type("number")
], GameState.prototype, "priority", void 0);
__decorate([
    schema_1.type("number")
], GameState.prototype, "time", void 0);
__decorate([
    schema_1.type("string")
], GameState.prototype, "message", void 0);
exports.GameState = GameState;
