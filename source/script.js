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

    // Function to generate a secure random shortcode
    function secureRandomString() {
        let array = new Uint8Array(6);
        crypto.getRandomValues(array);
        return Array.from(array, (byte) => (byte % 36).toString(36)).join('');
    }

    // Check if URL already exists in the database
    async function checkExistingURL(original_url) {
        try {
            const response = await fetch(`https://sglvt.com/database.php?original_url=${encodeURIComponent(original_url)}`);

            if (!response.ok) {
                throw new Error(`Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.shortcode) {
                return data.shortcode;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error checking URL:", error);
            return null;
        }
    }

    // Shorten URL and store it in the database
    async function shorten(event) {
        event.preventDefault();

        if (urlTaken.value === "") {
            shortened_p.innerHTML = "Please enter a URL.";
            return;
        }

        if (!isValidURL(urlTaken.value)) {
            shortened_p.innerHTML = "Invalid URL! Please enter a valid one.";
            return;
        }

        try {
            // Check if the URL is already stored
            let existingShortcode = await checkExistingURL(urlTaken.value);

            if (existingShortcode) {
                shortened_p.innerHTML = `Shortened URL: <a href="https://sglvt.com/${existingShortcode}" target="_blank">sglvt.com/${existingShortcode}</a>`;
                console.log(`Existing: ${existingShortcode} -> ${urlTaken.value}`);
                return; // Stop execution if URL already exists
            }

            // If URL unique -> generate unique shortcode
            let shortcode = secureRandomString();
            const response = await fetch("https://sglvt.com/database.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `shortcode=${shortcode}&original_url=${encodeURIComponent(urlTaken.value)}`
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    shortened_p.innerHTML = `Shortened URL: <a href="https://sglvt.com/${shortcode}" target="_blank">sglvt.com/${shortcode}</a>`;
                    console.log(`Stored: ${shortcode} -> ${urlTaken.value}`);
                } else {
                    shortened_p.innerHTML = "An error occurred. Please try again.";
                }
            } else {
                throw new Error("Failed to store URL");
            }
        } catch (error) {
            console.error("Error during URL shortening process:", error);
            shortened_p.innerHTML = "An error occurred. Please try again.";
        }
    }

    btn.addEventListener("click", shorten);
});