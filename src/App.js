import { useEffect, useState, useRef, Fragment } from "react";
import socketIOClient from "socket.io-client";
import Peer from "peerjs";
import { connect, useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import BottomPage from "./components/bottom-page";
import StopButton from "./components/stop-button";
import { CanvasArt } from "./helpers";
import SplashScreen from "./components/splash-screen";
import SkipButton from "./components/skip-button";
import AdPlaceholder from "./components/ad-container";
import DesktopMessages from "./components/desktop-messages";
import MobileBottomBar from "./components/mobile/mobile-bottom-bar";
import MobileMessages from "./components/mobile/mobile-messages";
import StartButton from "./components/start-button";

const socket = socketIOClient();

const useStyles = makeStyles(() => ({
  playButton: {
    color: "#FFF",
    fontSize: 82,
  },
  skipButton: {
    color: "#FFF",
    fontSize: 50,
  },
}));

const App = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { userId, roomId, guestId, isSearching } = useSelector(
    (state) => state.user
  );
  const callR = useSelector((state) => state.peer.call);
  const facingMode = useSelector((state) => state.peer.facingMode);
  const { isShowingInput, isKeyboardFocused } = useSelector(
    (state) => state.mobile
  );

  const myVideoRef = useRef();
  const userVideoRef = useRef();
  const canvasRef = useRef();

  const [isMobile] = useState(
    window.innerWidth <= 500 && window.innerHeight <= 900
  );

  const endCall = (call) => {
    dispatch({ type: "END_CALL" });
    dispatch({ type: "CLEAR_MESSAGES" });
    userVideoRef.current.srcObject = null;
    socket.emit("pair-to-room");
    call.close();
  };

  const disconnect = (call) => {
    dispatch({ type: "DISCONNECT" });
    dispatch({ type: "CLEAR_MESSAGES" });
    userVideoRef.current.srcObject = null;
    call.close();
  };

  useEffect(() => {
    socket.once("connection-rebound", (clientId) => {
      dispatch({ type: "SET_USER_ID", payload: clientId });
    });
    CanvasArt(canvasRef);
  }, []);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const peer = new Peer(userId, {});
        peer.on("error", (e) => {
          console.log(e);
        });

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { min: 1024, ideal: 1280, max: 1920 },
            height: { min: 576, ideal: 720, max: 1080 },
          },
          audio: true,
        });

        addVideoStream(stream, true);

        socket.on("paired-to-room", ({ room }) => {
          const peerIdArr = room.split("#");
          const guestId = peerIdArr[0] === userId ? peerIdArr[1] : peerIdArr[0];
          if (peerIdArr[0] === userId) {
            const call = peer.call(guestId, stream);
            dispatch({ type: "SET_CALL", payload: call });
            socket.on("peer-disconnected", (_) => {
              endCall(call);
            });
            socket.on("calls-disconnected", (_) => {
              disconnect(call);
            });
          }
          dispatch({ type: "SET_GUEST_ID", payload: guestId });
          dispatch({ type: "SET_ROOM_ID", payload: room });
        });

        peer.on("call", (call) => {
          dispatch({ type: "SET_CALL", payload: call });
          call.answer(stream);

          socket.on("peer-disconnected", (_) => {
            endCall(call);
          });
          socket.on("calls-disconnected", (_) => {
            disconnect(call);
          });
        });
      } catch (e) {
        console.log(e);
      }
    };
    if (userId) getUserMedia();
  }, [userId]);

  useEffect(() => {
    if (callR) {
      callR.on("stream", (userVideoStream) => {
        addVideoStream(userVideoStream);
      });
    }
  }, [callR]);

  const replaceTrack = async () => {
    // try {
    //   const oldTrack = callR.peerConnection.getSenders()[1];
    //   const stream = await navigator.mediaDevices.getUserMedia({
    //     video: { facingMode: facingMode == "user" ? "environment" : "user" },
    //     audio: false,
    //   });
    //   const videoTrack = stream.getVideoTracks()[0];
    //   oldTrack.replaceTrack(videoTrack);
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const addVideoStream = (stream, isMine = false) => {
    (isMine ? myVideoRef : userVideoRef).current.srcObject = stream;
    (isMine ? myVideoRef : userVideoRef).current.addEventListener(
      "loadedmetadata",
      (_) => {
        if (isMine) myVideoRef.current.muted = true;
        (isMine ? myVideoRef : userVideoRef).current.play();
      }
    );
  };

  return (
    <Fragment>
      {!isMobile ? (
        <Fragment>
          <div className="root">
            <div
              className="video-grid"
              onClick={() => {
                dispatch({ type: "SHOW_EMOJI_PICKER", payload: false });
              }}
            >
              <div className="video-container">
                <video ref={userVideoRef} hidden={!roomId} />
                <canvas ref={canvasRef} hidden={roomId} />
                <AdPlaceholder />
                <SplashScreen socket={socket} />
              </div>
              <div className="video-container">
                <video ref={myVideoRef} />
              </div>
            </div>

            <div className="bottom-group">
              <div
                className="room-controls"
                onClick={() => {
                  dispatch({ type: "SHOW_EMOJI_PICKER", payload: false });
                }}
              >
                <StartButton hide socket={socket} />
                <StopButton socket={socket} />
                {isSearching && !roomId && <CircularProgress />}
                <SkipButton socket={socket} />
              </div>

              <DesktopMessages socket={socket} />
            </div>
          </div>
          <BottomPage />
        </Fragment>
      ) : (
        <Fragment>
          <div className={`mobile-root ${isKeyboardFocused ? "small" : ""}`}>
            <div className="video-grid-mobile">
              <div className="video-container-mobile wide">
                {roomId ? (
                  <div className="spinner">
                    <CircularProgress size={80} />
                  </div>
                ) : (
                  <Fragment />
                )}
                <video playsInline={true} ref={userVideoRef} />
                <canvas ref={canvasRef} hidden={roomId} />
                <AdPlaceholder />
                <SplashScreen socket={socket} />
              </div>

              <div
                className={`video-container-mobile my-mobile-video ${
                  isKeyboardFocused ? "hide" : "show"
                }`}
              >
                <video playsInline={true} ref={myVideoRef} />
                <MobileMessages socket={socket} />
              </div>
            </div>
            <div className="bottom-part-container-mobile">
              <div
                className={
                  !isShowingInput
                    ? "bottom-part-mobile"
                    : "bottom-part-mobile white"
                }
              >
                {isSearching && !roomId ? (
                  <CircularProgress />
                ) : (
                  <MobileBottomBar socket={socket} />
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default connect(null, {})(App);
