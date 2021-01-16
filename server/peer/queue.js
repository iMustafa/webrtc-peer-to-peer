module.exports = class Queue {
  list = [];

  enqueue(user) {
    this.list.push(user);
    console.log(`>> User ID# ${user.customId} was added to the queue || Queue Length: ${this.list.length}`);
  }

  dequeue() {
    const user = this.list.shift();
    console.log(`>> User ID# ${user.customId} was in turn to queue || Queue Length: ${this.list.length}`);
    return user
  }

  removeUser(user) {
    this.list = this.list.filter((u) => u != user.customId);
    console.log(`>> User ID# ${user.customId} was removed to the queue || Queue Length: ${this.list.length}`);
  }

  validateQueue(sockets) {
    this.list = this.list.filter((s) =>
      Object.keys(sockets).includes(s.customId)
    );
  }
};
