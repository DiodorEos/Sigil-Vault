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

### **📅 Milestone 1: Basic UI & Input Handling (3 Hours)**
✅ Set up **`index.html`**, **`app.js`**, and **`app.css`**.  
✅ Create **a clean, functional UI** with an **input field, button, and result area**.  
✅ Implement **basic validation** to check if a user enters a URL.  
✅ Display a **fake shortened URL** for now (without Firebase integration).  

**🎯 Milestone Goal:** Have a **working form** that accepts URLs and outputs a shortened format.

🎁 **Bonus (If Time Allows):**  
- Add a **copy-to-clipboard button** so users can quickly copy their shortened URL.  
- Add **basic dark/light mode support** (simple styling toggle).  

---

### **📅 Milestone 2: Implement Short URL Generation (3 Hours)**
✅ Write a function to **generate random 6-character short codes**.  
✅ Ensure **codes are always unique** using a hash function.  
✅ Modify the UI to **display the generated short link**.  

**🎯 Milestone Goal:** The application generates **realistic, unique short codes**.

🎁 **Bonus:**  
- Display an **error message if input is empty or invalid**.  

---

### **📅 Milestone 3: Firebase Integration – Store URLs (3 Hours)**
✅ Set up Firebase and **connect the database to JavaScript**.  
✅ Store `{ shortCode: "abc123", originalUrl: "https://example.com" }` in Firestore.  
✅ Retrieve and **log stored URLs** from Firebase when requested.  

**🎯 Milestone Goal:** Shortened links **persist across sessions and devices**.

🎁 **Bonus:**  
- Implement a **collision check** to prevent duplicate short URLs.  
- Test **Firestore security rules** to ensure only valid writes are allowed.  

---

### **📅 Milestone 4: URL Redirection & Retrieval (3 Hours)**
✅ Extract **short code from URL (`/abc123`)**.  
✅ Query Firebase for the matching URL.  
✅ Redirect users to the **original site**.  

**🎯 Milestone Goal:** Users can **click a shortened link** and be redirected properly.

🎁 **Bonus:**  
- Implement a **custom 404 page** for missing links.  
- Add **basic access logging** (e.g., count how many times a short link is clicked).  

---

### **📅 Milestone 5: Implement Password Protection (6 Hours)**
✅ Modify Firebase schema to **store passwords** securely.  
✅ Add a **checkbox** in the UI to enable password protection.  
✅ Implement **SHA-256 password hashing** before storing in Firebase.  
✅ Require users to **enter the correct password** before redirection.  

**🎯 Milestone Goal:** Users can **optionally secure** their short links.  

🎁 **Bonus:**  
- Implement a **brute-force delay** (e.g., if 3 failed attempts occur, the link locks temporarily).  

---

### **📅 Milestone 6: Implement Expiration (Self-Deletion) (3 Hours)**
✅ Store **timestamps** when short links are created.  
✅ Modify retrieval logic to **check if the link is older than 12 hours**.  
✅ If expired, **delete the entry from Firebase** and display an error.  

**🎯 Milestone Goal:** Expired links **automatically remove themselves from the database**.

🎁 **Bonus:**  
- Implement a **one-time-use mode** (where links expire after the first access).  

---

### **📅 Milestone 7: Copy-to-Clipboard & UI Enhancements (3 Hours)**
✅ Add a **"Copy" button** next to the shortened URL.  
✅ Use `navigator.clipboard.writeText()` to copy the link.  
✅ Improve UI responsiveness with **CSS tweaks**.  

**🎯 Milestone Goal:** Make the **user experience smoother and faster**.  

🎁 **Bonus:**  
- Add a **small graphical effect** when copying.  

---

### **📅 Milestone 8: Final Deployment & Documentation (3 Hours)**
✅ Deploy to **GitHub Pages or Netlify**.  
✅ Write a **detailed README** (setup guide, features, security).  
✅ Ensure the **project is structured and well-commented**.  

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
