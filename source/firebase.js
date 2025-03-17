import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, doc, setDoc, serverTimestamp, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBdDp755Keqa3pKJnwQCjNztYD2rzB4yS0",
    authDomain: "sigil-vault.firebaseapp.com",
    projectId: "sigil-vault",
    storageBucket: "sigil-vault.firebasestorage.app",
    messagingSenderId: "685787351489",
    appId: "1:685787351489:web:5bd1799a32b90268dec740",
    measurementId: "G-CRL3285NYE"
};

// Initialisation of Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

/**
 * Generates a secure random 6-character string
 * (!!! Defined BEFORE calling it in `generateUniqueShortcode`)
 */
function secureRandomString() {
    let array = new Uint8Array(6);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => (byte % 36).toString(36)).join('');
}

/**
 * Generates a unique shortcode to prevent Firestore duplicates
 */
async function generateUniqueShortcode() {
    let shortcode;
    let exists = true;

    while (exists) {
        shortcode = secureRandomString();
        const docRef = doc(db, "sigil_collection", shortcode);
        const docSnap = await getDoc(docRef);
        exists = docSnap.exists(); // !!! Retry if the shortcode exists
    }

    return shortcode;
}

/**
 * Stores a shortened URL inside `sigil_collection`
 */
async function storeShortenedUrl(originalUrl, shortcode) {
    try {
        const urlRef = doc(db, "sigil_collection", shortcode); // Store each URL as a document inside `sigil_collection`

        await setDoc(urlRef, {
            short_code: shortcode,
            valid_url: originalUrl,
            created_at: serverTimestamp()
        });

        console.log(`Stored: ${shortcode} -> ${originalUrl}`);
        return shortcode;
    } catch (error) {
        console.error("Error storing shortened URL in Firestore:", error);
        return null;
    }
}

export { storeShortenedUrl, generateUniqueShortcode, secureRandomString };
