document.addEventListener("DOMContentLoaded", async function () {
    const statusEl = document.getElementById("status");
    const userStatusEl = document.getElementById("userStatus");
    const injectBtn = document.getElementById("injectScript");
    const signInBtn = document.getElementById("googleSignIn");

    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const allowedDomain = "secure.splitwise.com";

    if (!tab || !tab.url.includes(allowedDomain)) {
        statusEl.textContent = "This extension only works on Splitwise.";
        return;
    }

    statusEl.textContent = "Ready to inject script!";
    injectBtn.disabled = false;

    // Check if the user is signed in
    const user = await getUser();
    if (user) {
        userStatusEl.textContent = "Signed in as: " + user.email;
        signInBtn.style.display = "none"; // Hide sign-in button
    }

    // Inject script when the button is clicked
    injectBtn.addEventListener("click", () => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["inject.js"]
        });
        statusEl.textContent = "Script Injected!";
    });

    // Handle Google Sign-In
    signInBtn.addEventListener("click", async () => {
        const user = await signInWithGoogle();
        if (user) {
            userStatusEl.textContent = "Signed in as: " + user.email;
            signInBtn.style.display = "none"; // Hide sign-in button
        }
    });
});

// Function to get authenticated user info
async function getUser() {
    return new Promise((resolve) => {
        chrome.identity.getProfileUserInfo((userInfo) => {
            resolve(userInfo.email ? userInfo : null);
        });
    });
}

// Function to sign in with Google
async function signInWithGoogle() {
    return new Promise((resolve) => {
        chrome.identity.getAuthToken({ interactive: true }, async (token) => {
            if (!token) return resolve(null);
            const res = await fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const user = await res.json();
            resolve(user);
        });
    });
}
