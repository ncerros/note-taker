var $noteTitle = $('.note-title');
var $noteText = $('.note-textarea');
var $saveNoteBtn = $('.save-note');
var $newNoteBtn = $('.new-note');
var $noteList = $('.list-container .list-group');

// It will detect when note communicates with textarea
var activeNote = {};

//This function will communicate with the db 
var getNotes = function() {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "GET"
  });
}; 

// this function will save notes
var saveNote = function(note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

// This function will clear out the notes from the db
var deleteNote = function(id) {
  return $.ajax({
    url: "/api/notes" + id,
    data: note,
    method: "DELETE"
  })
};  

//renderActiveNote function will show or clear out any input
var renderActiveNote = function() {
  $saveNoteBtn.hide();

  if (typeof activeNote.id === 'number') {
     $noteTitle.attr('readonly', true);
     $noteText.attr('readonly', true);
     $noteTitle.val(activeNote.title);
     $noteText.val(activeNote.text);
  } else {
     $noteTitle.attr('readonly', false);
     $noteText.attr('readonly', false);
     $noteTitle.val('');
     $noteText.val('');
  }
};

// This function will manage inputs then save them and display them in the app
var handleNoteSave = function() {
  var newNote = {
    title: $noteTitle.val(),
    text: $noteTitle.val()
  };
  saveNote(newNote);
  myRenderNotes();
  renderActiveNote();
};

//  it will clear out the event
var handleNoteDelete = function(event) {
// it will prevent from reapeating calls when clicked
event.stopPropagation();

var note = $(this).data('id');

if (activeNote.id === note) {
  activeNote = {};
}

deleteNote(note);
myRenderNotes();
renderActiveNote();
};

//activeNote will display its content
var handleNoteView = function() {
activeNote = $(this).data();
renderActiveNote();
};

// it will clean all objects so the user enter new data
var handleNewNoteView = function() {
activeNote = {};
renderActiveNote();
};

// it will display or hide when title or text notes are empty
var handleRenderSaveBtn = function() {
if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
  $saveNoteBtn.hide();
} else {
  $saveNoteBtn.show();
}
};

// this function will provide the titles to note list
var renderNoteList = function(notes) {
$noteList.empty();

var noteListItems = [];

for (var i = 0; i < notes.length; i++) {
  var note = notes[i];

  var $li = $("<li class='list-group-item'>").data(note);
  $li.data('id',i);

  var $span = $("<span>").text(note.title);
  var $delBtn = $(
    "<i class='fas fa-trash-alt float-right text-danger delete-note' data-id="+i+">"
  );

  $li.append($span, $delBtn);
  noteListItems.push($li);
}

$noteList.append(noteListItems);
};

// this function will find the notes and provide to the event
var myRenderNotes = function() {
return getNotes().then(function(data) {
  renderNoteList(data);
});
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// It will initialized the proccess to get a list of notes
myRenderNotes();
  