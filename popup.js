// popup.js

// Define Function loadStoredSessions()
// loadStoredSessions() querys all the current keys in google chrome's synced
// storage to find and keys that start with "sessionUrls" because these are
// the keys that store the applications saved sessions.
function loadStoredSessions() {

  // Retrieving Session Urls Keys from Storage

  // Initialize an Empty Array Variable for the "sessionUrls" Items
  var sessionUrlsKeys = []; //  Variable Must Be Defined Outside Chrome Call
  // Grabbing Storeage
  chrome.storage.sync.get(null, function(items) {
    // Allocate Keys to an Array Variable
    var allKeys = Object.keys(items);
    // Counter Variable for Inner Array Defining
    var j = 0;
    // Query the Keys
    for (var i = 0; i < allKeys.length; i++) {
      // Check if Current Key is a "sessionUrls" Key
      if (allKeys[i].substr(0,11) == "sessionUrls") {
        // Save it to New Array
        sessionUrlsKeys[j] = allKeys[i];
        // Increment New Array's Counter
        j++;
      }
    }
    // Console Logging for Debugging.
    chrome.extension.getBackgroundPage().console.log("All Keys Found in Storage: ");
    chrome.extension.getBackgroundPage().console.log(allKeys);
    chrome.extension.getBackgroundPage().console.log("Session Urls Keys Found in Storage: ");
    chrome.extension.getBackgroundPage().console.log(sessionUrlsKeys);

    // Displays the Rows for the Proper Session Urls Keys on the Popup

    // Iterate Through Session Urls Keys
    for (var i = 0; i < sessionUrlsKeys.length; i++) {
      // Create the Row on the Popup
      createRow(parseInt(sessionUrlsKeys[i].substr(sessionUrlsKeys[i].length-1), 10));
      // Console Logging for Debugging.
      chrome.extension.getBackgroundPage().console.log("Row "+parseInt(sessionUrlsKeys[i].substr(sessionUrlsKeys[i].length-1), 10)+" retrieved and displayed.");
    }
  });
}
// Calling loadStoredSessions() Function
loadStoredSessions();


let createNewSession = document.getElementById('createNewSession');

createNewSession.onclick = function(element) {

  var elements = document.getElementsByClassName("row");
  var ids = '';
  for (var i=0; i<elements.length; i++) {
    ids += elements[i].id;
  }
  //chrome.extension.getBackgroundPage().console.log("Ids:");
  //chrome.extension.getBackgroundPage().console.log(ids);
  var row_num = elements.length;
  createRow(row_num);



  //document.getElementById(elements[elements.length-1]).appendChild(div);
}

let wipeAllSessions = document.getElementById('wipeAllSessions');

wipeAllSessions.onclick = function(element) {
  chrome.storage.sync.get(null, function(items) {
    var allKeys = Object.keys(items);
    var sessionUrlsKeys = [];
    for (var i = 0; i < allKeys.length; i++) {
      if (allKeys[i].substr(0,11) == "sessionUrls") {
        chrome.storage.sync.remove(allKeys[i]);
      }
    }
    chrome.extension.getBackgroundPage().console.log(allKeys);
    chrome.extension.getBackgroundPage().console.log(sessionUrlsKeys);
  });
}

// Defining References to Buttons on Dropdown Menu
let saveSessionBtns = document.getElementsByClassName('saveSession');
let openSessionBtns = document.getElementsByClassName('openSession');

// Function to Create a New Row
function createRow(row_num) {
  // Creating New Div for Row
  var divRow = document.createElement("div");
  divRow.id = "row"+row_num.toString();
  divRow.setAttribute('class','row container');
  // Creating New Div for Text Column
  var divColText = document.createElement("div");
  divColText.setAttribute('class','col-text flex-item centering');
  // Creating New P for Text Column Div
  var paragraph = document.createElement("p");
  var text = document.createTextNode("Session "+row_num.toString());
  paragraph.setAttribute('class','session-title');
  // Creating New Div for Buttons Column
  var divColBtns = document.createElement("div");
  divColBtns.setAttribute('class','col-btns fixed centering');
  // Creating New Buttons
  var saveSessionBtn = document.createElement("button");
  saveSessionBtn.id = "saveSession"+row_num.toString();
  saveSessionBtn.setAttribute('class','saveSession');
  var openSessionBtn = document.createElement("button");
  openSessionBtn.id = "openSession"+row_num.toString();
  openSessionBtn.setAttribute('class','openSession');

  paragraph.appendChild(text);
  divColText.appendChild(paragraph);
  divColBtns.appendChild(saveSessionBtn);
  divColBtns.appendChild(openSessionBtn);
  divRow.appendChild(divColText);
  divRow.appendChild(divColBtns);

  document.body.appendChild(divRow);

  chrome.storage.sync.set({['row'+row_num.toString()]: divRow}, function () {
    chrome.extension.getBackgroundPage().console.log(divRow);
    chrome.extension.getBackgroundPage().console.log("Row "+row_num.toString()+" saved to memory.");
  });

  updateSessionsSaved();
  saveSessionBtns = document.getElementsByClassName('saveSession');
  openSessionBtns = document.getElementsByClassName('openSession');
}

function updateSessionsSaved() {
  saveSessionBtns = document.getElementsByClassName('saveSession');
  openSessionBtns = document.getElementsByClassName('openSession');

  for (var i = 0; i < saveSessionBtns.length; i++) {
    saveSessionBtns[i].onclick = function(element) {

      var sessionSelected = element.toElement.id;
      var sessionNumber = sessionSelected.substr(sessionSelected.length-1);

      // Defining Variable for Query Information on Tab Query
      var queryInfo = {
        currentWindow: true
      }

      // Querying Tabs
      chrome.tabs.query(queryInfo, function(tabs) {

        // Defining Variable to Store Session Urls
        var sessionUrls = [];

        // Looping Through Tabs
        for (var i = 0; i < tabs.length; i++) {

          // Storing the Tab Url in the Session Array
          sessionUrls[i] = tabs[i].url;

        };

        //chrome.extension.getBackgroundPage().console.log(sessionUrls);

        // Saving the Session Urls in Storage
        chrome.storage.sync.set({['sessionUrls'+sessionNumber.toString()]: sessionUrls}, function() {
          // Notifying Console
          chrome.extension.getBackgroundPage().console.log("Session "+sessionNumber.toString()+" urls stored.");
          chrome.extension.getBackgroundPage().console.log(sessionUrls);
        });

      });

    }

    openSessionBtns[i].onclick = function(element) {
      var sessionSelected = element.toElement.id;
      var sessionNumber = sessionSelected.substr(sessionSelected.length-1);

      // Retrieving the Session Urls from Storage
      chrome.storage.sync.get(['sessionUrls'+sessionNumber.toString()], function(result) {

        chrome.extension.getBackgroundPage().console.log(result);
        chrome.extension.getBackgroundPage().console.log(result.sessionUrls1);

        // Notifying Console
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
  }
}
