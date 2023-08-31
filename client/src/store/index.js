import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import jsTPS from "../common/jsTPS";
import api from "./store-request-api";
import CreateSong_Transaction from "../transactions/CreateSong_Transaction";
import MoveSong_Transaction from "../transactions/MoveSong_Transaction";
import RemoveSong_Transaction from "../transactions/RemoveSong_Transaction";
import UpdateSong_Transaction from "../transactions/UpdateSong_Transaction";
import AuthContext from "../auth";
import {
  listLike,
  currentYouTubeSongIndex,
  sortOption,
  lastSearchTerm,
} from "./constants";
/*:""}
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
  CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
  CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
  CREATE_NEW_LIST: "CREATE_NEW_LIST",
  LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
  MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
  SET_CURRENT_LIST: "SET_CURRENT_LIST",
  SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
  EDIT_SONG: "EDIT_SONG",
  REMOVE_SONG: "REMOVE_SONG",
  HIDE_MODALS: "HIDE_MODALS",
  SET_ERROR_MSG: "SET_ERROR_MSG",
  CHANGE_YOUTUBE_VIEW: "CHANGE_YOUTUBE_VIEW",
  UPDATE_PLAYLIST_OBJ: "UPDATE_PLAYLIST_OBJ",
  UPDATE: "UPDATE",
  UPDATE_YOUTUBE_LIST: "UPDATE_YOUTUBE_LIST",
  CHANGE_HOME_SCREEN_BUTTON_ACTIVE: "CHANGE_HOME_SCREEN_BUTTON_ACTIVE",
};

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
let tpsObj = {};
console.log("creating tps");
let getTps = function (id) {
  if (!tpsObj[id]) {
    tpsObj[id] = new jsTPS();
  }
  return tpsObj[id];
};

const CurrentModal = {
  NONE: "NONE",
  DELETE_LIST: "DELETE_LIST",
  EDIT_SONG: "EDIT_SONG",
  REMOVE_SONG: "REMOVE_SONG",
};

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
  const { auth } = useContext(AuthContext);

  // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
  const [store, setStore] = useState({
    currentModal: CurrentModal.NONE,
    idNamePairs: [],
    currentList: null,
    currentSongIndex: -1,
    currentSong: {},
    newListCounter: 0,
    listNameActive: false,
    listIdMarkedForDeletion: null,
    listMarkedForDeletion: null,
    errorMessage: null,
    currentYouTubeVideoView: true,
    playlistObj: {},
    youTubeList: null,
    youTubeSong: null,
    homeScreenButtonActive: 1,
    searchedListPairs: [],
  });
  const history = useHistory();

  console.log("inside useGlobalStore");

  // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE

  console.log("auth: " + auth);

  // HERE'S THE DATA STORE'S REDUCER, IT MUST
  // HANDLE EVERY TYPE OF STATE CHANGE
  const storeReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      // LIST UPDATE OF ITS NAME
      case GlobalStoreActionType.CHANGE_LIST_NAME: {
        return setStore({
          currentModal: store.currentModal,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSongIndex: -1,
          currentSong: {},
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          errorMessage: store.errorMessage,
          currentYouTubeVideoView: store.currentYouTubeVideoView,
          playlistObj: store.playlistObj,
          youTubeList: store.youTubeList,
          youTubeSong: store.youTubeSong,
          homeScreenButtonActive: store.homeScreenButtonActive,
          searchedListPairs: store.searchedListPairs,
        });
      }
      // STOP EDITING THE CURRENT LIST
      case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
        return setStore({
          currentModal: store.currentModal,
          idNamePairs: store.idNamePairs,
          currentList: null,
          currentSongIndex: -1,
          currentSong: {},
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          errorMessage: store.errorMessage,
          currentYouTubeVideoView: store.currentYouTubeVideoView,
          playlistObj: store.playlistObj,
          youTubeList: store.youTubeList,
          youTubeSong: store.youTubeSong,
          homeScreenButtonActive: store.homeScreenButtonActive,
          searchedListPairs: store.searchedListPairs,
        });
      }
      // CREATE A NEW LIST
      case GlobalStoreActionType.CREATE_NEW_LIST: {
        return setStore({
          currentModal: store.currentModal,
          idNamePairs: store.idNamePairs,
          currentList: payload,
          currentSongIndex: store.currentSongIndex,
          currentSong: store.currentSong,
          newListCounter: store.newListCounter + 1,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          errorMessage: store.errorMessage,
          currentYouTubeVideoView: store.currentYouTubeVideoView,
          playlistObj: store.playlistObj,
          youTubeList: store.youTubeList,
          youTubeSong: store.youTubeSong,
          homeScreenButtonActive: store.homeScreenButtonActive,
          searchedListPairs: store.searchedListPairs,
        });
      }
      // GET ALL THE LISTS SO WE CAN PRESENT THEM
      case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
        return setStore({
          currentModal: store.currentModal,
          idNamePairs: payload,
          currentList: store.currentList,
          currentSongIndex: -1,
          currentSong: {},
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          errorMessage: store.errorMessage,
          currentYouTubeVideoView: store.currentYouTubeVideoView,
          playlistObj: store.playlistObj,
          youTubeList: store.youTubeList,
          youTubeSong: store.youTubeSong,
          homeScreenButtonActive: store.homeScreenButtonActive,
          searchedListPairs: store.searchedListPairs,
        });
      }
      // PREPARE TO DELETE A LIST
      case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
        return setStore({
          currentModal: CurrentModal.DELETE_LIST,
          idNamePairs: store.idNamePairs,
          currentList: null,
          currentSongIndex: -1,
          currentSong: {},
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: payload.id,
          listMarkedForDeletion: payload.playlist,
          errorMessage: store.errorMessage,
          currentYouTubeVideoView: store.currentYouTubeVideoView,
          playlistObj: store.playlistObj,
          youTubeList: store.youTubeList,
          youTubeSong: store.youTubeSong,
          homeScreenButtonActive: store.homeScreenButtonActive,
          searchedListPairs: store.searchedListPairs,
        });
      }
      // UPDATE A LIST
      case GlobalStoreActionType.SET_CURRENT_LIST: {
        return setStore({
          currentModal: store.currentModal,
          idNamePairs: store.idNamePairs,
          currentList: payload,
          currentSongIndex: -1,
          currentSong: {},
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          errorMessage: store.errorMessage,
          currentYouTubeVideoView: store.currentYouTubeVideoView,
          playlistObj: store.playlistObj,
          youTubeList: store.youTubeList,
          youTubeSong: store.youTubeSong,
          homeScreenButtonActive: store.homeScreenButtonActive,
          searchedListPairs: store.searchedListPairs,
        });
      }
      // START EDITING A LIST NAME
      case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
        return setStore({
          currentModal: store.currentModal,
          idNamePairs: store.idNamePairs,
          currentList: payload,
          currentSongIndex: -1,
          currentSong: {},
          newListCounter: store.newListCounter,
          listNameActive: true,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          errorMessage: store.errorMessage,
          currentYouTubeVideoView: store.currentYouTubeVideoView,
          playlistObj: store.playlistObj,
          youTubeList: store.youTubeList,
          youTubeSong: store.youTubeSong,
          homeScreenButtonActive: store.homeScreenButtonActive,
          searchedListPairs: store.searchedListPairs,
        });
      }
      //
      case GlobalStoreActionType.EDIT_SONG: {
        return setStore({
          currentModal: CurrentModal.EDIT_SONG,
          idNamePairs: store.idNamePairs,
          currentList: payload.currentList,
          currentSongIndex: payload.currentSongIndex,
          currentSong: payload.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          errorMessage: store.errorMessage,
          currentYouTubeVideoView: store.currentYouTubeVideoView,
          playlistObj: store.playlistObj,
          youTubeList: store.youTubeList,
          youTubeSong: store.youTubeSong,
          homeScreenButtonActive: store.homeScreenButtonActive,
          searchedListPairs: store.searchedListPairs,
        });
      }
      case GlobalStoreActionType.REMOVE_SONG: {
        return setStore({
          currentModal: CurrentModal.REMOVE_SONG,
          idNamePairs: store.idNamePairs,
          currentList: payload.currentList,
          currentSongIndex: payload.currentSongIndex,
          currentSong: payload.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          errorMessage: store.errorMessage,
          currentYouTubeVideoView: store.currentYouTubeVideoView,
          playlistObj: store.playlistObj,
          youTubeList: store.youTubeList,
          youTubeSong: store.youTubeSong,
          homeScreenButtonActive: store.homeScreenButtonActive,
          searchedListPairs: store.searchedListPairs,
        });
      }
      case GlobalStoreActionType.HIDE_MODALS: {
        return setStore({
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSongIndex: -1,
          currentSong: {},
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          errorMessage: store.errorMessage,
          currentYouTubeVideoView: store.currentYouTubeVideoView,
          playlistObj: store.playlistObj,
          youTubeList: store.youTubeList,
          youTubeSong: store.youTubeSong,
          homeScreenButtonActive: store.homeScreenButtonActive,
          searchedListPairs: store.searchedListPairs,
        });
      }
      case GlobalStoreActionType.SET_ERROR_MSG: {
        return setStore({
          currentModal: store.currentModal,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSongIndex: store.currentSongIndex,
          currentSong: store.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: store.listNameActive,
          listIdMarkedForDeletion: store.listIdMarkedForDeletion,
          listMarkedForDeletion: store.listMarkedForDeletion,
          errorMessage: payload,
          currentYouTubeVideoView: store.currentYouTubeVideoView,
          playlistObj: store.playlistObj,
          youTubeList: store.youTubeList,
          youTubeSong: store.youTubeSong,
          homeScreenButtonActive: store.homeScreenButtonActive,
          searchedListPairs: store.searchedListPairs,
        });
      }
      case GlobalStoreActionType.CHANGE_YOUTUBE_VIEW: {
        return setStore({
          currentModal: store.currentModal,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSongIndex: store.currentSongIndex,
          currentSong: store.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: store.listNameActive,
          listIdMarkedForDeletion: store.listIdMarkedForDeletion,
          listMarkedForDeletion: store.listMarkedForDeletion,
          errorMessage: store.errorMessage,
          currentYouTubeVideoView: !store.currentYouTubeVideoView,
          playlistObj: store.playlistObj,
          youTubeList: store.youTubeList,
          youTubeSong: store.youTubeSong,
          homeScreenButtonActive: store.homeScreenButtonActive,
          searchedListPairs: store.searchedListPairs,
        });
      }
      case GlobalStoreActionType.UPDATE_PLAYLIST_OBJ: {
        return setStore({
          currentModal: store.currentModal,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSongIndex: store.currentSongIndex,
          currentSong: store.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: store.listNameActive,
          listIdMarkedForDeletion: store.listIdMarkedForDeletion,
          listMarkedForDeletion: store.listMarkedForDeletion,
          errorMessage: store.errorMessage,
          currentYouTubeVideoView: store.currentYouTubeVideoView,
          playlistObj: payload,
          youTubeList: store.youTubeList,
          youTubeSong: store.youTubeSong,
          homeScreenButtonActive: store.homeScreenButtonActive,
          searchedListPairs: store.searchedListPairs,
        });
      }
      case GlobalStoreActionType.UPDATE: {
        return setStore({
          currentModal: store.currentModal,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSongIndex: store.currentSongIndex,
          currentSong: store.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: store.listNameActive,
          listIdMarkedForDeletion: store.listIdMarkedForDeletion,
          listMarkedForDeletion: store.listMarkedForDeletion,
          errorMessage: store.errorMessage,
          currentYouTubeVideoView: store.currentYouTubeVideoView,
          playlistObj: store.playlistObj,
          youTubeList: store.youTubeList,
          youTubeSong: store.youTubeSong,
          homeScreenButtonActive: store.homeScreenButtonActive,
          searchedListPairs: store.searchedListPairs,
        });
      }
      case GlobalStoreActionType.UPDATE_YOUTUBE_LIST: {
        return setStore({
          currentModal: store.currentModal,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSongIndex: store.currentSongIndex,
          currentSong: store.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: store.listNameActive,
          listIdMarkedForDeletion: store.listIdMarkedForDeletion,
          listMarkedForDeletion: store.listMarkedForDeletion,
          errorMessage: store.errorMessage,
          currentYouTubeVideoView: store.currentYouTubeVideoView,
          playlistObj: store.playlistObj,
          youTubeList: payload,
          youTubeSong: payload.songs[store.currentYouTubeSongIndex[0]],
          homeScreenButtonActive: store.homeScreenButtonActive,
          searchedListPairs: store.searchedListPairs,
        });
      }
      case GlobalStoreActionType.CHANGE_HOME_SCREEN_BUTTON_ACTIVE: {
        return setStore({
          currentModal: store.currentModal,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSongIndex: store.currentSongIndex,
          currentSong: store.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: store.listNameActive,
          listIdMarkedForDeletion: store.listIdMarkedForDeletion,
          listMarkedForDeletion: store.listMarkedForDeletion,
          errorMessage: store.errorMessage,
          currentYouTubeVideoView: store.currentYouTubeVideoView,
          playlistObj: store.playlistObj,
          youTubeList: store.youTubeList,
          youTubeSong: store.youTubeSong,
          homeScreenButtonActive: payload,
          searchedListPairs: store.searchedListPairs,
        });
      }
      case GlobalStoreActionType.UPDATE_SEARCHED_LIST: {
        return setStore({
          currentModal: store.currentModal,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSongIndex: store.currentSongIndex,
          currentSong: store.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: store.listNameActive,
          listIdMarkedForDeletion: store.listIdMarkedForDeletion,
          listMarkedForDeletion: store.listMarkedForDeletion,
          errorMessage: store.errorMessage,
          currentYouTubeVideoView: store.currentYouTubeVideoView,
          playlistObj: store.playlistObj,
          youTubeList: store.youTubeList,
          youTubeSong: store.youTubeSong,
          homeScreenButtonActive: store.homeScreenButtonActive,
          searchedListPairs: payload,
        });
      }
      default:
        return store;
    }
  };

  // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
  // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN
  // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

  // THIS FUNCTION PROCESSES CHANGING A LIST NAME
  store.changeListName = async function (id, newName) {
    // GET THE LIST
    let response = await api.getPlaylistById(id);
    let playlist = response.data.playlist;

    playlist.name = newName;
    store.updateCurrentList(playlist).then(store.loadIdNamePairs);
  };

  store.changeYouTubeView = function () {
    storeReducer({
      type: GlobalStoreActionType.CHANGE_YOUTUBE_VIEW,
      payload: {},
    });
  };
  // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
  store.closeCurrentList = function () {
    console.log(2333);
    storeReducer({
      type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
      payload: {},
    });
    history.push("/");
    // getTps().clearAllTransactions();
  };

  // THIS FUNCTION CREATES A NEW LIST
  store.getUniquePlaylistName = function (idListPair, name, newList) {
    let num = -1;
    if (newList) {
      num++;
    }

    while (true) {
      let listName = name;
      if (num >= 0) {
        listName = name + " " + num;
      }
      let existed = false;
      for (const id in idListPair) {
        console.log(idListPair[id].list.name);
        if (idListPair[id].list.name === listName) {
          existed = true;
          break;
        }
      }
      if (existed) {
        num++;
      } else {
        return listName;
      }
    }
  };

  store.createNewList = async function () {
    let r = await api.getUserAllPlaylistPairs(auth.user.userName);
    let idListPair = r.data.idNamePairs;

    console.log(idListPair);

    let newListName = store.getUniquePlaylistName(idListPair, "Untitled", true);
    console.log("generated name", newListName);
    const response = await api.createPlaylist(
      newListName,
      [],
      auth.user.email,
      auth.user.userName
    );
    console.log("createNewList response: " + response);
    if (response.status === 201) {
      // getTps().clearAllTransactions();
      let newList = response.data.playlist;
      storeReducer({
        type: GlobalStoreActionType.CREATE_NEW_LIST,
        payload: newList,
      });

      // IF IT'S A VALID LIST THEN LET'S START EDITING IT
      // history.push("/playlist/" + newList._id);
      store.loadIdNamePairs();
      store.updatePlaylistObj(newList);
    } else {
      console.log("API FAILED TO CREATE A NEW LIST");
    }
  };

  store.duplicateList = async function (playlist, recursive) {
    let r = await api.getUserAllPlaylistPairs(auth.user.userName);
    let idListPairs = r.data.idNamePairs;
    let existed = idListPairs.reduce(
      (accumulator, currentValue) =>
        currentValue.list.name === playlist.name || accumulator,
      false
    );
    console.log(existed);
    console.log(idListPairs);

    if (existed) {
      let copy = JSON.parse(JSON.stringify(playlist));
      if (!recursive) {
        copy.name += " 0";
      } else {
        let num = copy.name.substring(copy.name.length - 1);
        num = parseInt(num) + 1;
        copy.name = copy.name.substring(0, copy.name.length - 1) + num;
      }
      return store.duplicateList(copy, true);
    }

    // let newListName = "Untitled" + store.newListCounter;
    const response = await api.createPlaylist(
      playlist.name,
      [],
      auth.user.email,
      auth.user.userName
    );
    console.log("createNewList response: " + response);
    if (response.status === 201) {
      // getTps().clearAllTransactions();
      let newList = response.data.playlist;

      // newList.name = playlist.name + " copy";
      newList.songs = JSON.parse(JSON.stringify(playlist.songs));

      await store.updateCurrentList(newList);
      await store.updateCurrentList(newList);

      console.log(playlist);
      console.log(newList);
      storeReducer({
        type: GlobalStoreActionType.CREATE_NEW_LIST,
        payload: newList,
      });

      // IF IT'S A VALID LIST THEN LET'S START EDITING IT
      // history.push("/playlist/" + newList._id);
      await store.loadIdNamePairs();
    } else {
      console.log("API FAILED TO CREATE A NEW LIST");
    }
  };

  // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
  store.loadIdNamePairs = async function () {
    const response = await api.getPlaylistPairs();
    if (response.data.success) {
      let pairsArray = response.data.idNamePairs;
      store.handleSort(pairsArray);
      console.log("fdslakj", pairsArray);

      // if (filterFunc !== undefined){
      //   pairsArray = pairsArray.filter(filterFunc);
      //   console.log("fdslakj", pairsArray);
      // }

      storeReducer({
        type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
        payload: pairsArray,
      });
    } else {
      console.log("API FAILED TO GET THE LIST PAIRS");
    }
  };

  // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
  // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
  // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
  // showDeleteListModal, and hideDeleteListModal
  store.markListForDeletion = function (id) {
    async function getListToDelete(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        storeReducer({
          type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
          payload: { id: id, playlist: playlist },
        });
      }
    }
    getListToDelete(id);
  };
  store.deleteList = function (id) {
    async function processDelete(id) {
      console.log("start");
      let response = await api.deletePlaylistById(id);
      console.log("end", response.data.success);
      if (response.data.success) {
        store.loadIdNamePairs();
        history.push("/");
      }
      // store.loadIdNamePairs();
    }
    processDelete(id);
  };
  store.deleteMarkedList = function () {
    store.deleteList(store.listIdMarkedForDeletion);
    store.hideModals();
  };
  // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
  // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

  store.showEditSongModal = async (songIndex, songToEdit, playlist) => {
    console.log(3123123, store.currentSong);
    console.log(3123123, songToEdit);
    console.log(12160, store.currentList);

    storeReducer({
      type: GlobalStoreActionType.EDIT_SONG,
      payload: {
        currentSongIndex: songIndex,
        currentSong: songToEdit,
        currentList: playlist,
      },
    });
  };

  store.showRemoveSongModal = async (songIndex, songToRemove, playlist) => {
    console.log(12141, playlist);
    storeReducer({
      type: GlobalStoreActionType.REMOVE_SONG,
      payload: {
        currentSongIndex: songIndex,
        currentSong: songToRemove,
        currentList: playlist,
      },
    });
  };
  store.hideModals = () => {
    storeReducer({
      type: GlobalStoreActionType.HIDE_MODALS,
      payload: {},
    });
  };
  store.isDeleteListModalOpen = () => {
    return store.currentModal === CurrentModal.DELETE_LIST;
  };
  store.isEditSongModalOpen = () => {
    return store.currentModal === CurrentModal.EDIT_SONG;
  };
  store.isRemoveSongModalOpen = () => {
    console.log(store.currentModal === CurrentModal.REMOVE_SONG);
    return store.currentModal === CurrentModal.REMOVE_SONG;
  };
  store.isModalOpen = () => {
    return (
      store.isDeleteListModalOpen() ||
      store.isEditSongModalOpen() ||
      store.isRemoveSongModalOpen()
    );
  };

  store.setErrorMessage = (msg) => {
    storeReducer({
      type: GlobalStoreActionType.SET_ERROR_MSG,
      payload: msg,
    });
  };

  // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
  // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
  // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
  // moveItem, updateItem, updateCurrentList, undo, and redo
  store.setCurrentList = function (id) {
    async function asyncSetCurrentList(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;

        response = await api.updatePlaylistById(playlist._id, playlist);
        if (response.data.success) {
          storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LIST,
            payload: playlist,
          });
          history.push("/playlist/" + playlist._id);
        }
      }
    }
    asyncSetCurrentList(id);
  };
  store.getPlaylistById = async function (id) {
    console.log(id);
    let response = await api.getPlaylistById(id);
    if (response.data.success) {
      let playlist = response.data.playlist;
      return playlist;
    }
  };
  store.getPlaylistSize = function () {
    return store.currentList.songs.length;
  };

  // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
  // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
  store.createSong = async function (index, song, list) {
    // let list = store.currentList;
    console.log(12145, list);
    list.songs.splice(index, 0, song);

    // NOW MAKE IT OFFICIAL
    await store.updateCurrentList(list);
    await store.updateCurrentList(list);
    await store.updatePlaylistObj(list);
    await store.loadIdNamePairs();
  };
  // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
  // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
  store.moveSong = async function (start, end, list) {
    console.log(93213, list);
    // WE NEED TO UPDATE THE STATE FOR THE APP
    if (start < end) {
      let temp = list.songs[start];
      for (let i = start; i < end; i++) {
        list.songs[i] = list.songs[i + 1];
      }
      list.songs[end] = temp;
    } else if (start > end) {
      let temp = list.songs[start];
      for (let i = start; i > end; i--) {
        list.songs[i] = list.songs[i - 1];
      }
      list.songs[end] = temp;
    }

    // NOW MAKE IT OFFICIAL
    console.log(231312312, list);

    await store.updateCurrentList(list);
    await store.updateCurrentList(list);
    await store.updatePlaylistObj(list);
    await store.loadIdNamePairs();
  };
  // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
  // FROM THE CURRENT LIST
  store.removeSong = async function (index, list) {
    console.log("fdslakj", store.idNamePairs);
    // let list = store.currentList;
    list.songs.splice(index, 1);

    // NOW MAKE IT OFFICIAL
    console.log(12153250);
    store.currentModal = CurrentModal.NONE;
    // store.updateCurrentList(list);

    // TODO
    console.log(12147, list);
    console.log("fdslakj", store.idNamePairs);

    await store.updateCurrentList(list);
    await store.updateCurrentList(list);
    await store.updatePlaylistObj(list);
    await store.loadIdNamePairs();
  };
  // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
  store.updateSong = async function (index, songData, list) {
    console.log("fadsfghgf", index);
    let song = list.songs[index];
    song.title = songData.title;
    song.artist = songData.artist;
    song.youTubeId = songData.youTubeId;
    console.log(song);

    // NOW MAKE IT OFFICIAL
    console.log(12153250);
    store.currentModal = CurrentModal.NONE;

    store
      .updateCurrentList(list)
      .then(() => store.updatePlaylistObj(list).then(store.loadIdNamePairs));
  };
  // store.addNewSong = () => {
  //     let playlistSize = store.getPlaylistSize();
  //     store.addCreateSongTransaction(
  //         playlistSize, "Untitled", "?", "dQw4w9WgXcQ");
  // }
  store.addNewSong = async function (list) {
    let index = list.songs.length;
    console.log(12144, list);
    this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ", list);
  };
  // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
  store.addCreateSongTransaction = (index, title, artist, youTubeId, list) => {
    // ADD A SONG ITEM AND ITS NUMBER
    let song = {
      title: title,
      artist: artist,
      youTubeId: youTubeId,
    };
    let transaction = new CreateSong_Transaction(store, index, song, list);
    getTps(list._id).addTransaction(transaction);
  };
  store.addMoveSongTransaction = async function (start, end, playlistId) {
    let list = await store.getPlaylistById(playlistId);
    let transaction = new MoveSong_Transaction(store, start, end, list);
    getTps(playlistId).addTransaction(transaction);
  };
  // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
  store.addRemoveSongTransaction = () => {
    let index = store.currentSongIndex;
    console.log(12142, store.currentList);
    let song = store.currentList.songs[index];
    let transaction = new RemoveSong_Transaction(
      store,
      index,
      song,
      store.currentList
    );
    getTps(store.currentList._id).addTransaction(transaction);

    store.updateCurrentList(store.currentList);
  };
  store.addUpdateSongTransaction = async function (index, newSongData) {
    // let list = await store.getPlaylistById(listId);
    // console.log(12151, list)
    // console.log(listId)
    let song = store.currentList.songs[index];
    let oldSongData = {
      title: song.title,
      artist: song.artist,
      youTubeId: song.youTubeId,
    };
    let transaction = new UpdateSong_Transaction(
      this,
      index,
      oldSongData,
      newSongData,
      store.currentList
    );
    getTps(store.currentList._id).addTransaction(transaction);
  };
  store.updateCurrentList = async function (list) {
    const response = await api.updatePlaylistById(list._id, list);

    storeReducer({
      type: GlobalStoreActionType.UPDATE,
    });
  };

  store.undo = async function (playlist) {
    await getTps(playlist._id).undoTransaction();
    // await store.loadIdNamePairs();
    // await store.loadIdNamePairs();
    // history.push("/");
    // store.loadIdNamePairs();
    // await store.updateCurrentList(playlist);
    // await store.updatePlaylistObj(playlist._id);
    // store.update()
    console.log("fdslakj", store.idNamePairs);
  };
  store.redo = async function (playlist) {
    await getTps(playlist._id).doTransaction();
    // await store.loadIdNamePairs();
    // await store.loadIdNamePairs();
    // history.push("/");
    // store.loadIdNamePairs();
    // await store.updateCurrentList(playlist);
    // await store.updatePlaylistObj(playlist._id);
    // store.update();
    console.log("fdslakj", store.idNamePairs);
  };

  store.canAddNewSong = function () {
    // return (store.currentList !== null);
    return true;
  };
  store.canUndo = function (playlistId) {
    return getTps(playlistId).hasTransactionToUndo();
  };
  store.canRedo = function (playlistId) {
    return getTps(playlistId).hasTransactionToRedo();
  };
  store.canClose = function () {
    return store.currentList !== null;
  };

  store.unmarkListForDeletion = function () {
    storeReducer({
      type: GlobalStoreActionType.HIDE_MODALS,
    });
  };
  // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
  store.setIsListNameEditActive = function () {
    storeReducer({
      type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
      payload: null,
    });
  };

  store.updatePlaylistObj = async function (playlist) {
    let playlistObj = store.playlistObj;
    playlistObj[playlist._id] = playlist;
    console.log("updating playlist obj");
    console.log(playlistObj);
    storeReducer({
      type: GlobalStoreActionType.UPDATE_PLAYLIST_OBJ,
      payload: playlistObj,
    });
  };
  store.update = () => {
    storeReducer({
      type: GlobalStoreActionType.UPDATE,
    });
  };
  store.updatePlaylistObjExpandLess = async function (id) {
    let playlistObj = store.playlistObj;
    delete playlistObj[id];
    console.log("updating playlist obj");
    console.log(playlistObj);
    storeReducer({
      type: GlobalStoreActionType.UPDATE_PLAYLIST_OBJ,
      payload: playlistObj,
    });
  };

  store.updateYouTubeList = async function (list) {
    store.currentYouTubeSongIndex[0] = 0;
    list.listens++;
    console.log(list);
    await api.updatePlaylistById(list._id, list);
    console.log(list);
    storeReducer({
      type: GlobalStoreActionType.UPDATE_YOUTUBE_LIST,
      payload: list,
    });
  };

  // store.incListens = function (list){
  //     list.listens ++;
  //     store.updateCurrentList(list);
  // }

  // store.addKeyPress = function() {
  //     function KeyPress(store,evtobj) {

  //         if (!store.isModalOpen()){

  //             if (evtobj.key === "z" && evtobj.ctrlKey){
  //                 store.undo();
  //                 console.log("undo")
  //             }
  //             if (evtobj.key === "y" && evtobj.ctrlKey){
  //                 store.redo();
  //                 console.log("redo")
  //             }
  //         }
  //     }

  //     document.onkeydown = (e) => KeyPress(this,e);

  // }
  // store.addKeyPress()

  store.checkListLikeExists = (list) => {
    return !!listLike[list._id];
  };
  store.getListLike = (list, key) => {
    console.log(listLike);
    console.log(listLike[list._id]);
    if (!listLike[list._id]) {
      listLike[list._id] = { liked: false, disliked: false };
    }
    return listLike[list._id][key];
  };
  store.updateListLike = (list, key, val) => {
    console.log(3123124, list._id, key, val);
    if (!listLike[list._id]) {
      listLike[list._id] = { liked: false, disliked: false };
    }
    if (val !== listLike[list._id][key]) {
      listLike[list._id][key] = val;
      store.update();
    }
  };
  store.currentYouTubeSongIndex = currentYouTubeSongIndex;

  store.updateYouTubeSong = () => {
    console.log(store.currentYouTubeSongIndex[0]);
    store.youTubeSong =
      store.youTubeList.songs[store.currentYouTubeSongIndex[0]];
    store.update();
  };

  store.changeHomeScreenButtonActive = (num) => {
    
    storeReducer({
      type: GlobalStoreActionType.CHANGE_HOME_SCREEN_BUTTON_ACTIVE,
      payload: num,
    });
  };

  store.lastSearchTerm = lastSearchTerm[0];
  store.updateSearchedListPairs = async (searchTerm) => {
    lastSearchTerm[0] = searchTerm;
    if (!searchTerm) {
      storeReducer({
        type: GlobalStoreActionType.UPDATE_SEARCHED_LIST,
        payload: [],
      });
    } else {
      let response;
      console.log(store.homeScreenButtonActive);
      if (store.homeScreenButtonActive < 3) {
        response = await api.getSearchedPlaylistPairs(searchTerm);
      } else if (store.homeScreenButtonActive === 3) {
        response = await api.getUserPlaylistPairs(searchTerm);
      }
      let searchedList = response.data.idNamePairs;
      store.handleSort(searchedList);
      console.log(searchedList);
      storeReducer({
        type: GlobalStoreActionType.UPDATE_SEARCHED_LIST,
        payload: searchedList,
      });
    }
  };

  store.isUserOwnList = (list) => {
    return auth.user && list.userName === auth.user.userName;
  };
  store.isGuest = () => {
    return auth.user === null;
  };

  store.sortOption = sortOption;

  store.getApi = () => {
    return api;
  };

  store.setSortOption = async (option) => {
    store.sortOption[0] = option;
    if (store.homeScreenButtonActive === 1) await store.loadIdNamePairs();
    else store.updateSearchedListPairs(lastSearchTerm[0]);
  };
  
  store.updateYouTubeListFromMem = async () => {
    let response = await store.getApi().getPlaylistById(store.youTubeList._id);
    store.youTubeList = response.data.playlist;
  };

  store.handleSort = (pairsArray) => {
    switch (store.sortOption[0]) {
      case "Name":
        console.log(pairsArray);
        pairsArray.sort((a, b) => {
          return a.list.name.localeCompare(b.list.name);
        });
        console.log(pairsArray);
        return store.update();
      case "Date":
        console.log(pairsArray);

        pairsArray.sort((a, b) => {
          if (a.list.publishedDate === undefined) {
            a.list.publishedDate = "12/30/9999";
          }
          if (b.list.publishedDate === undefined) {
            b.list.publishedDate = "12/30/9999";
          }
          return (
            Date.parse(a.list.publishedDate) - Date.parse(b.list.publishedDate)
          );
        });

        console.log(pairsArray);
        return store.update();

      case "Listens":
        console.log(pairsArray);

        pairsArray.sort((a, b) => {
          if (a.list.listens === undefined) {
            a.list.listens = -1;
          }
          if (b.list.listens === undefined) {
            b.list.listens = -1;
          }
          return -(a.list.listens - b.list.listens);
        });

        console.log(pairsArray);
        return store.update();

      case "Likes":
        console.log(pairsArray);

        pairsArray.sort((a, b) => {
          if (a.list.likedUsers === undefined) {
            return 1;
          }
          if (b.list.likedUsers === undefined) {
            return -1;
          }
          return -(a.list.likedUsers.length - b.list.likedUsers.length);
        });

        console.log(pairsArray);
        return store.update();
      case "Dislikes":
        console.log(pairsArray);

        pairsArray.sort((a, b) => {
          if (a.list.dislikedUsers === undefined) {
            return 1;
          }
          if (b.list.dislikedUsers === undefined) {
            return -1;
          }
          return -(a.list.dislikedUsers.length - b.list.dislikedUsers.length);
        });

        console.log(pairsArray);
        return store.update();
      default:
        return;
    }
  };

  return (
    <GlobalStoreContext.Provider
      value={{
        store,
      }}
    >
      {props.children}
    </GlobalStoreContext.Provider>
  );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };
