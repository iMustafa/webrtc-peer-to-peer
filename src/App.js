import { useEffect, useState, useRef, Fragment } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";
import Peer from "peerjs";

const socket = socketIOClient();

const App = () => {
  const myVideoRef = useRef();
  const userVideoRef = useRef();
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [guestId, setGuestId] = useState(null);
  const [videoStream, setVideoStream] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  let peerRef;

  const endCall = (emitEvent = false) => {
    if (emitEvent) socket.emit("pair-to-room");

    setRoomId(null);
    setGuestId(null);
    userVideoRef.current.remove();
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
          audio: true,
        });
        setVideoStream(stream);
        addVideoStream(stream, true);

        socket.on("paired-to-room", ({ room }) => {
          const peerIdArr = room.split("#");
          const guestId = peerIdArr[0] === userId ? peerIdArr[1] : peerIdArr[0];
          if (peerIdArr[0] === userId) {
            const call = peer.call(guestId, stream);
            call.on("stream", (userVideoStream) => {
              addVideoStream(userVideoStream);
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
          console.log('>> Call Recieved');
          call.on("stream", (userVideoStream) => {
            addVideoStream(userVideoStream);
          });
          socket.on("peer-disconnected", (_) => {
            call.close();
            endCall();
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

  const sendMessage = () => {
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <Fragment>
      <div id="video-grid">
        <video ref={myVideoRef} />
        <video ref={userVideoRef} />
      </div>
      <div>
        <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button onClick={sendMessage}>Send</button>
        <h1>
          {roomId ? roomId : isSearching ? "SEARCHING FOR ROOM" : "Not Started"}
        </h1>
        <h1>{userId}</h1>
        <button
          onClick={() => {
            setIsSearching(true);
            socket.emit("pair-to-room");
          }}
        >
          START
        </button>
        <button
          onClick={() => {
            setRoomId(null);
            setGuestId(null);
            socket.emit("pair-to-room");
            userVideoRef.current.remove();
          }}
        >
          SKIP
        </button>
      </div>
    </Fragment>
  );
};

export default App;