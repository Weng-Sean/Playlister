import { useContext } from "react";
import { GlobalStoreContext } from "../store";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import CloseIcon from "@mui/icons-material/HighlightOff";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import PublishIcon from "@mui/icons-material/Publish";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar(props) {
  const { store } = useContext(GlobalStoreContext);
  const { playlistId, playlist } = props;

  function handleAddNewSong(event) {
    event.stopPropagation();
    store.addNewSong(playlist);
  }
  function handleUndo(event) {
    event.stopPropagation();
    store.undo(playlist);
  }
  function handleRedo(event) {
    event.stopPropagation();
    store.redo(playlist);
  }
  // function handleClose() {
  //     //  window.location.href = "/";
  //     store.closeCurrentList();
  // }
  function handleDelete(event) {
    event.stopPropagation();
    store.markListForDeletion(playlistId);
  }
  async function handlePublish(event) {
    event.stopPropagation();
    playlist.published = true;

    let d = new Date();
    playlist.publishedDate =
      d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

    // playlist.likes = 0;
    // playlist.dislikes = 0;
    playlist.likedUsers = [];
    playlist.dislikedUsers = [];
    playlist.comments = [];
    playlist.listens = 0;

    await store.updateCurrentList(playlist);
    await store.loadIdNamePairs();
  }
  function handleDuplicate() {
    store.duplicateList(playlist);
  }

  let modalOpen = store.isModalOpen();
  return (
    <div id="edit-toolbar">
      {store.isUserOwnList(playlist) && !playlist.published ? (
        <Button
          disabled={!store.canUndo(playlistId)}
          id="undo-button"
          onClick={handleUndo}
          variant="contained"
        >
          <UndoIcon />
        </Button>
      ) : (
        ""
      )}
      {store.isUserOwnList(playlist) && !playlist.published ? (
        <Button
          disabled={!store.canRedo(playlistId)}
          id="redo-button"
          onClick={handleRedo}
          variant="contained"
        >
          <RedoIcon />
        </Button>
      ) : (
        ""
      )}
      {store.isUserOwnList(playlist) && !playlist.published ? (
        <Button
          // disabled={modalOpen}
          id="add-song-button"
          onClick={handleAddNewSong}
          variant="contained"
        >
          <AddIcon />
        </Button>
      ) : (
        ""
      )}
      {store.isUserOwnList(playlist) ? (
        <Button onClick={handleDelete} variant="contained">
          <DeleteIcon style={{}} />
        </Button>
      ) : (
        ""
      )}
      {!store.isGuest() ? (
        <Button onClick={handleDuplicate} variant="contained">
          <ContentCopyIcon style={{}} />
        </Button>
      ) : (
        ""
      )}

      {store.isUserOwnList(playlist) && !playlist.published ? (
        <Button onClick={handlePublish} variant="contained">
          <PublishIcon style={{}} />
          publish
        </Button>
      ) : (
        ""
      )}

      {/* <Button 
                disabled={!store.canClose() || modalOpen}
                id='close-button'
                onClick={handleClose}
                variant="contained">
                    <CloseIcon />
            </Button> */}
    </div>
  );
}

export default EditToolbar;
