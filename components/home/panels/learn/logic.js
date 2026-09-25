// Ported verbatim from design-handoff/design/LearnPanel.dc.html (+ LearnPanelMobile.dc.html).
// Only the layout-specific constants are parameterised on props.layout.
import { DCLogic } from '../../dc/useDCLogic';

export default class LearnLogic extends DCLogic {
constructor(props) {
super(props);
this.PW = 105; this.PH = 68;
this.CK = [
{ ep: 1, q: 0.05, win: '8%', rew: '−3.1', pos: '41%', goal: '6%', ent: '1.52' },
{ ep: 500, q: 0.35, win: '31%', rew: '+2.8', pos: '49%', goal: '14%', ent: '1.05' },
{ ep: 2000, q: 0.65, win: '52%', rew: '+8.9', pos: '54%', goal: '24%', ent: '0.71' },
{ ep: 8421, q: 0.95, win: '64%', rew: '+12.4', pos: '58%', goal: '31%', ent: '0.42' }
];
this.LOOK = {"hair": {"curlsXL": ["M-23.0,-17.0 a23,21 0 1 1 46.0,0 L21.0,-5.0 L-21.0,-5.0 Z M-27.8,-9.8 a6.2,6.2 0 1 1 12.4,0 a6.2,6.2 0 1 1 -12.4,0 Z M-29.1,-15.4 a6.2,6.2 0 1 1 12.4,0 a6.2,6.2 0 1 1 -12.4,0 Z M-28.7,-21.2 a6.2,6.2 0 1 1 12.4,0 a6.2,6.2 0 1 1 -12.4,0 Z M-26.7,-26.6 a6.2,6.2 0 1 1 12.4,0 a6.2,6.2 0 1 1 -12.4,0 Z M-23.1,-31.3 a6.2,6.2 0 1 1 12.4,0 a6.2,6.2 0 1 1 -12.4,0 Z M-18.2,-34.9 a6.2,6.2 0 1 1 12.4,0 a6.2,6.2 0 1 1 -12.4,0 Z M-12.4,-37.2 a6.2,6.2 0 1 1 12.4,0 a6.2,6.2 0 1 1 -12.4,0 Z M-6.2,-38.0 a6.2,6.2 0 1 1 12.4,0 a6.2,6.2 0 1 1 -12.4,0 Z M0.0,-37.2 a6.2,6.2 0 1 1 12.4,0 a6.2,6.2 0 1 1 -12.4,0 Z M5.8,-34.9 a6.2,6.2 0 1 1 12.4,0 a6.2,6.2 0 1 1 -12.4,0 Z M10.7,-31.3 a6.2,6.2 0 1 1 12.4,0 a6.2,6.2 0 1 1 -12.4,0 Z M14.3,-26.6 a6.2,6.2 0 1 1 12.4,0 a6.2,6.2 0 1 1 -12.4,0 Z M16.3,-21.2 a6.2,6.2 0 1 1 12.4,0 a6.2,6.2 0 1 1 -12.4,0 Z M16.7,-15.4 a6.2,6.2 0 1 1 12.4,0 a6.2,6.2 0 1 1 -12.4,0 Z M15.4,-9.8 a6.2,6.2 0 1 1 12.4,0 a6.2,6.2 0 1 1 -12.4,0 Z M-25.5,-2.0 a5.5,5.5 0 1 1 11.0,0 a5.5,5.5 0 1 1 -11.0,0 Z M14.5,-2.0 a5.5,5.5 0 1 1 11.0,0 a5.5,5.5 0 1 1 -11.0,0 Z M-14.0,-40.0 a6,6 0 1 1 12,0 a6,6 0 1 1 -12,0 Z M2.0,-40.0 a6,6 0 1 1 12,0 a6,6 0 1 1 -12,0 Z", "M-17.6,-23.5 a4.6,4.6 0 1 1 9.2,0 a4.6,4.6 0 1 1 -9.2,0 Z M-13.3,-22.3 a4.6,4.6 0 1 1 9.2,0 a4.6,4.6 0 1 1 -9.2,0 Z M-8.9,-23.5 a4.6,4.6 0 1 1 9.2,0 a4.6,4.6 0 1 1 -9.2,0 Z M-4.6,-22.3 a4.6,4.6 0 1 1 9.2,0 a4.6,4.6 0 1 1 -9.2,0 Z M-0.3,-23.5 a4.6,4.6 0 1 1 9.2,0 a4.6,4.6 0 1 1 -9.2,0 Z M4.1,-22.3 a4.6,4.6 0 1 1 9.2,0 a4.6,4.6 0 1 1 -9.2,0 Z M8.4,-23.5 a4.6,4.6 0 1 1 9.2,0 a4.6,4.6 0 1 1 -9.2,0 Z"], "curls": ["M-19.5,-16.0 a19.5,17 0 1 1 39.0,0 L17.5,-4.0 L-17.5,-4.0 Z M-23.1,-10.2 a4.8,4.8 0 1 1 9.6,0 a4.8,4.8 0 1 1 -9.6,0 Z M-24.3,-15.5 a4.8,4.8 0 1 1 9.6,0 a4.8,4.8 0 1 1 -9.6,0 Z M-23.5,-20.9 a4.8,4.8 0 1 1 9.6,0 a4.8,4.8 0 1 1 -9.6,0 Z M-20.8,-25.8 a4.8,4.8 0 1 1 9.6,0 a4.8,4.8 0 1 1 -9.6,0 Z M-16.4,-29.6 a4.8,4.8 0 1 1 9.6,0 a4.8,4.8 0 1 1 -9.6,0 Z M-10.9,-32.1 a4.8,4.8 0 1 1 9.6,0 a4.8,4.8 0 1 1 -9.6,0 Z M-4.8,-33.0 a4.8,4.8 0 1 1 9.6,0 a4.8,4.8 0 1 1 -9.6,0 Z M1.3,-32.1 a4.8,4.8 0 1 1 9.6,0 a4.8,4.8 0 1 1 -9.6,0 Z M6.8,-29.6 a4.8,4.8 0 1 1 9.6,0 a4.8,4.8 0 1 1 -9.6,0 Z M11.2,-25.8 a4.8,4.8 0 1 1 9.6,0 a4.8,4.8 0 1 1 -9.6,0 Z M13.9,-20.9 a4.8,4.8 0 1 1 9.6,0 a4.8,4.8 0 1 1 -9.6,0 Z M14.7,-15.5 a4.8,4.8 0 1 1 9.6,0 a4.8,4.8 0 1 1 -9.6,0 Z M13.5,-10.2 a4.8,4.8 0 1 1 9.6,0 a4.8,4.8 0 1 1 -9.6,0 Z", "M-15.8,-23.0 a3.8,3.8 0 1 1 7.6,0 a3.8,3.8 0 1 1 -7.6,0 Z M-11.8,-21.8 a3.8,3.8 0 1 1 7.6,0 a3.8,3.8 0 1 1 -7.6,0 Z M-7.8,-23.0 a3.8,3.8 0 1 1 7.6,0 a3.8,3.8 0 1 1 -7.6,0 Z M-3.8,-21.8 a3.8,3.8 0 1 1 7.6,0 a3.8,3.8 0 1 1 -7.6,0 Z M0.2,-23.0 a3.8,3.8 0 1 1 7.6,0 a3.8,3.8 0 1 1 -7.6,0 Z M4.2,-21.8 a3.8,3.8 0 1 1 7.6,0 a3.8,3.8 0 1 1 -7.6,0 Z M8.2,-23.0 a3.8,3.8 0 1 1 7.6,0 a3.8,3.8 0 1 1 -7.6,0 Z"], "crop": ["", "M-17,-7 C-18.5,-24 -8,-30.5 0,-30.5 C8,-30.5 18.5,-24 17,-7 C15.5,-14 12,-18.5 7,-19.5 C2,-18 -6,-18 -11,-19.5 C-14.5,-16.5 -16.2,-12 -17,-7 Z"], "buzz": ["", "M-16.6,-9 C-17.2,-23 -8.5,-28.8 0,-28.8 C8.5,-28.8 17.2,-23 16.6,-9 C15,-17.5 9,-22 0,-22 C-9,-22 -15,-17.5 -16.6,-9 Z"], "quiff": ["", "M-17,-7 C-18,-22 -11,-29 -3,-30 C3,-37.5 14.5,-36 16.5,-29 C18.5,-22 17.8,-14 17,-7 C15.5,-15 11,-19 5,-19.8 C-2,-18.2 -9,-18.2 -13,-19.5 C-15.5,-16 -16.5,-12 -17,-7 Z"], "bun": ["M-6.2,-34.0 a6.2,6.2 0 1 1 12.4,0 a6.2,6.2 0 1 1 -12.4,0 Z", "M-17,-7 C-18.5,-24 -8,-30.5 0,-30.5 C8,-30.5 18.5,-24 17,-7 C15.5,-15 11,-20.5 0,-21 C-11,-20.5 -15.5,-15 -17,-7 Z"], "long": ["M-19.5,-10 C-21.5,-31 21.5,-31 19.5,-10 L20.5,16 C20.5,20 16,21 13.5,19 L13,-4 L-13,-4 L-13.5,19 C-16,21 -20.5,20 -20.5,16 Z", "M-17,-5 C-18,-24 -6,-31 2,-30.5 C12,-29.5 18.5,-22 17,-5 C14.5,-15 8,-20 1,-21 C-5,-15.5 -12,-11 -17,-5 Z"], "side": ["", "M-17,-7 C-18.5,-24 -8,-30.5 1,-30.5 C10,-30.5 18.5,-24 17,-7 C16,-15 12.5,-20 6,-21 L-2.5,-21.5 C-8,-18.5 -13.5,-13.5 -17,-7 Z"], "bald": ["", ""]}, "beard": {"full": "M-16.5,-3 C-16.5,10 -10,24.5 0,25.5 C10,24.5 16.5,10 16.5,-3 L14,-3 C13,5.5 9,9.5 4.5,8.6 C2,7.4 -2,7.4 -4.5,8.6 C-9,9.5 -13,5.5 -14,-3 Z", "trim": "M-15.5,1 C-15,11 -9,20 0,21 C9,20 15,11 15.5,1 L13.5,1 C12.5,8 8.5,11.5 4.5,10.5 C2,9.3 -2,9.3 -4.5,10.5 C-8.5,11.5 -12.5,8 -13.5,1 Z", "stubble": "M-16,-1 C-16,11 -9.5,21 0,22 C9.5,21 16,11 16,-1 L14,-1 C13,7 8,10.5 0,10.5 C-8,10.5 -13,7 -14,-1 Z", "tache": "M-6.5,8.8 C-4,6.4 4,6.4 6.5,8.8 C3.5,9.9 -3.5,9.9 -6.5,8.8 Z", "none": ""}, "beardOp": {"full": "1", "trim": "1", "stubble": "0.28", "tache": "1", "none": "0"}, "brow": {"arch": "M-11.5,-9.8 Q-8,-12.6 -4,-10.6 M4,-10.6 Q8,-12.6 11.5,-9.8", "flat": "M-11.5,-10.4 L-4,-10.8 M4,-10.8 L11.5,-10.4", "stern": "M-11.5,-11.6 L-4,-9.9 M4,-9.9 L11.5,-11.6"}, "jaw": {"oval": "M-16,-10 C-16,-27 16,-27 16,-10 L15.2,3 C13.5,13.5 7,19.5 0,19.5 C-7,19.5 -13.5,13.5 -15.2,3 Z", "square": "M-16.5,-10 C-16.5,-27 16.5,-27 16.5,-10 L16,6 C15,14 9,19 0,19 C-9,19 -15,14 -16,6 Z", "long": "M-15.2,-11 C-15.2,-28 15.2,-28 15.2,-11 L14.6,4 C13,15 7,21 0,21 C-7,21 -13,15 -14.6,4 Z"}, "kits": {"rl": ["#C8372D", "#FEFEFE", "#F0CBC2", "#C8372D", "#C8372D"], "rlgk": ["#4E5A2E", "#E0E7D7", "#F0CBC2", "#4E5A2E", "#C8372D"], "bl": ["#3F4A55", "#C9CFD4", "#D2D8DD", "#3F4A55", "#3F4A55"], "blgk": ["#C9A74A", "#FEFEFE", "#D2D8DD", "#8C7226", "#3F4A55"]}};
this.ROSTER = [
[
{ num: 1, role: 'GK', label: 'Goalkeeper', beh: 'reads the shooter, protects the near post', home: [3, 34], kit: 'rlgk', hair: 'crop', hc: '#2B211B', skin: '#E3B893', beard: 'stubble', brow: 'flat', jaw: 'square' },
{ num: 4, role: 'DEF', label: 'Defender', beh: 'presses the carrier instead of chasing the ball', home: [24, 22], kit: 'rl', hair: 'buzz', hc: '#A8864E', skin: '#F1D2B8', beard: 'none', brow: 'stern', jaw: 'square' },
{ num: 5, role: 'DEF', label: 'Defender', beh: 'holds the line, cuts passing lanes', home: [24, 46], kit: 'rl', hair: 'bald', hc: '#1C1410', skin: '#6E4431', beard: 'full', brow: 'flat', jaw: 'oval' },
{ num: 7, role: 'MID', label: 'Midfielder', beh: 'drifts into space to open passing lanes', home: [44, 18], kit: 'rl', hair: 'bun', hc: '#2B1D14', skin: '#D9A77E', beard: 'none', brow: 'arch', jaw: 'oval' },
{ num: 10, role: 'MID', label: 'Playmaker', beh: 'switches play and finds the runner', home: [46, 38], kit: 'rl', hair: 'long', hc: '#5A3A22', skin: '#F2D3BC', beard: 'trim', brow: 'flat', jaw: 'long' },
{ num: 11, role: 'FWD', label: 'Striker · a Mo Salah tribute', beh: 'attacks space, cuts inside onto the left foot', home: [62, 52], kit: 'rl', hair: 'curlsXL', hc: '#1A1210', skin: '#B5805A', beard: 'full', brow: 'arch', jaw: 'oval' }
],
[
{ num: 1, role: 'GK', label: 'Goalkeeper', beh: 'scripted: mirrors the ball’s height', home: [3, 34], kit: 'blgk', hair: 'bald', hc: '#2A2420', skin: '#E9C4A2', beard: 'none', brow: 'flat', jaw: 'square' },
{ num: 3, role: 'DEF', label: 'Defender', beh: 'scripted: follows the nearest attacker', home: [24, 22], kit: 'bl', hair: 'crop', hc: '#141010', skin: '#8A5A3E', beard: 'none', brow: 'stern', jaw: 'square' },
{ num: 2, role: 'DEF', label: 'Defender', beh: 'scripted: follows the nearest attacker', home: [24, 46], kit: 'bl', hair: 'quiff', hc: '#B08850', skin: '#F1CFB4', beard: 'none', brow: 'arch', jaw: 'long' },
{ num: 8, role: 'MID', label: 'Midfielder', beh: 'scripted: stays in formation', home: [44, 18], kit: 'bl', hair: 'long', hc: '#2B1D14', skin: '#D6A27A', beard: 'none', brow: 'arch', jaw: 'oval' },
{ num: 6, role: 'MID', label: 'Midfielder', beh: 'scripted: stays in formation', home: [46, 38], kit: 'bl', hair: 'curls', hc: '#140E0A', skin: '#6E4631', beard: 'stubble', brow: 'flat', jaw: 'oval' },
{ num: 9, role: 'FWD', label: 'Striker', beh: 'scripted: runs at goal, shoots on sight', home: [62, 52], kit: 'bl', hair: 'side', hc: '#6A4A2A', skin: '#EAC4A6', beard: 'tache', brow: 'stern', jaw: 'square' }
]
];
this.autoTrain = true; this.SHOW = 1.8;
this.state = { mode: 'team', view: 'live', ck: this.autoTrain ? 0 : 3, sel: -1, tick: 0, playing: !(props && props.reduced) };
this.stageT = 0; this.banner = null; this.tags = {}; this.roles = {};
this.box = this.props.layout === 'mobile' ? { w: 358, h: 236, tw: 358 } : { w: 818, h: 540, tw: 818 }; this.TAGCW = this.props.layout === 'mobile' ? 1.44 : 0.78;
this.setup('team', this.state.ck);
}
setup(mode, ck) {
this.q = this.CK[ck].q;
this.players = [];
for (let t = 0; t < 2; t++) this.ROSTER[t].forEach((r, i) => {
const hx = t === 0 ? r.home[0] : this.PW - r.home[0], hy = t === 0 ? r.home[1] : this.PH - r.home[1];
this.players.push({ id: this.players.length, team: t, idx: i, r: r, hx: hx, hy: hy, x: hx, y: hy, vx: 0, vy: 0, tx: hx, ty: hy, active: true, drib: null, safe: 0, stun: 0, planT: Math.random() * 0.6, sup: null, side: 0, fx: t === 0 ? 1 : -1, fy: 0 });
});
if (mode === 'solo') this.players.forEach((p) => { p.active = p.team === 0 ? p.r.num === 11 : [1, 3, 2, 6].indexOf(p.r.num) >= 0; });
this.mode = mode;
this.score = [0, 0]; this.clock = 0; this.matches = 0; this.attempts = 1;
this.stats = { shots: [0, 0], passes: 0, passOk: 0, poss: [0.01, 0.01] };
this.ball = { x: 52.5, y: 34, vx: 0, vy: 0 };
this.trail = [];
this.owner = null; this.lastKick = null; this.kickT = 0; this.shot = null; this.pass = null;
this.pause = 0; this.after = null; this.celebrate = null; this.dec = null; this.note = null; this.noteCd = 3;
this.aiT = 0; this.decT = 0.6;
this.cam = { x: 52.5, y: 34, z: mode === 'solo' ? 1.3 : 1 };
this.kickoff(0);
}
P(team, num) { return this.players.find((p) => p.team === team && p.r.num === num); }
act() { return this.players.filter((p) => p.active); }
kickoff(team) {
this.players.forEach((p) => { p.x = p.team === 0 ? Math.min(p.hx, 47) : Math.max(p.hx, 58); p.y = p.hy; p.vx = 0; p.vy = 0; p.tx = p.hx; p.ty = p.hy; p.drib = null; p.safe = 0; p.stun = 0; p.sup = null; p.planT = 0; p.side = 0; });
this.shot = null; this.pass = null; this.celebrate = null; this.trail = [];
if (this.mode === 'solo') {
const s = this.P(0, 11); s.x = 56 + Math.random() * 6; s.y = 50 + Math.random() * 6;
this.give(s); this.decT = 0.5; return;
}
const p = team === 0 ? this.P(0, 10) : this.P(1, 6);
p.x = team === 0 ? 51.5 : 53.5; p.y = 34;
this.give(p); this.decT = 0.7;
}
give(p) { if (this.owner !== p) p.safe = 0.8; p.drib = null; this.owner = p; this.ball.vx = 0; this.ball.vy = 0; this.ball.x = p.x; this.ball.y = p.y; }
dir(t) { return t === 0 ? 1 : -1; }
gx(t) { return t === 0 ? this.PW : 0; }
dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
segDist(px, py, ax, ay, bx, by) {
const dx = bx - ax, dy = by - ay, L = dx * dx + dy * dy || 1;
let u = ((px - ax) * dx + (py - ay) * dy) / L; u = Math.max(0, Math.min(1, u));
return Math.hypot(ax + u * dx - px, ay + u * dy - py);
}
opps(p) { return this.act().filter((o) => o.team !== p.team); }
mates(p) { return this.act().filter((o) => o.team === p.team && o !== p); }
minOppDist(p, x, y) { let m = 99; this.opps(p).forEach((o) => { m = Math.min(m, Math.hypot(o.x - x, o.y - y)); }); return m; }
shotP(p) {
const gx = this.gx(p.team), d = Math.hypot(gx - p.x, 34 - p.y), cos = Math.abs(gx - p.x) / Math.max(d, 0.1);
let blockers = 0;
this.opps(p).forEach((o) => { if (o.r.role !== 'GK' && this.segDist(o.x, o.y, p.x, p.y, gx, 34) < 1.8) blockers++; });
let v = 1.0 * Math.exp(-d / 15.5) * (0.25 + 0.75 * cos) * Math.pow(0.6, blockers);
const gk = this.opps(p).find((o) => o.r.role === 'GK');
if (gk && Math.abs(gk.y - p.y) < 2.2 && d > 8) v *= 0.82;
v *= p.team === 0 ? (this.mode === 'solo' ? 0.5 + 0.55 * this.q : 0.3 + 0.3 * this.q) : 1.35;
if (p.team === 0 && p.r.num === 11 && p.y > 37 && p.y < 49 && p.x > 80 && p.x < 96) v *= 1.25;
if (this.autoTrain) v *= this.SHOW;
return Math.max(0.01, Math.min(0.88, v));
}
passOpt(p) {
let best = null, bv = -1;
this.mates(p).forEach((t) => {
if (t.r.role === 'GK') return;
const open = Math.min(12, this.minOppDist(p, t.x, t.y)) / 12;
let lane = 6; this.opps(p).forEach((o) => { lane = Math.min(lane, this.segDist(o.x, o.y, p.x, p.y, t.x, t.y)); });
if (lane < 1.3) return;
const L = this.dist(p, t); if (L < 5 || L > 38) return;
const prog = Math.max(-0.5, Math.min(1, this.dir(p.team) * (t.x - p.x) / 30));
const v = Math.min(1, 0.3 * open + 0.3 * (lane / 6) + 0.3 * prog + 0.35 * this.shotP(t)) - 0.08;
if (v > bv) { bv = v; best = t; }
});
return { t: best, v: Math.max(0, bv) };
}
dribV(p) {
const d = this.dir(p.team); let near = 12;
this.opps(p).forEach((o) => { const dx = (o.x - p.x) * d; if (dx > -1) near = Math.min(near, Math.hypot(o.x - p.x, o.y - p.y)); });
return Math.max(0.05, Math.min(0.95, 0.15 + 0.7 * (near / 12)));
}
decide(p) {
const rl = p.team === 0, sp = this.shotP(p), po = this.passOpt(p), dv = this.dribV(p);
const gxd = Math.abs(this.gx(p.team) - p.x);
const vals = { SHOOT: gxd > 32 ? sp * 0.15 : sp, DRIBBLE: dv * 0.85, PASS: po.t ? po.v : 0 };
let a;
if (p.r.role === 'GK') a = 'PASS';
else if (rl) {
const eps = 0.3 * (1 - this.q) + 0.04, noise = 0.35 * (1 - this.q);
this._rnd = false;
if (Math.random() < eps) { this._rnd = true; const opts = this.q < 0.5 || gxd < 34 ? ['SHOOT', 'DRIBBLE', 'PASS'] : ['DRIBBLE', 'PASS']; a = opts[Math.floor(Math.random() * opts.length)]; }
else {
let bv = -9; ['SHOOT', 'DRIBBLE', 'PASS'].forEach((k) => { const v = vals[k] * (k === 'SHOOT' ? 1.5 : 1) + (Math.random() - 0.5) * noise; if (v > bv) { bv = v; a = k; } });
}
if (this.mode === 'solo' && a === 'PASS') a = 'DRIBBLE';
this.eps = eps;
if (p.r.role !== 'GK') this.tag(p, (this._rnd ? 'random ' : '') + a.toLowerCase() + (this._rnd ? '?' : ''), 1.1);
} else {
const pressure = this.minOppDist(p, p.x, p.y) < 3.5;
if (gxd < 24) a = 'SHOOT'; else if (pressure && po.t && Math.random() < 0.5) a = 'PASS'; else a = 'DRIBBLE';
}
if (a === 'PASS' && !po.t) a = 'DRIBBLE';
const show = rl && p.r.role !== 'GK' && (a !== 'DRIBBLE' || vals.SHOOT > 0.3 || (p.r.num === 11 && gxd < 40));
if (show) this.dec = { pid: p.id, vals: vals, a: a, eps: this.eps || 0.05, t: 1.3, res: a === 'DRIBBLE' ? 'carry' : '…' };
if (a === 'SHOOT') this.doShoot(p, sp);
else if (a === 'PASS') this.doPass(p, po.t);
else this.doDrib(p);
}
doShoot(p, sp) {
const gx = this.gx(p.team), d = this.dir(p.team), gk = this.opps(p).find((o) => o.r.role === 'GK');
const r = Math.random(); let ty, kind;
if (r < sp) { kind = 'goal'; const side = gk && gk.y > 34 ? -1 : 1; ty = 34 + side * (1.6 + Math.random() * 1.8); }
else if (r < sp + (1 - sp) * 0.55) { kind = 'save'; ty = gk ? gk.y + (Math.random() - 0.5) : 34; }
else { kind = 'wide'; ty = 34 + (Math.random() < 0.5 ? -1 : 1) * (5.5 + Math.random() * 3); }
const tx = gx + d * 2, L = Math.hypot(tx - p.x, ty - p.y), s = 40;
this.owner = null; this.ball.vx = (tx - p.x) / L * s; this.ball.vy = (ty - p.y) / L * s;
this.lastKick = p; this.kickT = 0.3; this.shot = { team: p.team, kind: kind, by: p, p: sp }; this.pass = null;
this.stats.shots[p.team]++;
}
doPass(p, t) {
const lx = t.x + t.vx * 0.5, ly = t.y + t.vy * 0.5, L = Math.hypot(lx - p.x, ly - p.y) || 1, s = Math.min(32, 14 + L * 1.0);
this.owner = null; this.ball.vx = (lx - p.x) / L * s; this.ball.vy = (ly - p.y) / L * s;
this.lastKick = p; this.kickT = 0.25; this.pass = { from: p, to: t, team: p.team }; this.shot = null;
if (p.team === 0) this.stats.passes++;
if (p.team === 0 && (t.r.num === 7) && this.mode === 'team') this.flag('#7 opens a passing lane');
}
doDrib(p) {
const d = this.dir(p.team); let lat = 0;
let near = null, nd = 99; this.opps(p).forEach((o) => { const k = Math.hypot(o.x - p.x, o.y - p.y); if (k < nd && (o.x - p.x) * d > -2) { nd = k; near = o; } });
if (near && nd < 9) { if (!p.side || Math.abs(p.y - near.y) > 2.5) p.side = p.y > near.y ? 1 : -1; if (p.y > this.PH - 8) p.side = -1; if (p.y < 8) p.side = 1; lat = p.side * 4; } else p.side = 0;
let ty = p.y + lat;
if (p.team === 0 && p.r.num === 11 && p.y > 40 && p.x > 66 && Math.random() < 0.3 + 0.6 * this.q) { ty = p.y - 5; if (p.x > 76) this.flag('#11 finds the inside channel'); }
p.drib = { x: Math.max(2, Math.min(this.PW - 2, p.x + d * 12)), y: Math.max(3, Math.min(this.PH - 3, ty)) };
}
flag(txt) { if (this.noteCd > 0 && !(this.note && this.note.text === txt)) return; if (this.noteCd > 0) return; this.note = { text: txt, t: 2.0 }; this.noteCd = 7; }
home(p) {
const bx = this.ball.x, d = this.dir(p.team), att = this.owner && this.owner.team === p.team;
let x = p.hx + (bx - 52.5) * (p.r.role === 'GK' ? 0 : 0.45) + (att ? d * 7 : -d * 3), y = p.hy + (this.ball.y - 34) * 0.18;
return { x: Math.max(2, Math.min(this.PW - 2, x)), y: Math.max(3, Math.min(this.PH - 3, y)) };
}
tag(p, txt, dur) { if (p.team !== 0 || p.r.role === 'GK') return; this.tags[p.id] = { txt: txt, t: dur || 0.9 }; }
role(p, r, force) { if (p.team !== 0 || p.r.role === 'GK') return; if (this.roles[p.id] !== r || force) { this.roles[p.id] = r; if (!this.tags[p.id] || this.tags[p.id].t < 0.3) this.tag(p, r, 0.8); } }
stageLen(ck) { return [26, 20, 20, 40][ck]; }
goStage(ck) {
this.stageT = 0; this.tags = {}; this.roles = {};
this.setup('team', ck);
this.banner = { a: ck === 0 ? 'EPISODE 1 · random policy' : 'EPISODE ' + this.fmtEp(this.CK[ck].ep) + ' · policy updated', b: 'ε = ' + (0.3 * (1 - this.CK[ck].q) + 0.04).toFixed(2), t: 2.4 };
this.setState({ ck: ck, sel: -1 });
}
settle(p, t) { p.tx += (t.x - p.tx) * 0.4; p.ty += (t.y - p.ty) * 0.4; }
supportSpot(p) {
const h = this.home(p), d = this.dir(p.team), o = this.owner;
if (p.team !== 0) return h;
let best = h, bs = -99;
for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) {
const cx = Math.max(3, Math.min(this.PW - 3, h.x + i * 7)), cy = Math.max(3, Math.min(this.PH - 3, h.y + j * 7));
let m = 99; this.mates(p).forEach((q) => { if (q.r.role !== 'GK') m = Math.min(m, Math.hypot((q.sup ? q.sup.x : q.x) - cx, (q.sup ? q.sup.y : q.y) - cy)); });
let lane = 6; if (o) this.opps(p).forEach((q) => { lane = Math.min(lane, this.segDist(q.x, q.y, o.x, o.y, cx, cy)); });
const sc = Math.min(12, this.minOppDist(p, cx, cy)) / 12 + 0.5 * lane / 6 + 0.12 * i * d - 0.7 * Math.max(0, 9 - m) / 9 - 0.02 * Math.hypot(cx - h.x, cy - h.y);
if (sc > bs) { bs = sc; best = { x: cx, y: cy }; }
}
return { x: h.x + (best.x - h.x) * this.q, y: h.y + (best.y - h.y) * this.q };
}
ai() {
const o = this.owner, b = this.ball, A = this.act(), pt = o ? o.team : -1, flip = pt !== this.possT;
this.possT = pt;
A.forEach((p) => {
if (p === o) { if (p.drib) { p.tx = p.drib.x; p.ty = p.drib.y; } return; }
if (p.r.role === 'GK') {
const gxOwn = p.team === 0 ? 2.2 : this.PW - 2.2;
p.tx = gxOwn; p.ty = 34 + Math.max(-3.2, Math.min(3.2, (b.y - 34) * 0.35));
if (!o && this.shot && this.shot.team !== p.team) { p.ty = Math.max(30, Math.min(38, b.y + b.vy * 0.25)); }
return;
}
const outs = A.filter((q) => q.team === p.team && q.r.role !== 'GK');
if (!o) {
const chaser = this.pass && this.pass.team === p.team ? this.pass.to : outs.slice().sort((a, c) => this.dist(a, b) - this.dist(c, b))[0];
if (chaser === p) { p.tx = b.x + b.vx * 0.3; p.ty = b.y + b.vy * 0.3; this.role(p, 'chase'); return; }
this.settle(p, p.team === pt || !p.sup ? this.home(p) : p.sup); return;
}
if (o.team === p.team) {
p.planT -= 0.12;
if (flip || !p.sup || p.planT <= 0) { const old = p.sup; p.sup = this.supportSpot(p); p.planT = 0.8 + Math.random() * 0.5; if (!old || Math.hypot(old.x - p.sup.x, old.y - p.sup.y) > 5) this.role(p, 'find space', true); }
this.settle(p, p.sup);
if (p.team === 0 && this.mode === 'team') {
const left = outs.filter((q) => q.y < 26 && q.x > 55).length;
if (left >= 3) this.flag('RL FC overloads the left side');
}
return;
}
p.sup = null;
const d = this.dir(p.team);
const presser = outs.slice().sort((a, c) => this.dist(a, o) - this.dist(c, o))[0];
if (presser === p) {
p.tx = o.x - d * 1.1; p.ty = o.y + (34 - o.y) * 0.08; this.role(p, 'press');
if (p.team === 0 && p.r.num === 4 && this.dist(p, o) < 7) this.flag('#4 presses instead of following the ball');
return;
}
const h = this.home(p);
let near = null, nd = 99; A.filter((q) => q.team !== p.team && q !== o && q.r.role !== 'GK').forEach((q) => { const k = this.dist(p, q); if (k < nd) { nd = k; near = q; } });
if (!near) { this.settle(p, h); return; }
if (p.team === 1) { this.settle(p, { x: near.x - d * 2, y: near.y }); return; }
const ax = (o.x + near.x) / 2, ay = (o.y + near.y) / 2, w = 0.25 + 0.6 * this.q;
this.settle(p, { x: h.x * (1 - w) + ax * w, y: h.y * (1 - w) + ay * w });
});
}
onGoal(team) {
this.score[team]++;
if (this.dec && this.shot && this.dec.pid === this.shot.by.id) this.dec.res = 'GOAL';
this.celebrate = { team: team, by: this.shot ? this.shot.by : null };
this.pause = this.mode === 'solo' ? 1.4 : 2.2;
this.after = () => { if (this.mode === 'solo') this.attempts++; this.kickoff(1 - team); };
}
reset1(msg) {
if (this.dec && this.dec.res === '…') this.dec.res = msg;
this.pause = 0.7; this.after = () => { this.attempts++; this.kickoff(0); };
}
update(dt) {
Object.keys(this.tags).forEach((k) => { this.tags[k].t -= dt; if (this.tags[k].t <= 0) delete this.tags[k]; });
if (this.banner) { this.banner.t -= dt; if (this.banner.t <= 0) this.banner = null; }
if (this.autoTrain && this.state.playing && this.mode === 'team') { this.stageT += dt; if (this.stageT >= this.stageLen(this.state.ck)) { this.goStage((this.state.ck + 1) % 4); return; } }
if (this.noteCd > 0) this.noteCd -= dt;
if (this.note) { this.note.t -= dt; if (this.note.t <= 0) this.note = null; }
if (this.dec) { this.dec.t -= dt; if (this.dec.t <= 0) this.dec = null; }
if (this.pause > 0) {
this.pause -= dt;
if (this.pause <= 0 && this.after) { const f = this.after; this.after = null; f(); }
this.camUpdate(dt); return;
}
if (this.mode === 'team') {
this.clock += dt * 18;
if (this.clock >= 5400) { this.matches++; this.score = [0, 0]; this.clock = 0; this.kickoff(this.matches % 2); }
}
this.aiT -= dt; if (this.aiT <= 0) { this.ai(); this.aiT = 0.12; }
const o = this.owner;
if (o) {
this.stats.poss[o.team] += dt;
this.decT -= dt;
if (o.r.role === 'GK') { if (this.decT <= 0) { this.decide(o); this.decT = 0.35; } }
else if (this.decT <= 0) { this.decide(o); this.decT = (this.minOppDist(o, o.x, o.y) < 5 ? 0.3 : 0.55) + Math.random() * 0.15; }
}
this.act().forEach((p) => {
const dx = p.tx - p.x, dy = p.ty - p.y, L = Math.hypot(dx, dy);
if (p.safe > 0) p.safe -= dt; if (p.stun > 0) p.stun -= dt;
const top = (p.r.role === 'GK' ? 7.6 : 9.2) * (p === this.owner ? 0.84 : 1) * (p.stun > 0 ? 0.4 : 1);
const s = Math.min(top, L * 2.2), dvx = L > 0.01 ? dx / L * s : 0, dvy = L > 0.01 ? dy / L * s : 0;
const k = Math.min(1, dt * 7); p.vx += (dvx - p.vx) * k; p.vy += (dvy - p.vy) * k;
p.x = Math.max(0.5, Math.min(this.PW - 0.5, p.x + p.vx * dt)); p.y = Math.max(0.5, Math.min(this.PH - 0.5, p.y + p.vy * dt));
});
const b = this.ball;
if (this.owner) {
const p = this.owner, d = this.dir(p.team), sp = Math.hypot(p.vx, p.vy);
if (sp > 0.8) { p.fx += (p.vx / sp - p.fx) * 0.25; p.fy += (p.vy / sp - p.fy) * 0.25; const n = Math.hypot(p.fx, p.fy) || 1; p.fx /= n; p.fy /= n; }
const fx = p.fx, fy = p.fy;
b.x = p.x + fx * 2.3; b.y = p.y + fy * 2.3 + 0.8; b.vx = p.vx; b.vy = p.vy;
this.opps(p).forEach((q) => {
if (this.owner !== p) return;
const k = this.dist(q, p);
if (k < 1.5 && p.safe <= 0) {
const rate = q.team === 0 ? 0.7 + 1.0 * this.q : 1.7;
if (Math.random() < rate * dt) {
p.stun = 0.6; p.drib = null; this.give(q); this.decT = 0.35; this.lastKick = null; this.pass = null;
if (p.team === 0 && this.dec && this.dec.pid === p.id && this.dec.res === 'carry') this.dec.res = 'TACKLED';
if (this.mode === 'solo' && p.team === 0) this.reset1('TACKLED');
}
}
});
} else {
b.x += b.vx * dt; b.y += b.vy * dt;
const f = Math.pow(0.4, dt); b.vx *= f; b.vy *= f;
if (this.kickT > 0) this.kickT -= dt;
if (b.x > this.PW || b.x < 0) {
const team = b.x > this.PW ? 0 : 1;
if (b.y > 30.34 && b.y < 37.66) { b.x = Math.max(-1, Math.min(this.PW + 1, b.x)); this.onGoal(team); return; }
if (this.dec && this.shot && this.dec.pid === this.shot.by.id) this.dec.res = 'WIDE';
if (this.mode === 'solo') { this.reset1('WIDE'); return; }
const gk = this.P(1 - team, 1); b.x = gk.x; b.y = gk.y; this.give(gk); this.decT = 0.8; this.shot = null; return;
}
if (b.y < 0 || b.y > this.PH) {
const last = this.lastKick, t = last ? 1 - last.team : 0;
b.y = Math.max(0.5, Math.min(this.PH - 0.5, b.y));
const taker = this.act().filter((q) => q.team === t && q.r.role !== 'GK').sort((a, c) => this.dist(a, b) - this.dist(c, b))[0];
if (taker) { taker.x = b.x; taker.y = b.y; this.give(taker); this.decT = 0.5; }
return;
}
let got = null, gd = 99;
this.act().forEach((p) => {
if (p === this.lastKick && this.kickT > 0) return;
const reach = p.r.role === 'GK' ? 1.9 : 1.15, k = Math.hypot(p.x - b.x, p.y - b.y);
if (k < reach && k < gd) {
if (p.r.role === 'GK' && this.shot && this.shot.kind === 'goal' && this.shot.team !== p.team) return;
got = p; gd = k;
}
});
if (got) {
if (this.shot && this.dec && this.dec.pid === this.shot.by.id) this.dec.res = got.r.role === 'GK' ? 'SAVED' : 'BLOCKED';
if (this.pass) {
if (got.team === this.pass.team) { if (got.team === 0) this.stats.passOk++; if (this.dec && this.dec.pid === this.pass.from.id) this.dec.res = 'COMPLETE'; }
else if (this.dec && this.dec.pid === this.pass.from.id) this.dec.res = 'INTERCEPTED';
}
if (this.mode === 'solo' && got.team === 1) { this.reset1(got.r.role === 'GK' ? 'SAVED' : 'BLOCKED'); return; }
this.give(got); this.shot = null; this.pass = null; this.decT = got.r.role === 'GK' ? 0.8 : 0.25;
}
}
this.trail.push([b.x, b.y]); if (this.trail.length > 16) this.trail.shift();
this.camUpdate(dt);
}
camUpdate(dt) {
if (this.mode === 'solo') { this.cam.x = 72; this.cam.y = 34; this.cam.z = 1.45; }
else { this.cam.x = 52.5; this.cam.y = 34; this.cam.z = 1; }
}
view() {
const bw = this.box.w, bh = this.box.h, asp = bw / bh;
let vw, vh; const W0 = this.PW + 4, H0 = this.PH + 4;
if (W0 / H0 < asp) { vh = H0; vw = vh * asp; } else { vw = W0; vh = vw / asp; }
vw /= this.cam.z; vh /= this.cam.z;
let x = this.cam.x - vw / 2, y = this.cam.y - vh / 2;
const clampA = (v, size, lo, hi) => (size >= hi - lo ? (lo + hi - size) / 2 : Math.max(lo, Math.min(hi - size, v)));
x = clampA(x, vw, -5, this.PW + 5); y = clampA(y, vh, -5, this.PH + 5);
return { x: x, y: y, w: vw, h: vh, bw: bw, bh: bh };
}
componentDidMount() {
this.last = 0;
const loop = (t) => {
const dt = this.last ? Math.min(0.05, (t - this.last) / 1000) : 0.016; this.last = t;
if (!(this.props.reduced && !this.state.playing)) this.update(dt);
this.setState({ tick: (this.state.tick + 1) % 1000000 });
this.raf = requestAnimationFrame(loop);
};
this.raf = requestAnimationFrame(loop);
}
componentWillUnmount() { cancelAnimationFrame(this.raf); }
look(p) {
const r = p.r, L = this.LOOK, k = L.kits[r.kit], full = r.beard === 'full' || r.beard === 'trim';
return { bg: k[2], kit: k[0], trim: k[1], badge: k[3], edge: k[4], skin: r.skin, hc: r.hc, hb: L.hair[r.hair][0], hf: L.hair[r.hair][1], bd: L.beard[r.beard], bdo: L.beardOp[r.beard], brow: L.brow[r.brow], jaw: L.jaw[r.jaw], mc: full ? '#E3A48C' : '#5A2E24', num: String(r.num) };
}
fmtEp(n) { return n.toLocaleString('en-US'); }
// Fit the pitch to the space the panel actually has (props.size = measured {w, h}).
fitBox() {
const s = this.props.size;
if (!s || !s.w) return;
if (this.props.layout === 'mobile') { const w = Math.round(s.w); this.box = { w: w, h: Math.min(380, Math.round(w * 236 / 358)), tw: w }; return; }
const h = Math.max(240, Math.round(s.h - 60)), w = Math.max(320, Math.min(Math.round(s.w - 24), Math.round(h * 1.75)));
this.box = { w: w, h: h, tw: w };
}
renderVals() {
this.fitBox();
const V = this.view(), sx = (x) => (x - V.x) / V.w * V.bw, sy = (y) => (y - V.y) / V.h * V.bh;
const cel = this.celebrate;
const players = this.players.map((p) => {
const r = p.r, bob = cel && cel.team === p.team && p.active ? Math.sin(Date.now() / 90 + p.id) * 0.35 : 0;
const deciding = this.dec && this.dec.pid === p.id;
return {
tf: 'translate(' + p.x.toFixed(2) + ' ' + (p.y + bob).toFixed(2) + ')',
op: p.active ? '1' : '0',
...this.look(p),
halo: deciding ? '0.9' : (this.state.sel === p.id ? '0.6' : '0'),
haloC: deciding ? '#1C1C1C' : '#555555',
tag: this.tags[p.id] ? this.tags[p.id].txt : '', tagOp: this.tags[p.id] ? String(Math.min(1, this.tags[p.id].t * 4).toFixed(2)) : '0', tagW: this.tags[p.id] ? (this.tags[p.id].txt.length * this.TAGCW + 1.6).toFixed(2) : '0', tagX: this.tags[p.id] ? (-(this.tags[p.id].txt.length * this.TAGCW + 1.6) / 2).toFixed(2) : '0', tagBg: this.tags[p.id] && this.tags[p.id].txt.indexOf('random') === 0 ? '#BA9A91' : '#1C1C1C',
pick: () => this.setState({ sel: this.state.sel === p.id ? -1 : p.id })
};
});
const b = this.ball, tr = this.trail.map((t) => t[0].toFixed(2) + ',' + t[1].toFixed(2)).join(' ');
let dec = null;
if (this.dec) {
const p = this.players[this.dec.pid], v = this.dec.vals;
const rows = ['SHOOT', 'DRIBBLE', 'PASS'].map((k) => ({ k: k, v: v[k].toFixed(2), w: String(Math.round(Math.min(1, v[k]) * 100)), on: k === this.dec.a ? '#1C1C1C' : '#9A9A9A', bar: k === this.dec.a ? '#4E5A2E' : '#CCCCCC' }));
const icon = this.dec.a === 'SHOOT' ? '⚽' : this.dec.a === 'PASS' ? '↗' : '→';
let x = sx(p.x) + 22, y = sy(p.y) - 150;
if (x > V.bw - 196) x = sx(p.x) - 214; if (x < 8) x = 8; if (y < 8) y = 8; if (y > V.bh - 160) y = V.bh - 160;
dec = { left: String(Math.round(x)), top: String(Math.round(y)), title: '#' + p.r.num + ' · DECISION', rows: rows, eps: 'ε = ' + this.dec.eps.toFixed(2), flow: this.dec.a + '  →  ' + icon + '  →  ' + this.dec.res, flowC: this.dec.res === 'GOAL' || this.dec.res === 'COMPLETE' ? '#4E5A2E' : (this.dec.res === '…' || this.dec.res === 'carry' ? '#555555' : '#7A5A51') };
}
let sel = null;
if (this.state.sel >= 0 && this.players[this.state.sel].active) {
const p = this.players[this.state.sel];
const cw = V.bw < 500 ? 236 : 316, ch = V.bw < 500 ? 104 : 132; let x = sx(p.x) - cw / 2, y = sy(p.y) + 40; x = Math.max(8, Math.min(V.bw - cw - 8, x)); if (y > V.bh - ch - 8) y = Math.max(8, sy(p.y) - ch - 40);
sel = { ...this.look(p), tc: p.team === 0 ? '#C8372D' : '#3F4A55', role: p.r.label.split(' · ')[0].toUpperCase(), left: String(Math.round(x)), top: String(Math.round(y)), name: '#' + p.r.num + ' · ' + p.r.label, team: p.team === 0 ? 'RL FC · learned policy' : 'BASELINE FC · scripted', beh: p.r.beh };
}
const ck = this.CK[this.state.ck], ep = ck.ep + this.matches + (this.mode === 'solo' ? this.attempts - 1 : 0);
const mm = Math.floor(this.clock / 60), ss = Math.floor(this.clock % 60);
const tot = this.stats.poss[0] + this.stats.poss[1];
const curve = [[1, 8], [100, 12], [300, 22], [500, 31], [1000, 40], [2000, 52], [4000, 59], [8421, 64]];
const lx = (e) => (Math.log10(e) / Math.log10(8421)) * 260;
const cpts = curve.map((c) => lx(c[0]).toFixed(1) + ',' + (84 - c[1] * 1.1).toFixed(1)).join(' ');
const tr0 = this.state.view === 'train';
const K = this.state.ck, fr = Math.min(1, this.stageT / this.stageLen(K));
const epN = this.autoTrain ? (K < 3 ? Math.round(ck.ep + (this.CK[K + 1].ep - ck.ep) * fr) : ck.ep) : ep;
const CW2 = 200, CH2 = 64, cx = (e) => Math.log10(Math.max(1, e)) / Math.log10(8421) * CW2, cy = (w) => CH2 - 3 - w * 0.9;
const winAt = (e) => { for (let i = 1; i < curve.length; i++) if (e <= curve[i][0]) { const a = curve[i - 1], b = curve[i], u = (Math.log10(e) - Math.log10(a[0])) / (Math.log10(b[0]) - Math.log10(a[0]) || 1); return a[1] + (b[1] - a[1]) * u; } return curve[curve.length - 1][1]; };
const doneP = curve.filter((c) => c[0] < epN).map((c) => cx(c[0]).toFixed(1) + ',' + cy(c[1]).toFixed(1)); doneP.push(cx(epN).toFixed(1) + ',' + cy(winAt(epN)).toFixed(1));
const epsNow = 0.3 * (1 - this.q) + 0.04;
return {
tl: this.CK.map((c, i) => ({ label: i === 0 ? 'EP 1' : 'EP ' + this.fmtEp(c.ep), left: (i * 100 / 3).toFixed(2), bg: i <= K ? '#1C1C1C' : '#FEFEFE', fg: i === K ? '#1C1C1C' : '#767676', w: i === K ? '600' : '400', pick: () => this.goStage(i) })),
tlFill: ((K + (K < 3 ? fr : 0)) * 100 / 3).toFixed(2),
epTxt: this.fmtEp(epN), epsTxt: epsNow.toFixed(2), epsMood: epsNow > 0.2 ? 'mostly random' : (epsNow > 0.1 ? 'exploring less' : 'mostly exploiting'),
winTxt: Math.round(winAt(epN)) + '%',
curveAll: curve.map((c) => cx(c[0]).toFixed(1) + ',' + cy(c[1]).toFixed(1)).join(' '), curveDone: doneP.join(' '), dotX: cx(epN).toFixed(1), dotY: cy(winAt(epN)).toFixed(1),
playTxt: this.state.playing ? '❚❚ pause training' : '▶ resume training', playShort: this.state.playing ? '❚❚' : '▶', togglePlay: () => this.setState({ playing: !this.state.playing }),
showBanner: !!this.banner, banA: this.banner ? this.banner.a : '', banB: this.banner ? this.banner.b : '',
vb: V.x.toFixed(2) + ' ' + V.y.toFixed(2) + ' ' + V.w.toFixed(2) + ' ' + V.h.toFixed(2),
boxW: String(V.bw), boxH: String(V.bh), players: players,
bx: b.x.toFixed(2), by: b.y.toFixed(2), trail: tr,
showDec: !!dec, dec: dec || { left: '0', top: '0', title: '', rows: [], eps: '', flow: '', flowC: '#555555' },
showSel: !!sel, sel: sel || { left: '0', top: '0', name: '', team: '', beh: '' },
closeSel: () => this.setState({ sel: -1 }),
showNote: !!this.note, note: this.note ? this.note.text : '',
showGoal: !!cel, goalTeam: cel ? (cel.team === 0 ? 'RL FC' : 'BASELINE FC') : '', goalC: cel && cel.team === 1 ? '#3F4A55' : '#C8372D',
goalReward: cel ? (cel.team === 0 ? '+10 reward' : '−10 reward') + ' · episode ' + this.fmtEp(ep) : '',
goalScore: this.score[0] + ' — ' + this.score[1],
goalWord: this.mode === 'solo' ? 'GOAL' : 'GOAL',
s0: String(this.score[0]), s1: String(this.score[1]),
clock: this.mode === 'solo' ? 'attempt ' + this.attempts : String(mm).padStart(2, '0') + ':' + String(ss).padStart(2, '0'),
isTeam: this.mode === 'team', isSolo: this.mode === 'solo',
modeTeam: { bg: this.mode === 'team' ? '#1C1C1C' : 'transparent', fg: this.mode === 'team' ? '#FEFEFE' : '#1C1C1C', pressed: this.mode === 'team' ? 'true' : 'false' },
modeSolo: { bg: this.mode === 'solo' ? '#1C1C1C' : 'transparent', fg: this.mode === 'solo' ? '#FEFEFE' : '#1C1C1C', pressed: this.mode === 'solo' ? 'true' : 'false' },
viewLive: { bg: !tr0 ? '#1C1C1C' : 'transparent', fg: !tr0 ? '#FEFEFE' : '#1C1C1C', pressed: !tr0 ? 'true' : 'false' },
viewTrain: { bg: tr0 ? '#1C1C1C' : 'transparent', fg: tr0 ? '#FEFEFE' : '#1C1C1C', pressed: tr0 ? 'true' : 'false' },
setTeam: () => { this.setup('team', this.state.ck); this.setState({ mode: 'team', sel: -1 }); },
setSolo: () => { this.setup('solo', this.state.ck); this.setState({ mode: 'solo', sel: -1 }); },
setLive: () => this.setState({ view: 'live' }),
setTrain: () => this.setState({ view: 'train' }),
training: tr0, liveView: !tr0,
tEp: this.fmtEp(ep), tWin: ck.win, tRew: ck.rew, tPos: ck.pos, tGoal: ck.goal, tEnt: ck.ent,
livePoss: Math.round(100 * this.stats.poss[0] / tot) + '%',
livePass: this.stats.passes ? Math.round(100 * this.stats.passOk / this.stats.passes) + '%' : '—',
liveShots: this.stats.shots[0] + ' – ' + this.stats.shots[1],
curve: cpts, ckX: lx(ck.ep).toFixed(1), ckY: (84 - curve.find((c) => c[0] === ck.ep || (ck.ep === 1 && c[0] === 1))[1] * 1.1).toFixed(1),
cks: this.CK.map((c, i) => ({ label: 'EP ' + this.fmtEp(c.ep), bg: i === this.state.ck ? '#1C1C1C' : '#FEFEFE', fg: i === this.state.ck ? '#FEFEFE' : '#1C1C1C', pressed: i === this.state.ck ? 'true' : 'false', pick: () => { this.setup(this.mode, i); this.setState({ ck: i, sel: -1 }); } }))
};
}
}
