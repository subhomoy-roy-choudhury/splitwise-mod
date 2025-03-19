// chrome.action.onClicked.addListener(async (tab) => {
//     // Restrict script to only run on specific site
//     const allowedDomain = "https://secure.splitwise.com/#/dashboard"; // Change this to your target site
//     const url = new URL(tab.url);

//     if (!url.hostname.includes(allowedDomain)) {
//         console("This extension only works on " + allowedDomain);
//         return;
//     }

//     // Check user authentication
//     const user = await getUser();
//     if (!user) {
//         alert("Please sign in with Google to use this extension.");
//         chrome.runtime.openOptionsPage();
//         return;
//     }

//     // Inject the script
//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         files: ["inject.js"],
//     });
// });

// // Function to handle user authentication
// async function getUser() {
//     return new Promise((resolve) => {
//         chrome.identity.getProfileUserInfo((userInfo) => {
//             resolve(userInfo.email ? userInfo : null);
//         });
//     });
// }

chrome.action.onClicked.addListener(async (tab) => {
    const allowedDomain = "secure.splitwise.com";

    // Check if the current tab is Splitwise
    const url = new URL(tab.url);
    if (!url.hostname.includes(allowedDomain)) {
        console.log("This extension only works on Splitwise.");
        return;
    }

    // Inject script into the tab
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["inject.js"]
    });
});
