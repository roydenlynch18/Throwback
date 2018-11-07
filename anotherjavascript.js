var elements = document.getElementsByClassName("row");
var names = '';
for (var i=0; i<elements.length; i++) {
  names += elements[i].name;
}
chrome.extension.getBackgroundPage().console.log("Session 1 urls stored.");
