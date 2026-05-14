# Google Sheets Integration Setup

## Quick Setup Guide

### Step 1: Create a Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Click **"+ New"** to create a new spreadsheet
3. Name it **"Jandel RSVP Responses"**
4. Add headers in Row 1:
   - **A1:** Timestamp
   - **B1:** Name
   - **C1:** Email
   - **D1:** Phone
   - **E1:** Attending

### Step 2: Set Up Google Apps Script
1. In your Google Sheet, click **Extensions → Apps Script**
2. Delete the default code and paste this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add a new row with timestamp and form data
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.phone,
      data.attending
    ]);
    
    return ContentService.createTextOutput(
      JSON.stringify({ status: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click the **Save** icon (Ctrl+S)
4. Name the project: "Jandel RSVP Handler"
5. Click **Deploy → New deployment**
6. Select **Type:** Web app
7. Set **Execute as:** Your Google account
8. Set **Who has access:** Anyone
9. Click **Deploy**
10. Copy the **Deployment URL** (looks like: `https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/usercopy`)

### Step 3: Update Your React App

In `src/app/App.tsx`, find this line near the top:

```typescript
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/usercopy';
```

Replace `YOUR_DEPLOYMENT_ID` with the actual ID from your deployment URL.

### Step 4: Test the Form

1. Run your app: `npm run dev`
2. Click "RESERVE A SEAT"
3. Fill out the form
4. Click "SUBMIT RSVP"
5. Check your Google Sheet - the data should appear!

## Troubleshooting

- **Script URL error?** Double-check you copied the full deployment URL
- **CORS error?** Make sure the Apps Script is deployed as a Web app with "Anyone" access
- **Data not appearing?** Check that your sheet has the correct column headers and you're posting to the right sheet tab

## Optional: Enable Email Notifications

Add this to your Google Apps Script to send you an email when submissions come in:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.phone,
      data.attending
    ]);
    
    // Send email notification
    GmailApp.sendEmail(
      'your-email@gmail.com',
      'New RSVP Submission',
      `New RSVP from: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nAttending: ${data.attending}`
    );
    
    return ContentService.createTextOutput(
      JSON.stringify({ status: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

Replace `'your-email@gmail.com'` with your actual email address.
