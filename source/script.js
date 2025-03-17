import { storeShortenedUrl, generateUniqueShortcode, secureRandomString } from "./firebase.js";

// Ensure DOM is fully loaded before accessing elements
document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById("btn");
    const urlTaken = document.getElementById("given_url");
    let shortened_p = document.querySelector(".shortened_paragraph");

    if (!btn || !urlTaken || !shortened_p) {
        console.error("One or more DOM elements not found!");
        return;
    }

    // Function to validate URLs
    function isValidURL(string) {
        return /^(https?:\/\/|www\.)[^\s]+$/.test(string);
    }

    // Shorten URL and store it in Firestore
    async function shorten(event) {
        event.preventDefault(); // Prevent form submission issues

        if (urlTaken.value === "") {
            console.warn("Input field is empty!");
            shortened_p.innerHTML = "Please enter a URL.";
            return;
        }

        if (!isValidURL(urlTaken.value)) {
            console.warn("Invalid URL format entered:", urlTaken.value);
            shortened_p.innerHTML = "Invalid URL! Please enter a valid one.";
            return;
        }

        try {
            let shortcode = await generateUniqueShortcode(); // Await from firebase.js
            let shortLink = `https://sigil.com/${shortcode}`;
            const storedCode = await storeShortenedUrl(urlTaken.value, shortcode); // Await from firebase.js and store on firestore.
            
            if (storedCode) {
                console.log(`Successfully Stored in Firestore: ${storedCode}`);
            } else {
                console.error("Error storing shortened URL in Firestore.");
            }
        } catch (error) {
            console.error("Critical Error in Shortening Process:", error);
        }
    }

    btn.addEventListener("click", shorten);
});
