// popup.js

let createNewSession = document.getElementById('createNewSession');

createNewSession.onclick = function(element) {

  var elements = document.getElementsByClassName("row");
  var ids = '';
  for (var i=0; i<elements.length; i++) {
    ids += elements[i].id;
  }
  chrome.extension.getBackgroundPage().console.log("Ids:");
  chrome.extension.getBackgroundPage().console.log(ids);
  var row_num = elements.length;
  createRow(row_num);

  //document.getElementById(elements[elements.length-1]).appendChild(div);
}

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
  var openSessionBtn = document.createElement("button");
  openSessionBtn.id = "openSession"+row_num.toString();

  paragraph.appendChild(text);
  divColText.appendChild(paragraph);
  divColBtns.appendChild(saveSessionBtn);
  divColBtns.appendChild(openSessionBtn);
  divRow.appendChild(divColText);
  divRow.appendChild(divColBtns);

  document.body.appendChild(divRow);
  //document.getElementById("row"+(row_num-1).toString()).appendChild(divRow);

}

// Defining References to Buttons on Dropdown Menu
let saveSession1 = document.getElementById('saveSession1');
let openSession1 = document.getElementById('openSession1');

// Defining Function for Clicking Save Button
saveSession1.onclick = function(element) {

  // Defining Variable for Query Information on Tab Query
  var queryInfo = {
    currentWindow: true
  }

  // Querying Tabs
  chrome.tabs.query(queryInfo, function(tabs) {

    // Defining Variable to Store Session Urls
    var sessionUrls1 = [];

    // Looping Through Tabs
    for (var i = 0; i < tabs.length; i++) {

      // Storing the Tab Url in the Session Array
      sessionUrls1[i] = tabs[i].url;

    };

    //chrome.extension.getBackgroundPage().console.log(sessionUrls);

    // Saving the Session Urls in Storage
    chrome.storage.sync.set({'sessionUrls1': sessionUrls1}, function() {
      // Notifying Console
      chrome.extension.getBackgroundPage().console.log("Session 1 urls stored.");
    });

  });

}

// Defining Function for Clicking Open Button
openSession1.onclick = function(element) {

  // Retrieving the Session Urls from Storage
  chrome.storage.sync.get(['sessionUrls1'], function(result) {

    // Notifying Console
    chrome.extension.getBackgroundPage().console.log("Session 1 urls opened.");

    // Defining Variable to Refer to Session Urls Key
    var sessionUrls1 = result.sessionUrls1;

    // Looping through Tabs
    for (var i = 0; i < sessionUrls1.length; i++) {

      // Getting Each Tab Url from the Session Array
      var tabUrl = sessionUrls1[i];

      // Opening a New Tab with that Url
      chrome.tabs.create({
        url:tabUrl
      });

    }

  });

}

// Defining References to Buttons on Dropdown Menu
let saveSession2 = document.getElementById('saveSession2');
let openSession2 = document.getElementById('openSession2');

// Defining Function for Clicking Save Button
saveSession2.onclick = function(element) {

  // Defining Variable for Query Information on Tab Query
  var queryInfo = {
    currentWindow: true
  }

  // Querying Tabs
  chrome.tabs.query(queryInfo, function(tabs) {

    // Defining Variable to Store Session Urls
    var sessionUrls2 = [];

    // Looping Through Tabs
    for (var i = 0; i < tabs.length; i++) {

      // Storing the Tab Url in the Session Array
      sessionUrls2[i] = tabs[i].url;

    };

    //chrome.extension.getBackgroundPage().console.log(sessionUrls);

    // Saving the Session Urls in Storage
    chrome.storage.sync.set({'sessionUrls2': sessionUrls2}, function() {
      // Notifying Console
      chrome.extension.getBackgroundPage().console.log("Session 2 urls stored.");
    });

  });

}

// Defining Function for Clicking Open Button
openSession2.onclick = function(element) {

  // Retrieving the Session Urls from Storage
  chrome.storage.sync.get(['sessionUrls2'], function(result) {

    // Notifying Console
    chrome.extension.getBackgroundPage().console.log("Session 2 urls opened.");

    // Defining Variable to Refer to Session Urls Key
    var sessionUrls2 = result.sessionUrls2;

    // Looping through Tabs
    for (var i = 0; i < sessionUrls2.length; i++) {

      // Getting Each Tab Url from the Session Array
      var tabUrl = sessionUrls2[i];

      // Opening a New Tab with that Url
      chrome.tabs.create({
        url:tabUrl
      });

    }

  });

}
