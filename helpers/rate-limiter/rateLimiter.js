class Queue {
  constructor() {
    this.data = {};
    this.length = 0;
  }
  enqueue(x) {
    this.data[this.length] = x;
    this.length++;
    return `inserted item: ${x}`;
  }
  deque() {
    if (this.length === 0) throw new Error('Queue is empty');
    const item = this.data[0];
    delete this.data[0];
    this.length--;
    for (let i = 0; i < this.length; i++) {
      this.data[i] = this.data[i + 1];
    }
    delete this.data[this.length];
    return `deleted item is ${item}`;
  }
  peek() {
    return `first item is ${this.data[0]}`;
  }
  printQueue() {
    return Object.values(this.data);
  }
}

class RateLimiter {
  constructor() {
    this.users = {};
    this.limit = 5;
    this.window = 5000; // 1 min = 60 sec = 60,000 milli seconds
  }

  isAllowed(userId) {
    if (!this.users[userId]) {
      this.users[userId] = new Queue();
    }
    const currTime = Date.now();
    const userQueue = this.users[userId];
    // console.log(this.users);
    if (userQueue.length === 0) {
      userQueue.enqueue(currTime);
      return true;
    }
    while (userQueue.length > 0 && currTime - userQueue.data[0] > this.window) {
      userQueue.deque();
    }
    if (userQueue.length < this.limit) {
      userQueue.enqueue(currTime);
      return true;
    } else return false;
  }

  printState() {
    const state = {};
    for (const userId in this.users) {
      state[userId] = this.users[userId].printQueue();
    }
    return state;
  }

  printUserData(userId) {
    return this.users[userId].printQueue();
  }
}

const rl = new RateLimiter();
console.log(rl.isAllowed(1)); // 1
console.log(rl.isAllowed(1)); // 2
console.log(rl.isAllowed(1)); // 3
console.log(rl.isAllowed(1)); // 4
console.log(rl.isAllowed(1)); // 5 -> till here true
console.log('---------');
console.log(rl.isAllowed(1)); // false
console.log(rl.isAllowed(1)); // false
console.log(rl.isAllowed(1)); // false
console.log(rl.printUserData(1));

console.log('---------');
setTimeout(() => {
  console.log(rl.isAllowed(1));
  console.log(rl.printUserData(1));
}, 8000); // true

export { Queue, RateLimiter };
