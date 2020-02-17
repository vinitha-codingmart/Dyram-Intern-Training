function enterCall() {
  console.log("Call entered");
  let streamName = document.getElementById("streamName").value;
  if (streamName == "") {
    alert("Stream name empty");
  } else if (streamName.length < 5) {
    alert(
      "Stream name too short\n\nThe name of stream should be a minimum of 5 characters\n\nex : water-melon"
    );
  } else {
    console.log(streamName);
    localStorage.setItem("streamName", streamName);
    window.open("homez.html");
  }
}
