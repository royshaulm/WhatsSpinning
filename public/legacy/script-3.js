
const SEED_RECORDS = []
;
const BUILD_DATE = "2026-08-23";
const SHEET_ID = "";
const TEMPLATE_XLSX_URI = "/assets/legacy/edab9147c93df847.xlsx";
const STORAGE_KEY = "whats_spinning_records_v2";
const LOCAL_ADD_KEY = "whats_spinning_local_additions_v2";
const LAST_SYNC_KEY = "whats_spinning_last_sync_v2";

/* ================= I18N ================= */
const LANG_KEY = "whats_spinning_lang_v1";
let LANG = localStorage.getItem(LANG_KEY) || 'he';
const I18N = {
  he: {
    'ob.welcome':"ברוכים הבאים ל-What's Spinning! 🎶", 'ob.whatsYourName':"איך קוראים לך?", 'ob.namePh':"השם שלך",
    'ob.whereFrom':"איך רוצים להתחיל?", 'ob.whereFromSub':"אפשר לייבא אוסף מדיסקוגס או להתחיל אוסף ריק - ואפשר לייבא מאקסל או מגיליון בכל שלב מאוחר יותר, דרך ההגדרות",
    'ob.startFresh':"✨ התחלת אוסף חדש",
    'ob.haveSheet':"📄 יש לי גיליון Google Sheets", 'ob.sheetIdLabel':"מזהה הגיליון (Sheet ID) או קישור מלא", 'ob.sheetIdPh':"1EUe7bO... או קישור מלא לגיליון",
    'ob.syncStart':"סנכרן והתחל", 'ob.haveExcel':"📤 יש לי קובץ אקסל של האוסף",
    'ob.uploadHint':"מעלים קובץ אקסל (או CSV) בפורמט המתאים, וזה יטען כאוסף שלך באפליקציה.",
    'ob.downloadTemplate':"⬇️ הורדת תבנית לדוגמה", 'ob.seeExample':"👀 לצפייה בדוגמה איך הפורמט צריך להיראות",
    'ob.haveDiscogs':"💿 יש לי אוסף בדיסקוגס", 'ob.discogsHint':"מתחברים עם אסימון גישה אישי (Personal Access Token) ומייבאים את כל האוסף שלך מדיסקוגס ישירות לאפליקציה.",
    'ob.discogsConnectAndImport':"🔗 התחברות וייבוא אוסף",
    'home.favorites':"⭐ האהובים עלייך",
    'home.quiz.label':"בחר תקליט יחד איתי", 'home.quiz.desc':"למצוא את התקליט המתאים לפי מצב הרוח",
    'home.random.label':"בחר לי תקליט אקראי", 'home.random.desc':"תקליט רנדומלי מכל האוסף",
    'home.noRecordsYet':"עדיין אין תקליטים באוסף. אפשר להוסיף מהגדרות ⚙️ - חיבור לדיסקוגס, גיליון Google Sheets או קובץ אקסל.",
    'home.browse.label':"האוסף שלי", 'home.browse.desc':"חיפוש, תיוגים וסגנונות",
    'home.recent.label':"הפעילות שלי",
    'home.history.label':"סטטיסטיקות", 'home.history.desc':"כמה פעמים ומתי סובבת כל תקליט?",
    'home.feedback':"💡 יש לך הצעה לשיפור? ספר/י לרועי באינסטגרם", 'home.switchProfile':"לא את/ה? החלפת פרופיל / אוסף",
    'home.switchProfileNamed':(name)=>`לא ${name}? החלפת פרופיל / אוסף`,
    'home.dedication':"באהבה לאוראל 💜 שאוהב סטטיסטיקות ותיעוד אוספים יותר מכולם",
    'nav.home':"‹ בית", 'nav.browse':"‹ האוסף שלי",
    'nav.title.history':"סטטיסטיקות", 'nav.title.recent':"הפעילות שלי", 'nav.title.quiz':"מה מתחשק לי לשמוע?", 'nav.title.result':"התוצאה שלך",
    'nav.title.browse':"האוסף שלי", 'nav.title.add':"הוספת תקליטים", 'nav.title.wishlist':"Wishlist", 'nav.title.incoming':"בדרך אליי",
    'hist.totalSpins':"סיבובים בסך הכל", 'hist.distinct':"תקליטים שסובבו", 'hist.partial':"מהם סיבובים חלקיים", 'hist.sides':"צדדים בסיבובים חלקיים",
    'hist.streak':"רצף ימים נוכחי", 'hist.bestStreak':"הרצף הארוך ביותר",
    'hist.byMonth':"📅 סיבובים לפי חודש", 'hist.byDecade':"🕰 סיבובים לפי עשור", 'hist.byYear':"📆 סיבובים לפי שנה",
    'hist.topArtist':(name,count)=>`🎤 האמן/ית המושמע/ת ביותר: <b>${name}</b> (${count} סיבובים)`,
    'hist.topGenre':(name,count)=>`🎼 הסגנון המושמע ביותר: <b>${name}</b> (${count} סיבובים)`,
    'hist.noData':"אין עדיין מספיק נתונים", 'stats.openFullRecord':"פתיחת העמוד המלא",
    'hist.showMore':"הצג עוד ▾", 'hist.showLess':"הצג פחות ▴",
    'hist.empty':'עדיין לא סובבת שום תקליט. בכל פעם שמניחים מחט על תקליט, מתעדים את זה מהאוסף או ממסך התוצאה 🎶',
    'hist.deleteSpin':"מחיקת הסיבוב הזה", 'hist.deleteSpinConfirm':"למחוק את הסיבוב הזה מההיסטוריה?",
    'hist.tabRecent':"🕒 סיבובים אחרונים", 'hist.tabStats':"📊 סטטיסטיקות שמיעה", 'hist.tabCollection':"📀 סטטיסטיקות אוסף",
    'coll.totalRecords':"תקליטים באוסף", 'coll.distinctArtists':"אמנים שונים", 'coll.topArtists':"🎤 האמנים עם הכי הרבה תקליטים",
    'coll.byYear':"📅 ציר זמן - תקליטים לפי שנת הוצאה", 'coll.variants':"🧬 וריאנטים", 'coll.noVariants':"לא נמצאו כמה עותקים של אותו תקליט באוסף.",
    'coll.ratingsTitle':"⭐ דירוגים", 'coll.ratingsMusic':"🎵 מוזיקה", 'coll.ratingsPressing':"💿 פרסינג",
    'coll.ratingsAvg':(avg,n)=>`ממוצע ${avg} ⭐ (${n} מדורגים)`, 'coll.ratingsNoData':"אין עדיין דירוגים.",
    'coll.ratingsStars':(n)=>`${n}⭐`,
    'coll.timelineHint':"לחצו על עשור כדי לראות פילוח לפי שנה",
    'coll.timelineYearCaption':(y,cnt)=>`${y}: ${cnt} תקליטים`,
    'coll.timelineDecadeCaption':(d,cnt)=>`${d}: ${cnt} תקליטים`,
    'coll.timelineAllTimes':"כל הזמנים", 'coll.timelineByDecade':"לפי עשור",
    'coll.timelineDecadeDrillHint':"התפלגות לפי שנה - לחצו שוב על העשור לסגירה",
    'home.prizes.label':"הישגים", 'nav.title.prizes':"הישגים",
    'home.social.label':"חברתי", 'nav.title.social':"חברתי", 'social.comingSoon':"בקרוב...",
    'activity.friends':"חברים", 'activity.joined':(date)=>`הצטרפ/ה ב-${date}`,
    'activity.hoursListened':"שעות האזנה", 'activity.achievements':"הישגים",
    'activity.viewAchievements':"לצפייה בהישגים ←", 'activity.bestStreak':(n)=>`השיא: ${n} ימים`,
    'activity.recentlyPlayed':"🕒 האחרונים שניגנתי", 'activity.chooseBanner':"בחירת תמונת רקע",
    'prize.sectionGeneral':"כללי", 'prize.sectionGenres':"ז'אנרים", 'prize.sectionDecades':"עשורים",
    'prize.sectionSeasonal':"עונתי", 'prize.sectionFandom':"פאנדומים",
    'nav.title.settings':"הגדרות", 'settings.tabUser':"👤 משתמש", 'settings.tabLang':"🌐 שפה",
    'settings.tabNeedle':"🪡 מחט",
    'settings.tabSync':"🔄 סנכרון אוסף", 'settings.tabFeedback':"💡 הצעות לייעול",
    'settings.greeting':(name)=> name ? `היי ${name} 👋` : "היי 👋",
    'settings.uploadPhoto':"📷 העלאת תמונת פרופיל",
    'settings.signOutTitle':"🗑️ מחיקת חשבון",
    'settings.signOutHint':"מוחק לצמיתות את כל האוסף, הדירוגים, היסטוריית הניגון וכל מה שנשמר בדפדפן הזה, ומתחיל מאפס. שונה מ\"החלפת פרופיל\" שרק משנה את השם ומשאיר את האוסף.",
    'settings.signOutBtn':"🗑️ מחיקת חשבון",
    'settings.langHint':"שינוי שפת התצוגה באפליקציה",
    'settings.comingSoonSheetTitle':"🚚 הגיליון שלי לתקליטים שבדרך",
    'settings.discogsTitle':"💿 דיסקוגס ו-MusicBrainz",
    'settings.discogsHint':"מעשירים כל תקליט במידע מדויק: קודם מהאוסף שלך בדיסקוגס, אחר כך מהמאגר הכללי של דיסקוגס, ולבסוף מ-MusicBrainz (מאגר חינמי שלא דורש התחברות). תמיד לפי שנת ההוצאה המקורית, לא שנת ההדפסה הספציפית.",
    'settings.discogsTokenLabel':"אסימון גישה אישי (Personal Access Token)",
    'settings.discogsConnectBtn':"🔗 התחברות לדיסקוגס", 'settings.discogsGetTokenLink':"איך משיגים טוקן אישי?",
    'settings.discogsTokenMissing':"צריך להדביק טוקן קודם", 'settings.discogsConnecting':"מתחבר…",
    'settings.discogsConnectError':"החיבור נכשל - בדוק/י שהטוקן נכון ונסה/י שוב",
    'settings.discogsConnectedAs':(name)=>`מחובר/ת לדיסקוגס בשם: ${name}`,
    'settings.discogsDisconnectBtn':"התנתקות מדיסקוגס",
    'settings.discogsSyncBtn':"🔄 סנכרון מידע לאוסף",
    'settings.discogsSyncNoteNoToken':"בלי חיבור לדיסקוגס, הסנכרון ישתמש רק ב-MusicBrainz.",
    'settings.discogsFetchingCollection':"טוען את האוסף שלך מדיסקוגס…",
    'settings.discogsFetchingCollectionProgress':(page,pages)=>`טוען את האוסף שלך מדיסקוגס… (עמוד ${page} מתוך ${pages})`,
    'settings.discogsCollectionFetchError':"לא הצלחתי לטעון את האוסף מדיסקוגס - ממשיך עם שאר המקורות",
    'settings.discogsSyncProgress':(done,total)=>`מעבד תקליט ${done} מתוך ${total}…`,
    'settings.discogsSyncSummary':(coll,db,mb,unmatched)=>`נמצאו: ${coll} מהאוסף שלך בדיסקוגס, ${db} מהמאגר הכללי של דיסקוגס, ${mb} מ-MusicBrainz. לא נמצאו: ${unmatched}.`,
    'settings.discogsForceResync':"סנכרון מלא מחדש (מתעלם ממה שכבר נמצא)",
    'settings.discogsImportTitle':"📥 ייבוא אוסף מלא מדיסקוגס (בלי צורך בגיליון או אקסל)",
    'settings.discogsImportHint':"שולפים את כל האוסף שלך מדיסקוגס ומוסיפים כתקליטים באפליקציה. תקליטים שכבר קיימים (מהגיליון או מהאקסל) לא ישוכפלו.",
    'settings.discogsImportBtn':"📥 ייבוא האוסף מדיסקוגס",
    'settings.discogsImportFetching':"טוען את האוסף שלך מדיסקוגס…",
    'settings.discogsImportDone':(added,total)=>`נוספו ${added} תקליטים חדשים מתוך ${total} באוסף שלך בדיסקוגס (השאר כבר היו קיימים).`,
    'settings.discogsImportError':"הייבוא נכשל - נסה/י שוב",
    'settings.discogsDupTitle':"🔗 רשומות כפולות אפשריות",
    'settings.discogsDupHint':"בודקים אם יש תקליטים שנראים דומים מאוד (למשל שם שנרשם קצת אחרת) בין המקורות השונים - הגיליון, דיסקוגס והוספות ידניות - כדי לאחד אותם לרשומה אחת.",
    'settings.discogsDupScanBtn':"🔍 בדיקת כפילויות",
    'settings.discogsDupNone':"לא נמצאו כפילויות חשודות כרגע.",
    'settings.discogsDupMergeBtn':"🔗 מזג - להשאיר את הרשומה מהגיליון",
    'settings.discogsDupKeepThis':(name)=>`להשאיר את: ${name}`,
    'settings.discogsDupCantRemoveSheet':"הרשומה מהגיליון לא ניתנת למחיקה מכאן - אפשר לתקן אותה בגיליון עצמו.",
    'settings.discogsDupMerged':"מוזג ✅ ההיסטוריה (סיבובים, אהובים, דירוגים) עברה לרשומה שנשארה.",
    'settings.discogsDupNotDup':"❌ זו לא כפילות",
    'settings.dupSourceSheet':"מהגיליון", 'settings.dupSourceDiscogs':"מדיסקוגס", 'settings.dupSourceLocal':"הוספה ידנית",
    'settings.removedTitle':"🗑️ תקליטים שהוסרו",
    'settings.removedHint':"תקליטים שהסרת מהאוסף (מכפתור ההסרה בעמוד התקליט) מופיעים כאן, גם אם הם עדיין קיימים בגיליון/דיסקוגס. אפשר לשחזר אותם בכל רגע.",
    'settings.removedNone':"לא הסרת אף תקליט.",
    'settings.removedRestoreBtn':"↩️ שחזור",
    'settings.undoLastSync': (n)=> n===1 ? `↩️ בטל את התקליט שנוסף בסנכרון האחרון` : `↩️ בטל ${n} תקליטים שנוספו בסנכרון האחרון`,
    'settings.undoLastDiscogsImport': (n)=> n===1 ? `↩️ בטל את התקליט שנוסף בייבוא הדיסקוגס האחרון` : `↩️ בטל ${n} תקליטים שנוספו בייבוא הדיסקוגס האחרון`,
    'detail.enrichOriginalYear':(y)=>`שנת הוצאה מקורית: ${y}`,
    'detail.enrichLabelCat':(label,cat)=> cat ? `${label} · ${cat}` : label,
    'detail.enrichSource':(src)=>`מקור: ${src}`,
    'detail.enrichTitleMismatch':(title)=>`⚠️ אולי טעות בשם: בדיסקוגס/MusicBrainz כתוב "${title}"`,
    'detail.enrichColorSuggest':(color)=>`💡 דיסקוגס מציע צבע: ${color}`,
    'detail.enrichEditionSuggest':(edition)=>`💡 דיסקוגס מציע מהדורה: ${edition}`,
    'detail.enrichLpCountSuggest':(n)=>`💡 דיסקוגס מציע כמות LP: ${n}`,
    'detail.enrichAcceptBtn':"✔ קבל שינוי",
    'detail.enrichSourceDiscogsCollection':"האוסף שלך בדיסקוגס", 'detail.enrichSourceDiscogsDb':"דיסקוגס",
    'detail.enrichSourceMusicbrainz':"MusicBrainz",
    'settings.sectionLanguage':"🌐 שפה",
    'settings.syncSubDiscogs':"💿 דיסקוגס",
    'settings.syncSubSheet':"☁️ מהגיליון", 'settings.syncSubExcel':"📤 מקובץ אקסל",
    'settings.switchProfileTitle':"🔁 החלפת פרופיל",
    'settings.sectionMainCollection':"☁️ האוסף הראשי", 'settings.sectionIncoming':"🚚 תקליטים שבדרך",
    'settings.sectionDiscogs':"💿 דיסקוגס", 'settings.sectionDanger':"⚠️ איפוס",
    'settings.feedbackTitle':"💡 הצעות לייעול", 'settings.feedbackHint':"יש לך רעיון לשיפור? ספר/י לי כאן!",
    'settings.feedbackNameLabel':"שם (אופציונלי)", 'settings.feedbackTextLabel':"ההצעה שלך", 'settings.feedbackSubmit':"שליחה ✨",
    'settings.feedbackSent':"תודה! ההצעה נשלחה 💌", 'settings.feedbackError':"משהו השתבש - נסה שוב מאוחר יותר",
    'prize.toastTitle':(name)=>`הישג חדש נפתח - ${name}!`, 'prize.toastCta':"קח אותי להישגים שלי",
    'prize.progressToNext':(n,next)=>`${n} מתוך ${next}`, 'prize.maxedOut':"הגעת לרמה המקסימלית! 🎉",
    'prize.fandomDesc':(name, artist)=> artist ? `סובבים 50 תקליטים של ${artist}` : `סובבים 50 תקליטים של האמן/ית`,
    'prize.wonLabel':"השגת את ההישג הזה! 🎉", 'prize.notWonLabel':"עדיין לא השגת את ההישג הזה",
    'prize.pride.title':"Over The Rainbow", 'prize.pride.hint':"נגנו 10 תקליטים שונים מכל צבע כדי לקבל את התג המיוחד",
    'prize.pride.done':"הושלם", 'prize.pride.patchTitle':"סיימת את אתגר Over The Rainbow! 🏳️‍🌈",
    'prize.pride.desc':(n,total)=>`צבעת ${n} מתוך ${total} צבעים בדגל - ניגנת 10 תקליטים שונים בכל צבע שנפתח`,
    'prize.pride.red':"אדום", 'prize.pride.orange':"כתום", 'prize.pride.yellow':"צהוב",
    'prize.pride.green':"ירוק", 'prize.pride.blue':"כחול", 'prize.pride.purple':"סגול",
    'coll.variantCount':"עותקים",
    'hist.period.month':"החודש", 'hist.period.3m':"3 חודשים אחרונים", 'hist.period.6m':"חצי שנה אחרונה",
    'hist.period.1y':"שנה אחרונה", 'hist.period.all':"כל הזמנים", 'hist.period.custom':"טווח מותאם",
    'hist.applyRange':"החל טווח",
    'hist.topRecords':"💿 התקליטים שניגנת הכי הרבה", 'hist.topArtists':"🎤 האמנים ששמעת הכי הרבה",
    'hist.byGenre':"🎼 סגנונות מוזיקליים", 'hist.byGender':"🎙 זמרים / זמרות",
    'hist.genreDrillHint':"לחצו על סגנון כדי לראות פילוח לתתי-סגנונות",
    'stats.pieTapHint':"הקישו על חלק בעוגה לפרטים", 'stats.otherSmall':"אחרים (מתחת ל-2%)",
    'hist.recentEmpty':"אין עדיין סיבובים מתועדים.",
    'hist.recentPartial':(n)=>` (חלקי · ${n} צד${n===1?'':'ים'})`,
    'detail.lpCount':(n)=>`${n} LP`,
    'quiz.skip':"דלג על השאלה ⏭", 'quiz.finishNow':"מספיק שאלות, תן לי המלצה כבר 🙏",
    'quiz.progress':(i,n)=>`שאלה ${i} · נשארו ${n} תקליטים בטווח`,
    'result.another':"עוד אחד 🔁", 'result.done':"מעולה, זהו! ✔", 'result.kicker':"🎧 זה הזמן לנגן!",
    'result.doneModalTitle':"רוצה לתעד את הסיבוב?", 'result.doneModalSkip':"עדיין לא ניגנתי, דלג",
    'browse.addTitle':"הוספת תקליטים", 'browse.searchPh':"חיפוש לפי אמן, אלבום, שיר או סגנון…",
    'browse.hint':"לוחצים על תקליט כדי לפתוח את דף התקליט, או על ➕ למעלה כדי להוסיף חדש. החלקה ימינה על תקליט מציגה אפשרות הסרה.",
    'browse.swipeDeleteLabel':"הסרה",
    'filter.all':"הכל", 'filter.byLetter':"א-ת", 'filter.byType':"סוג", 'filter.bySize':"גודל", 'filter.byLanguage':"שפה", 'filter.favorites':"⭐ מועדפים", 'filter.excluded':"🚫 האפליקציה מדלגת", 'filter.clear':"✖ נקה סינון",
    'filter.sortByArtist':"🔤 מיון: אמן", 'filter.sortByAlbum':"🔤 מיון: אלבום",
    'filter.byEdition':"מהדורה", 'filter.byColor':"צבע", 'filter.byDecade':"עשור", 'filter.byYear':"שנה מדויקת", 'filter.bySigned':"חתימה",
    'filter.signedYes':"✍️ חתום", 'filter.signedNo':"לא חתום", 'filter.noValuesYet':"לא הוזנו ערכים עדיין",
    'filter.groupByArtist':"📁 קבץ לפי אמן", 'filter.layoutList':"▤ פריסה: רשימה", 'filter.layoutGrid':"▦ פריסה: עטיפות",
    'filter.recentlyAdded':"🆕 נוספו לאחרונה",
    'filter.recentEmpty':"עוד לא נוסף שום תקליט מאז שהתחלנו לעקוב אחרי זה. תקליטים שכבר היו באוסף לפני כן לא נספרים (אין לנו איך לדעת מתי הם נוספו באמת).",
    'filter.noResults':"לא נמצאו תקליטים תואמים.",
    'filter.addedToday':"נוסף היום",
    'filter.addedYesterday':"נוסף אתמול",
    'filter.addedDaysAgo': (n)=>`נוסף לפני ${n} ימים`,
    'filter.addedOnDate': (d)=>`נוסף ב-${d}`,
    'add.syncTitle':"🔄 סנכרון מהגיליון",
    'add.syncHint':"מושך את הרשימה העדכנית מגיליון Google Sheets, מתייג הכל אוטומטית ומעדכן את האפליקציה. תקליטים שהוספת כאן ידנית נשארים.",
    'add.syncNow':"סנכרן עכשיו", 'add.uploadTitle':"📤 טעינת אוסף מקובץ אקסל",
    'add.syncNoSheetId':"צריך להזין מזהה גיליון (Sheet ID) או קישור מלא לגיליון ה-Google Sheets שלך.",
    'add.resyncTracklists':"🎵 סנכרון מלא של כל רשימות השירים מההתחלה",
    'add.resyncTracklistsConfirm':"זה ימחק את כל רשימות השירים השמורות ויביא אותן מחדש לכל התקליטים באוסף. זה עלול לקחת כמה דקות. להמשיך?",
    'add.resyncTracklistsProgress':(done,total)=>`מסנכרן רשימות שירים… ${done} / ${total}`,
    'add.resyncTracklistsDone':(total)=>`הסתיים! עודכנו רשימות שירים ל-${total} תקליטים ✅`,
    'add.uploadHint':"אם אין לך גיליון Google Sheets, אפשר להעלות קובץ אקסל (או CSV) בפורמט המתאים - זה יחליף את כל האוסף באפליקציה הזו.",
    'add.singleTitle':"הוספת תקליט בודד", 'add.artist':"אמן", 'add.album':"אלבום", 'add.type':"סוג", 'add.format':"גודל (״)",
    'add.year':"שנת הוצאה", 'add.language':"שפה", 'add.edition':"מהדורה (Pressing/Edition)", 'add.color':"צבע הוויניל",
    'add.lpCount':"כמות LP",
    'add.signed':"חתום על ידי האמן/ית", 'add.submit':"הוסף ותייג אוטומטית ✨",
    'barcode.scanBtn':"📷 הוספה לפי סריקת ברקוד", 'barcode.scanBtnHint':"סורקים את הברקוד שבגב התקליט וממלאים את הפרטים אוטומטית מדיסקוגס",
    'barcode.modalTitle':"סריקת ברקוד", 'barcode.needConnect':"כדי לסרוק ברקודים צריך קודם להתחבר לדיסקוגס בהגדרות.",
    'barcode.goToSettings':"מעבר להגדרות", 'barcode.hint':"כוונו את המצלמה לברקוד שבגב התקליט.",
    'barcode.manualLabel':"או להזין את מספר הברקוד ידנית", 'barcode.manualBtn':"חיפוש",
    'barcode.searching':"מחפש בדיסקוגס...", 'barcode.notFound':"משהו השתבש בחיפוש - נסו שוב.",
    'barcode.notFoundFor':(code)=>`לא נמצאה תוצאה בדיסקוגס לברקוד ${code}.`,
    'barcode.useResult':"השתמש בפרטים האלה", 'barcode.tryAgain':"נסה שוב",
    'barcode.cameraError':"לא הצלחנו לגשת למצלמה. אפשר להזין את הברקוד ידנית למטה.",
    'add.resetBtn':"איפוס לתמונת המאגר המקורית (מוחק תוספות ידניות בדפדפן הזה)",
    'type.studio':"אלבום סטודיו", 'type.single':"סינגל", 'type.ep':"מיני אלבום", 'type.liveAlbum':"אלבום לייב",
    'type.collection':"אוסף", 'type.holiday':"אלבום חג מולד", 'type.soundtrack':"פסקול",
    'lang.english':"אנגלית", 'lang.hebrew':"עברית", 'lang.other':"אחר",
    'wishlist.title':"Wishlist", 'wishlist.addTitle':"🌟 הוספה ל-Wishlist", 'wishlist.addToggle':"🌟 הוספה ל-Wishlist",
    'wishlist.suggestTitle':"✨ יכול להיות שתאהב את...", 'wishlist.suggestHint':"הצעות המבוססות על האמנים שיש לך הכי הרבה תקליטים שלהם באוסף.",
    'wishlist.suggestLoading':"מחפש הצעות עבורך...", 'wishlist.suggestEmpty':"לא נמצאו הצעות כרגע - נסו שוב מאוחר יותר.",
    'wishlist.suggestAdded':"נוסף ל-Wishlist ✅", 'wishlist.suggestRefresh':"🔄 הצעות חדשות",
    'wishlist.addHint':"מזינים אמן, אלבום ופרטי פרסינג (אופציונלי) - שאר הנתונים (שנה, סגנון, קאבר) יימשכו אוטומטית מהאינטרנט.",
    'wishlist.submit':"הוספה לרשימה ✨", 'wishlist.remove':"🗑️ הסרה", 'wishlist.promote':"✔ הוסף לאוסף",
    'wishlist.empty':"הרשימה ריקה - הוסיפו תקליט שהייתם רוצים להשיג!",
    'wishlist.linkLabel':"קישור למהדורה ספציפית (אופציונלי)", 'wishlist.viewListing':"🔗 קישור למהדורה",
    'wishlist.fetching':"מחפש פרטים באינטרנט…",
    'modal.tags':"תגיות (מופרדות בפסיק)", 'modal.tagsHint':"אפשר להוסיף כל תגית שרוצים - מצב רוח, נושא, כל מה שעולה לך בראש.",
    'modal.neverRecommend':"🚫 אל תמליץ לי על התקליט הזה לעולם", 'modal.cancel':"ביטול", 'modal.save':"שמור",
    'modal.neverRecommendTitle':"אל תמליץ על התקליט הזה", 'modal.neverRecommendConfirm':"אתה בטוח שאתה רוצה שלא נמליץ על התקליט הזה יותר?",
    'spin.logPrompt':"תיעוד סיבוב:", 'spin.howManySides':"כמה צדדים ניגנת?",
    'spin.full':"סיבוב מלא", 'spin.partial':"סיבוב חלקי", 'spin.notYet':"עדיין לא סובבת את זה 🎧",
    'spin.logAtAnotherTime':"🕐 תיעוד בזמן אחר", 'spin.logNow':"🕐 עכשיו",
    'spin.pickTimeFirst':"בחרו תאריך ושעה קודם", 'spin.futureTimeError':"אי אפשר לתעד סיבוב בעתיד",
    'settings.needleTitle':"🪡 אורך חיי המחט", 'settings.needleHint':"בחרו את סוג המחט - אורך החיים המוערך נקבע אוטומטית לפי הסוג. עם כל סיבוב מתועד, נוריד מהמחט בהתאם למשך הזמן האמיתי של האלבום (נמשך אוטומטית) חלקי כמות הצדדים - וגם ניגון חלקי מוריד יחסית.",
    'settings.needleName':"שם/דגם המחט (לא חובה)", 'settings.needleHours':"אורך חיים מוערך (בשעות)", 'settings.needleSideMinutes':"הערכת זמן ממוצע לצד (בדקות)",
    'settings.needleType':"סוג המחט", 'settings.needleBaseHours':"כמות שעות שכבר נוגן עם המחט הזו (אופציונלי)",
    'settings.needleSave':"💾 שמירה", 'settings.needleSaved':"נשמר!", 'settings.needleReplace':"🔄 החלפתי מחט (איפוס)",
    'settings.needleReplaceConfirm':"לאפס את מד השחיקה ולהתחיל למחט חדשה?", 'settings.needleReplaced':"המחט אופסה 🪡✨",
    'settings.needleNotSet':"עדיין לא נבחר סוג מחט.", 'settings.needleDefaultName':"המחט שלי",
    'settings.needleHoursUnit':"שעות",
    'detail.about':"על האלבום", 'detail.aboutLoading':"מרכיב תיאור מהעובדות…", 'detail.aboutEmpty':"לא נמצא מידע על האלבום הזה.",
    'detail.tracklist':"רשימת שירים", 'detail.tracklistLoading':"טוען רשימת שירים…", 'detail.tracklistEmpty':"לא נמצאה רשימת שירים לאלבום הזה.",
    'detail.wikiSource':"המקור: MusicBrainz",
    'detail.wikiSourceFix':"🔗 המקור לא מדויק? קבע/י קישור ל-MusicBrainz",
    'detail.wikiSourceEdit':"🔗 עריכת מקור ה-MusicBrainz שנקבע",
    'incoming.title':"🚚 בדרך אליי", 'incoming.hint':"תקליטים שהזמנת ומחכים להגיע - מסונכרן מהגיליון שלך או מקובץ אקסל. לוחצים ✔ כדי להוסיף לאוסף בפועל כשהוא מגיע. את הגדרות הסנכרון אפשר לשנות בהגדרות ⚙️ < סנכרון אוסף.",
    'incoming.settingsToggle':"⚙️ הגיליון שלי לתקליטים שבדרך", 'incoming.sheetLabel':"מזהה הגיליון (Sheet ID) או קישור מלא", 'incoming.tabLabel':"שם הגיליון (Tab) בתוך הקובץ", 'incoming.saveSettings':"שמור וסנכרן",
    'incoming.sheetSyncHint':"גיליון (יכול להיות אותו גיליון של האוסף, בטאב נפרד, או גיליון אחר לגמרי) עם רשימת התקליטים שבדרך אליך.",
    'incoming.uploadTitle':"🚚 טעינת \"מה שבדרך\" מקובץ אקסל", 'incoming.uploadHint':"אפשר גם לעדכן את רשימת התקליטים שבדרך אליך מקובץ אקסל (או CSV), באותו פורמט כמו הגיליון - זה יחליף את הרשימה הנוכחית.",
    'incoming.uploadSuccess':(n)=>`נטענו ${n} תקליטים לרשימת "בדרך אליי" ✅`, 'incoming.uploadEmpty':"לא נמצאו שורות תקינות בקובץ.",
    'incoming.loading':"טוען…", 'incoming.empty':"אין כרגע תקליטים בדרך.", 'incoming.added':"✔ נוסף לאוסף",
    'incoming.promote':"✔ הוסף לאוסף", 'incoming.error':"לא הצלחתי לטעון את הרשימה. (שגיאה: __ERR__)",
    'incoming.manualTitle':"➕ הוספה ידנית לרשימת \"בדרך אליי\"", 'incoming.notesLabel':"הערות (סטטוס משלוח וכו')",
    'incoming.manualToggle':"➕ הוספה ידנית לרשימת \"בדרך אליי\"",
    'incoming.manualSubmit':"הוסף לרשימת \"בדרך אליי\" ✨", 'incoming.manualBadge':"נוסף ידנית",
  },
  en: {
    'ob.welcome':"Welcome to What's Spinning! 🎶", 'ob.whatsYourName':"What's your name?", 'ob.namePh':"Your name",
    'ob.whereFrom':"How do you want to start?", 'ob.whereFromSub':"Import your collection from Discogs, or start with an empty one - you can always import from Excel or a Google Sheet later, from Settings",
    'ob.startFresh':"✨ Start a new collection",
    'ob.haveSheet':"📄 I have a Google Sheet", 'ob.sheetIdLabel':"Sheet ID or full link", 'ob.sheetIdPh':"1EUe7bO... or full sheet link",
    'ob.syncStart':"Sync & start", 'ob.haveExcel':"📤 I have an Excel file of my collection",
    'ob.uploadHint':"No Google Sheet? Upload an Excel (or CSV) file in the right format and it'll load as your collection.",
    'ob.downloadTemplate':"⬇️ Download sample template", 'ob.seeExample':"👀 See what the format should look like",
    'ob.haveDiscogs':"💿 I have a Discogs collection", 'ob.discogsHint':"Connect with a Personal Access Token and import your whole Discogs collection straight into the app.",
    'ob.discogsConnectAndImport':"🔗 Connect & import collection",
    'home.favorites':"⭐ Your favorites",
    'home.quiz.label':"Let's pick a record together", 'home.quiz.desc':"Find the right record for your mood",
    'home.random.label':"Pick one for me at random", 'home.random.desc':"A random record from the whole collection",
    'home.noRecordsYet':"There are no records in the collection yet. You can add some from Settings ⚙️ - connect Discogs, a Google Sheet, or an Excel file.",
    'home.browse.label':"My Collection", 'home.browse.desc':"Search, tags and styles",
    'home.recent.label':"My Activity",
    'home.history.label':"Stats", 'home.history.desc':"How many times and when did you spin each record?",
    'home.feedback':"💡 Got a suggestion? Tell Roy on Instagram", 'home.switchProfile':"Not you? Switch profile / collection",
    'home.switchProfileNamed':(name)=>`Not ${name}? Switch profile / collection`,
    'home.dedication':"With love to Oral 💜 who loves stats and collection documentation more than anyone",
    'nav.home':"‹ Home", 'nav.browse':"‹ Collection",
    'nav.title.history':"Statistics", 'nav.title.recent':"My Activity", 'nav.title.quiz':"What am I in the mood for?", 'nav.title.result':"Your pick",
    'nav.title.browse':"My Collection", 'nav.title.add':"Add records", 'nav.title.wishlist':"Wishlist", 'nav.title.incoming':"On the way",
    'hist.totalSpins':"Total spins", 'hist.distinct':"Records spun", 'hist.partial':"Of which partial spins", 'hist.sides':"Sides played (partial spins)",
    'hist.streak':"Current day streak", 'hist.bestStreak':"Longest streak",
    'hist.byMonth':"📅 Spins by month", 'hist.byDecade':"🕰 Spins by decade", 'hist.byYear':"📆 Spins by year",
    'hist.topArtist':(name,count)=>`🎤 Most-played artist: <b>${name}</b> (${count} spins)`,
    'hist.topGenre':(name,count)=>`🎼 Most-played genre: <b>${name}</b> (${count} spins)`,
    'hist.noData':"Not enough data yet", 'stats.openFullRecord':"Open full record page",
    'hist.showMore':"Show more ▾", 'hist.showLess':"Show less ▴",
    'hist.empty':"You haven't spun a record yet. Every time you drop the needle, log it from the collection or the result screen 🎶",
    'hist.deleteSpin':"Delete this spin", 'hist.deleteSpinConfirm':"Delete this spin from your history?",
    'hist.tabRecent':"🕒 Recent spins", 'hist.tabStats':"📊 Listening stats", 'hist.tabCollection':"📀 Collection stats",
    'coll.totalRecords':"Records in collection", 'coll.distinctArtists':"Distinct artists", 'coll.topArtists':"🎤 Artists with the most records",
    'coll.byYear':"📅 Timeline - records by release year", 'coll.variants':"🧬 Variants", 'coll.noVariants':"No records with multiple copies found in your collection.",
    'coll.ratingsTitle':"⭐ Ratings", 'coll.ratingsMusic':"🎵 Music", 'coll.ratingsPressing':"💿 Pressing",
    'coll.ratingsAvg':(avg,n)=>`${avg} ⭐ average (${n} rated)`, 'coll.ratingsNoData':"No ratings yet.",
    'coll.ratingsStars':(n)=>`${n}⭐`,
    'coll.timelineHint':"Tap a decade to see the year-by-year breakdown",
    'coll.timelineYearCaption':(y,cnt)=>`${y}: ${cnt} record${cnt===1?'':'s'}`,
    'coll.timelineDecadeCaption':(d,cnt)=>`${d}: ${cnt} record${cnt===1?'':'s'}`,
    'coll.timelineAllTimes':"All times", 'coll.timelineByDecade':"By decade",
    'coll.timelineDecadeDrillHint':"Year-by-year breakdown - tap the decade again to close",
    'home.prizes.label':"Achievements", 'nav.title.prizes':"Achievements",
    'home.social.label':"Social", 'nav.title.social':"Social", 'social.comingSoon':"Coming soon...",
    'activity.friends':"Friends", 'activity.joined':(date)=>`Joined ${date}`,
    'activity.hoursListened':"Hours listened", 'activity.achievements':"Achievements",
    'activity.viewAchievements':"View achievements →", 'activity.bestStreak':(n)=>`Best: ${n} days`,
    'activity.recentlyPlayed':"🕒 Recently played", 'activity.chooseBanner':"Choose a banner",
    'prize.sectionGeneral':"General", 'prize.sectionGenres':"Genres", 'prize.sectionDecades':"Decades",
    'prize.sectionSeasonal':"Seasonal", 'prize.sectionFandom':"Fandoms",
    'nav.title.settings':"Settings", 'settings.tabUser':"👤 User", 'settings.tabLang':"🌐 Language",
    'settings.tabNeedle':"🪡 Needle",
    'settings.tabSync':"🔄 Collection Sync", 'settings.tabFeedback':"💡 Suggestions",
    'settings.greeting':(name)=> name ? `Hi ${name} 👋` : "Hi there 👋",
    'settings.uploadPhoto':"📷 Upload profile photo",
    'settings.signOutTitle':"🗑️ Delete account",
    'settings.signOutHint':"Permanently deletes your entire collection, ratings, play history and everything else stored in this browser, and starts from scratch. Different from \"Switch profile\", which only changes the name and keeps the collection.",
    'settings.signOutBtn':"🗑️ Delete account",
    'settings.langHint':"Change the app's display language",
    'settings.comingSoonSheetTitle':"🚚 My on-the-way sheet",
    'settings.discogsTitle':"💿 Discogs & MusicBrainz",
    'settings.discogsHint':"Enriches every record with accurate info: first from your own Discogs collection, then Discogs' general database, and finally MusicBrainz (a free database that needs no login). Always uses the original release year, not the specific pressing's year.",
    'settings.discogsTokenLabel':"Personal Access Token",
    'settings.discogsConnectBtn':"🔗 Connect Discogs", 'settings.discogsGetTokenLink':"How do I get a personal token?",
    'settings.discogsTokenMissing':"Paste a token first", 'settings.discogsConnecting':"Connecting…",
    'settings.discogsConnectError':"Connection failed - check the token and try again",
    'settings.discogsConnectedAs':(name)=>`Connected to Discogs as: ${name}`,
    'settings.discogsDisconnectBtn':"Disconnect Discogs",
    'settings.discogsSyncBtn':"🔄 Sync collection data",
    'settings.discogsSyncNoteNoToken':"Without a Discogs connection, sync will only use MusicBrainz.",
    'settings.discogsFetchingCollection':"Loading your Discogs collection…",
    'settings.discogsFetchingCollectionProgress':(page,pages)=>`Loading your Discogs collection… (page ${page} of ${pages})`,
    'settings.discogsCollectionFetchError':"Couldn't load your Discogs collection - continuing with the other sources",
    'settings.discogsSyncProgress':(done,total)=>`Processing record ${done} of ${total}…`,
    'settings.discogsSyncSummary':(coll,db,mb,unmatched)=>`Found: ${coll} from your Discogs collection, ${db} from Discogs' general database, ${mb} from MusicBrainz. Not found: ${unmatched}.`,
    'settings.discogsForceResync':"Full resync (ignores what's already found)",
    'settings.discogsImportTitle':"📥 Full collection import from Discogs (no sheet or Excel needed)",
    'settings.discogsImportHint':"Pulls your entire Discogs collection and adds it as records in the app. Records that already exist (from your sheet or Excel) won't be duplicated.",
    'settings.discogsImportBtn':"📥 Import collection from Discogs",
    'settings.discogsImportFetching':"Loading your Discogs collection…",
    'settings.discogsImportDone':(added,total)=>`Added ${added} new records out of ${total} in your Discogs collection (the rest already existed).`,
    'settings.discogsImportError':"Import failed - try again",
    'settings.discogsDupTitle':"🔗 Possible duplicate records",
    'settings.discogsDupHint':"Checks whether some records look very similar (e.g. a slightly different spelling) across your sources - the sheet, Discogs and manual additions - so you can merge them into one.",
    'settings.discogsDupScanBtn':"🔍 Scan for duplicates",
    'settings.discogsDupNone':"No suspected duplicates found right now.",
    'settings.discogsDupMergeBtn':"🔗 Merge - keep the sheet record",
    'settings.discogsDupKeepThis':(name)=>`Keep: ${name}`,
    'settings.discogsDupCantRemoveSheet':"The sheet record can't be removed from here - fix it in the sheet itself.",
    'settings.discogsDupMerged':"Merged ✅ history (spins, favorites, ratings) moved to the record that stayed.",
    'settings.discogsDupNotDup':"❌ Not a duplicate",
    'settings.dupSourceSheet':"from the sheet", 'settings.dupSourceDiscogs':"from Discogs", 'settings.dupSourceLocal':"manual addition",
    'settings.removedTitle':"🗑️ Removed records",
    'settings.removedHint':"Records you removed from the collection (via the remove button on the record page) show up here, even if they're still in your sheet/Discogs. You can restore them anytime.",
    'settings.removedNone':"You haven't removed any records.",
    'settings.removedRestoreBtn':"↩️ Restore",
    'settings.undoLastSync': (n)=> `↩️ Undo ${n} record${n===1?'':'s'} added by the last sync`,
    'settings.undoLastDiscogsImport': (n)=> `↩️ Undo ${n} record${n===1?'':'s'} added by the last Discogs import`,
    'detail.enrichOriginalYear':(y)=>`Original release year: ${y}`,
    'detail.enrichLabelCat':(label,cat)=> cat ? `${label} · ${cat}` : label,
    'detail.enrichSource':(src)=>`Source: ${src}`,
    'detail.enrichTitleMismatch':(title)=>`⚠️ Possible title typo: Discogs/MusicBrainz has it as "${title}"`,
    'detail.enrichColorSuggest':(color)=>`💡 Discogs suggests color: ${color}`,
    'detail.enrichEditionSuggest':(edition)=>`💡 Discogs suggests edition: ${edition}`,
    'detail.enrichLpCountSuggest':(n)=>`💡 Discogs suggests LP count: ${n}`,
    'detail.enrichAcceptBtn':"✔ Accept",
    'detail.enrichSourceDiscogsCollection':"your Discogs collection", 'detail.enrichSourceDiscogsDb':"Discogs",
    'detail.enrichSourceMusicbrainz':"MusicBrainz",
    'settings.sectionLanguage':"🌐 Language",
    'settings.syncSubDiscogs':"💿 Discogs",
    'settings.syncSubSheet':"☁️ From sheet", 'settings.syncSubExcel':"📤 From Excel file",
    'settings.switchProfileTitle':"🔁 Switch profile",
    'settings.sectionMainCollection':"☁️ Main collection", 'settings.sectionIncoming':"🚚 On the way",
    'settings.sectionDiscogs':"💿 Discogs", 'settings.sectionDanger':"⚠️ Reset",
    'settings.feedbackTitle':"💡 Suggestions", 'settings.feedbackHint':"Got an idea to improve the app? Tell me here!",
    'settings.feedbackNameLabel':"Name (optional)", 'settings.feedbackTextLabel':"Your suggestion", 'settings.feedbackSubmit':"Send ✨",
    'settings.feedbackSent':"Thanks! Your suggestion was sent 💌", 'settings.feedbackError':"Something went wrong - try again later",
    'prize.toastTitle':(name)=>`New achievement unlocked - ${name}!`, 'prize.toastCta':"Take me to my achievements",
    'prize.progressToNext':(n,next)=>`${n} out of ${next}`, 'prize.maxedOut':"You've reached the max level! 🎉",
    'prize.fandomDesc':(name, artist)=> artist ? `Spin 50 records by ${artist}` : `Spin 50 records by that artist`,
    'prize.wonLabel':"You've earned this achievement! 🎉", 'prize.notWonLabel':"Not earned yet",
    'prize.pride.title':"Over The Rainbow", 'prize.pride.hint':"Spin 10 different records of every color to earn the special badge",
    'prize.pride.done':"Completed", 'prize.pride.patchTitle':"You completed the Over The Rainbow challenge! 🏳️‍🌈",
    'prize.pride.desc':(n,total)=>`You've colored in ${n} out of ${total} colors - spin 10 different records in each color to unlock it`,
    'prize.pride.red':"Red", 'prize.pride.orange':"Orange", 'prize.pride.yellow':"Yellow",
    'prize.pride.green':"Green", 'prize.pride.blue':"Blue", 'prize.pride.purple':"Purple",
    'coll.variantCount':"copies",
    'hist.period.month':"This month", 'hist.period.3m':"Last 3 months", 'hist.period.6m':"Last 6 months",
    'hist.period.1y':"Last year", 'hist.period.all':"All time", 'hist.period.custom':"Custom range",
    'hist.applyRange':"Apply range",
    'hist.topRecords':"💿 Your most-played records", 'hist.topArtists':"🎤 Your most-played artists",
    'hist.byGenre':"🎼 Genres", 'hist.byGender':"🎙 Singers",
    'hist.genreDrillHint':"Tap a genre to see the sub-genre breakdown",
    'stats.pieTapHint':"Tap a slice for details", 'stats.otherSmall':"Others (under 2%)",
    'hist.recentEmpty':"No spins logged yet.",
    'hist.recentPartial':(n)=>` (partial · ${n} side${n===1?'':'s'})`,
    'detail.lpCount':(n)=>`${n} LP`,
    'quiz.skip':"Skip this question ⏭", 'quiz.finishNow':"Enough questions, just give me a recommendation 🙏",
    'quiz.progress':(i,n)=>`Question ${i} · ${n} records left in range`,
    'result.another':"Another one 🔁", 'result.done':"Great, that's it! ✔", 'result.kicker':"🎧 Time to play!",
    'result.doneModalTitle':"Want to log the spin?", 'result.doneModalSkip':"Haven't played it yet, skip",
    'browse.addTitle':"Add records", 'browse.searchPh':"Search by artist, album, song or style…",
    'browse.hint':"Tap a record to open its page, or ➕ above to add a new one. Swipe right on a record to reveal the remove option.",
    'browse.swipeDeleteLabel':"Remove",
    'filter.all':"All", 'filter.byLetter':"A-Z", 'filter.byType':"Type", 'filter.bySize':"Size", 'filter.byLanguage':"Language", 'filter.favorites':"⭐ Favorites", 'filter.excluded':"🚫 App skips these", 'filter.clear':"✖ Clear filter",
    'filter.sortByArtist':"🔤 Sort: Artist", 'filter.sortByAlbum':"🔤 Sort: Album",
    'filter.byEdition':"Edition", 'filter.byColor':"Color", 'filter.byDecade':"Decade", 'filter.byYear':"Exact year", 'filter.bySigned':"Signed",
    'filter.signedYes':"✍️ Signed", 'filter.signedNo':"Not signed", 'filter.noValuesYet':"No values logged yet",
    'filter.groupByArtist':"📁 Group by artist", 'filter.layoutList':"▤ Layout: list", 'filter.layoutGrid':"▦ Layout: covers",
    'filter.recentlyAdded':"🆕 Recently added",
    'filter.recentEmpty':"Nothing's been added since we started tracking this. Records that were already in the collection before don't count - there's no way to know when they were actually added.",
    'filter.noResults':"No matching records found.",
    'filter.addedToday':"Added today",
    'filter.addedYesterday':"Added yesterday",
    'filter.addedDaysAgo': (n)=>`Added ${n} days ago`,
    'filter.addedOnDate': (d)=>`Added on ${d}`,
    'add.syncTitle':"🔄 Sync from sheet",
    'add.syncHint':"Pulls the latest list from your Google Sheet, auto-tags everything and updates the app. Records you added here manually stay.",
    'add.syncNow':"Sync now", 'add.uploadTitle':"📤 Load collection from Excel file",
    'add.syncNoSheetId':"Enter a Sheet ID or a full link to your Google Sheet.",
    'add.resyncTracklists':"🎵 Full resync of all tracklists from scratch",
    'add.resyncTracklistsConfirm':"This will delete all saved tracklists and re-fetch them for every record in your collection. It might take a few minutes. Continue?",
    'add.resyncTracklistsProgress':(done,total)=>`Syncing tracklists… ${done} / ${total}`,
    'add.resyncTracklistsDone':(total)=>`Done! Tracklists updated for ${total} records ✅`,
    'add.uploadHint':"No Google Sheet? Upload an Excel (or CSV) file in the right format - this replaces the whole collection in this app.",
    'add.singleTitle':"Add a single record", 'add.artist':"Artist", 'add.album':"Album", 'add.type':"Type", 'add.format':"Size (\")",
    'add.year':"Release year", 'add.language':"Language", 'add.edition':"Pressing / Edition", 'add.color':"Vinyl color",
    'add.lpCount':"LP count",
    'add.signed':"Signed by the artist", 'add.submit':"Add & auto-tag ✨",
    'barcode.scanBtn':"📷 Add by scanning a barcode", 'barcode.scanBtnHint':"Scan the barcode on the back of the record and the details fill in automatically from Discogs",
    'barcode.modalTitle':"Scan barcode", 'barcode.needConnect':"To scan barcodes you need to connect to Discogs in Settings first.",
    'barcode.goToSettings':"Go to Settings", 'barcode.hint':"Point the camera at the barcode on the back of the record.",
    'barcode.manualLabel':"Or enter the barcode number manually", 'barcode.manualBtn':"Search",
    'barcode.searching':"Searching Discogs...", 'barcode.notFound':"Something went wrong with the search - try again.",
    'barcode.notFoundFor':(code)=>`No Discogs result found for barcode ${code}.`,
    'barcode.useResult':"Use these details", 'barcode.tryAgain':"Try again",
    'barcode.cameraError':"Couldn't access the camera. You can enter the barcode manually below.",
    'add.resetBtn':"Reset to the original collection (deletes manual additions in this browser)",
    'type.studio':"Studio album", 'type.single':"Single", 'type.ep':"EP", 'type.liveAlbum':"Live album",
    'type.collection':"Compilation", 'type.holiday':"Holiday album", 'type.soundtrack':"Soundtrack",
    'lang.english':"English", 'lang.hebrew':"Hebrew", 'lang.other':"Other",
    'wishlist.title':"Wishlist", 'wishlist.addTitle':"🌟 Add to wishlist", 'wishlist.addToggle':"🌟 Add to wishlist",
    'wishlist.suggestTitle':"✨ You might like...", 'wishlist.suggestHint':"Suggestions based on the artists you have the most records from.",
    'wishlist.suggestLoading':"Looking for suggestions...", 'wishlist.suggestEmpty':"No suggestions right now - try again later.",
    'wishlist.suggestAdded':"Added to wishlist ✅", 'wishlist.suggestRefresh':"🔄 New suggestions",
    'wishlist.addHint':"Enter artist, album and pressing details (optional) - the rest (year, style, cover) is fetched automatically from the internet.",
    'wishlist.submit':"Add to wishlist ✨", 'wishlist.remove':"🗑️ Remove", 'wishlist.promote':"✔ Add to collection",
    'wishlist.empty':"Your wishlist is empty - add a record you'd like to get!",
    'wishlist.linkLabel':"Link to a specific pressing (optional)", 'wishlist.viewListing':"🔗 View listing",
    'wishlist.fetching':"Looking up details online…",
    'modal.tags':"Tags (comma separated)", 'modal.tagsHint':"Add any tag you like - mood, theme, whatever comes to mind.",
    'modal.neverRecommend':"🚫 Never recommend this record to me", 'modal.cancel':"Cancel", 'modal.save':"Save",
    'modal.neverRecommendTitle':"Never recommend this record", 'modal.neverRecommendConfirm':"Are you sure you don't want us to recommend this record anymore?",
    'spin.logPrompt':"Log a spin:", 'spin.howManySides':"How many sides did you play?",
    'spin.full':"Full spin", 'spin.partial':"Partial spin", 'spin.notYet':"Haven't spun this yet 🎧",
    'spin.logAtAnotherTime':"🕐 Log at another time", 'spin.logNow':"🕐 Now",
    'spin.pickTimeFirst':"Pick a date and time first", 'spin.futureTimeError':"Can't log a spin in the future",
    'settings.needleTitle':"🪡 Needle lifespan", 'settings.needleHint':"Pick your needle's type - its estimated lifespan is set automatically from the type. Every logged spin deducts the album's real play time (fetched automatically) divided by the number of sides - partial spins deduct proportionally.",
    'settings.needleName':"Needle name/model (optional)", 'settings.needleHours':"Estimated lifespan (hours)", 'settings.needleSideMinutes':"Average minutes per side",
    'settings.needleType':"Needle type", 'settings.needleBaseHours':"Hours already played with this needle (optional)",
    'settings.needleSave':"💾 Save", 'settings.needleSaved':"Saved!", 'settings.needleReplace':"🔄 I replaced the needle (reset)",
    'settings.needleReplaceConfirm':"Reset wear tracking and start fresh with a new needle?", 'settings.needleReplaced':"Needle reset 🪡✨",
    'settings.needleNotSet':"No needle type selected yet.", 'settings.needleDefaultName':"My needle",
    'settings.needleHoursUnit':"hours",
    'detail.about':"About the album", 'detail.aboutLoading':"Composing a description from the facts…", 'detail.aboutEmpty':"No info found for this album.",
    'detail.tracklist':"Tracklist", 'detail.tracklistLoading':"Loading tracklist…", 'detail.tracklistEmpty':"No tracklist found for this album.",
    'detail.wikiSource':"Source: MusicBrainz",
    'detail.wikiSourceFix':"🔗 Source not right? Set a MusicBrainz link",
    'detail.wikiSourceEdit':"🔗 Edit the MusicBrainz source you set",
    'incoming.title':"🚚 On the way to me", 'incoming.hint':"Records you've ordered that are on the way - synced from your sheet or an Excel file. Tap ✔ to add it to your real collection once it arrives. You can change the sync settings in Settings ⚙️ < Collection Sync.",
    'incoming.settingsToggle':"⚙️ My Coming Soon sheet", 'incoming.sheetLabel':"Sheet ID or full link", 'incoming.tabLabel':"Tab name inside the file", 'incoming.saveSettings':"Save & sync",
    'incoming.sheetSyncHint':"A sheet (can be the same collection sheet in a separate tab, or a completely different sheet) listing the records that are on the way to you.",
    'incoming.uploadTitle':"🚚 Load \"on the way\" from an Excel file", 'incoming.uploadHint':"You can also update your \"on the way\" list from an Excel file (or CSV), in the same format as the sheet - this replaces the current list.",
    'incoming.uploadSuccess':(n)=>`Loaded ${n} records into the "on the way" list ✅`, 'incoming.uploadEmpty':"No valid rows were found in the file.",
    'incoming.loading':"Loading…", 'incoming.empty':"Nothing on the way right now.", 'incoming.added':"✔ Added to collection",
    'incoming.promote':"✔ Add to collection", 'incoming.error':"Couldn't load the list. (Error: __ERR__)",
    'incoming.manualTitle':"➕ Manually add to \"On the way\"", 'incoming.notesLabel':"Notes (shipping status, etc.)",
    'incoming.manualToggle':"➕ Manually add to \"On the way\"",
    'incoming.manualSubmit':"Add to \"On the way\" ✨", 'incoming.manualBadge':"Added manually",
  }
};
function t(key){
  const v = (I18N[LANG] && I18N[LANG][key]) || (I18N.he && I18N.he[key]);
  return typeof v === 'function' ? v : v;
}
function tf(key, ...args){
  const fn = (I18N[LANG] && I18N[LANG][key]) || (I18N.he && I18N.he[key]);
  return typeof fn === 'function' ? fn(...args) : (fn || '');
}
function applyI18n(){
  document.documentElement.lang = LANG === 'he' ? 'he' : 'en';
  document.documentElement.dir = LANG === 'he' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const v = t(key);
    if(typeof v === 'string') el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el=>{
    const v = t(el.getAttribute('data-i18n-ph'));
    if(typeof v === 'string') el.placeholder = v;
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el=>{
    const v = t(el.getAttribute('data-i18n-title'));
    if(typeof v === 'string') el.title = v;
  });
  const langBtn = document.getElementById('langToggleBtn');
  if(langBtn) langBtn.textContent = LANG === 'he' ? '🌐 EN' : '🌐 עב';
}
function toggleLang(){
  LANG = LANG === 'he' ? 'en' : 'he';
  try{ localStorage.setItem(LANG_KEY, LANG); }catch(e){}
  applyI18n();
  if(typeof updateProfileGreeting === 'function') updateProfileGreeting();
  if(typeof updateHeader === 'function') updateHeader();
  rerenderCurrentScreen();
}
function rerenderCurrentScreen(){
  const active = document.querySelector('.screen.active');
  if(!active) return;
  const id = active.id;
  if(id === 'screen-browse') renderBrowseList();
  else if(id === 'screen-history') renderHistoryScreen();
  else if(id === 'screen-recent'){ renderHistRecentList(); renderRecentNeedleCard(); renderFavoritesStrip(); renderMyActivityScreen(); }
  else if(id === 'screen-prizes') renderPrizesScreen();
  else if(id === 'screen-result' && currentResultRecord) renderResultCard(currentResultRecord);
  else if(id === 'screen-quiz' && currentQuestionId) renderCurrentQuestion();
  else if(id === 'screen-detail' && detailRecordId) renderDetailScreen(detailRecordId);
  else if(id === 'screen-wishlist'){ renderWishlistList(); renderWishlistSuggestList(); }
  else if(id === 'screen-incoming') renderIncomingList();
  else if(id === 'screen-settings') renderSettingsScreen();
}

/* ---------------- controlled-vocabulary translation (tags/genres/etc.) ---------------- */
const TAG_I18N_EN = {
  // mood/theme tags
  "שמח":"Happy","עצוב":"Sad","נוסטלגי":"Nostalgic","רומנטי":"Romantic","אנרגטי":"Energetic","מרגיע":"Soothing",
  "דרמטי":"Dramatic","קליל":"Light","מצחיק":"Funny","מעצים":"Empowering","חגיגי":"Festive","פסקול":"Soundtrack",
  "מסתורי":"Mysterious","חושני":"Sensual","מהפנט":"Hypnotic","פרוע/נועז":"Wild/Bold","עוצמתי":"Powerful",
  "רגיש":"Sensitive","סוער":"Stormy","מהורהר":"Introspective","גולמי/וולנרבילי":"Raw/Vulnerable","מרדני":"Rebellious",
  "כאוטי":"Chaotic","פגיע/כן":"Vulnerable/Honest","מיסטי":"Misty","פואטי":"Poetic","חם/משפחתי":"Warm/Homey",
  "בטוח בעצמו":"Confident","בהיר/שמשי":"Bright/Sunny","חלומי":"Dreamy","רגשי":"Emotional",
  "אלבום פרידה":"Breakup Album","אלבום קיץ":"Summer Album","מסיבה/ריקודים":"Party/Dance","לילה מאוחר":"Late Night",
  "התבגרות":"Coming of Age","גאווה קווירית":"LGBTQ+ Pride","העצמה נשית":"Female Empowerment","חתונה/ריקוד איטי":"Wedding/Slow Dance",
  "שירה בקול":"Singalong",
  // genre fallback (Hebrew, used when no explicit GENRES list)
  "אינדי":"Indie","אינדי פופ":"Indie Pop","אינדי רוק":"Indie Rock","אינדי רוק תיאטרלי":"Theatrical Indie Rock",
  "אינדי-פופ":"Indie Pop","אינדי-פופ רטרו":"Retro Indie Pop","אינסטרומנטלי":"Instrumental","אלט-אר-אנד-בי":"Alt-R&B",
  "אלט-פופ":"Alt-Pop","אלט-רוק":"Alt-Rock","אר-אנד-בי":"R&B","אר-אנד-בי/פופ":"R&B/Pop","ארט-פופ":"Art Pop",
  "בוייבנד":"Boy Band","ג'אז":"Jazz","ג'אז-פופ":"Jazz-Pop","ג'אז/דרמטי":"Jazz/Dramatic","ג'אז/חג":"Jazz/Holiday",
  "ג'אז/קלאסי":"Jazz/Classic","דאנס":"Dance","דאנס-פופ":"Dance-Pop","דאנס-פופ ישראלי":"Israeli Dance-Pop",
  "דאנס/דראג":"Dance/Drag","דיסקו":"Disco","דיסקו/פאנק":"Disco/Funk","דרים-פופ":"Dream Pop","היפ הופ":"Hip-Hop",
  "היפ הופ קליל":"Comedy Hip-Hop","היפרפופ":"Hyperpop","זמר עברי":"Hebrew Singer-Songwriter","זמר עברי קלאסי":"Classic Hebrew Singer-Songwriter",
  "יורודאנס":"Eurodance","ילדים":"Children's","מיזרחית":"Mizrahi","מעורב":"Mixed","משפחתי":"Family","סול":"Soul",
  "סול קלאסי":"Classic Soul","סול/אינדי":"Soul/Indie","סול/ג'אז":"Soul/Jazz","סול/דיסקו":"Soul/Disco","סול/מוטאון":"Soul/Motown",
  "סינת'-פופ":"Synth-Pop","פאנק/סול":"Funk/Soul","פולק":"Folk","פולק אינדי":"Indie Folk","פולק ישראלי":"Israeli Folk",
  "פולק/סול":"Folk/Soul","פופ":"Pop","פופ אלטרנטיבי":"Alternative Pop","פופ ישראלי":"Israeli Pop","פופ ישראלי קלאסי":"Classic Israeli Pop",
  "פופ לטיני":"Latin Pop","פופ מוזר":"Weird Pop","פופ קלאסי":"Classic Pop","פופ קמפי":"Camp Pop","פופ-פאנק":"Pop-Punk",
  "פופ-קאנטרי":"Pop-Country","פופ-רוק":"Pop-Rock","פופ-רוק ישראלי":"Israeli Pop-Rock","פופ-רוק ישראלי קלאסי":"Classic Israeli Pop-Rock",
  "פופ-רוק קלאסי":"Classic Pop-Rock","פופ/דיסקו קלאסי":"Classic Pop/Disco","פופ/היפ הופ":"Pop/Hip-Hop","פופ/חג":"Pop/Holiday",
  "פופ/סול":"Pop/Soul","פלמנקו-פופ":"Flamenco-Pop","פסקול/תיאטרון":"Soundtrack/Theatre","קאנטרי":"Country","קיי-פופ":"K-Pop",
  "קלאסי":"Classic","קלאסי/תיאטרון":"Classic/Theatre","רוק":"Rock","רוק ישראלי קלאסי":"Classic Israeli Rock","רוק קלאסי":"Classic Rock",
  "רוק/סול":"Rock/Soul","שאנסון צרפתי":"French Chanson","תיאטרון":"Theatre",
  // gender
  "אישה":"Woman","גבר":"Man","גברים":"Men","נשים":"Women",
  // act
  "סולו":"Solo","דואו":"Duo","להקה":"Band","קאסט":"Cast",
  // popularity
  "מיינסטרים":"Mainstream","נישתי":"Niche","בינוני":"Mid-tier",
  // record type
  "אוסף":"Compilation","אלבום חג":"Holiday Album","אלבום סטודיו":"Studio Album","לייב":"Live","מיני אלבום":"EP",
  "מיקסטייפ":"Mixtape","סינגל":"Single","לא ידוע":"Unknown",
  // language
  "אנגלית":"English","עברית":"Hebrew","ספרדית":"Spanish","צרפתית":"French","קוראינית":"Korean","אירית":"Irish",
  "חתום":"Signed",
  "-":"-",
};
function trTag(s){
  if(LANG !== 'en' || !s) return s;
  // handle comma-joined multi-language strings like "אנגלית, ספרדית"
  if(s.includes(',')) return s.split(',').map(p=>trTag(p.trim())).join(', ');
  return TAG_I18N_EN[s] || s;
}

let SHEET_RECORDS = SEED_RECORDS.slice();
let LOCAL_ADDITIONS = [];
let DISCOGS_RECORDS = [];
let RECORDS = [];

// Enrichment data pulled from Discogs / MusicBrainz, stored separately from SHEET_RECORDS/LOCAL_ADDITIONS
// (keyed by recKey) so it survives a fresh sheet sync, an Excel re-upload or a reset-to-original,
// and is simply re-applied on top of whichever records happen to be loaded via applyEnrichment().
const ENRICHMENT_KEY = "whats_spinning_enrichment_v1";
let ENRICHMENT = {};
function loadEnrichment(){ try{ const raw = localStorage.getItem(ENRICHMENT_KEY); if(raw) ENRICHMENT = JSON.parse(raw); }catch(e){} }
function saveEnrichment(){ try{ localStorage.setItem(ENRICHMENT_KEY, JSON.stringify(ENRICHMENT)); }catch(e){} }
// Combines two genre/style tag lists into one, dropping case/whitespace-insensitive duplicates
// (e.g. an existing "Pop" tag and a Discogs "pop" tag collapse into a single entry) while keeping
// every genuinely distinct tag from both sides, in order (base list first, then new tags).
function mergeGenreLists(base, extra){
  const result = [...(base||[])].filter(Boolean);
  const seen = new Set(result.map(g=>normalizeForMatch(g)));
  (extra||[]).filter(Boolean).forEach(g=>{
    const norm = normalizeForMatch(g);
    if(!seen.has(norm)){ seen.add(norm); result.push(g); }
  });
  return result;
}
function applyEnrichment(){
  RECORDS.forEach(r=>{
    const e = ENRICHMENT[recKey(r)];
    if(e){
      r._enrich = e;
      // Discogs' own genre/style tags are additive - shown alongside whatever the record already
      // has (curated table or MusicBrainz), with overlapping tags unified rather than duplicated.
      if(e.genres && e.genres.length){
        const base = (r.genres && r.genres.length) ? r.genres : (r.genre ? [r.genre] : []);
        r.genres = mergeGenreLists(base, e.genres);
        if(!r.genre && r.genres.length) r.genre = r.genres[0];
      }
    } else delete r._enrich;
  });
}
loadEnrichment();

function recKeyRaw(artist, album){ return (artist||'').trim().toLowerCase() + '|||' + (album||'').trim().toLowerCase(); }
function recKey(r){ return recKeyRaw(r.artist, r.album); }
// Used ONLY to decide whether the same physical release already exists under a different source
// (sheet/Excel vs. Discogs vs. manual add) during automatic merging in recombine() and the Discogs
// import flow. recKey() above is exact/raw on purpose - it's the storage key for ratings, favorites,
// play history, enrichment, etc, so loosening it would silently orphan a user's existing data every
// time normalization rules changed. This key is deliberately more forgiving (via normalizeForMatch:
// case, punctuation, extra spacing, Discogs' "Artist (2)" disambiguation) so that a trivial formatting
// difference between sources - a stray space, "Sgt. Pepper's" vs "Sgt Peppers", a retyped Excel row -
// doesn't cause the same record to survive as two separate entries after a sync.
function looseMatchKey(r){ return normalizeForMatch(r.artist) + '|||' + normalizeForMatch(r.album); }

// Tracks when a record first entered the collection, from ANY source (manual add, promoting a
// wishlist/incoming item, a sheet/Excel sync, or a Discogs import). Kept as its own persisted store
// (like RATINGS/FAVORITES/ENRICHMENT below) rather than a field on the record object itself, because
// sheet/Excel-sourced records are fully rebuilt from scratch on every sync (new object each time) -
// a field on the object would be lost the moment the user re-syncs. Powers the "First Listen" prize
// (play a record within 15 minutes of adding it) and joinedAt. Records that already existed before
// this tracking was added simply have no entry here - they're treated as "not eligible" for First
// Listen rather than retroactively guessed at.
const RECORD_ADDED_AT_KEY = "whats_spinning_added_at_v1";
let RECORD_ADDED_AT = {};
function loadRecordAddedAt(){ try{ const raw = localStorage.getItem(RECORD_ADDED_AT_KEY); if(raw) RECORD_ADDED_AT = JSON.parse(raw); }catch(e){} }
function saveRecordAddedAt(){ try{ localStorage.setItem(RECORD_ADDED_AT_KEY, JSON.stringify(RECORD_ADDED_AT)); }catch(e){} }
// Call whenever a record newly enters the collection, from any source. Safe to call more than once
// for the same record - only stamps the first time, never overwrites an existing timestamp.
function markRecordAdded(r, ts){
  const k = recKey(r);
  if(RECORD_ADDED_AT[k] == null){ RECORD_ADDED_AT[k] = ts || Date.now(); saveRecordAddedAt(); }
}
// Splits a combined-artist credit (e.g. "Tony Bennett and Lady Gaga", "Icona Pop Feat. Charli XCX")
// into its individual artist names, so each artist gets credit for the record in stats/prizes.
function splitArtists(str){
  if(!str) return [];
  return String(str)
    .split(/\s*(?:,|\/|&|\bfeat\b\.?|\bft\b\.?|\bfeaturing\b|\band\b)\s*/i)
    .map(s=>s.replace(/[()]/g,'').trim())
    .filter(Boolean);
}
// "Various Artists" / cast-recording style credits aren't a real artist, so statistics (top artists,
// distinct-artist counts) skip them - counting them would just clutter the charts with a non-artist entry.
function isGenericArtistCredit(name){
  const n = (name||'').trim().toLowerCase();
  if(!n) return true;
  if(['various','various artists','v.a.','va','אמנים שונים','אמנים/ות שונים'].includes(n)) return true;
  if(/\bcast\b/.test(n)) return true; // "Original Cast", "Broadway Cast Recording", "<Show> Cast", ...
  if(n.includes('קאסט')) return true; // Hebrew transliteration: "קאסט מקורי", "קאסט ברודוויי", ...
  if(n.includes('הרכב מקורי')) return true;
  return false;
}
function splitArtistsForStats(str){ return splitArtists(str).filter(name => !isGenericArtistCredit(name)); }

function recombine(){
  const sheetKeys = new Set(SHEET_RECORDS.map(looseMatchKey));
  // Discogs-imported records are a fallback source: if the same album already exists in the sheet
  // (even one pulled in after the Discogs import), the sheet version wins and the Discogs copy is dropped.
  // Uses looseMatchKey (not the exact recKey) so formatting differences between the sheet and Discogs
  // don't leave the same record duplicated across both sources.
  DISCOGS_RECORDS = DISCOGS_RECORDS.filter(r => !sheetKeys.has(looseMatchKey(r)));
  const discogsKeys = new Set(DISCOGS_RECORDS.map(looseMatchKey));
  LOCAL_ADDITIONS = LOCAL_ADDITIONS.filter(r => !sheetKeys.has(looseMatchKey(r)) && !discogsKeys.has(looseMatchKey(r))); // drop local dupes once they land in the sheet/Discogs import
  RECORDS = SHEET_RECORDS.concat(DISCOGS_RECORDS).concat(LOCAL_ADDITIONS).filter(r => !isRemovedRecord(r));
  applyEnrichment();
}

function loadRecords(){
  try{
    const rawSheet = localStorage.getItem(STORAGE_KEY);
    if(rawSheet) SHEET_RECORDS = JSON.parse(rawSheet);
    const rawLocal = localStorage.getItem(LOCAL_ADD_KEY);
    if(rawLocal) LOCAL_ADDITIONS = JSON.parse(rawLocal);
  }catch(e){}
  loadDiscogsRecords();
  loadDiscogsDismissed();
  loadRecordAddedAt();
  loadRemovedRecords();
  loadLastSyncNewKeys();
  loadLastDiscogsImportNewKeys();
  recombine();
}
function saveRecords(){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SHEET_RECORDS));
    localStorage.setItem(LOCAL_ADD_KEY, JSON.stringify(LOCAL_ADDITIONS));
  }catch(e){}
}
function resetToOriginal(){
  const msg = LANG==='en'
    ? "Reset to the original collection (as last synced)? Records you added manually in this browser will be deleted."
    : "לאפס לתמונת המאגר המקורית (כמו שסונכרן לאחרונה)? תקליטים שהוספת ידנית בדפדפן הזה יימחקו.";
  if(!confirm(msg)) return;
  LOCAL_ADDITIONS = [];
  recombine();
  saveRecords();
  updateHeader();
  renderBrowseList('');
  alert(LANG==='en' ? "Done!" : "אופס!");
}
loadRecords();

/* ---------------- SPIN HISTORY ---------------- */
const PLAY_LOG_KEY = "whats_spinning_play_log_v1";
let PLAY_LOG = {};
function loadPlayLog(){ try{ const raw = localStorage.getItem(PLAY_LOG_KEY); if(raw) PLAY_LOG = JSON.parse(raw); }catch(e){} }
function savePlayLog(){ try{ localStorage.setItem(PLAY_LOG_KEY, JSON.stringify(PLAY_LOG)); }catch(e){} }
loadPlayLog();

const SPIN_EVENTS_KEY = "whats_spinning_spin_events_v1";
let SPIN_EVENTS = [];
function loadSpinEvents(){ try{ const raw = localStorage.getItem(SPIN_EVENTS_KEY); if(raw) SPIN_EVENTS = JSON.parse(raw); }catch(e){} }
function saveSpinEvents(){ try{ localStorage.setItem(SPIN_EVENTS_KEY, JSON.stringify(SPIN_EVENTS)); }catch(e){} }
loadSpinEvents();

function getPlayInfo(r){ return PLAY_LOG[recKey(r)] || null; }
function logSpin(r, opts){
  opts = opts || {full:true};
  const k = recKey(r);
  const ts = opts.ts || Date.now();
  const entry = PLAY_LOG[k] || {count:0, last:null, fullCount:0, partialCount:0, partialSidesTotal:0};
  entry.count = (entry.count||0) + 1;
  entry.last = Math.max(entry.last||0, ts);
  entry.artist = r.artist; entry.album = r.album;
  if(opts.full){
    entry.fullCount = (entry.fullCount||0) + 1;
  } else {
    entry.partialCount = (entry.partialCount||0) + 1;
    entry.partialSidesTotal = (entry.partialSidesTotal||0) + (opts.sides||0);
  }
  PLAY_LOG[k] = entry;
  savePlayLog();
  SPIN_EVENTS.push({key:k, artist:r.artist, album:r.album, ts, full: !!opts.full, sides: opts.sides||0});
  saveSpinEvents();
  const spinMinutes = needleMinutesForSpin(r, opts);
  NEEDLE.usedMinutes = (NEEDLE.usedMinutes||0) + spinMinutes;
  saveNeedle();
  ensureTracklistCached(r);
  return entry;
}
function recomputePlayLogFromEvents(key){
  const events = SPIN_EVENTS.filter(e=>e.key===key);
  if(!events.length){ delete PLAY_LOG[key]; return; }
  let fullCount=0, partialCount=0, partialSidesTotal=0, last=0;
  events.forEach(e=>{
    if(e.full) fullCount++; else { partialCount++; partialSidesTotal += (e.sides||0); }
    if(e.ts>last) last = e.ts;
  });
  PLAY_LOG[key] = { count: events.length, fullCount, partialCount, partialSidesTotal, last, artist: events[0].artist, album: events[0].album };
}
function deleteSpinEvent(ts, key){
  if(!confirm(t('hist.deleteSpinConfirm'))) return;
  const idx = SPIN_EVENTS.findIndex(e=>e.ts===ts && e.key===key);
  if(idx<0) return;
  const removed = SPIN_EVENTS[idx];
  SPIN_EVENTS.splice(idx,1);
  saveSpinEvents();
  recomputePlayLogFromEvents(key);
  savePlayLog();
  const removedRecord = RECORDS.find(rec=>recKey(rec)===key);
  if(removedRecord){
    const minutes = needleMinutesForSpin(removedRecord, {full: removed.full, sides: removed.sides});
    NEEDLE.usedMinutes = Math.max(0, (NEEDLE.usedMinutes||0) - minutes);
    saveNeedle();
  }
  renderHistRecentList();
  renderRecentNeedleCard();
  renderMyActivityScreen();
  const screenBrowse = document.getElementById('screen-browse');
  if(screenBrowse && screenBrowse.classList.contains('active')) renderBrowseList();
  updateDetailSpinInfoLine();
  if(typeof refreshPrizeStateSilently === 'function') refreshPrizeStateSilently();
}
/* ---------------- SPIN LOGGING UI (full vs partial, up to 7 sides) ---------------- */
function currentRecordForSpinContext(context){
  if(context==='result' || context==='resultDone') return currentResultRecord;
  if(context==='modal') return findRecordById(editingRecordId);
  if(context==='detail') return findRecordById(detailRecordId);
  return null;
}
function maxSidesForRecord(r){
  // When the record's real LP count is documented, the partial-spin picker reflects it exactly
  // (LP count x2 sides, minus 1 - the last side is just a full spin). When it's NOT documented,
  // this offers a generous flat 7 rather than guessing "1 LP" - numSidesForRecord()'s own default
  // of 2 sides stays conservative for needle-wear math (a separate, deliberately different case),
  // but the partial-spin choices you actually see here shouldn't be capped by that guess.
  const n = parseInt(r && r.lp_count, 10);
  if(!isNaN(n) && n>0) return Math.max(1, n*2 - 1);
  return 7;
}
/* ---------------- NEEDLE LIFESPAN ---------------- */
// Fixed lifespan-by-type catalog (industry-standard rough estimates, in hours). The user only
// picks a type and (optionally) names their needle - they never type a raw hour count themselves.
const NEEDLE_TYPES = [
  { id:'conical', hours:300, labelHe:'קונית / כדורית (Conical / Spherical)', labelEn:'Conical / Spherical' },
  { id:'elliptical', hours:400, labelHe:'אליפטית (Elliptical)', labelEn:'Elliptical' },
  { id:'fineLine', hours:600, labelHe:'Fine Line', labelEn:'Fine Line' },
  { id:'lineContact', hours:800, labelHe:'מגע קווי / שיבאטה (Line Contact / Shibata)', labelEn:'Line Contact / Shibata' },
  { id:'microLinear', hours:1000, labelHe:'מיקרו-לינארי / מיקרו-רידג׳ (Micro-linear / Micro-ridge)', labelEn:'Micro-linear / Micro-ridge' },
];
function needleTypeById(id){ return NEEDLE_TYPES.find(nt=>nt.id===id) || null; }
const NEEDLE_KEY = "whats_spinning_needle_v1";
// usedMinutes = automatically accumulated from logged spins. baseUsedMinutes = a one-time manual
// head start the user can enter (e.g. hours already played with this needle before this feature
// existed) - kept separate from the automatic counter so it's never silently re-added on save.
let NEEDLE = { name:'', type:null, totalHours:null, usedMinutes:0, baseUsedMinutes:0, replacedAt:null };
function loadNeedle(){ try{ const raw = localStorage.getItem(NEEDLE_KEY); if(raw) NEEDLE = Object.assign({}, NEEDLE, JSON.parse(raw)); }catch(e){} }
function saveNeedle(){ try{ localStorage.setItem(NEEDLE_KEY, JSON.stringify(NEEDLE)); }catch(e){} }
loadNeedle();
// Total hours listened (for the My Activity screen): computed fresh from the actual logged
// spins and each record's real duration - not the needle-wear counter, which tracks a
// separate, user-editable thing (needle hours) and can include a manual head-start seed
// that has nothing to do with how much was actually listened to.
function computeTotalListenMinutes(){
  const recByKey = {};
  RECORDS.forEach(r=>{ recByKey[recKey(r)] = r; });
  let total = 0;
  SPIN_EVENTS.forEach(e=>{
    const r = recByKey[e.key];
    if(!r) return;
    total += needleMinutesForSpin(r, {full: e.full, sides: e.sides});
  });
  return total;
}
// Fallback used only when we don't (yet) have real duration data cached for a record.
const NEEDLE_DEFAULT_SIDE_MINUTES = 20;
function numSidesForRecord(r){
  const n = parseInt(r && r.lp_count, 10);
  return (!isNaN(n) && n>0) ? n*2 : 2; // default: a standard single LP has 2 sides
}
function getAlbumDurationMinutes(r){
  const entry = TRACKLIST_CACHE[recKey(r)];
  if(entry && entry.totalMs) return entry.totalMs/60000;
  return null;
}
function needleMinutesForSpin(r, opts){
  const totalDuration = getAlbumDurationMinutes(r);
  const sides = numSidesForRecord(r);
  const perSide = totalDuration ? (totalDuration/sides) : NEEDLE_DEFAULT_SIDE_MINUTES;
  if(opts.full) return sides * perSide;
  return (opts.sides||0) * perSide;
}
// Fire-and-forget: makes sure we have real duration data cached for this record so future spins
// (and the album detail screen) get accurate numbers, without blocking spin-logging on a network call.
function discogsReleaseIdFor(r){
  return (r._enrich && r._enrich.discogs_release_id) || r._discogsReleaseId || null;
}
function ensureTracklistCached(r){
  const key = recKey(r);
  if(Object.prototype.hasOwnProperty.call(TRACKLIST_CACHE, key)) return;
  fetchTracklist(r.artist, r.album, discogsReleaseIdFor(r)).catch(()=>{});
}
function needleEffectiveUsedMinutes(){ return (NEEDLE.usedMinutes||0) + (NEEDLE.baseUsedMinutes||0); }
function needleProgressHtml(){
  if(!NEEDLE.totalHours) return `<div class="hint">${escapeHtml(t('settings.needleNotSet'))}</div>`;
  const usedHours = needleEffectiveUsedMinutes()/60;
  const pct = Math.max(0, Math.min(100, Math.round(usedHours/NEEDLE.totalHours*100)));
  const nameLabel = NEEDLE.name ? escapeHtml(NEEDLE.name) : escapeHtml(t('settings.needleDefaultName'));
  return `<div class="needle-progress">
    <div class="needle-progress-label"><span>🪡 ${nameLabel}</span><span>${usedHours.toFixed(1)} / ${NEEDLE.totalHours} ${escapeHtml(t('settings.needleHoursUnit'))} · ${pct}%</span></div>
    <div class="needle-progress-track"><div class="needle-progress-fill${pct>=100?' full':''}" style="width:${pct}%"></div></div>
  </div>`;
}
function populateNeedleTypeSelect(selectEl){
  if(!selectEl) return;
  selectEl.innerHTML = NEEDLE_TYPES.map(nt=>`<option value="${nt.id}">${escapeHtml(LANG==='en'?nt.labelEn:nt.labelHe)}</option>`).join('');
  if(NEEDLE.type) selectEl.value = NEEDLE.type;
}
function renderNeedleSettingsCard(){
  const nameEl = document.getElementById('needleName');
  const typeEl = document.getElementById('needleType');
  const baseHoursEl = document.getElementById('needleBaseHours');
  if(nameEl) nameEl.value = NEEDLE.name || '';
  populateNeedleTypeSelect(typeEl);
  if(baseHoursEl) baseHoursEl.value = NEEDLE.baseUsedMinutes ? +(NEEDLE.baseUsedMinutes/60).toFixed(2) : '';
  const wrap = document.getElementById('needleSettingsProgressWrap');
  if(wrap) wrap.innerHTML = needleProgressHtml();
}
function renderRecentNeedleCard(){
  const card = document.getElementById('recentNeedleCard');
  if(!card) return;
  if(!NEEDLE.totalHours){ card.classList.add('hidden'); card.innerHTML=''; return; }
  card.classList.remove('hidden');
  card.innerHTML = needleProgressHtml();
}
/* ---------------- MY ACTIVITY (PROFILE) SCREEN ---------------- */
function ensureJoinedAt(){
  if(!PROFILE) return;
  if(PROFILE.joinedAt) return;
  let earliest = null;
  Object.values(RECORD_ADDED_AT).forEach(ts=>{ if(ts && (earliest===null || ts<earliest)) earliest = ts; });
  SPIN_EVENTS.forEach(e=>{ if(e.ts && (earliest===null || e.ts<earliest)) earliest = e.ts; });
  PROFILE.joinedAt = earliest || Date.now();
  saveProfile(PROFILE);
}
function renderActivityAvatar(){
  const img = document.getElementById('activityAvatarImg');
  const ph = document.getElementById('activityAvatarPlaceholder');
  if(img && ph){
    let saved = null;
    try{ saved = localStorage.getItem(AVATAR_KEY); }catch(e){}
    if(saved){ img.src = saved; img.classList.remove('hidden'); ph.classList.add('hidden'); }
    else{ img.classList.add('hidden'); ph.classList.remove('hidden'); }
  }
  const patch = document.getElementById('activityPrideFlagPatch');
  if(patch){
    if(typeof computePrideProgress !== 'function'){ patch.classList.add('hidden'); }
    else {
      const progress = computePrideProgress();
      const complete = progress.collected.length >= PRIDE_COLORS.length;
      if(complete){
        patch.src = (typeof PRIDE_FLAG_FULL_COLOR !== 'undefined') ? PRIDE_FLAG_FULL_COLOR : '';
        patch.classList.remove('hidden');
      } else {
        patch.classList.add('hidden');
      }
    }
  }
}
const ACTIVITY_BANNER_KEY = "whats_spinning_activity_banner_v1";
let ACTIVITY_BANNER = null; // { key: recKey } - a record whose cover is used as the profile banner
function loadActivityBanner(){ try{ const raw = localStorage.getItem(ACTIVITY_BANNER_KEY); if(raw) ACTIVITY_BANNER = JSON.parse(raw); }catch(e){} }
function saveActivityBanner(){ try{ localStorage.setItem(ACTIVITY_BANNER_KEY, JSON.stringify(ACTIVITY_BANNER)); }catch(e){} }
loadActivityBanner();
function renderActivityBanner(){
  const el = document.getElementById('activityBanner');
  if(!el) return;
  const r = (ACTIVITY_BANNER && ACTIVITY_BANNER.key) ? RECORDS.find(rec=>recKey(rec)===ACTIVITY_BANNER.key) : null;
  if(!r){ el.style.backgroundImage = ''; return; }
  const override = getCoverOverride(r);
  const cachedArr = ALBUM_ART_CACHE.get((r.artist+'|||'+r.album).toLowerCase()+'|||opts1');
  const cached = override || (cachedArr && cachedArr[0]);
  if(cached){ el.style.backgroundImage = `url("${cached}")`; }
  else {
    fetchAlbumArtUnified(r.artist, r.album).then(url=>{
      const liveEl = document.getElementById('activityBanner');
      if(url && liveEl) liveEl.style.backgroundImage = `url("${url}")`;
    });
  }
}
function openBannerPicker(){
  const modal = document.getElementById('bannerPickerModal');
  const search = document.getElementById('bannerPickerSearch');
  if(!modal || !search) return;
  modal.classList.remove('hidden');
  search.value = '';
  renderBannerPickerGrid();
}
function closeBannerPicker(){ document.getElementById('bannerPickerModal')?.classList.add('hidden'); }
function renderBannerPickerGrid(){
  const el = document.getElementById('bannerPickerGrid');
  if(!el) return;
  const filter = (document.getElementById('bannerPickerSearch').value || '').trim().toLowerCase();
  const list = RECORDS.filter(r=>{
    if(!filter) return true;
    return (r.artist+' '+r.album).toLowerCase().includes(filter);
  }).sort((a,b)=>a.artist.localeCompare(b.artist)).slice(0,200);
  el.innerHTML = list.map(r=>{
    const cachedArr = ALBUM_ART_CACHE.get((r.artist+'|||'+r.album).toLowerCase()+'|||opts1');
    const cached = getCoverOverride(r) || (cachedArr && cachedArr[0]);
    const inner = cached ? `<img src="${cached}" alt="${escapeHtml(r.album)}">` : `<div class="cg-fallback">💿</div>`;
    return `<div class="cover-grid-item" data-cover-id="${r.id}" onclick="selectActivityBanner('${r.id}')" title="${escapeHtml(r.album)} — ${escapeHtml(r.artist)}">${inner}</div>`;
  }).join('');
  setupCoverLazyLoad(list, '#bannerPickerGrid .cover-grid-item', el);
}
function selectActivityBanner(id){
  const r = findRecordById(id);
  if(!r) return;
  ACTIVITY_BANNER = { key: recKey(r) };
  saveActivityBanner();
  closeBannerPicker();
  renderActivityBanner();
}
/* ---------------- STATS: click an artist / genre / year to see the matching records ---------------- */
function openStatsFilterModal(title, records){
  const modal = document.getElementById('statsFilterModal');
  const titleEl = document.getElementById('statsFilterModalTitle');
  const grid = document.getElementById('statsFilterModalGrid');
  if(!modal || !titleEl || !grid) return;
  titleEl.textContent = title;
  if(!records.length){
    grid.innerHTML = `<div class="hint">${escapeHtml(t('hist.noData'))}</div>`;
  } else {
    grid.innerHTML = records.map(r=>{
      const cachedArr = ALBUM_ART_CACHE.get((r.artist+'|||'+r.album).toLowerCase()+'|||opts1');
      const cached = getCoverOverride(r) || (cachedArr && cachedArr[0]);
      const inner = cached ? `<img src="${cached}" alt="${escapeHtml(r.album)}">` : `<div class="cg-fallback">💿</div>`;
      return `<div class="cover-grid-item" data-cover-id="${r.id}" onclick="openRecordQuickView('${r.id}')" title="${escapeHtml(r.album)} — ${escapeHtml(r.artist)}">${inner}</div>`;
    }).join('');
    setupCoverLazyLoad(records, '#statsFilterModalGrid .cover-grid-item', grid);
  }
  modal.classList.remove('hidden');
}
function closeStatsFilterModal(){ document.getElementById('statsFilterModal')?.classList.add('hidden'); }
function openRecordsByArtist(artistName){
  const norm = String(artistName).trim().toLowerCase();
  const matches = RECORDS.filter(r => splitArtistsForStats(r.artist).some(a=>a.toLowerCase()===norm));
  openStatsFilterModal(artistName, matches);
}
function openRecordsByGenreFamily(fam){
  const matches = RECORDS.filter(r => (r.genres||[r.genre]).filter(Boolean).some(g=>genreFamily(g)===fam));
  openStatsFilterModal(fam, matches);
}
function openRecordsByYear(year){
  const matches = RECORDS.filter(r => yearOf(r) === year);
  openStatsFilterModal(String(year), matches);
}
// A lightweight, read-only record preview - used for anything opened by tapping from inside
// Statistics (variants, filtered-record lists) so closing it lands you back on Statistics
// instead of having to navigate back from the full record screen.
let RECORD_QUICKVIEW_ID = null;
function openRecordQuickView(id){
  const r = findRecordById(id);
  if(!r) return;
  RECORD_QUICKVIEW_ID = id;
  const modal = document.getElementById('recordQuickModal');
  const body = document.getElementById('recordQuickModalBody');
  if(!modal || !body) return;
  const cachedArr = ALBUM_ART_CACHE.get((r.artist+'|||'+r.album).toLowerCase()+'|||opts1');
  const cached = getCoverOverride(r) || (cachedArr && cachedArr[0]);
  const genresHtml = (r.genres||[r.genre]).filter(Boolean).map(g=>`<span class="tag genre">${escapeHtml(trTag(g))}</span>`).join('');
  const play = (typeof getPlayInfo === 'function') ? getPlayInfo(r) : null;
  const spinLine = (play && play.count) ? `<div class="meta-line">🔁 ${play.count}</div>` : '';
  body.innerHTML = `
    <div style="text-align:center;">
      <div class="ic" id="recordQuickCover" style="width:140px;height:140px;margin:0 auto 10px;border-radius:14px;overflow:hidden;background:rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;font-size:40px;">
        ${cached ? `<img src="${escapeHtml(cached)}" style="width:100%;height:100%;object-fit:cover;" alt="">` : '💿'}
      </div>
      <div class="album" style="margin:4px 0 2px;">${escapeHtml(r.album)}</div>
      <div class="artist" style="font-size:14px;">${escapeHtml(r.artist)}</div>
      <div class="meta-line">${r.year||'—'} · ${r.format?r.format+'"':''} · ${escapeHtml(trTag(r.language)||'')}</div>
      ${spinLine}
      <div class="meta-tags" style="margin-top:8px;justify-content:center;">${genresHtml}</div>
    </div>
  `;
  modal.classList.remove('hidden');
  if(!cached){
    fetchAlbumArtUnified(r.artist, r.album).then(url=>{
      if(url && RECORD_QUICKVIEW_ID === id){
        const coverEl = document.getElementById('recordQuickCover');
        if(coverEl) coverEl.innerHTML = `<img src="${escapeHtml(url)}" style="width:100%;height:100%;object-fit:cover;" alt="">`;
      }
    });
  }
}
function closeRecordQuickView(){
  document.getElementById('recordQuickModal')?.classList.add('hidden');
  RECORD_QUICKVIEW_ID = null;
}
function openRecordDetailFromQuickView(){
  if(!RECORD_QUICKVIEW_ID) return;
  const id = RECORD_QUICKVIEW_ID;
  closeRecordQuickView();
  openRecordDetail(id);
}
function computeEarnedBadgeCount(){
  const progress = computeAllPrizeProgress();
  let earned = 0, total = 0;
  TIERED_PRIZES.forEach(p=>{ total++; if(progress[p.id] && progress[p.id].tierIdx >= 0) earned++; });
  ONETIME_PRIZES.forEach(p=>{ total++; if(progress[p.id] && progress[p.id].won) earned++; });
  FANDOM_PRIZES.forEach(p=>{ total++; if(progress[p.id] && progress[p.id].won) earned++; });
  return {earned, total};
}
function renderMyActivityScreen(){
  ensureJoinedAt();
  renderActivityAvatar();
  renderActivityBanner();
  const nameEl = document.getElementById('activityUsername');
  if(nameEl) nameEl.textContent = (PROFILE && PROFILE.name) ? PROFILE.name : (LANG==='en' ? 'Vinyl collector' : 'אספן/ית תקליטים');
  const joinedEl = document.getElementById('activityJoined');
  if(joinedEl) joinedEl.textContent = (PROFILE && PROFILE.joinedAt) ? tf('activity.joined', formatDateHe(PROFILE.joinedAt)) : '';
  const friendsEl = document.getElementById('activityFriendsCount');
  if(friendsEl) friendsEl.textContent = '0';
  const recEl = document.getElementById('activityRecordsCount');
  if(recEl) recEl.textContent = RECORDS.length;
  const hoursEl = document.getElementById('activityHoursCount');
  if(hoursEl) hoursEl.textContent = (computeTotalListenMinutes()/60).toFixed(1);
  const spinsEl = document.getElementById('activitySpinsCount');
  if(spinsEl) spinsEl.textContent = SPIN_EVENTS.length;
  const streaks = computeStreaks();
  const curEl = document.getElementById('activityStreakCurrent');
  if(curEl) curEl.textContent = streaks.current;
  const bestEl = document.getElementById('activityStreakBest');
  if(bestEl) bestEl.textContent = tf('activity.bestStreak', streaks.best);
  const badges = computeEarnedBadgeCount();
  const achvCountEl = document.getElementById('activityAchvCount');
  if(achvCountEl) achvCountEl.textContent = `${badges.earned}/${badges.total}`;
  const achvIcon = document.getElementById('activityAchvIcon');
  if(achvIcon && typeof PRIZE_IMAGES !== 'undefined' && PRIZE_IMAGES['_trophy']) achvIcon.src = PRIZE_IMAGES['_trophy'];
}
function saveNeedleSettings(){
  const name = (document.getElementById('needleName').value || '').trim();
  const typeId = document.getElementById('needleType').value;
  const baseHours = parseFloat(document.getElementById('needleBaseHours').value);
  const nt = needleTypeById(typeId);
  NEEDLE.name = name;
  NEEDLE.type = nt ? nt.id : null;
  NEEDLE.totalHours = nt ? nt.hours : null;
  NEEDLE.baseUsedMinutes = (!isNaN(baseHours) && baseHours>0) ? baseHours*60 : 0;
  saveNeedle();
  const resultEl = document.getElementById('needleSettingsResult');
  if(resultEl) resultEl.innerHTML = `<div class="success-box">✅ ${escapeHtml(t('settings.needleSaved'))}</div>`;
  renderNeedleSettingsCard();
  renderRecentNeedleCard();
}
function replaceNeedle(){
  if(!confirm(t('settings.needleReplaceConfirm'))) return;
  NEEDLE.usedMinutes = 0;
  NEEDLE.baseUsedMinutes = 0;
  NEEDLE.replacedAt = Date.now();
  saveNeedle();
  renderNeedleSettingsCard();
  renderRecentNeedleCard();
  const resultEl = document.getElementById('needleSettingsResult');
  if(resultEl) resultEl.innerHTML = `<div class="success-box">✅ ${escapeHtml(t('settings.needleReplaced'))}</div>`;
}
function sidePickerHtml(context, ts){
  const r = currentRecordForSpinContext(context);
  const max = maxSidesForRecord(r);
  let out = '';
  for(let i=1;i<=max;i++) out += `<span class="side-chip" onclick="logSpinPartial('${context}', ${i}${ts?(', '+ts):''})">${i}</span>`;
  return out;
}
function togglePartialPicker(context){
  const el = document.getElementById('partialPicker_'+context);
  if(!el) return;
  const willShow = el.classList.contains('hidden');
  el.classList.toggle('hidden');
  if(willShow){
    const picker = document.getElementById('sidePicker_'+context);
    if(picker) picker.innerHTML = sidePickerHtml(context);
  }
}
function afterSpinLogged(context){
  const picker = document.getElementById('partialPicker_'+context);
  if(picker) picker.classList.add('hidden');
  const partialCustom = document.getElementById('partialPickerCustom_'+context);
  if(partialCustom) partialCustom.classList.add('hidden');
  const customTime = document.getElementById('customTimePicker_'+context);
  if(customTime) customTime.classList.add('hidden');
  if(context==='result') updateSpinInfoLine();
  else if(context==='detail') updateDetailSpinInfoLine();
  if(context==='result' || context==='resultDone'){
    resultAlreadySpunThisPick = true;
    if(context==='resultDone') closeResultDoneModal();
  }
  renderBrowseList();
  if(typeof checkPrizesAndNotify === 'function') checkPrizesAndNotify();
}
let resultAlreadySpunThisPick = false;
function openResultDoneModal(){
  if(resultAlreadySpunThisPick){ showScreen('home'); return; }
  const modal = document.getElementById('resultDoneModal');
  if(!modal){ showScreen('home'); return; }
  const picker = document.getElementById('partialPicker_resultDone');
  if(picker) picker.classList.add('hidden');
  modal.classList.remove('hidden');
}
function closeResultDoneModal(){
  const modal = document.getElementById('resultDoneModal');
  if(modal) modal.classList.add('hidden');
  showScreen('home');
}
function logSpinFull(context, ts){
  const r = currentRecordForSpinContext(context);
  if(!r) return;
  logSpin(r, {full:true, ts});
  afterSpinLogged(context);
}
function logSpinPartial(context, sides, ts){
  const r = currentRecordForSpinContext(context);
  if(!r) return;
  logSpin(r, {full:false, sides, ts});
  afterSpinLogged(context);
}
/* ---- log a spin at a chosen past time (not "now") ---- */
function toggleCustomTimePicker(context){
  const el = document.getElementById('customTimePicker_'+context);
  if(!el) return;
  const willShow = el.classList.contains('hidden');
  el.classList.toggle('hidden');
  if(willShow){
    const input = document.getElementById('customTimeInput_'+context);
    if(input){
      const now = new Date(Date.now() - new Date().getTimezoneOffset()*60000);
      const nowStr = now.toISOString().slice(0,16);
      input.max = nowStr;
      if(!input.value) input.value = nowStr;
    }
  } else {
    const partialCustom = document.getElementById('partialPickerCustom_'+context);
    if(partialCustom) partialCustom.classList.add('hidden');
  }
}
function readCustomTimeInput(context){
  const input = document.getElementById('customTimeInput_'+context);
  if(!input || !input.value){ alert(t('spin.pickTimeFirst')); return null; }
  const ts = new Date(input.value).getTime();
  if(isNaN(ts)){ alert(t('spin.pickTimeFirst')); return null; }
  if(ts > Date.now()){ alert(t('spin.futureTimeError')); return null; }
  return ts;
}
function confirmCustomTimeFull(context){
  const ts = readCustomTimeInput(context);
  if(ts==null) return;
  logSpinFull(context, ts);
}
function confirmCustomTimePartialOpen(context){
  const ts = readCustomTimeInput(context);
  if(ts==null) return;
  const el = document.getElementById('partialPickerCustom_'+context);
  if(!el) return;
  const willShow = el.classList.contains('hidden');
  el.classList.toggle('hidden');
  if(willShow){
    const picker = document.getElementById('sidePickerCustom_'+context);
    if(picker) picker.innerHTML = sidePickerHtml(context, ts);
  }
}
function spinInfoText(info){
  if(!info || !info.count) return t('spin.notYet');
  const full = info.fullCount||0, partial = info.partialCount||0;
  const breakdownHe = partial ? ` (${full} מלאים, ${partial} חלקיים)` : '';
  const breakdownEn = partial ? ` (${full} full, ${partial} partial)` : '';
  return LANG==='en'
    ? `Spun ${info.count} times${breakdownEn} · last on ${formatDateTimeHe(info.last)}`
    : `סובבת ${info.count} פעמים${breakdownHe} · לאחרונה ב-${formatDateTimeHe(info.last)}`;
}
function daysSince(ts){ return (Date.now() - ts) / 86400000; }
function annotatePlayData(){
  RECORDS.forEach(r=>{
    const info = PLAY_LOG[recKey(r)];
    r._spinCount = info ? (info.count||0) : 0;
    r._lastPlayed = info ? info.last : null;
    const rt = RATINGS[recKey(r)];
    r._musicRating = rt ? (rt.music||0) : 0;
  });
}
function formatDateHe(ts){
  if(!ts) return '';
  return new Date(ts).toLocaleDateString('he-IL', {day:'2-digit', month:'2-digit', year:'numeric'});
}
function formatDateTimeHe(ts){
  if(!ts) return '';
  const d = new Date(ts);
  const datePart = d.toLocaleDateString('he-IL', {day:'2-digit', month:'2-digit', year:'numeric'});
  const timePart = d.toLocaleTimeString(LANG==='en' ? 'en-GB' : 'he-IL', {hour:'2-digit', minute:'2-digit'});
  return `${datePart} · ${timePart}`;
}
function dateKeyLocal(ts){
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function computeStreaks(){
  const dayKeys = [...new Set(SPIN_EVENTS.map(e=>dateKeyLocal(e.ts)))].sort();
  if(!dayKeys.length) return {current:0, best:0, dayKeys:[]};
  const dayNums = dayKeys.map(k=>{ const [y,m,d]=k.split('-').map(Number); return Math.floor(new Date(y,m-1,d).getTime()/86400000); });
  let best = 1, run = 1;
  for(let i=1;i<dayNums.length;i++){
    if(dayNums[i] === dayNums[i-1]+1) run++;
    else run = 1;
    if(run > best) best = run;
  }
  const todayNum = Math.floor(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()/86400000);
  const lastDay = dayNums[dayNums.length-1];
  let current = 0;
  if(lastDay === todayNum || lastDay === todayNum-1){
    current = 1;
    for(let i=dayNums.length-1;i>0;i--){
      if(dayNums[i] === dayNums[i-1]+1) current++;
      else break;
    }
  }
  return {current, best, dayKeys};
}
function monthLabel(key){
  const [y,m] = key.split('-').map(Number);
  const names = LANG==='en'
    ? ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    : ['ינו','פבר','מרץ','אפר','מאי','יונ','יול','אוג','ספט','אוק','נוב','דצמ'];
  return `${names[m-1]} ${y}`;
}
const MONTH_NAMES_FULL = {
  he: ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'],
  en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
};

/* ---- history screen: view + period state ---- */
let HIST_VIEW = 'stats';
let HIST_PERIOD = 'all';
let HIST_CUSTOM_RANGE = null; // {sy, sm, ey, em}

function setHistoryView(view){
  HIST_VIEW = view;
  const statsTab = document.getElementById('histTabStats');
  const collectionTab = document.getElementById('histTabCollection');
  if(statsTab) statsTab.classList.toggle('active', view==='stats');
  if(collectionTab) collectionTab.classList.toggle('active', view==='collection');
  const statsView = document.getElementById('histStatsView');
  const collectionView = document.getElementById('histCollectionView');
  if(statsView) statsView.classList.toggle('hidden', view!=='stats');
  if(collectionView) collectionView.classList.toggle('hidden', view!=='collection');
  renderHistoryScreen();
}
function setHistoryPeriod(period){
  HIST_PERIOD = period;
  if(period !== 'custom'){
    document.getElementById('histCustomRange')?.classList.add('hidden');
  } else {
    populateCustomRangeSelects();
    document.getElementById('histCustomRange')?.classList.remove('hidden');
  }
  renderHistoryScreen();
}
function populateCustomRangeSelects(){
  const names = MONTH_NAMES_FULL[LANG==='en'?'en':'he'];
  let minYear = CURRENT_YEAR;
  SPIN_EVENTS.forEach(e=>{ const y = new Date(e.ts).getFullYear(); if(y < minYear) minYear = y; });
  const years = [];
  for(let y=CURRENT_YEAR; y>=minYear; y--) years.push(y);
  const cr = HIST_CUSTOM_RANGE || { sy: minYear, sm: 0, ey: CURRENT_YEAR, em: new Date().getMonth() };
  const monthOpts = names.map((n,i)=>`<option value="${i}">${escapeHtml(n)}</option>`).join('');
  const yearOpts = years.map(y=>`<option value="${y}">${y}</option>`).join('');
  const msEl = document.getElementById('histCustomMonthStart');
  const ysEl = document.getElementById('histCustomYearStart');
  const meEl = document.getElementById('histCustomMonthEnd');
  const yeEl = document.getElementById('histCustomYearEnd');
  if(msEl && !msEl.dataset.filled){ msEl.innerHTML = monthOpts; msEl.dataset.filled = '1'; }
  if(meEl && !meEl.dataset.filled){ meEl.innerHTML = monthOpts; meEl.dataset.filled = '1'; }
  if(ysEl && !ysEl.dataset.filled){ ysEl.innerHTML = yearOpts; ysEl.dataset.filled = '1'; }
  if(yeEl && !yeEl.dataset.filled){ yeEl.innerHTML = yearOpts; yeEl.dataset.filled = '1'; }
  if(msEl) msEl.value = cr.sm; if(ysEl) ysEl.value = cr.sy;
  if(meEl) meEl.value = cr.em; if(yeEl) yeEl.value = cr.ey;
}
function applyCustomHistoryRange(){
  const sm = parseInt(document.getElementById('histCustomMonthStart').value);
  const sy = parseInt(document.getElementById('histCustomYearStart').value);
  const em = parseInt(document.getElementById('histCustomMonthEnd').value);
  const ey = parseInt(document.getElementById('histCustomYearEnd').value);
  HIST_CUSTOM_RANGE = {sy, sm, ey, em};
  HIST_PERIOD = 'custom';
  renderHistoryScreen();
}
function getPeriodRange(){
  const now = new Date();
  const endTs = now.getTime();
  if(HIST_PERIOD === 'all') return null;
  if(HIST_PERIOD === 'custom'){
    if(!HIST_CUSTOM_RANGE) return null;
    const {sy, sm, ey, em} = HIST_CUSTOM_RANGE;
    const start = new Date(sy, sm, 1).getTime();
    const end = new Date(ey, em+1, 1).getTime() - 1;
    return [start, end];
  }
  let start;
  if(HIST_PERIOD === 'month'){
    start = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  } else if(HIST_PERIOD === '3m'){
    const d = new Date(now); d.setMonth(d.getMonth()-3); start = d.getTime();
  } else if(HIST_PERIOD === '6m'){
    const d = new Date(now); d.setMonth(d.getMonth()-6); start = d.getTime();
  } else if(HIST_PERIOD === '1y'){
    const d = new Date(now); d.setFullYear(d.getFullYear()-1); start = d.getTime();
  } else {
    start = 0;
  }
  return [start, endTs];
}
function getFilteredSpinEvents(){
  const range = getPeriodRange();
  if(!range) return SPIN_EVENTS.slice();
  const [start,end] = range;
  return SPIN_EVENTS.filter(e=>e.ts>=start && e.ts<=end);
}
function renderHistPeriodBar(){
  const bar = document.getElementById('histPeriodBar');
  if(!bar) return;
  const periods = [
    ['month','hist.period.month'], ['3m','hist.period.3m'], ['6m','hist.period.6m'],
    ['1y','hist.period.1y'], ['all','hist.period.all'], ['custom','hist.period.custom'],
  ];
  bar.innerHTML = periods.map(([key,labelKey])=>
    `<div class="filter-chip ${HIST_PERIOD===key?'active':''}" onclick="setHistoryPeriod('${key}')">${escapeHtml(t(labelKey))}</div>`
  ).join('');
  if(HIST_PERIOD === 'custom'){
    populateCustomRangeSelects();
    document.getElementById('histCustomRange')?.classList.remove('hidden');
  } else {
    document.getElementById('histCustomRange')?.classList.add('hidden');
  }
}
function renderHistRecentList(){
  const el = document.getElementById('historyList');
  if(!el) return;
  const recByKey = {};
  RECORDS.forEach(r=>{ recByKey[recKey(r)] = r; });
  const recent = SPIN_EVENTS.slice().sort((a,b)=>(b.ts||0)-(a.ts||0)).slice(0,10);
  if(!recent.length){
    el.innerHTML = `<div class="empty-hint">${escapeHtml(t('hist.empty'))}</div>`;
    return;
  }
  el.innerHTML = recent.map(e=>{
    const partialSuffix = (!e.full && e.sides) ? escapeHtml(tf('hist.recentPartial', e.sides)) : '';
    const r = recByKey[e.key];
    const clickAttr = r ? ` onclick="openRecordDetail('${r.id}')" style="cursor:pointer;"` : '';
    const cachedArr = r ? ALBUM_ART_CACHE.get((r.artist+'|||'+r.album).toLowerCase()+'|||opts1') : null;
    const cached = r ? (getCoverOverride(r) || (cachedArr && cachedArr[0])) : null;
    const thumbInner = cached ? `<img src="${cached}" alt="${escapeHtml(e.album||'')}">` : '💿';
    const dataAttr = r ? ` data-cover-id="${r.id}"` : '';
    const keyAttr = String(e.key||'').replace(/\\/g,'\\\\').replace(/'/g,"\\'");
    return `
    <div class="list-item"${clickAttr}>
      <div class="list-thumb-wrap"${dataAttr}>${thumbInner}</div>
      <div class="n">${escapeHtml(e.album||'')}<span class="a">${escapeHtml(e.artist||'')}</span></div>
      <div style="text-align:left;">
        <div class="cnt">🔁 ${e.full ? escapeHtml(t('spin.full')) : escapeHtml(t('spin.partial'))}${partialSuffix}</div>
        <div class="last">${e.ts?formatDateTimeHe(e.ts):''}</div>
      </div>
      <button class="icon-btn" style="width:26px;height:26px;font-size:12px;flex-shrink:0;" onclick="event.stopPropagation();deleteSpinEvent(${e.ts},'${keyAttr}')" title="${escapeHtml(t('hist.deleteSpin'))}">✕</button>
    </div>
  `;}).join('');
  const withRecords = recent.map(e=>recByKey[e.key]).filter(Boolean);
  if(withRecords.length) setupCoverLazyLoad(withRecords, '#historyList .list-thumb-wrap', document.getElementById('historyList'));
}
function renderHistStats(){
  const events = getFilteredSpinEvents();
  const recByKey = {};
  RECORDS.forEach(r=>{ recByKey[recKey(r)] = r; });

  const perRecord = {}; // key -> {count, partialCount, artist, album, record}
  events.forEach(ev=>{
    const k = ev.key;
    if(!perRecord[k]) perRecord[k] = { count:0, partialCount:0, artist: ev.artist, album: ev.album };
    perRecord[k].count++;
    if(!ev.full) perRecord[k].partialCount++;
  });
  const recordEntries = Object.entries(perRecord);
  const totalPartial = events.filter(e=>!e.full).length;

  document.getElementById('histDistinct').textContent = recordEntries.length;
  document.getElementById('histPartial').textContent = totalPartial;

  // top records
  const topRecordsList = document.getElementById('histTopRecordsList');
  const rankedRecords = recordEntries.sort((a,b)=>b[1].count-a[1].count).slice(0,8);
  topRecordsList.innerHTML = rankedRecords.length
    ? rankedRecords.map(([k,e],i)=>`
      <div class="top-rank-row">
        <div class="top-rank-num">${i+1}</div>
        <div class="top-rank-name">${escapeHtml(e.album||'')}<span class="a"> · ${escapeHtml(e.artist||'')}</span></div>
        <div class="top-rank-count">🔁 ${e.count}</div>
      </div>`).join('')
    : `<div class="hint">${escapeHtml(t('hist.noData'))}</div>`;

  // top artists ("Various Artists" / cast credits don't count as a real artist)
  const artistCounts = {};
  events.forEach(ev=>{
    const k = ev.key;
    const r = recByKey[k];
    const artistName = (r && r.artist) || ev.artist;
    splitArtistsForStats(artistName).forEach(name=>{ artistCounts[name] = (artistCounts[name]||0) + 1; });
  });
  const topArtistsList = document.getElementById('histTopArtistsList');
  const rankedArtists = Object.entries(artistCounts).sort((a,b)=>b[1]-a[1]).slice(0,8);
  topArtistsList.innerHTML = rankedArtists.length
    ? rankedArtists.map(([name,cnt],i)=>`
      <div class="top-rank-row" style="cursor:pointer;" onclick="openRecordsByArtist(${jsStringForHtmlAttr(name)})">
        <div class="top-rank-num">${i+1}</div>
        <div class="top-rank-name">${escapeHtml(name)}</div>
        <div class="top-rank-count">🔁 ${cnt}</div>
      </div>`).join('')
    : `<div class="hint">${escapeHtml(t('hist.noData'))}</div>`;

  // genre / gender breakdowns
  const genreCounts = dedupedGenreCounts(events.map(ev=>recByKey[ev.key]).filter(Boolean), r=>(r.genres||[r.genre]).filter(Boolean));
  const genderCounts = {};
  events.forEach(ev=>{
    const r = recByKey[ev.key];
    if(!r) return;
    if(r.gender && r.gender !== '-') genderCounts[r.gender] = (genderCounts[r.gender]||0) + 1;
  });
  renderGenreFamilyChart('histGenreRow', genreCounts);

  const genderRow = document.getElementById('histGenderRow');
  const genderEntries = Object.entries(genderCounts).sort((a,b)=>b[1]-a[1]).map(([g,cnt])=>[trTag(g),cnt]);
  renderBarChart(genderRow, genderEntries);
}
function decadeLabel(decadeStart){
  // Compact numeric form ("80s", "00s", "10s") in both languages - saves space in the timeline
  // bars and filter chips versus a full year or a spelled-out phrase.
  return `${String(decadeStart % 100).padStart(2,'0')}s`;
}
/* ---------------- GENRE FAMILY DRILL-DOWN (top-level genre -> pie chart of sub-genres) ---------------- */
const GENRE_FAMILY_RULES = [
  { he:'פופ', en:'Pop', test:/פופ|pop/i },
  { he:'רוק', en:'Rock', test:/רוק|rock/i },
  { he:'היפ הופ / ראפ', en:'Hip-Hop / Rap', test:/היפ הופ|ראפ|hip.?hop|\brap\b/i },
  { he:'R&B / סול', en:'R&B / Soul', test:/סול|soul|r&b|rnb|רנבי/i },
  { he:'אלקטרוני / דאנס', en:'Electronic / Dance', test:/אלקטרוני|דאנס|דיסקו|electro|\bdance\b|house|techno|\bedm\b|disco/i },
  { he:"ג'אז", en:'Jazz', test:/ג'אז|jazz/i },
  { he:'קאנטרי / פולק', en:'Country / Folk', test:/קאנטרי|פולק|country|folk/i },
  { he:'מטאל', en:'Metal', test:/מטאל|metal/i },
  { he:'פסקול / תיאטרון', en:'Soundtrack / Theatre', test:/פסקול|תיאטרון|soundtrack|theatre|musical/i },
  { he:'רגאיי', en:'Reggae', test:/רגאיי|reggae/i },
  { he:'לטינו', en:'Latin', test:/לטינו|latin|reggaeton|salsa/i },
  { he:'קלאסי', en:'Classical', test:/קלאסי|classical/i },
  { he:'זמר עברי / ישראלי', en:'Israeli Music', test:/זמר עברי|ישראלי/i },
];
function genreFamily(g){
  const s = String(g||'');
  for(const rule of GENRE_FAMILY_RULES){ if(rule.test.test(s)) return LANG==='en' ? rule.en : rule.he; }
  return LANG==='en' ? 'Other' : 'אחר';
}
// A record/spin with several genre tags (e.g. "Dream Pop" + "Hyperpop") should count as ONE item, not
// once per tag. We assign each item to the single tag among its own tags that is most "popular"
// (shared by the most other items) - i.e. "count it where there are similar records".
function dedupedGenreCounts(items, genresOf){
  const rawPop = {};
  items.forEach(item=>{ genresOf(item).forEach(g=>{ rawPop[g] = (rawPop[g]||0) + 1; }); });
  const counts = {};
  items.forEach(item=>{
    const gs = genresOf(item);
    if(!gs.length) return;
    let winner = gs[0], winnerPop = rawPop[gs[0]] || 0;
    for(let i=1;i<gs.length;i++){
      const g = gs[i], pop = rawPop[g] || 0;
      if(pop > winnerPop){ winner = g; winnerPop = pop; }
    }
    counts[winner] = (counts[winner]||0) + 1;
  });
  return counts;
}
function genreLabelIsSameAsFamily(rawGenre, familyLabel){
  const raw = normalizeForMatch(String(rawGenre||''));
  const family = normalizeForMatch(String(familyLabel||''));
  if(raw === family) return true;
  const rule = GENRE_FAMILY_RULES.find(r=>normalizeForMatch(r.he) === family || normalizeForMatch(r.en) === family);
  if(!rule) return false;
  return raw === normalizeForMatch(rule.he) || raw === normalizeForMatch(rule.en);
}
function familyBreakdown(rawGenreCounts){
  const familyCounts = {}, familyToRaw = {};
  Object.entries(rawGenreCounts).forEach(([g,cnt])=>{
    const fam = genreFamily(g);
    familyCounts[fam] = (familyCounts[fam]||0) + cnt;
    (familyToRaw[fam] = familyToRaw[fam]||[]).push([g,cnt]);
  });
  return { familyCounts, familyToRaw };
}
const PIE_COLORS = ['#ff6fae','#7c5cff','#3fd0ff','#ffd23f','#5cff9d','#ff8a5c','#c792ea','#5cc8ff','#ff5c8a','#a0e57a'];
// interactive donut chart: tap/click a slice to reveal its label+count+% in the caption below,
// instead of a persistent legend list. Slices under 2% of the total are lumped into one "Others" slice.
function renderPieChart(container, entries){
  const total = entries.reduce((s,[,c])=>s+c,0) || 1;
  const major = [], minor = [];
  entries.forEach(e=>{ if(e[1]/total >= 0.02) major.push(e); else minor.push(e); });
  const minorSum = minor.reduce((s,[,c])=>s+c,0);
  const display = major.slice();
  if(minorSum > 0) display.push([t('stats.otherSmall'), minorSum]);
  const dTotal = display.reduce((s,[,c])=>s+c,0) || 1;
  const R = 40, C = 2*Math.PI*R;
  let acc = 0;
  const captionId = container.id + '_pieCaption';
  const segs = display.map(([label,cnt],i)=>{
    const frac = cnt/dTotal;
    const dash = frac*C;
    const offset = -acc;
    acc += dash;
    const pct = Math.round(frac*100);
    return `<circle class="pie-seg" cx="50" cy="50" r="${R}" fill="none" stroke="${PIE_COLORS[i%PIE_COLORS.length]}" stroke-width="18"
      stroke-dasharray="${dash.toFixed(2)} ${(C-dash).toFixed(2)}" stroke-dashoffset="${offset.toFixed(2)}"
      onclick="showPieCaption('${captionId}', ${jsStringForHtmlAttr(label)}, ${cnt}, ${pct})"></circle>`;
  }).join('');
  container.innerHTML = `<div class="pie-wrap2">
    <div class="pie-svg-wrap"><svg viewBox="0 0 100 100" class="pie-svg">${segs}</svg></div>
  </div>
  <div class="pie-caption hint" id="${captionId}">${escapeHtml(t('stats.pieTapHint'))}</div>`;
}
function showPieCaption(captionId, label, cnt, pct){
  const el = document.getElementById(captionId);
  if(!el) return;
  el.textContent = `${label}: ${cnt} · ${pct}%`;
}
// safe single-quoted JS string literal for embedding inside a double-quoted HTML attribute
// (JSON.stringify would emit double quotes, which breaks out of the attribute early)
function jsStringForHtmlAttr(s){
  return "'" + String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'") + "'";
}
const GENRE_DRILL_STATE = {};
const GENRE_RAW_COUNTS = {};
function renderGenreFamilyChart(containerId, rawGenreCounts){
  const container = document.getElementById(containerId);
  if(!container) return;
  GENRE_RAW_COUNTS[containerId] = rawGenreCounts;
  const { familyCounts, familyToRaw } = familyBreakdown(rawGenreCounts);
  const entries = Object.entries(familyCounts).sort((a,b)=>b[1]-a[1]);
  if(!entries.length){ container.innerHTML = `<div class="hint">${escapeHtml(t('hist.noData'))}</div>`; return; }
  const max = Math.max(...entries.map(([,c])=>c));
  const expandedFamily = GENRE_DRILL_STATE[containerId] || null;
  container.innerHTML = entries.map(([fam,cnt])=>{
    const pct = max ? Math.max(6, Math.round(cnt/max*100)) : 0;
    // BUGFIX: a raw genre tag that's literally the same word as the family itself (e.g. a plain
    // "Pop" tag inside the "Pop" family) isn't a meaningful sub-genre - it doesn't tell you
    // anything more specific than the family name already does. Those records still count toward
    // the family's own total (familyCounts, used for the bar/percentage/count above), they just
    // don't get listed as a distinct slice in the drill-down breakdown.
    const subEntries = (familyToRaw[fam]||[]).sort((a,b)=>b[1]-a[1])
      .filter(([g])=>!genreLabelIsSameAsFamily(g, fam))
      .map(([g,c])=>[trTag(g), c]);
    const canDrill = subEntries.length > 1;
    const isOpen = expandedFamily === fam && canDrill;
    const pieId = containerId + '_pie_' + entries.findIndex(e=>e[0]===fam);
    return `
      <div class="chart-bar-row" style="cursor:${canDrill?'pointer':'default'};" ${canDrill ? `onclick="toggleGenreFamilyDrill('${containerId}', ${jsStringForHtmlAttr(fam)})"` : ''}>
        <div class="chart-bar-label">${escapeHtml(fam)}${canDrill ? (isOpen?' ▴':' ▾') : ''}</div>
        <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${pct}%"></div></div>
        <div class="chart-bar-count" style="cursor:pointer;text-decoration:underline;" onclick="event.stopPropagation();openRecordsByGenreFamily(${jsStringForHtmlAttr(fam)})">${cnt}</div>
      </div>
      ${isOpen ? `<div class="pie-panel" id="${pieId}"></div>` : ''}
    `;
  }).join('');
  if(expandedFamily){
    const idx = entries.findIndex(e=>e[0]===expandedFamily);
    const subEntries = (familyToRaw[expandedFamily]||[]).sort((a,b)=>b[1]-a[1])
      .filter(([g])=>!genreLabelIsSameAsFamily(g, expandedFamily))
      .map(([g,c])=>[trTag(g), c]);
    if(idx !== -1 && subEntries.length > 1){
      const el = document.getElementById(containerId + '_pie_' + idx);
      if(el) renderPieChart(el, subEntries);
    }
  }
}
function toggleGenreFamilyDrill(containerId, family){
  GENRE_DRILL_STATE[containerId] = (GENRE_DRILL_STATE[containerId] === family) ? null : family;
  const raw = GENRE_RAW_COUNTS[containerId];
  if(raw) renderGenreFamilyChart(containerId, raw);
}
/* ---------------- YEAR TIMELINE (records per release year, replaces the old "by decade" chart) ----------------
   Shown as a per-decade dot/line graph; clicking a decade drills down into that decade's own
   year-by-year breakdown (also a dot/line graph). Every point shows its count number right above it,
   not just on tap, since dot height alone doesn't communicate an exact quantity. */
const TIMELINE_YEAR_COUNTS = {};
const TIMELINE_DECADE_DRILL = {};
// Renders a set of points as a dot/line graph (rather than a bar chart). `items` is an ordered
// (oldest -> newest) array of {cnt, label, onclick, cls}. Order is flipped for RTL so the oldest
// point still lands on the reading-start side, matching the old bar-chart's flex-auto-reverse behavior.
function timelineGraphHtml(items, opts){
  opts = opts || {};
  const spacing = opts.spacing || 15;
  const trackH = 92, padTop = 20, padBottom = 4;
  const max = Math.max(0, ...items.map(it=>it.cnt));
  const n = items.length;
  const w = Math.max(spacing, n * spacing);
  const rtl = LANG !== 'en';
  const pts = items.map((it,i)=>{
    const idx = rtl ? (n-1-i) : i;
    const frac = max ? it.cnt/max : 0;
    const x = idx*spacing + spacing/2;
    const y = trackH - padBottom - frac*(trackH-padTop-padBottom);
    return { x, y, it };
  });
  const linePoints = pts.map(p=>`${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const dots = pts.map(p=>`<circle class="timeline-dot${p.it.cnt?'':' empty'}${p.it.cls?(' '+p.it.cls):''}" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${opts.dotR||3.4}" onclick="${p.it.onclick}"></circle>`).join('');
  const counts = pts.map(p=>`<div class="timeline-dot-count" style="left:${p.x.toFixed(1)}px; top:${(p.y-13).toFixed(1)}px;">${p.it.cnt}</div>`).join('');
  const labels = pts.map(p=>p.it.label ? `<div class="timeline-dot-label" style="left:${p.x.toFixed(1)}px;">${p.it.label}</div>` : '').join('');
  return `<div class="timeline-graph-wrap" style="width:${w}px;">
    <div class="timeline-plot" style="width:${w}px;height:${trackH}px;">
      <svg viewBox="0 0 ${w} ${trackH}" width="${w}" height="${trackH}" class="timeline-svg">
        <polyline points="${linePoints}" class="timeline-line" fill="none"></polyline>
        ${dots}
      </svg>
      ${counts}
    </div>
    <div class="timeline-dot-labels" style="width:${w}px;">${labels}</div>
  </div>`;
}
function timelineColumnsHtml(containerId, years, yearCounts, opts){
  opts = opts || {};
  const minY = years[0], maxY = years[years.length-1];
  const items = years.map(y=>{
    const cnt = yearCounts[y] || 0;
    const showLabel = opts.allLabels || (y % 10 === 0) || y===minY || y===maxY;
    const labelText = showLabel ? (opts.shortLabel ? String(y % 100).padStart(2,'0') : String(y)) : '';
    return { cnt, label: escapeHtml(labelText), onclick: `openRecordsByYear(${y})` };
  });
  const spacing = opts.fitWidth
    ? Math.max(20, Math.floor(opts.fitWidth / Math.max(1, years.length)))
    : (opts.wide ? 26 : 15);
  return timelineGraphHtml(items, { spacing, dotR: spacing >= 30 ? 4.2 : 3.4 });
}
function renderYearTimeline(containerId, yearCounts){
  const container = document.getElementById(containerId);
  if(!container) return;
  TIMELINE_YEAR_COUNTS[containerId] = yearCounts;
  const years = Object.keys(yearCounts).map(Number).filter(y=>!isNaN(y));
  if(!years.length){ container.innerHTML = `<div class="hint">${escapeHtml(t('hist.noData'))}</div>`; return; }
  const decadeCounts = {};
  years.forEach(y=>{ const d = Math.floor(y/10)*10; decadeCounts[d] = (decadeCounts[d]||0) + (yearCounts[y]||0); });
  const decadeKeys = Object.keys(decadeCounts).map(Number).sort((a,b)=>a-b);
  const expandedDecade = TIMELINE_DECADE_DRILL[containerId];
  const decadeItems = decadeKeys.map(d=>{
    const cnt = decadeCounts[d];
    const isOpen = expandedDecade === d;
    return { cnt, label: escapeHtml(decadeLabel(d)) + (isOpen?' ▴':''), onclick: `toggleDecadeDrill('${containerId}', ${d})`, cls: isOpen?'open':'' };
  });
  // Fit the top-level decade summary into the card width so it never needs horizontal
  // scrolling, regardless of how many decades are in the collection.
  const fitWidth = 336;
  const fitSpacing = Math.max(26, Math.min(64, Math.floor(fitWidth / Math.max(1, decadeKeys.length))));
  const bars = timelineGraphHtml(decadeItems, { spacing: fitSpacing, dotR: fitSpacing < 40 ? 3.6 : 4.6 });
  let drillHtml = '';
  if(expandedDecade != null){
    const decadeYears = []; for(let y=expandedDecade; y<=expandedDecade+9; y++) decadeYears.push(y);
    drillHtml = `<div class="timeline-drill">
      <div class="hint" style="text-align:center;margin:10px 0 4px;">${escapeHtml(decadeLabel(expandedDecade))} - ${escapeHtml(t('coll.timelineDecadeDrillHint'))}</div>
      <div class="timeline-scroll">${timelineColumnsHtml(containerId, decadeYears, yearCounts, {allLabels:true, shortLabel:true, wide:true, fitWidth:336})}</div>
    </div>`;
  }
  container.innerHTML = `<div class="timeline-caption hint" id="${containerId}_caption">${escapeHtml(t('coll.timelineHint'))}</div><div class="timeline-scroll">${bars}</div>` + drillHtml;
}
function toggleDecadeDrill(containerId, d){
  TIMELINE_DECADE_DRILL[containerId] = (TIMELINE_DECADE_DRILL[containerId] === d) ? null : d;
  const counts = TIMELINE_YEAR_COUNTS[containerId];
  if(counts) renderYearTimeline(containerId, counts);
}
function showTimelineCaption(containerId, yearOrLabel, cnt){
  const el = document.getElementById(containerId+'_caption');
  if(!el) return;
  el.textContent = (typeof yearOrLabel === 'number') ? tf('coll.timelineYearCaption', yearOrLabel, cnt) : tf('coll.timelineDecadeCaption', yearOrLabel, cnt);
}
const BARCHART_STATE = {};
function renderBarChart(container, entries, opts){
  if(!container) return;
  opts = opts || {};
  const limit = opts.limit || null;
  const noExpand = !!opts.noExpand;
  const onLabelClick = opts.onLabelClick || null;
  const id = container.id || null;
  if(id){
    if(!BARCHART_STATE[id]) BARCHART_STATE[id] = { expanded:false };
    BARCHART_STATE[id].entries = entries;
    BARCHART_STATE[id].limit = limit;
    BARCHART_STATE[id].noExpand = noExpand;
    BARCHART_STATE[id].onLabelClick = onLabelClick;
  }
  if(!entries.length){
    container.innerHTML = `<div class="hint">${escapeHtml(t('hist.noData'))}</div>`;
    return;
  }
  const expanded = (id && !noExpand) ? BARCHART_STATE[id].expanded : false;
  const shown = (limit && !expanded) ? entries.slice(0, limit) : entries;
  const max = Math.max(...entries.map(e=>e[1]));
  let html = shown.map(([label,cnt])=>{
    const pct = max ? Math.max(6, Math.round((cnt/max)*100)) : 0;
    const rowClickAttr = onLabelClick ? ` onclick="${onLabelClick}(${jsStringForHtmlAttr(label)})" style="cursor:pointer;"` : '';
    return `<div class="chart-bar-row"${rowClickAttr}>
      <div class="chart-bar-label">${escapeHtml(label)}</div>
      <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${pct}%"></div></div>
      <div class="chart-bar-count">${cnt}</div>
    </div>`;
  }).join('');
  if(limit && entries.length > limit && id && !noExpand){
    html += `<div class="chart-expand-toggle" onclick="toggleBarChartExpand('${id}')">${expanded ? escapeHtml(t('hist.showLess')) : escapeHtml(t('hist.showMore'))}</div>`;
  }
  container.innerHTML = html;
}
function toggleBarChartExpand(id){
  const state = BARCHART_STATE[id];
  if(!state || state.noExpand) return;
  state.expanded = !state.expanded;
  const container = document.getElementById(id);
  if(container) renderBarChart(container, state.entries, { limit: state.limit, noExpand: state.noExpand, onLabelClick: state.onLabelClick });
}
function renderHistoryScreen(){
  const statsTab = document.getElementById('histTabStats');
  const collectionTab = document.getElementById('histTabCollection');
  if(statsTab) statsTab.classList.toggle('active', HIST_VIEW==='stats');
  if(collectionTab) collectionTab.classList.toggle('active', HIST_VIEW==='collection');
  document.getElementById('histStatsView')?.classList.toggle('hidden', HIST_VIEW!=='stats');
  document.getElementById('histCollectionView')?.classList.toggle('hidden', HIST_VIEW!=='collection');
  if(HIST_VIEW === 'collection'){
    renderCollectionStats();
  } else {
    renderHistPeriodBar();
    renderHistStats();
  }
}
function renderCollectionStats(){
  const artistSet = new Set();
  RECORDS.forEach(r=>{ splitArtistsForStats(r.artist).forEach(a=>artistSet.add(a.toLowerCase())); });
  document.getElementById('collDistinctArtists').textContent = artistSet.size;

  const artistCounts = {}, yearCounts = {};
  RECORDS.forEach(r=>{
    splitArtistsForStats(r.artist).forEach(a=>{ artistCounts[a] = (artistCounts[a]||0)+1; });
    const y = yearOf(r);
    if(y!=null) yearCounts[y] = (yearCounts[y]||0)+1;
  });
  const genreCounts = dedupedGenreCounts(RECORDS, r=>(r.genres||[r.genre]).filter(Boolean));
  renderGenreFamilyChart('collGenreRow', genreCounts);
  renderBarChart(document.getElementById('collArtistRow'), Object.entries(artistCounts).sort((a,b)=>b[1]-a[1]), {limit:10, noExpand:true, onLabelClick:'openRecordsByArtist'});
  renderYearTimeline('collYearRow', yearCounts);

  // variants: distinct records that share the exact same normalized artist+album
  const groups = {};
  RECORDS.forEach(r=>{ const k = recKey(r); (groups[k] = groups[k]||[]).push(r); });
  const variantGroups = Object.values(groups).filter(g=>g.length>1).sort((a,b)=>b.length-a.length);
  const listEl = document.getElementById('collVariantsList');
  listEl.innerHTML = variantGroups.length
    ? variantGroups.map(g=>`
      <div class="top-rank-row" style="cursor:pointer;" onclick="openRecordQuickView('${g[0].id}')">
        <div class="top-rank-num">${g.length}×</div>
        <div class="top-rank-name">${escapeHtml(g[0].album)}<span class="a"> · ${escapeHtml(g[0].artist)}</span></div>
        <div class="top-rank-count">${escapeHtml(t('coll.variantCount'))}</div>
      </div>`).join('')
    : `<div class="hint">${escapeHtml(t('coll.noVariants'))}</div>`;

  renderCollectionRatingsCard();
}
function ratingDistributionHtml(title, values){
  const rated = values.filter(v=>v>0);
  if(!rated.length){
    return `<div class="rating-block"><div class="rating-block-title">${escapeHtml(title)}</div><div class="hint">${escapeHtml(t('coll.ratingsNoData'))}</div></div>`;
  }
  const avg = rated.reduce((s,v)=>s+v,0) / rated.length;
  const buckets = [1,2,3,4,5].map(star=>rated.filter(v=>v===star).length);
  const max = Math.max(...buckets);
  const rows = [5,4,3,2,1].map(star=>{
    const cnt = buckets[star-1];
    const pct = rated.length ? Math.round(cnt/rated.length*100) : 0;
    const barPct = max ? Math.max(cnt?6:0, Math.round(cnt/max*100)) : 0;
    return `<div class="chart-bar-row">
      <div class="chart-bar-label" style="min-width:34px;flex:0 0 auto;">${escapeHtml(tf('coll.ratingsStars', star))}</div>
      <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${barPct}%"></div></div>
      <div class="chart-bar-count">${pct}%</div>
    </div>`;
  }).join('');
  return `<div class="rating-block">
    <div class="rating-block-title">${escapeHtml(title)} · ${escapeHtml(tf('coll.ratingsAvg', avg.toFixed(1), rated.length))}</div>
    ${rows}
  </div>`;
}
function renderCollectionRatingsCard(){
  const el = document.getElementById('collRatingsRow');
  if(!el) return;
  const musicValues = RECORDS.map(r=>getRating(r).music||0);
  const pressingValues = RECORDS.map(r=>getRating(r).pressing||0);
  el.innerHTML = ratingDistributionHtml(t('coll.ratingsMusic'), musicValues) + ratingDistributionHtml(t('coll.ratingsPressing'), pressingValues);
}

/* ---------------- RATINGS (music / pressing, 1-5 stars) ---------------- */
const RATINGS_KEY = "whats_spinning_ratings_v1";
let RATINGS = {};
function loadRatings(){ try{ const raw = localStorage.getItem(RATINGS_KEY); if(raw) RATINGS = JSON.parse(raw); }catch(e){} }
function saveRatings(){ try{ localStorage.setItem(RATINGS_KEY, JSON.stringify(RATINGS)); }catch(e){} }
loadRatings();

function getRating(r){ return RATINGS[recKey(r)] || {music:0, pressing:0}; }
function setRating(r, kind, value){
  const k = recKey(r);
  const cur = RATINGS[k] || {music:0, pressing:0};
  cur[kind] = value;
  cur.artist = r.artist; cur.album = r.album;
  RATINGS[k] = cur;
  saveRatings();
  return cur;
}
function starsHtml(kind, value, recId, context){
  let out = '';
  for(let i=1;i<=5;i++){
    out += `<span class="star ${i<=value?'filled':''}" onclick="event.stopPropagation();rateRecord('${recId}','${kind}',${i},'${context}')">${i<=value?'★':'☆'}</span>`;
  }
  return out;
}
function renderStarsRow(kind, label, value, recId, context){
  return `<div class="rating-row"><span class="lbl">${label}</span>${starsHtml(kind, value, recId, context)}</div>`;
}
function rateRecord(id, kind, value, context){
  const r = findRecordById(id);
  if(!r) return;
  setRating(r, kind, value);
  if(context==='result') renderResultRatings();
  else if(context==='detail') renderDetailRatings(r);
  renderBrowseList();
}
function renderResultRatings(){
  if(!currentResultRecord) return;
  const box = document.getElementById('resultRatingBox');
  if(!box) return;
  const rt = getRating(currentResultRecord);
  box.innerHTML = renderStarsRow('music','מוזיקה 🎵', rt.music, currentResultRecord.id, 'result')
    + renderStarsRow('pressing','פרסינג 💿', rt.pressing, currentResultRecord.id, 'result');
}
/* ---------------- FAVORITES ---------------- */
const FAVORITES_KEY = "whats_spinning_favorites_v1";
let FAVORITES = {};
function loadFavorites(){ try{ const raw = localStorage.getItem(FAVORITES_KEY); if(raw) FAVORITES = JSON.parse(raw); }catch(e){} }
function saveFavorites(){ try{ localStorage.setItem(FAVORITES_KEY, JSON.stringify(FAVORITES)); }catch(e){} }
loadFavorites();
function isFavorite(r){ return !!FAVORITES[recKey(r)]; }
function setFavorite(r, val){
  const k = recKey(r);
  if(val){ FAVORITES[k] = {artist:r.artist, album:r.album}; } else { delete FAVORITES[k]; }
  saveFavorites();
}
function toggleFavoriteById(id, context){
  const r = findRecordById(id);
  if(!r) return;
  setFavorite(r, !isFavorite(r));
  if(context==='result') renderResultFavoriteBtn();
  else if(context==='detail') renderDetailFavBtn(r);
  renderBrowseList();
  renderFavoritesStrip();
}
async function renderFavoritesStrip(){
  const section = document.getElementById('favoritesSection');
  const strip = document.getElementById('favoritesStrip');
  if(!section || !strip) return;
  const favRecords = RECORDS.filter(r=>isFavorite(r)).slice(0,16);
  if(!favRecords.length){ section.classList.add('hidden'); strip.innerHTML=''; return; }
  section.classList.remove('hidden');
  strip.innerHTML = favRecords.map(r=>`<div class="ic" style="width:56px;height:56px;font-size:30px;border-radius:10px;flex-shrink:0;cursor:pointer;" id="favThumb_${r.id}" onclick="openFavoriteRecord('${r.id}')">💿</div>`).join('');
  favRecords.forEach(async r=>{
    const el = document.getElementById('favThumb_'+r.id);
    if(!el) return;
    const url = getCoverOverride(r) || await fetchAlbumArtUnified(r.artist, r.album);
    if(!url) return;
    const stillThere = document.getElementById('favThumb_'+r.id);
    if(!stillThere) return;
    const img = new Image();
    img.onload = () => { stillThere.outerHTML = `<img class="alt-cover-thumb" style="width:56px;height:56px;" id="favThumb_${r.id}" src="${url}" title="${escapeHtml(r.album)}" onclick="openFavoriteRecord('${r.id}')">`; };
    img.src = url;
  });
}
function openFavoriteRecord(id){
  openRecordQuickView(id);
}

/* ---------------- EXCLUDE ("never recommend") ---------------- */
const EXCLUDED_KEY = "whats_spinning_excluded_v1";
let EXCLUDED = {};
function loadExcluded(){ try{ const raw = localStorage.getItem(EXCLUDED_KEY); if(raw) EXCLUDED = JSON.parse(raw); }catch(e){} }
function saveExcluded(){ try{ localStorage.setItem(EXCLUDED_KEY, JSON.stringify(EXCLUDED)); }catch(e){} }
loadExcluded();
function isExcluded(r){ return !!EXCLUDED[recKey(r)]; }
function setExcluded(r, val){
  const k = recKey(r);
  if(val){ EXCLUDED[k] = {artist:r.artist, album:r.album}; } else { delete EXCLUDED[k]; }
  saveExcluded();
}
function eligibleRecords(){
  const el = RECORDS.filter(r=>!isExcluded(r));
  return el.length ? el : RECORDS; // safety net: never return an empty pool
}

/* ---------------- REMOVE FROM COLLECTION (permanent hide, independent of source) ---------------- */
// Unlike EXCLUDED above (which only opts a record out of random/quiz picks - it still shows in Browse),
// this permanently hides a record from the whole collection, even if the underlying row is still
// present in the Google Sheet/Excel or in the Discogs collection - for a record you don't want to see
// anymore without having to go edit the spreadsheet itself. Keyed by looseMatchKey (not the exact
// recKey) so it keeps working even if the same row gets retyped slightly differently in a future sync.
const REMOVED_RECORDS_KEY = "whats_spinning_removed_records_v1";
let REMOVED_RECORDS = {};
function loadRemovedRecords(){ try{ const raw = localStorage.getItem(REMOVED_RECORDS_KEY); if(raw) REMOVED_RECORDS = JSON.parse(raw); }catch(e){} }
function saveRemovedRecords(){ try{ localStorage.setItem(REMOVED_RECORDS_KEY, JSON.stringify(REMOVED_RECORDS)); }catch(e){} }
function isRemovedRecord(r){ return !!REMOVED_RECORDS[looseMatchKey(r)]; }
function removeRecordFromCollection(r){
  REMOVED_RECORDS[looseMatchKey(r)] = { artist: r.artist, album: r.album, removedAt: Date.now() };
  saveRemovedRecords();
  recombine();
}
function restoreRemovedRecord(key){
  delete REMOVED_RECORDS[key];
  saveRemovedRecords();
  recombine();
}

// Tracks exactly which records were added by the MOST RECENT sheet/Excel sync or Discogs import,
// so an "undo last sync/import" button can remove precisely those (and nothing that already existed
// before) without having to keep a full history of every past sync. Reuses REMOVED_RECORDS (above)
// as the actual removal mechanism - "undo" just permanently hides that batch, restorable later.
const LAST_SYNC_NEW_KEYS_KEY = "whats_spinning_last_sync_new_keys_v1";
let LAST_SYNC_NEW_KEYS = [];
function loadLastSyncNewKeys(){ try{ const raw = localStorage.getItem(LAST_SYNC_NEW_KEYS_KEY); if(raw) LAST_SYNC_NEW_KEYS = JSON.parse(raw); }catch(e){} }
function saveLastSyncNewKeys(){ try{ localStorage.setItem(LAST_SYNC_NEW_KEYS_KEY, JSON.stringify(LAST_SYNC_NEW_KEYS)); }catch(e){} }
const LAST_DISCOGS_IMPORT_NEW_KEYS_KEY = "whats_spinning_last_discogs_import_new_keys_v1";
let LAST_DISCOGS_IMPORT_NEW_KEYS = [];
function loadLastDiscogsImportNewKeys(){ try{ const raw = localStorage.getItem(LAST_DISCOGS_IMPORT_NEW_KEYS_KEY); if(raw) LAST_DISCOGS_IMPORT_NEW_KEYS = JSON.parse(raw); }catch(e){} }
function saveLastDiscogsImportNewKeys(){ try{ localStorage.setItem(LAST_DISCOGS_IMPORT_NEW_KEYS_KEY, JSON.stringify(LAST_DISCOGS_IMPORT_NEW_KEYS)); }catch(e){} }
function undoLastSheetSync(){
  if(!LAST_SYNC_NEW_KEYS.length) return;
  const msg = LANG==='en'
    ? `Remove the ${LAST_SYNC_NEW_KEYS.length} record(s) just added by the last sync? Anything that already existed before stays untouched. You can restore them later from "Removed records".`
    : `להסיר את ${LAST_SYNC_NEW_KEYS.length} התקליטים שנוספו בסנכרון האחרון? כל מה שכבר היה קיים לפני כן יישאר בלי לגעת. אפשר לשחזר אותם מאוחר יותר דרך "תקליטים שהוסרו".`;
  if(!confirm(msg)) return;
  LAST_SYNC_NEW_KEYS.forEach(lk=>{
    const r = RECORDS.find(rec=>looseMatchKey(rec)===lk);
    if(r) REMOVED_RECORDS[looseMatchKey(r)] = { artist:r.artist, album:r.album, removedAt: Date.now() };
  });
  saveRemovedRecords();
  LAST_SYNC_NEW_KEYS = [];
  saveLastSyncNewKeys();
  recombine();
  saveRecords();
  updateHeader();
  renderBrowseList('');
  renderRemovedRecordsList();
  renderSheetSyncUndoAffordance();
}
function undoLastDiscogsImport(){
  if(!LAST_DISCOGS_IMPORT_NEW_KEYS.length) return;
  const msg = LANG==='en'
    ? `Remove the ${LAST_DISCOGS_IMPORT_NEW_KEYS.length} record(s) just added by the last Discogs import? Anything that already existed before stays untouched. You can restore them later from "Removed records".`
    : `להסיר את ${LAST_DISCOGS_IMPORT_NEW_KEYS.length} התקליטים שנוספו בייבוא הדיסקוגס האחרון? כל מה שכבר היה קיים לפני כן יישאר בלי לגעת. אפשר לשחזר אותם מאוחר יותר דרך "תקליטים שהוסרו".`;
  if(!confirm(msg)) return;
  LAST_DISCOGS_IMPORT_NEW_KEYS.forEach(lk=>{
    const r = RECORDS.find(rec=>looseMatchKey(rec)===lk);
    if(r) REMOVED_RECORDS[looseMatchKey(r)] = { artist:r.artist, album:r.album, removedAt: Date.now() };
  });
  saveRemovedRecords();
  LAST_DISCOGS_IMPORT_NEW_KEYS = [];
  saveLastDiscogsImportNewKeys();
  recombine();
  saveRecords();
  updateHeader();
  renderBrowseList('');
  renderRemovedRecordsList();
  renderDiscogsImportUndoAffordance();
}
function renderSheetSyncUndoAffordance(){
  ['sheetSyncUndoWrap','excelSyncUndoWrap'].forEach(id=>{
    const el = document.getElementById(id);
    if(!el) return;
    el.innerHTML = LAST_SYNC_NEW_KEYS.length
      ? `<button class="btn ghost" style="width:100%;margin-top:8px;" onclick="undoLastSheetSync()">${escapeHtml(tf('settings.undoLastSync', LAST_SYNC_NEW_KEYS.length))}</button>`
      : '';
  });
}
function renderDiscogsImportUndoAffordance(){
  const el = document.getElementById('discogsImportUndoWrap');
  if(!el) return;
  el.innerHTML = LAST_DISCOGS_IMPORT_NEW_KEYS.length
    ? `<button class="btn ghost" style="width:100%;margin-top:8px;" onclick="undoLastDiscogsImport()">${escapeHtml(tf('settings.undoLastDiscogsImport', LAST_DISCOGS_IMPORT_NEW_KEYS.length))}</button>`
    : '';
}
function lastSyncLabel(){
  const ts = localStorage.getItem(LAST_SYNC_KEY);
  if(!ts) return LANG==='en' ? `Starting data from ${BUILD_DATE}` : `נתוני פתיחה מ-${BUILD_DATE}`;
  const d = new Date(parseInt(ts));
  const dateStr = d.toLocaleDateString(LANG==='en'?'en-US':'he-IL');
  const timeStr = d.toLocaleTimeString(LANG==='en'?'en-US':'he-IL',{hour:'2-digit',minute:'2-digit'});
  return LANG==='en' ? `Last synced ${dateStr} ${timeStr}` : `סונכרן לאחרונה ${dateStr} ${timeStr}`;
}
// Used by the "Recently added" browse filter to show when each record entered the collection.
function relativeAddedLabel(ts){
  const days = Math.floor((Date.now() - ts) / (24*60*60*1000));
  if(days <= 0) return t('filter.addedToday');
  if(days === 1) return t('filter.addedYesterday');
  if(days < 30) return tf('filter.addedDaysAgo', days);
  const d = new Date(ts);
  return tf('filter.addedOnDate', d.toLocaleDateString(LANG==='en'?'en-US':'he-IL'));
}
function updateHeader(){
  const syncNoteEl = document.getElementById('syncNote');
  if(syncNoteEl) syncNoteEl.textContent = lastSyncLabel();
}
updateHeader();

function showScreen(name, opts){
  opts = opts || {};
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-'+name).classList.add('active');
  if(name==='browse'){ if(!opts.keepFilters) resetFilters(); renderBrowseList(); }
  if(name==='history') renderHistoryScreen();
  if(name==='recent'){ renderHistRecentList(); renderRecentNeedleCard(); renderFavoritesStrip(); renderMyActivityScreen(); }
  if(name==='prizes') renderPrizesScreen();
  if(name==='wishlist'){ renderWishlistList(); loadWishlistSuggestions(); }
  if(name==='incoming') renderIncomingList();
  if(name==='result') updateResultHeaderIcon();
  if(name==='settings') renderSettingsScreen();
}
let RESULT_SOURCE = 'quiz'; // 'quiz' | 'random' | 'favorite'
let RESULT_LOGO_SRC = null;
function updateResultHeaderIcon(){
  const img = document.getElementById('resultHeaderIcon');
  if(!img) return;
  if(RESULT_LOGO_SRC === null) RESULT_LOGO_SRC = img.src;
  let srcEl = null;
  if(RESULT_SOURCE === 'random') srcEl = document.querySelector('.icon-tile[onclick="pickRandom()"] img');
  else if(RESULT_SOURCE === 'quiz') srcEl = document.querySelector('.icon-tile[onclick="startQuiz()"] img');
  img.src = srcEl ? srcEl.src : RESULT_LOGO_SRC;
  // BUGFIX: the result screen's header used to always say the generic "Your result", giving no
  // hint of which flow (the quiz, "pick one for me at random", or a tapped favorite) led here.
  // Now it combines that flow's own label with "your result", so the full context is visible -
  // headers no longer truncate, so this can safely be a longer, more descriptive title.
  const titleEl = document.getElementById('resultHeaderTitle');
  if(titleEl){
    if(RESULT_SOURCE === 'random') titleEl.textContent = `${t('home.random.label')} - ${t('nav.title.result')}`;
    else if(RESULT_SOURCE === 'quiz') titleEl.textContent = `${t('home.quiz.label')} - ${t('nav.title.result')}`;
    else titleEl.textContent = t('nav.title.result');
  }
}
function escapeHtml(s){ return (s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

/* ---------------- PROFILE / ONBOARDING ---------------- */
const PROFILE_KEY = "whats_spinning_profile_v1";
let PROFILE = null;
function loadProfile(){ try{ const raw = localStorage.getItem(PROFILE_KEY); if(raw) PROFILE = JSON.parse(raw); }catch(e){} }
function saveProfile(p){ PROFILE = p; try{ localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); }catch(e){} }
loadProfile();

function toggleHidden(id){ document.getElementById(id).classList.toggle('hidden'); }
const EXAMPLE_ROWS = [
  ['אמן','אלבום','סוג','״','שנת הוצאה','שפה','מהדורה','צבע','חתום'],
  ['Taylor Swift','1989','אלבום סטודיו','12','2014','אנגלית','','',''],
  ['אביב גפן','אנשים בעולם מוזר','אלבום סטודיו','12','1993','עברית','First Pressing','שחור','לא'],
  ['Original Broadway Cast','Hamilton','פסקול','12','2015','אנגלית','','אדום','כן'],
];
function exampleTableHtml(){
  const [head, ...rows] = EXAMPLE_ROWS;
  return `<table class="example-table"><thead><tr>${head.map(h=>`<th>${escapeHtml(h)}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${escapeHtml(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}
function toggleObPanel(id){
  document.querySelectorAll('.ob-panel').forEach(p=>{ if(p.id!==id) p.classList.add('hidden'); });
  document.getElementById(id).classList.toggle('hidden');
}
function currentObName(){
  const v = (document.getElementById('obName') && document.getElementById('obName').value || '').trim();
  return v || (LANG==='en' ? 'Guest' : 'אורח/ת');
}
function finishOnboarding(){
  saveProfile({name: currentObName(), joinedAt: Date.now()});
  updateProfileGreeting();
  showScreen('home');
}
// "Start a new, empty collection" - the onboarding screen's second choice alongside importing from
// Discogs. Clears whatever collection ships baked into the app (previously reachable only via the
// old "just want to try it" demo button) so a fresh install genuinely starts empty; the user can
// still import an Excel file or a Google Sheet at any time from Settings.
function onboardStartFresh(){
  SHEET_RECORDS = [];
  LOCAL_ADDITIONS = [];
  recombine();
  saveRecords();
  finishOnboarding();
}
function updateProfileGreeting(){
  const el = document.getElementById('switchProfileLink');
  if(!el) return;
  el.textContent = (PROFILE && PROFILE.name) ? tf('home.switchProfileNamed', PROFILE.name) : t('home.switchProfile');
}
function switchProfile(){
  const msg = LANG==='en' ? 'Switch profile? This does not delete the loaded collection, just the name.' : 'להחליף פרופיל? זה לא מוחק את האוסף שנטען, רק את השם.';
  if(!confirm(msg)) return;
  PROFILE = null;
  try{ localStorage.removeItem(PROFILE_KEY); }catch(e){}
  const nameInput = document.getElementById('obName');
  if(nameInput) nameInput.value = '';
  updateProfileGreeting();
  showScreen('onboarding');
}
// Unlike switchProfile() above (which only clears the name and keeps the collection), this is a
// full, permanent wipe of everything this app has stored in this browser - collection, ratings,
// play history, needle, Discogs connection, everything - for someone who really wants to start over.
// Framed to the user as "Delete account" (not "sign out") since there's no real account/session here -
// this button just erases all local data, which is what it actually does.
function deleteAccountFullReset(){
  const msg = LANG==='en'
    ? 'Sign out and start over? This PERMANENTLY deletes your entire collection, ratings, play history, needle settings, Discogs connection and everything else stored in this browser. This cannot be undone.'
    : 'להתנתק ולהתחיל מחדש? זה ימחק לצמיתות את כל האוסף, הדירוגים, היסטוריית הניגון, הגדרות המחט, החיבור לדיסקוגס וכל מה שנשמר בדפדפן הזה. אי אפשר לבטל את זה.';
  if(!confirm(msg)) return;
  const msg2 = LANG==='en' ? "Really sure? There's no undo." : "בטוח/ה לגמרי? אין אפשרות לשחזר.";
  if(!confirm(msg2)) return; // deliberate second confirmation - this is irreversible
  try{ localStorage.clear(); }catch(e){}
  location.reload();
}

/* ---------------- SETTINGS ---------------- */
let SETTINGS_VIEW = 'user';
function setSettingsView(view){
  SETTINGS_VIEW = view;
  ['user','needle','sync','feedback'].forEach(v=>{
    const tabId = 'setTab' + v.charAt(0).toUpperCase() + v.slice(1);
    document.getElementById(tabId)?.classList.toggle('active', v===view);
  });
  document.getElementById('setViewUser')?.classList.toggle('hidden', view!=='user');
  document.getElementById('setViewNeedle')?.classList.toggle('hidden', view!=='needle');
  document.getElementById('setViewSync')?.classList.toggle('hidden', view!=='sync');
  document.getElementById('setViewFeedback')?.classList.toggle('hidden', view!=='feedback');
  if(view==='user'){ updateSettingsGreeting(); renderSettingsAvatar(); }
  if(view==='needle'){ renderNeedleSettingsCard(); }
  if(view==='sync'){ renderDiscogsSettingsCard(); setSyncSubView(SYNC_SUB_VIEW); }
}
function renderSettingsScreen(){ setSettingsView(SETTINGS_VIEW); }
let SYNC_SUB_VIEW = 'discogs';
function setSyncSubView(view){
  SYNC_SUB_VIEW = view;
  ['discogs','sheet','excel'].forEach(v=>{
    const tabId = 'syncSubTab' + v.charAt(0).toUpperCase() + v.slice(1);
    document.getElementById(tabId)?.classList.toggle('active', v===view);
  });
  document.getElementById('syncSubViewDiscogs')?.classList.toggle('hidden', view!=='discogs');
  document.getElementById('syncSubViewSheet')?.classList.toggle('hidden', view!=='sheet');
  document.getElementById('syncSubViewExcel')?.classList.toggle('hidden', view!=='excel');
  if(view==='sheet' || view==='excel') renderSheetSyncUndoAffordance();
}
function updateSettingsGreeting(){
  const el = document.getElementById('settingsGreeting');
  if(!el) return;
  const name = (PROFILE && PROFILE.name) ? PROFILE.name : '';
  el.textContent = tf('settings.greeting', name);
}
const AVATAR_KEY = "whats_spinning_avatar_v1";
function renderSettingsAvatar(){
  const img = document.getElementById('settingsAvatarImg');
  const ph = document.getElementById('settingsAvatarPlaceholder');
  if(!img || !ph) return;
  let saved = null;
  try{ saved = localStorage.getItem(AVATAR_KEY); }catch(e){}
  if(saved){ img.src = saved; img.classList.remove('hidden'); ph.classList.add('hidden'); }
  else{ img.classList.add('hidden'); ph.classList.remove('hidden'); }
  renderPrideFlagPatch();
}
function renderPrideFlagPatch(){
  const patch = document.getElementById('prideFlagPatch');
  if(!patch) return;
  if(typeof computePrideProgress !== 'function'){ patch.classList.add('hidden'); return; }
  const progress = computePrideProgress();
  const complete = progress.collected.length >= PRIDE_COLORS.length;
  if(complete){
    patch.src = (typeof PRIDE_FLAG_FULL_COLOR !== 'undefined') ? PRIDE_FLAG_FULL_COLOR : '';
    patch.classList.remove('hidden');
  } else {
    patch.classList.add('hidden');
  }
}
function handleAvatarUpload(event){
  const file = event.target.files && event.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(){
    try{ localStorage.setItem(AVATAR_KEY, reader.result); }catch(e){}
    renderSettingsAvatar();
  };
  reader.readAsDataURL(file);
}
function submitFeedbackForm(e){
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const resultEl = document.getElementById('feedbackResult');
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString()
  }).then(()=>{
    if(resultEl) resultEl.innerHTML = `<div class="hint" style="color:var(--pink2);margin-top:10px;">${escapeHtml(t('settings.feedbackSent'))}</div>`;
    form.reset();
  }).catch(()=>{
    if(resultEl) resultEl.innerHTML = `<div class="hint" style="margin-top:10px;">${escapeHtml(t('settings.feedbackError'))}</div>`;
  });
  return false;
}

/* ---------------- DISCOGS + MUSICBRAINZ ENRICHMENT ----------------
   Priority order per record: (1) Roy's own Discogs collection (free — fetched once, matched
   in-memory), (2) Discogs' general database search, (3) MusicBrainz (free, no auth, used when
   Discogs isn't connected or found nothing). Whichever tier matches first wins; we always try to
   resolve the ORIGINAL release year (via a Discogs /masters lookup, or MusicBrainz's
   first-release-date) rather than the specific pressing's year. Matches are stored in ENRICHMENT
   (see near RECORDS above) rather than mutated onto the record objects, so they survive a sheet
   resync / Excel reupload / reset. Browsers block custom User-Agent headers on fetch(), so we
   can't send the descriptive UA MusicBrainz's docs ask for — fine for light personal use, but
   worth knowing if requests ever get throttled harder than expected. */
function sleep(ms){ return new Promise(res=>setTimeout(res, ms)); }

function normalizeForMatch(s){
  // BUGFIX: this used to strip anything outside a-z0-9 and accented Latin (À-ſ), which silently
  // collapsed EVERY Hebrew (or Cyrillic/CJK/etc) artist/album/genre string down to an empty string -
  // meaning any two Hebrew-titled records/tags normalized to the exact same "" key and were treated
  // as identical. That's the real root cause behind cross-source duplicates/merge failures and genre
  // tags silently merging for Hebrew records: this function is used both to decide "is this the same
  // record from another source" and "is this the same genre tag". \p{L}/\p{N} (Unicode letter/number)
  // keeps letters from ANY script instead of hardcoding Latin.
  return String(s||'')
    .toLowerCase()
    .replace(/\(\d+\)/g, ' ')                 // Discogs artist disambiguation, e.g. "Artist (2)"
    .replace(/['’`]/g, '')                     // drop apostrophes entirely (not just turn into a space) so "Pepper's" matches "Peppers"
    .replace(/[^\p{L}\p{N}]+/gu, ' ')  // strip remaining punctuation/symbols, keep letters+digits in any script
    .trim();
}
function tokenSimilarity(a, b){
  a = normalizeForMatch(a); b = normalizeForMatch(b);
  if(!a || !b) return 0;
  if(a === b) return 1;
  const ta = a.split(/\s+/).filter(Boolean);
  const tb = b.split(/\s+/).filter(Boolean);
  if(!ta.length || !tb.length) return 0;
  const setB = new Set(tb);
  let inter = 0; ta.forEach(t=>{ if(setB.has(t)) inter++; });
  const union = new Set([...ta, ...tb]).size;
  return union ? inter/union : 0;
}
function levenshteinDistance(a, b){
  const m = a.length, n = b.length;
  if(!m) return n; if(!n) return m;
  let prev = Array.from({length:n+1}, (_,j)=>j);
  for(let i=1;i<=m;i++){
    const cur = [i];
    for(let j=1;j<=n;j++){
      cur[j] = a[i-1]===b[j-1] ? prev[j-1] : 1+Math.min(prev[j-1], prev[j], cur[j-1]);
    }
    prev = cur;
  }
  return prev[n];
}
// Character-level similarity - catches single-word typos (e.g. "Abba God" vs "ABBA Gold") that
// word-token overlap alone would miss entirely, since a typo'd word shares no tokens at all.
function charSimilarity(a, b){
  a = normalizeForMatch(a); b = normalizeForMatch(b);
  if(!a || !b) return 0;
  if(a === b) return 1;
  const dist = levenshteinDistance(a, b);
  return 1 - dist / Math.max(a.length, b.length);
}
function fieldSimilarity(a, b){ return Math.max(tokenSimilarity(a, b), charSimilarity(a, b)); }
// Best-effort extraction of color/edition hints from Discogs format description strings
// (e.g. ["Vinyl","LP","Reissue","180g","Green"]). Not standardized data, so this is a heuristic -
// only ever surfaced as a suggestion, never assumed to be authoritative.
const EDITION_KEYWORDS = ['reissue','repress','remaster','remastered','deluxe edition','anniversary edition','special edition','limited edition','club edition','picture disc','promo'];
const COLOR_KEYWORDS = ['black','white','red','blue','green','yellow','orange','purple','pink','clear','transparent','gold','silver','splatter','marbled','swirl'];
function capitalizeWords(s){ return s ? s.replace(/\b\w/g, c=>c.toUpperCase()) : s; }
function extractFormatHints(descriptions){
  const allText = (descriptions||[]).filter(Boolean).join(' ').toLowerCase();
  const edition = EDITION_KEYWORDS.find(k=>allText.includes(k));
  const color = COLOR_KEYWORDS.find(k=>allText.includes(k));
  return { edition: capitalizeWords(edition) || null, color: capitalizeWords(color) || null };
}
// Scores how well a candidate release (from Discogs or MusicBrainz) matches one of our records,
// using every field we reasonably can from the Excel row: artist(s), album title, and year.
function scoreMatchCandidate(record, candidateArtists, candidateTitle, candidateYear){
  const recordArtists = splitArtists(record.artist);
  let artistScore = fieldSimilarity(record.artist, (candidateArtists||[]).join(' '));
  recordArtists.forEach(a=>{
    (candidateArtists||[]).forEach(ca=>{
      const s = fieldSimilarity(a, ca);
      if(s > artistScore) artistScore = s;
    });
  });
  const titleScore = fieldSimilarity(record.album, candidateTitle);
  if(artistScore < 0.55 || titleScore < 0.55) return 0; // gate: both fields must at least roughly match
  let yearBonus = 0;
  const ry = parseInt(record.year), cy = parseInt(candidateYear);
  if(!isNaN(ry) && !isNaN(cy)){
    const diff = Math.abs(ry - cy);
    if(diff === 0) yearBonus = 0.12;
    else if(diff <= 2) yearBonus = 0.06;
  }
  return Math.min(1, artistScore*0.5 + titleScore*0.4 + yearBonus);
}

/* ---- Discogs auth: Personal Access Token ----
   BUGFIX (was OAuth 1.0a): the previous version tried a full 3-legged OAuth flow
   (request_token -> authorize -> access_token) straight from client-side JS. Discogs' OAuth
   token endpoints don't send CORS headers back to arbitrary browser origins, so that first
   fetch() to /oauth/request_token was rejected by the browser before it ever reached Discogs -
   every click failed instantly and fell into the catch block, which showed the generic
   "check the token" error even though no token had been touched yet. Discogs' main REST API
   (the endpoints we actually need: identity, collection, search, releases) *does* support
   simple Personal Access Token auth with real CORS support, so we use that instead: the user
   pastes a token generated on their Discogs settings page, we verify it once against
   /oauth/identity, and every subsequent call sends it as a normal Authorization header. */
const DISCOGS_IDENTITY_URL = 'https://api.discogs.com/oauth/identity';
const DISCOGS_OAUTH_TOKEN_KEY = "whats_spinning_discogs_oauth_token_v1";
const DISCOGS_USER_KEY = "whats_spinning_discogs_user_v1";
let DISCOGS_OAUTH_TOKEN = '';
let DISCOGS_USERNAME = '';
function loadDiscogsAuth(){
  try{
    DISCOGS_OAUTH_TOKEN = localStorage.getItem(DISCOGS_OAUTH_TOKEN_KEY) || '';
    DISCOGS_USERNAME = localStorage.getItem(DISCOGS_USER_KEY) || '';
  }catch(e){}
}
loadDiscogsAuth();
let DISCOGS_LAST_REQUEST_TS = 0;
async function discogsThrottle(){ // stay well under Discogs' 60 req/min authenticated limit
  const wait = Math.max(0, 1100 - (Date.now() - DISCOGS_LAST_REQUEST_TS));
  if(wait > 0) await sleep(wait);
  DISCOGS_LAST_REQUEST_TS = Date.now();
}

/* Fetch wrapper that sends the stored personal access token - used for all
   authenticated Discogs API calls (collection, search, masters, releases, identity). */
async function discogsAuthedFetch(url, method){
  method = method || 'GET';
  return fetch(url, { method, headers: { 'Authorization': `Discogs token=${DISCOGS_OAUTH_TOKEN}` } });
}

async function discogsOAuthConnect(){
  const statusEl = document.getElementById('discogsConnectStatus');
  const input = document.getElementById('discogsTokenInput');
  const token = (input && input.value || '').trim();
  if(!token){
    if(statusEl) statusEl.textContent = t('settings.discogsTokenMissing');
    return;
  }
  if(statusEl) statusEl.textContent = t('settings.discogsConnecting');
  try{
    await discogsThrottle();
    const res = await fetch(DISCOGS_IDENTITY_URL, { headers: { 'Authorization': `Discogs token=${token}` } });
    if(!res.ok) throw new Error('discogs-identity-http-'+res.status);
    const data = await res.json();
    if(!data || !data.username) throw new Error('discogs-identity-missing-username');
    DISCOGS_OAUTH_TOKEN = token;
    DISCOGS_USERNAME = data.username;
    try{
      localStorage.setItem(DISCOGS_OAUTH_TOKEN_KEY, DISCOGS_OAUTH_TOKEN);
      localStorage.setItem(DISCOGS_USER_KEY, DISCOGS_USERNAME);
    }catch(e){}
    if(input) input.value = '';
    renderDiscogsSettingsCard();
  }catch(e){
    if(statusEl) statusEl.textContent = t('settings.discogsConnectError');
  }
}
function discogsDisconnect(){
  DISCOGS_OAUTH_TOKEN = ''; DISCOGS_USERNAME = '';
  try{
    localStorage.removeItem(DISCOGS_OAUTH_TOKEN_KEY);
    localStorage.removeItem(DISCOGS_USER_KEY);
  }catch(e){}
  renderDiscogsSettingsCard();
}
function renderDiscogsSettingsCard(){
  const disc = document.getElementById('discogsDisconnectedView');
  const conn = document.getElementById('discogsConnectedView');
  const noteEl = document.getElementById('discogsSyncNote');
  const importSection = document.getElementById('discogsImportSection');
  if(!disc || !conn) return;
  const connected = !!(DISCOGS_OAUTH_TOKEN && DISCOGS_USERNAME);
  disc.classList.toggle('hidden', connected);
  conn.classList.toggle('hidden', !connected);
  if(connected){
    const asEl = document.getElementById('discogsConnectedAs');
    if(asEl) asEl.textContent = tf('settings.discogsConnectedAs', DISCOGS_USERNAME);
  }
  if(importSection) importSection.classList.toggle('hidden', !connected);
  if(noteEl) noteEl.classList.toggle('hidden', connected);
  const statusEl = document.getElementById('discogsConnectStatus');
  if(statusEl) statusEl.textContent = '';
  renderRemovedRecordsList();
  renderDiscogsImportUndoAffordance();
}
async function onboardDiscogsConnect(){
  const statusEl = document.getElementById('obDiscogsStatus');
  const resultEl = document.getElementById('obDiscogsResult');
  const input = document.getElementById('obDiscogsTokenInput');
  const token = (input && input.value || '').trim();
  if(!token){
    statusEl.textContent = t('settings.discogsTokenMissing');
    return;
  }
  resultEl.innerHTML = '';
  statusEl.textContent = t('settings.discogsConnecting');
  try{
    await discogsThrottle();
    const res = await fetch(DISCOGS_IDENTITY_URL, { headers: { 'Authorization': `Discogs token=${token}` } });
    if(!res.ok) throw new Error('discogs-identity-http-'+res.status);
    const data = await res.json();
    if(!data || !data.username) throw new Error('discogs-identity-missing-username');
    DISCOGS_OAUTH_TOKEN = token;
    DISCOGS_USERNAME = data.username;
    try{
      localStorage.setItem(DISCOGS_OAUTH_TOKEN_KEY, DISCOGS_OAUTH_TOKEN);
      localStorage.setItem(DISCOGS_USER_KEY, DISCOGS_USERNAME);
    }catch(e){}
    renderDiscogsSettingsCard();

    statusEl.textContent = t('settings.discogsImportFetching');
    const items = await discogsFetchFullCollection((page, pages)=>{
      statusEl.textContent = tf('settings.discogsFetchingCollectionProgress', page, pages);
    });
    const pulledRecords = items.map(buildRecordFromDiscogsItem);
    DISCOGS_RECORDS = pulledRecords;
    saveDiscogsRecords();
    recombine();
    saveRecords();
    updateHeader();
    renderBrowseList('');
    renderDiscogsSettingsCard();
    statusEl.textContent = '';
    resultEl.innerHTML = `<div class="success-box">${tf('settings.discogsImportDone', pulledRecords.length, pulledRecords.length)}</div>`;
    if(input) input.value = '';
    setTimeout(finishOnboarding, 600);
  }catch(e){
    statusEl.textContent = '';
    resultEl.innerHTML = `<div class="error-box">${t('settings.discogsConnectError')}</div>`;
  }
}

/* ---------------- BARCODE SCAN (add a record by scanning its barcode, looked up on Discogs) ----------------
   Uses the existing Discogs OAuth connection (same one used for collection sync/import) - no separate
   auth step needed. Tries the native BarcodeDetector API first (fast, no download, works on
   Chrome/Edge/Android); falls back to the html5-qrcode library (loaded from cdnjs on demand) for
   browsers without native support (notably iOS Safari, which has no BarcodeDetector). */
let BARCODE_SCANNER_ACTIVE = false;
let BARCODE_NATIVE_STREAM = null;
let BARCODE_HTML5_INSTANCE = null;
let BARCODE_LIB_LOADING = null;
let BARCODE_LAST_RESULT = null;
function openBarcodeScan(){
  const modal = document.getElementById('barcodeModal');
  if(!modal) return;
  document.getElementById('barcodeResultArea').classList.add('hidden');
  document.getElementById('barcodeResultArea').innerHTML = '';
  document.getElementById('barcodeScanStatus').textContent = '';
  document.getElementById('barcodeManualInput').value = '';
  const connected = !!(DISCOGS_OAUTH_TOKEN && DISCOGS_USERNAME);
  document.getElementById('barcodeNeedConnect').classList.toggle('hidden', connected);
  document.getElementById('barcodeScanArea').classList.toggle('hidden', !connected);
  modal.classList.remove('hidden');
  if(connected) startBarcodeScan();
}
function closeBarcodeScan(){
  stopBarcodeScan();
  document.getElementById('barcodeModal')?.classList.add('hidden');
}
async function startBarcodeScan(){
  const readerEl = document.getElementById('barcodeReaderEl');
  if(!readerEl) return;
  readerEl.innerHTML = '';
  BARCODE_SCANNER_ACTIVE = true;
  if('BarcodeDetector' in window){
    try{
      const formats = await window.BarcodeDetector.getSupportedFormats();
      const wanted = ['ean_13','ean_8','upc_a','upc_e'].filter(f=>formats.includes(f));
      if(wanted.length){ await startNativeBarcodeDetector(wanted); return; }
    }catch(e){ /* fall through to the library-based scanner */ }
  }
  await startHtml5QrcodeScanner();
}
async function startNativeBarcodeDetector(formats){
  const readerEl = document.getElementById('barcodeReaderEl');
  const video = document.createElement('video');
  video.setAttribute('playsinline','');
  video.muted = true;
  video.style.width = '100%';
  video.style.display = 'block';
  video.style.borderRadius = '12px';
  readerEl.appendChild(video);
  let stream;
  try{
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
  } catch(e){
    document.getElementById('barcodeScanStatus').textContent = t('barcode.cameraError');
    return;
  }
  if(!BARCODE_SCANNER_ACTIVE){ stream.getTracks().forEach(tr=>tr.stop()); return; }
  BARCODE_NATIVE_STREAM = stream;
  video.srcObject = stream;
  try{ await video.play(); }catch(e){}
  const detector = new window.BarcodeDetector({ formats });
  const loop = async () => {
    if(!BARCODE_SCANNER_ACTIVE) return;
    try{
      const codes = await detector.detect(video);
      if(codes && codes.length){ onBarcodeDetected(codes[0].rawValue); return; }
    }catch(e){}
    if(BARCODE_SCANNER_ACTIVE) requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}
function stopNativeBarcodeDetector(){
  if(BARCODE_NATIVE_STREAM){ BARCODE_NATIVE_STREAM.getTracks().forEach(tr=>tr.stop()); BARCODE_NATIVE_STREAM = null; }
}
function loadHtml5QrcodeLib(){
  if(window.Html5Qrcode) return Promise.resolve();
  if(BARCODE_LIB_LOADING) return BARCODE_LIB_LOADING;
  BARCODE_LIB_LOADING = new Promise((resolve, reject)=>{
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.8/html5-qrcode.min.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('html5-qrcode load failed'));
    document.head.appendChild(script);
  });
  return BARCODE_LIB_LOADING;
}
async function startHtml5QrcodeScanner(){
  const readerEl = document.getElementById('barcodeReaderEl');
  try{
    await loadHtml5QrcodeLib();
  } catch(e){
    document.getElementById('barcodeScanStatus').textContent = t('barcode.cameraError');
    return;
  }
  if(!BARCODE_SCANNER_ACTIVE || !readerEl) return; // modal was closed while the library was loading
  try{
    BARCODE_HTML5_INSTANCE = new Html5Qrcode('barcodeReaderEl');
    await BARCODE_HTML5_INSTANCE.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 260, height: 120 },
        formatsToSupport: [
          Html5QrcodeSupportedFormats.EAN_13, Html5QrcodeSupportedFormats.EAN_8,
          Html5QrcodeSupportedFormats.UPC_A, Html5QrcodeSupportedFormats.UPC_E,
        ] },
      (decodedText) => { onBarcodeDetected(decodedText); },
      () => {} // per-frame "no code found yet" noise - ignore
    );
  } catch(e){
    document.getElementById('barcodeScanStatus').textContent = t('barcode.cameraError');
  }
}
function stopHtml5QrcodeScanner(){
  if(BARCODE_HTML5_INSTANCE){
    try{ BARCODE_HTML5_INSTANCE.stop().catch(()=>{}); }catch(e){}
    BARCODE_HTML5_INSTANCE = null;
  }
}
function stopBarcodeScan(){
  BARCODE_SCANNER_ACTIVE = false;
  stopNativeBarcodeDetector();
  stopHtml5QrcodeScanner();
}
function submitManualBarcode(){
  const val = (document.getElementById('barcodeManualInput').value || '').replace(/[^0-9]/g,'').trim();
  if(!val) return;
  onBarcodeDetected(val);
}
async function onBarcodeDetected(code){
  stopBarcodeScan();
  const cleaned = String(code).replace(/[^0-9]/g,'');
  const statusEl = document.getElementById('barcodeScanStatus');
  if(statusEl) statusEl.textContent = t('barcode.searching');
  try{
    await discogsThrottle();
    const res = await discogsAuthedFetch(`https://api.discogs.com/database/search?barcode=${encodeURIComponent(cleaned)}&type=release`);
    if(!res.ok) throw new Error('http-'+res.status);
    const data = await res.json();
    const r = (data.results||[])[0] || null;
    if(statusEl) statusEl.textContent = '';
    showBarcodeResult(r, cleaned);
  } catch(e){
    if(statusEl) statusEl.textContent = t('barcode.notFound');
  }
}
function parseDiscogsTitle(title){
  const idx = String(title||'').indexOf(' - ');
  if(idx === -1) return { artist:'', album: title||'' };
  return { artist: title.slice(0, idx), album: title.slice(idx+3) };
}
function guessFormatSize(formatArr){
  const s = (formatArr||[]).join(' ');
  const m = s.match(/\b(12|10|7)"?\b/);
  return m ? m[1] : '';
}
function showBarcodeResult(r, code){
  const area = document.getElementById('barcodeResultArea');
  const scanArea = document.getElementById('barcodeScanArea');
  if(!area || !scanArea) return;
  scanArea.classList.add('hidden');
  area.classList.remove('hidden');
  if(!r){
    area.innerHTML = `<div class="hint">${escapeHtml(tf('barcode.notFoundFor', code))}</div>
      <button class="btn ghost" style="width:100%;margin-top:10px;" onclick="retryBarcodeScan()" data-i18n="barcode.tryAgain">${escapeHtml(t('barcode.tryAgain'))}</button>`;
    return;
  }
  const { artist, album } = parseDiscogsTitle(r.title);
  const cover = r.cover_image || r.thumb || '';
  const year = r.year || '';
  const fmtSize = guessFormatSize(r.format);
  BARCODE_LAST_RESULT = { artist, album, year, fmtSize };
  area.innerHTML = `
    <div class="list-item">
      <div class="list-thumb-wrap">${cover ? `<img src="${escapeHtml(cover)}" alt="">` : '💿'}</div>
      <div class="n">${escapeHtml(album)}<span class="a">${escapeHtml(artist)}</span></div>
      <div class="last">${escapeHtml(String(year))}</div>
    </div>
    <button class="btn" style="width:100%;margin-top:10px;" onclick="applyBarcodeResult()">${escapeHtml(t('barcode.useResult'))}</button>
    <button class="btn ghost" style="width:100%;margin-top:8px;" onclick="retryBarcodeScan()">${escapeHtml(t('barcode.tryAgain'))}</button>
  `;
}
function retryBarcodeScan(){
  document.getElementById('barcodeResultArea').classList.add('hidden');
  document.getElementById('barcodeScanArea').classList.remove('hidden');
  startBarcodeScan();
}
function applyBarcodeResult(){
  if(!BARCODE_LAST_RESULT) return;
  const info = BARCODE_LAST_RESULT;
  closeBarcodeScan();
  const artistEl = document.getElementById('addArtist');
  const albumEl = document.getElementById('addAlbum');
  const yearEl = document.getElementById('addYear');
  const formatEl = document.getElementById('addFormat');
  if(artistEl) artistEl.value = info.artist || '';
  if(albumEl) albumEl.value = info.album || '';
  if(yearEl && info.year) yearEl.value = info.year;
  if(formatEl && info.fmtSize) formatEl.value = info.fmtSize;
}

async function discogsFetchFullCollection(onProgress){
  const items = [];
  let page = 1, pages = 1;
  do{
    await discogsThrottle();
    const res = await discogsAuthedFetch(`https://api.discogs.com/users/${encodeURIComponent(DISCOGS_USERNAME)}/collection/folders/0/releases?page=${page}&per_page=100`);
    if(!res.ok) throw new Error('discogs-collection-http-'+res.status);
    const data = await res.json();
    (data.releases||[]).forEach(rel=>items.push(rel));
    pages = (data.pagination && data.pagination.pages) || 1;
    if(onProgress) onProgress(page, pages);
    page++;
  } while(page <= pages);
  return items;
}
function bestDiscogsCollectionMatch(record, collectionItems){
  let best = null, bestScore = 0;
  collectionItems.forEach(item=>{
    const bi = item.basic_information || {};
    const artists = (bi.artists||[]).map(a=>a.name);
    const score = scoreMatchCandidate(record, artists, bi.title, bi.year);
    if(score > bestScore){ bestScore = score; best = item; }
  });
  return (best && bestScore >= 0.70) ? { item: best, score: bestScore } : null;
}
async function discogsSearchDatabase(record){
  await discogsThrottle();
  const artist0 = splitArtists(record.artist)[0] || record.artist || '';
  const qs = new URLSearchParams({ artist: artist0, release_title: record.album, type: 'release', per_page: '5' });
  const res = await discogsAuthedFetch(`https://api.discogs.com/database/search?${qs.toString()}`);
  if(!res.ok) throw new Error('discogs-search-http-'+res.status);
  const data = await res.json();
  const results = data.results || [];
  let best = null, bestScore = 0;
  results.forEach(item=>{
    const titleParts = String(item.title||'').split(' - ');
    const cArtist = titleParts.length > 1 ? titleParts[0] : '';
    const cTitle = titleParts.length > 1 ? titleParts.slice(1).join(' - ') : item.title;
    const score = scoreMatchCandidate(record, [cArtist], cTitle, item.year);
    if(score > bestScore){ bestScore = score; best = Object.assign({}, item, { parsedTitle: cTitle }); }
  });
  return (best && bestScore >= 0.78) ? { item: best, score: bestScore } : null;
}
async function discogsGetMasterYear(masterId){
  try{
    await discogsThrottle();
    const res = await discogsAuthedFetch(`https://api.discogs.com/masters/${masterId}`);
    if(!res.ok) return null;
    const data = await res.json();
    return data.year || null;
  }catch(e){ return null; }
}
async function discogsGetRelease(releaseId){
  try{
    await discogsThrottle();
    const res = await discogsAuthedFetch(`https://api.discogs.com/releases/${releaseId}`);
    if(!res.ok) return null;
    return await res.json();
  }catch(e){ return null; }
}

/* ---- Discogs collection -> full record import (alternative to syncing from a Sheet/Excel) ---- */
const DISCOGS_RECORDS_KEY = "whats_spinning_discogs_records_v1";
const DISCOGS_DISMISSED_KEY = "whats_spinning_discogs_dismissed_v1";
let DISCOGS_DISMISSED_KEYS = [];
function loadDiscogsRecords(){ try{ const raw = localStorage.getItem(DISCOGS_RECORDS_KEY); if(raw) DISCOGS_RECORDS = JSON.parse(raw); }catch(e){} }
function saveDiscogsRecords(){ try{ localStorage.setItem(DISCOGS_RECORDS_KEY, JSON.stringify(DISCOGS_RECORDS)); }catch(e){} }
function loadDiscogsDismissed(){ try{ const raw = localStorage.getItem(DISCOGS_DISMISSED_KEY); if(raw) DISCOGS_DISMISSED_KEYS = JSON.parse(raw); }catch(e){} }
function saveDiscogsDismissed(){ try{ localStorage.setItem(DISCOGS_DISMISSED_KEY, JSON.stringify(DISCOGS_DISMISSED_KEYS)); }catch(e){} }

function discogsTypeFromDescriptions(descriptions){
  const all = (descriptions||[]).join(' ').toLowerCase();
  if(all.includes('compilation')) return 'אוסף';
  if(all.includes('soundtrack')) return 'פסקול';
  if(all.includes('live')) return 'לייב';
  if(all.includes('mixtape')) return 'מיקסטייפ';
  if(all.includes('single')) return 'סינגל';
  if(all.includes('mini') || all.includes(' ep')) return 'מיני אלבום';
  return 'אלבום סטודיו';
}
function discogsFormatSizeFromDescriptions(descriptions){
  const all = (descriptions||[]).join(' ');
  const m = all.match(/(7|10|12)\s*"/);
  return m ? m[1] : '12';
}
function discogsLpCountFromFormat(fmt){
  const qty = parseInt((fmt && fmt.qty) || '', 10);
  if(qty && qty > 0) return String(qty);
  const m = String((fmt && fmt.name) || '').match(/(\d+)\s*x/i);
  return m ? m[1] : '1';
}
// Discogs returns a generic gray placeholder ("spacer.gif") when a release has no real cover
// image uploaded - treat that as "no image" rather than showing the placeholder as the cover.
function discogsUsableImage(url){
  if(!url || /spacer\.gif/i.test(url)) return null;
  return url;
}
function discogsCoverImageFor(r){
  const e = r && r._enrich;
  return (e && discogsUsableImage(e.cover_image)) || null;
}
function buildRecordFromDiscogsItem(item){
  const bi = item.basic_information || {};
  const artist = (bi.artists||[]).map(a=>String(a.name||'').replace(/\s*\(\d+\)$/,'')).join(' & ') || (LANG==='en'?'Unknown':'לא ידוע');
  const album = bi.title || (LANG==='en'?'Unknown':'לא ידוע');
  const fmt = (bi.formats||[])[0] || {};
  const descriptions = fmt.descriptions || [];
  const hints = extractFormatHints(descriptions);
  const rec = tagRecord({
    artist, album,
    type: discogsTypeFromDescriptions(descriptions),
    format: discogsFormatSizeFromDescriptions(descriptions),
    year: bi.year ? String(bi.year) : '',
    language: '',
    edition: hints.edition || '',
    color: hints.color || '',
    signed: '',
    lpCount: discogsLpCountFromFormat(fmt),
  });
  if((bi.genres||[]).length){
    rec.genres = [...new Set([...(bi.genres||[]), ...(bi.styles||[])])];
    rec.genre = bi.genres[0];
  }
  rec.id = 'discogs_' + item.id;
  rec.tags = rec.tags || [];
  rec._source = 'discogs';
  rec._discogsReleaseId = item.id;
  rec._discogsMasterId = bi.master_id || null;
  // Records imported directly from Discogs already carry their own cover image and genres from
  // Discogs - seed ENRICHMENT with them right away so the same priority logic used for sheet/Excel
  // records (Discogs image wins) also applies here, without waiting for a separate sync pass.
  const coverImage = discogsUsableImage(bi.cover_image) || discogsUsableImage(bi.thumb) || null;
  if(coverImage){
    const key = recKey(rec);
    ENRICHMENT[key] = Object.assign({}, ENRICHMENT[key], { cover_image: coverImage, updated_at: new Date().toISOString() });
  }
  return rec;
}
async function discogsImportCollectionAsRecords(){
  const btn = document.getElementById('discogsImportBtn');
  const statusEl = document.getElementById('discogsImportStatus');
  const resultEl = document.getElementById('discogsImportResult');
  if(!DISCOGS_OAUTH_TOKEN || !DISCOGS_USERNAME) return;
  if(btn) btn.disabled = true;
  if(resultEl) resultEl.innerHTML = '';
  const setStatus = (msg)=>{ if(statusEl) statusEl.textContent = msg; };
  setStatus(t('settings.discogsImportFetching'));
  try{
    const items = await discogsFetchFullCollection((page, pages)=>{
      setStatus(tf('settings.discogsFetchingCollectionProgress', page, pages));
    });
    const pulledRecords = items.map(buildRecordFromDiscogsItem);
    // looseMatchKey (not exact recKey) for cross-source existence checks - see recombine() for why.
    const sheetKeys = new Set(SHEET_RECORDS.map(looseMatchKey));
    const localKeys = new Set(LOCAL_ADDITIONS.map(looseMatchKey));
    const existingDiscogsByKey = {};
    DISCOGS_RECORDS.forEach(r=>{ existingDiscogsByKey[looseMatchKey(r)] = r; });

    let added = 0, skippedExisting = 0;
    const finalDiscogsRecords = [];
    const newlyAddedKeys = [];
    pulledRecords.forEach(rec=>{
      const key = looseMatchKey(rec);
      // DISCOGS_DISMISSED_KEYS is already-persisted data keyed by exact recKey - kept as-is so past dismissals still apply.
      if(DISCOGS_DISMISSED_KEYS.includes(recKey(rec))) return; // user already merged this one into another record
      if(sheetKeys.has(key) || localKeys.has(key)){ skippedExisting++; return; }
      if(existingDiscogsByKey[key]){ finalDiscogsRecords.push(existingDiscogsByKey[key]); return; } // keep the existing copy (preserves its play history)
      finalDiscogsRecords.push(rec);
      markRecordAdded(rec);
      newlyAddedKeys.push(key);
      added++;
    });
    LAST_DISCOGS_IMPORT_NEW_KEYS = newlyAddedKeys;
    saveLastDiscogsImportNewKeys();
    DISCOGS_RECORDS = finalDiscogsRecords;
    saveDiscogsRecords();
    saveEnrichment();
    recombine();
    saveRecords();
    updateHeader();
    renderBrowseList('');
    setStatus('');
    if(resultEl) resultEl.innerHTML = `<div class="success-box">${tf('settings.discogsImportDone', added, items.length)}</div>`;
    renderDiscogsSettingsCard();
  }catch(e){
    setStatus(t('settings.discogsImportError'));
  } finally {
    if(btn) btn.disabled = false;
  }
}

/* ---- Near-duplicate detection + manual merge (for records pulled twice via different sources) ---- */
function sourceOfRecord(r){
  if(SHEET_RECORDS.includes(r)) return 'sheet';
  if(DISCOGS_RECORDS.includes(r)) return 'discogs';
  return 'local';
}
function sourceLabel(src){
  return { sheet: t('settings.dupSourceSheet'), discogs: t('settings.dupSourceDiscogs'), local: t('settings.dupSourceLocal') }[src] || src;
}
const NOT_DUPLICATE_KEY = "whats_spinning_not_duplicate_pairs_v1";
let NOT_DUPLICATE_PAIRS = []; // remembers pairs the user said aren't duplicates, so the scan stops flagging them
function loadNotDuplicatePairs(){ try{ const raw = localStorage.getItem(NOT_DUPLICATE_KEY); if(raw) NOT_DUPLICATE_PAIRS = JSON.parse(raw); }catch(e){} }
function saveNotDuplicatePairs(){ try{ localStorage.setItem(NOT_DUPLICATE_KEY, JSON.stringify(NOT_DUPLICATE_PAIRS)); }catch(e){} }
loadNotDuplicatePairs();
function dupPairKey(keyA, keyB){ return [keyA, keyB].sort().join('|||||'); }

let LAST_DUP_PAIRS = [];
function findAndShowDuplicates(){
  const pairs = [];
  const list = RECORDS;
  for(let i=0;i<list.length;i++){
    for(let j=i+1;j<list.length;j++){
      const a = list[i], b = list[j];
      const ka = recKey(a), kb = recKey(b);
      if(ka === kb) continue; // exact matches are already deduped by recombine()
      if(NOT_DUPLICATE_PAIRS.includes(dupPairKey(ka, kb))) continue; // user already said this pair isn't a duplicate
      if(fieldSimilarity(a.artist, b.artist) >= 0.82 && fieldSimilarity(a.album, b.album) >= 0.82){
        pairs.push({ a, b });
      }
    }
  }
  LAST_DUP_PAIRS = pairs;
  renderDuplicatesList();
}
function renderDuplicatesList(){
  const el = document.getElementById('discogsDupResult');
  if(!el) return;
  if(!LAST_DUP_PAIRS.length){ el.innerHTML = `<div class="hint" style="margin-top:10px;text-align:center;">${t('settings.discogsDupNone')}</div>`; return; }
  el.innerHTML = LAST_DUP_PAIRS.map((pair, idx) => {
    const srcA = sourceOfRecord(pair.a), srcB = sourceOfRecord(pair.b);
    const preferSheet = srcA === 'sheet' ? 'a' : (srcB === 'sheet' ? 'b' : null);
    const rowA = `<div>${escapeHtml(pair.a.artist)} — ${escapeHtml(pair.a.album)} <span class="hint">(${sourceLabel(srcA)}${pair.a.year? ', '+escapeHtml(String(pair.a.year)):''})</span></div>`;
    const rowB = `<div>${escapeHtml(pair.b.artist)} — ${escapeHtml(pair.b.album)} <span class="hint">(${sourceLabel(srcB)}${pair.b.year? ', '+escapeHtml(String(pair.b.year)):''})</span></div>`;
    const btns = preferSheet
      ? `<button class="btn secondary" style="width:100%;margin-top:8px;" onclick="mergeDuplicatePair(${idx}, '${preferSheet}')">${t('settings.discogsDupMergeBtn')}</button>`
      : `<div class="stack" style="margin-top:8px;">
           <button class="btn secondary" style="width:100%;" onclick="mergeDuplicatePair(${idx}, 'a')">${tf('settings.discogsDupKeepThis', escapeHtml(pair.a.artist+' - '+pair.a.album))}</button>
           <button class="btn secondary" style="width:100%;" onclick="mergeDuplicatePair(${idx}, 'b')">${tf('settings.discogsDupKeepThis', escapeHtml(pair.b.artist+' - '+pair.b.album))}</button>
         </div>`;
    return `<div class="card" style="margin-top:10px;">${rowA}${rowB}${btns}<button class="btn ghost" style="width:100%;margin-top:6px;" onclick="markNotDuplicate(${idx})">${t('settings.discogsDupNotDup')}</button></div>`;
  }).join('');
}
function markNotDuplicate(idx){
  const pair = LAST_DUP_PAIRS[idx];
  if(!pair) return;
  const pk = dupPairKey(recKey(pair.a), recKey(pair.b));
  if(!NOT_DUPLICATE_PAIRS.includes(pk)){ NOT_DUPLICATE_PAIRS.push(pk); saveNotDuplicatePairs(); }
  LAST_DUP_PAIRS = LAST_DUP_PAIRS.filter(p => p !== pair);
  renderDuplicatesList();
}
function renderRemovedRecordsList(){
  const el = document.getElementById('removedRecordsResult');
  if(!el) return;
  const keys = Object.keys(REMOVED_RECORDS);
  if(!keys.length){ el.innerHTML = `<div class="hint" style="margin-top:10px;text-align:center;">${escapeHtml(t('settings.removedNone'))}</div>`; return; }
  el.innerHTML = keys.map(key=>{
    const item = REMOVED_RECORDS[key];
    return `<div class="card" style="margin-top:10px;display:flex;align-items:center;justify-content:space-between;gap:8px;">
      <div>${escapeHtml(item.artist)} — ${escapeHtml(item.album)}</div>
      <button class="btn secondary" onclick="restoreRemovedRecordAndRerender(${jsStringForHtmlAttr(key)})">${escapeHtml(t('settings.removedRestoreBtn'))}</button>
    </div>`;
  }).join('');
}
function restoreRemovedRecordAndRerender(key){
  restoreRemovedRecord(key);
  saveRecords();
  updateHeader();
  renderBrowseList('');
  renderRemovedRecordsList();
}
function migrateRecordKey(oldKey, newKey){
  if(oldKey === newKey) return;
  if(PLAY_LOG[oldKey]){
    if(PLAY_LOG[newKey]){
      const a = PLAY_LOG[newKey], b = PLAY_LOG[oldKey];
      PLAY_LOG[newKey] = {
        count: (a.count||0)+(b.count||0), fullCount: (a.fullCount||0)+(b.fullCount||0),
        partialCount: (a.partialCount||0)+(b.partialCount||0), partialSidesTotal: (a.partialSidesTotal||0)+(b.partialSidesTotal||0),
        last: Math.max(a.last||0, b.last||0), artist: a.artist, album: a.album,
      };
    } else { PLAY_LOG[newKey] = PLAY_LOG[oldKey]; }
    delete PLAY_LOG[oldKey];
  }
  SPIN_EVENTS.forEach(e=>{ if(e.key === oldKey) e.key = newKey; });
  if(RATINGS[oldKey] && !RATINGS[newKey]) RATINGS[newKey] = RATINGS[oldKey];
  delete RATINGS[oldKey];
  if(FAVORITES[oldKey] !== undefined && FAVORITES[newKey] === undefined) FAVORITES[newKey] = FAVORITES[oldKey];
  delete FAVORITES[oldKey];
  if(EXCLUDED[oldKey] !== undefined && EXCLUDED[newKey] === undefined) EXCLUDED[newKey] = EXCLUDED[oldKey];
  delete EXCLUDED[oldKey];
  if(ENRICHMENT[oldKey] && !ENRICHMENT[newKey]) ENRICHMENT[newKey] = ENRICHMENT[oldKey];
  delete ENRICHMENT[oldKey];
  savePlayLog(); saveSpinEvents(); saveRatings(); saveFavorites(); saveExcluded(); saveEnrichment();
}
function mergeDuplicatePair(idx, keepSide){
  const pair = LAST_DUP_PAIRS[idx];
  if(!pair) return;
  const keep = keepSide === 'a' ? pair.a : pair.b;
  const discard = keepSide === 'a' ? pair.b : pair.a;
  const keepKey = recKey(keep), discardKey = recKey(discard);
  const discardSrc = sourceOfRecord(discard);
  if(discardSrc === 'sheet'){ alert(t('settings.discogsDupCantRemoveSheet')); return; }
  migrateRecordKey(discardKey, keepKey);
  if(discardSrc === 'discogs'){
    DISCOGS_RECORDS = DISCOGS_RECORDS.filter(r => recKey(r) !== discardKey);
    saveDiscogsRecords();
    if(!DISCOGS_DISMISSED_KEYS.includes(discardKey)){ DISCOGS_DISMISSED_KEYS.push(discardKey); saveDiscogsDismissed(); }
  } else {
    LOCAL_ADDITIONS = LOCAL_ADDITIONS.filter(r => recKey(r) !== discardKey);
    saveRecords();
  }
  LAST_DUP_PAIRS = LAST_DUP_PAIRS.filter(p => recKey(p.a)!==discardKey && recKey(p.b)!==discardKey);
  recombine();
  updateHeader();
  renderBrowseList('');
  renderDuplicatesList();
  alert(t('settings.discogsDupMerged'));
}

/* ---- MusicBrainz (no auth needed; free fallback) ---- */
let MB_LAST_REQUEST_TS = 0;
async function mbThrottle(){ // MusicBrainz asks for max 1 req/sec unauthenticated
  const wait = Math.max(0, 1100 - (Date.now() - MB_LAST_REQUEST_TS));
  if(wait > 0) await sleep(wait);
  MB_LAST_REQUEST_TS = Date.now();
}
async function mbSearchReleaseGroup(record){
  await mbThrottle();
  const artist0 = splitArtists(record.artist)[0] || record.artist || '';
  const query = `artist:"${artist0.replace(/"/g,'')}" AND releasegroup:"${(record.album||'').replace(/"/g,'')}"`;
  const res = await fetch(`https://musicbrainz.org/ws/2/release-group/?query=${encodeURIComponent(query)}&fmt=json&limit=5`, { headers: { 'Accept':'application/json' } });
  if(!res.ok) throw new Error('mb-http-'+res.status);
  const data = await res.json();
  const groups = data['release-groups'] || [];
  let best = null, bestScore = 0;
  groups.forEach(g=>{
    const artists = (g['artist-credit']||[]).map(ac=>ac.name);
    const year = g['first-release-date'] ? parseInt(String(g['first-release-date']).slice(0,4)) : null;
    const score = scoreMatchCandidate(record, artists, g.title, year);
    if(score > bestScore){ bestScore = score; best = g; }
  });
  return (best && bestScore >= 0.75) ? { item: best, score: bestScore } : null;
}

/* ---- Orchestration ---- */
async function runDiscogsSync(force){
  const btn = document.getElementById('discogsSyncBtn');
  const statusEl = document.getElementById('discogsSyncStatus');
  const resultEl = document.getElementById('discogsSyncResult');
  const setStatus = (msg)=>{ if(statusEl) statusEl.textContent = msg; };
  if(btn) btn.disabled = true;
  if(resultEl) resultEl.innerHTML = '';

  const total = RECORDS.length;
  let done = 0, viaCollection = 0, viaDb = 0, viaMb = 0, unmatched = 0;

  let collectionItems = [];
  if(DISCOGS_OAUTH_TOKEN && DISCOGS_USERNAME){
    setStatus(t('settings.discogsFetchingCollection'));
    try{
      collectionItems = await discogsFetchFullCollection((page, pages)=>{
        setStatus(tf('settings.discogsFetchingCollectionProgress', page, pages));
      });
    }catch(e){
      setStatus(t('settings.discogsCollectionFetchError'));
      collectionItems = [];
    }
  }

  for(const r of RECORDS){
    const key = recKey(r);
    const existing = ENRICHMENT[key];
    if(!force && existing){
      done++;
      if(existing.source === 'discogs_collection') viaCollection++;
      else if(existing.source === 'discogs_db') viaDb++;
      else if(existing.source === 'musicbrainz') viaMb++;
      setStatus(tf('settings.discogsSyncProgress', done, total));
      continue;
    }

    let matched = false;

    if(collectionItems.length){
      const m = bestDiscogsCollectionMatch(r, collectionItems);
      if(m){
        const bi = m.item.basic_information || {};
        let originalYear = bi.year || null;
        if(bi.master_id){ const my = await discogsGetMasterYear(bi.master_id); if(my) originalYear = my; }
        const fmtDescriptions = (bi.formats||[]).flatMap(f=>[f.name, ...(f.descriptions||[]), f.text].filter(Boolean));
        const hints = extractFormatHints(fmtDescriptions);
        const fmt0 = (bi.formats||[])[0] || {};
        ENRICHMENT[key] = {
          source: 'discogs_collection', score: m.score,
          original_year: originalYear, pressing_year: bi.year || null,
          label: (bi.labels && bi.labels[0] && bi.labels[0].name) || null,
          catalog_no: (bi.labels && bi.labels[0] && bi.labels[0].catno) || null,
          matched_color: hints.color, matched_edition: hints.edition,
          matched_lp_count: discogsLpCountFromFormat(fmt0),
          discogs_release_id: m.item.id, discogs_master_id: bi.master_id || null,
          matched_title: bi.title || null, updated_at: new Date().toISOString(),
          cover_image: discogsUsableImage(bi.cover_image) || discogsUsableImage(bi.thumb) || null,
          genres: [...new Set([...(bi.genres||[]), ...(bi.styles||[])])],
        };
        viaCollection++; matched = true;
      }
    }

    if(!matched && DISCOGS_OAUTH_TOKEN){
      try{
        const m = await discogsSearchDatabase(r);
        if(m){
          const rel = await discogsGetRelease(m.item.id);
          const masterId = rel && rel.master_id;
          let originalYear = m.item.year || null;
          if(masterId){ const my = await discogsGetMasterYear(masterId); if(my) originalYear = my; }
          const fmtDescriptions = (m.item.format||[]).concat((rel && rel.formats || []).flatMap(f=>[f.name, ...(f.descriptions||[]), f.text].filter(Boolean)));
          const hints = extractFormatHints(fmtDescriptions);
          const fmt0 = (rel && rel.formats || [])[0] || {};
          ENRICHMENT[key] = {
            source: 'discogs_db', score: m.score,
            original_year: originalYear, pressing_year: m.item.year || null,
            label: (m.item.label && m.item.label[0]) || (rel && rel.labels && rel.labels[0] && rel.labels[0].name) || null,
            catalog_no: m.item.catno || (rel && rel.labels && rel.labels[0] && rel.labels[0].catno) || null,
            matched_color: hints.color, matched_edition: hints.edition,
            matched_lp_count: discogsLpCountFromFormat(fmt0),
            discogs_release_id: m.item.id, discogs_master_id: masterId || null,
            matched_title: m.item.parsedTitle || null, updated_at: new Date().toISOString(),
            cover_image: discogsUsableImage(m.item.cover_image) || discogsUsableImage(m.item.thumb) || null,
            genres: [...new Set([...((rel && rel.genres)||[]), ...((rel && rel.styles)||[]), ...(m.item.genre||[]), ...(m.item.style||[])])],
          };
          viaDb++; matched = true;
        }
      }catch(e){ /* fall through to MusicBrainz */ }
    }

    if(!matched){
      try{
        const m = await mbSearchReleaseGroup(r);
        if(m){
          const year = m.item['first-release-date'] ? parseInt(String(m.item['first-release-date']).slice(0,4)) : null;
          ENRICHMENT[key] = {
            source: 'musicbrainz', score: m.score,
            original_year: year, pressing_year: null, label: null, catalog_no: null,
            matched_color: null, matched_edition: null,
            mb_release_group_id: m.item.id,
            matched_title: m.item.title || null, updated_at: new Date().toISOString(),
          };
          viaMb++; matched = true;
        }
      }catch(e){ /* leave unmatched */ }
    }

    if(!matched) unmatched++;
    done++;
    setStatus(tf('settings.discogsSyncProgress', done, total));
  }

  saveEnrichment();
  applyEnrichment();
  if(btn) btn.disabled = false;
  setStatus('');
  if(resultEl){
    resultEl.innerHTML = `<div class="hint" style="margin-top:8px;">${escapeHtml(tf('settings.discogsSyncSummary', viaCollection, viaDb, viaMb, unmatched))}</div>` +
      `<div style="text-align:center;margin-top:6px;"><span class="wiki-fix-link" onclick="runDiscogsSync(true)">${escapeHtml(t('settings.discogsForceResync'))}</span></div>`;
  }
  const cur = findRecordById(detailRecordId);
  if(cur) renderDetailEnrichLine(cur);
}

/* ---------------- GOOGLE SHEET SYNC + FILE UPLOAD (shared core) ---------------- */
const SHEET_ID_KEY = "whats_spinning_sheet_id_v1";
let CURRENT_SHEET_ID = localStorage.getItem(SHEET_ID_KEY) || SHEET_ID;
function extractSheetId(input){
  input = (input||'').trim();
  const m = input.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if(m) return m[1];
  return input;
}
function setSheetId(input){
  const id = extractSheetId(input);
  if(id){ CURRENT_SHEET_ID = id; try{ localStorage.setItem(SHEET_ID_KEY, id); }catch(e){} }
  return CURRENT_SHEET_ID;
}
function findCol(header, candidates){
  for(const c of candidates){ const i = header.indexOf(c); if(i>=0) return i; }
  return -1;
}
function rowsToRecords(rows, idPrefix){
  if(!rows.length) throw new Error('empty');
  const header = rows[0].map(h=>String(h||'').trim());
  const idx = {
    artist: findCol(header, ['אמן','Artist','artist']),
    album: findCol(header, ['אלבום','Album','album']),
    type: findCol(header, ['סוג','Type','type']),
    format: findCol(header, ['״','"',"פורמט",'Format','format']),
    year: findCol(header, ['שנת הוצאה','שנה','Year','year']),
    lang: findCol(header, ['שפה','Language','language']),
    edition: findCol(header, ['מהדורה','Edition','edition']),
    color: findCol(header, ['צבע','Color','color','Colour','colour']),
    signed: findCol(header, ['חתום','חתימה','Signed','signed']),
    lpCount: findCol(header, ['כמות LP','כמות תקליטים','LP Count','LP count','lp count','LP','lp']),
  };
  if(idx.artist < 0 && idx.album < 0) throw new Error('bad-format');
  const out = [];
  for(let i=1;i<rows.length;i++){
    const r = rows[i];
    const artist = String((r[idx.artist]!=null?r[idx.artist]:'')).trim();
    const album = String((r[idx.album]!=null?r[idx.album]:'')).trim();
    if(!artist && !album) continue;
    const tagged = tagRecord({
      artist, album,
      type: idx.type>=0 ? r[idx.type] : '',
      format: idx.format>=0 ? r[idx.format] : '',
      year: idx.year>=0 ? r[idx.year] : '',
      language: idx.lang>=0 ? r[idx.lang] : '',
      edition: idx.edition>=0 ? r[idx.edition] : '',
      color: idx.color>=0 ? r[idx.color] : '',
      signed: idx.signed>=0 ? r[idx.signed] : '',
      lpCount: idx.lpCount>=0 ? r[idx.lpCount] : '',
    });
    tagged.id = idPrefix+'_'+i;
    out.push(tagged);
  }
  return out;
}
function applyNewRecords(newRecords){
  // Snapshot what's already in the collection (from any source) BEFORE this sync overwrites the
  // sheet source, so we can tell which rows are genuinely new vs. just a re-synced existing record.
  const previousKeys = new Set(RECORDS.map(looseMatchKey));
  SHEET_RECORDS = newRecords;
  recombine();
  const newlyAddedKeys = [];
  RECORDS.forEach(r=>{
    const lk = looseMatchKey(r);
    if(!previousKeys.has(lk)){ markRecordAdded(r); newlyAddedKeys.push(lk); }
  });
  LAST_SYNC_NEW_KEYS = newlyAddedKeys;
  saveLastSyncNewKeys();
  saveRecords();
  localStorage.setItem(LAST_SYNC_KEY, String(Date.now()));
  updateHeader();
}

async function fetchSheetAsRecords(sheetId){
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&_=${Date.now()}`;
  const res = await fetch(url, {cache:'no-store'});
  if(!res.ok){ throw new Error(res.status === 403 ? 'no-access' : ('http-'+res.status)); }
  const csvText = await res.text();
  if(csvText.trim().startsWith('<')){ throw new Error('no-access'); }
  const rows = parseCsv(csvText);
  return rowsToRecords(rows, 'sheet');
}
function sheetErrorHtml(err){
  if(LANG==='en'){
    return `<div class="error-box">
      Couldn't connect to the sheet. For syncing to work, open the Google Sheet once ⟶
      <b>Share</b> ⟶ <b>General access</b> ⟶ change it to <b>"Anyone with the link"</b> with <b>Viewer</b> permission.
      After that, Sync now will work. (Error: ${escapeHtml(err.message)})
    </div>`;
  }
  return `<div class="error-box">
    לא הצלחתי להתחבר לגיליון. כדי שהסנכרון יעבוד, צריך פעם אחת לפתוח את הגיליון בגוגל שיטס ⟶
    <b>שיתוף</b> ⟶ <b>גישה כללית</b> ⟶ לשנות ל<b>"כל מי שיש לו את הקישור"</b> בהרשאת <b>Viewer</b>.
    אחרי זה סנכרון עכשיו יעבוד. (שגיאה: ${escapeHtml(err.message)})
  </div>`;
}
async function syncFromSheet(){
  const statusEl = document.getElementById('syncStatus');
  const resultEl = document.getElementById('syncResult');
  const sheetId = setSheetId(document.getElementById('sheetIdInput').value || CURRENT_SHEET_ID);
  if(!sheetId){
    statusEl.textContent = '';
    resultEl.innerHTML = `<div class="error-box">${escapeHtml(t('add.syncNoSheetId'))}</div>`;
    return;
  }
  statusEl.textContent = LANG==='en' ? 'Syncing…' : 'מסנכרן…';
  resultEl.innerHTML = '';
  try{
    const newRecords = await fetchSheetAsRecords(sheetId);
    applyNewRecords(newRecords);
    statusEl.textContent = lastSyncLabel();
    resultEl.innerHTML = `<div class="success-box">${LANG==='en' ? `Synced successfully ✅ ${newRecords.length} records pulled from the sheet and tagged.` : `סונכרן בהצלחה ✅ ${newRecords.length} תקליטים נמשכו מהגיליון ותויגו.`}</div>`;
    renderSheetSyncUndoAffordance();
  }catch(err){
    statusEl.textContent = '';
    resultEl.innerHTML = sheetErrorHtml(err);
  }
}
async function onboardSync(){
  const statusEl = document.getElementById('obSyncStatus');
  const resultEl = document.getElementById('obSyncResult');
  const sheetId = setSheetId(document.getElementById('obSheetIdInput').value);
  statusEl.textContent = LANG==='en' ? 'Syncing…' : 'מסנכרן…';
  resultEl.innerHTML = '';
  try{
    const newRecords = await fetchSheetAsRecords(sheetId);
    applyNewRecords(newRecords);
    resultEl.innerHTML = `<div class="success-box">${LANG==='en' ? `Synced successfully ✅ ${newRecords.length} records ✔` : `סונכרן בהצלחה ✅ ${newRecords.length} תקליטים ✔`}</div>`;
    setTimeout(finishOnboarding, 600);
  }catch(err){
    statusEl.textContent = '';
    resultEl.innerHTML = sheetErrorHtml(err);
  }
}
function readUploadedFile(file){
  return new Promise((resolve, reject)=>{
    const isCsv = /\.csv$/i.test(file.name);
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('read-failed'));
    reader.onload = () => {
      try{
        if(isCsv){
          resolve(parseCsv(String(reader.result)));
        } else {
          const data = new Uint8Array(reader.result);
          const wb = XLSX.read(data, {type:'array'});
          const sheet = wb.Sheets[wb.SheetNames[0]];
          resolve(XLSX.utils.sheet_to_json(sheet, {header:1, defval:''}));
        }
      }catch(e){ reject(e); }
    };
    if(isCsv) reader.readAsText(file, 'utf-8'); else reader.readAsArrayBuffer(file);
  });
}
async function handleExcelUpload(event){
  const file = event.target.files[0];
  if(!file) return;
  const statusEl = document.getElementById('uploadStatus');
  const resultEl = document.getElementById('uploadResult');
  const confirmMsg = LANG==='en'
    ? `Uploading a file will replace the whole current collection in this app with "${file.name}". Continue?`
    : `העלאת קובץ תחליף את כל האוסף הנוכחי באפליקציה הזו ב-"${file.name}". להמשיך?`;
  if(!confirm(confirmMsg)){ event.target.value=''; return; }
  statusEl.textContent = LANG==='en' ? 'Loading and tagging…' : 'טוען וקורא תגיות…';
  resultEl.innerHTML = '';
  try{
    const rows = await readUploadedFile(file);
    const newRecords = rowsToRecords(rows, 'upload');
    applyNewRecords(newRecords);
    statusEl.textContent = lastSyncLabel();
    resultEl.innerHTML = `<div class="success-box">${LANG==='en' ? `Loaded successfully ✅ ${newRecords.length} records auto-tagged.` : `נטען בהצלחה ✅ ${newRecords.length} תקליטים תויגו אוטומטית.`}</div>`;
    renderSheetSyncUndoAffordance();
  }catch(err){
    statusEl.textContent = '';
    resultEl.innerHTML = `<div class="error-box">${LANG==='en' ? `Couldn't read the file. It needs columns named Artist/Album (you can download the sample template and fill it in). (Error: ${escapeHtml(err.message)})` : `לא הצלחתי לקרוא את הקובץ. חשוב שיהיו בו עמודות בשמות אמן/אלבום (אפשר להוריד את התבנית לדוגמה ולמלא אותה). (שגיאה: ${escapeHtml(err.message)})`}</div>`;
  }
  event.target.value = '';
}
async function onboardHandleFile(event){
  const file = event.target.files[0];
  if(!file) return;
  const statusEl = document.getElementById('obUploadStatus');
  const resultEl = document.getElementById('obUploadResult');
  statusEl.textContent = LANG==='en' ? 'Loading and tagging…' : 'טוען וקורא תגיות…';
  resultEl.innerHTML = '';
  try{
    const rows = await readUploadedFile(file);
    const newRecords = rowsToRecords(rows, 'upload');
    applyNewRecords(newRecords);
    resultEl.innerHTML = `<div class="success-box">${LANG==='en' ? `Loaded successfully ✅ ${newRecords.length} records ✔` : `נטען בהצלחה ✅ ${newRecords.length} תקליטים ✔`}</div>`;
    setTimeout(finishOnboarding, 600);
  }catch(err){
    statusEl.textContent = '';
    resultEl.innerHTML = `<div class="error-box">${LANG==='en' ? `Couldn't read the file. It needs columns named Artist/Album (you can download the sample template and fill it in). (Error: ${escapeHtml(err.message)})` : `לא הצלחתי לקרוא את הקובץ. חשוב שיהיו בו עמודות בשמות אמן/אלבום (אפשר להוריד את התבנית לדוגמה ולמלא אותה). (שגיאה: ${escapeHtml(err.message)})`}</div>`;
  }
  event.target.value = '';
}
function parseCsv(text){
  // minimal RFC4180 CSV parser (handles quoted fields with commas/newlines/escaped quotes)
  const rows = []; let row = []; let field = ''; let inQ = false;
  for(let i=0;i<text.length;i++){
    const c = text[i];
    if(inQ){
      if(c === '"'){ if(text[i+1] === '"'){ field+='"'; i++; } else { inQ=false; } }
      else field += c;
    } else {
      if(c === '"') inQ = true;
      else if(c === ','){ row.push(field); field=''; }
      else if(c === '\n'){ row.push(field); rows.push(row); row=[]; field=''; }
      else if(c === '\r'){ /* skip */ }
      else field += c;
    }
  }
  if(field.length || row.length){ row.push(field); rows.push(row); }
  return rows.filter(r => r.length && r.some(f=>f.trim().length));
}

/* ---------------- RANDOM PICKER ---------------- */
// Guards the entry points below against a genuinely empty collection (a brand new install with
// nothing imported yet) - without this, picking "random"/"quiz" on zero records throws, since
// eligibleRecords() has no records to fall back to.
function requireAnyRecords(){
  if(RECORDS.length) return true;
  alert(t('home.noRecordsYet'));
  return false;
}
function pickRandom(){
  if(!requireAnyRecords()) return;
  RESULT_SOURCE = 'random';
  const eligible = eligibleRecords();
  const r = eligible[Math.floor(Math.random()*eligible.length)];
  renderResultCard(r);
  showScreen('result');
}
function anotherPick(){
  if(currentQuizPool && currentQuizPool.length){
    RESULT_SOURCE = 'quiz';
    updateResultHeaderIcon();
    const r = currentQuizPool[Math.floor(Math.random()*currentQuizPool.length)];
    renderResultCard(r);
  } else {
    pickRandom();
  }
}
let currentResultRecord = null;
let currentResultKicker = '';
function renderResultCard(r, kicker){
  currentResultRecord = r;
  currentResultKicker = kicker || t('result.kicker');
  resultAlreadySpunThisPick = false;
  updateResultHeaderIcon();
  const el = document.getElementById('resultCard');
  const moodTags = (r.tags||[]).map(tg=>`<span class="tag">${escapeHtml(trTag(tg))}</span>`).join('');
  const genreTags = (r.genres||[r.genre]).map(g=>`<span class="tag genre">${escapeHtml(trTag(g))}</span>`).join('');
  const actBadge = r.act && r.act !== '-' ? `<span class="tag muted">${escapeHtml(trTag(r.act))}${r.gender && r.gender!=='-' ? ' · '+escapeHtml(trTag(r.gender)) : ''}</span>` : '';
  const popBadge = r.popularity ? `<span class="tag muted">${escapeHtml(trTag(r.popularity))}</span>` : '';
  el.innerHTML = `
    <div class="ic" id="resultIcon" onclick="openCoverLightbox('${r.id}')">💿</div>
    <div class="artist">${escapeHtml(currentResultKicker)}</div>
    <div class="album">${escapeHtml(r.album)}</div>
    <div style="font-size:16px;color:var(--muted)">${escapeHtml(r.artist)}</div>
    <div class="meta-tags">${genreTags}</div>
    <div class="meta-tags">${moodTags}${actBadge}${popBadge}</div>
    <div class="meta-line">${r.year||'—'} · ${r.format?r.format+'"':''} · ${escapeHtml(trTag(r.language)||'')}</div>
    ${pressingLabel(r) ? `<div class="meta-line">${escapeHtml(pressingLabel(r))}</div>` : ''}
    <div id="resultRatingBox"></div>
    <div class="icon-row" style="margin-top:12px">
      <button class="icon-btn" onclick="logSpinFull('result')" title="Full spin">💿</button>
      <button class="icon-btn" onclick="togglePartialPicker('result')" title="Partial spin">◐</button>
      <button class="icon-btn" id="resultFavoriteBtn" onclick="toggleFavoriteById('${r.id}','result')" title="Favorite">☆</button>
    </div>
    <div class="partial-picker hidden" id="partialPicker_result">
      <div class="hint">${escapeHtml(t('spin.howManySides'))}</div>
      <div class="side-picker" id="sidePicker_result"></div>
    </div>
    <div style="text-align:center;margin-top:6px;">
      <span class="custom-time-toggle" onclick="toggleCustomTimePicker('result')">${escapeHtml(t('spin.logAtAnotherTime'))}</span>
    </div>
    <div class="custom-time-picker hidden" id="customTimePicker_result">
      <input type="datetime-local" class="custom-time-input" id="customTimeInput_result">
      <div class="icon-row" style="margin-top:8px;">
        <button class="icon-btn" onclick="confirmCustomTimeFull('result')" title="Full spin">💿</button>
        <button class="icon-btn" onclick="confirmCustomTimePartialOpen('result')" title="Partial spin">◐</button>
      </div>
      <div class="partial-picker hidden" id="partialPickerCustom_result">
        <div class="hint">${escapeHtml(t('spin.howManySides'))}</div>
        <div class="side-picker" id="sidePickerCustom_result"></div>
      </div>
    </div>
    <div class="spin-info" id="spinInfoLine"></div>
  `;
  renderResultRatings();
  renderResultFavoriteBtn();
  updateSpinInfoLine();
  loadCoverArtFor(r);
}
function renderResultFavoriteBtn(){
  const btn = document.getElementById('resultFavoriteBtn');
  if(!btn || !currentResultRecord) return;
  const fav = isFavorite(currentResultRecord);
  btn.textContent = fav ? '⭐' : '☆';
  btn.classList.toggle('active', fav);
}
const ALBUM_ART_CACHE = new Map();
const COVER_OVERRIDE_KEY = "whats_spinning_cover_override_v1";
let COVER_OVERRIDE = {};
function loadCoverOverride(){ try{ const raw = localStorage.getItem(COVER_OVERRIDE_KEY); if(raw) COVER_OVERRIDE = JSON.parse(raw); }catch(e){} }
function saveCoverOverride(){ try{ localStorage.setItem(COVER_OVERRIDE_KEY, JSON.stringify(COVER_OVERRIDE)); }catch(e){} }
loadCoverOverride();
function getCoverOverride(r){ return COVER_OVERRIDE[recKey(r)] || null; }
function setCoverOverride(r, url){ COVER_OVERRIDE[recKey(r)] = url; saveCoverOverride(); }
function clearCoverOverride(r){ delete COVER_OVERRIDE[recKey(r)]; saveCoverOverride(); }

async function fetchAlbumArtOptions(artist, album, limit=5){
  const key = (artist+'|||'+album).toLowerCase()+'|||opts'+limit;
  if(ALBUM_ART_CACHE.has(key)) return ALBUM_ART_CACHE.get(key);
  try{
    const q = encodeURIComponent(`${artist} ${album}`);
    const ctrl = new AbortController();
    const timeout = setTimeout(()=>ctrl.abort(), 6000);
    const res = await fetch(`https://itunes.apple.com/search?term=${q}&entity=album&limit=${limit}`, {signal: ctrl.signal});
    clearTimeout(timeout);
    if(!res.ok) throw new Error('http-'+res.status);
    const data = await res.json();
    const urls = (data.results||[]).map(x=>x.artworkUrl100 ? x.artworkUrl100.replace('100x100','600x600') : null).filter(Boolean);
    ALBUM_ART_CACHE.set(key, urls);
    return urls;
  }catch(e){
    ALBUM_ART_CACHE.set(key, []);
    return [];
  }
}
async function fetchAlbumArt(artist, album){
  const opts = await fetchAlbumArtOptions(artist, album, 1);
  return opts.length ? opts[0] : null;
}
/* unified cover source: the same MusicBrainz release-group used for description/genre/tracklist is
   tried first (via the Cover Art Archive), so the image always matches the rest of the record's info;
   iTunes is only a silent fallback when that release-group has no cover art uploaded. */
async function fetchAlbumArtUnified(artist, album){
  const cacheKey = (artist+'|||'+album).toLowerCase()+'|||opts1';
  if(ALBUM_ART_CACHE.has(cacheKey)){
    const cached = ALBUM_ART_CACHE.get(cacheKey);
    if(cached && cached.length) return cached[0];
  }
  const rgInfo = await mbGetReleaseGroupInfo(artist, album);
  const url = (rgInfo && await fetchCoverFromCoverArtArchive(rgInfo.id)) || await fetchAlbumArt(artist, album);
  if(url) ALBUM_ART_CACHE.set(cacheKey, [url]);
  return url || null;
}
function setCoverIcon(url, altText){
  const iconEl = document.getElementById('resultIcon');
  if(!iconEl) return;
  const img = new Image();
  img.onload = () => { iconEl.outerHTML = `<img class="cover-art" id="resultIcon" src="${url}" alt="${escapeHtml(altText)}" onclick="openCoverLightbox('${currentResultRecord.id}')">`; };
  img.onerror = () => {};
  img.src = url;
}
async function loadCoverArtFor(r){
  const override = getCoverOverride(r);
  if(override){
    if(currentResultRecord && currentResultRecord.id === r.id) setCoverIcon(override, r.album);
    return;
  }
  // Priority: manual override (above) > Discogs' own cover image for your copy > MusicBrainz/iTunes fallback.
  const discogsUrl = discogsCoverImageFor(r);
  const url = discogsUrl || await fetchAlbumArtUnified(r.artist, r.album);
  if(!url) return;
  // only swap if this is still the record currently shown (guards against fast "another pick" clicks)
  if(!currentResultRecord || currentResultRecord.id !== r.id) return;
  setCoverIcon(url, r.album);
}
function setDetailCoverIcon(url, altText, recId){
  const iconEl = document.getElementById('detailCoverIcon');
  if(!iconEl) return;
  const img = new Image();
  img.onload = () => { iconEl.outerHTML = `<img class="ic" id="detailCoverIcon" src="${url}" alt="${escapeHtml(altText)}" onclick="openCoverLightbox('${recId}')">`; };
  img.onerror = () => {};
  img.src = url;
}
async function loadCoverArtForDetail(r){
  const override = getCoverOverride(r);
  if(override){ if(String(detailRecordId) === String(r.id)) setDetailCoverIcon(override, r.album, r.id); return; }
  const discogsUrl = discogsCoverImageFor(r);
  const url = discogsUrl || await fetchAlbumArtUnified(r.artist, r.album);
  if(!url) return;
  if(String(detailRecordId) !== String(r.id)) return;
  setDetailCoverIcon(url, r.album, r.id);
}
/* ---------------- TRACKLIST (iTunes lookup) ---------------- */
// v2: cache entries are now {names:[...], totalMs:number|null} instead of a plain name array,
// so we can also capture each track's real duration (used for automatic needle-wear calculation).
// Bumping the key means old v1 entries (names only) are simply treated as uncached and refetched.
const TRACKLIST_CACHE_KEY = "whats_spinning_tracklist_cache_v2";
let TRACKLIST_CACHE = {};
function loadTracklistCache(){ try{ const raw = localStorage.getItem(TRACKLIST_CACHE_KEY); if(raw) TRACKLIST_CACHE = JSON.parse(raw); }catch(e){} }
function saveTracklistCache(){ try{ localStorage.setItem(TRACKLIST_CACHE_KEY, JSON.stringify(TRACKLIST_CACHE)); }catch(e){} }
loadTracklistCache();
async function fetchTracklistFromItunes(artist, album){
  try{
    const q = encodeURIComponent(`${artist} ${album}`);
    const ctrl = new AbortController();
    const timeout = setTimeout(()=>ctrl.abort(), 6000);
    const res = await fetch(`https://itunes.apple.com/search?term=${q}&entity=album&limit=1`, {signal: ctrl.signal});
    clearTimeout(timeout);
    if(!res.ok) throw new Error('http-'+res.status);
    const data = await res.json();
    const collectionId = data.results && data.results[0] && data.results[0].collectionId;
    if(!collectionId) return null;
    const ctrl2 = new AbortController();
    const timeout2 = setTimeout(()=>ctrl2.abort(), 6000);
    const res2 = await fetch(`https://itunes.apple.com/lookup?id=${collectionId}&entity=song`, {signal: ctrl2.signal});
    clearTimeout(timeout2);
    if(!res2.ok) throw new Error('http-'+res2.status);
    const data2 = await res2.json();
    const items = (data2.results||[])
      .filter(x=>x.wrapperType==='track')
      .sort((a,b)=>(a.trackNumber||0)-(b.trackNumber||0));
    const names = items.map(x=>x.trackName).filter(Boolean);
    if(!names.length) return null;
    // Only trust the total duration if every track actually reported a time - a partial sum
    // would understate the album's real runtime and throw off the per-side estimate.
    const allHaveTime = items.length && items.every(x=>typeof x.trackTimeMillis==='number' && x.trackTimeMillis>0);
    const totalMs = allHaveTime ? items.reduce((s,x)=>s+x.trackTimeMillis,0) : null;
    return { names, totalMs };
  }catch(e){
    return null;
  }
}
/* unified tracklist source: try the same resolved MusicBrainz release-group used for the rest of the
   record's info first (so tracklist matches image/description/genre); iTunes lookup is a silent
   fallback for the (fairly common) case where MusicBrainz has no track data for that release. */
// Discogs' own release tracklist (from your matched copy) is tried first when we know its release
// id, since it reflects your actual pressing; MusicBrainz, then iTunes, are the fallbacks.
function parseDiscogsDuration(d){
  if(!d) return null;
  const parts = String(d).split(':').map(Number);
  if(!parts.length || parts.some(isNaN)) return null;
  if(parts.length===2) return (parts[0]*60+parts[1])*1000;
  if(parts.length===3) return ((parts[0]*60+parts[1])*60+parts[2])*1000;
  return null;
}
async function fetchTracklistFromDiscogs(releaseId){
  if(!releaseId || !DISCOGS_OAUTH_TOKEN) return null;
  try{
    const rel = await discogsGetRelease(releaseId);
    const tracks = (rel && rel.tracklist || []).filter(t => !t.type_ || t.type_ === 'track');
    const names = tracks.map(t=>t.title).filter(Boolean);
    if(!names.length) return null;
    const lengths = tracks.map(t=>parseDiscogsDuration(t.duration));
    const totalMs = (lengths.length && lengths.every(l=>l!=null)) ? lengths.reduce((s,l)=>s+l,0) : null;
    return { names, totalMs };
  }catch(e){ return null; }
}
async function fetchTracklist(artist, album, discogsReleaseId){
  const key = recKeyRaw(artist, album);
  if(Object.prototype.hasOwnProperty.call(TRACKLIST_CACHE, key)){
    const cached = TRACKLIST_CACHE[key];
    return cached ? cached.names : null;
  }
  let result = await fetchTracklistFromDiscogs(discogsReleaseId);
  if(!result || !result.names || !result.names.length){
    const rgInfo = await mbGetReleaseGroupInfo(artist, album);
    result = await fetchTracklistFromMb(rgInfo);
  }
  if(!result || !result.names || !result.names.length) result = await fetchTracklistFromItunes(artist, album);
  TRACKLIST_CACHE[key] = (result && result.names && result.names.length) ? result : null;
  saveTracklistCache();
  return TRACKLIST_CACHE[key] ? TRACKLIST_CACHE[key].names : null;
}
async function runWithConcurrency(items, limit, worker){
  let idx = 0, active = 0;
  return new Promise((resolve)=>{
    function next(){
      if(idx>=items.length && active===0){ resolve(); return; }
      while(active<limit && idx<items.length){
        const item = items[idx++]; active++;
        worker(item).catch(()=>{}).finally(()=>{ active--; next(); });
      }
    }
    next();
  });
}
async function resyncAllTracklists(){
  if(!confirm(t('add.resyncTracklistsConfirm'))) return;
  const statusEl = document.getElementById('resyncTracklistsStatus');
  TRACKLIST_CACHE = {};
  saveTracklistCache();
  let done = 0;
  const total = RECORDS.length;
  if(statusEl) statusEl.textContent = tf('add.resyncTracklistsProgress', done, total);
  await runWithConcurrency(RECORDS, 5, async (r)=>{
    await fetchTracklist(r.artist, r.album, discogsReleaseIdFor(r));
    done++;
    if(statusEl) statusEl.textContent = tf('add.resyncTracklistsProgress', done, total);
  });
  if(statusEl) statusEl.textContent = tf('add.resyncTracklistsDone', total);
  const r = findRecordById(detailRecordId);
  if(r) loadTracklistForDetail(r);
}
async function loadTracklistForDetail(r){
  const el = document.getElementById('detailTracklist');
  if(!el) return;
  const cacheKey = recKey(r);
  if(Object.prototype.hasOwnProperty.call(TRACKLIST_CACHE, cacheKey)){
    const cached = TRACKLIST_CACHE[cacheKey];
    renderTracklistBox(el, cached ? cached.names : null);
    return;
  }
  el.className = 'tracklist loading';
  el.textContent = t('detail.tracklistLoading');
  const tracks = await fetchTracklist(r.artist, r.album, discogsReleaseIdFor(r));
  if(String(detailRecordId) !== String(r.id)) return;
  renderTracklistBox(el, tracks);
}
function renderTracklistBox(el, tracks){
  if(!tracks || !tracks.length){
    el.className = 'tracklist empty';
    el.textContent = t('detail.tracklistEmpty');
    return;
  }
  el.className = 'tracklist';
  el.innerHTML = tracks.map((name,i)=>`<div class="tracklist-item"><div class="tracklist-num">${i+1}</div><div class="tracklist-name">${escapeHtml(name)}</div></div>`).join('');
}
/* ---------------- MUSICBRAINZ INFO (album detail page: cover art, tracklist, genre, description) ----------------
   Replaces the previous Wikipedia-based scraping entirely. MusicBrainz has no prose album bios, so the
   "about" text below is composed from real structured facts (artist, original year, genre, country,
   pressing label...) rather than copied text from anywhere - it's never presented as someone else's writing. */
const MB_RG_CACHE_KEY = "whats_spinning_mb_rg_cache_v1";
let MB_RG_CACHE = {}; // recKey -> {id, title, firstReleaseDate, genres:[], country, primaryReleaseId} | null
function loadMbRgCache(){ try{ const raw = localStorage.getItem(MB_RG_CACHE_KEY); if(raw) MB_RG_CACHE = JSON.parse(raw); }catch(e){} }
function saveMbRgCache(){ try{ localStorage.setItem(MB_RG_CACHE_KEY, JSON.stringify(MB_RG_CACHE)); }catch(e){} }
loadMbRgCache();
const DESCRIPTION_CACHE_KEY = "whats_spinning_description_cache_v1";
let DESCRIPTION_CACHE = {};
function loadDescriptionCache(){ try{ const raw = localStorage.getItem(DESCRIPTION_CACHE_KEY); if(raw) DESCRIPTION_CACHE = JSON.parse(raw); }catch(e){} }
function saveDescriptionCache(){ try{ localStorage.setItem(DESCRIPTION_CACHE_KEY, JSON.stringify(DESCRIPTION_CACHE)); }catch(e){} }
loadDescriptionCache();
/* manual per-record MusicBrainz source override: user-pasted release-group link/MBID always wins over auto search */
const MB_TITLE_OVERRIDE_KEY = "whats_spinning_mb_title_override_v1";
let MB_TITLE_OVERRIDE = {};
function loadMbTitleOverride(){ try{ const raw = localStorage.getItem(MB_TITLE_OVERRIDE_KEY); if(raw) MB_TITLE_OVERRIDE = JSON.parse(raw); }catch(e){} }
function saveMbTitleOverride(){ try{ localStorage.setItem(MB_TITLE_OVERRIDE_KEY, JSON.stringify(MB_TITLE_OVERRIDE)); }catch(e){} }
loadMbTitleOverride();
function parseMbUrlInput(input){
  const s = String(input||'').trim();
  const m = s.match(/musicbrainz\.org\/release-group\/([0-9a-f-]{36})/i);
  if(m) return m[1];
  return s;
}
function clearDerivedInfoCachesFor(r){
  const key = recKey(r);
  delete MB_RG_CACHE[key]; delete DESCRIPTION_CACHE[key]; delete TRACKLIST_CACHE[key];
  saveMbRgCache(); saveDescriptionCache(); saveTracklistCache();
  const prefix = (r.artist+'|||'+r.album).toLowerCase()+'|||opts';
  Array.from(ALBUM_ART_CACHE.keys()).forEach(k=>{ if(k.startsWith(prefix)) ALBUM_ART_CACHE.delete(k); });
}
function fixInfoSource(){
  const r = findRecordById(detailRecordId);
  if(!r) return;
  const key = recKey(r);
  const current = MB_TITLE_OVERRIDE[key] || '';
  const msg = LANG==='en'
    ? "Paste a MusicBrainz release-group link (or ID) to use as the source for this record's image, tracklist, description and genres. Leave empty to go back to automatic matching:"
    : "הדבק/י קישור ל-release-group ב-MusicBrainz (או מזהה MBID) שישמש כמקור לתמונה, לרשימת השירים, לתיאור ולז'אנרים של התקליט הזה. אפשר להשאיר ריק כדי לחזור להתאמה האוטומטית:";
  const input = prompt(msg, current);
  if(input === null) return;
  const trimmed = input.trim();
  if(!trimmed) delete MB_TITLE_OVERRIDE[key];
  else MB_TITLE_OVERRIDE[key] = parseMbUrlInput(trimmed);
  saveMbTitleOverride();
  clearDerivedInfoCachesFor(r);
  if(String(detailRecordId) === String(r.id)) renderDetailScreen(r.id);
}
async function mbGetReleaseGroupInfo(artist, album){
  const key = recKeyRaw(artist, album);
  if(MB_RG_CACHE[key] !== undefined) return MB_RG_CACHE[key];
  let info = null;
  try{
    let rgId = MB_TITLE_OVERRIDE[key] || null;
    let title = album, firstReleaseDate = null;
    if(!rgId){
      const m = await mbSearchReleaseGroup({ artist, album, year: null });
      if(m){ rgId = m.item.id; title = m.item.title; firstReleaseDate = m.item['first-release-date'] || null; }
    }
    if(rgId){
      await mbThrottle();
      const res = await fetch(`https://musicbrainz.org/ws/2/release-group/${rgId}?inc=genres+releases&fmt=json`, { headers: {'Accept':'application/json'} });
      if(res.ok){
        const data = await res.json();
        const genres = (data.genres||[]).slice().sort((a,b)=>(b.count||0)-(a.count||0)).map(g=>capitalizeWords(g.name));
        const releases = data.releases || [];
        const primary = releases.find(rl=>rl.status==='Official') || releases[0] || null;
        info = {
          id: rgId,
          title: data.title || title,
          firstReleaseDate: data['first-release-date'] || firstReleaseDate,
          genres,
          country: primary ? (primary.country || null) : null,
          primaryReleaseId: primary ? primary.id : null,
        };
      }
    }
  }catch(e){}
  MB_RG_CACHE[key] = info;
  saveMbRgCache();
  return info;
}
/* Cover Art Archive is keyed by MusicBrainz MBID; it 404s when nothing's been uploaded for that
   release-group, so we verify the image actually loads before handing back a URL. */
async function fetchCoverFromCoverArtArchive(rgId){
  if(!rgId) return null;
  const url = `https://coverartarchive.org/release-group/${rgId}/front-500`;
  return new Promise(resolve=>{
    const img = new Image();
    const timer = setTimeout(()=>resolve(null), 6000);
    img.onload = () => { clearTimeout(timer); resolve(url); };
    img.onerror = () => { clearTimeout(timer); resolve(null); };
    img.src = url;
  });
}
async function fetchTracklistFromMb(rgInfo){
  if(!rgInfo || !rgInfo.primaryReleaseId) return null;
  try{
    await mbThrottle();
    const res = await fetch(`https://musicbrainz.org/ws/2/release/${rgInfo.primaryReleaseId}?inc=recordings&fmt=json`, { headers: {'Accept':'application/json'} });
    if(!res.ok) return null;
    const data = await res.json();
    const names = [];
    const lengths = [];
    (data.media||[]).forEach(medium=>{
      (medium.tracks||[]).forEach(tr=>{
        if(!tr.title) return;
        names.push(tr.title);
        const len = tr.length || (tr.recording && tr.recording.length) || null;
        lengths.push(typeof len==='number' && len>0 ? len : null);
      });
    });
    if(!names.length) return null;
    // Only trust the total if EVERY track reported a length - otherwise a partial sum would
    // understate the album's real runtime and skew the per-side needle-wear estimate.
    const totalMs = lengths.every(l=>l!=null) ? lengths.reduce((s,l)=>s+l,0) : null;
    return { names, totalMs };
  }catch(e){ return null; }
}
/* ---------------- GENRE NUANCE (MusicBrainz release-group genres, for records without curated genre data) ---------------- */
function hasCuratedGenre(r){
  const keyA = (r.artist||'').toLowerCase();
  const keyAlb = keyA + '|||' + (r.album||'').toLowerCase();
  try{
    return !!(GENRES[keyA] || (typeof ALBUM_OVERRIDES!=='undefined' && ALBUM_OVERRIDES[keyAlb]) || ARTIST_PROFILES[keyA]);
  }catch(e){ return true; } // if lookup tables aren't available for some reason, don't touch genres
}
async function enrichGenreIfGeneric(r){
  const hasOverride = !!MB_TITLE_OVERRIDE[recKey(r)];
  if(hasCuratedGenre(r) && !hasOverride) return;
  const rgInfo = await mbGetReleaseGroupInfo(r.artist, r.album);
  if(!rgInfo || !rgInfo.genres || !rgInfo.genres.length) return;
  r.genres = rgInfo.genres;
  r.genre = rgInfo.genres[0];
  // reflect in the detail screen if it's still showing this record
  if(String(detailRecordId) === String(r.id)){
    const el = document.getElementById('detailGenreTags');
    if(el) el.innerHTML = rgInfo.genres.map(g=>`<span class="tag genre">${escapeHtml(trTag(g))}</span>`).join('');
  }
  // reflect in the browse list if it's currently rendered
  const screenBrowse = document.getElementById('screen-browse');
  if(screenBrowse && screenBrowse.classList.contains('active')) renderBrowseList();
}
/* ---------------- ALBUM DESCRIPTION (composed from real facts - MusicBrainz has no prose bios) ---------------- */
const TYPE_DISPLAY_EN = {
  'אלבום סטודיו':'studio album', 'אוסף':'compilation', 'פסקול':'soundtrack album', 'לייב':'live album',
  'מיני אלבום':'EP', 'מיקסטייפ':'mixtape', 'סינגל':'single', 'אלבום חג':'holiday album',
};
function typeDisplayEn(type){ return TYPE_DISPLAY_EN[type] || 'album'; }
const MB_COUNTRY_NAMES_HE = {
  US:'ארה"ב', GB:'בריטניה', UK:'בריטניה', FR:'צרפת', DE:'גרמניה', SE:'שוודיה', IL:'ישראל', CA:'קנדה',
  AU:'אוסטרליה', JP:'יפן', IT:'איטליה', ES:'ספרד', NL:'הולנד', XW:'עולמי', XE:'אירופה',
};
function countryDisplay(code){
  if(!code) return null;
  if(LANG==='en') return code;
  return MB_COUNTRY_NAMES_HE[code] || code;
}
// deterministic per-record "random" pick, so the phrasing variant stays stable across re-renders/caching
function pickTemplateVariant(key, n){
  let hash = 0;
  for(let i=0;i<key.length;i++){ hash = (hash*31 + key.charCodeAt(i)) & 0xffffffff; }
  return Math.abs(hash) % n;
}
const HE_DESCRIPTION_OPENERS = [
  (album,genreText,artist)=> genreText ? `${album} הוא אלבום ${genreText} של ${artist}` : `${album} הוא אלבום של ${artist}`,
  (album,genreText,artist)=> `${artist} הוציא/ה את ${album}${genreText ? ', אלבום ' + genreText : ''}`,
  (album,genreText,artist)=> genreText ? `${album} - אלבום ${genreText} מאת ${artist}` : `${album} מאת ${artist}`,
];
const EN_DESCRIPTION_OPENERS = [
  (album,genreText,artist,typeDisp)=> `${album} is a${/^[aeiou]/i.test(genreText||typeDisp)?'n':''} ${genreText ? genreText+' ' : ''}${typeDisp} by ${artist}`,
  (album,genreText,artist,typeDisp)=> `${artist} released ${album}${genreText ? `, a ${genreText} ${typeDisp}` : ''}`,
  (album,genreText,artist,typeDisp)=> `${album} - ${genreText ? genreText+' ' : ''}${typeDisp} from ${artist}`,
];
function composeAlbumDescription(r, rgInfo, trackCount){
  const e = r._enrich;
  const origYear = (e && e.original_year) || (rgInfo && rgInfo.firstReleaseDate && rgInfo.firstReleaseDate.slice(0,4)) || r.year || null;
  const genres = (r.genres && r.genres.length) ? r.genres : (rgInfo && rgInfo.genres) || [];
  const genreText = genres.length ? genres.slice(0,2).map(g=>trTag(g)).join('/') : null;
  const country = rgInfo && countryDisplay(rgInfo.country);
  const label = e && e.label;
  const pressingYear = e && e.pressing_year;
  const key = recKey(r);

  if(LANG==='en'){
    const typeDisp = typeDisplayEn(r.type);
    const opener = EN_DESCRIPTION_OPENERS[pickTemplateVariant(key, EN_DESCRIPTION_OPENERS.length)](r.album, genreText, r.artist, typeDisp);
    const bits = [ opener + (origYear ? `, originally released in ${origYear}.` : '.') ];
    if(trackCount) bits.push(`This edition has ${trackCount} track${trackCount===1?'':'s'}.`);
    if(label) bits.push(`Your copy was pressed by ${label}${pressingYear && String(pressingYear)!==String(origYear) ? ' in '+pressingYear : ''}.`);
    else if(country) bits.push(`Released in ${country}.`);
    return bits.join(' ');
  }
  const opener = HE_DESCRIPTION_OPENERS[pickTemplateVariant(key, HE_DESCRIPTION_OPENERS.length)](r.album, genreText, r.artist);
  const bits = [ opener + (origYear ? `, שראה אור לראשונה ב-${origYear}.` : '.') ];
  if(trackCount) bits.push(`במהדורה הזו יש ${trackCount} רצועות.`);
  if(label) bits.push(`ההוצאה שברשותך היא של ${label}${pressingYear && String(pressingYear)!==String(origYear) ? ' מ-'+pressingYear : ''}.`);
  else if(country) bits.push(`יצא/ה לאור ב${country}.`);
  return bits.join(' ');
}
/* ---------------- ALBUM DETAIL / LANDING PAGE ---------------- */
let detailRecordId = null;
function openRecordDetail(id){
  detailRecordId = id;
  showScreen('detail');
  renderDetailScreen(id);
}
function renderDetailScreen(id){
  const r = findRecordById(id);
  const card = document.getElementById('detailCard');
  if(!card) return;
  if(!r){ card.innerHTML = ''; return; }
  detailRecordId = id;
  const pressing = pressingLabel(r);
  const links = platformSearchUrls(r);
  card.innerHTML = `
    <div class="detail-cover-wrap"><div class="ic" id="detailCoverIcon" onclick="openCoverLightbox('${r.id}')">💿</div></div>
    <div style="text-align:center;">
      <div class="album" style="margin:6px 0 2px;">${escapeHtml(r.album)}</div>
      <div class="artist" style="font-size:15px;">${escapeHtml(r.artist)}</div>
      <div class="meta-line">${r.year||'—'} · ${r.format?r.format+'"':''} · ${escapeHtml(trTag(r.language)||'')}</div>
      ${pressing ? `<div class="meta-line">${escapeHtml(pressing)}</div>` : ''}
      <div class="meta-line" id="detailEnrichLine"></div>
      <div class="meta-line" id="detailEnrichFlags" style="color:var(--gold);"></div>
    </div>
    <div class="meta-tags" style="margin-top:10px;" id="detailGenreTags">${(r.genres||[r.genre]).map(g=>`<span class="tag genre">${escapeHtml(trTag(g))}</span>`).join('')}</div>
    <div class="icon-row">
      <button class="icon-btn" id="detailFavBtn" onclick="toggleFavoriteById('${r.id}','detail')" title="Favorite">☆</button>
      <button class="icon-btn" id="detailExcludeBtn" onclick="confirmToggleExcludeById('${r.id}','detail')" title="${escapeHtml(t('modal.neverRecommendTitle'))}">🚫</button>
      <a class="icon-btn" href="${links.spotify}" target="_blank" rel="noopener" title="Spotify">${SPOTIFY_LOGO_SVG}</a>
      <a class="icon-btn" href="${links.apple}" target="_blank" rel="noopener" title="Apple Music">${APPLE_MUSIC_LOGO_SVG}</a>
    </div>
    <div id="detailRatingBox" style="margin-top:14px;"></div>
    <div class="hint" style="margin-top:14px;text-align:center;" data-i18n="spin.logPrompt">תיעוד סיבוב:</div>
    <div class="icon-row">
      <button class="icon-btn" onclick="logSpinFull('detail')" title="Full spin">💿</button>
      <button class="icon-btn" onclick="togglePartialPicker('detail')" title="Partial spin">◐</button>
    </div>
    <div class="partial-picker hidden" id="partialPicker_detail">
      <div class="hint" data-i18n="spin.howManySides">כמה צדדים ניגנת?</div>
      <div class="side-picker" id="sidePicker_detail"></div>
    </div>
    <div style="text-align:center;margin-top:6px;">
      <span class="custom-time-toggle" onclick="toggleCustomTimePicker('detail')">${escapeHtml(t('spin.logAtAnotherTime'))}</span>
    </div>
    <div class="custom-time-picker hidden" id="customTimePicker_detail">
      <input type="datetime-local" class="custom-time-input" id="customTimeInput_detail">
      <div class="icon-row" style="margin-top:8px;">
        <button class="icon-btn" onclick="confirmCustomTimeFull('detail')" title="Full spin">💿</button>
        <button class="icon-btn" onclick="confirmCustomTimePartialOpen('detail')" title="Partial spin">◐</button>
      </div>
      <div class="partial-picker hidden" id="partialPickerCustom_detail">
        <div class="hint">${escapeHtml(t('spin.howManySides'))}</div>
        <div class="side-picker" id="sidePickerCustom_detail"></div>
      </div>
    </div>
    <div class="spin-info" id="detailSpinInfoLine"></div>
    <div class="qtext" style="font-size:14px;margin:16px 0 2px;">${escapeHtml(t('detail.tracklist'))}</div>
    <div class="tracklist loading" id="detailTracklist">${escapeHtml(t('detail.tracklistLoading'))}</div>
    <div style="text-align:center;margin-top:8px;">
      <span class="wiki-fix-link" onclick="fixInfoSource()">${escapeHtml(MB_TITLE_OVERRIDE[recKey(r)] ? t('detail.wikiSourceEdit') : t('detail.wikiSourceFix'))}</span>
    </div>
  `;
  renderDetailFavBtn(r);
  renderDetailRatings(r);
  updateDetailSpinInfoLine();
  renderDetailExcludeState(r);
  loadCoverArtForDetail(r);
  loadTracklistForDetail(r);
  enrichGenreIfGeneric(r);
  renderDetailEnrichLine(r);
}
// Shows Discogs/MusicBrainz-sourced info (original release year, label/catalog, source) on the
// detail screen when available. Purely additive - never overwrites the Excel-sourced fields above.
function renderDetailEnrichLine(r){
  const el = document.getElementById('detailEnrichLine');
  const flagsEl = document.getElementById('detailEnrichFlags');
  if(!el) return;
  const e = r && r._enrich;
  if(!e){ el.textContent = ''; if(flagsEl) flagsEl.textContent = ''; return; }
  const parts = [];
  if(e.original_year) parts.push(tf('detail.enrichOriginalYear', e.original_year));
  if(e.label) parts.push(tf('detail.enrichLabelCat', e.label, e.catalog_no));
  const sourceKey = e.source === 'discogs_collection' ? 'detail.enrichSourceDiscogsCollection'
    : e.source === 'discogs_db' ? 'detail.enrichSourceDiscogsDb'
    : 'detail.enrichSourceMusicbrainz';
  parts.push(tf('detail.enrichSource', t(sourceKey)));
  el.textContent = parts.join(' · ');

  // Best-effort discrepancy flags: possible album-title typo, or a color/edition Discogs suggests
  // that differs from what's in the sheet. Each one has a one-tap "accept" button to apply it.
  if(flagsEl){
    const rows = [];
    const acceptBtn = (field) => `<button class="btn ghost enrich-accept-btn" onclick="acceptDiscogsSuggestion('${r.id}','${field}')">${escapeHtml(t('detail.enrichAcceptBtn'))}</button>`;
    if(e.matched_title && fieldSimilarity(r.album, e.matched_title) < 0.98){
      rows.push(`<div class="enrich-suggest-row"><span>${escapeHtml(tf('detail.enrichTitleMismatch', e.matched_title))}</span>${acceptBtn('title')}</div>`);
    }
    if(e.matched_color && normalizeForMatch(e.matched_color) !== normalizeForMatch(r.color||'')){
      rows.push(`<div class="enrich-suggest-row"><span>${escapeHtml(tf('detail.enrichColorSuggest', e.matched_color))}</span>${acceptBtn('color')}</div>`);
    }
    if(e.matched_edition && normalizeForMatch(e.matched_edition) !== normalizeForMatch(r.edition||'')){
      rows.push(`<div class="enrich-suggest-row"><span>${escapeHtml(tf('detail.enrichEditionSuggest', e.matched_edition))}</span>${acceptBtn('edition')}</div>`);
    }
    if(e.matched_lp_count && String(e.matched_lp_count).trim() !== String(r.lp_count||'').trim()){
      rows.push(`<div class="enrich-suggest-row"><span>${escapeHtml(tf('detail.enrichLpCountSuggest', e.matched_lp_count))}</span>${acceptBtn('lpCount')}</div>`);
    }
    flagsEl.innerHTML = rows.join('');
  }
}
// Applies a Discogs-suggested value (title/color/edition) onto the record in place. Title changes
// the record's key (artist|||album), so play history/ratings/favorites/enrichment are migrated to
// the new key via migrateRecordKey - the same mechanism used when merging duplicate records.
function acceptDiscogsSuggestion(id, field){
  const r = findRecordById(id);
  if(!r || !r._enrich) return;
  const e = r._enrich;
  if(field === 'title' && e.matched_title){
    const oldKey = recKey(r);
    r.album = e.matched_title;
    const newKey = recKey(r);
    migrateRecordKey(oldKey, newKey);
  } else if(field === 'color' && e.matched_color){
    r.color = e.matched_color;
  } else if(field === 'edition' && e.matched_edition){
    r.edition = e.matched_edition;
  } else if(field === 'lpCount' && e.matched_lp_count){
    r.lp_count = String(e.matched_lp_count).trim();
  } else {
    return;
  }
  const src = sourceOfRecord(r);
  if(src === 'discogs') saveDiscogsRecords(); else saveRecords();
  recombine();
  updateHeader();
  if(String(detailRecordId) === String(r.id)) renderDetailScreen(r.id);
  const screenBrowse = document.getElementById('screen-browse');
  if(screenBrowse && screenBrowse.classList.contains('active')) renderBrowseList('');
}
function updateSpinInfoLine(){
  const el = document.getElementById('spinInfoLine');
  if(!el || !currentResultRecord) return;
  el.textContent = spinInfoText(getPlayInfo(currentResultRecord));
}

/* ---------------- COVER LIGHTBOX (enlarge + platform links + alt covers) ---------------- */
let lightboxRecordId = null;
const SPOTIFY_LOGO_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" style="display:block;"><path fill="#1ED760" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`;
const APPLE_MUSIC_LOGO_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" style="display:block;"><path fill="#FA243C" d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 011.038-2.022c.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.24.274-.063.457-.23.51-.516a.904.904 0 00.02-.193c0-1.815 0-3.63-.002-5.443a.725.725 0 00-.026-.185c-.04-.15-.15-.243-.304-.234-.16.01-.318.035-.475.066-.76.15-1.52.303-2.28.456l-2.325.47-1.374.278c-.016.003-.032.01-.048.013-.277.077-.377.203-.39.49-.002.042 0 .086 0 .13-.002 2.602 0 5.204-.003 7.805 0 .42-.047.836-.215 1.227-.278.64-.77 1.04-1.434 1.233-.35.1-.71.16-1.075.172-.96.036-1.755-.6-1.92-1.544-.14-.812.23-1.685 1.154-2.075.357-.15.73-.232 1.108-.31.287-.06.575-.116.86-.177.383-.083.583-.323.6-.714v-.15c0-2.96 0-5.922.002-8.882 0-.123.013-.25.042-.37.07-.285.273-.448.546-.518.255-.066.515-.112.774-.165.733-.15 1.466-.296 2.2-.444l2.27-.46c.67-.134 1.34-.27 2.01-.403.22-.043.442-.088.663-.106.31-.025.523.17.554.482.008.073.012.148.012.223.002 1.91.002 3.822 0 5.732z"/></svg>`;
function platformSearchUrls(r){
  const q = encodeURIComponent(`${r.artist} ${r.album}`);
  return {
    spotify: `https://open.spotify.com/search/${q}`,
    apple: `https://music.apple.com/search?term=${q}`,
  };
}
async function openCoverLightbox(id){
  const r = findRecordById(id);
  if(!r) return;
  lightboxRecordId = id;
  const box = document.getElementById('lightboxContent');
  const links = platformSearchUrls(r);
  const currentUrl = getCoverOverride(r) || (document.querySelector('#resultIcon.cover-art') ? document.querySelector('#resultIcon.cover-art').src : null);
  box.innerHTML = `
    <button class="modal-close" onclick="closeCoverLightbox()" title="Close">✕</button>
    <div class="qtext" style="font-size:16px;text-align:center;">${escapeHtml(r.album)}</div>
    <div class="qsub" style="text-align:center;">${escapeHtml(r.artist)}</div>
    <div id="lightboxImgWrap" style="margin-top:10px;">${currentUrl
      ? `<img class="cover-lightbox-img" id="lightboxImg" src="${currentUrl}" alt="${escapeHtml(r.album)}">`
      : `<div class="cover-lightbox-emoji" id="lightboxImg">💿</div>`}</div>
    <div class="platform-links">
      <a class="btn secondary" style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;" href="${links.spotify}" target="_blank" rel="noopener">${SPOTIFY_LOGO_SVG} Spotify</a>
      <a class="btn secondary" style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;" href="${links.apple}" target="_blank" rel="noopener">${APPLE_MUSIC_LOGO_SVG} Apple Music</a>
    </div>
    <div class="hint" style="margin-top:14px;">לא הקאבר הנכון? בחר/י קאבר אחר, או העלה/י תמונה משלך:</div>
    <div class="alt-covers-row" id="altCoversRow">
      <div class="alt-cover-upload" title="העלאת קאבר משלי" onclick="document.getElementById('coverUploadInput').click()">+</div>
      <div class="hint">טוען אפשרויות…</div>
    </div>
    <input type="file" accept="image/*" id="coverUploadInput" style="display:none" onchange="handleCoverUpload(event,'${r.id}')">
    <div class="row" style="margin-top:14px;">
      <button class="btn ghost" style="width:100%" onclick="resetCoverOverride('${r.id}')">איפוס לתמונה שנמצאה אוטומטית</button>
    </div>
  `;
  document.getElementById('coverLightbox').classList.remove('hidden');
  const itunesAlts = await fetchAlbumArtOptions(r.artist, r.album, 5);
  const discogsUrl = discogsCoverImageFor(r);
  // Discogs' own image (from your actual copy) goes first, since it's the most accurate for this record.
  const alts = discogsUrl ? [discogsUrl, ...itunesAlts.filter(u=>u!==discogsUrl)] : itunesAlts;
  const altEl = document.getElementById('altCoversRow');
  if(!altEl) return; // lightbox may have closed already
  const selected = getCoverOverride(r);
  const uploadThumb = `<div class="alt-cover-upload" title="העלאת קאבר משלי" onclick="document.getElementById('coverUploadInput').click()">+</div>`;
  if(!alts.length){ altEl.innerHTML = uploadThumb + '<div class="hint">לא נמצאו אפשרויות נוספות</div>'; return; }
  altEl.innerHTML = uploadThumb + alts.map(u=>`<img class="alt-cover-thumb ${u===selected?'selected':''}" src="${u}" title="${u===discogsUrl?'Discogs':''}" onclick="selectAltCover('${r.id}','${u}')">`).join('');
}
function handleCoverUpload(event, id){
  const file = event.target.files && event.target.files[0];
  if(!file) return;
  const r = findRecordById(id);
  if(!r) return;
  const reader = new FileReader();
  reader.onload = ()=>{
    const dataUri = reader.result;
    setCoverOverride(r, dataUri);
    const wrap = document.getElementById('lightboxImgWrap');
    if(wrap) wrap.innerHTML = `<img class="cover-lightbox-img" id="lightboxImg" src="${dataUri}" alt="${escapeHtml(r.album)}">`;
    document.querySelectorAll('#altCoversRow .alt-cover-thumb').forEach(el=>el.classList.remove('selected'));
    if(currentResultRecord && currentResultRecord.id === r.id) setCoverIcon(dataUri, r.album);
    if(String(detailRecordId) === String(r.id)) setDetailCoverIcon(dataUri, r.album, r.id);
  };
  reader.readAsDataURL(file);
  event.target.value = '';
}
function selectAltCover(id, url){
  const r = findRecordById(id);
  if(!r) return;
  setCoverOverride(r, url);
  document.getElementById('lightboxImgWrap').innerHTML = `<img class="cover-lightbox-img" id="lightboxImg" src="${url}" alt="${escapeHtml(r.album)}">`;
  document.querySelectorAll('#altCoversRow .alt-cover-thumb').forEach(el=>el.classList.toggle('selected', el.src===url));
  if(currentResultRecord && currentResultRecord.id === r.id) setCoverIcon(url, r.album);
}
function resetCoverOverride(id){
  const r = findRecordById(id);
  if(!r) return;
  clearCoverOverride(r);
  openCoverLightbox(id);
  if(currentResultRecord && currentResultRecord.id === r.id) loadCoverArtFor(r);
}
function closeCoverLightbox(){
  document.getElementById('coverLightbox').classList.add('hidden');
  lightboxRecordId = null;
}

/* ---------------- ADAPTIVE QUIZ ---------------- */
// Bigger question bank than we'll actually ask - each round we pick whichever
// unasked question best splits the CURRENT remaining pool, and stop once the
// pool is narrow enough or nothing left discriminates further.
const CURRENT_YEAR = new Date().getFullYear();
const YEAR_BUCKETS = [
  {label:"שנות ה-80׳ ומטה", en:"The 80s and earlier", min:0, max:1989},
  {label:"שנות ה-90׳ וה-2000", en:"The 90s and 2000s", min:1990, max:2009},
  {label:"שנות ה-2010", en:"The 2010s", min:2010, max:2019},
  {label:"תחילת שנות ה-20", en:"Early 2020s", min:2020, max: CURRENT_YEAR-2},
  {label:"הכי טרי (השנתיים האחרונות)", en:"Freshest (last two years)", min: CURRENT_YEAR-1, max: 9999},
];
function yearOf(r){
  if(!r) return null;
  const enriched = (r._enrich && r._enrich.original_year) || (ENRICHMENT[recKey(r)] && ENRICHMENT[recKey(r)].original_year);
  const raw = enriched || r.year || '';
  const m = String(raw).match(/(?:18|19|20|21)\d{2}/);
  if(!m) return null;
  const y = Number(m[0]);
  return Number.isFinite(y) ? y : null;
}
function qLabel(o){ return (LANG==='en' && o.en) ? o.en : o.label; }
function qText(q){ return (LANG==='en' && q.en) ? q.en : q.text; }
function qSub(q){ return (LANG==='en' && q.subEn) ? q.subEn : (q.sub||''); }

const QUESTION_BANK = [
  {id:'mood', text:"איך מרגישים כרגע?", en:"How are you feeling right now?", opts:[
    {label:"שמח ואופטימי 🙂", en:"Happy and upbeat 🙂", fn:r=>r.tags.includes('שמח')?3:0},
    {label:"עצוב / נוסטלגי 😔", en:"Sad / nostalgic 😔", fn:r=>(r.tags.includes('עצוב')?2:0)+(r.tags.includes('נוסטלגי')?1:0)},
    {label:"דרמטי / עוצמתי 🎭", en:"Dramatic / powerful 🎭", fn:r=>(r.tags.includes('דרמטי')?2:0)+(r.tags.includes('עוצמתי')?1:0)},
    {label:"רגוע ונייטרלי 😌", en:"Calm and neutral 😌", fn:r=>r.tags.includes('מרגיע')?3:(5-r.energy)},
  ]},
  {id:'energy', text:"כמה אנרגיה יש לך כרגע?", en:"How much energy do you have right now?", opts:[
    {label:"המקסימום — רוצה לקפוץ 🔥", en:"Maximum - I want to jump 🔥", fn:r=>3-Math.min(3,Math.abs(r.energy-5))},
    {label:"בינונית, קצב נעים 🚶", en:"Medium, a nice pace 🚶", fn:r=>3-Math.min(3,Math.abs(r.energy-3))},
    {label:"נמוכה — רוצה להירגע 🛋️", en:"Low - I want to chill 🛋️", fn:r=>3-Math.min(3,Math.abs(r.energy-1))},
  ]},
  {id:'soundtrack', text:"תיאטרון ופסקולים, או מוזיקה \"רגילה\"?", en:"Theatre & soundtracks, or \"regular\" music?", opts:[
    {label:"תן לי פסקול / שואו!", en:"Give me a soundtrack / show!", fn:r=>r.is_soundtrack?4:-3},
    {label:"מוזיקה רגילה בבקשה", en:"Regular music please", fn:r=>r.is_soundtrack?-3:2},
  ]},
  {id:'decade', text:"מאיזו תקופה?", en:"From which era?", sub:"נבנה מהשנים שבאמת יש לך באוסף", subEn:"Built from the years actually in your collection", opts: YEAR_BUCKETS.map(b=>({
    label:b.label, en:b.en, fn:r=>{ const y=yearOf(r); if(y==null) return -1; return (y>=b.min && y<=b.max) ? 4 : -1; }
  }))},
  {id:'language', text:"עברית או אנגלית?", en:"Hebrew or English?", opts:[
    {label:"עברית 🇮🇱", en:"Hebrew 🇮🇱", fn:r=>r.is_hebrew?4:-2},
    {label:"אנגלית", en:"English", fn:r=>r.is_hebrew?-2:2},
  ]},
  {id:'romantic', text:"רומנטי או לא קשור לזה?", en:"Romantic, or not in the mood for that?", opts:[
    {label:"כן, משהו רומנטי 💕", en:"Yes, something romantic 💕", fn:r=>r.tags.includes('רומנטי')?3:0},
    {label:"לא קשור לזה כרגע", en:"Not that right now", fn:r=>0},
  ]},
  {id:'holiday', text:"מצב חג?", en:"Holiday mood?", opts:[
    {label:"כן! וייב של חג 🎄", en:"Yes! Holiday vibes 🎄", fn:r=>r.is_holiday?5:-4},
    {label:"לא, יום רגיל", en:"No, a regular day", fn:r=>r.is_holiday?-4:0},
  ]},
  {id:'occasion', text:"יש הקשר מסוים לרגע הזה?", en:"Is there a particular occasion?", opts:[
    {label:"מסיבה / ריקודים 🪩", en:"Party / dancing 🪩", fn:r=>r.tags.includes('מסיבה/ריקודים')?4:0},
    {label:"געגוע / פרידה 💔", en:"Longing / breakup 💔", fn:r=>r.tags.includes('אלבום פרידה')?4:0},
    {label:"נסיעה או לילה מאוחר 🚗", en:"A drive or late night 🚗", fn:r=>r.tags.includes('לילה מאוחר')?4:0},
    {label:"קיץ / חוץ 🌞", en:"Summer / outdoors 🌞", fn:r=>r.tags.includes('אלבום קיץ')?4:0},
    {label:"שום דבר מיוחד", en:"Nothing special", fn:r=>0},
  ]},
  {id:'genreBucket', text:"איזה כיוון סגנוני מתחשק?", en:"What style are you in the mood for?", opts:[
    {label:"פופ / דאנס", en:"Pop / Dance", fn:r=>(r.genres||[]).some(g=>/pop|dance|disco|electro/i.test(g))?3:0},
    {label:"רוק / אינדי", en:"Rock / Indie", fn:r=>(r.genres||[]).some(g=>/rock|indie|punk|garage/i.test(g))?3:0},
    {label:"נשמה / R&B / ג'אז", en:"Soul / R&B / Jazz", fn:r=>(r.genres||[]).some(g=>/r&b|soul|jazz|funk/i.test(g))?3:0},
    {label:"תיאטרון / פסקולים", en:"Theatre / Soundtracks", fn:r=>(r.genres||[]).some(g=>/theatre|soundtrack/i.test(g))?3:0},
    {label:"ישראלי", en:"Israeli", fn:r=>(r.genres||[]).some(g=>/israeli|mizrahi/i.test(g))?3:0},
  ]},
  {id:'bandSolo', text:"סולו או להקה?", en:"Solo artist or band?", opts:[
    {label:"אמן/ית סולו", en:"Solo artist", fn:r=>r.act==='סולו'?2:0},
    {label:"להקה או דואו", en:"Band or duo", fn:r=>(r.act==='להקה'||r.act==='דואו')?2:0},
  ]},
  {id:'gender', text:"בא לך זמר או זמרת?", en:"In the mood for a male or female voice?", opts:[
    {label:"זמרת", en:"Female voice", fn:r=>(r.gender==='אישה'||r.gender==='נשים')?2:0},
    {label:"זמר", en:"Male voice", fn:r=>(r.gender==='גבר'||r.gender==='גברים')?2:0},
  ]},
  {id:'empower', text:"בא לך משהו שמעצים ומרים?", en:"In the mood for something empowering and uplifting?", opts:[
    {label:"כן, בדיוק את זה", en:"Yes, exactly that", fn:r=>(r.tags.includes('העצמה נשית')||r.tags.includes('מעצים'))?3:0},
    {label:"לא, לא קשור", en:"No, not really", fn:r=>0},
  ]},
  {id:'popularity', text:"בא לך משהו מוכר וגדול, או משהו יותר נישתי?", en:"Something big and well-known, or something more niche?", opts:[
    {label:"היט מיינסטרים שכולם מכירים ⭐", en:"A mainstream hit everyone knows ⭐", fn:r=>r.popularity==='מיינסטרים'?3:0},
    {label:"משהו יותר נישתי / אלטרנטיבי 🌙", en:"Something more niche / alternative 🌙", fn:r=>r.popularity==='נישתי'?3:0},
  ]},
  {id:'formatSize', text:"תקליט ארוך (12 אינץ') או קליל וקצר (7 אינץ')?", en:"A long record (12\") or short and light (7\")?", opts:[
    {label:"אלבום מלא, 12 אינץ'", en:"Full album, 12\"", fn:r=>/12/.test(r.format||'')?2:0},
    {label:"סינגל קצר, 7 אינץ'", en:"Short single, 7\"", fn:r=>/7/.test(r.format||'')?2:0},
  ]},
  {id:'liveStudio', text:"הופעה חיה או גרסת אולפן?", en:"Live performance or studio version?", opts:[
    {label:"הופעה חיה 🎤", en:"Live performance 🎤", fn:r=>r.is_live?4:-2},
    {label:"גרסת אולפן", en:"Studio version", fn:r=>r.is_live?-2:1},
  ]},
  {id:'singleAlbum', text:"סינגל קליל או אלבום מלא לשקוע בו?", en:"A light single, or a full album to sink into?", opts:[
    {label:"סינגל קליל", en:"A light single", fn:r=>r.type==='סינגל'?3:0},
    {label:"אלבום מלא", en:"A full album", fn:r=>r.type==='אלבום סטודיו'?2:0},
  ]},
  {id:'vocalProduction', text:"מה תופס יותר - הקול, או ההפקה/הביט?", en:"What matters more - the voice, or the production/beat?", opts:[
    {label:"הקול והמנגינה", en:"The voice and melody", fn:r=>(r.genres||[]).some(g=>/singer-songwriter|acoustic|folk|soul|jazz/i.test(g))?3:0},
    {label:"ההפקה והביט", en:"The production and beat", fn:r=>(r.genres||[]).some(g=>/synth|electro|hyperpop|dance-pop|edm|house/i.test(g))?3:0},
  ]},
  {id:'theatreFilm', text:"אם פסקול - אז תיאטרון/ברודוויי או סרט/טלוויזיה?", en:"If it's a soundtrack - theatre/Broadway or film/TV?", opts:[
    {label:"תיאטרון / ברודוויי 🎭", en:"Theatre / Broadway 🎭", fn:r=>(r.genres||[]).some(g=>/theatre|broadway/i.test(g))?3:0},
    {label:"סרט / טלוויזיה 🎬", en:"Film / TV 🎬", fn:r=>r.is_soundtrack && !(r.genres||[]).some(g=>/theatre|broadway/i.test(g))?2:0},
    {label:"לא רלוונטי", en:"Not relevant", fn:r=>0},
  ]},
  {id:'singalong', text:"בא לך משהו לשיר בקול איתו?", en:"In the mood for something to sing along to?", opts:[
    {label:"כן, שירה בקול מהבטן! 🎶", en:"Yes, full-voice singalong! 🎶", fn:r=>r.tags.includes('שירה בקול')?4:0},
    {label:"לא, יותר להקשיב בשקט", en:"No, more of a quiet listen", fn:r=>r.tags.includes('שירה בקול')?-2:0},
  ]},
  {id:'mysteriousSunny', text:"וייב מסתורי ואפלולי, או בהיר ושמשי?", en:"A mysterious, dim vibe, or bright and sunny?", opts:[
    {label:"מסתורי ואפלולי 🌑", en:"Mysterious and dim 🌑", fn:r=>r.tags.includes('מסתורי')?4:0},
    {label:"בהיר ושמשי ☀️", en:"Bright and sunny ☀️", fn:r=>r.tags.includes('בהיר/שמשי')?4:0},
  ]},
  {id:'sensual', text:"בא לך משהו חושני ומפתה, או יותר תמים וקליל?", en:"Something sensual and alluring, or more light and innocent?", opts:[
    {label:"חושני ומפתה 🔥", en:"Sensual and alluring 🔥", fn:r=>r.tags.includes('חושני')?4:0},
    {label:"תמים וקליל יותר", en:"More light and innocent", fn:r=>r.tags.includes('חושני')?-2:0},
  ]},
  {id:'dayNight', text:"וייב של יום או של לילה מאוחר?", en:"A daytime vibe or a late-night one?", opts:[
    {label:"יום, שמש וקיץ ☀️", en:"Day, sun and summer ☀️", fn:r=>r.tags.includes('אלבום קיץ')?3:0},
    {label:"לילה מאוחר, נסיעה 🌃", en:"Late night, a drive 🌃", fn:r=>r.tags.includes('לילה מאוחר')?3:0},
  ]},
  {id:'kidsAdult', text:"וייב משפחתי/ילדים, או מבוגר בהחלט?", en:"A family/kids vibe, or definitely grown-up?", opts:[
    {label:"משפחתי / דיסני 👨‍👩‍👧", en:"Family / Disney 👨‍👩‍👧", fn:r=>(r.genres||[]).some(g=>/children|disney/i.test(g))?4:0},
    {label:"מבוגר בהחלט", en:"Definitely grown-up", fn:r=>(r.genres||[]).some(g=>/children|disney/i.test(g))?-3:1},
  ]},
  {id:'acousticElectronic', text:"אקוסטי ואורגני, או אלקטרוני וסינתטי?", en:"Acoustic and organic, or electronic and synthetic?", opts:[
    {label:"אקוסטי ואורגני 🎸", en:"Acoustic and organic 🎸", fn:r=>(r.genres||[]).some(g=>/acoustic|folk|singer-songwriter|jazz/i.test(g))?3:0},
    {label:"אלקטרוני וסינתטי 🎹", en:"Electronic and synthetic 🎹", fn:r=>(r.genres||[]).some(g=>/synth|electro|hyperpop|dance-pop/i.test(g))?3:0},
  ]},
  {id:'recency', text:"בא לך משהו שסובבת לא מזמן, או משהו שלא סובבת כבר הרבה זמן?", en:"Something you spun recently, or something you haven't spun in a while?",
    sub:"מבוסס על היסטוריית הסיבובים שתיעדת באפליקציה", subEn:"Based on the spin history you've logged in the app", opts:[
    {label:"כן, משהו שסובבתי לא מזמן ומתחשק לחזור עליו 🔁", en:"Yes, something recent I want to replay 🔁", fn:r=>{ if(!r._lastPlayed) return -2; const d=daysSince(r._lastPlayed); if(d<=3) return 4; if(d<=14) return 2; return -1; }},
    {label:"דווקא משהו שכבר לא סובבתי הרבה זמן 🕰️", en:"Actually, something I haven't spun in a long time 🕰️", fn:r=>{ if(!r._lastPlayed) return 4; const d=daysSince(r._lastPlayed); if(d>=180) return 4; if(d>=60) return 2; return -2; }},
  ]},
  {id:'favoriteRating', text:"בא לך רק את הכי טובים שדירגת, או שמתחשק לתת צ'אנס למשהו אחר?", en:"Only your top-rated ones, or want to give something else a chance?",
    sub:"מבוסס על הדירוגים שנתת באפליקציה", subEn:"Based on the ratings you've given in the app", opts:[
    {label:"רק את האהובים שלי (דירוג גבוה) ⭐", en:"Just my favorites (highly rated) ⭐", fn:r=>(r._musicRating||0)>=4 ? 4 : ((r._musicRating||0)===0 ? -1 : 0)},
    {label:"תן צ'אנס למשהו שלא דירגתי או פחות מוכר לי 🎲", en:"Give a chance to something unrated or less familiar 🎲", fn:r=>(r._musicRating||0)===0 ? 3 : 0},
  ]},
  {id:'spinFrequency', text:"הפייבוריט המושמע ביותר שלך, או משהו שכבר תקופה מחכה בתור?", en:"Your most-played favorite, or something that's been waiting its turn?",
    sub:"מבוסס על כמה פעמים סובבת כל תקליט בסך הכל", subEn:"Based on how many times you've spun each record in total", opts:[
    {label:"הפייבוריט המוכח, מה שהכי הרבה מנגן 🏆", en:"The proven favorite, the most-played one 🏆", fn:r=>{ const c=r._spinCount||0; if(c>=5) return 4; if(c>=2) return 2; return -1; }},
    {label:"משהו שמחכה בתור, בקושי ניגן 📦", en:"Something waiting its turn, barely played 📦", fn:r=>(r._spinCount||0)===0 ? 3 : -1},
  ]},
  {id:'socialSolo', text:"רגע ביחד עם מישהו, או רגע שקט לבד?", en:"A moment together with someone, or a quiet moment alone?", opts:[
    {label:"ביחד עם מישהו 👯", en:"Together with someone 👯", fn:r=>(r.tags.includes('רומנטי')?2:0)+(r.tags.includes('מסיבה/ריקודים')?2:0)},
    {label:"רגע שקט לבד 🌙", en:"A quiet moment alone 🌙", fn:r=>r.tags.includes('מהורהר')?3:0},
  ]},
  {id:'nostalgiaFresh', text:"נוסטלגיה למשהו מוכר וישן, או גילוי של משהו טרי שלא הקשבת לו הרבה?", en:"Nostalgia for something old and familiar, or discovering something fresh you haven't heard much?", opts:[
    {label:"נוסטלגיה, משהו ישן ומוכר 📻", en:"Nostalgia, something old and familiar 📻", fn:r=>{ const y=yearOf(r); const oldYear = y!=null && y<=2010; return (r.tags.includes('נוסטלגי')?3:0)+(oldYear?1:0); }},
    {label:"גילוי טרי, משהו שלא הקשבתי לו הרבה 🌱", en:"A fresh discovery, something I haven't heard much 🌱", fn:r=>{ const y=yearOf(r); const newYear = y!=null && y>=CURRENT_YEAR-3; return ((r._spinCount||0)===0?2:0)+(newYear?2:0); }},
  ]},
  {id:'backgroundFocus', text:"תקליט לרקע בזמן שעושים משהו אחר, או שדורש הקשבה מלאה בלי הפרעות?", en:"A record for the background while doing something else, or one that demands full attention?", opts:[
    {label:"רקע נעים, לא צריך למקד בו תשומת לב 🎼", en:"Nice background, no need to focus on it 🎼", fn:r=>(r.tags.includes('מרגיע')?3:0)+(3-Math.min(3,Math.abs(r.energy-2)))},
    {label:"הקשבה מלאה, זה מצריך תשומת לב 🎧", en:"Full attention, it demands focus 🎧", fn:r=>(r.tags.includes('דרמטי')?2:0)+(r.energy>=4?2:0)},
  ]},
  {id:'trendClassic', text:"טרנד עכשווי שכולם מדברים עליו, או קלאסיקה מוכחת שעומדת במבחן הזמן?", en:"A current trend everyone's talking about, or a proven classic that stood the test of time?", opts:[
    {label:"טרנד עכשווי 🔥", en:"A current trend 🔥", fn:r=>{ const y=yearOf(r); return (r.popularity==='מיינסטרים'?2:0)+(y!=null && y>=CURRENT_YEAR-3 ? 2:0); }},
    {label:"קלאסיקה מוכחת שעומדת במבחן הזמן 🏛️", en:"A proven classic that stood the test of time 🏛️", fn:r=>{ const y=yearOf(r); return y!=null && y<=2009 ? 3 : 0; }},
  ]},
  {id:'focusedEclectic', text:"מיני אלבום ממוקד וקצר, או אוסף גדול עם הרבה מגוון?", en:"A focused, short EP, or a big collection with a lot of variety?", opts:[
    {label:"ממוקד וקצר", en:"Focused and short", fn:r=>r.type==='מיני אלבום'?3:0},
    {label:"אוסף גדול ומגוון", en:"A big, varied collection", fn:r=>r.type==='אוסף'?3:0},
  ]},
];

let quizIndex = 0;
let askedIds = new Set();
let scores = new Map(); // recordId -> cumulative score
let currentQuizPool = null;
let currentQuestionId = null;
const MIN_POOL = 5;
const MAX_QUESTIONS = 9;

function startQuiz(){
  if(!requireAnyRecords()) return;
  annotatePlayData();
  quizIndex = 0;
  askedIds = new Set();
  scores = new Map(RECORDS.map(r=>[r.id, 0]));
  currentQuestionId = null;
  showScreen('quiz');
  askNextQuestion();
}
function currentPool(targetSize){
  const eligible = eligibleRecords();
  const arr = eligible.map(r=>({r, s:scores.get(r.id)||0}));
  arr.sort((a,b)=>b.s-a.s);
  return arr.slice(0, Math.max(MIN_POOL, Math.min(eligible.length, targetSize))).map(x=>x.r);
}
function entropyForQuestion(q, pool){
  // for each record in pool, find its best-matching option; measure spread across options
  const counts = new Array(q.opts.length).fill(0);
  pool.forEach(r=>{
    let bestI = 0, bestV = -Infinity;
    q.opts.forEach((o,i)=>{ const v = o.fn(r); if(v > bestV){ bestV = v; bestI = i; } });
    counts[bestI]++;
  });
  const total = pool.length || 1;
  let entropy = 0;
  counts.forEach(c=>{ if(c>0){ const p = c/total; entropy -= p*Math.log2(p); } });
  return entropy;
}
function pickNextQuestion(pool){
  const candidates = QUESTION_BANK.filter(q=>!askedIds.has(q.id));
  if(!candidates.length) return null;
  let best = null, bestScore = -1;
  candidates.forEach(q=>{
    const e = entropyForQuestion(q, pool);
    if(e > bestScore){ bestScore = e; best = q; }
  });
  // if even the best question has ~no discrimination left, stop asking
  if(bestScore < 0.15) return null;
  return best;
}
function renderQuestionDom(q, poolSize){
  document.getElementById('qProgressLabel').textContent = tf('quiz.progress', quizIndex+1, poolSize);
  document.getElementById('qProgressBar').style.width = `${Math.min(95, quizIndex/MAX_QUESTIONS*100)}%`;
  document.getElementById('qText').textContent = qText(q);
  document.getElementById('qSub').textContent = qSub(q);
  const optsEl = document.getElementById('qOptions');
  optsEl.innerHTML = '';
  q.opts.forEach(o=>{
    const btn = document.createElement('div');
    btn.className = 'opt';
    btn.textContent = qLabel(o);
    btn.onclick = ()=>{
      RECORDS.forEach(r=>{ scores.set(r.id, (scores.get(r.id)||0) + o.fn(r)); });
      askedIds.add(q.id);
      quizIndex++;
      askNextQuestion();
    };
    optsEl.appendChild(btn);
  });
}
function renderCurrentQuestion(){
  const q = QUESTION_BANK.find(x=>x.id===currentQuestionId);
  if(!q) return;
  renderQuestionDom(q, (currentQuizPool||[]).length);
}
function askNextQuestion(){
  const targetSize = Math.max(MIN_POOL, Math.round(RECORDS.length / Math.pow(1.8, quizIndex)));
  const pool = currentPool(targetSize);
  currentQuizPool = pool;

  if(quizIndex >= MAX_QUESTIONS || pool.length <= MIN_POOL){
    finishQuizNow();
    return;
  }
  const q = pickNextQuestion(pool);
  if(!q){ finishQuizNow(); return; }
  currentQuestionId = q.id;
  renderQuestionDom(q, pool.length);
}
function skipCurrentQuestion(){
  if(currentQuestionId) askedIds.add(currentQuestionId);
  quizIndex++;
  askNextQuestion();
}
function finishQuizNow(){
  RESULT_SOURCE = 'quiz';
  const pool = currentPool(Math.max(MIN_POOL, Math.round(RECORDS.length / Math.pow(1.8, quizIndex))));
  currentQuizPool = pool.length ? pool : RECORDS;
  const pick = currentQuizPool[Math.floor(Math.random()*currentQuizPool.length)];
  renderResultCard(pick);
  showScreen('result');
}

/* ---------------- BROWSE + TAG EDITOR ---------------- */
let editingRecordId = null;
/* ---------------- BROWSE FILTER ENGINE ---------------- */
let FILTER_STATE = { search:'', letter:null, types:[], sizes:[], languages:[], editions:[], colors:[], decades:[], years:[], signed:[], favoritesOnly:false, excludedOnly:false, recentOnly:false, sortBy:'artist' };
function resetFilters(){
  const keepSort = FILTER_STATE.sortBy;
  FILTER_STATE = { search:'', letter:null, types:[], sizes:[], languages:[], editions:[], colors:[], decades:[], years:[], signed:[], favoritesOnly:false, excludedOnly:false, recentOnly:false, sortBy:keepSort };
  const s = document.getElementById('browseSearchInput'); if(s) s.value = '';
}
function toggleSortBy(){
  setFilterAndRender({sortBy: FILTER_STATE.sortBy === 'artist' ? 'album' : 'artist'});
}
function setFilterAndRender(partial){
  Object.assign(FILTER_STATE, partial);
  renderBrowseList();
}
let OPEN_PICKER = null; /* {rowId, field, values, labelFn} */
function closeAllPickerRows(){
  document.querySelectorAll('.letter-row').forEach(el=>el.classList.add('hidden'));
  OPEN_PICKER = null;
}
function ensurePickerRow(rowId){
  let row = document.getElementById(rowId);
  if(!row){
    row = document.createElement('div');
    row.id = rowId;
    row.className = 'letter-row hidden';
    document.getElementById('filterBar').insertAdjacentElement('afterend', row);
  }
  return row;
}
function renderPickerRow(){
  if(!OPEN_PICKER) return;
  const {rowId, field, values, labelFn} = OPEN_PICKER;
  const row = ensurePickerRow(rowId);
  if(!values.length){
    row.innerHTML = `<div class="hint" style="padding:4px 2px;">${escapeHtml(t('filter.noValuesYet'))}</div>`;
  } else {
    row.innerHTML = values.map(v=>{
      const active = (FILTER_STATE[field]||[]).includes(v);
      const vAttr = String(v).replace(/\\/g,'\\\\').replace(/'/g,"\\'");
      return `<div class="filter-chip ${active?'active':''}" style="border-radius:999px;" onclick="toggleArrayFilterValue('${field}','${vAttr}')">${escapeHtml(labelFn(v))}</div>`;
    }).join('');
  }
  row.classList.remove('hidden');
}
function toggleMultiPicker(rowId, field, values, labelFn){
  const row = ensurePickerRow(rowId);
  const willShow = row.classList.contains('hidden');
  closeAllPickerRows();
  if(!willShow){ return; }
  OPEN_PICKER = {rowId, field, values, labelFn};
  renderPickerRow();
}
function toggleArrayFilterValue(field, value){
  if(!Array.isArray(FILTER_STATE[field])) FILTER_STATE[field] = [];
  const arr = FILTER_STATE[field];
  const i = arr.indexOf(value);
  if(i>=0) arr.splice(i,1); else arr.push(value);
  renderBrowseList();
}
function renderFilterBar(){
  const primary = document.getElementById('browsePrimaryControls');
  const bar = document.getElementById('filterBar');
  const bar2 = document.getElementById('filterBarRow2');
  if(!bar) return;
  const typeCount = (FILTER_STATE.types||[]).length;
  const sizeCount = (FILTER_STATE.sizes||[]).length;
  const languageCount = (FILTER_STATE.languages||[]).length;
  const editionCount = (FILTER_STATE.editions||[]).length;
  const colorCount = (FILTER_STATE.colors||[]).length;
  const decadeCount = (FILTER_STATE.decades||[]).length;
  const yearCount = (FILTER_STATE.years||[]).length;
  const signedCount = (FILTER_STATE.signed||[]).length;
  const anyActive = !!(FILTER_STATE.letter || typeCount || sizeCount || languageCount || editionCount || colorCount || decadeCount || yearCount || signedCount || FILTER_STATE.favoritesOnly || FILTER_STATE.excludedOnly || FILTER_STATE.recentOnly);
  const resetAllAttr = "setFilterAndRender({letter:null,types:[],sizes:[],languages:[],editions:[],colors:[],decades:[],years:[],signed:[],favoritesOnly:false,excludedOnly:false,recentOnly:false});closeAllPickerRows();";
  const primaryChips = [
    {key:'sort', label: FILTER_STATE.sortBy==='album' ? t('filter.sortByAlbum') : t('filter.sortByArtist'), active: FILTER_STATE.sortBy==='album', onclick:"toggleSortBy()"},
    {key:'group', label:t('filter.groupByArtist'), active: GROUP_BY_ARTIST, disabled: FILTER_STATE.sortBy !== 'artist' || BROWSE_VIEW_MODE !== 'list' || FILTER_STATE.recentOnly, onclick:"toggleGroupByArtist()"},
    {key:'layout', label: BROWSE_VIEW_MODE === 'list' ? t('filter.layoutList') : t('filter.layoutGrid'), active: BROWSE_VIEW_MODE === 'grid', onclick:"toggleBrowseViewMode()"},
  ];
  if(primary) primary.innerHTML = primaryChips.map(c=>`<div class="filter-chip ${c.active?'active':''} ${c.disabled?'disabled':''}" ${c.disabled?'':`onclick="${c.onclick}"`}>${escapeHtml(c.label)}</div>`).join('');
  const chips = [
    {key:'all', label:t('filter.all'), active: !anyActive, onclick:resetAllAttr},
    {key:'letter', label:t('filter.byLetter'), active: !!FILTER_STATE.letter, onclick:"toggleLetterRow()"},
    {key:'type', label: typeCount ? `${t('filter.byType')} (${typeCount})` : t('filter.byType'), active: typeCount>0, onclick:"toggleTypePicker()"},
    {key:'size', label: sizeCount ? `${t('filter.bySize')} (${sizeCount})` : t('filter.bySize'), active: sizeCount>0, onclick:"toggleSizePicker()"},
    {key:'language', label: languageCount ? `${t('filter.byLanguage')} (${languageCount})` : t('filter.byLanguage'), active: languageCount>0, onclick:"toggleLanguagePicker()"},
    {key:'edition', label: editionCount ? `${t('filter.byEdition')} (${editionCount})` : t('filter.byEdition'), active: editionCount>0, onclick:"toggleEditionPicker()"},
    {key:'color', label: colorCount ? `${t('filter.byColor')} (${colorCount})` : t('filter.byColor'), active: colorCount>0, onclick:"toggleColorPicker()"},
    {key:'decade', label: decadeCount ? `${t('filter.byDecade')} (${decadeCount})` : t('filter.byDecade'), active: decadeCount>0, onclick:"toggleDecadePicker()"},
    {key:'year', label: yearCount ? `${t('filter.byYear')} (${yearCount})` : t('filter.byYear'), active: yearCount>0, onclick:"toggleYearPicker()"},
    {key:'signed', label: signedCount ? `${t('filter.bySigned')} (${signedCount})` : t('filter.bySigned'), active: signedCount>0, onclick:"toggleSignedPicker()"},
  ];
  bar.innerHTML = chips.map(c=>`<div class="filter-chip ${c.active?'active':''}" onclick="${c.onclick}">${escapeHtml(c.label)}</div>`).join('')
    + (anyActive ? `<div class="filter-chip" onclick="${resetAllAttr}">${escapeHtml(t('filter.clear'))}</div>` : '');
  const chips2 = [
    {key:'fav', label:t('filter.favorites'), active: FILTER_STATE.favoritesOnly, onclick:"setFilterAndRender({favoritesOnly:!FILTER_STATE.favoritesOnly, excludedOnly:false})"},
    {key:'exc', label:t('filter.excluded'), active: FILTER_STATE.excludedOnly, onclick:"setFilterAndRender({excludedOnly:!FILTER_STATE.excludedOnly, favoritesOnly:false})"},
    {key:'recent', label:t('filter.recentlyAdded'), active: FILTER_STATE.recentOnly, onclick:"setFilterAndRender({recentOnly:!FILTER_STATE.recentOnly})"},
  ];
  if(bar2) bar2.innerHTML = chips2.map(c=>`<div class="filter-chip ${c.active?'active':''}" onclick="${c.onclick}">${escapeHtml(c.label)}</div>`).join('');
  renderPickerRow();
}
function toggleLetterRow(){
  const row = document.getElementById('letterRow');
  const willShow = row.classList.contains('hidden');
  closeAllPickerRows();
  if(!willShow){ return; }
  const letters = Array.from(new Set(RECORDS.map(r=>(r.artist||'?').trim()[0]?.toUpperCase()||'?'))).sort();
  row.innerHTML = letters.map(l=>`<div class="letter-chip ${FILTER_STATE.letter===l?'active':''}" onclick="setFilterAndRender({letter: FILTER_STATE.letter==='${l}'?null:'${l}'})">${escapeHtml(l)}</div>`).join('');
  row.classList.remove('hidden');
}
function toggleTypePicker(){
  const values = Array.from(new Set(RECORDS.map(r=>(r.type||'').trim()).filter(Boolean))).sort((a,b)=>a.localeCompare(b));
  toggleMultiPicker('typeRow', 'types', values, v=>trTag(v));
}
function toggleSizePicker(){
  const values = Array.from(new Set(RECORDS.map(r=>(r.format||'').trim()).filter(Boolean))).sort((a,b)=>(parseInt(a)||0)-(parseInt(b)||0));
  toggleMultiPicker('sizeRow', 'sizes', values, v=>`${v}"`);
}
function toggleLanguagePicker(){
  const set = new Set();
  RECORDS.forEach(r=>{ String(r.language||'').split(',').map(s=>s.trim()).filter(Boolean).forEach(l=>set.add(l)); });
  const values = Array.from(set).sort((a,b)=>a.localeCompare(b));
  toggleMultiPicker('languageRow', 'languages', values, v=>trTag(v));
}
function toggleEditionPicker(){
  const values = Array.from(new Set(RECORDS.map(r=>(r.edition||'').trim()).filter(Boolean))).sort((a,b)=>a.localeCompare(b));
  toggleMultiPicker('editionRow', 'editions', values, v=>v);
}
function toggleColorPicker(){
  const values = Array.from(new Set(RECORDS.map(r=>(r.color||'').trim()).filter(Boolean))).sort((a,b)=>a.localeCompare(b));
  toggleMultiPicker('colorRow', 'colors', values, v=>v);
}
function toggleDecadePicker(){
  const decadesSet = new Set();
  RECORDS.forEach(r=>{ const y = yearOf(r); if(y!=null) decadesSet.add(Math.floor(y/10)*10); });
  const values = Array.from(decadesSet).sort((a,b)=>a-b).map(String);
  toggleMultiPicker('decadeRow', 'decades', values, v=>decadeLabel(parseInt(v)));
}
function toggleYearPicker(){
  const values = Array.from(new Set(RECORDS.map(r=>(r.year||'').trim()).filter(Boolean)))
    .sort((a,b)=> (parseInt(a)||0) - (parseInt(b)||0) || a.localeCompare(b));
  toggleMultiPicker('yearRow', 'years', values, v=>v);
}
function toggleSignedPicker(){
  toggleMultiPicker('signedRow', 'signed', ['true','false'], v=> v==='true' ? t('filter.signedYes') : t('filter.signedNo'));
}
const BROWSE_VIEW_KEY = "whats_spinning_browse_view_v1";
let BROWSE_VIEW_MODE = (function(){ try{ return localStorage.getItem(BROWSE_VIEW_KEY) || 'list'; }catch(e){ return 'list'; } })();
function toggleBrowseViewMode(){
  BROWSE_VIEW_MODE = BROWSE_VIEW_MODE === 'list' ? 'grid' : 'list';
  try{ localStorage.setItem(BROWSE_VIEW_KEY, BROWSE_VIEW_MODE); }catch(e){}
  renderBrowseList();
}
const GROUP_BY_ARTIST_KEY = "whats_spinning_group_by_artist_v1";
let GROUP_BY_ARTIST = (function(){ try{ return localStorage.getItem(GROUP_BY_ARTIST_KEY) === '1'; }catch(e){ return false; } })();
function toggleGroupByArtist(){
  GROUP_BY_ARTIST = !GROUP_BY_ARTIST;
  try{ localStorage.setItem(GROUP_BY_ARTIST_KEY, GROUP_BY_ARTIST ? '1' : '0'); }catch(e){}
  renderBrowseList();
}
function renderBrowseList(){
  renderFilterBar();
  const filter = (FILTER_STATE.search||'').trim().toLowerCase();
  const list = RECORDS.filter(r=>{
    if(FILTER_STATE.favoritesOnly && !isFavorite(r)) return false;
    if(FILTER_STATE.excludedOnly && !isExcluded(r)) return false;
    if(FILTER_STATE.recentOnly && RECORD_ADDED_AT[recKey(r)] == null) return false;
    if(FILTER_STATE.letter && (r.artist||'?').trim()[0]?.toUpperCase() !== FILTER_STATE.letter) return false;
    if((FILTER_STATE.types||[]).length && !FILTER_STATE.types.includes((r.type||'').trim())) return false;
    if((FILTER_STATE.sizes||[]).length && !FILTER_STATE.sizes.includes((r.format||'').trim())) return false;
    if((FILTER_STATE.languages||[]).length){
      const recLangs = String(r.language||'').split(',').map(s=>s.trim()).filter(Boolean);
      if(!FILTER_STATE.languages.some(l=>recLangs.includes(l))) return false;
    }
    if((FILTER_STATE.editions||[]).length && !FILTER_STATE.editions.includes((r.edition||'').trim())) return false;
    if((FILTER_STATE.colors||[]).length && !FILTER_STATE.colors.includes((r.color||'').trim())) return false;
    if((FILTER_STATE.decades||[]).length){
      const y = yearOf(r);
      const d = y!=null ? String(Math.floor(y/10)*10) : null;
      if(d===null || !FILTER_STATE.decades.includes(d)) return false;
    }
    if((FILTER_STATE.years||[]).length && !FILTER_STATE.years.includes((r.year||'').trim())) return false;
    if((FILTER_STATE.signed||[]).length && !FILTER_STATE.signed.includes(String(!!r.is_signed))) return false;
    if(!filter) return true;
    const cachedEntry = TRACKLIST_CACHE[recKey(r)];
    const cachedTracks = (cachedEntry && cachedEntry.names) || [];
    const hay = [r.artist, r.album, r.edition, r.color, ...(r.genres||[]), ...cachedTracks].join(' ').toLowerCase();
    return hay.includes(filter);
  }).sort((a,b)=>{
    if(FILTER_STATE.recentOnly) return (RECORD_ADDED_AT[recKey(b)]||0) - (RECORD_ADDED_AT[recKey(a)]||0);
    return FILTER_STATE.sortBy==='album' ? a.album.localeCompare(b.album) : a.artist.localeCompare(b.artist);
  });
  document.getElementById('browseCount').textContent = `${list.length} / ${RECORDS.length}`;
  const el = document.getElementById('browseList');
  const shown = list.slice(0,400);
  if(!shown.length){
    el.className = 'card';
    el.innerHTML = `<div class="empty-hint">${escapeHtml(FILTER_STATE.recentOnly ? t('filter.recentEmpty') : t('filter.noResults'))}</div>`;
    return;
  }
  if(BROWSE_VIEW_MODE === 'grid'){
    el.className = 'card cover-grid';
    el.innerHTML = shown.map(r=>{
      const favBadge = isFavorite(r) ? '⭐' : '';
      const excludeBadge = isExcluded(r) ? '🚫' : '';
      const cachedArr = ALBUM_ART_CACHE.get((r.artist+'|||'+r.album).toLowerCase()+'|||opts1');
      const cached = getCoverOverride(r) || (cachedArr && cachedArr[0]);
      const inner = cached ? `<img src="${cached}" alt="${escapeHtml(r.album)}">` : `<div class="cg-fallback">💿</div>`;
      return `<div class="cover-grid-item" data-cover-id="${r.id}" onclick="openRecordDetail('${r.id}')" title="${escapeHtml(r.album)} — ${escapeHtml(r.artist)}">
        <div class="cg-badges">${favBadge}${excludeBadge}</div>
        ${inner}
        <div class="cg-title">${escapeHtml(r.album)}</div>
      </div>`;
    }).join('');
    setupCoverLazyLoad(shown, '.cover-grid-item');
  } else {
    el.className = 'card';
    const grouped = GROUP_BY_ARTIST && FILTER_STATE.sortBy === 'artist';
    let lastArtist = null;
    el.innerHTML = shown.map(r=>{
      const play = getPlayInfo(r);
      const rt = getRating(r);
      const spinBadge = play && play.count ? `<span class="spin-badge">🔁${play.count}</span>` : '';
      const ratingSuffix = (rt.music || rt.pressing) ? ` · 🎵${rt.music||0} 💿${rt.pressing||0}` : '';
      const pressing = pressingLabel(r);
      const pressingSuffix = pressing ? ` · ${escapeHtml(pressing)}` : '';
      const recentSuffix = FILTER_STATE.recentOnly ? ` · ${escapeHtml(relativeAddedLabel(RECORD_ADDED_AT[recKey(r)]))}` : '';
      const favBadge = isFavorite(r) ? '<span class="tag" style="margin:0;">⭐</span>' : '';
      const excludeBadge = isExcluded(r) ? '<span class="tag exclude-badge" style="margin:0;">🚫</span>' : '';
      const genresDisp = (r.genres||[r.genre]).map(g=>trTag(g)).join(', ');
      let groupHeader = '';
      if(grouped && r.artist !== lastArtist){
        lastArtist = r.artist;
        groupHeader = `<div class="list-group-header">${escapeHtml(r.artist)}</div>`;
      }
      const artistInline = grouped ? '' : `<span class="artist-inline"> — ${escapeHtml(r.artist)}</span>`;
      const cachedArr = ALBUM_ART_CACHE.get((r.artist+'|||'+r.album).toLowerCase()+'|||opts1');
      const cached = getCoverOverride(r) || (cachedArr && cachedArr[0]);
      const thumbInner = cached ? `<img src="${cached}" alt="${escapeHtml(r.album)}">` : '💿';
      return `${groupHeader}
      <div class="swipe-row">
        <div class="swipe-action-delete" onclick="confirmRemoveRecordFromList(${jsStringForHtmlAttr(r.id)})">🗑️<span>${escapeHtml(t('browse.swipeDeleteLabel'))}</span></div>
        <div class="list-item swipe-content" data-record-id="${r.id}">
          <div class="list-thumb-wrap" data-cover-id="${r.id}">${thumbInner}</div>
          <div class="n">${escapeHtml(r.album)}${artistInline}<span class="a">${escapeHtml(genresDisp)} · ${r.year||''}${ratingSuffix}${pressingSuffix}${recentSuffix}</span></div>
          <div style="font-size:11px;color:var(--muted);text-align:left;max-width:110px;display:flex;align-items:center;gap:4px;justify-content:flex-end;">${favBadge}${excludeBadge}${spinBadge}</div>
        </div>
      </div>
    `;
    }).join('');
    setupCoverLazyLoad(shown, '.list-thumb-wrap');
    SWIPE_OPEN_CONTENT = null; // old row DOM nodes just got replaced above - drop any stale reference
    initSwipeRows(el);
  }
}
let coverGridObserver = null;
/* ---------------- SWIPE-TO-DELETE (browse list rows) ---------------- */
const SWIPE_ROW_REVEAL = 76; // px - must match .swipe-action-delete width in CSS
let SWIPE_OPEN_CONTENT = null; // the currently-revealed .swipe-content element, if any
function closeOpenSwipeRow(){
  if(!SWIPE_OPEN_CONTENT) return;
  SWIPE_OPEN_CONTENT.classList.remove('swiping');
  SWIPE_OPEN_CONTENT.style.transform = 'translateX(0)';
  SWIPE_OPEN_CONTENT._swipeOpenX = 0;
  SWIPE_OPEN_CONTENT = null;
}
// Attaches the swipe-right-to-reveal-delete gesture to every .swipe-row inside the given container.
// Called after every renderBrowseList() list-mode render, since innerHTML replacement wipes out any
// previously-attached listeners along with the old elements.
function initSwipeRows(container){
  container.querySelectorAll('.swipe-content').forEach(content=>{
    content._swipeOpenX = 0;
    let startX = 0, startY = 0, dx = 0, dragging = false, decided = false, isHorizontal = false, wasDragged = false;
    content.addEventListener('pointerdown', (e)=>{
      if(SWIPE_OPEN_CONTENT && SWIPE_OPEN_CONTENT !== content) closeOpenSwipeRow();
      startX = e.clientX; startY = e.clientY; dx = 0; dragging = true; decided = false; isHorizontal = false;
      if(content.setPointerCapture) try{ content.setPointerCapture(e.pointerId); }catch(err){}
    });
    content.addEventListener('pointermove', (e)=>{
      if(!dragging) return;
      const dxRaw = e.clientX - startX;
      const dyRaw = e.clientY - startY;
      if(!decided){
        if(Math.abs(dxRaw) < 6 && Math.abs(dyRaw) < 6) return; // too small yet to tell tap/scroll/swipe apart
        decided = true;
        isHorizontal = Math.abs(dxRaw) > Math.abs(dyRaw);
      }
      if(!isHorizontal) return; // vertical drag - let the page scroll normally, don't fight it
      e.preventDefault();
      dx = dxRaw;
      wasDragged = true;
      let next = content._swipeOpenX + dx;
      next = Math.max(0, Math.min(SWIPE_ROW_REVEAL + 20, next)); // clamp, small rubber-band past full reveal
      content.classList.add('swiping');
      content.style.transform = `translateX(${next}px)`;
    });
    function endDrag(){
      if(!dragging) return;
      dragging = false;
      content.classList.remove('swiping');
      if(!isHorizontal) return;
      const next = content._swipeOpenX + dx;
      if(next > SWIPE_ROW_REVEAL * 0.5){
        content.style.transform = `translateX(${SWIPE_ROW_REVEAL}px)`;
        content._swipeOpenX = SWIPE_ROW_REVEAL;
        SWIPE_OPEN_CONTENT = content;
      } else {
        content.style.transform = 'translateX(0)';
        content._swipeOpenX = 0;
        if(SWIPE_OPEN_CONTENT === content) SWIPE_OPEN_CONTENT = null;
      }
    }
    content.addEventListener('pointerup', endDrag);
    content.addEventListener('pointercancel', endDrag);
    content.addEventListener('click', (e)=>{
      if(wasDragged){ wasDragged = false; e.preventDefault(); e.stopPropagation(); return; }
      if(content._swipeOpenX > 0){ closeOpenSwipeRow(); return; } // tapping an already-open row just closes it
      openRecordDetail(content.dataset.recordId);
    });
  });
}
// Triggered by the delete action revealed by the swipe gesture above.
function confirmRemoveRecordFromList(id){
  const r = findRecordById(id);
  closeOpenSwipeRow();
  if(!r) return;
  const msg = LANG==='en'
    ? `Remove "${r.album}" from your collection? It'll disappear from the app even if it's still in your sheet/Excel or Discogs - you can restore it later from Settings > Collection Sync.`
    : `להסיר את "${r.album}" מהאוסף? התקליט ייעלם מהאפליקציה גם אם הוא עדיין בגיליון/אקסל או בדיסקוגס - אפשר לשחזר אותו מאוחר יותר דרך הגדרות > סנכרון אוסף.`;
  if(!confirm(msg)) return;
  removeRecordFromCollection(r);
  saveRecords();
  updateHeader();
  renderBrowseList();
}
function setupCoverLazyLoad(records, selector, rootEl){
  if(coverGridObserver) coverGridObserver.disconnect();
  const byId = {}; records.forEach(r=>{ byId[String(r.id)] = r; });
  coverGridObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const cell = entry.target;
      coverGridObserver.unobserve(cell);
      const r = byId[cell.getAttribute('data-cover-id')];
      if(!r || cell.querySelector('img')) return;
      const badgesHtml = cell.querySelector('.cg-badges') ? cell.querySelector('.cg-badges').outerHTML : '';
      const override = getCoverOverride(r);
      if(override){ cell.innerHTML = badgesHtml + `<img src="${override}" alt="${escapeHtml(r.album)}">`; return; }
      fetchAlbumArtUnified(r.artist, r.album).then(url=>{
        if(!url) return;
        if(document.body.contains(cell)) cell.innerHTML = badgesHtml + `<img src="${url}" alt="${escapeHtml(r.album)}">`;
      });
    });
  }, {root: rootEl || document.getElementById('browseList'), rootMargin:'200px'});
  document.querySelectorAll(selector).forEach(cell=>coverGridObserver.observe(cell));
}
function pressingLabel(r){
  const parts = [];
  if(r.edition) parts.push(r.edition);
  if(r.color) parts.push(r.color);
  if(r.lp_count) parts.push(tf('detail.lpCount', r.lp_count));
  if(r.is_signed) parts.push('✍️ '+trTag('חתום'));
  return parts.join(' · ');
}
function findRecordById(id){
  return RECORDS.find(r => String(r.id) === String(id));
}
function openTagModal(id){
  const r = findRecordById(id);
  if(!r) return;
  editingRecordId = id;
  document.getElementById('tagModalTitle').textContent = `${r.album} — ${r.artist}`;
  document.getElementById('tagModalInput').value = (r.tags||[]).join(', ');
  document.getElementById('tagModalEdition').value = r.edition || '';
  document.getElementById('tagModalColor').value = r.color || '';
  document.getElementById('tagModalLpCount').value = r.lp_count || '';
  document.getElementById('tagModalSigned').checked = !!r.is_signed;
  document.getElementById('tagModal').classList.remove('hidden');
}
function closeTagModal(){ document.getElementById('tagModal').classList.add('hidden'); editingRecordId = null; }
function saveTagModal(){
  const r = findRecordById(editingRecordId);
  if(!r){ closeTagModal(); return; }
  const newTags = document.getElementById('tagModalInput').value.split(',').map(t=>t.trim()).filter(Boolean);
  r.tags = newTags;
  r.edition = document.getElementById('tagModalEdition').value.trim();
  r.color = document.getElementById('tagModalColor').value.trim();
  r.lp_count = document.getElementById('tagModalLpCount').value.trim();
  r.is_signed = document.getElementById('tagModalSigned').checked;
  // persist: if it's a sheet record, update SHEET_RECORDS in place; if local addition, update there
  const inSheet = SHEET_RECORDS.find(x=>String(x.id)===String(r.id));
  if(inSheet){ inSheet.tags = newTags; inSheet.edition = r.edition; inSheet.color = r.color; inSheet.lp_count = r.lp_count; inSheet.is_signed = r.is_signed; }
  const inLocal = LOCAL_ADDITIONS.find(x=>String(x.id)===String(r.id));
  if(inLocal){ inLocal.tags = newTags; inLocal.edition = r.edition; inLocal.color = r.color; inLocal.lp_count = r.lp_count; inLocal.is_signed = r.is_signed; }
  saveRecords();
  closeTagModal();
  renderBrowseList();
}
function renderDetailFavBtn(r){
  const btn = document.getElementById('detailFavBtn');
  if(!btn || !r) return;
  const fav = isFavorite(r);
  btn.textContent = fav ? '⭐' : '☆';
  btn.classList.toggle('active', fav);
}
function updateDetailSpinInfoLine(){
  const el = document.getElementById('detailSpinInfoLine');
  const r = findRecordById(detailRecordId);
  if(!el || !r) return;
  el.textContent = spinInfoText(getPlayInfo(r));
}
function renderDetailRatings(r){
  const box = document.getElementById('detailRatingBox');
  if(!box || !r) return;
  const rt = getRating(r);
  box.innerHTML = renderStarsRow('music', LANG==='en'?'Music 🎵':'מוזיקה 🎵', rt.music, r.id, 'detail')
    + renderStarsRow('pressing', LANG==='en'?'Pressing 💿':'פרסינג 💿', rt.pressing, r.id, 'detail');
}
function toggleExcludeById(id, val, context){
  const r = findRecordById(id);
  if(!r) return;
  setExcluded(r, val);
  if(context==='detail') renderDetailExcludeState(r);
  renderBrowseList();
}
function confirmToggleExcludeById(id, context){
  const r = findRecordById(id);
  if(!r) return;
  const nowExcluded = isExcluded(r);
  if(!nowExcluded){
    if(!confirm(t('modal.neverRecommendConfirm'))) return;
  }
  toggleExcludeById(id, !nowExcluded, context);
}
function renderDetailExcludeState(r){
  const btn = document.getElementById('detailExcludeBtn');
  if(btn) btn.classList.toggle('active', isExcluded(r));
}

/* ---------------- ADD SINGLE ---------------- */
function submitAdd(){
  const artist = document.getElementById('addArtist').value.trim();
  const album = document.getElementById('addAlbum').value.trim();
  if(!artist || !album){ alert(LANG==='en'?'Fill in at least artist and album':'צריך למלא לפחות אמן ואלבום'); return; }
  const rec = tagRecord({
    artist, album,
    type: document.getElementById('addType').value,
    format: document.getElementById('addFormat').value.trim(),
    year: document.getElementById('addYear').value.trim(),
    language: document.getElementById('addLang').value,
    edition: document.getElementById('addEdition').value.trim(),
    color: document.getElementById('addColor').value.trim(),
    signed: document.getElementById('addSigned').checked ? 'כן' : '',
    lpCount: document.getElementById('addLpCount').value.trim(),
  });
  rec.id = 'local_' + Date.now();
  LOCAL_ADDITIONS.push(rec);
  markRecordAdded(rec);
  recombine();
  saveRecords();
  updateHeader();
  const genresDisp = (rec.genres||[rec.genre]).map(g=>trTag(g)).join(', ');
  const tagsDisp = rec.tags.map(tg=>trTag(tg)).join(', ');
  document.getElementById('addResult').innerHTML = LANG==='en' ? `
    <div class="success-box">
      Added and auto-tagged ✅<br>
      <b>${escapeHtml(rec.album)}</b> — ${escapeHtml(genresDisp)}, energy ${rec.energy}/5<br>
      Tags: ${escapeHtml(tagsDisp)}
    </div>` : `
    <div class="success-box">
      נוסף ותויג אוטומטית ✅<br>
      <b>${escapeHtml(rec.album)}</b> — ${escapeHtml(genresDisp)}, אנרגיה ${rec.energy}/5<br>
      תגיות: ${escapeHtml(tagsDisp)}
    </div>`;
  document.getElementById('addArtist').value='';
  document.getElementById('addAlbum').value='';
  document.getElementById('addFormat').value='';
  document.getElementById('addYear').value='';
  document.getElementById('addEdition').value='';
  document.getElementById('addColor').value='';
  document.getElementById('addLpCount').value='';
  document.getElementById('addSigned').checked=false;
}

/* ---------------- WISHLIST (records you'd like to add - accessible only from the collection) ---------------- */
const WISHLIST_KEY = "whats_spinning_wishlist_v1";
let WISHLIST = [];
function loadWishlist(){ try{ const raw = localStorage.getItem(WISHLIST_KEY); if(raw) WISHLIST = JSON.parse(raw); }catch(e){} }
function saveWishlist(){ try{ localStorage.setItem(WISHLIST_KEY, JSON.stringify(WISHLIST)); }catch(e){} }
loadWishlist();
async function fetchItunesMeta(artist, album){
  try{
    const q = encodeURIComponent(`${artist} ${album}`);
    const ctrl = new AbortController();
    const timeout = setTimeout(()=>ctrl.abort(), 6000);
    const res = await fetch(`https://itunes.apple.com/search?term=${q}&entity=album&limit=3`, {signal: ctrl.signal});
    clearTimeout(timeout);
    if(!res.ok) return null;
    const data = await res.json();
    const hit = (data.results||[])[0];
    if(!hit) return null;
    return {
      year: hit.releaseDate ? hit.releaseDate.slice(0,4) : '',
      genre: hit.primaryGenreName || '',
      cover: hit.artworkUrl100 ? hit.artworkUrl100.replace('100x100','600x600') : null,
    };
  }catch(e){ return null; }
}
function toggleWishlistManualForm(){
  const wrap = document.getElementById('wishManualFormWrap');
  if(!wrap) return;
  wrap.classList.toggle('hidden');
}
async function submitWishlist(){
  const artist = document.getElementById('wishArtist').value.trim();
  const album = document.getElementById('wishAlbum').value.trim();
  const edition = document.getElementById('wishEdition').value.trim();
  const color = document.getElementById('wishColor').value.trim();
  const link = document.getElementById('wishLink').value.trim();
  const signed = document.getElementById('wishSigned').checked;
  const resultEl = document.getElementById('wishAddResult');
  if(!artist || !album){ resultEl.innerHTML = `<div class="error-box">${escapeHtml(LANG==='en'?'Fill in at least artist and album':'צריך למלא לפחות אמן ואלבום')}</div>`; return; }
  resultEl.innerHTML = `<div class="hint">${escapeHtml(t('wishlist.fetching'))}</div>`;
  const meta = await fetchItunesMeta(artist, album);
  const tagged = tagRecord({artist, album, type:'', format:'', year: meta?meta.year:'', language:'', edition, color, signed: signed?'כן':''});
  const item = {
    id: 'wish_' + Date.now(), artist, album, edition, color, link, is_signed: signed,
    year: tagged.year, genres: tagged.genres, genre: tagged.genre, tags: tagged.tags,
    cover: meta ? meta.cover : null, addedAt: Date.now(),
  };
  WISHLIST.push(item);
  saveWishlist();
  document.getElementById('wishArtist').value = '';
  document.getElementById('wishAlbum').value = '';
  document.getElementById('wishEdition').value = '';
  document.getElementById('wishColor').value = '';
  document.getElementById('wishLink').value = '';
  document.getElementById('wishSigned').checked = false;
  resultEl.innerHTML = `<div class="success-box">✅</div>`;
  renderWishlistList();
}
function renderWishlistList(){
  const el = document.getElementById('wishlistList');
  if(!el) return;
  if(!WISHLIST.length){ el.innerHTML = `<div class="empty-hint">${escapeHtml(t('wishlist.empty'))}</div>`; return; }
  el.innerHTML = WISHLIST.slice().reverse().map(item=>`
    <div class="wishlist-item">
      ${item.cover ? `<img class="ic" src="${item.cover}" alt="">` : `<div class="ic">💿</div>`}
      <div class="n">${escapeHtml(item.album)}<span class="a">${escapeHtml(item.artist)}${item.year?(' · '+escapeHtml(item.year)):''}${item.edition?(' · '+escapeHtml(item.edition)):''}</span>${item.link?`<a href="${escapeHtml(item.link)}" target="_blank" rel="noopener" class="wishlist-link" onclick="event.stopPropagation()">${escapeHtml(t('wishlist.viewListing'))}</a>`:''}</div>
      <button class="icon-btn" onclick="promoteWishlistItem('${item.id}')" title="Add to collection">✔</button>
      <button class="icon-btn" onclick="removeWishlistItem('${item.id}')" title="Remove">🗑️</button>
    </div>
  `).join('');
}
function promoteWishlistItem(id){
  const idx = WISHLIST.findIndex(w=>w.id===id);
  if(idx<0) return;
  const item = WISHLIST[idx];
  const tagged = tagRecord({artist:item.artist, album:item.album, type:'', format:'', year:item.year, language:'', edition:item.edition, color:item.color, signed:item.is_signed?'כן':''});
  tagged.id = 'local_' + Date.now();
  LOCAL_ADDITIONS.push(tagged);
  markRecordAdded(tagged);
  recombine();
  saveRecords();
  updateHeader();
  WISHLIST.splice(idx,1);
  saveWishlist();
  renderWishlistList();
}
function removeWishlistItem(id){
  WISHLIST = WISHLIST.filter(w=>w.id!==id);
  saveWishlist();
  renderWishlistList();
}

/* ---------------- WISHLIST "YOU MIGHT LIKE" SUGGESTIONS ----------------
   Picks the collection's top artists and looks up their other release-groups on MusicBrainz,
   filters out anything already owned or already wishlisted, and suggests up to 5. Cached for a day
   per top-artist set so re-opening the wishlist screen doesn't re-fetch every time. */
const WISHLIST_SUGGEST_KEY = "whats_spinning_wishlist_suggest_v1";
let WISHLIST_SUGGEST_CACHE = null;
function loadWishlistSuggestCache(){ try{ const raw = localStorage.getItem(WISHLIST_SUGGEST_KEY); if(raw) WISHLIST_SUGGEST_CACHE = JSON.parse(raw); }catch(e){} }
function saveWishlistSuggestCache(){ try{ localStorage.setItem(WISHLIST_SUGGEST_KEY, JSON.stringify(WISHLIST_SUGGEST_CACHE)); }catch(e){} }
loadWishlistSuggestCache();
function topCollectionArtists(n){
  const counts = {};
  RECORDS.forEach(r=>{ splitArtistsForStats(r.artist).forEach(a=>{ counts[a] = (counts[a]||0) + 1; }); });
  return Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,n).map(([name])=>name);
}
function ownedOrWishlistedAlbumsByArtist(artistLower){
  const owned = new Set();
  RECORDS.forEach(r=>{ if(splitArtistsForStats(r.artist).some(a=>a.toLowerCase()===artistLower)) owned.add((r.album||'').toLowerCase().trim()); });
  WISHLIST.forEach(w=>{ if((w.artist||'').toLowerCase().trim()===artistLower) owned.add((w.album||'').toLowerCase().trim()); });
  return owned;
}
async function fetchArtistReleaseGroups(artistName){
  try{
    await mbThrottle();
    const query = `artist:"${artistName.replace(/"/g,'')}" AND (primarytype:album OR primarytype:ep)`;
    const ctrl = new AbortController(); const timeout = setTimeout(()=>ctrl.abort(), 7000);
    const res = await fetch(`https://musicbrainz.org/ws/2/release-group/?query=${encodeURIComponent(query)}&fmt=json&limit=25`, { signal: ctrl.signal, headers: { 'Accept':'application/json' } });
    clearTimeout(timeout);
    if(!res.ok) return [];
    const data = await res.json();
    return (data['release-groups']||[])
      .filter(rg=>rg.title)
      .map(rg=>({ title: rg.title, year: rg['first-release-date'] ? rg['first-release-date'].slice(0,4) : '', mbid: rg.id }));
  }catch(e){ return []; }
}
async function buildWishlistSuggestions(forceRefresh){
  const topArtists = topCollectionArtists(4);
  if(!topArtists.length) return [];
  const artistsKey = topArtists.join('|').toLowerCase();
  if(!forceRefresh && WISHLIST_SUGGEST_CACHE && WISHLIST_SUGGEST_CACHE.artistsKey === artistsKey && (Date.now() - WISHLIST_SUGGEST_CACHE.ts) < 24*3600*1000){
    return WISHLIST_SUGGEST_CACHE.items;
  }
  const byArtist = {};
  for(const artist of topArtists){
    const owned = ownedOrWishlistedAlbumsByArtist(artist.toLowerCase());
    const rgs = await fetchArtistReleaseGroups(artist);
    const seen = new Set();
    byArtist[artist] = rgs.filter(rg=>{
      const key = rg.title.toLowerCase().trim();
      if(owned.has(key) || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  const picked = [];
  for(let round=0; picked.length<5 && round<10; round++){
    let addedAny = false;
    for(const artist of topArtists){
      const list = byArtist[artist]||[];
      if(list[round]){ picked.push({ artist, album:list[round].title, year:list[round].year, mbid:list[round].mbid }); addedAny = true; }
      if(picked.length>=5) break;
    }
    if(!addedAny) break;
  }
  WISHLIST_SUGGEST_CACHE = { ts: Date.now(), artistsKey, items: picked };
  saveWishlistSuggestCache();
  return picked;
}
function renderWishlistSuggestList(){
  const el = document.getElementById('wishSuggestList');
  const card = document.getElementById('wishSuggestCard');
  if(!el || !card) return;
  const items = (WISHLIST_SUGGEST_CACHE && WISHLIST_SUGGEST_CACHE.items) || [];
  if(!items.length){ card.classList.add('hidden'); return; }
  card.classList.remove('hidden');
  el.innerHTML = items.map((s,i)=>`
    <div class="top-rank-row">
      <div class="top-rank-name">${escapeHtml(s.album)}<span class="a"> · ${escapeHtml(s.artist)}${s.year?(' · '+escapeHtml(s.year)):''}</span></div>
      <button class="icon-btn" onclick="addSuggestionToWishlist(${i})" title="Add to wishlist">➕</button>
    </div>`).join('') + `<div class="chart-expand-toggle" onclick="refreshWishlistSuggestions()">${escapeHtml(t('wishlist.suggestRefresh'))}</div>`;
}
async function loadWishlistSuggestions(){
  const el = document.getElementById('wishSuggestList');
  const card = document.getElementById('wishSuggestCard');
  if(!el || !card) return;
  if(WISHLIST_SUGGEST_CACHE && WISHLIST_SUGGEST_CACHE.items && WISHLIST_SUGGEST_CACHE.items.length){
    renderWishlistSuggestList();
    return;
  }
  card.classList.remove('hidden');
  el.innerHTML = `<div class="hint">${escapeHtml(t('wishlist.suggestLoading'))}</div>`;
  const items = await buildWishlistSuggestions(false);
  if(!items.length){ card.classList.add('hidden'); return; }
  renderWishlistSuggestList();
}
async function refreshWishlistSuggestions(){
  const el = document.getElementById('wishSuggestList');
  if(el) el.innerHTML = `<div class="hint">${escapeHtml(t('wishlist.suggestLoading'))}</div>`;
  await buildWishlistSuggestions(true);
  renderWishlistSuggestList();
}
async function addSuggestionToWishlist(idx){
  const items = (WISHLIST_SUGGEST_CACHE && WISHLIST_SUGGEST_CACHE.items) || [];
  const s = items[idx];
  if(!s) return;
  const meta = await fetchItunesMeta(s.artist, s.album);
  const tagged = tagRecord({artist:s.artist, album:s.album, type:'', format:'', year: s.year || (meta?meta.year:''), language:''});
  const item = {
    id: 'wish_' + Date.now(), artist:s.artist, album:s.album, edition:'', color:'', link:'', is_signed:false,
    year: tagged.year, genres: tagged.genres, genre: tagged.genre, tags: tagged.tags,
    cover: meta ? meta.cover : null, addedAt: Date.now(),
  };
  WISHLIST.push(item);
  saveWishlist();
  items.splice(idx,1);
  saveWishlistSuggestCache();
  renderWishlistSuggestList();
  renderWishlistList();
}

/* ---------------- "COMING SOON" / ON-THE-WAY LIST (separate Google Sheet tab, configurable per user) ---------------- */
const DEFAULT_COMING_SOON_SHEET_ID = "";
const DEFAULT_COMING_SOON_TAB = "Coming Soon";
const COMING_SOON_SHEET_ID_KEY = "whats_spinning_coming_soon_sheet_id_v1";
const COMING_SOON_TAB_KEY = "whats_spinning_coming_soon_tab_v1";
let CURRENT_COMING_SOON_SHEET_ID = localStorage.getItem(COMING_SOON_SHEET_ID_KEY) || DEFAULT_COMING_SOON_SHEET_ID;
let CURRENT_COMING_SOON_TAB = localStorage.getItem(COMING_SOON_TAB_KEY) || DEFAULT_COMING_SOON_TAB;
function setComingSoonSheet(sheetInput, tabInput){
  const id = extractSheetId(sheetInput);
  if(id){ CURRENT_COMING_SOON_SHEET_ID = id; try{ localStorage.setItem(COMING_SOON_SHEET_ID_KEY, id); }catch(e){} }
  const tab = (tabInput||'').trim();
  if(tab){ CURRENT_COMING_SOON_TAB = tab; try{ localStorage.setItem(COMING_SOON_TAB_KEY, tab); }catch(e){} }
  return CURRENT_COMING_SOON_SHEET_ID;
}
function saveComingSoonSheetSettings(){
  const sheetVal = document.getElementById('comingSoonSheetInput').value;
  const tabVal = document.getElementById('comingSoonTabInput').value;
  setComingSoonSheet(sheetVal, tabVal || DEFAULT_COMING_SOON_TAB);
  setIncomingSource('sheet');
  renderIncomingList();
}
const INCOMING_SOURCE_KEY = "whats_spinning_incoming_source_v1";
let INCOMING_SOURCE = localStorage.getItem(INCOMING_SOURCE_KEY) || 'sheet';
function setIncomingSource(src){
  INCOMING_SOURCE = src;
  try{ localStorage.setItem(INCOMING_SOURCE_KEY, src); }catch(e){}
}
const INCOMING_UPLOADED_ROWS_KEY = "whats_spinning_incoming_uploaded_rows_v1";
let INCOMING_UPLOADED_ROWS = [];
function loadIncomingUploadedRows(){ try{ const raw = localStorage.getItem(INCOMING_UPLOADED_ROWS_KEY); if(raw) INCOMING_UPLOADED_ROWS = JSON.parse(raw); }catch(e){} }
function saveIncomingUploadedRows(){ try{ localStorage.setItem(INCOMING_UPLOADED_ROWS_KEY, JSON.stringify(INCOMING_UPLOADED_ROWS)); }catch(e){} }
loadIncomingUploadedRows();
const INCOMING_ADDED_KEY = "whats_spinning_incoming_added_v1";
let INCOMING_ADDED = {};
function loadIncomingAdded(){ try{ const raw = localStorage.getItem(INCOMING_ADDED_KEY); if(raw) INCOMING_ADDED = JSON.parse(raw); }catch(e){} }
function saveIncomingAdded(){ try{ localStorage.setItem(INCOMING_ADDED_KEY, JSON.stringify(INCOMING_ADDED)); }catch(e){} }
loadIncomingAdded();
const INCOMING_MANUAL_KEY = "whats_spinning_incoming_manual_v1";
let INCOMING_MANUAL = [];
function loadIncomingManual(){ try{ const raw = localStorage.getItem(INCOMING_MANUAL_KEY); if(raw) INCOMING_MANUAL = JSON.parse(raw); }catch(e){} }
function saveIncomingManual(){ try{ localStorage.setItem(INCOMING_MANUAL_KEY, JSON.stringify(INCOMING_MANUAL)); }catch(e){} }
loadIncomingManual();
function toggleIncomingManualForm(){
  const wrap = document.getElementById('incManualFormWrap');
  if(!wrap) return;
  wrap.classList.toggle('hidden');
}
function submitIncomingManual(){
  const artist = document.getElementById('incArtist').value.trim();
  const album = document.getElementById('incAlbum').value.trim();
  const resultEl = document.getElementById('incManualResult');
  if(!artist || !album){ resultEl.innerHTML = `<div class="error-box">${escapeHtml(LANG==='en'?'Fill in at least artist and album':'צריך למלא לפחות אמן ואלבום')}</div>`; return; }
  const item = {
    id: 'incman_' + Date.now(),
    key: recKeyRaw(artist, album),
    artist, album,
    type: document.getElementById('incType').value,
    format: document.getElementById('incFormat').value.trim(),
    year: document.getElementById('incYear').value.trim(),
    language: document.getElementById('incLang').value,
    edition: document.getElementById('incEdition').value.trim(),
    color: document.getElementById('incColor').value.trim(),
    signed: document.getElementById('incSigned').checked ? 'כן' : '',
    lpCount: document.getElementById('incLpCount').value.trim(),
    notes: document.getElementById('incNotes').value.trim(),
    addedAt: Date.now(),
  };
  INCOMING_MANUAL.push(item);
  saveIncomingManual();
  document.getElementById('incArtist').value = '';
  document.getElementById('incAlbum').value = '';
  document.getElementById('incFormat').value = '';
  document.getElementById('incYear').value = '';
  document.getElementById('incEdition').value = '';
  document.getElementById('incColor').value = '';
  document.getElementById('incLpCount').value = '';
  document.getElementById('incNotes').value = '';
  document.getElementById('incSigned').checked = false;
  resultEl.innerHTML = `<div class="success-box">✅</div>`;
  renderIncomingList();
}
function removeIncomingManual(id){
  INCOMING_MANUAL = INCOMING_MANUAL.filter(x=>String(x.id)!==String(id));
  saveIncomingManual();
  renderIncomingList();
}
let INCOMING_ROWS = null;
function rowsToIncomingItems(rows){
  if(!rows.length) return [];
  const header = rows[0].map(h=>String(h||'').trim());
  const idx = {
    artist: findCol(header, ['אמן','Artist']), album: findCol(header, ['אלבום','Album']),
    type: findCol(header, ['סוג','Type']), format: findCol(header, ['״','"','Format']),
    year: findCol(header, ['שנת הוצאה','Year']), edition: findCol(header, ['מהדורה','Edition']),
    color: findCol(header, ['צבע','Color']), signed: findCol(header, ['חתום','Signed']),
    language: findCol(header, ['שפה','Language']), status: findCol(header, ['סטטוס','Status']),
    place: findCol(header, ['מקום רכישה','Place']), notes: findCol(header, ['הערות','Notes']),
    tracking: findCol(header, ['מעקב','Tracking']),
    lpCount: findCol(header, ['כמות LP','כמות תקליטים','LP Count','LP count','lp count','LP','lp']),
  };
  const out = [];
  for(let i=1;i<rows.length;i++){
    const r = rows[i];
    const artist = String((idx.artist>=0 ? r[idx.artist] : '')||'').trim();
    const album = String((idx.album>=0 ? r[idx.album] : '')||'').trim();
    if(!artist && !album) continue;
    out.push({
      key: recKeyRaw(artist, album), artist, album,
      type: idx.type>=0 ? r[idx.type] : '', format: idx.format>=0 ? r[idx.format] : '',
      year: idx.year>=0 ? r[idx.year] : '', edition: idx.edition>=0 ? r[idx.edition] : '',
      color: idx.color>=0 ? r[idx.color] : '', signed: idx.signed>=0 ? r[idx.signed] : '',
      language: idx.language>=0 ? r[idx.language] : '', status: idx.status>=0 ? r[idx.status] : '',
      place: idx.place>=0 ? r[idx.place] : '', notes: idx.notes>=0 ? r[idx.notes] : '',
      tracking: idx.tracking>=0 ? r[idx.tracking] : '',
      lpCount: idx.lpCount>=0 ? r[idx.lpCount] : '',
    });
  }
  return out;
}
async function fetchIncomingRows(){
  const url = `https://docs.google.com/spreadsheets/d/${CURRENT_COMING_SOON_SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(CURRENT_COMING_SOON_TAB)}&_=${Date.now()}`;
  const res = await fetch(url, {cache:'no-store'});
  if(!res.ok) throw new Error('http-'+res.status);
  const csvText = await res.text();
  if(csvText.trim().startsWith('<')) throw new Error('no-access');
  const rows = parseCsv(csvText);
  return rowsToIncomingItems(rows);
}
async function handleIncomingExcelUpload(event){
  const file = event.target.files[0];
  if(!file) return;
  const statusEl = document.getElementById('comingSoonUploadStatus');
  const resultEl = document.getElementById('comingSoonUploadResult');
  statusEl.textContent = LANG==='en' ? 'Loading…' : 'טוען…';
  resultEl.innerHTML = '';
  try{
    const rows = await readUploadedFile(file);
    const items = rowsToIncomingItems(rows);
    INCOMING_UPLOADED_ROWS = items;
    saveIncomingUploadedRows();
    setIncomingSource('upload');
    statusEl.textContent = '';
    resultEl.innerHTML = items.length
      ? `<div class="success-box">${escapeHtml(tf('incoming.uploadSuccess', items.length))}</div>`
      : `<div class="error-box">${escapeHtml(t('incoming.uploadEmpty'))}</div>`;
    renderIncomingList();
  }catch(err){
    statusEl.textContent = '';
    resultEl.innerHTML = `<div class="error-box">${LANG==='en' ? `Couldn't read the file. (Error: ${escapeHtml(err.message)})` : `לא הצלחתי לקרוא את הקובץ. (שגיאה: ${escapeHtml(err.message)})`}</div>`;
  }
  event.target.value = '';
}
async function renderIncomingList(){
  const statusEl = document.getElementById('incomingStatus');
  const el = document.getElementById('incomingList');
  const sheetInputEl = document.getElementById('comingSoonSheetInput');
  const tabInputEl = document.getElementById('comingSoonTabInput');
  // Only reflects a value the user actually saved (via localStorage) - there's no personal
  // default baked in anymore, so a fresh install shows these fields genuinely empty.
  if(sheetInputEl && !sheetInputEl.value) sheetInputEl.value = CURRENT_COMING_SOON_SHEET_ID;
  if(tabInputEl && !tabInputEl.value) tabInputEl.value = CURRENT_COMING_SOON_TAB;
  let sheetError = null;
  if(INCOMING_SOURCE === 'upload'){
    INCOMING_ROWS = INCOMING_UPLOADED_ROWS || [];
    statusEl.textContent = '';
  } else if(!CURRENT_COMING_SOON_SHEET_ID){
    // nothing configured yet (no personal default baked in) - show the normal empty state
    // rather than attempting a fetch with a blank sheet id.
    INCOMING_ROWS = [];
    statusEl.textContent = '';
  } else {
    statusEl.textContent = t('incoming.loading');
    el.innerHTML = '';
    try{ INCOMING_ROWS = await fetchIncomingRows(); }
    catch(err){ INCOMING_ROWS = INCOMING_ROWS || []; sheetError = err; }
    statusEl.textContent = sheetError ? escapeHtml(t('incoming.error').replace('__ERR__', sheetError.message)) : '';
  }
  const combined = [
    ...(INCOMING_ROWS||[]).map((row,i)=>Object.assign({}, row, {_source:'sheet', _ref:String(i)})),
    ...INCOMING_MANUAL.map(item=>Object.assign({}, item, {_source:'manual', _ref:String(item.id)})),
  ];
  if(!combined.length){ el.innerHTML = `<div class="empty-hint">${escapeHtml(t('incoming.empty'))}</div>`; return; }
  el.innerHTML = combined.map(row=>{
    const already = !!INCOMING_ADDED[row.key];
    const alreadyInCollection = RECORDS.some(rec=>recKey(rec)===row.key);
    const statusBits = [row.status, row.notes].filter(Boolean).map(escapeHtml).join(' · ');
    const manualBadge = row._source==='manual' ? `<span class="tag muted" style="flex-shrink:0;">${escapeHtml(t('incoming.manualBadge'))}</span>` : '';
    const removeBtn = row._source==='manual' ? `<button class="icon-btn" onclick="removeIncomingManual('${row._ref}')" title="Remove">🗑️</button>` : '';
    return `
    <div class="wishlist-item">
      <div class="ic">💿</div>
      <div class="n">${escapeHtml(row.album)}<span class="a">${escapeHtml(row.artist)}${row.edition?(' · '+escapeHtml(row.edition)):''}${statusBits?(' · '+statusBits):''}</span></div>
      ${manualBadge}
      ${(already || alreadyInCollection)
        ? `<span class="tag" style="flex-shrink:0;">${escapeHtml(t('incoming.added'))}</span>`
        : `<button class="icon-btn" onclick="promoteIncomingItem('${row._source}','${row._ref}')" title="Add to collection">✔</button>`}
      ${removeBtn}
    </div>
  `;}).join('');
}
function promoteIncomingItem(source, ref){
  let row;
  if(source === 'sheet') row = INCOMING_ROWS && INCOMING_ROWS[parseInt(ref,10)];
  else row = INCOMING_MANUAL.find(x=>String(x.id)===String(ref));
  if(!row) return;
  const tagged = tagRecord({artist:row.artist, album:row.album, type:row.type, format:row.format, year:row.year, language:row.language, edition:row.edition, color:row.color, signed:row.signed, lpCount:row.lpCount});
  tagged.id = 'local_' + Date.now();
  LOCAL_ADDITIONS.push(tagged);
  markRecordAdded(tagged);
  recombine();
  saveRecords();
  updateHeader();
  INCOMING_ADDED[row.key] = true;
  saveIncomingAdded();
  if(source === 'manual'){
    INCOMING_MANUAL = INCOMING_MANUAL.filter(x=>String(x.id)!==String(row.id));
    saveIncomingManual();
  }
  renderIncomingList();
}

/* ---------------- PRIZES / ACHIEVEMENTS ---------------- */
function allPrizeDefs(){
  return [...TIERED_PRIZES, ...ONETIME_PRIZES, ...FANDOM_PRIZES];
}
function getPrizeDef(id){
  return allPrizeDefs().find(p=>p.id===id);
}
function tierFromCount(count, thresholds){
  let tierIdx = -1;
  for(let i=0;i<thresholds.length;i++){ if(count >= thresholds[i]) tierIdx = i; }
  return {
    count, tierIdx,
    tierName: tierIdx>=0 ? PRIZE_TIER_NAMES[tierIdx] : 'gray',
    nextThreshold: tierIdx+1 < thresholds.length ? thresholds[tierIdx+1] : null,
    prevThreshold: tierIdx>=0 ? thresholds[tierIdx] : 0,
  };
}

/* ---------------- OVER THE RAINBOW (rainbow flag challenge) ----------------
   BUGFIX: vinyl colors are almost never written as a plain "red"/"blue" - collectors write things
   like "purple swirl", "ruby red splatter", "translucent emerald", "בורדו עם נצנצים" etc. The old
   word list only had the single base color name per language, so most real-world entries never
   matched. This expands each bucket with the common shade/marketing names (splatter, swirl, "with
   X" etc. are just modifiers around the base color word and already matched once the base word is
   present) in both English and Hebrew, and adds a hidden per-record catalog (RECORD_COLOR_CATALOG)
   that classifies every record's color text once and caches the result, instead of re-scanning the
   raw string on every progress calculation. */
const PRIDE_COLORS = ['red','orange','yellow','green','blue','purple'];
const PRIDE_COLOR_WORDS = {
  red: ['red','ruby','wine','maroon','burgundy','crimson','cherry','scarlet','garnet','blood',
        'אדום','אדמדם','בורדו','יין','דובדבן','אודם'],
  orange: ['orange','amber','rust','tangerine','copper','sunset','apricot','peach',
           'כתום','ענבר','חלודה','משמש','אפרסק'],
  yellow: ['yellow','gold','golden','lemon','mustard','banana','honey',
           'צהוב','זהב','זהוב','לימון','חרדל','דבש'],
  green: ['green','emerald','lime','olive','mint','forest','army','jade','moss',
          'ירוק','אזמרגד','ליים','זית','מנטה','יערני'],
  blue: ['blue','navy','sky','teal','cyan','azure','cobalt','sapphire','turquoise','royal','denim','ocean',
         'כחול','תכלת','נייבי','טורקיז','כחלחל'],
  purple: ['purple','violet','lavender','lilac','plum','magenta','amethyst','grape','orchid',
           'סגול','לילך','סגלגל','חציל'],
};
const PRIDE_COLOR_HEX = { red:'#ff5c5c', orange:'#ff9f43', yellow:'#ffd93d', green:'#4ade80', blue:'#4aa8ff', purple:'#b088ff' };
const PRIDE_THRESHOLD = 10;
/* Hidden catalog: colorText -> array of matched PRIDE_COLORS, computed once and cached. */
const RECORD_COLOR_CATALOG = new Map();
function colorMatchesRainbow(colorText, c){
  const s = (colorText||'').toLowerCase().trim();
  if(!s) return false;
  if(!RECORD_COLOR_CATALOG.has(s)){
    const matches = PRIDE_COLORS.filter(pc => PRIDE_COLOR_WORDS[pc].some(w=>s.includes(w)));
    RECORD_COLOR_CATALOG.set(s, matches);
  }
  return RECORD_COLOR_CATALOG.get(s).includes(c);
}
function computePrideProgress(){
  const recByKey = {};
  RECORDS.forEach(r=>{ recByKey[recKey(r)] = r; });
  const perColor = {};
  PRIDE_COLORS.forEach(c=>{ perColor[c] = new Set(); });
  const seenKeys = new Set();
  SPIN_EVENTS.forEach(e=>{
    if(seenKeys.has(e.key)) return;
    const r = recByKey[e.key];
    if(!r || !r.color) return;
    let matchedAny = false;
    PRIDE_COLORS.forEach(c=>{
      if(colorMatchesRainbow(r.color, c)){ perColor[c].add(e.key); matchedAny = true; }
    });
    if(matchedAny) seenKeys.add(e.key);
  });
  const counts = {}; const collected = [];
  PRIDE_COLORS.forEach(c=>{
    counts[c] = perColor[c].size;
    if(counts[c] >= PRIDE_THRESHOLD) collected.push(c);
  });
  return { counts, collected };
}
function renderFlagBandsHtml(collected){
  // The flag is built from 6 pre-cropped horizontal bands (red/orange/yellow/green/blue/purple).
  // Each band is shown either in full color (if that color is unlocked) or gray (locked),
  // stacked with no gaps - this lets ANY combination of unlocked colors render correctly,
  // instead of needing a pre-rendered image for every one of the 64 possible combos.
  if(typeof PRIDE_FLAG_BANDS === 'undefined') return '';
  return PRIDE_COLORS.map(c=>{
    const b = PRIDE_FLAG_BANDS[c];
    if(!b) return '';
    const src = collected.includes(c) ? b.color : b.gray;
    return `<img src="${src}" alt="">`;
  }).join('');
}
function renderPrideCardHtml(){
  const progress = computePrideProgress();
  const bars = PRIDE_COLORS.map(c=>{
    const cnt = progress.counts[c]||0;
    const done = cnt >= PRIDE_THRESHOLD;
    const barPart = done
      ? `<span class="pride-bar-done">✓ ${escapeHtml(t('prize.pride.done'))}</span>`
      : `<div class="pride-bar-track"><div class="pride-bar-fill" style="width:${Math.min(100, Math.round(cnt/PRIDE_THRESHOLD*100))}%;background:${PRIDE_COLOR_HEX[c]}"></div></div>
         <span class="pride-bar-count">${cnt}/${PRIDE_THRESHOLD}</span>`;
    return `<div class="pride-bar-row">
      <span class="pride-bar-label">${escapeHtml(t('prize.pride.'+c))}</span>
      ${barPart}
    </div>`;
  }).join('');
  return `<div class="card pride-card">
    <div class="qtext pride-card-title">🏳️‍🌈 ${escapeHtml(t('prize.pride.title'))}</div>
    <div class="hint" style="margin-bottom:10px;">${escapeHtml(t('prize.pride.hint'))}</div>
    <div class="pride-body">
      <div class="pride-bars">${bars}</div>
      <div class="pride-flag-wrap pride-flag-stack" onclick="openPrideModal()">${renderFlagBandsHtml(progress.collected)}</div>
    </div>
  </div>`;
}
function openPrideModal(){
  const progress = computePrideProgress();
  document.getElementById('prizeModalImg').classList.add('hidden');
  const stack = document.getElementById('prizeModalFlagStack');
  stack.classList.remove('hidden');
  stack.innerHTML = renderFlagBandsHtml(progress.collected);
  document.getElementById('prizeModalTitle').textContent = t('prize.pride.title');
  document.getElementById('prizeModalBody').innerHTML = `<div class="prize-modal-desc">${escapeHtml(tf('prize.pride.desc', progress.collected.length, PRIDE_COLORS.length))}</div>`;
  document.getElementById('prizeModal').classList.remove('hidden');
}
function computeAllPrizeProgress(){
  const recByKey = {};
  RECORDS.forEach(r=>{ recByKey[recKey(r)] = r; });

  const spunKeys = new Set();
  const languageSet = new Set();
  const decadeSpinCounts = {};
  const genreSpinCounts = { pop:0, rock:0, folk:0, rnb:0, jazz:0 };
  const formatSpinCounts = {};
  let soundtrackSpinCount = 0;
  let beforeSeventiesSpinCount = 0;
  let currentYearSpinCount = 0;
  const nowYear = new Date().getFullYear();
  const artistDistinctRecords = {};
  const artistSpinCounts = {};
  const artistDecadeSets = {};
  const artistDisplayNames = {};
  const onetimeWon = { lover:false, christmas:false, sunny:false, midnight:false, sunrise:false, goldenhour:false, firstListen:false, loudAndProud:false, emotionalDamage:false };
  const dayRecordSets = {};
  const heartbreakSpins = []; // {ts, key} for emotional_damage rolling-week check
  const firstSpinTsByKey = {};

  SPIN_EVENTS.forEach(e=>{
    const r = recByKey[e.key];
    if(!r) return;
    spunKeys.add(e.key);
    if(r.language){
      String(r.language).split(',').map(s=>s.trim().toLowerCase()).filter(Boolean).forEach(l=>languageSet.add(l));
    }
    const y = yearOf(r);
    if(y!=null){
      const ds = Math.floor(y/10)*10;
      decadeSpinCounts[ds] = (decadeSpinCounts[ds]||0)+1;
      if(y < 1970) beforeSeventiesSpinCount++;
      if(y === nowYear) currentYearSpinCount++;
      splitArtists(r.artist).forEach(a=>{
        const artistLower = a.toLowerCase();
        if(!artistDecadeSets[artistLower]) artistDecadeSets[artistLower] = new Set();
        artistDecadeSets[artistLower].add(ds);
        if(!artistDisplayNames[artistLower]) artistDisplayNames[artistLower] = a;
      });
    }
    const genreStr = (r.genres||[r.genre]).filter(Boolean).join(' ').toLowerCase();
    if(genreStr.includes('pop')) genreSpinCounts.pop++;
    if(genreStr.includes('rock')) genreSpinCounts.rock++;
    if(genreStr.includes('folk')) genreSpinCounts.folk++;
    if(genreStr.includes('r&b') || genreStr.includes('soul')) genreSpinCounts.rnb++;
    if(genreStr.includes('jazz') || genreStr.includes('blues') || genreStr.includes('bossa nova')) genreSpinCounts.jazz++;
    if(r.is_soundtrack) soundtrackSpinCount++;
    const fmt = (r.format||'').trim();
    if(fmt) formatSpinCounts[fmt] = (formatSpinCounts[fmt]||0)+1;

    splitArtists(r.artist).forEach(a=>{
      const artistLower = a.toLowerCase();
      if(!artistDistinctRecords[artistLower]) artistDistinctRecords[artistLower] = new Set();
      artistDistinctRecords[artistLower].add(e.key);
      artistSpinCounts[artistLower] = (artistSpinCounts[artistLower]||0) + 1;
      if(!artistDisplayNames[artistLower]) artistDisplayNames[artistLower] = a;
    });

    const d = new Date(e.ts);
    const month = d.getMonth()+1, day = d.getDate();
    const tags = r.tags || [];
    if(month===2 && day===14 && tags.includes('רומנטי')) onetimeWon.lover = true;
    if(month===12 && day===25 && r.is_holiday) onetimeWon.christmas = true;
    if((month===7 || month===8) && tags.includes('אלבום קיץ')) onetimeWon.sunny = true;
    if(month===6 && tags.includes('להט״בי')) onetimeWon.loudAndProud = true;
    if(tags.includes('שברון לב')) heartbreakSpins.push({ts:e.ts, key:e.key});
    const hour = d.getHours();
    if(hour===23 || hour===0) onetimeWon.midnight = true;
    if(hour>=6 && hour<8) onetimeWon.sunrise = true;
    if(hour>=17 && hour<19) onetimeWon.goldenhour = true;
    const dayKey = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate();
    if(!dayRecordSets[dayKey]) dayRecordSets[dayKey] = new Set();
    dayRecordSets[dayKey].add(e.key);
    if(!firstSpinTsByKey[e.key] || e.ts < firstSpinTsByKey[e.key]) firstSpinTsByKey[e.key] = e.ts;
  });
  // First Listen: a record was added to the collection and its very first spin happened
  // within 15 minutes of being added. Reads from RECORD_ADDED_AT (see its definition above) rather
  // than a field on the record itself, since sheet/Excel-sourced records are rebuilt from scratch
  // on every sync and would lose an inline field.
  RECORDS.forEach(r=>{
    const k = recKey(r);
    const addedAt = RECORD_ADDED_AT[k];
    if(addedAt == null) return;
    const firstTs = firstSpinTsByKey[k];
    if(firstTs != null && firstTs >= addedAt && (firstTs - addedAt) <= 15*60*1000){
      onetimeWon.firstListen = true;
    }
  });
  // Emotional Damage: 5 distinct heartbreak-tagged records spun within any rolling 7-day window.
  {
    const sorted = heartbreakSpins.slice().sort((a,b)=>a.ts-b.ts);
    const WEEK_MS = 7*24*60*60*1000;
    let start = 0;
    const windowKeys = [];
    for(let end=0; end<sorted.length; end++){
      windowKeys.push(sorted[end].key);
      while(sorted[end].ts - sorted[start].ts > WEEK_MS){ windowKeys.shift(); start++; }
      if(new Set(windowKeys).size >= 5){ onetimeWon.emotionalDamage = true; break; }
    }
  }
  // Vinyl Vibes: longest streak of consecutive days with at least one spin.
  let longestStreak = 0;
  {
    const dayNums = Object.keys(dayRecordSets).map(dk=>{
      const [y,m,dd] = dk.split('-').map(Number);
      return Math.round(new Date(y, m, dd).getTime() / (24*60*60*1000));
    }).sort((a,b)=>a-b);
    let cur = 0, prev = null;
    dayNums.forEach(n=>{
      cur = (prev !== null && n === prev+1) ? cur+1 : 1;
      if(cur > longestStreak) longestStreak = cur;
      prev = n;
    });
  }
  let maxArtistDecadeSpan = 0;
  let maxArtistDecadeSpanArtist = '';
  Object.keys(artistDecadeSets).forEach(al=>{
    const s = artistDecadeSets[al];
    if(s.size > maxArtistDecadeSpan){ maxArtistDecadeSpan = s.size; maxArtistDecadeSpanArtist = artistDisplayNames[al] || al; }
  });

  // most-played record & most-played artist overall (used by Era Hopper / Obsession-family prizes
  // to surface WHICH artist/album is currently being tracked, not just a bare count)
  let mostPlayedRecordKey = null, mostPlayedRecordCount = 0;
  Object.keys(PLAY_LOG||{}).forEach(k=>{
    const cnt = (PLAY_LOG[k]||{}).count || 0;
    if(cnt > mostPlayedRecordCount){ mostPlayedRecordCount = cnt; mostPlayedRecordKey = k; }
  });
  const mostPlayedRecord = mostPlayedRecordKey ? recByKey[mostPlayedRecordKey] : null;
  // Artist Obsession skips any artist already covered by a dedicated fandom prize (Swiftie, etc.)
  const fandomArtists = new Set();
  (typeof FANDOM_PRIZES !== 'undefined' ? FANDOM_PRIZES : []).forEach(fp=>{
    (fp.artistMatch||[]).forEach(a=>fandomArtists.add(a.toLowerCase()));
  });
  let mostPlayedArtistLower = '', mostPlayedArtistCount = 0;
  Object.keys(artistSpinCounts).forEach(al=>{
    if(fandomArtists.has(al)) return;
    if(artistSpinCounts[al] > mostPlayedArtistCount){ mostPlayedArtistCount = artistSpinCounts[al]; mostPlayedArtistLower = al; }
  });
  const mostPlayedArtistName = mostPlayedArtistLower ? (artistDisplayNames[mostPlayedArtistLower] || mostPlayedArtistLower) : '';
  let maxJamSessionCount = 0;
  Object.keys(dayRecordSets).forEach(dk=>{ if(dayRecordSets[dk].size > maxJamSessionCount) maxJamSessionCount = dayRecordSets[dk].size; });

  const progress = {};
  TIERED_PRIZES.forEach(p=>{
    let count = 0;
    if(p.metric==='records') count = spunKeys.size;
    else if(p.metric==='languages') count = languageSet.size;
    else if(p.metric==='decade') count = decadeSpinCounts[p.decadeStart] || 0;
    else if(p.metric==='beforeDecade') count = beforeSeventiesSpinCount;
    else if(p.metric==='currentYear') count = currentYearSpinCount;
    else if(p.metric==='artistDecadeSpan') count = maxArtistDecadeSpan;
    else if(p.metric==='format') count = formatSpinCounts[p.formatKey] || 0;
    else if(p.metric==='genre') count = genreSpinCounts[p.genreKey] || 0;
    else if(p.metric==='soundtrack') count = soundtrackSpinCount;
    else if(p.metric==='albumObsession') count = mostPlayedRecordCount;
    else if(p.metric==='artistObsession') count = mostPlayedArtistCount;
    else if(p.metric==='jamSession') count = maxJamSessionCount;
    else if(p.metric==='micDrop') count = RECORDS.length;
    else if(p.metric==='vinylVibesStreak') count = longestStreak;
    progress[p.id] = tierFromCount(count, p.thresholds);
    if(p.metric==='artistDecadeSpan') progress[p.id].artistName = maxArtistDecadeSpanArtist;
    else if(p.metric==='albumObsession') progress[p.id].albumName = mostPlayedRecord ? `${mostPlayedRecord.artist} – ${mostPlayedRecord.album}` : '';
    else if(p.metric==='artistObsession') progress[p.id].artistName = mostPlayedArtistName;
  });
  ONETIME_PRIZES.forEach(p=>{
    progress[p.id] = { won: !!onetimeWon[p.checkKey] };
  });
  FANDOM_PRIZES.forEach(p=>{
    // Fandom prizes track total spins of that artist overall - repeated spins of the same
    // record all count (unlike the tiered prizes, which require distinct records).
    let spinCount = 0;
    (p.artistMatch||[]).forEach(am=>{
      const c = artistSpinCounts[am.toLowerCase()];
      if(c) spinCount = Math.max(spinCount, c);
    });
    progress[p.id] = { won: spinCount >= FANDOM_THRESHOLD, count: spinCount, threshold: FANDOM_THRESHOLD };
  });
  return progress;
}

const PRIZE_STATE_KEY = "whats_spinning_prize_state_v1";
let PRIZE_STATE = {};
function loadPrizeState(){ try{ const raw = localStorage.getItem(PRIZE_STATE_KEY); if(raw) PRIZE_STATE = JSON.parse(raw); }catch(e){} }
function savePrizeState(){ try{ localStorage.setItem(PRIZE_STATE_KEY, JSON.stringify(PRIZE_STATE)); }catch(e){} }
loadPrizeState();
function refreshPrizeStateSilently(){
  const progress = computeAllPrizeProgress();
  Object.keys(progress).forEach(id=>{
    const p = progress[id];
    PRIZE_STATE[id] = ('tierIdx' in p) ? {tierIdx:p.tierIdx} : {won:!!p.won};
  });
  savePrizeState();
}
function initPrizeStateIfNeeded(){
  if(Object.keys(PRIZE_STATE).length) return;
  refreshPrizeStateSilently();
}
initPrizeStateIfNeeded();
function checkPrizesAndNotify(){
  const progress = computeAllPrizeProgress();
  const newlyWon = [];
  Object.keys(progress).forEach(id=>{
    const p = progress[id];
    const prev = PRIZE_STATE[id];
    if('tierIdx' in p){
      const prevTier = prev && ('tierIdx' in prev) ? prev.tierIdx : -1;
      if(p.tierIdx > prevTier) newlyWon.push({id, tierName:p.tierName});
      PRIZE_STATE[id] = {tierIdx: p.tierIdx};
    } else {
      const prevWon = prev ? !!prev.won : false;
      if(p.won && !prevWon) newlyWon.push({id, tierName:'pink'});
      PRIZE_STATE[id] = {won: !!p.won};
    }
  });
  savePrizeState();
  newlyWon.forEach(w=>showPrizeWonToast(w.id, w.tierName));
  if(newlyWon.length) renderPrizesScreenIfActive();
  return newlyWon;
}
function renderPrizesScreenIfActive(){
  const screen = document.getElementById('screen-prizes');
  if(screen && screen.classList.contains('active')) renderPrizesScreen();
}
const TIER_LABEL = {
  he: {bronze:'ארד', silver:'כסף', gold:'זהב', pink:'ורוד', gray:''},
  en: {bronze:'Bronze', silver:'Silver', gold:'Gold', pink:'Pink', gray:''},
};
function getPrizeImageSrc(prize, tierName){
  const imgs = PRIZE_IMAGES[prize.imgKey];
  if(!imgs) return '';
  return imgs[tierName] || imgs['gray'] || '';
}
function prizeTitle(prize){ return LANG==='en' ? prize.titleEn : prize.titleHe; }
function showPrizeWonToast(id, tierName){
  const prize = getPrizeDef(id);
  if(!prize) return;
  const isTiered = TIERED_PRIZES.includes(prize);
  const tierLabel = isTiered ? ` (${TIER_LABEL[LANG==='en'?'en':'he'][tierName]})` : '';
  const title = prizeTitle(prize) + tierLabel;
  let desc = '';
  if(isTiered){
    const progress = computeAllPrizeProgress()[id];
    desc = LANG==='en' ? prize.descEn(progress.count, progress.artistName||progress.albumName||'') : prize.descHe(progress.count, progress.artistName||progress.albumName||'');
  } else {
    desc = LANG==='en' ? prize.descEn : prize.descHe;
  }
  const img = getPrizeImageSrc(prize, tierName);
  const el = document.createElement('div');
  el.className = 'prize-toast';
  el.innerHTML = `
    <img src="${img}" alt="">
    <div class="prize-toast-body">
      <div class="prize-toast-title">${escapeHtml(tf('prize.toastTitle', title))}</div>
      <div class="prize-toast-desc">${escapeHtml(desc)}</div>
      <div class="prize-toast-cta" onclick="closePrizeToast(this.closest('.prize-toast'));showScreen('prizes')">${escapeHtml(t('prize.toastCta'))}</div>
    </div>
    <button class="prize-toast-close" onclick="closePrizeToast(this.closest('.prize-toast'))">✕</button>
  `;
  let layer = document.getElementById('prizeToastLayer');
  if(!layer){
    layer = document.createElement('div');
    layer.id = 'prizeToastLayer';
    document.body.appendChild(layer);
  }
  layer.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('show'));
  setTimeout(()=>closePrizeToast(el), 7000);
}
function closePrizeToast(el){
  if(!el || !el.parentNode) return;
  el.classList.remove('show');
  setTimeout(()=>{ if(el.parentNode) el.parentNode.removeChild(el); }, 300);
}
function renderPrizeTiles(prizes, progress){
  return prizes.map(p=>{
    const prog = progress[p.id];
    const tierName = ('tierIdx' in prog) ? prog.tierName : (prog.won ? 'pink' : 'gray');
    const img = getPrizeImageSrc(p, tierName);
    return `<div class="prize-tile" onclick="openPrizeModal('${p.id}')">
      <img src="${img}" alt="${escapeHtml(prizeTitle(p))}">
      <div class="prize-tile-label">${escapeHtml(prizeTitle(p))}</div>
    </div>`;
  }).join('');
}
function renderPrizesScreen(){
  const el = document.getElementById('prizesGrid');
  if(!el) return;
  const progress = computeAllPrizeProgress();
  const sectionOf = p => p.section || (p.metric==='genre'||p.metric==='soundtrack' ? 'genres' : p.metric==='decade' ? 'decades' : 'general');
  const decadePrizes = TIERED_PRIZES.filter(p=>sectionOf(p)==='decades');
  const genrePrizes = TIERED_PRIZES.filter(p=>sectionOf(p)==='genres');
  const generalPrizes = TIERED_PRIZES.filter(p=>sectionOf(p)==='general');
  const allTiles =
    renderPrizeTiles(generalPrizes, progress) +
    renderPrizeTiles(genrePrizes, progress) +
    renderPrizeTiles(decadePrizes, progress) +
    renderPrizeTiles(ONETIME_PRIZES, progress) +
    renderPrizeTiles(FANDOM_PRIZES, progress);
  el.innerHTML = `<div class="prize-grid">${allTiles}</div>` + renderPrideCardHtml();
}
function openPrizeModal(id){
  const prize = getPrizeDef(id);
  if(!prize) return;
  document.getElementById('prizeModalImg').classList.remove('hidden');
  const flagStack = document.getElementById('prizeModalFlagStack');
  flagStack.classList.add('hidden');
  flagStack.innerHTML = '';
  const progress = computeAllPrizeProgress()[id];
  const isTiered = TIERED_PRIZES.includes(prize);
  const isFandom = FANDOM_PRIZES.includes(prize);
  let tierName, bodyHtml;
  if(isTiered){
    tierName = progress.tierName;
    const barPct = progress.nextThreshold
      ? Math.min(100, Math.round(((progress.count - (progress.tierIdx>=0?0:0)) / progress.nextThreshold) * 100))
      : 100;
    const nextLine = progress.nextThreshold
      ? escapeHtml(tf('prize.progressToNext', progress.count, progress.nextThreshold))
      : escapeHtml(t('prize.maxedOut'));
    const descText = LANG==='en' ? prize.descEn(progress.count, progress.artistName||progress.albumName||'') : prize.descHe(progress.count, progress.artistName||progress.albumName||'');
    bodyHtml = `
      <div class="prize-modal-desc">${escapeHtml(descText)}</div>
      <div class="prize-modal-progress-track"><div class="prize-modal-progress-fill" style="width:${barPct}%"></div></div>
      <div class="prize-modal-progress-label">${nextLine}</div>
    `;
  } else if(isFandom){
    tierName = progress.won ? 'pink' : 'gray';
    const barPct = Math.min(100, Math.round((progress.count / progress.threshold) * 100));
    const nextLine = progress.won ? escapeHtml(t('prize.maxedOut')) : escapeHtml(tf('prize.progressToNext', progress.count, progress.threshold));
    bodyHtml = `
      <div class="prize-modal-desc">${escapeHtml(tf('prize.fandomDesc', prizeTitle(prize), prize.artistDisplay||''))}</div>
      <div class="prize-modal-progress-track"><div class="prize-modal-progress-fill" style="width:${barPct}%"></div></div>
      <div class="prize-modal-progress-label">${nextLine}</div>
    `;
  } else {
    tierName = progress.won ? 'pink' : 'gray';
    const descText = LANG==='en' ? prize.descEn : prize.descHe;
    bodyHtml = `
      <div class="prize-modal-desc">${escapeHtml(descText)}</div>
      <div class="prize-modal-progress-label">${escapeHtml(progress.won ? t('prize.wonLabel') : t('prize.notWonLabel'))}</div>
    `;
  }
  const img = getPrizeImageSrc(prize, tierName);
  document.getElementById('prizeModalImg').src = img;
  document.getElementById('prizeModalTitle').textContent = prizeTitle(prize);
  document.getElementById('prizeModalBody').innerHTML = bodyHtml;
  document.getElementById('prizeModal').classList.remove('hidden');
}
function closePrizeModal(){ document.getElementById('prizeModal').classList.add('hidden'); }

/* ---------------- SPARKLE LAYER ---------------- */
function initSparkles(){
  const layer = document.getElementById('sparkleLayer');
  if(!layer) return;
  const glyphs = ['✨','💖','🎵','⭐','💫','🎶'];
  const n = 22;
  let html = '';
  for(let i=0;i<n;i++){
    const g = glyphs[Math.floor(Math.random()*glyphs.length)];
    const left = Math.random()*100;
    const top = Math.random()*100;
    const size = 10 + Math.random()*14;
    const delay = (Math.random()*4).toFixed(2);
    const dur = (2.6 + Math.random()*2.4).toFixed(2);
    html += `<span class="sparkle" style="left:${left}%;top:${top}%;font-size:${size}px;animation-delay:${delay}s;animation-duration:${dur}s;">${g}</span>`;
  }
  layer.innerHTML = html;
}
initSparkles();

/* ---------------- BOOT ---------------- */
document.getElementById('sheetIdInput').value = CURRENT_SHEET_ID;
// BUGFIX (iPhone template download): iOS Safari doesn't reliably honor the `download` attribute on
// an <a> whose href is a data: URI - tapping it just navigates in place (often showing the raw
// base64/binary as garbled text) instead of prompting to save the file. This is a long-standing
// WebKit quirk, unrelated to file size. Converting to a Blob + object URL fixes it: iOS Safari opens
// Blob URLs in Quick Look with a Share > "Save to Files" option, which is the standard way to
// download a file on iOS (there's no universal Downloads folder there like on desktop).
function dataUriToBlob(dataUri){
  const commaIdx = dataUri.indexOf(',');
  const header = dataUri.slice(0, commaIdx);
  const base64 = dataUri.slice(commaIdx + 1);
  const mimeMatch = header.match(/^data:([^;]+);base64$/);
  const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for(let i=0;i<binary.length;i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], {type: mime});
}
try{
  document.getElementById('templateLink').href = URL.createObjectURL(dataUriToBlob(TEMPLATE_XLSX_URI));
}catch(e){
  document.getElementById('templateLink').href = TEMPLATE_XLSX_URI; // fallback if Blob conversion itself fails for any reason
}
document.getElementById('exampleTable').innerHTML = exampleTableHtml();
document.getElementById('prizesTitleIcon').src = PRIZE_IMAGES['_trophy'];
applyI18n();
updateProfileGreeting();
if(PROFILE && PROFILE.name){
  document.getElementById('screen-home').classList.add('active');
  renderFavoritesStrip();
} else {
  document.getElementById('screen-onboarding').classList.add('active');
}
