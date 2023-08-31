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
import { getSpeedDialActionUtilityClass } from "@mui/material";
import EditToolbar from "./EditToolbar";

const SongComponent = (props) => {
  const { store } = useContext(GlobalStoreContext);
  const { playlistId, playlist } = props;
  let visible = !!store.playlistObj[playlistId];
  if (visible) {
    console.log("hfk90", store.playlistObj[playlistId]);
  }
  console.log(playlistId, store.playlistObj[playlistId]);
  if (visible) {
    console.log("rendering song component");
    return (
      <div>
        {store.playlistObj[playlistId].songs.map((song, index) => (
          <SongCard
            id={"playlist-song-" + index}
            key={"playlist-song-" + index}
            index={index}
            song={song}
            playlistId={playlistId}
            playlist={playlist}
          />
        ))}
        <Box sx={{}}>
          <EditToolbar playlistId={playlistId} playlist={playlist} />
        </Box>
      </div>
    );
  } else {
    return "";
  }
};

export default SongComponent;
