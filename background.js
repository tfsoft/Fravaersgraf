var match_rules = {
    conditions: [
       new chrome.declarativeContent.PageStateMatcher({
           pageUrl: { 
               hostSuffix: '.lectio.dk', 
               pathSuffix: '/fravaergroup.aspx', 
            schemes: ['https']
            }
       })
    ],
    actions: [ new chrome.declarativeContent.ShowPageAction() ]
};

chrome.runtime.onInstalled.addListener(
  function(details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined,
      function() {
        chrome.declarativeContent.onPageChanged.addRules([match_rules]);
      }
    );
  }
);