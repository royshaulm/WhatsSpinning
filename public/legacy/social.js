
/* =====================================================================
   DATA LAYER (mock) — replace with real data when merging into the app.
   ===================================================================== */
const SOC_ME = 'me';
function socDay(n){ return Date.now() - n*24*60*60*1000; }
function socHour(n){ return Date.now() - n*60*60*1000; }

const SOC_USERS = {
  me:    { id:'me',    name:'את/ה',          avatar:'🎧', joinedAt: socDay(220), bannerHue:320,
           bio:'אספן/ית תקליטים, בעיקר רוק וג׳אז' },
  dana:  { id:'dana',  name:'דנה כהן',        avatar:'🌸', joinedAt: socDay(400), friendsCount:38, bannerHue:340,
           bio:'עטיפות זה חצי מהכיף 💿' },
  omer:  { id:'omer',  name:'עומר לוי',       avatar:'🎸', joinedAt: socDay(95),  friendsCount:12, bannerHue:20,
           bio:'אלקטרוני ואינדי, תמיד בציד אחר עותקים נדירים' },
  noa:   { id:'noa',   name:'נועה שגיא',      avatar:'🌙', joinedAt: socDay(610), friendsCount:64, bannerHue:265,
           bio:'סול, פאנק וג׳אז ותיק' },
  itay:  { id:'itay',  name:'איתי ברק',       avatar:'🔥', joinedAt: socDay(30),  friendsCount:5,  bannerHue:8,
           bio:'רק התחלתי לאסוף, מקבל המלצות בשמחה', mutualFriendIds:['omer'] },
  maya:  { id:'maya',  name:'מאיה אזולאי',    avatar:'🪩', joinedAt: socDay(860), friendsCount:91, bannerHue:200,
           bio:'DJ בסופ״שים, פופ ודיסקו קלאסי', mutualFriendIds:['dana','noa'] },
  yuval: { id:'yuval', name:'יובל שני',       avatar:'🎹', joinedAt: socDay(12),  friendsCount:3,  bannerHue:150,
           bio:'', mutualFriendIds:['omer'] },
};

let SOC_ID_SEQ = 0;
function socRec(artist, album, daysAgo, hoursAgo, ratings){
  const ts = (daysAgo != null) ? socDay(daysAgo) : socHour(hoursAgo);
  const rec = { id:'r'+(++SOC_ID_SEQ), artist, album, addedAt: ts };
  if(ratings){ rec.musicRating = ratings.music; rec.pressingRating = ratings.pressing; }
  return rec;
}
function socSpin(artist, album, daysAgo, hoursAgo){
  const ts = (daysAgo != null) ? socDay(daysAgo) : socHour(hoursAgo);
  return { id:'s'+(++SOC_ID_SEQ), artist, album, ts };
}

// userId -> [{id, artist, album, addedAt, musicRating?, pressingRating?}]
const SOC_COLLECTIONS = {
  dana: [
    socRec('Fleetwood Mac', 'Rumours', null, 5, { music:9, pressing:8 }),
    socRec('Radiohead', 'In Rainbows', 2),
    socRec('Amy Winehouse', 'Back to Black', 9, { music:10, pressing:7 }),
    socRec('Pink Floyd', 'The Dark Side of the Moon', 40, { music:10, pressing:9 }),
    socRec('Nirvana', 'Nevermind', 120),
  ],
  omer: [
    socRec('Daft Punk', 'Discovery', null, 20, { music:9, pressing:8 }),
    socRec('Tame Impala', 'Currents', 6),
    socRec('Arctic Monkeys', 'AM', 60, { music:8, pressing:6 }),
  ],
  noa: [
    socRec('Stevie Wonder', 'Songs in the Key of Life', 3, { music:10, pressing:9 }),
    socRec('Miles Davis', 'Kind of Blue', 15, { music:10, pressing:10 }),
    socRec('The Beatles', 'Abbey Road', 200),
    socRec('David Bowie', 'Hunky Dory', 400, { music:9, pressing:7 }),
  ],
  itay: [
    socRec('Billie Eilish', 'Happier Than Ever', null, 3, { music:8, pressing:8 }),
  ],
  maya: [
    socRec('Lorde', 'Melodrama', 1, { music:9, pressing:9 }),
    socRec('Kendrick Lamar', 'To Pimp a Butterfly', 30, { music:10, pressing:8 }),
    socRec('The Beatles', 'Abbey Road', 90, { music:10, pressing:9 }),
    socRec('Fleetwood Mac', 'Rumours', 500),
  ],
  yuval: [
    socRec('Radiohead', 'In Rainbows', null, 8),
  ],
  me: [
    socRec('Pink Floyd', 'The Dark Side of the Moon', 10, { music:10, pressing:8 }),
    socRec('Nirvana', 'Nevermind', 50),
  ],
};

// userId -> [{id, artist, album, ts}]
const SOC_SPINS = {
  dana: [
    socSpin('Fleetwood Mac', 'Rumours', null, 2),
    socSpin('Pink Floyd', 'The Dark Side of the Moon', 1),
    socSpin('Amy Winehouse', 'Back to Black', 4),
  ],
  omer: [
    socSpin('Daft Punk', 'Discovery', null, 5),
    socSpin('Pink Floyd', 'The Dark Side of the Moon', null, 7),
  ],
  noa: [
    socSpin('Miles Davis', 'Kind of Blue', null, 10),
    socSpin('Stevie Wonder', 'Songs in the Key of Life', 2),
    socSpin('Fleetwood Mac', 'Rumours', null, 3),
    socSpin('Daft Punk', 'Discovery', null, 9),
  ],
  itay: [
    socSpin('Billie Eilish', 'Happier Than Ever', null, 6),
  ],
  maya: [
    socSpin('Lorde', 'Melodrama', null, 1),
    socSpin('Kendrick Lamar', 'To Pimp a Butterfly', 3),
  ],
  yuval: [],
  me: [
    socSpin('Pink Floyd', 'The Dark Side of the Moon', null, 12),
  ],
};

// simplified read-only achievement tiers (placeholder until wired to the
// real prize system in the main app)
const SOC_COLLECTOR_TIERS = [
  { n:5,  name:'אספן/ית מתחיל/ה', icon:'🥉' },
  { n:20, name:'אספן/ית מנוסה',   icon:'🥈' },
  { n:50, name:'אספן/ית על',      icon:'🥇' },
];
const SOC_LISTENER_TIERS = [
  { n:3,  name:'מאזין/ה קבוע/ה',  icon:'🎧' },
  { n:15, name:'שינטש הפטיפון',   icon:'🔥' },
];

/* =====================================================================
   LIVE PRESENCE — "listening now" — MOCK DATA
   This file and the listening-session prototype are standalone (no
   shared backend), so this is illustrative: it shows what the feed
   should do once a friend is actually mid-session in the listening
   feature. In the merged app this would be populated from that
   feature's real live state, not hardcoded.
   ===================================================================== */
const SOC_LIVE_NOW = [
  { userId:'dana', artist:'Fleetwood Mac', album:'Rumours', startedMinutesAgo:8 },
];

/* =====================================================================
   FRIENDSHIP STATE (persisted so "add friend" survives a reload)
   ===================================================================== */
const SOC_FRIENDS_KEY = 'soc_my_friends_v1';
let SOC_MY_FRIENDS = new Set(['dana', 'omer', 'noa']); // default demo friends
function socLoadFriends(){
  try{
    const raw = localStorage.getItem(SOC_FRIENDS_KEY);
    if(raw) SOC_MY_FRIENDS = new Set(JSON.parse(raw));
    else socSaveFriends();
  }catch(e){}
}
function socSaveFriends(){
  try{ localStorage.setItem(SOC_FRIENDS_KEY, JSON.stringify(Array.from(SOC_MY_FRIENDS))); }catch(e){}
}
function socIsFriend(uid){ return uid === SOC_ME || SOC_MY_FRIENDS.has(uid); }
function socFriendsCountFor(uid){
  if(uid === SOC_ME) return SOC_MY_FRIENDS.size;
  let n = SOC_USERS[uid].friendsCount || 0;
  if(socIsFriend(uid)) n += 1; // the friendship is mutual, so it also bumps their count
  return n;
}

/* =====================================================================
   FRIEND REQUESTS — "add friend" now sends a request the other side has
   to accept, instead of connecting instantly
   ===================================================================== */
const SOC_INCOMING_KEY = 'soc_incoming_requests_v1'; // people who sent ME a request
const SOC_OUTGOING_KEY = 'soc_outgoing_requests_v1'; // people I sent a request to
let SOC_INCOMING_REQUESTS = new Set(['itay']); // seed: one demo incoming request
let SOC_OUTGOING_REQUESTS = new Set();
function socLoadRequests(){
  try{
    const rawIn = localStorage.getItem(SOC_INCOMING_KEY);
    if(rawIn) SOC_INCOMING_REQUESTS = new Set(JSON.parse(rawIn));
    else socSaveIncoming();
    const rawOut = localStorage.getItem(SOC_OUTGOING_KEY);
    if(rawOut) SOC_OUTGOING_REQUESTS = new Set(JSON.parse(rawOut));
  }catch(e){}
}
function socSaveIncoming(){
  try{ localStorage.setItem(SOC_INCOMING_KEY, JSON.stringify(Array.from(SOC_INCOMING_REQUESTS))); }catch(e){}
}
function socSaveOutgoing(){
  try{ localStorage.setItem(SOC_OUTGOING_KEY, JSON.stringify(Array.from(SOC_OUTGOING_REQUESTS))); }catch(e){}
}
function socHasIncomingRequest(uid){ return SOC_INCOMING_REQUESTS.has(uid); }
function socHasOutgoingRequest(uid){ return SOC_OUTGOING_REQUESTS.has(uid); }
function socSendFriendRequest(uid){
  if(socIsFriend(uid) || socHasOutgoingRequest(uid)) return;
  SOC_OUTGOING_REQUESTS.add(uid);
  socSaveOutgoing();
}
function socCancelFriendRequest(uid){
  SOC_OUTGOING_REQUESTS.delete(uid);
  socSaveOutgoing();
}
function socAcceptFriendRequest(uid){
  SOC_INCOMING_REQUESTS.delete(uid);
  socSaveIncoming();
  SOC_MY_FRIENDS.add(uid);
  socSaveFriends();
  socAddNotification('friend_accept', uid);
  socUpdateNavBadge();
}
function socDeclineFriendRequest(uid){
  SOC_INCOMING_REQUESTS.delete(uid);
  socSaveIncoming();
  socUpdateNavBadge();
}

/* =====================================================================
   NOTIFICATIONS
   ===================================================================== */
const SOC_NOTIFICATIONS_KEY = 'soc_notifications_v1';
let SOC_NOTIFICATIONS = []; // [{id, type, uid, feedId?, ts, read}], newest first
function socLoadNotifications(){
  try{
    const raw = localStorage.getItem(SOC_NOTIFICATIONS_KEY);
    if(raw){ SOC_NOTIFICATIONS = JSON.parse(raw); return; }
  }catch(e){}
  // first run: seed a couple of demo notifications so the screen isn't empty
  SOC_NOTIFICATIONS = [
    { id:'n1', type:'like',    uid:'dana', text:'עשה/תה לייק לפעילות שלך', ts: socHour(5),  read:false },
    { id:'n2', type:'comment', uid:'omer', text:'הגיב/ה על פעילות בפיד',   ts: socHour(26), read:true  },
  ];
  socSaveNotifications();
}
function socSaveNotifications(){
  try{ localStorage.setItem(SOC_NOTIFICATIONS_KEY, JSON.stringify(SOC_NOTIFICATIONS)); }catch(e){}
}
function socAddNotification(type, uid, extra){
  const n = Object.assign({ id:'n' + Date.now() + Math.random().toString(36).slice(2, 6), type, uid, ts: Date.now(), read:false }, extra || {});
  SOC_NOTIFICATIONS.unshift(n);
  socSaveNotifications();
}
function socUnreadNotifCount(){
  return SOC_INCOMING_REQUESTS.size + SOC_NOTIFICATIONS.filter(n => !n.read).length;
}
function socUpdateNavBadge(){
  const el = document.getElementById('notifNavBadge');
  if(!el) return;
  const count = socUnreadNotifCount();
  el.textContent = count > 9 ? '9+' : String(count);
  el.classList.toggle('hidden', count === 0);
}

/* =====================================================================
   REACTIONS + COMMENTS STATE (persisted per feed item)
   one reaction emoji per user per item (tap again, or pick a different
   emoji, to change/remove it) — richer than a single like/heart toggle
   ===================================================================== */
const SOC_REACTIONS_KEY = 'soc_reactions_v1';
const SOC_COMMENTS_KEY = 'soc_comments_v1';
const SOC_REACTION_SET = ['❤️', '🔥', '🎧', '💿', '👏'];
let SOC_REACTIONS = {}; // feedId -> { userId: emoji }
let SOC_COMMENTS = {};  // feedId -> [{userId, text, gifUrl?, ts}]
let SOC_OPEN_COMMENTS = new Set(); // feedIds whose comment box is expanded (UI-only, not persisted)
let SOC_OPEN_EMOJI_PICKER = null;  // feedId currently showing the emoji picker, or null (UI-only)
let SOC_OPEN_GIF_PICKER = null;    // feedId currently showing the GIF picker, or null (UI-only)
let SOC_OPEN_REACTION_PICKER = null; // feedId currently showing the reaction-choice row, or null (UI-only)

function socLoadReactions(){
  try{
    const raw = localStorage.getItem(SOC_REACTIONS_KEY);
    if(raw){ SOC_REACTIONS = JSON.parse(raw); return; }
  }catch(e){}
  // first run: seed a couple of reactions from friends so the feed feels alive
  const seedId1 = socFindFeedId('dana', 'spin', 'Fleetwood Mac', 'Rumours');
  const seedId2 = socFindFeedId('omer', 'added', 'Daft Punk', 'Discovery');
  if(seedId1) SOC_REACTIONS[seedId1] = { noa:'🔥' };
  if(seedId2) SOC_REACTIONS[seedId2] = { dana:'❤️', noa:'🎧' };
  socSaveReactions();
}
function socSaveReactions(){
  try{ localStorage.setItem(SOC_REACTIONS_KEY, JSON.stringify(SOC_REACTIONS)); }catch(e){}
}
function socLoadComments(){
  try{
    const raw = localStorage.getItem(SOC_COMMENTS_KEY);
    if(raw){ SOC_COMMENTS = JSON.parse(raw); return; }
  }catch(e){}
  // first run: seed one friend comment so the feed feels alive
  const seedId = socFindFeedId('dana', 'spin', 'Fleetwood Mac', 'Rumours');
  if(seedId) SOC_COMMENTS[seedId] = [{ userId:'noa', text:'עותק מעולה, איזה פרסינג!', ts: socHour(4) }];
  socSaveComments();
}
function socSaveComments(){
  try{ localStorage.setItem(SOC_COMMENTS_KEY, JSON.stringify(SOC_COMMENTS)); }catch(e){}
}
// looks up the stable feed-item id for a known (userId, type, artist, album)
// combo — used only to seed believable demo reactions/comments on load
function socFindFeedId(userId, type, artist, album){
  const list = type === 'added' ? SOC_COLLECTIONS[userId] : SOC_SPINS[userId];
  const rec = (list || []).find(r => r.artist === artist && r.album === album);
  return rec ? (type === 'added' ? 'add_' : 'spin_') + rec.id : null;
}

/* =====================================================================
   WISHLIST STATE (persisted) — quick-add from any record the user
   doesn't already own, wherever it's shown (feed / a friend's collection)
   ===================================================================== */
const SOC_WISHLIST_KEY = 'soc_wishlist_v1';
let SOC_WISHLIST = new Set(); // Set<"artist|||album"> (lowercase)
function socLoadWishlist(){
  try{ const raw = localStorage.getItem(SOC_WISHLIST_KEY); if(raw) SOC_WISHLIST = new Set(JSON.parse(raw)); }catch(e){}
}
function socSaveWishlist(){
  try{ localStorage.setItem(SOC_WISHLIST_KEY, JSON.stringify(Array.from(SOC_WISHLIST))); }catch(e){}
}
function socWishlistKey(artist, album){ return (artist + '|||' + album).toLowerCase(); }
function socInWishlist(artist, album){ return SOC_WISHLIST.has(socWishlistKey(artist, album)); }
function socOwnsRecord(artist, album){
  const key = socWishlistKey(artist, album);
  return (SOC_COLLECTIONS[SOC_ME] || []).some(r => socWishlistKey(r.artist, r.album) === key);
}
function socAddToWishlist(ev, artist, album){
  ev.stopPropagation();
  SOC_WISHLIST.add(socWishlistKey(artist, album));
  socSaveWishlist();
  // swap just this status box in place, no full re-render needed
  ev.currentTarget.outerHTML = socRecordStatusBoxHtml(artist, album);
}

/* =====================================================================
   GIPHY (GIFs for comments)
   NOTE: this is Giphy's public "beta" demo key, meant only for testing —
   swap in a real key from https://developers.giphy.com before shipping.
   ===================================================================== */
const SOC_GIPHY_API_KEY = 'dc6zaTOxFJmzC';
let SOC_GIF_DEBOUNCE_TIMER = null;

const SOC_EMOJI_SET = [
  '😀','😂','🥹','😍','🤩','😎','🥲','😢','😡','🤔',
  '👍','👎','🙌','🙏','👏','💪','🔥','💯','✨','🎉',
  '❤️','💔','😻','🤘','🎵','🎶','🎧','🎸','🥁','💿',
];

/* =====================================================================
   HELPERS
   ===================================================================== */
function socEsc(s){
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[c]));
}
// safe to embed inside onclick="...('...')" — escapes for the JS string
// literal first, then HTML-escapes the whole attribute value
function socJsAttrStr(s){
  return socEsc(String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'"));
}
function socFullDateTime(ts){
  const d = new Date(ts);
  const datePart = d.toLocaleDateString('he-IL', { day:'2-digit', month:'2-digit', year:'numeric' });
  const timePart = d.toLocaleTimeString('he-IL', { hour:'2-digit', minute:'2-digit' });
  return `${datePart} · ${timePart}`;
}
// BUGFIX/UX: under 24h show a relative time in minutes/hours; from 24h
// onward show the full day + time instead of a vague "X days ago"
function socRelTime(ts){
  const diffMs = Date.now() - ts;
  if(diffMs < 24 * 60 * 60 * 1000){
    const min = Math.floor(diffMs / 60000);
    if(min < 1) return 'עכשיו';
    if(min < 60) return `לפני ${min} דק׳`;
    const hr = Math.floor(min / 60);
    return `לפני ${hr} שע׳`;
  }
  return socFullDateTime(ts);
}
function socJoinedDate(ts){
  return new Date(ts).toLocaleDateString('he-IL', { year:'numeric', month:'long' });
}
function socDiscogsUrl(artist, album){
  return `https://www.discogs.com/search/?q=${encodeURIComponent(artist + ' ' + album)}&type=release`;
}
// per-user ratings (music / pressing) the record's owner gave it themself
function socRatingsFor(uid, artist, album){
  const key = socWishlistKey(artist, album);
  const rec = (SOC_COLLECTIONS[uid] || []).find(r => socWishlistKey(r.artist, r.album) === key);
  if(!rec || (rec.musicRating == null && rec.pressingRating == null)) return null;
  return { music: rec.musicRating, pressing: rec.pressingRating };
}
// renders a 1-10 rating as a 5-star row (rounded to the nearest whole star)
function socStarsHtml(rating10){
  const filledCount = Math.max(0, Math.min(5, Math.round(rating10 / 2)));
  let out = '';
  for(let i = 0; i < 5; i++){
    out += `<span class="star ${i < filledCount ? 'filled' : ''}">★</span>`;
  }
  return out;
}
// a rating box — music/pressing rating shown as stars, bigger and more
// prominent than a plain number, placed to the left of the record-name box
function socRatingBoxHtml(kind, icon, value){
  if(value == null) return '';
  return `<div class="rating-box ${kind}"><span class="rating-box-ic">${icon}</span><span class="rating-box-stars">${socStarsHtml(value)}</span></div>`;
}
// small vinyl-disc icon (an original icon in the app's own style, not a
// reproduction of Discogs' trademarked logo) — used as a small badge
// overlapping the record art's corner: its own link straight to Discogs
function socDiscogsIconSvg(size){
  return `<svg class="discogs-icon" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">
  <circle cx="12" cy="12" r="11" fill="#161616"/>
  <circle cx="12" cy="12" r="8.6" fill="none" stroke="#3c3c3c" stroke-width="1"/>
  <circle cx="12" cy="12" r="6" fill="none" stroke="#3c3c3c" stroke-width="1"/>
  <circle cx="12" cy="12" r="3.6" fill="#fff"/>
  <circle cx="12" cy="12" r="1.3" fill="#161616"/>
</svg>`;
}
// the badge is its own real link — tapping it goes straight to Discogs.
// stopPropagation so it doesn't also trigger the parent's "open popup" click
function socDiscogsBadgeHtml(artist, album){
  return `<a class="discogs-badge" href="${socDiscogsUrl(artist, album)}" target="_blank" rel="noopener" title="פתיחה בדיסקוגס" onclick="event.stopPropagation()">${socDiscogsIconSvg(12)}</a>`;
}
// the record-detail row used both in the feed and in a friend's collection:
// tapping the art/title opens a quick-view popup that leads to the record
// in the collection page of whoever added/played it; the little Discogs
// badge on the art's corner is a separate, direct link to Discogs
function socRecordBlockHtml(uid, artist, album){
  const ratings = socRatingsFor(uid, artist, album) || {};
  return `
    <div class="feed-card-record">
      <div class="feed-card-record-link" onclick="socOpenRecordPopup('${uid}','${socJsAttrStr(artist)}','${socJsAttrStr(album)}')">
        <div class="feed-record-art">💿${socDiscogsBadgeHtml(artist, album)}</div>
        <div class="feed-record-info">
          <div class="feed-record-album">${socEsc(album)}</div>
          <div class="feed-record-artist">${socEsc(artist)}</div>
        </div>
      </div>
      ${socRatingBoxHtml('music', '🎵', ratings.music)}
      ${socRatingBoxHtml('pressing', '💿', ratings.pressing)}
    </div>`;
}
// ownership/wishlist status — this is the "outer cube", meant to sit in
// the card's top header rather than down in the record-detail row
function socRecordStatusBoxHtml(artist, album){
  if(socOwnsRecord(artist, album)){
    return `<div class="status-box owned" title="יש לך את התקליט הזה">✓ באוסף שלך</div>`;
  }
  if(socInWishlist(artist, album)){
    return `<div class="status-box wishlisted" title="נמצא בווישליסט שלך">★ ווישליסט</div>`;
  }
  return `<button class="status-box wishlist-btn" title="הוספה לווישליסט" onclick="socAddToWishlist(event,'${socJsAttrStr(artist)}','${socJsAttrStr(album)}')">＋ ווישליסט</button>`;
}

/* =====================================================================
   RECORD QUICK-VIEW POPUP — opened by tapping a record's art/title;
   leads into the collection page of whoever added/played it
   ===================================================================== */
function socFindRecordId(uid, artist, album){
  const key = socWishlistKey(artist, album);
  const rec = (SOC_COLLECTIONS[uid] || []).find(r => socWishlistKey(r.artist, r.album) === key);
  return rec ? rec.id : null;
}
function socOpenRecordPopup(uid, artist, album){
  const u = SOC_USERS[uid];
  const ratings = socRatingsFor(uid, artist, album) || {};
  const recordId = socFindRecordId(uid, artist, album);
  document.getElementById('recordPopupBox').innerHTML = `
    <button class="modal-close" onclick="socCloseRecordPopup()">✕</button>
    <div style="text-align:center;">
      <div class="feed-record-art" style="margin:0 auto 10px;width:74px;height:74px;font-size:34px;">💿${socDiscogsBadgeHtml(artist, album)}</div>
      <div style="font-weight:800;font-size:16px;">${socEsc(album)}</div>
      <div style="color:var(--muted);font-size:13px;margin-top:2px;">${socEsc(artist)}</div>
      <div style="display:flex;justify-content:center;gap:8px;margin-top:12px;">
        ${socRatingBoxHtml('music', '🎵', ratings.music)}
        ${socRatingBoxHtml('pressing', '💿', ratings.pressing)}
      </div>
      <div style="display:flex;justify-content:center;margin-top:10px;">${socRecordStatusBoxHtml(artist, album)}</div>
      <button class="btn" style="width:100%;margin-top:16px;" onclick="socGoToRecordInCollection('${uid}','${recordId || ''}')">📂 צפייה באוסף של ${socEsc(u.name)}</button>
    </div>`;
  document.getElementById('recordPopupOverlay').classList.remove('hidden');
}
function socCloseRecordPopup(){
  document.getElementById('recordPopupOverlay').classList.add('hidden');
}
function socGoToRecordInCollection(uid, recordId){
  socCloseRecordPopup();
  socOpenCollection(uid);
  if(recordId){
    setTimeout(() => {
      const row = document.getElementById('collectionRow_' + recordId);
      if(row){
        row.scrollIntoView({ behavior:'smooth', block:'center' });
        row.classList.add('flash-highlight');
        setTimeout(() => row.classList.remove('flash-highlight'), 1500);
      }
    }, 50);
  }
}

/* =====================================================================
   NAVIGATION
   ===================================================================== */
let SOC_NAV_STACK = [];
function socShowScreen(name, opts){
  opts = opts || {};
  // "feed" is the root of the social section — where a future single
  // app-wide nav's "חברתי" tab would land. Everything else here (search,
  // notifications, profile, ...) is a regular sub-screen with its own
  // back button, same as the rest of the app.
  const isRoot = (name === 'feed');
  if(isRoot) SOC_NAV_STACK = [];

  document.querySelectorAll('#screen-social .soc-screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + name).classList.add('active');

  document.getElementById('subTopbar').style.display = isRoot ? 'none' : 'flex';
  if(!isRoot){
    document.getElementById('subTopbarTitle').textContent = opts.title || '';
    if(opts.back) SOC_NAV_STACK.push(opts.back);
  }
  window.scrollTo(0, 0);
}
function socGoBack(){
  const back = SOC_NAV_STACK.pop();
  if(back) back(); else socShowScreen('feed');
}
// opens search/notifications as regular sub-screens (with a back button),
// instead of them being separate top-level nav destinations
function socOpenSearch(){
  SOC_SEARCH_FILTER = 'all';
  socRenderSearch();
  socShowScreen('search', { title:'חיפוש משתמשים', back: () => socShowScreen('feed') });
}
function socOpenNotifications(){
  socRenderNotifications();
  socShowScreen('notifications', { title:'התראות', back: () => socShowScreen('feed') });
}
// re-opens whichever screen a profile (or one of its sub-screens) should
// return to, using the right opener so title/back-stack stay correct
function socReopenScreen(name){
  if(name === 'search') socOpenSearch();
  else if(name === 'notifications') socOpenNotifications();
  else socShowScreen('feed');
}

/* =====================================================================
   FEED — activity of friends only (records added + records spun)
   ===================================================================== */
// a single user's own activity (added + spun), newest first — used both
// to build the global feed and to show "recent activity" on a profile
function socBuildUserActivity(uid){
  const items = [];
  (SOC_COLLECTIONS[uid] || []).forEach(r => {
    items.push({ id:'add_' + r.id, userId:uid, type:'added', artist:r.artist, album:r.album, ts:r.addedAt });
  });
  (SOC_SPINS[uid] || []).forEach(s => {
    items.push({ id:'spin_' + s.id, userId:uid, type:'spin', artist:s.artist, album:s.album, ts:s.ts });
  });
  items.sort((a, b) => b.ts - a.ts);
  return items;
}
function socBuildFeed(){
  const items = [];
  Object.keys(SOC_USERS).forEach(uid => {
    if(uid === SOC_ME || !socIsFriend(uid)) return; // feed = friends' activity only
    items.push(...socBuildUserActivity(uid));
  });
  items.sort((a, b) => b.ts - a.ts);
  return items;
}

function socRenderFeed(){
  socRenderLiveNow();
  socRenderLeaderboardPeek();
  socRenderRecommendations();
  const el = document.getElementById('feedList');
  const items = socBuildFeed();
  if(!items.length){
    el.innerHTML = `
      <div class="soc-empty">
        <div class="soc-empty-ic">👥</div>
        <div class="soc-empty-title">אין עדיין פעילות</div>
        <div class="soc-empty-sub">הוסיפו חברים כדי לראות מה הם מנגנים<br>ומוסיפים לאוסף</div>
        <button class="btn" onclick="socOpenSearch()">חיפוש חברים</button>
      </div>`;
    return;
  }
  const visible = items.slice(0, SOC_FEED_VISIBLE_COUNT);
  const loadMoreHtml = SOC_FEED_VISIBLE_COUNT < items.length
    ? `<button class="btn secondary feed-load-more" onclick="socLoadMoreFeed()">טען עוד</button>`
    : '';
  el.innerHTML = visible.map(socFeedCardHtml).join('') + loadMoreHtml;
}
// pagination: 25 items at a time, "טען עוד" reveals 25 more each tap
const SOC_FEED_PAGE_SIZE = 25;
let SOC_FEED_VISIBLE_COUNT = SOC_FEED_PAGE_SIZE;
function socLoadMoreFeed(){
  SOC_FEED_VISIBLE_COUNT += SOC_FEED_PAGE_SIZE;
  socRenderFeed();
}

function socFeedCardHtml(item){
  const u = SOC_USERS[item.userId];
  // text right next to the name, e.g. "דנה כהן הוסיף/ה תקליט לאוסף"
  const verbText = item.type === 'added' ? 'הוסיף/ה תקליט לאוסף' : 'ניגן/ה תקליט';
  const reactions = SOC_REACTIONS[item.id] || {};
  const myReaction = reactions[SOC_ME] || null;
  const comments = SOC_COMMENTS[item.id] || [];
  const commentsOpen = SOC_OPEN_COMMENTS.has(item.id);
  const emojiOpen = SOC_OPEN_EMOJI_PICKER === item.id;
  const gifOpen = SOC_OPEN_GIF_PICKER === item.id;
  const reactionPickerOpen = SOC_OPEN_REACTION_PICKER === item.id;

  return `
  <div class="feed-card type-${item.type}" data-feed-id="${item.id}">
    <div class="feed-card-head">
      <div class="feed-card-head-main" onclick="socOpenProfile('${item.userId}','feed')">
        <div class="soc-avatar">${u.avatar}</div>
        <div class="feed-card-who">
          <div class="feed-card-name-line">
            <span class="feed-card-name">${socEsc(u.name)}</span>
            <span class="feed-card-verb type-${item.type}">${verbText}</span>
          </div>
          <div class="feed-card-time">${socRelTime(item.ts)}</div>
        </div>
      </div>
      ${socRecordStatusBoxHtml(item.artist, item.album)}
    </div>
    ${socRecordBlockHtml(item.userId, item.artist, item.album)}
    <div class="feed-card-actions">
      <button class="feed-action-btn ${myReaction ? 'active' : ''}" onclick="socToggleReactionPicker('${item.id}')">
        ${socReactionSummaryHtml(reactions)}
      </button>
      <button class="feed-action-btn ${commentsOpen ? 'active' : ''}" onclick="socToggleComments('${item.id}')">
        <span>💬</span><span>${comments.length > 0 ? comments.length : ''} תגובה</span>
      </button>
    </div>
    <div class="reaction-picker ${reactionPickerOpen ? '' : 'hidden'}">
      ${SOC_REACTION_SET.map(e => `<button class="reaction-choice ${myReaction === e ? 'active' : ''}" onclick="socSetReaction('${item.id}','${e}')">${e}</button>`).join('')}
    </div>
    <div class="feed-comments ${commentsOpen ? '' : 'hidden'}" id="comments_${item.id}">
      <div class="feed-comments-list">${comments.map((c, i) => socCommentHtml(item.id, c, i)).join('') || ''}</div>
      <div class="feed-comment-input-row">
        <input type="text" class="feed-comment-input" id="commentInput_${item.id}"
               placeholder="כתבו תגובה..." onkeydown="if(event.key==='Enter') socAddComment('${item.id}')">
        <button class="comment-tool-btn ${emojiOpen ? 'active' : ''}" title="אימוג׳י" onclick="socToggleEmojiPicker('${item.id}')">😊</button>
        <button class="comment-tool-btn ${gifOpen ? 'active' : ''}" title="GIF" onclick="socToggleGifPicker('${item.id}')">GIF</button>
        <button class="feed-comment-send" onclick="socAddComment('${item.id}')">שליחה</button>
      </div>
      <div class="emoji-picker ${emojiOpen ? '' : 'hidden'}">${socEmojiPickerHtml(item.id)}</div>
      <div class="gif-picker ${gifOpen ? '' : 'hidden'}">
        <input type="text" class="gif-search-input" placeholder="חיפוש GIF ב-Giphy..." oninput="socSearchGifsDebounced('${item.id}', this.value)">
        <div class="gif-results" id="gifResults_${item.id}"><div class="gif-status">טוען...</div></div>
        <div class="gif-attrib">מופעל על ידי GIPHY</div>
      </div>
    </div>
  </div>`;
}
// groups this item's reactions by emoji and shows them compactly on the
// action button, e.g. "❤️ 2   🔥 1" — or a neutral "הוספת ריאקציה" prompt
function socReactionSummaryHtml(reactions){
  const counts = {};
  Object.values(reactions).forEach(e => { counts[e] = (counts[e] || 0) + 1; });
  const parts = Object.keys(counts);
  if(!parts.length) return `<span>🤍</span><span>ריאקציה</span>`;
  return parts.map(e => `<span class="reaction-count">${e} ${counts[e]}</span>`).join('');
}

let SOC_EDITING_COMMENT = null; // { feedId, index } | null — only one comment editable at a time
function socCommentHtml(feedId, c, index){
  const u = SOC_USERS[c.userId];
  const gifHtml = c.gifUrl ? `<img class="comment-gif" src="${c.gifUrl}" alt="GIF" loading="lazy">` : '';

  if(SOC_EDITING_COMMENT && SOC_EDITING_COMMENT.feedId === feedId && SOC_EDITING_COMMENT.index === index){
    return `
      <div class="feed-comment">
        <div class="soc-avatar small">${u.avatar}</div>
        <div class="feed-comment-body">
          <span class="feed-comment-name">${socEsc(u.name)}</span>
          <div class="comment-edit-row">
            <input type="text" class="comment-edit-input" id="commentEditInput_${feedId}_${index}" value="${socEsc(c.text || '')}"
                   onkeydown="if(event.key==='Enter') socSaveEditComment('${feedId}',${index}); if(event.key==='Escape') socCancelEditComment();">
            <button class="comment-edit-save" onclick="socSaveEditComment('${feedId}',${index})">שמירה</button>
            <button class="comment-edit-cancel" onclick="socCancelEditComment()">ביטול</button>
          </div>
          ${gifHtml}
        </div>
      </div>`;
  }

  const textHtml = c.text ? socEsc(c.text) : '';
  const isMine = c.userId === SOC_ME;
  const actionsHtml = isMine ? `
        <button class="comment-action-link" onclick="socStartEditComment('${feedId}',${index})">עריכה</button>
        <button class="comment-action-link" onclick="socDeleteComment('${feedId}',${index})">מחיקה</button>` : '';
  return `
    <div class="feed-comment">
      <div class="soc-avatar small">${u.avatar}</div>
      <div class="feed-comment-body">
        <span class="feed-comment-name">${socEsc(u.name)}</span>${textHtml}${gifHtml}
        <div class="feed-comment-meta">
          <span class="feed-comment-time">${socRelTime(c.ts)}</span>
          ${actionsHtml}
        </div>
      </div>
    </div>`;
}
function socStartEditComment(feedId, index){
  SOC_EDITING_COMMENT = { feedId, index };
  socRenderFeed();
  const input = document.getElementById(`commentEditInput_${feedId}_${index}`);
  if(input){ input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
}
function socCancelEditComment(){
  SOC_EDITING_COMMENT = null;
  socRenderFeed();
}
function socSaveEditComment(feedId, index){
  const input = document.getElementById(`commentEditInput_${feedId}_${index}`);
  if(!input) return;
  const text = input.value.trim();
  const comment = SOC_COMMENTS[feedId] && SOC_COMMENTS[feedId][index];
  if(!comment) return;
  if(!text && !comment.gifUrl) return; // don't allow saving down to an empty text-only comment
  comment.text = text;
  socSaveComments();
  SOC_EDITING_COMMENT = null;
  socRenderFeed();
}
function socDeleteComment(feedId, index){
  if(SOC_COMMENTS[feedId]){
    SOC_COMMENTS[feedId].splice(index, 1);
    socSaveComments();
  }
  if(SOC_EDITING_COMMENT && SOC_EDITING_COMMENT.feedId === feedId) SOC_EDITING_COMMENT = null;
  socRenderFeed();
}

function socToggleReactionPicker(feedId){
  SOC_OPEN_REACTION_PICKER = (SOC_OPEN_REACTION_PICKER === feedId) ? null : feedId;
  socRenderFeed();
}
function socSetReaction(feedId, emoji){
  if(!SOC_REACTIONS[feedId]) SOC_REACTIONS[feedId] = {};
  if(SOC_REACTIONS[feedId][SOC_ME] === emoji) delete SOC_REACTIONS[feedId][SOC_ME]; // tap the same one again to remove it
  else SOC_REACTIONS[feedId][SOC_ME] = emoji;
  socSaveReactions();
  SOC_OPEN_REACTION_PICKER = null;
  socRenderFeed();
}
function socToggleComments(feedId){
  if(SOC_OPEN_COMMENTS.has(feedId)){
    SOC_OPEN_COMMENTS.delete(feedId);
    if(SOC_OPEN_EMOJI_PICKER === feedId) SOC_OPEN_EMOJI_PICKER = null;
    if(SOC_OPEN_GIF_PICKER === feedId) SOC_OPEN_GIF_PICKER = null;
  } else {
    SOC_OPEN_COMMENTS.add(feedId);
  }
  socRenderFeed();
  if(SOC_OPEN_COMMENTS.has(feedId)){
    const input = document.getElementById('commentInput_' + feedId);
    if(input) input.focus();
  }
}
function socAddComment(feedId){
  const input = document.getElementById('commentInput_' + feedId);
  const text = (input.value || '').trim();
  if(!text) return;
  if(!SOC_COMMENTS[feedId]) SOC_COMMENTS[feedId] = [];
  SOC_COMMENTS[feedId].push({ userId: SOC_ME, text, ts: Date.now() });
  socSaveComments();
  SOC_OPEN_COMMENTS.add(feedId);
  SOC_OPEN_EMOJI_PICKER = null;
  SOC_OPEN_GIF_PICKER = null;
  socRenderFeed();
  const freshInput = document.getElementById('commentInput_' + feedId);
  if(freshInput) freshInput.focus();
}

/* ---- emoji picker ---- */
function socEmojiPickerHtml(feedId){
  return `<div class="emoji-grid">${SOC_EMOJI_SET.map(e =>
    `<button class="emoji-btn" onclick="socInsertEmoji('${feedId}','${e}')">${e}</button>`
  ).join('')}</div>`;
}
function socToggleEmojiPicker(feedId){
  SOC_OPEN_GIF_PICKER = null;
  SOC_OPEN_EMOJI_PICKER = (SOC_OPEN_EMOJI_PICKER === feedId) ? null : feedId;
  socRenderFeed();
}
function socInsertEmoji(feedId, emoji){
  const input = document.getElementById('commentInput_' + feedId);
  if(input){ input.value += emoji; input.focus(); }
}

/* ---- GIF picker (Giphy) ---- */
function socToggleGifPicker(feedId){
  SOC_OPEN_EMOJI_PICKER = null;
  const wasOpen = SOC_OPEN_GIF_PICKER === feedId;
  SOC_OPEN_GIF_PICKER = wasOpen ? null : feedId;
  socRenderFeed();
  if(!wasOpen) socFetchGifs(feedId, '');
}
function socSearchGifsDebounced(feedId, query){
  clearTimeout(SOC_GIF_DEBOUNCE_TIMER);
  SOC_GIF_DEBOUNCE_TIMER = setTimeout(() => socFetchGifs(feedId, query), 400);
}
async function socFetchGifs(feedId, query){
  const resultsEl = document.getElementById('gifResults_' + feedId);
  if(!resultsEl) return;
  resultsEl.innerHTML = `<div class="gif-status">טוען...</div>`;
  const q = (query || '').trim();
  const endpoint = q
    ? `https://api.giphy.com/v1/gifs/search?api_key=${SOC_GIPHY_API_KEY}&q=${encodeURIComponent(q)}&limit=24&rating=pg-13`
    : `https://api.giphy.com/v1/gifs/trending?api_key=${SOC_GIPHY_API_KEY}&limit=24&rating=pg-13`;
  try{
    const res = await fetch(endpoint);
    if(!res.ok) throw new Error('giphy http ' + res.status);
    const data = await res.json();
    const items = data.data || [];
    // if the user moved on to a different item's picker (or closed it) while this was in flight, drop the result
    if(SOC_OPEN_GIF_PICKER !== feedId) return;
    const freshResultsEl = document.getElementById('gifResults_' + feedId);
    if(!freshResultsEl) return;
    if(!items.length){
      freshResultsEl.innerHTML = `<div class="gif-status">לא נמצאו תוצאות</div>`;
      return;
    }
    freshResultsEl.innerHTML = items.map(g => {
      const img = g.images || {};
      const thumb = (img.fixed_width_small || img.fixed_width || img.original || {}).url;
      const full = (img.fixed_width || img.original || {}).url || thumb;
      if(!thumb) return '';
      return `<img class="gif-thumb" src="${thumb}" loading="lazy" alt="GIF" onclick="socSendGif('${feedId}','${socJsAttrStr(full)}')">`;
    }).join('');
  }catch(e){
    if(SOC_OPEN_GIF_PICKER !== feedId) return;
    const freshResultsEl = document.getElementById('gifResults_' + feedId);
    if(freshResultsEl) freshResultsEl.innerHTML = `<div class="gif-status">לא ניתן לטעון GIF-ים כרגע<br>(בדקו את החיבור לאינטרנט)</div>`;
  }
}
function socSendGif(feedId, gifUrl){
  const input = document.getElementById('commentInput_' + feedId);
  const text = input ? (input.value || '').trim() : '';
  if(!SOC_COMMENTS[feedId]) SOC_COMMENTS[feedId] = [];
  SOC_COMMENTS[feedId].push({ userId: SOC_ME, text, gifUrl, ts: Date.now() });
  socSaveComments();
  SOC_OPEN_COMMENTS.add(feedId);
  SOC_OPEN_GIF_PICKER = null;
  socRenderFeed();
}

/* =====================================================================
   SEARCH USERS
   ===================================================================== */
function socSearchNormalize(s){ return String(s || '').trim().toLowerCase(); }
// same 3 groups used for result ranking, now also selectable as filter chips
function socUserCategory(u){
  if(socIsFriend(u.id)) return 'friends';
  if((u.mutualFriendIds || []).some(fid => SOC_MY_FRIENDS.has(fid))) return 'mutual';
  return 'other';
}
let SOC_SEARCH_FILTER = 'all'; // 'all' | 'friends' | 'mutual' | 'other'
function socSetSearchFilter(filter){
  SOC_SEARCH_FILTER = filter;
  socRenderSearch();
}
function socSearchFilterChipsHtml(){
  const chips = [
    { id:'all', label:'הכל' },
    { id:'friends', label:'✓ חברים' },
    { id:'mutual', label:'👋 מוכרים לך' },
    { id:'other', label:'אחרים' },
  ];
  return `<div class="search-filter-row">${chips.map(c =>
    `<button class="search-filter-chip ${SOC_SEARCH_FILTER === c.id ? 'active' : ''}" onclick="socSetSearchFilter('${c.id}')">${c.label}</button>`
  ).join('')}</div>`;
}
function socRenderSearch(){
  const q = (document.getElementById('userSearchInput').value || '').trim();
  const el = document.getElementById('searchResults');
  const chipsHtml = socSearchFilterChipsHtml();

  // no text yet and no filter narrowing it down: show the "people you may
  // know" carousel + a hint, same as before
  if(!q && SOC_SEARCH_FILTER === 'all'){
    const peopleHtml = socPeopleRecoSectionHtml(socPeopleYouMayKnow());
    el.innerHTML = chipsHtml + peopleHtml + `
      <div class="soc-empty">
        <div class="soc-empty-ic">🔍</div>
        <div class="soc-empty-sub">חפשו משתמשים לפי שם, או סננו לפי קטגוריה</div>
      </div>`;
    return;
  }

  const nq = socSearchNormalize(q);
  let results = Object.values(SOC_USERS).filter(u => u.id !== SOC_ME);
  if(q) results = results.filter(u => socSearchNormalize(u.name).includes(nq));
  if(SOC_SEARCH_FILTER !== 'all') results = results.filter(u => socUserCategory(u) === SOC_SEARCH_FILTER);
  // relevance order: already friends first, then people with a mutual
  // friend, then everyone else — alphabetical within each group
  results.sort((a, b) => {
    const rank = (u) => socIsFriend(u.id) ? 0 : ((u.mutualFriendIds || []).some(fid => SOC_MY_FRIENDS.has(fid)) ? 1 : 2);
    const diff = rank(a) - rank(b);
    return diff !== 0 ? diff : a.name.localeCompare(b.name, 'he');
  });

  if(!results.length){
    el.innerHTML = chipsHtml + `<div class="soc-empty"><div class="soc-empty-sub">לא נמצאו משתמשים</div></div>`;
    return;
  }
  el.innerHTML = chipsHtml + results.map(socUserRowHtml).join('');
}

function socUserRowHtml(u){
  const friend = socIsFriend(u.id);
  const incoming = socHasIncomingRequest(u.id);
  const outgoing = socHasOutgoingRequest(u.id);
  let subLabel = '🔒 פרופיל נעול';
  let subClass = '';
  if(friend){ subLabel = '✓ חברים'; subClass = 'is-friend'; }
  else if(incoming){ subLabel = '📨 שלח/ה לך בקשת חברות'; subClass = 'is-friend'; }
  else if(outgoing){ subLabel = 'בקשת חברות ממתינה'; }
  else {
    const mutualNames = (u.mutualFriendIds || []).filter(fid => SOC_MY_FRIENDS.has(fid)).map(fid => SOC_USERS[fid].name);
    if(mutualNames.length) subLabel += ' · מוכר/ת גם ל' + socEsc(mutualNames[0]);
  }
  return `
    <div class="user-row" onclick="socOpenProfile('${u.id}','search')">
      <div class="soc-avatar">${u.avatar}</div>
      <div class="user-row-info">
        <div class="user-row-name">${socEsc(u.name)}</div>
        <div class="user-row-sub ${subClass}">${subLabel}</div>
      </div>
      <div class="user-row-chev">‹</div>
    </div>`;
}

/* =====================================================================
   PROFILE — locked preview for non-friends, full read-only view for friends
   ===================================================================== */
let SOC_PROFILE_USER = null;
let SOC_PROFILE_RETURN = 'feed';

function socOpenProfile(userId, fromScreen){
  SOC_PROFILE_USER = userId;
  SOC_PROFILE_RETURN = fromScreen || 'feed';
  SOC_UNFRIEND_CONFIRM = false;
  socRenderProfile();
  socShowScreen('profile', { title:'פרופיל', back: () => socReopenScreen(SOC_PROFILE_RETURN) });
}
// the friendship-status control at the bottom of the top card: request
// sent / received, already friends (with an unfriend option), or neither
let SOC_UNFRIEND_CONFIRM = false; // showing the "are you sure" step, for the currently open profile
function socFriendActionHtml(uid){
  if(socIsFriend(uid)){
    if(SOC_UNFRIEND_CONFIRM){
      return `
        <div class="profile-unfriend-confirm">
          <div class="profile-request-text">להסיר את ${socEsc(SOC_USERS[uid].name)} מרשימת החברים?</div>
          <div class="profile-request-actions">
            <button class="btn secondary" onclick="socUnfriendCancel()">ביטול</button>
            <button class="btn danger" onclick="socUnfriendAction('${uid}')">הסרה</button>
          </div>
        </div>`;
    }
    return `<button class="profile-friend-badge" onclick="socUnfriendPrompt()" title="לחיצה להסרה מרשימת החברים">✓ אתם חברים</button>`;
  }
  if(socHasIncomingRequest(uid)){
    return `
      <div class="profile-request-incoming">
        <div class="profile-request-text">📨 ${socEsc(SOC_USERS[uid].name)} שלח/ה לך בקשת חברות</div>
        <div class="profile-request-actions">
          <button class="btn" onclick="socAcceptRequestAction('${uid}')">✓ אישור</button>
          <button class="btn secondary" onclick="socDeclineRequestAction('${uid}')">דחייה</button>
        </div>
      </div>`;
  }
  if(socHasOutgoingRequest(uid)){
    return `
      <button class="btn secondary" style="margin-top:14px;" onclick="socCancelRequestAction('${uid}')">
        ⏳ בקשת חברות נשלחה — ביטול
      </button>`;
  }
  return `<button class="btn" style="margin-top:14px;" onclick="socSendRequestAction('${uid}')">➕ שליחת בקשת חברות</button>`;
}
function socUnfriendPrompt(){
  SOC_UNFRIEND_CONFIRM = true;
  socRenderProfile();
}
function socUnfriendCancel(){
  SOC_UNFRIEND_CONFIRM = false;
  socRenderProfile();
}
function socUnfriendAction(uid){
  SOC_MY_FRIENDS.delete(uid);
  socSaveFriends();
  SOC_UNFRIEND_CONFIRM = false;
  socRenderProfile(); // now shows the locked view again
  socRenderFeed();    // their activity drops out of the feed
}

function socRenderProfile(){
  const uid = SOC_PROFILE_USER;
  const u = SOC_USERS[uid];
  const el = document.getElementById('profileContent');
  const friend = socIsFriend(uid);
  const friendsCount = socFriendsCountFor(uid);

  const topCard = `
    <div class="card profile-top-card">
      <div class="profile-banner" style="background:linear-gradient(135deg, hsl(${u.bannerHue},70%,42%), hsl(${(u.bannerHue + 40) % 360},70%,30%));"></div>
      <div class="soc-avatar xl profile-avatar-overlap">${u.avatar}</div>
      <div class="profile-name">${socEsc(u.name)}</div>
      <div class="profile-meta-row">
        <div class="profile-meta"><b>${friendsCount}</b> חברים</div>
        <div>·</div>
        <div class="profile-meta">באפליקציה מ${socJoinedDate(u.joinedAt)}</div>
      </div>
      ${(friend && u.bio) ? `<div class="profile-bio">${socEsc(u.bio)}</div>` : ''}
      ${socFriendActionHtml(uid)}
    </div>`;

  if(!friend){
    el.innerHTML = topCard + `
      <div class="card profile-locked-card">
        <div class="profile-locked-ic">🔒</div>
        <div class="profile-locked-text">הפרופיל נעול</div>
        <div class="profile-locked-sub">הוספת ${socEsc(u.name)} כחבר/ה תפתח את הגישה לפרופיל,<br>להישגים ולאוסף</div>
      </div>`;
    return;
  }

  const recCount = (SOC_COLLECTIONS[uid] || []).length;
  const spinCount = (SOC_SPINS[uid] || []).length;
  const activity = socBuildUserActivity(uid).slice(0, 15);
  const activityHtml = activity.length
    ? `<div class="feed-list">${activity.map(socFeedCardHtml).join('')}</div>`
    : `<div class="card" style="text-align:center;color:var(--muted);font-size:12.5px;">אין עדיין פעילות</div>`;

  el.innerHTML = topCard + `
    <div class="profile-stat-row">
      <div class="card profile-stat"><div class="profile-stat-num">${recCount}</div><div class="profile-stat-lbl">תקליטים</div></div>
      <div class="card profile-stat"><div class="profile-stat-num">${spinCount}</div><div class="profile-stat-lbl">ניגונים</div></div>
    </div>
    <button class="soc-link-card" onclick="socOpenAchievements('${uid}')">
      <span class="soc-link-ic">🏆</span><span class="soc-link-label">הישגים</span><span class="soc-link-chev">‹</span>
    </button>
    <button class="soc-link-card" onclick="socOpenCollection('${uid}')">
      <span class="soc-link-ic">💿</span><span class="soc-link-label">האוסף</span><span class="soc-link-chev">‹</span>
    </button>
    <div class="profile-readonly-note">👀 צפייה בלבד — אי אפשר לערוך או להגיב כאן על הפרופיל של ${socEsc(u.name)}. אפשר להגיב על הפעילות שלו/ה בפיד.</div>
    <div class="profile-section-title">פעילות אחרונה</div>
    ${activityHtml}`;
}

function socSendRequestAction(uid){
  socSendFriendRequest(uid);
  if(SOC_PROFILE_USER) socRenderProfile();
}
function socCancelRequestAction(uid){
  socCancelFriendRequest(uid);
  if(SOC_PROFILE_USER) socRenderProfile();
}
function socAcceptRequestAction(uid){
  socAcceptFriendRequest(uid);
  if(SOC_PROFILE_USER) socRenderProfile();
  socRenderFeed();
  socRenderNotifications();
}
function socDeclineRequestAction(uid){
  socDeclineFriendRequest(uid);
  if(SOC_PROFILE_USER) socRenderProfile();
  socRenderNotifications();
}

/* =====================================================================
   COLLECTION — read-only view of a friend's records
   ===================================================================== */
function socOpenCollection(uid){
  socRenderCollection(uid);
  socShowScreen('collection', {
    title: 'האוסף של ' + SOC_USERS[uid].name,
    back: () => socOpenProfile(uid, SOC_PROFILE_RETURN)
  });
}
function socRenderCollection(uid){
  const el = document.getElementById('collectionContent');
  const list = (SOC_COLLECTIONS[uid] || []).slice().sort((a, b) => b.addedAt - a.addedAt);
  if(!list.length){
    el.innerHTML = `<div class="soc-empty"><div class="soc-empty-sub">האוסף עדיין ריק</div></div>`;
    return;
  }
  // comparison-with-me summary, right here at the top of their collection
  const myKeys = new Set((SOC_COLLECTIONS[SOC_ME] || []).map(r => socWishlistKey(r.artist, r.album)));
  const sharedCount = list.filter(r => myKeys.has(socWishlistKey(r.artist, r.album))).length;
  const compareHtml = `
    <div class="compare-summary-row">
      <div class="card compare-stat"><div class="compare-stat-num">${sharedCount}</div><div class="compare-stat-lbl">משותפים איתך</div></div>
      <div class="card compare-stat"><div class="compare-stat-num">${list.length - sharedCount}</div><div class="compare-stat-lbl">יש ל${socEsc(SOC_USERS[uid].name)} ואין לך</div></div>
    </div>`;

  el.innerHTML = compareHtml + `<div class="soc-readonly-tag">👀 צפייה בלבד</div>` + list.map(r => {
    const ratings = socRatingsFor(uid, r.artist, r.album) || {};
    return `
    <div class="collection-row" id="collectionRow_${r.id}">
      <div class="collection-row-top">
        <div class="collection-row-date">${socRelTime(r.addedAt)}</div>
        ${socRecordStatusBoxHtml(r.artist, r.album)}
      </div>
      <div class="collection-row-body">
        <div class="collection-row-link" onclick="socOpenRecordPopup('${uid}','${socJsAttrStr(r.artist)}','${socJsAttrStr(r.album)}')">
          <div class="feed-record-art">💿${socDiscogsBadgeHtml(r.artist, r.album)}</div>
          <div class="feed-record-info">
            <div class="feed-record-album">${socEsc(r.album)}</div>
            <div class="feed-record-artist">${socEsc(r.artist)}</div>
          </div>
        </div>
        ${socRatingBoxHtml('music', '🎵', ratings.music)}
        ${socRatingBoxHtml('pressing', '💿', ratings.pressing)}
      </div>
    </div>`;
  }).join('');
}

/* =====================================================================
   ACHIEVEMENTS — read-only view of a friend's badges
   ===================================================================== */
function socAchievementsFor(uid){
  const recCount = (SOC_COLLECTIONS[uid] || []).length;
  const spinCount = (SOC_SPINS[uid] || []).length;
  const list = [];
  SOC_COLLECTOR_TIERS.forEach(t => list.push({
    ...t, earned: recCount >= t.n, progressLabel: `${Math.min(recCount, t.n)}/${t.n} תקליטים`
  }));
  SOC_LISTENER_TIERS.forEach(t => list.push({
    ...t, earned: spinCount >= t.n, progressLabel: `${Math.min(spinCount, t.n)}/${t.n} ניגונים`
  }));
  return list;
}
function socOpenAchievements(uid){
  socRenderAchievements(uid);
  socShowScreen('achievements', {
    title: 'הישגים של ' + SOC_USERS[uid].name,
    back: () => socOpenProfile(uid, SOC_PROFILE_RETURN)
  });
}
function socRenderAchievements(uid){
  const el = document.getElementById('achievementsContent');
  const list = socAchievementsFor(uid);
  el.innerHTML = `
    <div class="soc-readonly-tag">👀 צפייה בלבד</div>
    <div class="achv-grid">${list.map(a => `
      <div class="achv-tile ${a.earned ? 'earned' : 'locked'}">
        <div class="achv-ic">${a.earned ? a.icon : '🔒'}</div>
        <div class="achv-name">${socEsc(a.name)}</div>
        <div class="achv-progress">${socEsc(a.progressLabel)}</div>
      </div>`).join('')}
    </div>`;
}

/* =====================================================================
   NOTIFICATIONS — incoming friend requests (actionable, live) shown on
   top of the generic activity notifications (seeded/added over time)
   ===================================================================== */
function socNotifDefaultText(type){
  if(type === 'friend_accept') return 'אתם עכשיו חברים 🎉';
  if(type === 'like') return 'עשה/תה לייק לפעילות שלך';
  if(type === 'comment') return 'הגיב/ה על פעילות בפיד';
  return '';
}
function socRequestNotifHtml(uid){
  const u = SOC_USERS[uid];
  return `
    <div class="notif-item unread">
      <div class="soc-avatar small">${u.avatar}</div>
      <div class="notif-body">
        <div class="notif-text"><b>${socEsc(u.name)}</b> שלח/ה לך בקשת חברות</div>
        <div class="notif-actions">
          <button class="btn" onclick="socAcceptRequestAction('${uid}')">✓ אישור</button>
          <button class="btn secondary" onclick="socDeclineRequestAction('${uid}')">דחייה</button>
        </div>
      </div>
    </div>`;
}
function socNotifHtml(n){
  const u = SOC_USERS[n.uid];
  const icon = n.type === 'like' ? '❤️' : n.type === 'comment' ? '💬' : n.type === 'friend_accept' ? '🎉' : '🔔';
  const text = n.text || socNotifDefaultText(n.type);
  return `
    <div class="notif-item ${n.read ? '' : 'unread'}" onclick="socOpenProfile('${n.uid}','notifications')">
      <div class="soc-avatar small">${icon}</div>
      <div class="notif-body">
        <div class="notif-text"><b>${socEsc(u.name)}</b> ${socEsc(text)}</div>
        <div class="notif-time">${socRelTime(n.ts)}</div>
      </div>
    </div>`;
}
function socRenderNotifications(){
  const el = document.getElementById('notificationsList');
  const requestItems = Array.from(SOC_INCOMING_REQUESTS).map(socRequestNotifHtml);
  const otherItems = SOC_NOTIFICATIONS.slice().sort((a, b) => b.ts - a.ts).map(socNotifHtml);
  const all = requestItems.concat(otherItems);
  el.innerHTML = all.length ? all.join('') : `
    <div class="soc-empty">
      <div class="soc-empty-ic">🔔</div>
      <div class="soc-empty-sub">אין התראות חדשות</div>
    </div>`;
  // viewing the screen marks the generic notifications as read — the
  // friend-request items stay "unread" until accepted or declined
  let changed = false;
  SOC_NOTIFICATIONS.forEach(n => { if(!n.read){ n.read = true; changed = true; } });
  if(changed) socSaveNotifications();
  socUpdateNavBadge();
}

/* =====================================================================
   LEADERBOARD — you + your friends, ranked by records or by spins.
   Resets every 1st of the month: both metrics only count records
   added / spins logged since the start of the current calendar month,
   not lifetime totals.
   ===================================================================== */
let SOC_LEADERBOARD_METRIC = 'records'; // 'records' | 'spins'
function socMonthStart(){
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1).getTime();
}
function socMonthResetLabel(){
  const d = new Date();
  const next = new Date(d.getFullYear(), d.getMonth() + 1, 1);
  return `מתאפס ב-${next.toLocaleDateString('he-IL', { day:'numeric', month:'long' })}`;
}
function socLeaderboardRows(metric){
  const uids = [SOC_ME, ...Array.from(SOC_MY_FRIENDS)];
  const monthStart = socMonthStart();
  return uids.map(uid => {
    const list = metric === 'records' ? (SOC_COLLECTIONS[uid] || []) : (SOC_SPINS[uid] || []);
    const value = list.filter(item => (metric === 'records' ? item.addedAt : item.ts) >= monthStart).length;
    return { uid, name: SOC_USERS[uid].name, avatar: SOC_USERS[uid].avatar, value };
  }).sort((a, b) => b.value - a.value);
}
function socOpenLeaderboard(){
  socRenderLeaderboard();
  socShowScreen('leaderboard', { title:'לוח מובילים', back: () => socShowScreen('feed') });
}
function socSetLeaderboardMetric(metric){
  SOC_LEADERBOARD_METRIC = metric;
  socRenderLeaderboard();
}
function socRenderLeaderboard(){
  const el = document.getElementById('leaderboardContent');
  const rows = socLeaderboardRows(SOC_LEADERBOARD_METRIC);
  const medals = ['🥇', '🥈', '🥉'];
  const metricLabel = SOC_LEADERBOARD_METRIC === 'records' ? 'תקליטים' : 'ניגונים';
  el.innerHTML = `
    <div class="leaderboard-toggle">
      <button class="leaderboard-toggle-btn ${SOC_LEADERBOARD_METRIC === 'records' ? 'active' : ''}" onclick="socSetLeaderboardMetric('records')">💿 תקליטים</button>
      <button class="leaderboard-toggle-btn ${SOC_LEADERBOARD_METRIC === 'spins' ? 'active' : ''}" onclick="socSetLeaderboardMetric('spins')">🔁 ניגונים</button>
    </div>
    <div class="leaderboard-month-note">📅 החודש הנוכחי · ${socMonthResetLabel()}</div>
    ${rows.map((r, i) => `
      <div class="leaderboard-row ${r.uid === SOC_ME ? 'is-me' : ''}" ${r.uid !== SOC_ME ? `onclick="socOpenProfile('${r.uid}','feed')"` : ''}>
        <div class="leaderboard-rank">${i < 3 ? medals[i] : (i + 1)}</div>
        <div class="soc-avatar small">${r.avatar}</div>
        <div class="leaderboard-name">${socEsc(r.name)}</div>
        <div class="leaderboard-num">${r.value} <span style="font-size:10px;color:var(--muted);font-weight:700;">${metricLabel}</span></div>
      </div>`).join('')}
  `;
}
// small peek on the feed screen — top 3 only, tapping it opens the full
// leaderboard screen (ranked by records, same default as the full screen)
function socRenderLeaderboardPeek(){
  const el = document.getElementById('leaderboardPeek');
  const rows = socLeaderboardRows(SOC_LEADERBOARD_METRIC).slice(0, 3);
  const medals = ['🥇', '🥈', '🥉'];
  el.innerHTML = `
    <div class="leaderboard-peek" onclick="socOpenLeaderboard()">
      <div class="leaderboard-peek-head">
        <div class="leaderboard-peek-title">🏆 לוח מובילים</div>
        <div class="leaderboard-peek-toggle">
          <button class="leaderboard-peek-toggle-btn ${SOC_LEADERBOARD_METRIC === 'records' ? 'active' : ''}" title="תקליטים" onclick="socSetPeekMetric(event,'records')">💿</button>
          <button class="leaderboard-peek-toggle-btn ${SOC_LEADERBOARD_METRIC === 'spins' ? 'active' : ''}" title="ניגונים" onclick="socSetPeekMetric(event,'spins')">🔁</button>
        </div>
      </div>
      <div class="leaderboard-peek-rows">
        ${rows.map((r, i) => `
          <div class="leaderboard-peek-row">
            <span class="leaderboard-peek-medal">${medals[i]}</span>
            <span class="soc-avatar small">${r.avatar}</span>
            <span class="leaderboard-peek-name">${socEsc(r.name)}</span>
            <span class="leaderboard-peek-num">${r.value}</span>
          </div>`).join('')}
      </div>
    </div>`;
}
// switches the metric for both the peek and (if opened next) the full
// screen; stopPropagation so tapping the toggle doesn't also open the
// full leaderboard via the card's own click handler
function socSetPeekMetric(ev, metric){
  ev.stopPropagation();
  SOC_LEADERBOARD_METRIC = metric;
  socRenderLeaderboardPeek();
}

/* =====================================================================
   RECOMMENDATIONS
   - "people you may know" (via mutual friends) lives in the search
     screen, shown before the person starts typing
   - a trending record among your friends is shown at the top of the feed
   ===================================================================== */
function socPeopleYouMayKnow(){
  return Object.values(SOC_USERS).filter(u =>
    u.id !== SOC_ME && !socIsFriend(u.id) && !socHasIncomingRequest(u.id) && !socHasOutgoingRequest(u.id) &&
    (u.mutualFriendIds || []).some(fid => SOC_MY_FRIENDS.has(fid))
  );
}
function socPeopleRecoSectionHtml(people){
  if(!people.length) return '';
  return `
    <div class="reco-section">
      <div class="reco-title">👋 אולי תכיר/י</div>
      <div class="reco-people-row">
        ${people.map(u => {
          const mutualNames = (u.mutualFriendIds || []).filter(fid => SOC_MY_FRIENDS.has(fid)).map(fid => SOC_USERS[fid].name);
          return `
          <div class="reco-person-card">
            <div class="soc-avatar">${u.avatar}</div>
            <div class="reco-person-name">${socEsc(u.name)}</div>
            <div class="reco-person-mutual">${mutualNames.length ? 'מוכר/ת גם ל' + socEsc(mutualNames[0]) : ''}</div>
            <button class="reco-person-btn" onclick="socSendRequestFromReco(event,'${u.id}')">➕ הוספה</button>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}
// top records among friends' activity (added + spun), most-shared first
function socTrendingAmongFriends(limit){
  const counts = {};
  Object.keys(SOC_USERS).forEach(uid => {
    if(uid === SOC_ME || !socIsFriend(uid)) return;
    socBuildUserActivity(uid).forEach(item => {
      const key = socWishlistKey(item.artist, item.album);
      if(!counts[key]) counts[key] = { artist:item.artist, album:item.album, userIds:new Set() };
      counts[key].userIds.add(uid);
    });
  });
  return Object.values(counts)
    .filter(c => c.userIds.size >= 2)
    .sort((a, b) => b.userIds.size - a.userIds.size)
    .slice(0, limit || 3);
}

/* =====================================================================
   LIVE NOW — friends currently in a listening session (see SOC_LIVE_NOW
   above for the mock-data caveat)
   ===================================================================== */
function socRenderLiveNow(){
  const el = document.getElementById('feedLiveNow');
  const liveFriends = SOC_LIVE_NOW.filter(l => socIsFriend(l.userId));
  if(!liveFriends.length){ el.innerHTML = ''; return; }
  el.innerHTML = liveFriends.map(l => {
    const u = SOC_USERS[l.userId];
    return `
      <div class="live-now-card">
        <div class="live-now-badge">🔴 LIVE</div>
        <div class="soc-avatar">${u.avatar}</div>
        <div class="live-now-info">
          <div class="live-now-name">${socEsc(u.name)} מאזינ/ה עכשיו</div>
          <div class="live-now-record">${socEsc(l.album)} · ${socEsc(l.artist)}</div>
        </div>
        <button class="live-now-join-btn" onclick="socJoinLiveSession(event,'${l.userId}')">🎧 הצטרפות</button>
      </div>`;
  }).join('');
}
// in the merged app this would open the listening-session screen and
// join that friend's session (e.g. call lsExpandPlayer() there) — here
// there's no shared runtime to join into, so it's just a visual stand-in
function socJoinLiveSession(ev, uid){
  const btn = ev.currentTarget;
  btn.textContent = '🎧 מצטרפ/ת...';
  btn.disabled = true;
}
function socRenderRecommendations(){
  const el = document.getElementById('feedRecommendations');
  const trending = socTrendingAmongFriends(3);
  el.innerHTML = trending.length ? `
    <div class="reco-section">
      <div class="reco-title">🔥 מסתובב הרבה אצל חברים</div>
      <div class="trending-row">
        ${trending.map(t => `
          <a class="trending-mini-card" href="${socDiscogsUrl(t.artist, t.album)}" target="_blank" rel="noopener">
            <div class="trending-mini-ic">💿</div>
            <div class="trending-mini-album">${socEsc(t.album)}</div>
            <div class="trending-mini-artist">${socEsc(t.artist)}</div>
            <div class="trending-mini-count">${t.userIds.size} חברים</div>
          </a>`).join('')}
      </div>
    </div>` : '';
}
function socSendRequestFromReco(ev, uid){
  socSendFriendRequest(uid);
  const btn = ev.currentTarget;
  btn.textContent = '⏳ נשלח';
  btn.classList.add('sent');
  btn.disabled = true;
}

/* =====================================================================
   INIT
   ===================================================================== */
function socInit(){
  socLoadFriends();
  socLoadRequests();
  socLoadNotifications();
  socLoadReactions();
  socLoadComments();
  socLoadWishlist();
  socRenderFeed();
  socUpdateNavBadge();
  if(document.getElementById('screen-social')) socShowScreen('feed');
}
socInit();
