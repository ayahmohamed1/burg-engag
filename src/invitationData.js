/**
 * =========================================================================
 * ملف بيانات وتفاصيل دعوة الخطوبة (بيانات العروسين عاصم وملك)
 * INVITATION CONFIGURATION FILE
 * =========================================================================
 */

export const INVITATION_DATA = {
  // ترويسة الغلاف والظرف
  envelopeHeader: "We're getting engaged",

  // الاسمان بالخط الإنجليزي المائل (مثل الصورة المرجعية تماماً)
  scriptNames: "Asem & Malak",

  // ترويسة الدعوة
  headerTitleEn: "THE engagement OF OUR CHILDREN",
  headerTitleAr: "حفل خطوبة مبارك",

  // بيانات العريس
  groom: {
    name: "Asem",
    nameAr: "عاصم",
    subtitle: "GROOM"
  },

  // بيانات العروس
  bride: {
    name: "Malak",
    nameAr: "ملك",
    subtitle: "BRIDE"
  },

  // عبارة الدعوة الترحيبية بالإنجليزية
  welcomeMessage: "We would love to have you with us as we celebrate the beginning of our forever.",

  // صورة العروسين
  gallery: {
    title: "PHOTO GALLERY",
    photoMainPortrait: "./assets/couple.jpg",
  },

  // تفاصيل الموعد والوقت (العد التنازلي)
  schedule: {
    headingEn: "THE ENGAGEMENT PARTY WILL TAKE PLACE AT:",
    timeDisplay: "3:00 PM",
    dateDayName: "MONDAY",
    dateDayNameAr: "الإثنين",
    dateDayNumber: "2",
    dateMonthYear: "NOVEMBER 2026",
    dateMonthYearAr: "نوفمبر ٢٠٢٦",
    // تاريخ ووقت الحفل لحساب العد التنازلي: 2 نوفمبر 2026 الساعة 3:00 عصراً
    targetDateTime: "2026-11-02T15:00:00"
  },

  // تفاصيل المكان وخريطة Google Maps
  location: {
    title: "LOCATION",
    venueName: "Vivia Hall",
    venueNameAr: "قاعة فيفيا",
    address: "Under Ras El Bar Bridge",
    addressAr: "أسفل كوبري رأس البر",
    // رابط خريطة Google Maps المرسل من المستخدم
    googleMapsUrl: "https://maps.app.goo.gl/58kDcnwkhhNWUB8e9?g_st=iw",
    // تضمين خريطة Google Maps
    mapEmbedIframe: "https://maps.google.com/maps?q=Ras+El+Bar+Bridge+Damietta&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },

  // مسار ملف الموسيقى الرومانسية
  audioTrack: "./lovesong.mp3"
};
