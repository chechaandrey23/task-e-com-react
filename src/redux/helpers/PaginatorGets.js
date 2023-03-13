export class PaginatorGets {

  #countRows = 0;
	#currentPage = 1;
	#lastAddCountRow = 0;

	#hasMore = false;

  constructor(defaultCountRows) {
    this.#countRows = defaultCountRows * 1;
  }

  add(state, stateName, data) {
    if(!Array.isArray(data)) throw new Error('Third argument must be Array');
    this.#currentPage = 1;
		state[stateName] = [...data];
    if(this.#countRows <= data.length) {
      this.#currentPage += Math.floor(data.length / this.#countRows);
    }
    this.#lastAddCountRow = data.length % this.#countRows;
    this.#hasMore = data.length>0?true:false;
  }

  addWithReplace(state, stateName, data, fn) {
    if(!Array.isArray(data)) throw new Error('Third argument must be Array');
    if(this.#lastAddCountRow === 0) {
			state[stateName] = [...state[stateName], ...data];
		} else {
			state[stateName] = [...[...state[stateName]].filter((entry) => {
				if(data.findIndex((el) => {return fn.call(null, el, entry)}) > -1) {
					return false;
				} else {
					return true;
				}
			}), ...data];
		}
    if(this.#countRows <= data.length) {
      this.#currentPage += Math.floor(data.length / this.#countRows);
    }
    this.#lastAddCountRow = data.length % this.#countRows;
    this.#hasMore = data.length>0?true:false;
  }

  getPageForQuery() {
		return this.#currentPage;
	}

	getDefaultCountRows() {
		return this.#countRows;
	}

	hasMore() {
		return this.#hasMore;
	}
}
