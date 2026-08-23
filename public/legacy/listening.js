
/* =====================================================================
   DATA (mock) — a small collection with real tracklists for two albums,
   and one album with no tracklist to demo the 20-minute default fallback
   (mirrors the main app's NEEDLE_DEFAULT_SIDE_MINUTES behavior).
   ===================================================================== */
const LS_DEFAULT_SIDE_SECONDS = 20 * 60; // fallback when there's no tracklist data

const LS_DEMO_COLLECTION = [
  {
    id:'r1', artist:'Pink Floyd', album:'The Dark Side of the Moon', cover:'💿', lastPlayedDaysAgo:5,
    sides:{
      A:[
        { title:'Speak to Me', dur:90 }, { title:'Breathe', dur:163 }, { title:'On the Run', dur:216 },
        { title:'Time', dur:413 }, { title:'The Great Gig in the Sky', dur:276 },
      ],
      B:[
        { title:'Money', dur:382 }, { title:'Us and Them', dur:469 }, { title:'Any Colour You Like', dur:206 },
        { title:'Brain Damage', dur:228 }, { title:'Eclipse', dur:130 },
      ],
    },
  },
  {
    id:'r2', artist:'Fleetwood Mac', album:'Rumours', cover:'💿', lastPlayedDaysAgo:45,
    sides:{
      A:[
        { title:'Second Hand News', dur:167 }, { title:'Dreams', dur:254 }, { title:'Never Going Back Again', dur:134 },
        { title:"Don't Stop", dur:191 }, { title:'Go Your Own Way', dur:218 },
      ],
      B:[
        { title:'Songbird', dur:200 }, { title:'The Chain', dur:268 }, { title:'You Make Loving Fun', dur:211 },
        { title:"I Don't Want to Know", dur:201 }, { title:'Oh Daddy', dur:234 }, { title:'Gold Dust Woman', dur:294 },
      ],
    },
  },
  {
    id:'r3', artist:'Nirvana', album:'Nevermind', cover:'💿', lastPlayedDaysAgo:120,
    sides:null, // no tracklist on file — falls back to the flat 20-minute default
  },
  { id:'r4', artist:'Radiohead', album:'OK Computer', cover:'💿', lastPlayedDaysAgo:200, sides:null },
  { id:'r5', artist:'Miles Davis', album:'Kind of Blue', cover:'💿', lastPlayedDaysAgo:15, sides:null },
  { id:'r6', artist:'Amy Winehouse', album:'Back to Black', cover:'💿', lastPlayedDaysAgo:90, sides:null },
  { id:'r7', artist:'David Bowie', album:'Hunky Dory', cover:'💿', lastPlayedDaysAgo:300, sides:null },
  { id:'r8', artist:'Daft Punk', album:'Discovery', cover:'💿', lastPlayedDaysAgo:2, sides:null },
];

function lsMainCollection(){
  try{
    if(typeof RECORDS !== 'undefined' && Array.isArray(RECORDS) && RECORDS.length){
      return RECORDS.map((r, idx) => {
        const key = (typeof recKey === 'function') ? recKey(r) : ((r.artist||'')+'|||'+(r.album||''));
        let lastPlayedDaysAgo = null;
        if(typeof SPIN_EVENTS !== 'undefined' && Array.isArray(SPIN_EVENTS)){
          const ev = SPIN_EVENTS.filter(e => e.key === key || e.recordKey === key || (e.artist===r.artist && e.album===r.album)).sort((a,b)=>(b.ts||0)-(a.ts||0))[0];
          if(ev && ev.ts) lastPlayedDaysAgo = Math.max(0, Math.floor((Date.now()-ev.ts)/86400000));
        }
        const cached = (typeof TRACKLIST_CACHE !== 'undefined' && TRACKLIST_CACHE) ? TRACKLIST_CACHE[key] : null;
        let sides = null;
        if(cached && Array.isArray(cached.names) && cached.names.length){
          // The main cache usually stores a flat album tracklist. Split it evenly between A/B when
          // side metadata is unavailable; needle duration still uses the main app's cached total time.
          const totalSec = cached.totalMs ? Math.max(1, Math.round(cached.totalMs/1000)) : null;
          const per = totalSec ? Math.round(totalSec/cached.names.length) : 180;
          const tracks = cached.names.map(title => ({title, dur:per}));
          const cut = Math.ceil(tracks.length/2);
          sides = {A:tracks.slice(0,cut), B:tracks.slice(cut)};
        }
        return {
          id: String(r.id ?? key ?? idx),
          artist: r.artist || '', album: r.album || '', cover: r.cover || r.image || '💿',
          lastPlayedDaysAgo, sides, _mainRecord:r
        };
      });
    }
  }catch(e){ console.warn('Listening collection bridge failed', e); }
  return LS_DEMO_COLLECTION;
}
function lsCollection(){ return lsMainCollection(); }

const LS_FRIENDS = [
  { id:'dana', name:'דנה כהן', avatar:'🌸' },
  { id:'omer', name:'עומר לוי', avatar:'🎸' },
  { id:'noa',  name:'נועה שגיא', avatar:'🌙' },
  { id:'itay', name:'איתי ברק', avatar:'🔥' },
];

/* =====================================================================
   HELPERS
   ===================================================================== */
function lsEsc(s){
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[c]));
}
function lsFormatTime(totalSeconds){
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}
function lsSideDuration(record, side){
  const tracks = record.sides && record.sides[side];
  if(tracks && tracks.length) return tracks.reduce((sum, t) => sum + t.dur, 0);
  return LS_DEFAULT_SIDE_SECONDS;
}
function lsCurrentTrackTitle(record, side, elapsed){
  const tracks = record.sides && record.sides[side];
  if(!tracks || !tracks.length) return null;
  let acc = 0;
  for(const t of tracks){
    if(elapsed < acc + t.dur) return t.title;
    acc += t.dur;
  }
  return tracks[tracks.length - 1].title;
}
// track list with computed start offsets, for the "jump to song" list —
// empty when the record has no tracklist on file
function lsTrackStartTimes(record, side){
  const tracks = record.sides && record.sides[side];
  if(!tracks) return [];
  let acc = 0;
  return tracks.map(t => {
    const start = acc;
    acc += t.dur;
    return { title: t.title, start, dur: t.dur };
  });
}
function lsShowScreen(name){
  document.querySelectorAll('.ls-screen').forEach(s => s.classList.remove('active'));
  document.getElementById('ls-screen-' + name).classList.add('active');
  window.scrollTo(0, 0);
  lsRenderMiniPlayer();
}

/* =====================================================================
   SETUP SCREEN
   ===================================================================== */
let LS_SELECTED_RECORD = null;
let LS_SELECTED_SIDE = null;
let LS_INVITED = new Set();

function lsLastPlayedLabel(days){
  if(days == null) return '';
  if(days < 30) return `לפני ${days} ימים`;
  return `לפני ${Math.round(days / 30)} חודשים`;
}
function lsRecordRowHtml(r){
  const selected = LS_SELECTED_RECORD && LS_SELECTED_RECORD.id === r.id;
  return `
    <div class="ls-record-row ${selected ? 'selected' : ''}" onclick="lsSelectRecord('${r.id}')">
      <div class="ls-record-art">${r.cover}</div>
      <div class="ls-record-info">
        <div class="ls-record-album">${lsEsc(r.album)}</div>
        <div class="ls-record-artist">${lsEsc(r.artist)}</div>
      </div>
      ${selected ? '<div class="ls-record-check">✓</div>' : `<div class="ls-record-last-played">${lsEsc(lsLastPlayedLabel(r.lastPlayedDaysAgo))}</div>`}
    </div>`;
}
function lsNeglectedRecords(limit){
  return lsCollection().slice().sort((a, b) => (b.lastPlayedDaysAgo || 0) - (a.lastPlayedDaysAgo || 0)).slice(0, limit || 3);
}
function lsRenderRecordPicker(){
  const q = (document.getElementById('lsRecordSearchInput').value || '').trim().toLowerCase();
  const el = document.getElementById('lsRecordPickerList');

  if(!q){
    // nothing typed yet: show what's been neglected instead of a flat browse list
    el.innerHTML = `
      <div class="ls-picker-section-title">🕰️ מזמן לא שמעת</div>
      ${lsNeglectedRecords(3).map(lsRecordRowHtml).join('')}`;
    return;
  }

  const results = lsCollection()
    .filter(r => r.artist.toLowerCase().includes(q) || r.album.toLowerCase().includes(q))
    .sort((a, b) => a.album.localeCompare(b.album, 'he'));
  el.innerHTML = results.length
    ? results.map(lsRecordRowHtml).join('')
    : `<div style="text-align:center;color:var(--muted);font-size:12px;padding:14px 0;">לא נמצאו תקליטים</div>`;
}
function lsRenderSetup(){
  lsRenderRecordPicker(); // reflects the current query/recommendations AND keeps the selection checkmark in sync

  const sideCard = document.getElementById('lsSideCard');
  if(LS_SELECTED_RECORD){
    sideCard.classList.remove('hidden');
    const sides = LS_SELECTED_RECORD.sides ? ['A', 'B'] : ['A', 'B']; // always offer both; B may just use the default duration
    document.getElementById('lsSideRow').innerHTML = sides.map(s => `
      <button class="ls-side-btn ${LS_SELECTED_SIDE === s ? 'active' : ''}" onclick="lsSelectSide('${s}')">צד ${s}</button>
    `).join('');
    if(LS_SELECTED_SIDE){
      const dur = lsSideDuration(LS_SELECTED_RECORD, LS_SELECTED_SIDE);
      document.getElementById('lsSideDurationLabel').textContent = `⏱ כ-${Math.round(dur / 60)} דקות`;
    } else {
      document.getElementById('lsSideDurationLabel').textContent = '';
    }
  } else {
    sideCard.classList.add('hidden');
  }

  document.getElementById('lsInviteRow').innerHTML = LS_FRIENDS.map(f => `
    <div class="ls-invite-chip ${LS_INVITED.has(f.id) ? 'selected' : ''}" onclick="lsToggleInvite('${f.id}')">
      <div class="ls-avatar">${f.avatar}</div>
      <div class="ls-invite-name">${lsEsc(f.name)}</div>
      ${LS_INVITED.has(f.id) ? '<div class="ls-invite-sent">📨 הוזמן/ה</div>' : ''}
    </div>`).join('');

  document.getElementById('lsStartBtn').disabled = !(LS_SELECTED_RECORD && LS_SELECTED_SIDE);
}
function lsSelectRecord(id){
  LS_SELECTED_RECORD = lsCollection().find(r => r.id === id);
  LS_SELECTED_SIDE = null;
  lsRenderSetup();
}
function lsSelectSide(side){
  LS_SELECTED_SIDE = side;
  lsRenderSetup();
}
// tapping a friend sends them a (simulated) push notification inviting
// them to join right now — this is separate from the "joined" simulation,
// which fires once the session is actually playing
function lsToggleInvite(id){
  const nowInviting = !LS_INVITED.has(id);
  if(nowInviting) LS_INVITED.add(id); else LS_INVITED.delete(id);
  lsRenderSetup();
  if(nowInviting){
    const f = LS_FRIENDS.find(x => x.id === id);
    lsShowToast(`📨 נשלחה התראה ל${f.name} — מוזמנ/ת להצטרף לניגון שלך`);
  }
}

/* =====================================================================
   LIVE SESSION STATE + TIMER
   ===================================================================== */
let LS_STATE = null;

function lsStartSession(){
  if(!LS_SELECTED_RECORD || !LS_SELECTED_SIDE) return;
  LS_STATE = {
    record: LS_SELECTED_RECORD,
    side: LS_SELECTED_SIDE,
    sideDuration: lsSideDuration(LS_SELECTED_RECORD, LS_SELECTED_SIDE),
    elapsed: 0,
    totalSeconds: 0,
    status: 'playing',
    invited: new Set(LS_INVITED),
    joined: new Set(),
    sidesPlayed: [],
    demoSpeed: document.getElementById('lsDemoSpeedToggle').checked,
    timerHandle: null,
  };
  LS_REACTION_LOG = [];
  lsShowScreen('live');
  lsRenderLive();
  lsStartTimer();
  lsScheduleJoins();
  // SIMULATED cross-file connection: in the merged app, starting a
  // session like this would post a "listening now" item to the social
  // feed (see SOC_LIVE_NOW in the social prototype) — here we just show
  // that it *would* happen, since the two files don't share a backend
  document.getElementById('lsFeedPostNote').textContent = `📡 פורסם לפיד: מאזינ/ה עכשיו ל${LS_SELECTED_RECORD.album}`;
  document.getElementById('lsFeedPostNote').classList.remove('hidden');
}
function lsStartTimer(){
  lsStopTimer();
  const intervalMs = LS_STATE.demoSpeed ? 200 : 1000;
  LS_STATE.timerHandle = setInterval(lsTick, intervalMs);
}
function lsStopTimer(){
  if(LS_STATE && LS_STATE.timerHandle){
    clearInterval(LS_STATE.timerHandle);
    LS_STATE.timerHandle = null;
  }
}
function lsTick(){
  const inc = LS_STATE.demoSpeed ? 6 : 1; // demo speed ≈ 30x real time
  LS_STATE.elapsed += inc;
  if(LS_STATE.elapsed >= LS_STATE.sideDuration){
    LS_STATE.elapsed = LS_STATE.sideDuration;
    lsStopTimer();
    lsRenderLive();
    lsSideEnded();
    return;
  }
  lsRenderLive();
}
function lsTogglePause(){
  if(!LS_STATE) return;
  if(LS_STATE.status === 'playing'){
    LS_STATE.status = 'paused';
    lsStopTimer();
  } else if(LS_STATE.status === 'paused'){
    LS_STATE.status = 'playing';
    lsStartTimer();
  }
  lsRenderLive();
}
function lsSkipToEnd(){
  if(!LS_STATE) return;
  LS_STATE.elapsed = LS_STATE.sideDuration;
  lsStopTimer();
  lsRenderLive();
  lsSideEnded();
}
function lsRenderLive(){
  const st = LS_STATE;
  const r = st.record;
  document.getElementById('lsVinylDisc').classList.toggle('spinning', st.status === 'playing');
  document.getElementById('lsVinylLabel').textContent = r.cover;
  document.getElementById('lsNpAlbum').textContent = r.album;
  document.getElementById('lsNpArtist').textContent = r.artist;
  document.getElementById('lsNpSide').textContent = 'צד ' + st.side;
  const track = lsCurrentTrackTitle(r, st.side, st.elapsed);
  document.getElementById('lsNpTrack').textContent = track ? '🎵 ' + track : '';

  const pct = Math.min(100, (st.elapsed / st.sideDuration) * 100);
  document.getElementById('lsProgressFill').style.width = pct + '%';
  document.getElementById('lsElapsedLabel').textContent = lsFormatTime(st.elapsed);
  document.getElementById('lsTotalLabel').textContent = lsFormatTime(st.sideDuration);

  document.getElementById('lsControlsRow').innerHTML = st.status === 'playing'
    ? `<button class="btn ls-pause-btn" onclick="lsTogglePause()">⏸️ השהיה</button>
       <button class="btn secondary ls-skip-btn" onclick="lsSkipToEnd()">דילוג לסוף הצד</button>`
    : `<div class="ls-pause-controls">
         <button class="btn ls-pause-btn" onclick="lsTogglePause()">▶️ המשך</button>
         <div class="ls-pause-choice-row">
           <button class="btn secondary ls-skip-btn stop" onclick="lsLeaveSession()">⏹ הפסקת ניגון</button>
           <button class="btn secondary ls-skip-btn" onclick="lsSkipToNextSide()">⏭ מעבר לצד ${st.side === 'A' ? 'B' : 'A'}</button>
         </div>
       </div>`;

  document.getElementById('lsLiveParticipants').innerHTML = Array.from(st.invited).map(id => {
    const f = LS_FRIENDS.find(x => x.id === id);
    const joined = st.joined.has(id);
    return `
      <div class="ls-participant ${joined ? 'joined' : ''}" title="${lsEsc(f.name)}">
        <div class="ls-avatar">${f.avatar}</div>
        <div class="ls-participant-status">${joined ? '✓' : '⏳'}</div>
      </div>`;
  }).join('');

  lsRenderTracklist();
  lsRenderMiniPlayer();
}
// the floating mini-player: visible whenever a session is running and the
// live screen isn't the active one, so playback keeps "going" while you
// browse the rest of the app
function lsRenderMiniPlayer(){
  const mini = document.getElementById('lsMiniPlayer');
  const listeningRootActive = document.getElementById('screen-listening') && document.getElementById('screen-listening').classList.contains('active');
  const liveScreenActive = listeningRootActive && document.getElementById('ls-screen-live').classList.contains('active');
  if(!LS_STATE || LS_STATE.status === 'finished' || liveScreenActive){
    mini.classList.add('hidden');
    return;
  }
  mini.classList.remove('hidden');
  const r = LS_STATE.record;
  document.getElementById('lsMiniDisc').textContent = r.cover;
  document.getElementById('lsMiniDisc').classList.toggle('spinning', LS_STATE.status === 'playing');
  document.getElementById('lsMiniTitle').textContent = r.album;
  const track = lsCurrentTrackTitle(r, LS_STATE.side, LS_STATE.elapsed);
  document.getElementById('lsMiniSub').textContent = (track ? track + ' · ' : '') + 'צד ' + LS_STATE.side;
  document.getElementById('lsMiniTime').textContent = lsFormatTime(LS_STATE.elapsed) + ' / ' + lsFormatTime(LS_STATE.sideDuration);
}
function lsMinimizePlayer(){
  if(typeof showScreen === 'function') showScreen('home');
  lsRenderMiniPlayer();
}
function lsExpandPlayer(){
  if(typeof showScreen === 'function') showScreen('listening');
  lsShowScreen('live');
  lsRenderLive();
}
// the "jump to song" list — only shown when the current side has track
// data on file; tapping a track scrubs the timer straight to its start
function lsRenderTracklist(){
  const wrap = document.getElementById('lsTracklistWrap');
  const tracks = lsTrackStartTimes(LS_STATE.record, LS_STATE.side);
  if(!tracks.length){
    wrap.classList.add('hidden');
    wrap.innerHTML = '';
    return;
  }
  wrap.classList.remove('hidden');
  const elapsed = LS_STATE.elapsed;
  wrap.innerHTML = `<div class="ls-tracklist-title">קפיצה לשיר</div>` + tracks.map((t, i) => {
    const isCurrent = elapsed >= t.start && elapsed < t.start + t.dur;
    return `
      <div class="ls-track-row ${isCurrent ? 'current' : ''}" onclick="lsJumpToTrack(${t.start})">
        <span class="ls-track-num">${i + 1}</span>
        <span class="ls-track-title">${lsEsc(t.title)}</span>
        <span class="ls-track-time">${lsFormatTime(t.start)}</span>
      </div>`;
  }).join('');
}
function lsJumpToTrack(startSec){
  if(!LS_STATE) return;
  LS_STATE.elapsed = startSec;
  lsRenderLive();
}
// SIMULATED joining — in a real build this would come from a live
// connection between participants' devices, not a local setTimeout
function lsScheduleJoins(){
  const baseDelay = LS_STATE.demoSpeed ? 1200 : 3000;
  const spread = LS_STATE.demoSpeed ? 1800 : 6000;
  LS_STATE.invited.forEach(id => {
    const delay = baseDelay + Math.random() * spread;
    setTimeout(() => {
      if(!LS_STATE || LS_STATE.status === 'finished' || !LS_STATE.invited.has(id)) return;
      LS_STATE.joined.add(id);
      lsShowJoinToast(id);
      lsRenderLive();
      lsScheduleReactions(id);
    }, delay);
  });
}
// SIMULATED live reactions — once someone has joined, they periodically
// send a reaction while actively playing (paused = no reactions). Same
// "no real backend" caveat as the join simulation above.
const LS_REACTION_SET = ['❤️', '🔥', '🎧', '👏', '🕺'];
let LS_REACTION_LOG = []; // recent {avatar, emoji}, oldest first, capped
function lsScheduleReactions(id){
  const baseDelay = LS_STATE.demoSpeed ? 1000 : 5000;
  const spread = LS_STATE.demoSpeed ? 1500 : 9000;
  const delay = baseDelay + Math.random() * spread;
  setTimeout(() => {
    if(!LS_STATE || LS_STATE.status === 'finished' || !LS_STATE.joined.has(id)){
      return; // this friend left / session ended — stop the chain
    }
    if(LS_STATE.status === 'playing'){
      const emoji = LS_REACTION_SET[Math.floor(Math.random() * LS_REACTION_SET.length)];
      lsAddLiveReaction(id, emoji);
    }
    lsScheduleReactions(id); // keep going for the rest of the session
  }, delay);
}
function lsAddLiveReaction(id, emoji){
  const f = LS_FRIENDS.find(x => x.id === id);
  lsSpawnFloatingReaction(emoji);
  LS_REACTION_LOG.push({ avatar: f.avatar, emoji });
  if(LS_REACTION_LOG.length > 6) LS_REACTION_LOG.shift();
  lsRenderReactionFeed();
}
function lsSpawnFloatingReaction(emoji){
  const wrap = document.getElementById('lsVinylWrap');
  if(!wrap) return;
  const el = document.createElement('div');
  el.className = 'ls-floating-reaction';
  el.textContent = emoji;
  el.style.left = (38 + Math.random() * 24) + '%';
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 1600);
}
function lsRenderReactionFeed(){
  const el = document.getElementById('lsReactionFeed');
  if(!el) return;
  el.innerHTML = LS_REACTION_LOG.map(r => `<span class="ls-reaction-chip">${r.avatar}${r.emoji}</span>`).join('');
}
function lsShowToast(message){
  const toast = document.getElementById('lsToast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.classList.add('hidden'), 300);
  }, 2500);
}
function lsShowJoinToast(id){
  const f = LS_FRIENDS.find(x => x.id === id);
  lsShowToast(`${f.name} הצטרפ/ה לניגון 🎧`);
}

/* =====================================================================
   SIDE-ENDED / LEAVE / FINISH
   ===================================================================== */
function lsSideEnded(){
  LS_STATE.status = 'side-ended';
  LS_STATE.sidesPlayed.push(LS_STATE.side);
  LS_STATE.totalSeconds += LS_STATE.sideDuration;

  const otherSide = LS_STATE.side === 'A' ? 'B' : 'A';
  const alreadyPlayedOther = LS_STATE.sidesPlayed.includes(otherSide);
  document.getElementById('lsSideEndedBox').innerHTML = `
    <div style="text-align:center;">
      <div style="font-size:32px;">🎶</div>
      <div style="font-weight:800;font-size:16px;margin-top:8px;">צד ${LS_STATE.side} הסתיים!</div>
      <div style="color:var(--muted);font-size:12.5px;margin-top:4px;">${lsFormatTime(LS_STATE.sideDuration)} של האזנה</div>
      <div style="display:flex;gap:8px;margin-top:18px;">
        ${!alreadyPlayedOther ? `<button class="btn ls-action-btn" onclick="lsFlipSide('${otherSide}')">🔄 היפוך לצד ${otherSide}</button>` : ''}
        <button class="btn secondary ls-action-btn" onclick="lsFinishSession()">סיום ניגון</button>
      </div>
    </div>`;
  document.getElementById('lsSideEndedOverlay').classList.remove('hidden');
}
function lsFlipSide(newSide){
  document.getElementById('lsSideEndedOverlay').classList.add('hidden');
  LS_STATE.side = newSide;
  LS_STATE.sideDuration = lsSideDuration(LS_STATE.record, newSide);
  LS_STATE.elapsed = 0;
  LS_STATE.status = 'playing';
  lsRenderLive();
  lsStartTimer();
}
// pause → "move to the next side": records only the partial time actually
// heard on the side being left (not the whole side, since it wasn't
// finished), then starts the other side fresh
function lsSkipToNextSide(){
  if(!LS_STATE) return;
  LS_STATE.totalSeconds += LS_STATE.elapsed;
  const nextSide = LS_STATE.side === 'A' ? 'B' : 'A';
  LS_STATE.side = nextSide;
  LS_STATE.sideDuration = lsSideDuration(LS_STATE.record, nextSide);
  LS_STATE.elapsed = 0;
  LS_STATE.status = 'playing';
  lsRenderLive();
  lsStartTimer();
}
function lsLeaveSession(){
  if(!LS_STATE) return;
  lsStopTimer();
  LS_STATE.totalSeconds += LS_STATE.elapsed;
  LS_STATE.status = 'finished';
  lsShowScreen('summary');
  lsRenderSummary();
}
function lsFinishSession(){
  document.getElementById('lsSideEndedOverlay').classList.add('hidden');
  lsStopTimer();
  LS_STATE.status = 'finished';
  lsShowScreen('summary');
  lsRenderSummary();
}

/* =====================================================================
   SUMMARY + RATING (5 stars, half-star increments)
   ===================================================================== */
let LS_RATING_MUSIC = 4;
let LS_RATING_PRESSING = 4;
function lsFormatStars(v){
  return (v % 1 === 0) ? String(v) : v.toFixed(1);
}
function lsStarRatingHtml(kind, value){
  let stars = '';
  for(let i = 1; i <= 5; i++){
    let pct = 0;
    if(value >= i) pct = 100;
    else if(value >= i - 0.5) pct = 50;
    stars += `
      <span class="ls-star-slot">
        <span class="ls-star-bg">★</span>
        <span class="ls-star-fill ${kind}" style="width:${pct}%">★</span>
        <button class="ls-star-hit half" onclick="lsSetStarRating('${kind}',${i - 0.5})" title="${i - 0.5}"></button>
        <button class="ls-star-hit full" onclick="lsSetStarRating('${kind}',${i})" title="${i}"></button>
      </span>`;
  }
  return stars;
}
function lsSetStarRating(kind, value){
  if(kind === 'music') LS_RATING_MUSIC = value;
  else LS_RATING_PRESSING = value;
  lsRenderRatingBlock();
}
function lsRenderRatingBlock(){
  document.getElementById('lsMusicStars').innerHTML = lsStarRatingHtml('music', LS_RATING_MUSIC);
  document.getElementById('lsMusicValueLabel').textContent = lsFormatStars(LS_RATING_MUSIC);
  document.getElementById('lsPressingStars').innerHTML = lsStarRatingHtml('pressing', LS_RATING_PRESSING);
  document.getElementById('lsPressingValueLabel').textContent = lsFormatStars(LS_RATING_PRESSING);
}
function lsRenderSummary(){
  const st = LS_STATE;
  const r = st.record;
  const joinedFriends = Array.from(st.joined).map(id => LS_FRIENDS.find(f => f.id === id));
  const wasPartial = st.status === 'finished' && st.sidesPlayed.length === 0 && st.elapsed < st.sideDuration;
  LS_RATING_MUSIC = 4;
  LS_RATING_PRESSING = 4;

  document.getElementById('lsSummaryContent').innerHTML = `
    <div class="card" style="text-align:center;">
      <div style="font-size:36px;">${r.cover}</div>
      <div style="font-weight:900;font-size:17px;margin-top:6px;">${lsEsc(r.album)}</div>
      <div style="color:var(--muted);font-size:13px;">${lsEsc(r.artist)}</div>
      ${wasPartial ? `<div style="color:var(--gold);font-size:11.5px;margin-top:8px;font-weight:700;">⏸ האזנה חלקית</div>` : ''}
    </div>
    <div class="ls-summary-stat-row">
      <div class="card ls-summary-stat"><div class="ls-summary-stat-num">${lsFormatTime(st.totalSeconds)}</div><div class="ls-summary-stat-lbl">זמן האזנה</div></div>
      <div class="card ls-summary-stat"><div class="ls-summary-stat-num">${st.sidesPlayed.length || (st.elapsed > 0 ? '½' : 0)}</div><div class="ls-summary-stat-lbl">צדדים שהושלמו</div></div>
    </div>
    <div class="ls-summary-joined">
      ${joinedFriends.length
        ? '🎧 האזנתם ביחד עם ' + joinedFriends.map(f => lsEsc(f.name)).join(', ')
        : 'האזנת/ה לבד הפעם'}
    </div>
    <div class="card" style="display:flex;flex-direction:column;gap:14px;">
      <div style="font-weight:800;font-size:13px;">איך היה?</div>
      <div class="ls-rating-block">
        <div class="ls-rating-label"><span>🎵 מוזיקה</span><b id="lsMusicValueLabel">${lsFormatStars(LS_RATING_MUSIC)}</b></div>
        <div class="ls-star-rating" id="lsMusicStars">${lsStarRatingHtml('music', LS_RATING_MUSIC)}</div>
        <input type="text" class="ls-rating-note" id="lsMusicNote" placeholder="הערות על המוזיקה (לא חובה)...">
      </div>
      <div class="ls-rating-block">
        <div class="ls-rating-label"><span>💿 פרסינג</span><b id="lsPressingValueLabel">${lsFormatStars(LS_RATING_PRESSING)}</b></div>
        <div class="ls-star-rating" id="lsPressingStars">${lsStarRatingHtml('pressing', LS_RATING_PRESSING)}</div>
        <input type="text" class="ls-rating-note" id="lsPressingNote" placeholder="הערות על הפרסינג (לא חובה)...">
      </div>
      <button class="btn ls-action-btn" onclick="lsSaveSpin()">💾 שמירת הניגון</button>
      <div class="ls-saved-note hidden" id="lsSavedNote">✓ נשמר! הניגון נרשם באוסף שלך</div>
    </div>
    <button class="btn secondary ls-action-btn" onclick="lsNewSession()">ניגון חדש</button>
  `;
}
function lsSaveSpin(){
  if(!LS_STATE) return;
  const mainRecord = LS_STATE.record._mainRecord || LS_STATE.record;
  try{
    if(typeof setRating === 'function'){
      setRating(mainRecord, 'music', LS_RATING_MUSIC);
      setRating(mainRecord, 'pressing', LS_RATING_PRESSING);
    }
    if(typeof logSpin === 'function'){
      const completed = LS_STATE.sidesPlayed.length;
      // Treat two completed sides as a full spin; otherwise preserve partial listening.
      if(completed >= 2) logSpin(mainRecord, {full:true});
      else {
        const partialSides = completed + (LS_STATE.elapsed > 0 ? Math.min(1, LS_STATE.elapsed / Math.max(1, LS_STATE.sideDuration)) : 0);
        logSpin(mainRecord, {full:false, sides:partialSides});
      }
      if(typeof renderBrowseList === 'function') renderBrowseList();
      if(typeof checkPrizesAndNotify === 'function') checkPrizesAndNotify();
    }
    const musicNote = document.getElementById('lsMusicNote')?.value || '';
    const pressingNote = document.getElementById('lsPressingNote')?.value || '';
    if(musicNote || pressingNote){
      const key = (typeof recKey === 'function') ? recKey(mainRecord) : (mainRecord.artist+'|||'+mainRecord.album).toLowerCase();
      const notesKey = 'whats_spinning_listening_notes_v1';
      let notes = {};
      try{ notes = JSON.parse(localStorage.getItem(notesKey) || '{}'); }catch(e){}
      notes[key] = {music:musicNote, pressing:pressingNote, updatedAt:Date.now()};
      localStorage.setItem(notesKey, JSON.stringify(notes));
    }
  }catch(e){ console.error('Failed to save listening session', e); }
  document.getElementById('lsSavedNote').classList.remove('hidden');
}
function lsNewSession(){
  LS_STATE = null;
  LS_SELECTED_RECORD = null;
  LS_SELECTED_SIDE = null;
  LS_INVITED = new Set();
  LS_REACTION_LOG = [];
  document.getElementById('lsFeedPostNote').classList.add('hidden');
  document.getElementById('lsReactionFeed').innerHTML = '';
  lsRenderSetup();
  lsShowScreen('setup');
}

/* =====================================================================
   INIT
   ===================================================================== */
lsRenderSetup();

function lsExitToHome(){
  if(typeof showScreen === 'function') showScreen('home');
}
function lsOpenFromMain(){
  if(typeof showScreen === 'function') showScreen('listening');
  lsShowScreen('setup');
  lsRenderRecordPicker();
}
