import jsTPS_Transaction from "../common/jsTPS.js";

/**
 * UpdateSong_Transaction
 *
 * This class represents a transaction that updates a song
 * in the playlist. It will be managed by the transaction stack.
 *
 * @author McKilla Gorilla
 * @author ?
 */
export default class UpdateSong_Transaction extends jsTPS_Transaction {
  constructor(
    initStore,
    initIndex,
    initOldSongData,
    initNewSongData,
    initList
  ) {
    super();
    this.store = initStore;
    this.index = initIndex;
    this.oldSongData = initOldSongData;
    this.newSongData = initNewSongData;
    this.list = initList;
  }

  doTransaction() {
    this.store.updateSong(this.index, this.newSongData, this.list);
  }

  undoTransaction() {
    this.store.updateSong(this.index, this.oldSongData, this.list);
  }
}
