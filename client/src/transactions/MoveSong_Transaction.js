import jsTPS_Transaction from "../common/jsTPS.js";
/**
 * MoveSong_Transaction
 *
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 *
 * @author McKilla Gorilla
 * @author ?
 */
export default class MoveSong_Transaction extends jsTPS_Transaction {
  constructor(initStore, initOldSongIndex, initNewSongIndex, initList) {
    super();
    this.store = initStore;
    this.oldSongIndex = initOldSongIndex;
    this.newSongIndex = initNewSongIndex;
    this.list = initList;
  }

  doTransaction() {
    this.store.moveSong(this.oldSongIndex, this.newSongIndex, this.list);
  }

  undoTransaction() {
    this.store.moveSong(this.newSongIndex, this.oldSongIndex, this.list);
  }
}
