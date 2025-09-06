```javascript
// dbConfig.ts
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tjdravinanshu_db_user:BwJkHDc1pfpuFJai@clustertest.i61stdt.mongodb.net/APIMastery?retryWrites=true&w=majority&appName=ClusterTest",
      {
        // options (mongoose v7+ me default hai, extra options ki जरूरत नही hai), phir bhi example ke liye dekha lo.
        dbName: "APIMastery", // database का नाम (string में भी दे सकते हो)
        maxPoolSize: 10, // एक समय में कितने connections open हों
        minPoolSize: 2, // minimum idle connections
        serverSelectionTimeoutMS: 5000, // 5 sec तक server ढूँढने की कोशिश करेगा
        socketTimeoutMS: 45000, // inactivity ke बाद socket बंद कर देगा
        autoIndex: true, // mongoose schema indexes को auto create करेगा
      }
    );
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // server ko band kar deta hai agar db connect na ho
  }
};

export default connectDB;
```

🔎 Breakdown (भागों में समझो)

1. mongodb+srv://

ये बताता है कि आप MongoDB Atlas cluster से connect कर रहे हो।

2. +srv का मतलब है कि Atlas खुद DNS से सारे cluster nodes resolve कर लेगा। (Cluster me कई servers होते हैं → Atlas खुद manage करेगा)

3. tjdravinanshu_db_user

यह आपका username है जो आपने Atlas dashboard में create किया।

यहीं से authentication होता है (कौन user connect हो रहा है)।

4. <db_password>

यहाँ आपको अपना actual password डालना है।

👉 Important: अगर password में special characters (@, #, %, space आदि) हैं तो आपको उसे URL encode करना होगा।

Example: myPass@123 → myPass%40123

5. @clustertest.i61stdt.mongodb.net

यह आपका cluster का host address है।

जब आपने Atlas पर cluster बनाया, तो यह unique URL assign हुआ।

मतलब MongoDB Atlas का server address।

6. /myAppDB

यहाँ पर आप database का नाम specify कर रहे हो।

अगर database पहले से नहीं बना है, तो mongoose जब पहली बार collection बनाएगा, MongoDB अपने आप ये database बना देगा।

Example: /usersDB, /shopDB, /test वगैरह।

7. ?retryWrites=true

ये एक option है।

अगर कोई write operation fail हो जाए network issue की वजह से, MongoDB उसे दुबारा try करेगा।

8. &w=majority

इसका मतलब है: जब आप कुछ database में लिखते हो (insert/update/delete), तो तब तक operation successful नहीं माना जाएगा जब तक cluster के majority nodes (ज्यादातर servers) confirm ना कर दें।

इससे data consistency strong रहती है।

9. &appName=ClusterTest

यह सिर्फ एक label है।

Atlas dashboard के logs में आपको दिखेगा कि कौनसा app connect हो रहा है।

Debugging और monitoring के काम आता है।

10. ✅ Summary (आसान भाषा में)
    10.1. username और password → आपके Atlas user के credentials।

10.2. cluster URL → Atlas का server address।

10.3. database name → आपका DB (जहाँ data save होगा)।

10.4. options (retryWrites, w=majority, appName) → reliability और monitoring के लिए।
