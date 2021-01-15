import { useEffect, useState, useRef, Fragment } from "react";
import socketIOClient from "socket.io-client";
import Peer from "peerjs";
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
  const callR = useSelector((state) => state.peer.call);
  const facingMode = useSelector((state) => state.peer.facingMode);
  const dispatch = useDispatch();

  const classes = useStyles();
  const myVideoRef = useRef();
  const userVideoRef = useRef();
  const canvasRef = useRef();
  const msgsContainerRef = useRef();
  const msgsContainerMobileRef = userRef();
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [guestId, setGuestId] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isShowingEmojiPicker, setIsShowingEmojiPicker] = useState(false);
  const [isShowingInput, setIsShowingInput] = useState(false);
  const [isMobile] = useState(
    window.innerWidth <= 500 && window.innerHeight <= 900
  );

  const endCall = (emitEvent = false) => {
    if (emitEvent) socket.emit("pair-to-room");

    setRoomId(null);
    setGuestId(null);
    userVideoRef.current.srcObject = null;
    setIsSearching(true);
  };

  useEffect(() => {
    socket.on("connection-rebound", (userId) => {
      setUserId(userId);
      socket.off("connection-rebound", (_) => {});
    });

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    var time = 0;
    var intervalId = 0;

    const makeNoise = () => {
      const imgd = context.createImageData(canvas.width, canvas.height);
      const pix = imgd.data;

      for (var i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = pix[i + 1] = pix[i + 2] = 250 * Math.random();
        pix[i + 3] = 255;
      }

      context.putImageData(imgd, 0, 0);
      time = (time + 1) % canvas.height;
    };

    intervalId = setInterval(makeNoise, 40);
  }, []);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const peer = new Peer(userId, {
          // host: "/",
          // port: 3001,
          // path: "/",
          // secure: true
        });

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
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

        socket.on("paired-to-room", ({ room }) => {
          const peerIdArr = room.split("#");
          const guestId = peerIdArr[0] === userId ? peerIdArr[1] : peerIdArr[0];
          if (peerIdArr[0] === userId) {
            const call = peer.call(guestId, stream);
            dispatch({ type: "SET_CALL", payload: call });
            call.on("stream", (userVideoStream) => {
              addVideoStream(userVideoStream);
            });
            socket.on("peer-disconnected", (_) => {
              call.close();
              socket.off("peer-disconnected", () => {});
            });
            call.on("close", (_) => {
              endCall(true);
              dispatch({ type: "CLEAR_MESSAGES" });
            });
          }

          setGuestId(guestId);
          setRoomId(room);
        });

        peer.on("error", (e) => {
          console.log(e);
        });

        peer.on("call", (call) => {
          dispatch({ type: "SET_CALL", payload: call });
          call.answer(stream);
          call.on("stream", (userVideoStream) => {
            addVideoStream(userVideoStream);
          });
          socket.on("peer-disconnected", (_) => {
            call.close();
          });
          call.on("close", (_) => {
            endCall(true);
            dispatch({ type: "CLEAR_MESSAGES" });
          });
        });
      } catch (e) {
        console.log(e);
      }
    };
    if (userId) getUserMedia();
  }, [userId]);

  const replaceTrack = async () => {
    try {
      const oldTrack = callR.peerConnection.getSenders()[1];
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode == "user" ? "environment" : "user" },
        audio: false,
      });
      const videoTrack = stream.getVideoTracks()[0];
      oldTrack.replaceTrack(videoTrack);
    } catch (e) {
      console.log(e);
    }
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
    socket.emit("message", { message, sentBy: userId });
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
                      <StartButton
                        setIsSearching={setIsSearching}
                        socket={socket}
                      />
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
                    <Message key={i} message={m} userId={userId} />
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
                      <StartButton
                        setIsSearching={setIsSearching}
                        socket={socket}
                      />
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
                    <Message key={i} message={m} userId={userId} />
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
