// backgroung.js

chrome.runtime.onInstalled.addListener(function() {

});

chrome.runtime.onStartup.addListener(function() {

});

// chrome.runtime.onInstalled.addListener(function() {
//
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function(tab) {
//     chrome.declarativeContent.onPageChanged.addRules([{
//       conditions: [new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: {hostEquals: "developer.chrome.com"},
//       })
//       ],
//           actions: [new chrome.declarativeContent.ShowPageAction()]
//     }]);
//   });
//
// });
//
// chrome.runtime.onStartup.addListener(function() {
//
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function(tab) {
//     chrome.declarativeContent.onPageChanged.addRules([{
//       conditions: [new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: {hostEquals: "developer.chrome.com"},
//       })
//       ],
//           actions: [new chrome.declarativeContent.ShowPageAction()]
//     }]);
//   });
//
// });

// chrome.browserAction.onClicked.addListener(function(tab) {
//   // Send a message to the active tab
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     var activeTab = tabs[0];
//     chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
//   });
// });

// chrome.runtime.onInstalled.addListener(function() {
//
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     chrome.declarativeContent.onPageChanged.addRules([{
//       conditions: [new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: {hostEquals: 'http://www.google.come'},
//       }),
//         actions: [new chrome.declarativeContent.ShowPageAction()]
//       }]);
//   });
//
// });
