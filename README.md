# **🔗 Sigil-Vault – Secure URL Shortener**

## **📌 Project Overview**
**Sigil-Vault** is a **self-hosted Secure URL Shortener**, designed to provide a **lightweight, fast, and security-conscious** way to shorten URLs. It is built entirely with **vanilla PHP, JavaScript, and a CSS framework** (Tailwind or Bootstrap, TBD). The project is **already live and functional** at:  

🔗 **[Live Demo: https://sglvt.com/](https://sglvt.com/)**  

This project is part of my **university studies in Cybersecurity**, specifically under the **Web Scripting course**, where I aim to **demonstrate secure and efficient web development practices**. The development process is supervised through **milestone-based meetings with my Web Scripting professor**, ensuring structured progress and adherence to best practices.  

While this is a **personal and academic project**, it is also an **opportunity to gain hands-on experience with GitHub, proper project structuring, scripting, security implementations, and UI/UX design**.

---

## **📌 Current Features (Completed ✅)**
✅ **Shortens URLs into unique 6-character codes.**  
✅ **Validates URLs before shortening.**  
✅ **Stores URL mappings in a MySQL database.**  
✅ **Prevents duplicate shortcodes for the same URL.**  
✅ **Implements basic timestamp tracking for entries.**  
✅ **Redirects shortcodes to their original URL.**  
✅ **Minimal DOM manipulation for a clean UI.**  
✅ **Environment variables (.env) configured for security.**  
✅ **Project uploaded to GitHub for showcasing.**  

---

## **📌 Upcoming Features (TODO 🚧)**
🔹 **UI/UX design** (CSS framework integration - Tailwind/Bootstrap).  
🔹 **Optional PIN protection** for sensitive URLs.  
🔹 **AES-128 encryption** for stored PINs.  
🔹 **Self-destructing links** (URL expiration mechanism).  
🔹 **Basic analytics?** (Click tracking, logs).  
🔹 **Anti-bot measures** (Basic rate-limiting, honeypots).  

---

## **📌 Technologies Used**

| **Technology**  	| **Purpose** 						                                      |
|-----------------|-----------------------------------------------------------|
| **PHP (Vanilla)** | Core backend logic, URL shortening & redirection         |
| **MySQL**        | Database storage for URL mappings                         |
| **JavaScript**   | Frontend interactivity & clipboard functions               |
| **CSS Framework** (TBD) | UI/UX improvements (Tailwind or Bootstrap)        |
| **PHP dotenv**   | Environment variable management for security              |
| **AES-128 Encryption** | Secure storage of PIN-protected URLs (TODO)         |



## **📌 Project Status**
🚀 **Live Version:** ✅ [https://sglvt.com/](https://sglvt.com/)  
⚙️ **Next Steps:** UI framework selection + security feature implementation.  

---

## **📌 Setup Instructions**
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/YOUR-USERNAME/Sigil-Vault.git
cd Sigil-Vault
```
### **2️⃣ Install Dependencies**
```bash
composer install
```
### **3️⃣ Configure the Environment**
Rename .env.example to .env and update database credentials:
```ini
DB_HOST=your_host
DB_DATABASE=your_database
DB_USERNAME=your_user
DB_PASSWORD=your_password
```
### **4️⃣ Run the Application (Local Testing)**
```bash
php -S localhost:8000
```
Visit http://localhost:8000 to see it in action.

---

## **📌 License**
This project is licensed under the MIT License – feel free to use and modify it.
