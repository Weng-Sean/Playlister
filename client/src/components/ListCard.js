import { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SongCard from "./SongCard";
import SongComponent from "./songComponent";
import Grid from "@mui/material/Grid";
import EditToolbar from "./EditToolbar";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MUIEditSongModal from "./MUIEditSongModal";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import AuthContext from "../auth";
import { adaptV4Theme } from "@mui/material";
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const [editActive, setEditActive] = useState(false);
  const [expand, setExpand] = useState(false);
  const [text, setText] = useState("");
  const { idNamePair, selected } = props;
  const [isHover, setIsHover] = useState(false);
  const history = useHistory();

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  function handleLoadList(event, id) {
    console.log("handleLoadList for " + id);
    if (!event.target.disabled) {
      let _id = event.target.id;
      if (_id.indexOf("list-card-text-") >= 0)
        _id = ("" + _id).substring("list-card-text-".length);

      console.log("load " + event.target.id);

      // CHANGE THE CURRENT LIST
      store.setCurrentList(id);
    }
  }

  function handleToggleEdit(event) {
    event.stopPropagation();
    toggleEdit();
  }

  function toggleEdit() {
    let newActive = !editActive;
    if (newActive) {
      store.setIsListNameEditActive();
    }
    setEditActive(newActive);
  }

  async function handleDeleteList(event, id) {
    event.stopPropagation();
    let _id = event.target.id;
    _id = ("" + _id).substring("delete-list-".length);
    store.markListForDeletion(id);
  }

  let handleKeyPress = async (event) => {
    if (event.code === "Enter") {
      if (text === idNamePair.list.name) {
        toggleEdit();
        return;
      }
      let r = await store.getApi().getUserAllPlaylistPairs(auth.user.userName);
      let idListPair = r.data.idNamePairs;
      if (text !== store.getUniquePlaylistName(idListPair, text)) {
        store.setErrorMessage(
          `${text} already exists in your playlists, please change a new name`
        );
      } else {
        let id = event.target.id.substring("list-".length);
        store.changeListName(id, text);
        toggleEdit();
      }
    }
    // history.pushState("/")
  };
  function handleUpdateText(event) {
    setText(event.target.value);
  }

  async function handleExpand(event) {
    event.stopPropagation();
    setExpand(true);
    store.updatePlaylistObj(idNamePair.list);
  }

  async function handleExpandLess(event) {
    event.stopPropagation();
    setExpand(false);
    store.updatePlaylistObjExpandLess(idNamePair._id);
  }

  let isYouTubeList = () => {
    if (!store.youTubeList) {
      console.log("store youTube list", store.youTubeList);
      return false;
    }
    console.log("store youTube list", store.youTubeList);
    return store.youTubeList._id === idNamePair.list._id;
  };
  let handleClick = async () => {
    console.log(5422545262524, idNamePair.list._id)
    let response = await store.getApi().getPlaylistById(idNamePair.list._id);
    console.log(5422545262524)
    idNamePair.list = response.data.playlist;

    store.updateYouTubeList(idNamePair.list);
    // store.incListens(idNamePair.list);

    // await store.loadIdNamePairs().then(
    //     async() => {
    //         let response = await store.getApi().getPlaylistById(idNamePair.list._id);
    //         store.updateYouTubeList(response.data.playlist)
    //     }

    // );
    console.log(5422545262524)
    console.log(878970, idNamePair.list);
  };

  let handleLike = async (event) => {
    event.stopPropagation();

    let response = await store.getApi().getPlaylistById(idNamePair.list._id);
    idNamePair.list = response.data.playlist;

    var index = idNamePair.list.likedUsers.indexOf(auth.user.userName);
    if (index !== -1) {
      idNamePair.list.likedUsers.splice(index, 1);
    } else {
      idNamePair.list.likedUsers.push(auth.user.userName);
    }

    var index2 = idNamePair.list.dislikedUsers.indexOf(auth.user.userName);
    if (index2 !== -1) {
      idNamePair.list.dislikedUsers.splice(index2, 1);
    }

    await store
      .getApi()
      .updatePlaylistById(idNamePair.list._id, idNamePair.list)
      .then(() => {
        store.loadIdNamePairs().then(() => {
          store.updateSearchedListPairs(store.lastSearchTerm);
        });
      });
  };

  let handleDislike = async (event) => {
    event.stopPropagation();

    let response = await store.getApi().getPlaylistById(idNamePair.list._id);
    idNamePair.list = response.data.playlist;

    var index = idNamePair.list.dislikedUsers.indexOf(auth.user.userName);
    if (index !== -1) {
      idNamePair.list.dislikedUsers.splice(index, 1);
    } else {
      idNamePair.list.dislikedUsers.push(auth.user.userName);
    }

    var index2 = idNamePair.list.likedUsers.indexOf(auth.user.userName);
    if (index2 !== -1) {
      idNamePair.list.likedUsers.splice(index2, 1);
    }

    console.log("dasfadsfadsf", idNamePair.list);

    await store
      .getApi()
      .updatePlaylistById(idNamePair.list._id, idNamePair.list)
      .then(() => {
        store.loadIdNamePairs().then(() => {
          store.updateSearchedListPairs(store.lastSearchTerm);
        });
      });
  };

  let selectClass = "unselected-list-card";
  if (selected) {
    selectClass = "selected-list-card";
  }
  let cardStatus = false;
  if (store.isListNameEditActive) {
    cardStatus = true;
  }
  let cardElement = (
    <ListItem
      className="listCard"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      id={idNamePair._id}
      key={idNamePair._id}
      sx={{ margin: "15px", display: "flex", p: 1 }}
      style={{
        minHeight: "70px",
        width: "95%",
        fontSize: "20pt",
        backgroundColor: isHover
          ? "#a19b8c"
          : isYouTubeList()
          ? "#a19b8c"
          : "#ffffff",
        borderRadius: 10,
        border: "2px solid black",
      }}
      button
      onClick={handleClick}
    >
      <Grid container>
        <Grid item xs={5}>
          <div id="listCardInfoDiv">
            <Box
              sx={{
                p: 1,
                flexGrow: 1,
                fontSize: 20,
                fontWeight: "bold",
                paddingBottom: 0,
              }}
            >
              {idNamePair.list.name}
            </Box>
            <Box sx={{ p: 1, flexGrow: 1, fontSize: 12 }}>
              {idNamePair.list.published
                ? "by: " +
                  idNamePair.list.userName +
                  "|| published: " +
                  idNamePair.list.publishedDate +
                  "|| listens: " +
                  idNamePair.list.listens
                : "by: " + idNamePair.list.userName}
            </Box>
          </div>
        </Grid>

        {idNamePair.list.published ? (
          <Grid item xs={2}>
            <Box sx={{ p: 1 }}>
              <IconButton
                onClick={handleLike}
                disabled={store.isGuest()}
                aria-label="edit"
              >
                {!auth.user||!idNamePair.list.likedUsers.includes(auth.user.userName) ? (
                  <ThumbUpOffAltIcon style={{ fontSize: "25pt" }} />
                ) : (
                  <ThumbUpIcon style={{ fontSize: "25pt" }} />
                )}
                <div style={{ fontSize: "20px" }}>
                  {idNamePair.list.likedUsers.length}
                </div>
              </IconButton>
            </Box>
          </Grid>
        ) : (
          <Grid item xs={2}></Grid>
        )}
        {idNamePair.list.published ? (
          <Grid item xs={2}>
            <Box sx={{ p: 1 }}>
              <IconButton
                onClick={handleDislike}
                disabled={store.isGuest()}
                aria-label="edit"
              >
                {!auth.user || !idNamePair.list.dislikedUsers.includes(auth.user.userName) ? (
                  <ThumbDownOffAltIcon style={{ fontSize: "25pt" }} />
                ) : (
                  <ThumbDownIcon style={{ fontSize: "25pt" }} />
                )}
                <div style={{ fontSize: "20px" }}>
                  {idNamePair.list.dislikedUsers.length}
                </div>
              </IconButton>
            </Box>
          </Grid>
        ) : (
          <Grid item xs={2}></Grid>
        )}
        <Grid item xs={1}>
          <Box sx={{ p: 1 }}>
            {editActive ||
            !store.isUserOwnList(idNamePair.list) ||
            idNamePair.list.published ? (
              ""
            ) : (
              <IconButton onClick={handleToggleEdit} aria-label="edit">
                <EditIcon style={{ fontSize: "24pt" }} />
              </IconButton>
            )}
          </Box>
        </Grid>

        <Grid item xs={1}>
          <Box sx={{ p: 1 }}>
            {expand ? (
              <IconButton onClick={handleExpandLess} aria-label="edit">
                <ExpandLessIcon style={{ fontSize: "24pt" }} />
              </IconButton>
            ) : (
              <IconButton onClick={handleExpand} aria-label="edit">
                <ExpandMoreIcon style={{ fontSize: "24pt" }} />
              </IconButton>
            )}
          </Box>
        </Grid>

        {/* <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{fontSize:'24pt'}} />
                </IconButton>
            </Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                    <DeleteIcon style={{fontSize:'24pt'}} />
                </IconButton>
            </Box> */}

        <Grid item xs={12}>
          <Box>
            {
              <SongComponent
                playlistId={idNamePair._id}
                playlist={idNamePair.list}
              />
            }
          </Box>
        </Grid>
      </Grid>
    </ListItem>
  );

  if (editActive) {
    cardElement = (
      <TextField
        margin="normal"
        required
        fullWidth
        id={"list-" + idNamePair._id}
        label="Playlist Name"
        name="name"
        autoComplete="Playlist Name"
        className="list-card"
        onKeyPress={handleKeyPress}
        onChange={handleUpdateText}
        defaultValue={idNamePair.list.name}
        inputProps={{ style: { fontSize: 24 } }}
        InputLabelProps={{ style: { fontSize: 24 } }}
        autoFocus
      />
    );
  }
  console.log(12140, store);
  return cardElement;
}

export default ListCard;
