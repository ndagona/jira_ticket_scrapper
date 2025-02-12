document.addEventListener("DOMContentLoaded", function () {
  console.log("popup.js loaded and running...");

  document.getElementById("scrap").addEventListener("click", function (event) {
    event.preventDefault();
    console.log(`Clicked at ${new Date()}`)

    chrome.action.onClicked.addListener(async (tab) => {
      const slide = 'https://watuafrica.atlassian.net/jira/servicedesk/projects/MWA/queues';

      if (tab.url.startsWith(slide)) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: getHtmlElement
        });
      }
    });

    // Function to get an HTML element from the page
    function getHtmlElement() {
      const element = document.getElementsByClassName("css-ohympy")
      if (element) {
        console.log(element)
      }

    }

  })
})