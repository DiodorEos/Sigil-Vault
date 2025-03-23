## Milestone 1: **Working Security with Optional PIN and Self-Destructing Data**
**Duration:** 3 hours

### Tasks:
1. **PIN for Redirection Security (JSS -> PHP | PhpMyAdmin)**
   - Implement an optional PIN system for accessing shortened URLs. 
   - Ensure that the PIN is stored securely (hashed using `bcrypt`).
   - Include validation and a simple UI for the user to input the PIN before redirection.

2. **Self-Destructing Data (phpMyAdmin)**
   - Implement a cron job or database trigger that deletes records from the database after 12 hours.
   - Ensure that the deletion process does not cause database performance issues.

---

## Milestone 2: **Passive Security Measures**
**Duration:** 3 hours

### Tasks:
1. **Honeypots (HTML, JSS)**
   - Implement honeypot fields in your forms (e.g., hidden form fields).
   - If these fields are populated, consider marking the request as suspicious and reject the submission.

2. **Robots.txt (Hostinger server-side)**
   - Ensure that your `robots.txt` is set up to disallow crawlers from indexing sensitive pages.
   - Example:
     ```
     User-agent: *
     Disallow: /database.php
     ```

3. **Encryption and General Protection (JSS + PHP)**
   - Implement encryption for sensitive data (e.g., shortcodes) before storing them in the database. 
   - Use `AES-256` for encrypting data and store the encryption key securely (e.g., in an environment variable).
   - Use HTTPS to secure all communications between the client and the server.

---

## Milestone 3: **CSS and Design Research**
**Duration:** 3 hours

### Tasks:
1. **Responsive Design**
   - Research modern CSS frameworks (e.g., Tailwind CSS, Bootstrap) and select one for your design implementation.
   - Ensure your website is responsive and mobile-friendly.
   - Focus on improving the form and layout of the URL shortening input and output display.

2. **UI Improvements**
   - Create clear call-to-action buttons (e.g., "Shorten URL", "Generate PIN").
   - Research color schemes and typography that align with the theme.

---

## Milestone 4: **Debugging, QA, and Beta-Testing**
**Duration:** 3 hours

### Tasks:
1. **Debugging**
   - Test the website across different browsers (Chrome, Firefox, Safari) to ensure compatibility.
   - Review your PHP and JavaScript for any edge case errors (e.g., unexpected URL formats, broken links).

2. **QA Testing**
   - Perform manual testing of all functionalities, including URL shortening, PIN protection, and self-destructing data.
   - Ensure all error handling messages are user-friendly and informative.
   - Check security vulnerabilities (e.g., SQL injection, XSS attacks).

3. **Beta-Testing**
   - Invite a few users to test the website and provide feedback on usability and bugs.
   - Track issues reported during testing and resolve them.

---

## Milestone 5: **Final Optimization and Documentation**
**Duration:** 3 hours

### Tasks:
1. **Performance Optimization**
   - Analyze page load times and implement performance optimizations.
   - Optimize database queries to ensure fast access to shortened URLs.

2. **Documentation**
   - Document the security implementations, API endpoints, and any important aspects of the project.
   - Write a basic README for the repository, including setup instructions and a description of each major feature.
   - Ensure that all code comments are clear and explain the functionality.


