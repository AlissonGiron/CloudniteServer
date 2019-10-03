"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("@colyseus/schema");
class DominationPoint extends schema_1.Schema {
    constructor() {
        super();
        this.dominate = (team) => {
            if (new Date().getTime() - this.lastUpdate < 500) {
                return;
            }
            this.lastUpdate = new Date().getTime();
            if (this.percentage == 0) {
                this.team = team;
            }
            if (this.team == team) {
                if (this.percentage < 100) {
                    this.percentage += 5;
                }
            }
            else {
                this.percentage -= 5;
            }
        };
        this.percentage = 0;
        this.team = -1;
        this.lastUpdate = new Date().getTime() - 10000;
    }
}
__decorate([
    schema_1.type("number")
], DominationPoint.prototype, "percentage", void 0);
__decorate([
    schema_1.type("number")
], DominationPoint.prototype, "team", void 0);
exports.DominationPoint = DominationPoint;
