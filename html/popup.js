document.addEventListener("DOMContentLoaded", function () {
    console.log("popup.js loaded and running...");
    document.getElementById("scrap").addEventListener("click", function (event) {
        event.preventDefault();
        console.log(`Clicked at ${new Date()}`)
        //start
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length === 0) return;
            let tab = tabs[0];
            const postUrl = "https://script.google.com/macros/s/AKfycbx6C947sXTMxMmKOZi2J_N5PkzZjkta8YjZ2QYxVxbAvFKJmeEpMl7hqz5o7UtoxaY4/exec"
            const slide = 'https://watuafrica.atlassian.net/jira/servicedesk/projects/MWA/queues';
            if (tab.url.startsWith(slide)) {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    function: () => {
                        console.log("Element Getter Called")
                        const element = document.getElementsByClassName("css-ohympy");
                        if (element.length > 0) {
                            console.log("Found element:");
                            for (let i = 0; i < element.length; i++) {
                                let small_element = element[i].innerText;
                                const dataStore = new Object();
                                split_element = small_element.split('\n');
                                dataStore.pull_date = new Date();
                                dataStore.type = split_element[0];
                                dataStore.request_id = [split_element[1], split_element[2], split_element[3]].join("");
                                dataStore.summary = split_element[4];
                                dataStore.reporter = split_element[5];
                                dataStore.assignee = split_element[6];
                                dataStore.status = split_element[7];
                                dataStore.creation_time = split_element[8];
                                console.log(dataStore);
                                console.log('\n\n');

                                setTimeout(() => {
                                    fetch("https://script.google.com/macros/s/AKfycbx6C947sXTMxMmKOZi2J_N5PkzZjkta8YjZ2QYxVxbAvFKJmeEpMl7hqz5o7UtoxaY4/exec", {
                                        //https://script.google.com/macros/s/AKfycbx6C947sXTMxMmKOZi2J_N5PkzZjkta8YjZ2QYxVxbAvFKJmeEpMl7hqz5o7UtoxaY4/exec
                                        method: 'POST', // Changed to POST
                                        mode: 'no-cors',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(dataStore) // Corrected payload
                                    })
                                        .then(response => response.json())
                                        .then(dataStore => {
                                            console.log('Success:', dataStore);
                                        })
                                        .catch(error => { console.log(`Error : ${error}`) })
                                    //Post
                                }, 3000)


                            }

                        } else {
                            console.log("Element not found.");
                        }
                        //
                        function simulateScroll(selector, deltaY = 100) {
                            const element = document.querySelector(selector);
                            if (!element) {
                                console.error("Element not found:", selector);
                                return;
                            }
                            console.log(
                                `Element found `
                            )
                            console.log(element)
                            console("\n\n")
                            const event = new WheelEvent("wheel", {
                                deltaY: deltaY,  // Positive: Scroll down, Negative: Scroll up
                                bubbles: true,
                                cancelable: true,
                            });

                            element.dispatchEvent(event);
                        }

                        // Example usage:
                        setInterval(() => simulateScroll("._ca0q1b66 ._n3tdhkvd"))
                        //
                    }


                });
            } else {
                console.log("This script only runs on:", slide);
            }
        });
        //end
    })
});

