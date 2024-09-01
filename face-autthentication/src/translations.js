// src/translations.js

export const translations = {
    title: {
      en: "Aadhaar Face Liveness Authentication",
      hi: "आधार फेस लाइवनेस प्रमाणीकरण"
    },
    instructions: {
      en: "Instructions for Aadhaar Authentication Using Face Liveness Detection",
      hi: "फेस लाइवनेस डिटेक्शन का उपयोग करके आधार प्रमाणीकरण के लिए निर्देश"
    },
    enterAadhaar: {
      en: "Enter Aadhaar Number",
      hi: "आधार संख्या दर्ज करें"
    },
    enterAadhaarDetails: {
      en: "Enter your Aadhaar number into the input field provided on the webpage. Double-check to ensure that the number is correct before proceeding.",
      hi: "वेबसाइट पर प्रदान किए गए इनपुट फ़ील्ड में अपना आधार नंबर दर्ज करें। आगे बढ़ने से पहले सुनिश्चित करें कि नंबर सही है।"
    },
    submitYourAadhaar: {
      en: "Submit Your Aadhaar Number:",
      hi: "अपना आधार नंबर जमा करें:"
    },
    submitInstructions: {
      en: [
        "After entering the Aadhaar number, click on the 'Submit' button.",
        "This will initiate the face authentication process."
      ],
      hi: [
        "आधार नंबर दर्ज करने के बाद, 'जमा करें' बटन पर क्लिक करें।",
        "यह फेस प्रमाणीकरण प्रक्रिया को प्रारंभ करेगा।"
      ]
    },
    allowCameraAccess: {
      en: "Allow Camera Access:",
      hi: "कैमरा एक्सेस अनुमति दें:"
    },
    cameraAccessInstructions: {
      en: [
        "A prompt will appear asking for permission to access your webcam.",
        "Click on 'Allow' to grant the necessary permissions. This is required for the liveness detection to function."
      ],
      hi: [
        "एक संकेत दिखाई देगा जो आपके वेबकैम तक पहुंच की अनुमति मांगता है।",
        "'अनुमति दें' पर क्लिक करें ताकि आवश्यक अनुमतियां प्रदान की जा सकें। यह लाइवनेस डिटेक्शन के लिए आवश्यक है।"
      ]
    },
    positionFace: {
      en: "Position Your Face in Front of the Camera:",
      hi: "कैमरा के सामने अपने चेहरे को स्थिति में लाएं:"
    },
    facePositionInstructions: {
      en: [
        "Ensure that your face is clearly visible within the frame.",
        "Make sure you are in a well-lit environment with minimal shadows for the best results."
      ],
      hi: [
        "सुनिश्चित करें कि आपका चेहरा फ्रेम में स्पष्ट रूप से दिखाई दे रहा है।",
        "सर्वश्रेष्ठ परिणामों के लिए सुनिश्चित करें कि आप अच्छी तरह से प्रकाशित वातावरण में हैं और न्यूनतम छायाएँ हैं।"
      ]
    },
    followInstructions: {
      en: "Follow On-Screen Instructions:",
      hi: "स्क्रीन पर दिए गए निर्देशों का पालन करें:"
    },
    followInstructionsDetails: {
      en: [
        "You might be asked to perform simple actions such as blinking, smiling, or turning your head.",
        "Follow these instructions carefully as they are used to verify that you are a live person and not a spoof attempt."
      ],
      hi: [
        "आपसे झपकने, मुस्कुराने या सिर घुमाने जैसे सरल कार्य करने के लिए कहा जा सकता है।",
        "इन निर्देशों का ध्यानपूर्वक पालन करें क्योंकि इनका उपयोग यह सत्यापित करने के लिए किया जाता है कि आप एक जीवित व्यक्ति हैं और न कि कोई फर्जी प्रयास।"
      ]
    },
    waitVerification: {
      en: "Wait for the Verification Process:",
      hi: "सत्यापन प्रक्रिया का इंतजार करें:"
    },
    waitVerificationDetails: {
      en: [
        "The system will process your video stream to detect liveness.",
        "This may take a few seconds. Please be patient and avoid moving too much during this process."
      ],
      hi: [
        "सिस्टम आपकी वीडियो स्ट्रीम को लाइवनेस डिटेक्ट करने के लिए प्रोसेस करेगा।",
        "इसमें कुछ सेकंड लग सकते हैं। कृपया धैर्य रखें और इस प्रक्रिया के दौरान ज्यादा न हिलें।"
      ]
    },
    receiveResult: {
      en: "Receive Verification Result:",
      hi: "सत्यापन परिणाम प्राप्त करें:"
    },
    receiveResultDetails: {
      en: [
        "If the liveness detection is successful, you will be notified that the authentication was successful.",
        "If the detection fails, you will be prompted to try again or receive a notification of the failed authentication."
      ],
      hi: [
        "यदि लाइवनेस डिटेक्शन सफल होता है, तो आपको सूचित किया जाएगा कि प्रमाणीकरण सफल रहा।",
        "यदि डिटेक्शन विफल होता है, तो आपको पुनः प्रयास करने के लिए प्रेरित किया जाएगा या विफल प्रमाणीकरण की सूचना प्राप्त होगी।"
      ]
    },
    endSession: {
      en: "End Session:",
      hi: "सत्र समाप्त करें:"
    },
    endSessionDetails: {
      en: [
        "Once the verification is complete, the session will automatically end.",
        "If you need to try again or faced issues, follow the instructions provided in the notification."
      ],
      hi: [
        "सत्यापन पूरा होने के बाद, सत्र स्वचालित रूप से समाप्त हो जाएगा।",
        "यदि आपको फिर से प्रयास करने की आवश्यकता है या समस्याओं का सामना करना पड़ा है, तो सूचना में प्रदान किए गए निर्देशों का पालन करें।"
      ]
    },
    
    enterAadhaar: {
      en: "Enter Aadhaar Number",
      hi: "आधार संख्या दर्ज करें"
    },
    submit: {
      en: "Submit",
      hi: "जमा करें"
    },
    errorMessage: {
      en: "Failed to fetch user data",
      hi: "उपयोगकर्ता डेटा प्राप्त करने में विफल"
    },
    faqs: {
      en: "Frequently Asked Questions",
      hi: "अक्सर पूछे जाने वाले प्रश्न"
    },
    faq1: {
      en: "Why do I need to provide my Aadhaar number?",
      hi: "मुझे अपना आधार नंबर क्यों देना चाहिए?"
    },
    faq1Answer: {
      en: "Your Aadhaar number is used to verify your identity securely through the face liveness detection process. It ensures that the authentication is tied to your specific Aadhaar details.",
      hi: "आपका आधार नंबर फेस लाइवनेस डिटेक्शन प्रक्रिया के माध्यम से आपकी पहचान को सुरक्षित रूप से सत्यापित करने के लिए उपयोग किया जाता है। यह सुनिश्चित करता है कि प्रमाणीकरण आपके विशिष्ट आधार विवरण से जुड़ा हुआ है।"
    },
    faq2: {
      en: "What happens if I deny camera access?",
      hi: "अगर मैं कैमरा एक्सेस देने से मना कर दूं तो क्या होगा?"
    },
    faq2Answer: {
      en: "If you deny access to the camera, the face liveness detection cannot proceed, and the authentication process will fail. Camera access is essential for verifying that you are a live person.",
      hi: "अगर आप कैमरा एक्सेस देने से मना करते हैं, तो फेस लाइवनेस डिटेक्शन नहीं हो पाएगा और प्रमाणीकरण प्रक्रिया असफल हो जाएगी। लाइव व्यक्ति होने की पुष्टि के लिए कैमरा एक्सेस आवश्यक है।"
    },
    faq3: {
      en: "How does the system ensure that it is really me and not a photo or video?",
      hi: "सिस्टम कैसे सुनिश्चित करता है कि यह वास्तव में मैं हूं न कि कोई फोटो या वीडियो?"
    },
    faq3Answer: {
      en: "The system uses advanced machine learning techniques to analyze movements like blinking or head turns, which are impossible to replicate with a photo or video, ensuring that the authentication is genuine.",
      hi: "सिस्टम झपकने या सिर घुमाने जैसी गतिविधियों का विश्लेषण करने के लिए उन्नत मशीन लर्निंग तकनीकों का उपयोग करता है, जिन्हें फोटो या वीडियो के साथ दोहराना असंभव है, यह सुनिश्चित करते हुए कि प्रमाणीकरण वास्तविक है।"
    },
    whatToDoIfLivenessFails: {
      en: "What should I do if the liveness detection fails?",
      hi: "अगर लाइवनेस डिटेक्शन विफल हो जाए तो मुझे क्या करना चाहिए?"
    },
    livenessFailsDetails: {
      en: "If the liveness detection fails, try again in a well-lit environment and ensure that you follow the on-screen instructions closely. If the problem persists, contact support for assistance.",
      hi: "अगर लाइवनेस डिटेक्शन विफल हो जाता है, तो एक अच्छी तरह से प्रकाशित वातावरण में फिर से प्रयास करें और सुनिश्चित करें कि आप स्क्रीन पर दिए गए निर्देशों का ध्यानपूर्वक पालन करें। यदि समस्या बनी रहती है, तो सहायता के लिए संपर्क करें।"
    },
    isDataSecure: {
      en: "Is my data secure during this process?",
      hi: "क्या इस प्रक्रिया के दौरान मेरा डेटा सुरक्षित है?"
    },
    dataSecureDetails: {
      en: "Yes, your data is processed securely within your browser using cutting-edge security protocols. The entire process is designed with privacy in mind, and no data is transmitted to external servers without your consent.",
      hi: "हाँ, आपका डेटा आपके ब्राउज़र के भीतर अत्याधुनिक सुरक्षा प्रोटोकॉल का उपयोग करके सुरक्षित रूप से प्रोसेस किया जाता है। पूरी प्रक्रिया को गोपनीयता के दृष्टिकोण से डिजाइन किया गया है, और आपकी सहमति के बिना कोई डेटा बाहरी सर्वरों पर नहीं भेजा जाता है।"
    },
    useOnMobileDevice: {
      en: "Can I use this service on my mobile device?",
      hi: "क्या मैं इस सेवा का उपयोग अपने मोबाइल डिवाइस पर कर सकता हूँ?"
    },
    mobileDeviceDetails: {
      en: "Yes, the system is designed to work across all major devices, including desktops, tablets, and mobile phones. Ensure that your device's camera is functioning correctly for the best experience.",
      hi: "हाँ, सिस्टम को सभी प्रमुख उपकरणों, जिसमें डेस्कटॉप, टैबलेट, और मोबाइल फोन शामिल हैं, पर काम करने के लिए डिज़ाइन किया गया है। सर्वोत्तम अनुभव के लिए सुनिश्चित करें कि आपके डिवाइस का कैमरा सही ढंग से काम कर रहा है।"
    },
    noCameraOnDevice: {
      en: "What if I don't have a camera on my device?",
      hi: "अगर मेरे डिवाइस पर कैमरा नहीं है तो क्या करें?"
    },
    noCameraDetails: {
      en: "A camera is required for face liveness detection. If your device does not have a camera, you will need to use another device with a functional camera to complete the authentication process.",
      hi: "फेस लाइवनेस डिटेक्शन के लिए कैमरा की आवश्यकता होती है। यदि आपके डिवाइस में कैमरा नहीं है, तो आपको प्रमाणीकरण प्रक्रिया को पूरा करने के लिए किसी अन्य डिवाइस का उपयोग करना होगा जिसमें एक कार्यशील कैमरा हो।"
    },
    verificationTime: {
      en: "What is the expected time for the verification process?",
      hi: "सत्यापन प्रक्रिया का अपेक्षित समय क्या है?"
    },
    verificationTimeDetails: {
      en: "The liveness detection process typically takes just a few seconds. However, the total time may vary depending on your device's performance and internet speed.",
      hi: "लाइवनेस डिटेक्शन प्रक्रिया आमतौर पर केवल कुछ सेकंड लेती है। हालांकि, कुल समय आपके डिवाइस की प्रदर्शन और इंटरनेट स्पीड पर निर्भर कर सकता है।"
    },
    ensureSuccessfulAuthentication: {
      en: "What can I do to ensure successful authentication?",
      hi: "सफल प्रमाणीकरण सुनिश्चित करने के लिए मैं क्या कर सकता हूँ?"
    },
    successfulAuthenticationDetails: {
      en: "To increase the chances of successful authentication, use the system in a well-lit environment, position your face clearly in front of the camera, and follow the on-screen instructions accurately.",
      hi: "सफल प्रमाणीकरण की संभावना को बढ़ाने के लिए, सिस्टम का उपयोग एक अच्छी तरह से प्रकाशित वातावरण में करें, अपने चेहरे को कैमरा के सामने स्पष्ट रूप से स्थिति में रखें, और स्क्रीन पर दिए गए निर्देशों का सही ढंग से पालन करें।"
    },
    technicalIssues: {
      en: "What should I do if I face technical issues during the process?",
      hi: "अगर प्रक्रिया के दौरान मुझे तकनीकी समस्याओं का सामना करना पड़े तो मुझे क्या करना चाहिए?"
    },
    technicalIssuesDetails: {
      en: "If you encounter any technical issues, ensure your browser is up to date, and try refreshing the page. If the issue persists, reach out to customer support for further assistance.",
      hi: "अगर आपको किसी तकनीकी समस्या का सामना करना पड़ता है, तो सुनिश्चित करें कि आपका ब्राउज़र अद्यतित है, और पेज को रिफ्रेश करने का प्रयास करें। अगर समस्या बनी रहती है, तो आगे की सहायता के लिए ग्राहक समर्थन से संपर्क करें।"
    },
    // Header translations
  myAadhar: {
    en: "My Aadhar",
    hi: "मेरा आधार"
  },
  aboutUIDAI: {
    en: "About UIDAI",
    hi: "UIDAI के बारे में"
  },
  ecosystem: {
    en: "Ecosystem",
    hi: "इकोसिस्टम"
  },
  mediaAndResources: {
    en: "Media and Resources",
    hi: "मीडिया और संसाधन"
  },
  contactAndResources: {
    en: "Contact and Resources",
    hi: "संपर्क और संसाधन"
  },
  searchPlaceholder: {
    en: "Search...",
    hi: "खोजें..."
  },
  goButton: {
    en: "Go",
    hi: "जाएं"
  }
  
  // Add more translations for other elements as needed
  };
  