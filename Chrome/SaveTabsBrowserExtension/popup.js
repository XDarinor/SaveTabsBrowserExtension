'use strict';

function saveAllTabsButtonOnClick () {
    saveAllTabsToFile();
}

function saveAllTabsToFile() {
    chrome.tabs.query({}, function (tabs){
        if (tabs !== undefined && tabs !== null) {
            let text = "";
            console.info("Found " + tabs.length + " tabs.");
            tabs.forEach(element => {
                let textRow = "* " + element.title + " - " + element.url + "\n";
                text += textRow;
                console.debug("Row added: " + textRow);
            });

            let blob = new Blob([text], { type: "text/plain" });            
            let url = window.URL.createObjectURL(blob);
            let downloadArgs = {
                url: url,
                saveAs: true,
                filename: "tabs.txt"
            };

            chrome.downloads.download(downloadArgs, function (downloadID) {
                console.log("Downloaded file with id " + downloadID)
            });
        }
    });
}

document.getElementById('saveAllTabsButton').addEventListener("click", saveAllTabsButtonOnClick);