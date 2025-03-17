# **🔗 Secure URL Shortener – Project Analysis & Milestones**

## **📌 Project Overview**
This project is a **Secure URL Shortener**, designed as a **practical web scripting and security-focused application** for GitHub. It will be built **entirely with vanilla HTML, CSS, and JavaScript** and will use **Firebase as a backend** to store shortened URLs. The project aims to:

✅ **Shorten URLs and make them shareable.**  
✅ **Provide optional password protection** for sensitive links.  
✅ **Allow URLs to self-delete after a 12-hour expiration period.**  
✅ **Maintain a minimal and fast UI/UX** (just buttons, forms, and checkboxes).  
✅ **Showcase security concepts** in frontend development.  

---

## **📌 Technologies Used**

| **Technology**  	  | **Purpose** 						                              |
|---------------------|-------------------------------------------------------|
| **HTML**       	    | Structure of the UI (input, buttons, forms) 		      |
| **CSS**        	    | Minimal styling for readability & responsiveness 	    |
| **JavaScript** 	    | Core logic for URL generation, storage, and retrieval |
| **Firebase**   	    | Cloud database to store and manage URL mappings 	    |
| **Clipboard API** 	| Copy-to-clipboard functionality 			                |
| **Crypto API** 	    | Secure random short code generation 			            |
| **LocalStorage** 	  | Temporary storage for frontend-only functions 	      |

---

## **📌 Milestone Breakdown**

Each milestone represents **a distinct phase** of the project, **ensuring progress is trackable and adaptable**.

## **📅 Day 1: Project Setup & UI (3h)**
### **🔹 Priority: HIGH**  
✅ Set up the project folder (`index.html`, `styles.css`, `script.js`).  
✅ Create a **clean UI**: input box, shorten button, result area.  
✅ Implement **basic URL validation** (check for `https://`).  
✅ Display a **fake shortened URL** on button press.

**🎯 Milestone:** Basic UI and form are functional. ✅

### **🎁 Bonus Tasks (If Finished Early):**
✅ Implement **basic form validation** to ensure empty submissions are not allowed.
✅ Add a **clipboard copy button** so users can quickly copy the shortened URL.

---

## **📅 Day 2: Firebase Integration (3h)**
### **🔹 Priority: HIGH**  
✅ Create a Firebase **Firestore database**.  
✅ Set up Firebase project & API key in `script.js`.

✅ Store `{ shortCode: "abc123", originalUrl: "https://example.com" }` in Firestore.
 **Retrieve and log stored URLs** from Firestore.

**🎯 Milestone:** Successfully store and retrieve URLs in Firestore.

### **🎁 Bonus Tasks:**
✅ Implement a **shortcode collision** check to prevent duplicate short URLs.
- Experiment with **Firestore security rules**.

---

## **📅 Day 3: Implementing URL Retrieval & Redirection (3h)**
### **🔹 Priority: CRITICAL**  
 Create a Firebase **Cloud Function** to handle redirections.  
 Extract **short code** from URL (`/abc123`).  
 Query Firestore for the matching URL.  
 Return a **302 Redirect response**.

**🎯 Milestone:** Entering a shortened URL redirects the user to the original site.

### **🎁 Bonus Tasks:**
- Display a **custom 404 error page** for missing links.
- Implement **analytics (number of clicks per short link)**.

---

## **📅 Day 4: Adding Password Protection (3h)**
### **🔹 Priority: HIGH**  
 Modify Firestore schema to **store passwords** securely.  
 Add a **password input field** in the UI.  
 Implement **SHA-256 password hashing**.  
 Require a 5-digit password (PIN) before redirection (if set by user).

**🎯 Milestone:** Users can protect shortened links with a password.

### **🎁 Bonus Tasks:**
- Add **automatic PIN generation** option for users who don’t want to create their own.
- Implement a **brute-force delay** (e.g., if 3 failed PIN attempts occur in a row, the link locks for 10 minutes).

---

## **📅 Day 5: Implementing Expiry (Self-Deletion) (3h)**
### **🔹 Priority: MEDIUM**  
 Store **timestamp** (`createdAt: Timestamp.now()`).  
 Modify Cloud Function to **check expiration (12h limit)**.  
 Delete expired links **before redirecting**.  
 Display "This link has expired!" for expired URLs.

**🎯 Milestone:** Expired links are automatically deleted.

### **🎁 Bonus Tasks:**
- Implement a **one-time-use mode**, where links expire after the first access instead of a time limit.
- Add a **notification system** to inform users how long their link will remain active before expiration.

---

## **📅 Day 6: Securing the App (3h)**
### **🔹 Priority: CRITICAL**  
 Implement **brute-force protection** (3 password attempts max).  
 Prevent bots from flooding the database (rate-limiting).

**🎯 Milestone:** App security is enhanced.

### **🎁 Bonus Tasks:**
- Implement **self-destructing error messages** (e.g., invalid PIN attempts will disappear after 5 seconds instead of being stored).
- Add a **honeypot trap** for bots.

---

## **📅 Day 7: Improving UI & UX (3h)**
### **🔹 Priority: HIGH**  
 Enhance CSS for a **cleaner, responsive UI**.  
 Add **success/error messages** for user actions.  
 Implement **copy-to-clipboard** feature for short URLs.

**🎯 Milestone:** The app has a polished and user-friendly interface.

### **🎁 Bonus Tasks:**
- Add **animations** for smooth transitions.
- Introduce a **QR code generator for each short URL**.

---

## **📅 Day 8: Testing & Debugging (3h)**
### **🔹 Priority: HIGH**  
 Test **edge cases** (invalid passwords, missing URLs, expired links).  
 Fix **UI bugs** and console errors.  
 Ensure proper **Firebase security rules** are in place.

**🎯 Milestone:** A stable, bug-free application.

### **🎁 Bonus Tasks:**
- Perform **browser compatibility testing**.
- Write **unit tests** for JavaScript functions.

---

## **📅 Day 9: Deployment & Documentation (3h)**
### **🔹 Priority: CRITICAL**  
 Deploy the app (Firebase Hosting or custom domain).  
 Write a **detailed README** (setup guide, features, security).  
 Create **GitHub repository** and push all code.

**🎯 Milestone:** Live working app with full documentation.

### **🎁 Bonus Tasks:**
- Record a **short video demo**.
- Write a **blog post about the project**.

---

## **📅 Day 10: Final Review & Extra Features (3h)**
### **🔹 Priority: LOW** (If Everything is Complete)
 Optimize JavaScript code for **performance improvements**.  
 Add **multi-use link support** (same short URL for different users).  
 Refactor database structure for **scalability**.

**🎯 Milestone:** Fully complete & polished project.

### **🎁 Bonus Tasks:**
- Implement **custom alias support** (e.g., `/my-custom-url` instead of `/abc123`).
- Experiment with **progressive web app (PWA) features**.

---

Total Project Time: **30 Hours**  

---

## **📌 Scalability & Adjustments**
Since the professor noted that **this project could exceed 30 hours**, certain tasks can be **skipped or adjusted** based on time constraints:

| **Feature**          | **Mandatory?** | **Skippable?** |
|----------------------|----------------|----------------|
| Basic URL Shortening | ✅ Yes 	      | ❌ No 	       |
| Firebase Storage     | ✅ Yes 	      | ❌ No 	       |
| Redirection Logic    | ✅ Yes 	      | ❌ No 	       |
| Password Protection  | 🔄 Optional 	  | ✅ Yes 	       |
| Expiry (Auto-Delete) | 🔄 Optional 	  | ✅ Yes 	       |
| UI Enhancements      | 🔄 Optional 	  | ✅ Yes 	       |
| Analytics Features   | ❌ No 		      | ✅ Yes 	       |

If time runs out, the **password protection** and **expiration features** can be postponed without breaking core functionality. Analytics is completely optional and can even be implemented way later.
