import React, { useContext, useEffect } from "react";
import { GlobalStoreContext } from "../store";
import ListCard from "./ListCard.js";
import MUIDeleteModal from "./MUIDeleteModal";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import YouTubePlayer from "./youTubeBox";
import HomeScreenToolBar from "./HomeScreenToolBar";
import MUIRemoveSongModal from "./MUIRemoveSongModal";
import MUIEditSongModal from "./MUIEditSongModal";
import MUIErrorModal from "./MUIErrorModal";
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = (props) => {
  const { store } = useContext(GlobalStoreContext);

  useEffect(() => {
    store.loadIdNamePairs();
  }, []);

  // store.changeHomeScreenButtonActive(guest? 2: 1);
  // if (guest){
  //   if (store.homeScreenButtonActive < 2){
  //     store.changeHomeScreenButtonActive(2);
  //   }
  // }


  function handleCreateNewList() {
    store.createNewList();
  }
  let content = (pairs) => {
    console.log(312647, store.homeScreenButtonActive);
    let listCard = "";
    if (store) {
      console.log(9808080321, pairs);
      listCard = (
        <List sx={{ width: "90%", left: "5%" }}>
          {pairs.map((pair) => (
            <ListCard key={pair._id} idNamePair={pair} selected={false} />
          ))}
        </List>
      );
    }
    return (
      <div id="playlist-selector">
        <div id="list-selector-heading"></div>

        <Grid container spacing={1} height={"100%"}>
          <Grid item xs={7}>
            <div
              id="list-selector-list"
              style={{
                width: "50%",
                overflowX: "auto",
              }}
            >
              {listCard}
              <MUIDeleteModal />
            </div>
          </Grid>
          <Grid item xs={5}>
            <Box>
              <YouTubePlayer />
            </Box>
          </Grid>
        </Grid>

        <div
          style={{
            position: "fixed",
            bottom: "10px",
            width: "100%",
            left: "40%",
          }}
        >
          {store.isGuest() && store.homeScreenButtonActive !== 1 ? (
            ""
          ) : (
            <span>
              <Fab
                color="primary"
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
              >
                <AddIcon />
              </Fab>
              <Typography variant="h2">Your Lists</Typography>
            </span>
          )}
        </div>

        <MUIRemoveSongModal />
        {Object.keys(store.currentSong).length !== 0 ? (
          <MUIEditSongModal />
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <div>
      <HomeScreenToolBar />
      {store.homeScreenButtonActive === 1
        ? (store.lastSearchTerm === "" ? content(store.idNamePairs) : content(store.idNamePairs.filter(pair => pair.list.name.startsWith(store.lastSearchTerm))))
        : content(store.searchedListPairs)}
      <MUIErrorModal />
    </div>
  );
};

export default HomeScreen;
