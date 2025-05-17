"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniStore = void 0;
class MiniStore {
    constructor() {
        this.state = 0;
        this.listeners = [];
    }
    getState() {
        return this.state;
    }
    dispatch(action) {
        let newState = this.state;
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
            this.listeners.forEach((listener) => listener());
        }
    }
    subscribe(listener) {
        this.listeners.push(listener);
        // Return an unsubscribe function
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }
}
exports.MiniStore = MiniStore;
