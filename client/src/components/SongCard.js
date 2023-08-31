import React, { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import MUIEditSongModal from "./MUIEditSongModal";

function SongCard(props) {
  const { store } = useContext(GlobalStoreContext);
  const [draggedTo, setDraggedTo] = useState(0);
  const { song, index, playlistId, playlist } = props;

  function handleDragStart(event) {
    event.dataTransfer.setData("song", index);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDragEnter(event) {
    event.preventDefault();
    setDraggedTo(true);
  }

  function handleDragLeave(event) {
    event.preventDefault();
    setDraggedTo(false);
  }

  function handleDrop(event) {
    event.preventDefault();
    let targetIndex = index;
    let sourceIndex = Number(event.dataTransfer.getData("song"));
    setDraggedTo(false);

    // UPDATE THE LIST
    store.addMoveSongTransaction(sourceIndex, targetIndex, playlistId);
  }
  function handleRemoveSong(event) {
    event.stopPropagation();
    console.log(12139, index, song);
    store.showRemoveSongModal(index, song, playlist);
  }
  function handleClick(event) {
    event.stopPropagation();
    // DOUBLE CLICK IS FOR SONG EDITING
    if (event.detail === 2  && store.homeScreenButtonActive === 1) {
      store.showEditSongModal(index, song, playlist);
    }
  }

  let isYouTubeSong = () => {
    if (!store.youTubeSong) {
      return false;
    }
    // console.log("store youTube list", store.youTubeList)
    return JSON.stringify(song) === JSON.stringify(store.youTubeSong);
  };

  let cardClass = isYouTubeSong()?"list-card selected-list-card":"list-card unselected-list-card";
  return (
    <div
      key={index}
      id={"song-" + index + "-card"}
      className={cardClass}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      draggable={!playlist.published&&store.isUserOwnList(playlist)}
      onClick={handleClick}
      style={{
        fontSize: 12,
        // backgroundColor: isYouTubeSong() ? "#dae04c" : "",
      }}
    >
      {index + 1}.
      <a id={"song-" + index + "-link"} className="song-link">
        {song.title} by {song.artist}
      </a>
      {store.isUserOwnList(playlist) && !playlist.published ? (
        <input
          type="button"
          id={"remove-song-" + index}
          className="list-card-button"
          value={"X"}
          onClick={handleRemoveSong}
          style={{ height: 20, width: 20, fontSize: 10, textAlign: "center" }}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default SongCard;
