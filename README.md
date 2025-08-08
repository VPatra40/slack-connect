# slack-connect
A full-stack TypeScript application integrating Slack OAuth 2.0 to connect workspaces, manage tokens, and enable immediate or scheduled message delivery with persistent storage.

## **Architectural Overview**

### **OAuth Flow**
1. User clicks **"Connect to Slack"** → redirected to Slack’s **OAuth page**.  
2. Slack returns a **temporary authorization code** to the backend.  
3. Backend exchanges the code for **access** & **refresh tokens**.  
4. **Tokens** are securely stored in **MongoDB**.  

### **Token Management**
1. Before each API call, backend checks **token validity**.  
2. If expired, a **refresh token request** is triggered automatically.  

### **Scheduled Task Handling**
1. **Cron jobs** periodically send Slack **messages**, **reminders**, or **updates**.  
2. **Logs** and **status updates** are maintained for **tracking & monitoring**.  


## Challenges & Learnings

### Challenges
- Handling OAuth token expiration and implementing a secure refresh mechanism.
- Synchronizing frontend and backend for consistent authentication state.
- Debugging Slack API event subscriptions in a local development environment.

### Learnings
- Gained a deep understanding of OAuth 2.0 and Slack API scopes.
- Improved skills in managing token lifecycle securely and efficiently.
- Acquired experience in integrating cron jobs with API services for scheduled tasks.
- Enhanced debugging techniques and secure credential handling using `.env` files.
