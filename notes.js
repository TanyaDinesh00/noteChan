function Note(date, title, body, color) {
  this.date = date;
  this.title = title;
  this.body = body;
  this.color = color;
}

const btnSave = document.getElementById("btnSave");
const btnCancel = document.getElementById("btnCancel");

let notes = "";
init();

function init() {
  let out = "";
  let noteArray = JSON.parse(localStorage.getItem("noteData"));
  displayAllNotes();
  if (noteArray != null && noteArray != "") {
    // noteArray = JSON.parse(localStorage.getItem("noteData"));

    // for (let x = 0; x < noteArray.length; x++) {
    //   out += "<option value=" + x + ">" + noteArray[x].title + "</option>";
    // }
    // document.getElementById("noteMaster").innerHTML = out;
    // document
    //   .getElementById("noteMaster")
    //   .addEventListener("click", function (e) {
    //     displayNote(e.target.value);
    //   });
  } else {
    document.getElementById('allNotes').innerHTML = "<h1>Nothing here!</h1> <br> <h2>Click on Create new note.</h2>"
  }
  readNotes();
  document.getElementById("btnWrite").addEventListener("click", function (e) {
    writeNote();
  });

}

function readNotes() {
  document.getElementById("read").style.display = "block";
  document.getElementById("write").style.display = "none";
}

function writeNote() {
  document.getElementById("read").style.display = "none";
  document.getElementById("write").style.display = "block";
  document.getElementById("noteTitle").value = "";
  document.getElementById("noteBody").value = "";
}

// function displayNote(note) {
//   let noteArray = JSON.parse(localStorage.getItem("noteData"));
//   let out = "<h2>" + noteArray[note].title + "</h2>";
//   out += "<h4>Date: " + new Date(noteArray[note].date).toString() + "</h4>"; //check madi
//   out += "<p>" + noteArray[note].body + "</p>";
//   out +=
//     "<button id = 'btnDelete' class = 'btn btn-primary mb-2 '>Delete</button>";
//   document.getElementById("noteDisplay").innerHTML = out;
//   document.getElementById("btnDelete").onclick = function () {
//     noteArray.splice(note, 1);
//     localStorage.setItem("noteData", JSON.stringify(noteArray));
//     init();
//   };
// }
function displayAllNotes() {
  let noteArray = JSON.parse(localStorage.getItem("noteData"));
  document.getElementById("allNotes").innerHTML = null;
  let out = "";
  for (let x = 0; x < noteArray.length; x++) {
    out +=
      "<div class = 'col-lg-6 noteCover item'><div class = 'noteDisplay' style='background-color: "+ noteArray[x].color +" ;'>" +
      "<h3>" +
      noteArray[x].title +
      "</h3>" +
      "<h5>Date: " +
      new Date(noteArray[x].date).toDateString() +
      "</h5>" +
      "<p>" +
      noteArray[x].body +
      "</p>" +
      "<button id = 'btnDelete" +
      x +
      "' class = 'btn btn-primary mb-2 '>Delete</button>" +
      "<button id = 'btnEdit" +
      x +
      "' class = 'btn btn-primary mb-2 '>Edit</button>" +
      "</div></div>";
  }
  document.getElementById("allNotes").innerHTML = out;
  for (let x = 0; x < noteArray.length; x++) {
    document.getElementById("btnDelete" + x).onclick = function () {
      console.log("Delete " + x);
      noteArray.splice(x, 1);
      localStorage.setItem("noteData", JSON.stringify(noteArray));
      init();
    };
    document.getElementById("btnEdit" + x).onclick = function () {
      console.log("edit " + x);
      let tempTitle = noteArray[x].title;
      let tempBody = noteArray[x].body;
      noteArray.splice(x, 1);
      writeNote();
      localStorage.setItem("noteData", JSON.stringify(noteArray));
      document.getElementById("noteTitle").value = tempTitle;
      document.getElementById("noteBody").value = tempBody;
    };
  }
}
btnSave.onclick = function () {
  const noteDate = new Date();
  const noteTitle = document.getElementById("noteTitle").value;
  const noteBody = document.getElementById("noteBody").value;
  const noteColor = document.getElementById("noteColor").value;
  const noteObj = new Note(noteDate, noteTitle, noteBody, noteColor);
  saveNote(noteObj);
  console.log("Save Clicked " + noteObj.title +noteObj.color );
};
btnCancel.onclick = function () {
  readNotes();
};
function saveNote(noteObj) {
  console.log("Saving note");
  let noteArray = JSON.parse(localStorage.getItem("noteData"));
  if (noteObj == null) {
    noteArray = new Array();
    noteArray.push(noteObj);
  } else {
    noteArray.push(noteObj);
  }
  localStorage.setItem("noteData", JSON.stringify(noteArray));
  readNotes();
  init();
}
