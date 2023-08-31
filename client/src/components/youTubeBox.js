import GlobalStoreContext from "../store";
import React, { useContext } from "react";
import YouTube from "react-youtube";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { useState } from "react";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import CommentCard from "./CommentCard";
import AuthContext from "../auth";
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function YouTubePlayer() {
  // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
  // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
  // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
  // FROM ONE SONG TO THE NEXT
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);

  let youTubeList = store.youTubeList;
  if (!youTubeList || !store.youTubeSong) {
    return "";
  }

  // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST

  const playerOptions = {
    height: "210",
    width: "340",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  // THIS FUNCTION LOADS THE CURRENT SONG INTO
  // THE PLAYER AND PLAYS IT
  function loadAndPlayCurrentSong(player) {
    let song =
      store.youTubeList.songs[store.currentYouTubeSongIndex[0]].youTubeId;
    player.loadVideoById(song);
    player.playVideo();
  }

  // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
  function incSong() {
    store.currentYouTubeSongIndex[0]++;
    if (store.currentYouTubeSongIndex[0] === store.youTubeList.songs.length) {
      store.currentYouTubeSongIndex[0] = 0;
    }
    console.log("next song", store.currentYouTubeSongIndex[0]);
    console.log(store.youTubeList.songs.length);
    console.log(store.youTubeList.songs.length);
    store.updateYouTubeSong();
  }

  function decSong() {
    if (store.currentYouTubeSongIndex[0] !== 0) {
      store.currentYouTubeSongIndex[0] = store.currentYouTubeSongIndex[0] - 1;
    } else {
      store.currentYouTubeSongIndex[0] = store.youTubeList.songs.length - 1;
    }

    store.updateYouTubeSong();
  }

  function onPlayerReady(event) {
    loadAndPlayCurrentSong(event.target);
    event.target.playVideo();
  }

  let commentDraft = "";
  let keyPress = async (event) => {
    await setTimeout(() => {
      commentDraft = event.target.value;
      console.log(event);
      console.log(event.target.value);
      console.log(commentDraft);
    }, 100);
  };
  let handleSubmit = async (event) => {
    let response = await store.getApi().getPlaylistById(store.youTubeList._id);
    store.youTubeList = response.data.playlist;
    // if (!store.youTubeList.comments) {
    //   store.youTubeList.comments = [];
    // }
    store.youTubeList.comments.push({
      user: auth.user.userName,
      content: `${commentDraft}`,
    });
    // store.youTubeSong.comments += commentDraft;
    console.log(store.youTubeList);
    await store.updateCurrentList(store.youTubeList);
  };

  // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
  // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
  // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
  // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
  function onPlayerStateChange(event) {
    let playerStatus = event.data;
    let player = event.target;
    if (playerStatus === -1) {
      // VIDEO UNSTARTED
      console.log("-1 Video unstarted");
    } else if (playerStatus === 0) {
      // THE VIDEO HAS COMPLETED PLAYING
      console.log("0 Video ended");
      incSong();
      loadAndPlayCurrentSong(player);
    } else if (playerStatus === 1) {
      // THE VIDEO IS PLAYED
      console.log("1 Video played");
    } else if (playerStatus === 2) {
      // THE VIDEO IS PAUSED
      console.log("2 Video paused");
    } else if (playerStatus === 3) {
      // THE VIDEO IS BUFFERING
      console.log("3 Video buffering");
    } else if (playerStatus === 5) {
      // THE VIDEO HAS BEEN CUED
      console.log("5 Video cued");
    }
  }

  let handleChangeView = () => {
    store.changeYouTubeView();
    console.log("current view", store.currentYouTubeVideoView);
  };

  // let handlePauseContinue = () => {
    
  // }

  if (!store.youTubeList.published && !store.currentYouTubeVideoView) handleChangeView();

  let generateYouTubeView = () => {
    return (
      <div>
        <YouTube
          videoId={store.youTubeSong.youTubeId}
          opts={playerOptions}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
        />

        <Grid container>
        <Grid item xs={2}/>
          <Grid item xs={2}>
            <Button onClick={decSong} paddingRight={"50%"}>
              <SkipPreviousIcon
                sx={{
                  fontSize: 40,
                  color: "#736e62",
                }}
              />
            </Button>
          </Grid>

          {/* <Grid item xs={1}>
            <Button onClick={handlePauseContinue}>
              <StopIcon
                sx={{
                  fontSize: 40,
                  color: "#736e62",
                }}
              />
            </Button>
          </Grid>
                
          <Grid item xs={1}>
            <Button onClick={handlePauseContinue}>
              <PlayArrowIcon
                sx={{
                  fontSize: 40,
                  color: "#736e62",
                }}
              />
            </Button>
          </Grid> */}

          <Grid item xs={2}>
            <Button onClick={incSong}>
              <SkipNextIcon
                sx={{
                  fontSize: 40,
                  color: "#736e62",
                }}
              />
            </Button>
          </Grid>

        </Grid>
        

        <Box
          sx={{
            width: "340px",
            backgroundColor: "lightgray",
            borderRadius: "20px",
          }}
        >
          <Grid container rowGap="5px">
            <Grid item xs={12} sx={{ size: 30, paddingLeft: "36%" }}>
              <strong>Now Playing</strong>
            </Grid>

            <Grid item xs={3} />
            <Grid item xs={3}>
              Playlist:
            </Grid>
            <Grid item xs={5}>
              {store.youTubeList.name}
            </Grid>

            <Grid item xs={3} />
            <Grid item xs={3}>
              Title:
            </Grid>
            <Grid item xs={5}>
              {store.youTubeSong.title}
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={3}>
              Artist:
            </Grid>
            <Grid item xs={5}>
              {store.youTubeSong.artist}
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  };

  let generateCommentView = () => {
    console.log("Comment card", store.youTubeList.comments ? "t" : "f");

    return (
      <div>
        <Box
          sx={{
            backgroundColor: "lightgray",
            height: "320px",
            width: "90%",
            overflow: "scroll",
          }}
        >
          {store.youTubeList.comments ? generateCommentCard() : ""}
        </Box>

        {store.isGuest() ? (
          ""
        ) : (
          <div>
            <input
              id="commentInput"
              type="text"
              placeholder="Add Comment"
              onKeyDown={keyPress}
              style={{
                verticalAlign: "top",
                width: "70%",
              }}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              id="comment-input"
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    );
  };

  let generateCommentCard = () => {
   
    store.updateYouTubeListFromMem();
    let res = [];

    for (var i in store.youTubeList.comments) {
      let comment = store.youTubeList.comments[i];

      let c = <CommentCard user={comment.user} comment={comment.content} />;
      res.push(c);
    }
    return res;
  };

  return (
    <div>
      <span>
        <Button
          sx={{
            backgroundColor: store.currentYouTubeVideoView
              ? "#91908a"
              : "#dbdad9",
            color: "black",
            ":hover": {
              bgcolor: "#4d4a4a",
            },
            ":disabled": {
              color: "black",
            },
            border: "1px solid black",
          }}
          onClick={handleChangeView}
          disabled={store.currentYouTubeVideoView}
        >
          Player
        </Button>
        <Button
          sx={{
            backgroundColor: !store.currentYouTubeVideoView
              ? "#91908a"
              : !store.youTubeList.published
              ? "#454343"
              : "#dbdad9",
            color: "black",
            ":hover": {
              bgcolor: "#4d4a4a",
            },
            ":disabled": {
              color: "black",
            },
            border: "1px solid black",
          }}
          onClick={handleChangeView}
          disabled={
            !store.currentYouTubeVideoView || !store.youTubeList.published
          }
        >
          Comments
        </Button>
      </span>

      {store.currentYouTubeVideoView
        ? generateYouTubeView()
        : generateCommentView()}
    </div>
  );
}
