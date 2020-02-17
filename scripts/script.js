/**
 * @name handleFail
 * @param err - error thrown by any function
 * @description Helper function to handle errors
 */
let handleFail = function(err) {
  console.log("Error : ", err);
};

// Queries the container in which the remote feeds belong
let remoteContainer = document.getElementById("remote-container");
let canvasContainer = document.getElementById("canvas-container");
/**
 * @name addVideoStream
 * @param streamId
 * @description Helper function to add the video stream to "remote-container"
 */
function addVideoStream(streamId) {
  let streamDiv = document.createElement("div"); // Create a new div for every stream
  streamDiv.id = streamId; // Assigning id to div
  streamDiv.style.transform = "rotateY(180deg)"; // Takes care of lateral inversion (mirror image)
  remoteContainer.appendChild(streamDiv); // Add new div to container
}
/**
 * @name removeVideoStream
 * @param evt - Remove event
 * @description Helper function to remove the video stream from "remote-container"
 */
function removeVideoStream(evt) {
  let stream = evt.stream;
  stream.stop();
  let remDiv = document.getElementById(stream.getId());
  remDiv.parentNode.removeChild(remDiv);
  console.log("Remote stream is removed " + stream.getId());
}

function doVideo() {
  //Stream name
  let streamName = localStorage.getItem("streamName");

  var rtc = {
    client: null,
    joined: false,
    published: false,
    localStream: null,
    remoteStreams: [],
    params: {},
    streamName: streamName
  };

  // Client Setup
  // Defines a client for RTC
  rtc.client = AgoraRTC.createClient({
    mode: "live",
    codec: "h264"
  });

  // Client Setup
  // Defines a client for Real Time Communication
  rtc.client.init(
    "fa04cfb20f564d6284e84ccedea717a0",
    () => {
      console.log("AgoraRTC client initialized");
      rtc.client.join(
        null,
        rtc.streamName,
        null,
        uid => {
          // Stream object associated with your web cam is initialized
          let localStream = AgoraRTC.createStream({
            streamID: uid,
            audio: true,
            video: true,
            screen: false
          });

          // Associates the stream to the client
          localStream.init(function() {
            //Plays the localVideo
            localStream.play("me");

            //Publishes the stream to the channel
            rtc.client.publish(localStream, handleFail);
          }, handleFail);

          //When a stream is added to a channel
          rtc.client.on("stream-added", async function(evt) {
            client.subscribe(evt.stream, handleFail);
          });
          //When you subscribe to a stream
          rtc.client.on("stream-subscribed", async function(evt) {
            let stream = evt.stream;
            addVideoStream(stream.getId());
            stream.play(stream.getId());
          });
          //When a person is removed from the stream
          rtc.client.on("stream-removed", removeVideoStream);
          rtc.client.on("peer-leave", removeVideoStream);
        },
        handleFail
      );
    },
    handleFail
  );

  rtc.client.getSessionStats(stats => {
    console.log("S E S S I O N S");
    console.log(`Current Session Duration: ${stats.Duration}`);
    console.log(`Current Session UserCount: ${stats.UserCount}`);
    console.log(`Current Session SendBytes: ${stats.SendBytes}`);
    console.log(`Current Session RecvBytes: ${stats.RecvBytes}`);
    console.log(`Current Session SendBitrate: ${stats.SendBitrate}`);
    console.log(`Current Session RecvBitrate: ${stats.RecvBitrate}`);
  });

  // The client joins the channel
  rtc.client.join(
    null,
    rtc.streamName,
    null,
    uid => {
      // Stream object associated with your web cam is initialized
      let localStream = AgoraRTC.createStream({
        streamID: uid,
        audio: true,
        video: true,
        screen: false
      });

      // Associates the stream to the client
      localStream.init(function() {
        //Plays the localVideo
        localStream.play("me");

        //Publishes the stream to the channel
        rtc.client.publish(localStream, handleFail);
      }, handleFail);

      //When a stream is added to a channel
      rtc.client.on("stream-added", async function(evt) {
        client.subscribe(evt.stream, handleFail);
      });
      //When you subscribe to a stream
      rtc.client.on("stream-subscribed", async function(evt) {
        let stream = evt.stream;
        addVideoStream(stream.getId());
        stream.play(stream.getId());
      });
      //When a person is removed from the stream
      rtc.client.on("stream-removed", removeVideoStream);
      rtc.client.on("peer-leave", removeVideoStream);
    },
    handleFail
  );

  rtc.client.getSessionStats(stats => {
    console.log("S E S S I O N S");
    console.log(`Current Session Duration: ${stats.Duration}`);
    console.log(`Current Session UserCount: ${stats.UserCount}`);
    console.log(`Current Session SendBytes: ${stats.SendBytes}`);
    console.log(`Current Session RecvBytes: ${stats.RecvBytes}`);
    console.log(`Current Session SendBitrate: ${stats.SendBitrate}`);
    console.log(`Current Session RecvBitrate: ${stats.RecvBitrate}`);
  });
}

/*Handle call cut */
function callCut() {
  console.log("Call cut");
  close();
  return false;
}
function enterCall() {
  console.log("Call entered");
  window.open(
    "file:///home/system12/gitDemos/Agora-demo-web-master/index.html"
  );
}

function welcome() {
  // alert("Welcome to your stream...\nYour Stream Name is " + streamName);
  doVideo();
}
