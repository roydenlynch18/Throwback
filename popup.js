// popup.js

// Define Function loadStoredSessions()
// loadStoredSessions() querys all the current keys in google chrome's synced
// storage to find and keys that start with "sessionUrls" because these are
// the keys that store the applications saved sessions.
function loadStoredSessions() {
  // Retrieving Session Urls Keys from Storage

  // Initialize an Empty Array Variable for the "sessionUrls" Items
  var sessionUrlsKeys = []; //  Variable Must Be Defined Outside Chrome Call
  var sessionNameKeys = [];
  // Grabbing Storeage
  chrome.storage.sync.get(null, function(items) {
    // Allocate Keys to an Array Variable
    var allKeys = Object.keys(items);
    // Counter Variable for Inner Array Defining
    var j = 0;
    var k = 0;
    // Query the Keys
    for (var i = 0; i < allKeys.length; i++) {
      // Check if Current Key is a "sessionUrls" Key
      if (allKeys[i].substr(0,11) == "sessionUrls") {
        // Save it to New Array
        sessionUrlsKeys[j] = allKeys[i];
        // Increment New Array's Counter
        j++;
      }
      // Check if Current Key is a "sessionName" Key
      if (allKeys[i].substr(0,11) == "sessionName") {
        // Save it to New Array
        sessionNameKeys[k] = allKeys[i];
        // Increment New Array's Counter
        k++;
      }
    }
    // Console Logging for Debugging.
    chrome.extension.getBackgroundPage().console.log("All Keys Found in Storage: ");
    chrome.extension.getBackgroundPage().console.log(allKeys);
    chrome.extension.getBackgroundPage().console.log("Session Urls Keys Found in Storage: ");
    chrome.extension.getBackgroundPage().console.log(sessionUrlsKeys);
    chrome.extension.getBackgroundPage().console.log("Session Name Keys Found in Storage: ");
    chrome.extension.getBackgroundPage().console.log(sessionNameKeys);

    // Displays the Rows for the Proper Session Urls Keys on the Popup

    // Iterate Through Session Urls Keys
    for (var i = 0; i < sessionUrlsKeys.length; i++) {
      // Create the Row on the Popup
      createRow(parseInt(sessionUrlsKeys[i].substr(sessionUrlsKeys[i].length-1), 10),items[sessionNameKeys[i]]);
      // Console Logging for Debugging.
      chrome.extension.getBackgroundPage().console.log("Row "+parseInt(sessionUrlsKeys[i].substr(sessionUrlsKeys[i].length-1), 10)+" retrieved and displayed.");
    }
  });
}
// Calling loadStoredSessions() Function
loadStoredSessions();

// Define Function to Create New Row for a Session's Urls
// "createNewSession" is the buttom element on the popup representing a button to
// create a new session to save/open a collection of browsing tabs.
// The function will query the currently saved sessions and add one to the end.
let createNewSession = document.getElementById('createNewSession');
createNewSession.onclick = function(element) {
  // Getting Elements on the Popup that have a Class of "Row" (1 Row = HTML Displaying 1 Session)
  var elements = document.getElementsByClassName("row");
  // Optional Debugging Tool: (Displays All Row Ids that were Found)
  // var ids = [];
  // for (var i = 0; i < elements.length; i++) {
  //   ids[i] = elements[i].id;
  // }
  // chrome.extension.getBackgroundPage().console.log("Found Following Row Ids: ");
  // chrome.extension.getBackgroundPage().console.log(ids);
  // The New Row Index = The Index of the Last Row + 1 (Rows Begin at Row 0, Not 1)
  var row_num = elements.length-1+1;
  var promptText = prompt("Enter the title of this session!", "English Paper Research");
  // Create New Row
  createRow(row_num,promptText);
}

// Define Function to Delete Rows (& Stored Sessions Urls)
// "wipeAllSessions" is the buttom element on the popup representing a button to
// wipe all sessions.
// The function will query the currently stored sessions and simply remove them.
let wipeAllSessions = document.getElementById('wipeAllSessions');
wipeAllSessions.onclick = function(element) {

  // Removing Session Urls Keys from Storage

  // Initialize an Empty Array Variable for the "sessionUrls" Items to be Removed
  var sessionUrlsKeys = []; //  Variable Must Be Defined Outside Chrome Call
  var sessionNameKeys = []
  // Grabbing Storeage
  chrome.storage.sync.get(null, function(items) {
    // Allocate Keys to an Array Variable
    var allKeys = Object.keys(items);
    // Counter Variable for Inner Array Defining
    var j = 0;
    var k = 0;
    // Query the Keys
    for (var i = 0; i < allKeys.length; i++) {
      // Check if Current Key is a "sessionUrls" Key
      if (allKeys[i].substr(0,11) == "sessionUrls") {
        // Save it to New Array
        sessionUrlsKeys[j] = allKeys[i];
        // Increment New Array's Counter
        j++;
        // Remove It
        var sessionNumber = allKeys[i].substr(allKeys[i].length-1);
        document.getElementById("row"+sessionNumber.toString()).remove();
        chrome.storage.sync.remove(allKeys[i]);
      }
      // Check if Current Key is a "sessionName" Key
      if (allKeys[i].substr(0,11) == "sessionName") {
        // Save it to New Array
        sessionNameKeys[k] = allKeys[i];
        // Increment New Array's Counter
        k++;
        // Remove It
        chrome.storage.sync.remove(allKeys[i])
      }
    }
    // Console Logging for Debugging.
    chrome.extension.getBackgroundPage().console.log("Session Urls Keys Removed from Storage: ");
    chrome.extension.getBackgroundPage().console.log(sessionUrlsKeys);
  });
}

// Defining References to Buttons on Dropdown Menu
let saveSessionBtns = document.getElementsByClassName('saveSession');
let openSessionBtns = document.getElementsByClassName('openSession');
let deleteSessionBtns = document.getElementsByClassName('deleteSession');

// Define Function createRow(row_num,row_name)
// createRow(row_num,row_name) creates a row element given a new row number
// as well as the desired name for the row, it will have to retrieve the row_name
// from storage.
function createRow(row_num,row_name) {
  // Creating New Div for Row
  var divRow = document.createElement("div");
  divRow.id = "row"+row_num.toString();
  divRow.setAttribute('class','row container');
  // Creating New Div for Text Column
  var divColText = document.createElement("div");
  divColText.setAttribute('class','col-text flex-item centering');
  // Creating New P for Text Column Div
  var paragraph = document.createElement("p");
  var text = document.createTextNode(row_name);
  paragraph.setAttribute('class','session-title');
  // Creating New Div for Buttons Column
  var divColBtns = document.createElement("div");
  divColBtns.setAttribute('class','col-btns fixed centering');
  // Creating New Save Session Button
  var saveSessionBtn = document.createElement("button");
  saveSessionBtn.id = "saveSession"+row_num.toString();
  saveSessionBtn.setAttribute('class','saveSession');
  // Creating New Open Session Button
  var openSessionBtn = document.createElement("button");
  openSessionBtn.id = "openSession"+row_num.toString();
  openSessionBtn.setAttribute('class','openSession');
  // Creating New Delete Session Button
  var deleteSessionBtn = document.createElement("button");
  deleteSessionBtn.id = "deleteSession"+row_num.toString();
  deleteSessionBtn.setAttribute('class','deleteSession');
  // Appending All Elements to Popup
  paragraph.appendChild(text);
  divColText.appendChild(paragraph);
  divColBtns.appendChild(saveSessionBtn);
  divColBtns.appendChild(openSessionBtn);
  divColBtns.appendChild(deleteSessionBtn);
  divRow.appendChild(divColText);
  divRow.appendChild(divColBtns);
  document.body.appendChild(divRow);
  // Store Name in Storage
  chrome.storage.sync.set({['sessionName'+row_num.toString()]: row_name}, function() {
    // Console Logging for Debugging.
    // chrome.extension.getBackgroundPage().console.log("Session "+sessionNumber.toString()+" urls stored.");
    // chrome.extension.getBackgroundPage().console.log(sessionUrls);
  });
  // Call Update Function
  updateSessionsSaved();
}

// Define Function updateSessionsSaved()
// updateSessionsSaved() redefines all the button lists to reflect the newly
// created row and session. It then goes through the process of detecting for
// button clicks.
function updateSessionsSaved() {
  // Redefine Button Lists
  saveSessionBtns = document.getElementsByClassName('saveSession');
  openSessionBtns = document.getElementsByClassName('openSession');
  deleteSessionBtns = document.getElementsByClassName('deleteSession');
  // Loop Through saveSession Buttons
  for (var i = 0; i < saveSessionBtns.length; i++) {
    // Function For onclick Event
    saveSessionBtns[i].onclick = function(element) {
      // Get Session Number from Selected Session's Id
      var sessionSelected = element.toElement.id;
      var sessionNumber = sessionSelected.substr(sessionSelected.length-1);
      // Defining Variable for Query Information on Tab Query
      var queryInfo = {currentWindow: true}
      // Querying Tabs
      chrome.tabs.query(queryInfo, function(tabs) {
        // Defining Variable to Store Session Urls
        var sessionUrls = [];
        // Looping Through Tabs
        for (var i = 0; i < tabs.length; i++) {
          // Storing the Tab Url in the Session Array
          sessionUrls[i] = tabs[i].url;
        };
        // Saving the Session Urls in Storage
        chrome.storage.sync.set({['sessionUrls'+sessionNumber.toString()]: sessionUrls}, function() {
          // Console Logging for Debugging.
          chrome.extension.getBackgroundPage().console.log("Session "+sessionNumber.toString()+" urls stored.");
          chrome.extension.getBackgroundPage().console.log(sessionUrls);
        });
      });
    }
    // Function For onclick Event
    openSessionBtns[i].onclick = function(element) {
      // Get Session Number from Selected Session's Id
      var sessionSelected = element.toElement.id;
      var sessionNumber = sessionSelected.substr(sessionSelected.length-1);
      // Retrieving the Session Urls from Storage
      chrome.storage.sync.get(['sessionUrls'+sessionNumber.toString()], function(result) {
        // Console Logging for Debugging.
        chrome.extension.getBackgroundPage().console.log("Session "+sessionNumber.toString()+" urls opened.");
        // Defining Variable to Refer to Session Urls Key
        var sessionUrls = result['sessionUrls'+sessionNumber.toString()];
        // Looping through Tabs
        for (var i = 0; i < sessionUrls.length; i++) {
          // Getting Each Tab Url from the Session Array
          var tabUrl = sessionUrls[i];
          // Opening a New Tab with that Url
          chrome.tabs.create({
            url:tabUrl
          });
        }
      });
    }
    // Function For onclick Event
    deleteSessionBtns[i].onclick = function(element) {
      // Get Session Number from Selected Session's Id
      var sessionSelected = element.toElement.id;
      var sessionNumber = sessionSelected.substr(sessionSelected.length-1);
      // Removing Session Urls Data from Storage
      chrome.storage.sync.remove('sessionUrls'+sessionNumber.toString());
      chrome.storage.sync.remove('sessionName'+sessionNumber.toString());
      // Deleting This Session from Popup
      document.getElementById("row"+sessionNumber.toString()).remove();
     }
  }
}

//var promptText = prompt("Enter the title of this session!", "English Paper Research");
//var text = document.createTextNode(promptText);
