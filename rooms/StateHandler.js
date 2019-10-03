"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("@colyseus/schema");
const Player_1 = require("../entities/Player");
const DominationPoint_1 = require("../entities/DominationPoint");
const GameState_1 = require("../entities/GameState");
class StateHandler extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.players = new schema_1.MapSchema();
        this.domination = new DominationPoint_1.DominationPoint();
        this.state = new GameState_1.GameState();
        this.reset = false;
    }
}
__decorate([
    schema_1.type({ map: Player_1.Player })
], StateHandler.prototype, "players", void 0);
__decorate([
    schema_1.type(DominationPoint_1.DominationPoint)
], StateHandler.prototype, "domination", void 0);
__decorate([
    schema_1.type(GameState_1.GameState)
], StateHandler.prototype, "state", void 0);
__decorate([
    schema_1.type("boolean")
], StateHandler.prototype, "reset", void 0);
exports.StateHandler = StateHandler;
