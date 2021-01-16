import { useEffect, useState, useRef, Fragment } from "react";
import socketIOClient from "socket.io-client";
import Peer from "peerjs";
import { v4 as uuidv4 } from "uuid";
import { connect, useSelector, useDispatch } from "react-redux";
import SendIcon from "@material-ui/icons/Send";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import StopIcon from "@material-ui/icons/Stop";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import CloseIcon from "@material-ui/icons/Close";
import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroid";
import ChatIcon from "@material-ui/icons/Chat";
import { makeStyles } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import CircularProgress from "@material-ui/core/CircularProgress";
import Message from "./components/message";
import BottomPage from "./components/bottom-page";
import Picker from "emoji-picker-react";
import GenderButton from "./components/gender-button";
import StartButton from "./components/start-button";
import { CanvasArt, randomIntFromInterval } from "./helpers";

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
  const messages = useSelector((state) => state.messages.messages);
  const { gender, userId, roomId, guestId, isSearching } = useSelector(
    (state) => state.user
  );
  const callR = useSelector((state) => state.peer.call);
  const facingMode = useSelector((state) => state.peer.facingMode);
  const dispatch = useDispatch();

  const classes = useStyles();
  const myVideoRef = useRef();
  const userVideoRef = useRef();
  const canvasRef = useRef();
  const msgsContainerRef = useRef();
  const msgsContainerMobileRef = useRef();
  const [message, setMessage] = useState("");

  const [isShowingEmojiPicker, setIsShowingEmojiPicker] = useState(false);
  const [isShowingInput, setIsShowingInput] = useState(false);
  const [isMobile] = useState(
    window.innerWidth <= 500 && window.innerHeight <= 900
  );

  const endCall = () => {
    dispatch({ type: "END_CALL" });
    dispatch({ type: "CLEAR_MESSAGES" });
    userVideoRef.current.srcObject = null;
    if (callR) callR.close();
  };

  useEffect(() => {
    socket.on("connect", (_) => {
      const id = uuidv4();
      socket.emit("store-user-id", { id });
      dispatch({ type: "SET_USER_ID", payload: id });
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
          video: true,
          audio: true,
        });

        addVideoStream(stream, true);
        socket.on("message-recieved", ($message) => {
          dispatch({ type: "ADD_MESSAGE", payload: $message });
          if (isMobile) {
            msgsContainerMobileRef.current.scrollTop =
              msgsContainerMobileRef.current.scrollHeight;
          } else {
            msgsContainerRef.current.scrollTop =
              msgsContainerRef.current.scrollHeight;
          }
        });
        socket.on("peer-disconnected", (_) => {
          endCall();
        });

        socket.on("paired-to-room", ({ room }) => {
          const peerIdArr = room.split("#");
          const guestId = peerIdArr[0] === userId ? peerIdArr[1] : peerIdArr[0];
          if (peerIdArr[0] === userId) {
            const call = peer.call(guestId, stream);
            dispatch({ type: "SET_CALL", payload: call });
          }
          dispatch({ type: "SET_GUEST_ID", payload: guestId });
          dispatch({ type: "SET_ROOM_ID", payload: room });
        });

        peer.on("call", (call) => {
          dispatch({ type: "SET_CALL", payload: call });
          call.answer(stream);
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
      callR.on("close", (_) => {
        console.log('>> CALL CLOSED');
        console.log('>> PAIRING TO NEW ROOM');
        socket.emit("pair-to-room");
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

  const skipCall = () => {
    if (roomId) socket.emit("skip", { room: roomId });
  };

  const sendMessage = () => {
    socket.emit("message", { message, sentBy: userId, gender });
    setMessage("");
  };

  return (
    <Fragment>
      {!isMobile ? (
        <Fragment>
          <div className="root">
            <div className="video-grid">
              <div className="video-container">
                <video ref={userVideoRef} hidden={!roomId} />
                <canvas ref={canvasRef} hidden={roomId} />
                {!!(userId && !roomId && !isSearching) && (
                  <div className="overlay">
                    <div className="buttons-container">
                      <GenderButton />
                      <StartButton socket={socket} />
                    </div>
                  </div>
                )}
              </div>
              <div className="video-container">
                <video ref={myVideoRef} />
              </div>
            </div>

            <div className="bottom-group">
              <div className="room-controls">
                {!isSearching && roomId ? (
                  <IconButton style={{ marginLeft: 25 }}>
                    <StopIcon className={classes.playButton} />
                  </IconButton>
                ) : isSearching && !roomId ? (
                  <CircularProgress />
                ) : (
                  <Fragment></Fragment>
                )}
                {roomId && (
                  <IconButton onClick={skipCall}>
                    <SkipNextIcon className={classes.skipButton} />
                  </IconButton>
                )}
              </div>

              <div className="room-messages">
                <div className="messages-container" ref={msgsContainerRef}>
                  {messages.map((m, i) => (
                    <Message key={i} message={m} />
                  ))}
                </div>

                <FormControl className="message-input">
                  <Input
                    style={{ position: "relative" }}
                    type="text"
                    disableUnderline={true}
                    value={message}
                    placeholder="Type your message here and press Enter"
                    onKeyPress={(e) => {
                      const { charCode } = e;
                      if (charCode === 13) {
                        sendMessage();
                        setIsShowingEmojiPicker(false);
                      }
                    }}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setIsShowingEmojiPicker(!isShowingEmojiPicker);
                          }}
                        >
                          <InsertEmoticonIcon />
                        </IconButton>

                        <div
                          style={{
                            display: isShowingEmojiPicker ? "block" : "none",
                          }}
                        >
                          <Picker
                            onEmojiClick={($event, o) => {
                              const { emoji } = o;
                              setMessage(message.concat(emoji));
                            }}
                            groupNames={{ smileys_people: "yellow faces" }}
                            disableSearchBar={true}
                            disableSkinTonePicker={true}
                          />
                        </div>

                        <IconButton onClick={sendMessage}>
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
            </div>
          </div>
          <BottomPage />
        </Fragment>
      ) : (
        <Fragment>
          <div id="mobile-root">
            <div className="video-grid-mobile">
              <div className="video-container-mobile wide">
                <video ref={userVideoRef} hidden={!roomId} />
                <canvas ref={canvasRef} hidden={roomId} />
                {!!(userId && !roomId && !isSearching) && (
                  <div className="overlay">
                    <div className="buttons-container">
                      <GenderButton />
                      <StartButton socket={socket} />
                    </div>
                  </div>
                )}
              </div>
              <div className="video-container-mobile">
                <video ref={myVideoRef} />
                <div
                  className="messages-container-mobile"
                  ref={msgsContainerMobileRef}
                >
                  {messages.map((m, i) => (
                    <Message key={i} message={m} />
                  ))}
                </div>
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
                ) : !isSearching && !roomId ? (
                  <Fragment />
                ) : (
                  <Fragment>
                    {!isShowingInput && (
                      <IconButton
                        onClick={() => {
                          setIsShowingInput(true);
                        }}
                      >
                        <ChatIcon style={{ color: "#FFF" }} />
                      </IconButton>
                    )}
                    {isShowingInput ? (
                      <div className="input-mobile">
                        <IconButton
                          onClick={() => {
                            setIsShowingInput(false);
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                        <FormControl className="message-input-mobile">
                          <Input
                            style={{ position: "relative" }}
                            disableUnderline={true}
                            value={message}
                            placeholder="Type your message here"
                            onKeyPress={(e) => {
                              const { charCode } = e;
                              if (charCode === 13) {
                                sendMessage();
                              }
                            }}
                            onChange={(e) => {
                              setMessage(e.target.value);
                            }}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton onClick={sendMessage}>
                                  <SendIcon />
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </div>
                    ) : (
                      <Fragment>
                        <IconButton onClick={replaceTrack}>
                          <FlipCameraAndroidIcon style={{ color: "#FFF" }} />
                        </IconButton>
                        <IconButton>
                          <StopIcon style={{ color: "#FFF" }} />
                        </IconButton>
                        <IconButton onClick={skipCall}>
                          <SkipNextIcon style={{ color: "#FFF" }} />
                        </IconButton>
                      </Fragment>
                    )}
                  </Fragment>
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
