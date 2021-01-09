import { useEffect, useState, useRef, Fragment } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";
import Peer from "peerjs";

import SendIcon from "@material-ui/icons/Send";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";

const socket = socketIOClient();

const App = () => {
  const myVideoRef = useRef();
  const userVideoRef = useRef();
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [guestId, setGuestId] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  let peerRef;

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
    });

    socket.on("message-recieved", (message) => {
      console.log(message);
    });
  }, []);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const peer = new Peer(userId, {
          host: "/",
          port: "3001",
          path: "/",
        });

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        addVideoStream(stream, true);

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
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div className="root">
      <div className="video-grid">
        <video ref={myVideoRef} />
        <video ref={userVideoRef} />
      </div>

      <div className="bottom-group">
        <div className="room-controls">
          <button
            onClick={() => {
              setIsSearching(true);
              socket.emit("pair-to-room");
            }}
          >
            START
          </button>
          <button onClick={skipCall}>SKIP</button>
        </div>

        <div className="room-messages">
          <div className="messages-container">
            <h1>Test</h1>
          </div>
          <div className="messages-form">

            <FormControl className="message-input">
              <Input
                type="text"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={sendMessage}></IconButton>
                    <SendIcon />
                  </InputAdornment>
                }
              />
            </FormControl>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
