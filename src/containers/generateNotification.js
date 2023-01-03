const generateNotification = (n, appsArabicNames) => {
  const p = JSON.parse(n.payload);
  const appArabicName = appsArabicNames[n.appId];
  let body = "";
  switch (p.status) {
    case "new":
      body = `وردت المعاملة ${p.requestNo} في خطوة ${p.stepName} بتطبيق ${appArabicName}`;
      break;
    case "returned":
      body = `أعيدت المعاملة ${p.requestNo} إلى خطوة ${p.stepName} بتطبيق ${appArabicName}`;
      break;
    case "rejected":
      body = `اعتُذِرَ عن المعاملة ${p.requestNo} بتطبيق ${appArabicName}`;
      break;
    case "exportNo":
      body = `أُصدِرَ الرقم الصادر الخاص بالمعاملة ${p.requestNo} بتطبيق ${appArabicName}`;
      break;
    case "unPaid":
      body = `برجاء دفع رسوم المعاملة ${p.requestNo} بتطبيق ${appArabicName}`;
      break;
    case "transferred":
      body = ` تم استلام المعاملة رقم  ${p.requestNo} في المعاملات المحولة بتطبيق ${appArabicName}`;
      break;
    case "transferAccepted":
      body = `تم قبول تحويل المعاملة رقم  ${p.requestNo} بتطبيق ${appArabicName}`;
      break;
    case "transferRejected":
      body = `تم رفض تحويل المعاملة رقم  ${p.requestNo} بتطبيق ${appArabicName}`;
      break;
    case "supportComment":
      body = `قام فريق الدعم بالرد على التذكرة رقم ${p.ticketId}`;
      break;
    case "ticketWillClose":
      body = `تم الانتهاء من التذكرة رقم ${p.ticketId}، سيتم إغلاقها بعد ${p.closesWithin_hours} ساعة`;
      break;
    default:
      body = p.status;
      break;
  }
  return body;
};

export default generateNotification;
