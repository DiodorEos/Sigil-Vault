document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById("btn");
    const urlTaken = document.getElementById("given_url");
    const copy_shortcode = document.getElementById("copy_shortcode");
    let shortened_p = document.querySelector(".shortened_paragraph");
    const alertCopy = document.getElementById("alert-copy"); // Your alert element
    const error_p = document.getElementById("error_p"); // for the error print
    const result_wrapper = document.getElementById("result_wrapper"); // the div containing the result

    if (!btn || !urlTaken || !shortened_p) {
        console.error("One or more DOM elements not found!");
        return;
    }

    // Function to show the alert with an ease-in animation
    function showAlert() {
        alertCopy.classList.add("show");

        // Hide the alert after 3 seconds (or your desired time)
        setTimeout(() => {
            alertCopy.classList.remove("show");
        }, 2000);
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
        result_wrapper.style.display = "flex";
        error_p.style.display = "none";
        copy_shortcode.style.display = "none";
        shortened_p.style.display = "none";
        event.preventDefault();
        error_p.style.color ="#c63a3a";
        shortened_p.style.color ="#52e4d2";


        if (urlTaken.value === "") {
            error_p.style.display = "flex";
            error_p.textContent = "Please enter a URL.";
            shortened_p.textContent = "";
            copy_shortcode.style.display = "none";
            return;
        }

        if (!isValidURL(urlTaken.value)) {
            error_p.style.display = "flex";
            shortened_p.textContent = "";
            copy_shortcode.style.display = "none";
            error_p.textContent = String.fromCharCode(9888) + " " + "Invalid URL! Please enter a valid one.";
            return;
        }

        try {
            // Check if the URL is already stored
            let existingShortcode = await checkExistingURL(urlTaken.value);

            if (existingShortcode) {
                shortened_p.style.display = "flex";
                error_p.textContent = "";
                shortened_p.textContent = `https://sglvt.com/${existingShortcode}`;
                console.log(`Existing: ${existingShortcode} -> ${urlTaken.value}`);
                copy_shortcode.style.display = "block";
                return; // Stop execution if URL already exists
            }

            // If URL unique -> generate unique shortcode
            let shortcode = secureRandomString();
            let pin = pinInput.value.trim();
            let pinQuery = pin && /^\d{4}$/.test(pin) ? `&pin=${pin}` : "";
            const response = await fetch("https://sglvt.com/database.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                // body: `shortcode=${shortcode}&original_url=${encodeURIComponent(urlTaken.value)}` --without PIN
                body: `shortcode=${shortcode}&original_url=${encodeURIComponent(urlTaken.value)}${pinQuery}`
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    shortened_p.style.display = "flex";
                    shortened_p.style.textDecoration = 'underline';
                    error_p.textContent = "";
                    copy_shortcode.style.display = "block";
                    shortened_p.textContent = `https://sglvt.com/${shortcode}`;
                    console.log(`Stored: ${shortcode} -> ${urlTaken.value}`);
                } else {
                    shortened_p.textContent = "";
                    copy_shortcode.style.display = "none";
                    error_p.style.display = "flex";
                    error_p.textContent = String.fromCharCode(9888) + " " + "An error occurred!" + String.fromCharCode(10) + "Please try again.";
                }
            } else {
                throw new Error("Failed to store URL");
            }
        } catch (error) {
            error_p.style.display = "flex";
            error_p.style.textAlign = "center";
            error_p.textContent = "";
            console.error("Error during URL shortening process:", error);

            // error_p.style.color ="#52e4d2"; // Checking how the success msg looks.
            // error_p.textContent = "Shortened link: " + "sglvt.com/hh1488";
            error_p.textContent = String.fromCharCode(9888) + " " + "An error occurred!" + String.fromCharCode(10) + "Please try again.";
            shortened_p.textContent = "";
            copy_shortcode.style.display = "none";
        }
    }

// Honeypot
    btn.addEventListener("click", (event) => {
        const trap = document.getElementById("trap_field");
        if (trap && trap.value.trim() !== "") {
            // Bot detected — you can log this or silently ignore
            console.warn("Bot attempt detected. Submission aborted.");
            return;
        }
    
        shorten(event);
    });

// Copy Logic
   copy_shortcode.addEventListener("click", () => {
    const url = shortened_p.textContent.trim();
    if (!url) return;

    navigator.clipboard.writeText(url).then(() => {
        copy_shortcode.textContent = "✔ Copied!";
        setTimeout(() => {
            copy_shortcode.textContent = "📋 Click to copy";
        }, 2000);
    }).catch(err => {
        console.error("Clipboard write failed:", err);
    });
});

// PIN FIELD
const pinCheckbox = document.getElementById("pin_checkbox");
const pinInput = document.getElementById("pin_input");

pinCheckbox.addEventListener("change", () => {
    if (pinCheckbox.checked) {
        pinInput.style.display = "inline-block";
        pinInput.focus();
    } else {
        pinInput.style.display = "none";
        pinInput.value = "";
    }
});

});