import { useEffect, useState, useRef, Fragment } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";
import Peer from "peerjs";

import SendIcon from "@material-ui/icons/Send";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import SkipNextIcon from "@material-ui/icons/SkipNext";

import { makeStyles } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import CircularProgress from '@material-ui/core/CircularProgress';

import Message from "./components/message";

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
  const classes = useStyles();
  const myVideoRef = useRef();
  const userVideoRef = useRef();
  const canvasRef = useRef();
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [guestId, setGuestId] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [messages, setMessages] = useState([]);

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
          // host: "webrtc-peer-to-peer.herokuapp.com",
          // port: 433,
          // path: "/",
          // secure: true
        });

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        addVideoStream(stream, true);

        socket.on("message-recieved", ($message) => {
          setMessages([...messages, $message]);
        });

        socket.on("paired-to-room", ({ room }) => {
          const peerIdArr = room.split("#");
          const guestId = peerIdArr[0] === userId ? peerIdArr[1] : peerIdArr[0];
          if (peerIdArr[0] === userId) {
            const call = peer.call(guestId, stream);
            call.on("stream", (userVideoStream) => {
              addVideoStream(userVideoStream);
            });
            socket.on("peer-disconnected", (_) => {
              call.close();
              socket.off("peer-disconnected", () => {});
            });
            call.on("close", (_) => {
              endCall(true);
              setMessages([]);
            });
          }
          setGuestId(guestId);
          setRoomId(room);
        });

        peer.on("error", (e) => {
          console.log(e);
        });

        peer.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (userVideoStream) => {
            addVideoStream(userVideoStream);
          });
          socket.on("peer-disconnected", (_) => {
            call.close();
          });
          call.on("close", (_) => {
            endCall(true);
            setMessages([]);
          });
        });
      } catch (e) {
        console.log(e);
      }
    };
    if (userId) getUserMedia();
  }, [userId]);

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
    <div className="root">
      <div className="video-grid">
        <div className="video-container">
          <video ref={userVideoRef} hidden={!roomId} />
          <canvas ref={canvasRef} hidden={roomId} />
        </div>
        <div className="video-container">
          <video ref={myVideoRef} />
        </div>
      </div>

      <div className="bottom-group">
        <div className="room-controls">
          {isSearching ? (
            <IconButton style={{ marginLeft: 25 }}>
              <StopIcon className={classes.playButton} />
            </IconButton>
          ) : !isSearching && userId (
            <IconButton
              onClick={() => {
                setIsSearching(true);
                socket.emit("pair-to-room");
              }}
            >
              <PlayArrowIcon className={classes.playButton} />
            </IconButton>
          ) : <CircularProgress />}
          {roomId && (
            <IconButton onClick={skipCall}>
              <SkipNextIcon className={classes.skipButton} />
            </IconButton>
          )}
        </div>

        <div className="room-messages">
          <div className="messages-container">
            {messages.map((m, i) => (
              <Message key={i} message={m} userId={userId} />
            ))}
          </div>

          <FormControl className="message-input">
            <Input
              type="text"
              disableUnderline={true}
              value={message}
              placeholder="Type your message here and press Enter"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton>
                    <InsertEmoticonIcon />
                  </IconButton>
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
  );
};

export default App;
