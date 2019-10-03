"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Team;
(function (Team) {
    Team[Team["Blue"] = 0] = "Blue";
    Team[Team["Red"] = 1] = "Red";
})(Team = exports.Team || (exports.Team = {}));
var State;
(function (State) {
    State[State["Waiting"] = 0] = "Waiting";
    State[State["Playing"] = 1] = "Playing";
    State[State["Ended"] = 2] = "Ended";
})(State = exports.State || (exports.State = {}));
