"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniStore = void 0;
var MiniStore = /** @class */ (function () {
    function MiniStore() {
        this.state = 0;
        this.listeners = [];
    }
    MiniStore.prototype.getState = function () {
        return this.state;
    };
    MiniStore.prototype.dispatch = function (action) {
        var newState = this.state;
        switch (action.type) {
            case 'INCREMENT':
                newState = this.state + 1;
                break;
            case 'DECREMENT':
                newState = this.state - 1;
                break;
            case 'SET':
                if (typeof action.payload === 'number') {
                    newState = action.payload;
                }
                break;
            default:
                // Unknown action type; ignore
                return;
        }
        if (newState !== this.state) {
            this.state = newState;
            this.listeners.forEach(function (listener) { return listener(); });
        }
    };
    MiniStore.prototype.subscribe = function (listener) {
        var _this = this;
        this.listeners.push(listener);
        // Return an unsubscribe function
        return function () {
            _this.listeners = _this.listeners.filter(function (l) { return l !== listener; });
        };
    };
    return MiniStore;
}());
exports.MiniStore = MiniStore;
