export class Cart {
  #keyStorage = 'test-task-cart';

  constructor() {
    const data = JSON.parse(localStorage.getItem(this.#keyStorage));
    if(!Array.isArray(data)) {this.#write([])}
  }

  #read() {
    return JSON.parse(localStorage.getItem(this.#keyStorage));
  }

  #write(data) {
    localStorage.setItem(this.#keyStorage, JSON.stringify(data));
  }

  getCount() {
    const data = this.#read();
    return data.length;
  }

  gets() {
    const data = this.#read();
    const ids = data.map((entry) => {return entry.id});
    return {count: data.length, data: data, ids: ids};
  }

  getCountWithIds() {
    const data = this.#read();
    const ids = data.map((entry) => {return entry.id});
    return {count: data.length, ids: ids}
  }

  add(id, quantity = 1) {
    const data = this.#read();
    // check dublicate
    let add = false;
    data.forEach((entry) => {
      if(entry.id == id) {
        entry.count += quantity;
        add = true;
      }
    });

    if(!add) data.push({id: id, count: quantity});

    this.#write(data);
  }

  setCount(id, quantity) {
    const data = this.#read();

    data.forEach((entry) => {
      if(entry.id == id) {
        entry.count = quantity;
      }
    });

    this.#write(data);
  }

  setCountIncrement(id) {
    const data = this.#read();

    data.forEach((entry) => {
      if(entry.id == id) {
        entry.count = entry.count < 2?1:entry.count - 1;
      }
    });

    this.#write(data);
  }

  addMore(arr) {
    const data = this.#read();

    // patch current data
    const addedIds = [];
    data.forEach((entry) => {
      const index = arr.findIndex((entry1) => {return entry.id == entry1.id});
      if(index > -1) {// patch
        entry.count += arr[index].count;
        addedIds.push(arr[index].id);
      }
    });

    arr.forEach((entry) => {
      if(!addedIds.includes(entry.id)) {
        data.push({id: entry.id, count: entry.count});
      }
    });

    this.#write(data);
  }

  remove(id) {
    const data = this.#read();

    const newData = data.filter((entry) => {
      return !(entry.id == id);
    });

    this.#write(newData);
  }

  removeAll(ids) {
    const data = this.#read();

    const newData = data.filter((entry) => {
      return !(ids.includes(entry.id));
    });

    this.#write(newData);
  }

  erase() {
    this.#write([]);
  }
}
