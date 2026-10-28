/* ROOM POLL ROUTER: QUIZ CONTENT AND SCORING (FCIS 2026)
   Each option ends with the path it scores: J = Joy, I = Integrity, S = Safety.
   null = room snapshot only (does not affect the path).
   Answer order is mixed on purpose so no pattern shows on phones. */
window.RPR_QUIZ = {
  warmup: "One word for AI in your school right now.",
  questions: [
    { id: "q1", short: "Kept you up at night", component: "Counts double", weight: 2,
      text: "What kept you up at night this semester?",
      options: [["Work turned in that I\u2019m not sure a student actually did", "I"], ["Not knowing where student data and images end up", "S"], ["Wondering if the spark is going out of learning, for my students or for me", "J"]],
      decode: "It was asking which protection keeps you up at night." },
    { id: "q2", short: "First thought", component: "Routing",
      text: "When you find out a student used AI, your first thought is...",
      options: [["\u201CDid they actually do the thinking?\u201D", "I"], ["\u201CAre they still enjoying the learning?\u201D", "J"], ["\u201CWhat did they just share, and with whom?\u201D", "S"]],
      decode: "It was asking what you protect first when AI shows up." },
    { id: "q3", short: "Worst headline", component: "Routing",
      text: "Which headline would worry you most?",
      options: [["\u201CFake image of a student spreads through a school\u201D", "S"], ["\u201CAI detector wrongly accuses an honor student\u201D", "I"], ["\u201CStudents say school now feels like busywork for a chatbot\u201D", "J"]],
      decode: "It was asking which failure you fear most." },
    { id: "q4", short: "One free hour", component: "Routing",
      text: "You get one free hour this week for AI work. You\u2019d spend it...",
      options: [["Redesigning a lesson so students do more of the real thinking", "J"], ["Reviewing which apps students use and what they collect", "S"], ["Rewriting assignment rules and how students show their work", "I"]],
      decode: "It was asking where you would invest your own time." },
    { id: "q5", short: "Your role", component: "Room snapshot",
      text: "What\u2019s your role?",
      options: [["Teacher", null], ["Administrator or division head", null], ["Technology or IT", null], ["Other", null]],
      decode: "This one was just to see who\u2019s in the room." },
    { id: "q6", short: "Grade band", component: "Room snapshot",
      text: "Which grades do you work with most?",
      options: [["Lower school", null], ["Middle school", null], ["Upper school", null], ["A mix, or all of them", null]],
      decode: "So was this one. It didn\u2019t change the path." }
  ],
  paths: {
    J: { name: "Joy", color: "#ef7225",
         means: ["Deep dive: New York City\u2019s student AI pause", "Three moves that protect joy", "Integrity and Safety in the full picture"] },
    I: { name: "Integrity", color: "#006cff",
         means: ["Deep dive: when a detector score becomes the verdict", "Three moves that protect integrity", "Joy and Safety in the full picture"] },
    S: { name: "Safety", color: "#001e62",
         means: ["Deep dive: the Oviedo AI camera lockdown", "Three moves that protect safety", "Joy and Integrity in the full picture"] }
  },
  order: ["J", "I", "S"],
  headline: "q1",   /* first tie-breaker: whichever path won this question */
  tieBreak: "I"     /* last tie-breaker */
};

/* Scoring: each answer adds its question's weight (1 unless set) to its path.
   Room-snapshot answers (null) add nothing. Ties go to the headline question's
   winner, then to tieBreak. */
window.RPR_SCORE = function (votes) {
  var Q = window.RPR_QUIZ, s = { J: 0, I: 0, S: 0 }, head = { J: 0, I: 0, S: 0 }, n = 0;
  votes.forEach(function (v) {
    var a = v.a || {}, any = false;
    Q.questions.forEach(function (q) {
      var x = a[q.id];
      if (typeof x === "number" && q.options[x]) {
        var p = q.options[x][1];
        if (p) { s[p] += (q.weight || 1); any = true; if (q.id === Q.headline) head[p]++; }
      }
    });
    if (any) n++;
  });
  var max = Math.max(s.J, s.I, s.S), tied = Q.order.filter(function (k) { return s[k] === max; }), win = null;
  if (n) {
    if (tied.length === 1) win = tied[0];
    else {
      var hm = Math.max.apply(null, tied.map(function (k) { return head[k]; })),
          ht = tied.filter(function (k) { return head[k] === hm; });
      win = ht.length === 1 ? ht[0] : (ht.indexOf(Q.tieBreak) > -1 ? Q.tieBreak : ht[0]);
    }
  }
  return { scores: s, winner: win, voters: n };
};
