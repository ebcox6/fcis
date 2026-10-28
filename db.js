/* ROOM POLL ROUTER: DATABASE CONNECTION (no edits needed) */
window.RPR_DB = (async function () {
  var cfg = window.RPR_CONFIG || {};
  if (!cfg.firebase || !cfg.firebase.projectId) return null;
  try {
    var V = "10.12.2";
    var app = await import("https://www.gstatic.com/firebasejs/" + V + "/firebase-app.js");
    var fs = await import("https://www.gstatic.com/firebasejs/" + V + "/firebase-firestore.js");
    var db = fs.getFirestore(app.initializeApp(cfg.firebase));
    var sid = new URLSearchParams(location.search).get("s") || cfg.session;
    var votes = fs.collection(db, "sessions", sid, "votes");
    return {
      session: sid,
      save: function (id, data) { return fs.setDoc(fs.doc(votes, id), { w: data.w, a: data.a, t: fs.serverTimestamp() }); },
      watch: function (fn, onErr) { return fs.onSnapshot(votes, function (snap) { var out = []; snap.forEach(function (d) { out.push(d.data()); }); fn(out); }, onErr); }
    };
  } catch (e) { console.error("Database connection failed", e); return null; }
})();
