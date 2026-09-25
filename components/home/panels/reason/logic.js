// Ported verbatim from design-handoff/design/AnswerPanel.dc.html (+ AnswerPanelMobile.dc.html).
// Only the layout-specific constants are parameterised on props.layout.
import { DCLogic } from '../../dc/useDCLogic';

export default class ReasonLogic extends DCLogic {
constructor(props) {
super(props);
this.base = [['Manan', 44291], [' is', 318], [' an', 281], [' AI', 9552], [' engineer', 11949], [' who', 508], [' loves', 10408]];
this.heads = [
['prev-token', 'looks one token back — the grammar keeper'],
['who-is-Manan', 'always checks in on the subject'],
['job-title', 'hunts for role words like “AI engineer”'],
['big-picture', 'spreads out and averages the whole context']
];
this.L0 = [[' diving', 3.1], [' coffee', 2.6], [' transformers', 2.4], [' building', 2.0], [' turtles', 1.6], [' debugging', 1.3], [' sleep', 0.2], [' Mondays', -1.0]];
this.FOLLOW = {
' diving': [[' with', 2.4], [' and', 1.9], [' into', 1.2], [' deep', 1.1], ['.', 0.9], [' at', 0.6]],
' coffee': [[' and', 2.3], [' more', 1.8], ['.', 1.5], [' at', 1.0], [' black', 0.9], [' too', 0.7]],
' transformers': [[' and', 2.2], ['.', 1.9], [' that', 1.6], [' more', 0.8], [' at', 0.7], [' too', 0.5]]
};
this.GEN = [[' and', 2.0], ['.', 1.8], [' a', 1.0], [' on', 0.8], [' lots', 0.6], [' too', 0.5]];
this.END = [['.', 3.0], ['!', 1.8], [' daily', 1.2], [' again', 1.0], [' —', 0.5]];
this.STAGES = ['tokenize', 'embed + pos', 'block 1', 'block 2', 'block 3', 'block 4', 'block 5', 'block 6', 'unembed', 'softmax'];
this.NORM = [0.28, 0.45, 0.55, 0.63, 0.7, 0.76, 0.81, 0.86, 0.93, 1.0];
this.state = { gen: [], head: 1, q: 6, temp: 1.0, stage: -1, running: false, last: null };
}
componentDidMount() {
if (this.props.reduced) { this.touched = true; return; }
this.ap = { i: 1, hold: 2 };
this.auto = setInterval(() => {
if (this.touched) { clearInterval(this.auto); return; }
if (this.state.running) return;
const a = this.ap, n = this.toks().length;
if (a.hold > 0) { a.hold--; return; }
if (this.state.gen.length >= 3) { this.reset(); this.setState({ head: (this.state.head + 1) % 4 }); a.i = 1; a.hold = 2; return; }
if (a.i < n) { this.setState({ q: a.i }); a.i++; return; }
a.i = 1; a.hold = 2; this.generate();
}, 700);
}
touch() { if (!this.touched) { this.touched = true; clearInterval(this.auto); this.setState({ tick: 1 }); } }
componentWillUnmount() { clearInterval(this.timer); clearInterval(this.auto); }
toks() {
const g = this.state.gen.map((t) => [t, 1000 + (t.length * 7919 + t.charCodeAt(t.length - 1) * 31) % 49000]);
return this.base.concat(g);
}
logits() {
const g = this.state.gen;
if (g.length === 0) return this.L0;
if (g.length === 1) return this.FOLLOW[g[0]] || this.GEN;
return this.END;
}
probs() {
const T = this.state.temp, L = this.logits();
const m = Math.max.apply(null, L.map((x) => x[1] / T));
const ex = L.map((x) => Math.exp(x[1] / T - m));
const Z = ex.reduce((a, b) => a + b, 0);
return L.map((x, k) => ({ tok: x[0], p: ex[k] / Z })).sort((a, b) => b.p - a.p);
}
attn(h, i, toks) {
const sc = [];
for (let j = 0; j <= i; j++) {
const t = toks[j][0];
let s = 0;
if (h === 0) s = (j === i - 1 ? 4 : 0) + (j === i ? 1.2 : 0);
else if (h === 1) s = (j === 0 ? 3.5 : 0) + 0.08 * j;
else if (h === 2) s = (t === ' AI' || t === ' engineer' ? 3 : 0) + (j === i ? 0.6 : 0);
else s = 0.5 + 0.35 * j / (i + 1);
sc.push(s);
}
const m = Math.max.apply(null, sc);
const ex = sc.map((s) => Math.exp(s - m));
const Z = ex.reduce((a, b) => a + b, 0);
return ex.map((e) => e / Z);
}
generate() {
if (this.state.running) return;
if (this.state.gen.length >= 3) { this.reset(); return; }
this.setState({ running: true, stage: 0, last: null });
clearInterval(this.timer);
this.timer = setInterval(() => {
const st = this.state.stage + 1;
if (st < this.STAGES.length) { this.setState({ stage: st }); return; }
clearInterval(this.timer);
const P = this.probs();
let r = Math.random(), pick = P[P.length - 1];
for (const x of P) { r -= x.p; if (r <= 0) { pick = x; break; } }
const gen = this.state.gen.concat([pick.tok]);
this.setState({ gen: gen, q: this.base.length + gen.length - 1, running: false, stage: this.STAGES.length - 1, last: pick });
}, 170);
}
reset() { clearInterval(this.timer); this.setState({ gen: [], q: 6, stage: -1, running: false, last: null }); }
mix(w) {
const t = Math.pow(Math.max(0, Math.min(1, w)), 0.55);
const a = [237, 236, 236], b = [78, 90, 46];
return 'rgb(' + a.map((v, k) => Math.round(v + (b[k] - v) * t)).join(', ') + ')';
}
renderVals() {
const mob = this.props.layout === 'mobile';
const CW = mob ? 7.2 : 7.8, PADX = mob ? 16 : 20, GAPX = mob ? 5 : 6, BASEY = mob ? 100 : 66, CELLMAX = mob ? 17 : 15, HEAT = mob ? 240 : 150, BARMAX = mob ? 150 : 120;
const toks = this.toks(), n = toks.length, q = Math.min(this.state.q, n - 1), h = this.state.head;
const A = this.attn(h, q, toks);
const show = (t) => t.replace(/^ /, '');
let x = 0;
const pos = toks.map((t) => { const w = Math.max(44, Math.round(show(t[0]).length * CW + PADX)); const c = x + w / 2; x += w + GAPX; return { w: w, c: c }; });
let best = 0;
for (let j = 1; j < A.length; j++) if (A[j] > A[best]) best = j;
const chips = toks.map((t, j) => {
const isGen = j >= this.base.length, isQ = j === q, w = j <= q ? A[j] : null;
return {
label: show(t[0]) || '␣',
idTxt: '#' + t[1],
w: String(pos[j].w),
bg: isQ ? '#1C1C1C' : isGen ? '#E9DFDB' : '#EDECEC',
fg: isQ ? '#FEFEFE' : '#1C1C1C',
border: isQ ? '#1C1C1C' : (w !== null ? 'rgba(78, 90, 46, ' + (0.25 + 0.75 * w).toFixed(2) + ')' : (isGen ? '#BA9A91' : '#CCCCCC')),
weightTxt: w !== null && !isQ ? w.toFixed(2) : (isQ ? 'query' : '—'),
weightColor: isQ ? '#1C1C1C' : (w !== null ? (j === best ? '#4E5A2E' : '#555555') : '#9A9A9A'),
pick: () => { this.touch(); this.setState({ q: j }); }
};
});
const arcs = [];
for (let j = 0; j < q; j++) {
const x0 = pos[q].c, x1 = pos[j].c, dx = Math.abs(x0 - x1), hh = mob ? Math.min(92, 18 + dx * 0.28) : Math.min(32, 10 + dx * 0.18);
arcs.push({ d: 'M ' + x0.toFixed(1) + ' ' + BASEY + ' Q ' + ((x0 + x1) / 2).toFixed(1) + ' ' + (BASEY - 2 * hh).toFixed(1) + ' ' + x1.toFixed(1) + ' ' + BASEY, sw: (1 + 12 * A[j]).toFixed(1), op: (0.18 + 0.82 * A[j]).toFixed(2) });
}
const cell = Math.min(CELLMAX, Math.floor(HEAT / n));
const heat = [];
for (let i = 0; i < n; i++) {
const row = this.attn(h, i, toks);
for (let j = 0; j < n; j++) {
heat.push({ bg: j <= i ? this.mix(row[j]) : '#F6F6F5', bd: i === q ? '#1C1C1C' : 'transparent', pick: () => { this.touch(); this.setState({ q: i }); } });
}
}
const P = this.probs();
const top = P[0].p;
const ent = -P.reduce((a, x) => a + (x.p > 0 ? x.p * Math.log2(x.p) : 0), 0);
const last = this.state.last;
const bars = P.map((x, k) => ({
label: show(x.tok),
pTxt: (x.p * 100).toFixed(1) + '%',
w: String(Math.max(2, Math.round((x.p / top) * BARMAX))),
color: last && last.tok === x.tok ? '#BA9A91' : (k === 0 ? '#4E5A2E' : '#B7C396')
}));
const st = this.state.stage;
const stages = this.STAGES.map((label, k) => ({
label: label,
bg: k === st ? '#B7C396' : (st >= 0 && k < st ? '#E0E7D7' : '#FEFEFE'),
fg: k === st ? '#1C1C1C' : (st >= 0 && k < st ? '#1C1C1C' : '#555555'),
bar: String(Math.round(this.NORM[k] * (st >= 0 && k <= st ? 1 : 0.25) * 100)),
barColor: k === st ? '#1C1C1C' : '#6E7D48'
}));
let detail = 'press generate to run a forward pass';
if (st >= 0) {
const lab = this.STAGES[st];
if (lab === 'tokenize') detail = n + ' tokens → ids';
else if (lab === 'embed + pos') detail = n + ' × 64 embeddings + positions';
else if (lab.indexOf('block') === 0) {
const k = parseInt(lab.split(' ')[1], 10), hk = (k - 1) % 4;
const Ak = this.attn(hk, n - 1, toks);
let bj = 0; for (let j = 1; j < Ak.length; j++) if (Ak[j] > Ak[bj]) bj = j;
detail = lab + ' · ' + this.heads[hk][0] + ' · “' + show(toks[n - 1][0]) + '” → “' + show(toks[bj][0]) + '” ' + Ak[bj].toFixed(2);
}
else if (lab === 'unembed') detail = 'logits over a 50,257-token vocab';
else detail = last ? 'sampled “' + show(last.tok) + '” · p = ' + last.p.toFixed(2) : 'softmax(logits / T), T = ' + this.state.temp.toFixed(2);
}
const done = this.state.gen.length >= 3;
return {
accent: this.props.accent ?? '#4E5A2E',
chips: chips,
arcs: arcs,
heat: heat,
gridCols: 'repeat(' + n + ', ' + cell + 'px)',
cellPx: String(cell),
heads: this.heads.map((hd, k) => ({ label: 'H' + (k + 1) + ' ' + hd[0], pressed: k === h ? 'true' : 'false', bg: k === h ? '#1C1C1C' : 'transparent', fg: k === h ? '#FEFEFE' : '#4A4A4A', pick: () => { this.touch(); this.setState({ head: k }); } })),
peekW: String(Math.round(this.props.peekW || 408)), headDesc: this.heads[h][1], autoTag: this.touched ? '' : '▶ autoplay · ', isCompact: !!this.props.compact, sent: toks.map((t, j) => ({ sp: j ? ' ' : '', t: show(t[0]) || '␣', bg: j === q ? '#1C1C1C' : (j >= this.base.length ? '#E9DFDB' : 'transparent'), fg: j === q ? '#FEFEFE' : '#1C1C1C', pad: (j === q || j >= this.base.length) ? '0 4px' : '0' })), topBars: bars.slice(0, 3).map((b) => ({ ...b, w: String(Math.round(parseInt(b.w, 10) * 0.9)) })), stageTxt: this.state.running ? this.STAGES[Math.max(0, this.state.stage)] + '…' : 'next-word prediction',
readout: '“' + show(toks[q][0]) + '” attends most to “' + show(toks[best][0]) + '” (' + A[best].toFixed(2) + ')',
bars: mob ? bars.slice(0, 5) : bars,
entropy: ent.toFixed(2),
tempTxt: this.state.temp.toFixed(2),
tempVal: String(this.state.temp),
tempMood: this.state.temp < 0.6 ? 'focused' : this.state.temp < 1.3 ? 'balanced' : 'chaotic',
setTemp: (e) => { this.touch(); this.setState({ temp: parseFloat(e.target.value) }); },
stages: stages,
detail: detail,
sentence: toks.map((t) => t[0]).join(''),
genLabel: this.state.running ? 'Running forward pass…' : (done ? 'Reset prompt' : 'Generate next token'),
onGenerate: () => { this.touch(); this.generate(); },
onReset: () => { this.touch(); this.reset(); }
};
}
}
