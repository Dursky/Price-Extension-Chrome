chrome.tabs.getSelected(null, function(tab) {
    tab = tab.id;
    tabUrl = tab.url;

    console.log(tabUrl);
});