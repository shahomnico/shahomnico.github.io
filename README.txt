SHAH OMNI CO. — VERSION 2
==========================

V2 adds:
- Admin dashboard protected by a PIN (local demo).
- Customer request reference numbers.
- Local request status management.
- WhatsApp message generator (put your WhatsApp number in app.js).
- Install/PWA guidance.
- Same Shah Omni Co. logo and independent-service disclaimer.

IMPORTANT LIMITATION
The current V2 is still a FREE STATIC/PWA version. Requests are stored in the browser's localStorage. A customer on another phone cannot automatically see the same request, and the admin dashboard cannot see their request unless the same browser/device is used.

NEXT: REAL CLOUD BACKEND
To make customer requests appear in your admin dashboard from any phone, connect a free backend such as Google Apps Script + Google Sheets or another suitable database. Sensitive identity documents should only be collected after choosing a secure storage/processing setup.

SETUP BEFORE PUBLIC LAUNCH
1. Open app.js and replace REPLACE_WITH_YOUR_WHATSAPP_NUMBER with your number in international format, without + or spaces.
2. Change ADMIN_PIN from 1234.
3. Replace the placeholder email in index.html.
4. Add a real privacy policy and terms.
5. Do not claim to be a government department or official portal.
