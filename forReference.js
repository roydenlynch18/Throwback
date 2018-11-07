//background.js
alert("Hello from Chrome")

chrome.runtime.onInstalled.addListener(function() {

  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });


  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });

});


//popup.js
let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function() {
  chrome.tabs.query( function(callback) {

  });
}

changeColor.onclick = function(element) {
  chrome.tabs.create({url:chrome.extension.getURL("tabs_api.html")});

  chrome.tabs.create({
    url:"http://www.google.com"
  });
  chrome.tabs.create({
    url:"http://www.google.com"
  });

  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};

//popup.html
<!DOCTYPE html>
<html>
  <head>
    <style>
      button {
        height: 30px;
        width: 30px;
        outline: none;
      }
    </style>
  </head>
  <body>
    <button id="changeColor"></button>
    <script src="popup.js"></script>
  </body>
</html>

//manifest.json
"chrome_url_overrides": {
  "newtab": "newtab.html"
},


chrome.extension.getBackgroundPage().console.log('foo');
