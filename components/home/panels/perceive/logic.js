// Ported verbatim from design-handoff/design/PerceivePanel.dc.html (+ PerceivePanelMobile.dc.html).
// Only the layout-specific constants are parameterised on props.layout.
import { DCLogic } from '../../dc/useDCLogic';

export default class PerceiveLogic extends DCLogic {
constructor(props) {
super(props);
this.state = { t: 0, chars: 0, detect: true, view: 0 };
this.track = [[-13,472,394,681,107,404,239,498,354,421,420,497],[-4,474,398,682,108,405,240,499,354,421,420,497],[7,479,406,684,111,408,243,502,358,424,424,500],[14,484,408,685,113,409,245,503,362,425,428,501],[17,482,402,677,113,407,245,501,361,422,427,498],[17,489,389,668,112,402,244,496,359,419,425,495],[15,519,374,661,109,401,241,495,356,419,422,495],[13,533,363,658,108,401,240,495,355,419,421,495],[13,533,377,656,108,402,240,496,354,420,420,496],[11,531,418,652,109,401,241,495,355,418,421,494],[14,528,427,656,109,400,241,494,356,416,422,492],[18,523,427,683,109,400,241,494,357,414,423,490],[22,517,427,713,110,398,242,492,359,411,425,487],[26,514,427,718,110,397,242,491,360,408,426,484],[30,513,429,701,110,396,242,490,362,406,428,482],[34,514,432,682,111,395,243,489,366,405,432,481],[39,515,435,671,113,395,245,489,370,403,436,479],[44,515,436,654,114,395,246,489,374,400,440,476],[49,514,438,640,117,394,249,488,377,399,443,475],[54,513,439,632,123,391,255,485,378,397,444,473],[60,512,441,626,126,389,258,483,378,398,444,474],[65,511,442,619,126,387,258,481,379,396,445,472],[70,510,444,615,125,384,257,478,381,397,447,473],[75,509,447,612,127,384,259,478,379,399,445,475],[80,509,449,612,128,384,260,478,375,396,441,472],[84,509,452,611,129,383,261,477,374,393,440,469],[88,507,453,610,131,383,263,477,374,392,440,468],[92,505,453,607,132,384,264,478,374,394,440,470],[97,501,438,605,133,384,265,478,373,393,439,469],[102,499,439,602,133,385,265,479,374,393,440,469],[107,496,456,630,134,385,266,479,373,390,439,466],[112,493,458,646,136,386,268,480,374,389,440,465],[116,492,459,646,137,388,269,482,374,389,440,465],[119,489,459,661,140,390,272,484,373,388,439,464],[121,486,459,673,141,390,273,484,371,385,437,461],[123,489,429,669,142,390,274,484,369,385,435,461],[125,491,409,664,142,388,274,482,367,384,433,460],[128,490,409,660,142,387,274,481,365,384,431,460],[130,492,410,636,142,387,274,481,365,383,431,459],[134,492,412,602,142,387,274,481,364,381,430,457],[141,486,421,620,143,386,275,480,364,381,430,457],[145,477,447,631,145,386,277,480,363,381,429,457],[146,474,457,643,145,390,277,484,362,381,428,457],[149,475,457,639,145,391,277,485,361,380,427,456],[152,475,458,631,145,388,277,482,360,378,426,454],[155,473,459,624,146,385,278,479,359,377,425,453],[159,475,454,621,145,383,277,477,358,375,424,451],[161,471,461,619,143,381,275,475,358,375,424,451],[164,469,461,617,143,380,275,474,357,373,423,449],[169,469,462,611,143,381,275,475,356,373,422,449],[174,468,463,608,145,383,277,477,355,372,421,448],[177,469,463,605,145,385,277,479,355,372,421,448],[177,468,465,607,146,385,278,479,354,372,420,448],[188,472,459,595,145,385,277,479,354,372,420,448],[197,470,461,583,145,384,277,478,354,372,420,448],[199,472,453,582,147,384,279,478,354,371,420,447],[202,480,430,582,151,385,283,479,354,371,420,447],[202,478,432,588,152,385,284,479,354,372,420,448],[205,476,430,601,154,387,286,481,355,372,421,448],[208,474,431,612,156,389,288,483,356,373,422,449],[210,473,431,599,158,388,290,482,356,373,422,449],[210,473,434,588,160,387,292,481,356,373,422,449],[210,473,437,580,162,387,294,481,357,373,423,449],[213,472,438,579,165,389,297,483,359,374,425,450],[214,472,440,580,164,391,296,485,361,376,427,452],[214,473,441,582,165,393,297,487,363,378,429,454],[213,474,438,584,165,394,297,488,363,379,429,455],[211,472,433,583,164,393,296,487,364,380,430,456],[210,470,432,582,165,393,297,487,365,380,431,456],[209,469,433,581,169,395,301,489,366,381,432,457],[208,467,431,580,170,394,302,488,366,381,432,457],[206,465,433,578,173,392,305,486,365,381,431,457],[202,463,431,576,177,392,309,486,364,380,430,456],[200,461,428,574,179,391,311,485,363,380,429,456],[197,459,431,589,180,390,312,484,362,381,428,457],[194,457,435,589,184,389,316,483,361,381,427,457],[191,458,443,572,187,389,319,483,358,380,424,456],[181,459,468,566,187,388,319,482,355,378,421,454],[175,459,475,564,185,386,317,480,352,377,418,453],[173,460,474,563,185,386,317,480,350,375,416,451],[177,454,473,563,185,387,317,481,347,375,413,451],[181,456,444,563,185,387,317,481,346,378,412,454],[182,466,400,565,186,387,318,481,346,381,412,457],[178,468,381,567,185,386,317,480,348,382,414,458],[178,471,382,570,183,385,315,479,350,384,416,460],[183,474,384,574,182,384,314,478,350,385,416,461],[182,477,386,578,181,384,313,478,349,386,415,462],[180,480,390,582,181,383,313,477,348,387,414,463],[180,483,392,586,182,382,314,476,348,387,414,463],[180,485,395,589,183,382,315,476,347,387,413,463],[180,488,396,591,183,382,315,476,348,387,414,463],[180,490,398,593,183,382,315,476,347,387,413,463],[180,491,402,593,185,382,317,476,345,385,411,461],[175,492,416,593,186,381,318,475,342,384,408,460],[176,494,424,594,187,381,319,475,341,383,407,459],[166,497,425,595,187,381,319,475,341,383,407,459],[164,497,428,618,187,382,319,476,340,382,406,458],[166,497,429,656,188,382,320,476,339,382,405,458],[160,498,440,661,189,382,321,476,337,382,403,458],[148,499,456,657,190,382,322,476,335,381,401,457],[141,502,432,636,189,382,321,476,334,381,400,457],[139,504,423,619,187,382,319,476,333,381,399,457],[141,505,424,607,185,385,317,479,332,381,398,457],[136,506,423,611,184,387,316,481,331,381,397,457],[131,506,433,616,184,387,316,481,330,380,396,456],[131,506,455,619,186,386,318,480,330,380,396,456],[128,505,475,621,185,386,317,480,329,379,395,455],[130,503,475,630,183,387,315,481,328,378,394,454],[123,500,473,650,180,386,312,480,327,377,393,453],[114,496,469,683,180,386,312,480,326,377,392,453],[110,492,467,696,181,386,313,480,325,376,391,452],[107,489,465,701,180,386,312,480,324,375,390,451],[103,483,462,700,179,385,311,479,322,373,388,449],[96,478,448,694,177,382,309,476,318,369,384,445],[90,474,414,685,175,376,307,470,313,363,379,439],[83,463,408,674,172,369,304,463,307,356,373,432],[73,447,430,664,167,363,299,457,301,350,367,426],[64,435,431,652,161,357,293,451,293,344,359,420],[58,425,423,637,154,351,286,445,286,337,352,413],[56,415,417,623,149,345,281,439,282,332,348,408]];
this.kw = {
t: ['#DCC6BF', '#1C1C1C'], d: ['#EDECEC', '#1C1C1C'], r: ['#DCE3CF', '#1C1C1C'],
sw: ['#DDE5D3', '#1C1C1C'], sr: ['#B7C396', '#1C1C1C'], st: ['#BA9A91', '#1C1C1C'], sd: ['#3A3A3A', '#FEFEFE'],
dt: ['#FC8961', '#1C1C1C'], dr: ['#F9A26E', '#1C1C1C'], dd: ['#B73779', '#FEFEFE'], dw: ['#3B0F70', '#FEFEFE']
};
this.modes = [['RGB', 'what’s there'], ['SEG', 'where · how much'], ['DEPTH', 'what’s in front']];
this.caps = [
[
['A ', ['green sea turtle', 't'], ' glides over the ', ['reef', 'r'], '; two ', ['divers', 'd'], ' hover behind it.'],
['Close on the ', ['shell', 't'], ': orange-brown scutes, bright sunlit water.'],
['The ', ['divers', 'd'], ' keep their distance; the ', ['turtle', 't'], ' stays calm, heading right.'],
['Clear water, one ', ['turtle', 't'], ', two ', ['divers', 'd'], ', zero stress.']
],
[
[['Reef', 'sr'], ' fills the lower half of the frame, ', ['open water', 'sw'], ' the upper half.'],
['The ', ['turtle', 'st'], ' is one clean mask, cut out from the ', ['reef', 'sr'], ' beneath it.'],
['Two small ', ['diver', 'sd'], ' masks sit in the ', ['water', 'sw'], ' column, never touching the ', ['turtle', 'st'], '.'],
['Pixel share: ', ['water', 'sw'], ' 48%, ', ['reef', 'sr'], ' 48%, ', ['turtle', 'st'], ' 3%, ', ['divers', 'sd'], ' 1%.']
],
[
['The ', ['turtle', 'dt'], ' is the nearest thing in frame; the ', ['divers', 'dd'], ' are about 2× farther back.'],
['The ', ['turtle', 'dt'], ' floats just above the ', ['reef', 'dr'], ', both at nearly the same depth.'],
['Depth order, near → far: ', ['turtle', 'dt'], ', ', ['reef', 'dr'], ', ', ['divers', 'dd'], ', ', ['open water', 'dw'], '.'],
['The ', ['divers', 'dd'], ' are well behind the ', ['turtle', 'dt'], '; ', ['open water', 'dw'], ' is the farthest plane.']
]
];

this.lines = [
{ text: '$ ./manan --boot', color: '#1C1C1C' },
{ text: 'loading yolo-manan-v2 · fine-tuned on reef footage + cold brew', color: '#555555' },
{ text: 'running inference on turtle.mp4 …', color: '#555555' },
{ text: '✓ sea_turtle ×1   ✓ diver ×2   ✗ manan (he’s behind the camera)', color: '#4E5A2E' },
{ text: 'ready. dive in ↓', color: '#1C1C1C' }
];
this.total = this.lines.reduce((n, l) => n + l.text.length + 6, 0);
}
componentDidMount() {
this.typer = setInterval(() => {
if (this.state.chars >= this.total) { clearInterval(this.typer); return; }
this.setState({ chars: this.state.chars + 2 });
}, 30);
const tick = () => {
if (this.video) { this.setState({ t: this.video.currentTime || 0 }); }
this.raf = requestAnimationFrame(tick);
};
this.raf = requestAnimationFrame(tick);
}
componentWillUnmount() {
clearInterval(this.typer);
cancelAnimationFrame(this.raf);
}
box(row, k, W, H) {
// Tracking coords are in source pixels (960 tall); 0.62469 maps them onto a 600px-tall view.
const S = 0.62469 * H / 600, OX = 0, OY = 0;
const x0 = Math.max(2, row[k] * S + OX), y0 = Math.max(2, row[k + 1] * S + OY);
const x1 = Math.min(W - 2, row[k + 2] * S + OX), y1 = Math.min(H - 2, row[k + 3] * S + OY);
return { l: Math.round(x0), t: Math.round(y0), w: Math.max(0, Math.round(x1 - x0)), h: Math.max(0, Math.round(y1 - y0)) };
}
renderVals() {
// The video column is sized by the component from the space it has (one view = 337:600).
const H = this.props.vidH || 600, W = Math.round(H * 337 / 600);
const f = Math.min(this.track.length - 1.001, (this.state.t * 29.97) / 3);
const i = Math.floor(f), a = f - i;
const r0 = this.track[i], r1 = this.track[Math.min(i + 1, this.track.length - 1)];
const row = r0.map((v, j) => v + (r1[j] - v) * a);
const t = this.state.t;
let used = 0;
const log = this.lines.map((l) => {
const start = used; used += l.text.length + 6;
const n = Math.max(0, Math.min(l.text.length, this.state.chars - start));
return { text: l.text.slice(0, n), color: l.color, show: this.state.chars > start };
}).filter((l) => l.show);
const detect = this.state.detect;
const cap = this.caps[this.state.view][Math.min(3, Math.floor(t / 3))], segA = Math.min(3, Math.floor(t / 3)) * 3;
if (this.vT != null && t < this.vT) this.vT = null;
const t0 = Math.max(segA, this.vT == null ? 0 : this.vT);
let budget = Math.max(1, Math.floor((t - t0) * 48)), total = 0;
const capToks = cap.map((pc) => {
const txt = typeof pc === 'string' ? pc : pc[0], k = typeof pc === 'string' ? null : this.kw[pc[1]];
total += txt.length; const show = txt.slice(0, Math.max(0, budget)); budget -= txt.length;
return { t: show, bg: k ? k[0] : 'transparent', fg: k ? k[1] : '#1C1C1C', pad: k && show ? '4' : '0', w: k ? '500' : '400' };
}).filter((x) => x.t.length > 0);
const pad2 = (n) => '00:' + String(n).padStart(2, '0');
return {
views: ['RGB', 'SEG', 'DEPTH'].map((label, k) => ({
label: label,
pressed: this.state.view === k ? 'true' : 'false',
bg: this.state.view === k ? '#1C1C1C' : 'transparent',
fg: this.state.view === k ? '#FEFEFE' : '#555555',
pick: () => { this.vT = this.state.t; this.setState({ view: k }); }
})),
viewLeft: String(-this.state.view * W), vidW: String(W), vidH: String(H), vidAllW: String(W * 3),
showSeg: this.state.view === 1, showRgb: this.state.view === 0,
showDepth: this.state.view === 2,
capToks: capToks,
capMode: this.modes[this.state.view][0], capWhat: this.modes[this.state.view][1], capTime: '00:0' + Math.min(9, Math.floor(t)),

accent: this.props.accent ?? '#4E5A2E', reduced: !!this.props.reduced,
setVideo: (el) => {
if (!el || this.video === el) return;
this.video = el; el.muted = true; el.loop = true; el.playsInline = true;
if (this.props.reduced) { el.pause(); return; }
const p = el.play(); if (p && p.catch) p.catch(() => {});
},
log: log,
showBoxes: detect,
pressed: detect ? 'true' : 'false',
toggleLabel: detect ? 'Model view: on' : 'Model view: off', boxTxt: detect ? 'on' : 'off',
toggle: () => this.setState({ detect: !this.state.detect }),
turtle: this.box(row, 0, W, H),
d1: this.box(row, 4, W, H),
d2: this.box(row, 8, W, H),
tConf: (0.94 + 0.03 * Math.sin(t * 3.1)).toFixed(2),
d1Conf: (0.86 + 0.04 * Math.sin(t * 2.3 + 1)).toFixed(2),
d2Conf: (0.81 + 0.05 * Math.sin(t * 1.7 + 2)).toFixed(2),
frame: String(Math.min(358, Math.floor(t * 29.97) + 1)).padStart(3, '0'),
ms: String(21 + Math.round(3 * Math.abs(Math.sin(t * 7))))
};
}
}
