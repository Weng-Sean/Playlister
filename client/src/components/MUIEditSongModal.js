import { useContext, useState } from "react";
import GlobalStoreContext from "../store";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };

export default function MUIEditSongModal() {
  const { store } = useContext(GlobalStoreContext);

  console.log(3123123, store.currentSong);

  let localSongInfo = {
    title: store.currentSong.title,
    artist: store.currentSong.artist,
    youTubeId: store.currentSong.youTubeId,
  };

  function handleConfirm() {
    let newSongData = {
      title: localSongInfo.title,
      artist: localSongInfo.artist,
      youTubeId: localSongInfo.youTubeId,
    };
    store.currentSong = {};
    store.addUpdateSongTransaction(store.currentSongIndex, newSongData);
  }

  function handleCancel() {
    store.hideModals();
  }

  function handleChangeTitle(event) {
    localSongInfo.title = event.target.value;
  }

  function handleChangeArtist(event) {
    localSongInfo.artist = event.target.value;
  }

  function handleChangeLink(event) {
    localSongInfo.youTubeId = event.target.value;
  }

  return (
    <div
      class={"modal " + (store.isEditSongModalOpen() ? "is-visible" : "")}
      id="edit-song-modal"
      data-animation="slideInOutLeft"
    >
      <div class="modal-root" id="verify-edit-song-root">
        <div class="modal-north">Edit Song</div>
        <div class="modal-center">
          <div class="modal-center-content" id="edit-song-info-div">
            <span id="title-prompt">Title:</span>
            <input
              defaultValue={localSongInfo.title}
              onChange={handleChangeTitle}
              id="edit-song-modal-title-textfield"
            ></input>

            <span id="artist-prompt">Artist:</span>
            <input
              defaultValue={localSongInfo.artist}
              onChange={handleChangeArtist}
              id="edit-song-modal-artist-textfield"
            ></input>

            <span id="you-tube-id-prompt">YouTubeId:</span>
            <input
              defaultValue={localSongInfo.youTubeId}
              onChange={handleChangeLink}
              id="edit-song-modal-youTubeId-textfield"
            ></input>
          </div>
        </div>
        <div class="modal-south">
          <input
            type="button"
            id="edit-song-confirm-button"
            class="modal-button"
            onClick={handleConfirm}
            value="Confirm"
          />
          <input
            type="button"
            id="edit-song-cancel-button"
            class="modal-button"
            onClick={handleCancel}
            value="Cancel"
          />
        </div>
      </div>
    </div>
  );
  // return (
  //     <Modal
  //         open={store.isEditSongModalOpen()}
  //     >
  //         <Box sx={style}>
  //         <div
  //         id="edit-song-modal"
  //         className="modal is-visible"
  //         data-animation="slideInOutLeft">
  //         <div
  //             id='edit-song-root'
  //             className="modal-root">
  //             <div
  //                 id="edit-song-modal-header"
  //                 className="modal-north">Edit Song</div>
  //             <div
  //                 id="edit-song-modal-content"
  //                 className="modal-center">
  //                 <div id="title-prompt" className="modal-prompt">Title:</div>
  //                 <input
  //                     id="edit-song-modal-title-textfield"
  //                     className='modal-textfield'
  //                     type="text"
  //                     defaultValue={title}
  //                     onChange={handleUpdateTitle} />
  //                 <div id="artist-prompt" className="modal-prompt">Artist:</div>
  //                 <input
  //                     id="edit-song-modal-artist-textfield"
  //                     className='modal-textfield'
  //                     type="text"
  //                     defaultValue={artist}
  //                     onChange={handleUpdateArtist} />
  //                 <div id="you-tube-id-prompt" className="modal-prompt">You Tube Id:</div>
  //                 <input
  //                     id="edit-song-modal-youTubeId-textfield"
  //                     className='modal-textfield'
  //                     type="text"
  //                     defaultValue={youTubeId}
  //                     onChange={handleUpdateYouTubeId} />
  //             </div>
  //             <div className="modal-south">
  //                 <input
  //                     type="button"
  //                     id="edit-song-confirm-button"
  //                     className="modal-button"
  //                     value='Confirm'
  //                     onClick={handleConfirmEditSong} />
  //                 <input
  //                     type="button"
  //                     id="edit-song-cancel-button"
  //                     className="modal-button"
  //                     value='Cancel'
  //                     onClick={handleCancelEditSong} />
  //             </div>
  //         </div>
  //     </div>
  //         </Box>
  //     </Modal>
  // );
}
