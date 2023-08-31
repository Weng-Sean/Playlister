import jsTPS_Transaction from "../common/jsTPS.js";

/**
 * DeleteSong_Transaction
 *
 * This class represents a transaction that deletes a song
 * in the playlist. It will be managed by the transaction stack.
 *
 * @author McKilla Gorilla
 * @author ?
 */
export default class RemoveSong_Transaction extends jsTPS_Transaction {
  constructor(initStore, initIndex, initSong, initList) {
    super();
    this.store = initStore;
    this.index = initIndex;
    this.song = initSong;
    this.list = initList;
  }

  doTransaction() {
    this.store.removeSong(this.index, this.list);
  }

  undoTransaction() {
    this.store.createSong(this.index, this.song, this.list);
  }
}
