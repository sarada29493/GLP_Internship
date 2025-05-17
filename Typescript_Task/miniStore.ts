
export type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET'; payload: number };

type Listener = () => void;

export class MiniStore {
  private state: number = 0;
  private listeners: Listener[] = [];

  getState(): number {
    return this.state;
  }

  dispatch(action: Action): void {
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

  subscribe(listener: Listener): () => void {
    this.listeners.push(listener);
    // Return an unsubscribe function
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}
