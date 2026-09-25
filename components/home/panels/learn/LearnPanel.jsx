'use client';

// Templates converted from design-handoff/design/LearnPanel.dc.html and LearnPanelMobile.dc.html.
import { Fragment } from 'react';
import { useDCLogic } from '../../dc/useDCLogic';
import Logic from './logic';
import '../panels.css';

function Desktop({ v }) {
  return (
    <div style={{ width: "100%", height: "100%", boxSizing: "border-box", background: "#EDECEC", color: "#1C1C1C", fontFamily: "var(--sans)", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ height: "60px", width: "100%", boxSizing: "border-box", padding: "0 20px", display: "flex", alignItems: "center", gap: "22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--mono)", color: "#1C1C1C", flexShrink: "0" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", letterSpacing: "0.12em", color: "#C8372D", fontWeight: "600" }}>
            <svg width="22" height="25" viewBox="-2 -2 44 49" aria-hidden="true" style={{ flexShrink: "0", filter: "drop-shadow(0 1px 1.5px rgba(28,28,28,0.18))" }}>
              <path d="M20,0 L40,6 L40,22 C40,34 31,41.5 20,45 C9,41.5 0,34 0,22 L0,6 Z" fill="#FEFEFE" />
              <path d="M20,4 L36,8.8 L36,22 C36,31.5 29,37.8 20,40.8 C11,37.8 4,31.5 4,22 L4,8.8 Z" fill="#C8372D" />
              <text x="20" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#FEFEFE" style={{ fontFamily: "var(--serif)" }}>
                RL
              </text>
            </svg>
            RL FC
          </span>
          <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px", minWidth: "60px" }}>
            <span style={{ fontFamily: "var(--serif)", fontSize: "24px", lineHeight: "1" }}>
              {v.s0} — {v.s1}
            </span>
            <span style={{ fontSize: "9px", color: "#555555", letterSpacing: "0.08em" }}>
              {v.clock}
            </span>
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", letterSpacing: "0.12em", color: "#3F4A55", fontWeight: "600" }}>
            BASELINE
            <svg width="22" height="25" viewBox="-2 -2 44 49" aria-hidden="true" style={{ flexShrink: "0", filter: "drop-shadow(0 1px 1.5px rgba(28,28,28,0.18))" }}>
              <path d="M20,0 L40,6 L40,22 C40,34 31,41.5 20,45 C9,41.5 0,34 0,22 L0,6 Z" fill="#FEFEFE" />
              <path d="M20,4 L36,8.8 L36,22 C36,31.5 29,37.8 20,40.8 C11,37.8 4,31.5 4,22 L4,8.8 Z" fill="#3F4A55" />
              <text x="20" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#FEFEFE" style={{ fontFamily: "var(--serif)" }}>
                BL
              </text>
            </svg>
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", flexGrow: "1", minWidth: "0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px", fontFamily: "var(--mono)", fontSize: "10px", color: "#555555" }}>
            <span>
              <span style={{ color: "#1C1C1C", fontWeight: "600" }}>
                TRAINING
              </span>
              {" "}· episode{" "}
              <span style={{ color: "#1C1C1C" }}>
                {v.epTxt}
              </span>
            </span>
            <span>
              ε {v.epsTxt} · {v.epsMood}
            </span>
          </div>
          <div style={{ position: "relative", height: "26px", margin: "0 30px" }}>
            <div style={{ position: "absolute", left: "0", right: "0", top: "6px", height: "2px", background: "#CCCCCC" }} />
            <div style={{ position: "absolute", left: "0", top: "6px", height: "2px", width: `${v.tlFill}%`, background: "#1C1C1C" }} />
            {v.tl.map((c, c_i) => (
              <Fragment key={c_i}>
                <button type="button" onClick={c.pick} aria-label={`Load checkpoint ${c.label}`} style={{ position: "absolute", left: `${c.left}%`, top: "0", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", padding: "0", border: "0", background: "transparent", cursor: "pointer" }}>
                  <span style={{ width: "12px", height: "12px", borderRadius: "6px", border: "2px solid #1C1C1C", boxSizing: "border-box", background: c.bg }} />
                  <span style={{ fontFamily: "var(--mono)", fontSize: "9px", whiteSpace: "nowrap", color: c.fg, fontWeight: c.w }}>
                    {c.label}
                  </span>
                </button>
              </Fragment>
            ))}
          </div>
        </div>
        <button type="button" onClick={v.togglePlay} style={{ flexShrink: "0", height: "30px", padding: "0 12px", borderRadius: "999px", border: "1px solid #CCCCCC", background: "#FEFEFE", color: "#1C1C1C", fontFamily: "var(--mono)", fontSize: "10px", cursor: "pointer", whiteSpace: "nowrap" }}>
          {v.playTxt}
        </button>
      </div>
      <div style={{ position: "relative", width: `${v.boxW}px`, height: `${v.boxH}px`, flexShrink: "0", overflow: "hidden", background: "#E0E7D7" }}>
        <svg width="100%" height="100%" viewBox={v.vb} preserveAspectRatio="xMidYMid slice" role="img" aria-label="Top-down football pitch: RL agents learning to play against a scripted team" style={{ display: "block" }}>
          <rect x="-6" y="-6" width="117" height="80" fill="#E0E7D7" />
          <rect x="10.5" y="0" width="10.5" height="68" fill="#D9E1CF" />
          <rect x="31.5" y="0" width="10.5" height="68" fill="#D9E1CF" />
          <rect x="52.5" y="0" width="10.5" height="68" fill="#D9E1CF" />
          <rect x="73.5" y="0" width="10.5" height="68" fill="#D9E1CF" />
          <rect x="94.5" y="0" width="10.5" height="68" fill="#D9E1CF" />
          <g fill="none" stroke="#FEFEFE" strokeWidth="0.32">
            <rect x="0" y="0" width="105" height="68" />
            <line x1="52.5" y1="0" x2="52.5" y2="68" />
            <circle cx="52.5" cy="34" r="9.15" />
            <rect x="0" y="13.84" width="16.5" height="40.32" />
            <rect x="88.5" y="13.84" width="16.5" height="40.32" />
            <rect x="0" y="24.84" width="5.5" height="18.32" />
            <rect x="99.5" y="24.84" width="5.5" height="18.32" />
            <path d="M16.5,26.7 A9.15,9.15 0 0 1 16.5,41.3" />
            <path d="M88.5,26.7 A9.15,9.15 0 0 0 88.5,41.3" />
          </g>
          <circle cx="52.5" cy="34" r="0.35" fill="#FEFEFE" />
          <circle cx="11" cy="34" r="0.3" fill="#FEFEFE" />
          <circle cx="94" cy="34" r="0.3" fill="#FEFEFE" />
          <rect x="-2.2" y="30.34" width="2.2" height="7.32" fill="#FEFEFE" fillOpacity="0.7" stroke="#1C1C1C" strokeWidth="0.28" />
          <rect x="105" y="30.34" width="2.2" height="7.32" fill="#FEFEFE" fillOpacity="0.7" stroke="#1C1C1C" strokeWidth="0.28" />
          <defs>
            <clipPath id="pnD">
              <circle cx="0" cy="0" r="44" />
            </clipPath>
          </defs>
          {v.players.map((p, p_i) => (
            <Fragment key={p_i}>
              <g transform={p.tf} opacity={p.op} onClick={p.pick} style={{ cursor: "pointer", transition: "opacity 500ms ease" }}>
                <ellipse cx="0.35" cy="2.75" rx="2.3" ry="0.6" fill="#1C1C1C" fillOpacity="0.16" />
                <circle cx="0" cy="0" r="3.55" fill="none" stroke={p.haloC} strokeWidth="0.3" strokeDasharray="0.9 0.6" strokeOpacity={p.halo} />
                <g transform="scale(0.058)">
                  <circle cx="0" cy="0" r="50" fill="#FEFEFE" stroke={p.edge} strokeWidth="3.4" />
                  <g clipPath="url(#pnD)">
                    <rect x="-44" y="-44" width="88" height="88" fill={p.bg} />
                    <path d="M-44,-44 L44,-44 L-44,30 Z" fill="#FEFEFE" fillOpacity="0.35" />
                    <g transform="translate(0 1) scale(1.12)">
                      <path d={p.hb} fill={p.hc} />
                      <path d="M-48,52 C-47,31 -31,24.5 -11,21.5 L11,21.5 C31,24.5 47,31 48,52 Z" fill={p.kit} />
                      <path d="M-48,52 C-47,31 -31,24.5 -11,21.5 L-4,21.5 C-20,27 -30,36 -33,52 Z" fill="#FEFEFE" fillOpacity="0.12" />
                      <rect x="-6.8" y="11" width="13.6" height="14" fill={p.skin} />
                      <path d="M-6.8,13 C-2,17.5 2,17.5 6.8,13 L6.8,18 C2,21 -2,21 -6.8,18 Z" fill="#1C1C1C" fillOpacity="0.16" />
                      <path d="M-11,21.5 L0,31 L11,21.5" fill="none" stroke={p.trim} strokeWidth="3.2" strokeLinejoin="round" />
                      <circle cx="-16.4" cy="-3" r="3.6" fill={p.skin} />
                      <circle cx="16.4" cy="-3" r="3.6" fill={p.skin} />
                      <path d={p.jaw} fill={p.skin} />
                      <path d="M4,-22.5 C11,-21 16,-16.5 16.2,-10 L15.4,4 C13.5,14 7,19.5 0,19.5 C5.5,15 8.8,7 9,-2 C9.2,-12 7.8,-18 4,-22.5 Z" fill="#1C1C1C" fillOpacity="0.09" />
                      <path d={p.bd} fill={p.hc} fillOpacity={p.bdo} />
                      <path d={p.hf} fill={p.hc} />
                      <path d={p.brow} fill="none" stroke={p.hc} strokeWidth="2.6" strokeLinecap="round" />
                      <path d="M-9.6,-4.6 Q-7,-6.6 -4.4,-4.6 Q-7,-3.4 -9.6,-4.6 Z M4.4,-4.6 Q7,-6.6 9.6,-4.6 Q7,-3.4 4.4,-4.6 Z" fill="#1C1C1C" />
                      <path d="M0.8,-3.5 Q3.2,3.5 0.6,5.6 Q-0.6,6.2 -2,5.8" fill="none" stroke="#1C1C1C" strokeOpacity="0.35" strokeWidth="1.3" strokeLinecap="round" />
                      <path d="M-4.2,11 Q0,13 4.2,11" fill="none" stroke={p.mc} strokeOpacity="0.9" strokeWidth="1.6" strokeLinecap="round" />
                    </g>
                  </g>
                  <circle cx="0" cy="0" r="44" fill="none" stroke="#1C1C1C" strokeOpacity="0.12" strokeWidth="0.8" />
                  <circle cx="33" cy="33" r="13.5" fill={p.badge} stroke="#FEFEFE" strokeWidth="3.2" />
                  <text x="33" y="38.4" textAnchor="middle" fontSize="15.5" fontWeight="600" fill="#FEFEFE" style={{ fontFamily: "var(--mono)" }}>
                    {p.num}
                  </text>
                </g>
              </g>
            </Fragment>
          ))}
          <polyline points={v.trail} fill="none" stroke="#1C1C1C" strokeOpacity="0.22" strokeWidth="0.45" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={v.bx} cy={v.by} r="0.78" fill="#FEFEFE" stroke="#1C1C1C" strokeWidth="0.2" />
          <circle cx={v.bx} cy={v.by} r="0.26" fill="#1C1C1C" />
        </svg>
        {v.showDec && (
          <>
            <div className="mm-pop" style={{ position: "absolute", left: `${v.dec.left}px`, top: `${v.dec.top}px`, width: "190px", boxSizing: "border-box", padding: "12px", borderRadius: "12px", background: "rgba(254, 254, 254, 0.94)", border: "1px solid #CCCCCC", fontFamily: "var(--mono)", fontSize: "11px", color: "#1C1C1C", display: "flex", flexDirection: "column", gap: "6px", pointerEvents: "none", boxShadow: "0 8px 24px rgba(28, 28, 28, 0.08)" }}>
              <span style={{ fontWeight: "500", letterSpacing: "0.08em" }}>
                {v.dec.title}
              </span>
              {v.dec.rows.map((r, r_i) => (
                <Fragment key={r_i}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: r.on }}>
                    <span style={{ width: "56px" }}>
                      {r.k}
                    </span>
                    <span style={{ flexGrow: "1", height: "4px", borderRadius: "2px", background: "#EDECEC", overflow: "hidden" }}>
                      <span style={{ display: "block", height: "4px", width: `${r.w}%`, background: r.bar, transition: "width 240ms ease" }} />
                    </span>
                    <span style={{ width: "30px", textAlign: "right" }}>
                      {r.v}
                    </span>
                  </div>
                </Fragment>
              ))}
              <span style={{ color: "#555555" }}>
                {v.dec.eps}
              </span>
              <span style={{ paddingTop: "6px", borderTop: "1px solid #EDECEC", color: v.dec.flowC, fontWeight: "500" }}>
                {v.dec.flow}
              </span>
            </div>
          </>
        )}
        {v.showSel && (
          <>
            <div className="mm-pop" style={{ position: "absolute", left: `${v.sel.left}px`, top: `${v.sel.top}px`, width: "316px", boxSizing: "border-box", padding: "14px", borderRadius: "14px", background: "#FEFEFE", border: "1px solid #1C1C1C", boxShadow: "0 10px 28px rgba(28, 28, 28, 0.12)", display: "flex", gap: "14px", alignItems: "center" }}>
              <svg width="96" height="96" viewBox="-52 -52 104 104" aria-hidden="true" style={{ flexShrink: "0" }}>
                <defs>
                  <clipPath id="selD">
                    <circle cx="0" cy="0" r="44" />
                  </clipPath>
                </defs>
                <circle cx="0" cy="0" r="50" fill="#FEFEFE" stroke={v.sel.edge} strokeWidth="3.4" />
                <g clipPath="url(#selD)">
                  <rect x="-44" y="-44" width="88" height="88" fill={v.sel.bg} />
                  <path d="M-44,-44 L44,-44 L-44,30 Z" fill="#FEFEFE" fillOpacity="0.35" />
                  <g transform="translate(0 1) scale(1.12)">
                    <path d={v.sel.hb} fill={v.sel.hc} />
                    <path d="M-48,52 C-47,31 -31,24.5 -11,21.5 L11,21.5 C31,24.5 47,31 48,52 Z" fill={v.sel.kit} />
                    <path d="M-48,52 C-47,31 -31,24.5 -11,21.5 L-4,21.5 C-20,27 -30,36 -33,52 Z" fill="#FEFEFE" fillOpacity="0.12" />
                    <rect x="-6.8" y="11" width="13.6" height="14" fill={v.sel.skin} />
                    <path d="M-6.8,13 C-2,17.5 2,17.5 6.8,13 L6.8,18 C2,21 -2,21 -6.8,18 Z" fill="#1C1C1C" fillOpacity="0.16" />
                    <path d="M-11,21.5 L0,31 L11,21.5" fill="none" stroke={v.sel.trim} strokeWidth="3.2" strokeLinejoin="round" />
                    <circle cx="-16.4" cy="-3" r="3.6" fill={v.sel.skin} />
                    <circle cx="16.4" cy="-3" r="3.6" fill={v.sel.skin} />
                    <path d={v.sel.jaw} fill={v.sel.skin} />
                    <path d="M4,-22.5 C11,-21 16,-16.5 16.2,-10 L15.4,4 C13.5,14 7,19.5 0,19.5 C5.5,15 8.8,7 9,-2 C9.2,-12 7.8,-18 4,-22.5 Z" fill="#1C1C1C" fillOpacity="0.09" />
                    <path d={v.sel.bd} fill={v.sel.hc} fillOpacity={v.sel.bdo} />
                    <path d={v.sel.hf} fill={v.sel.hc} />
                    <path d={v.sel.brow} fill="none" stroke={v.sel.hc} strokeWidth="2.6" strokeLinecap="round" />
                    <path d="M-9.6,-4.6 Q-7,-6.6 -4.4,-4.6 Q-7,-3.4 -9.6,-4.6 Z M4.4,-4.6 Q7,-6.6 9.6,-4.6 Q7,-3.4 4.4,-4.6 Z" fill="#1C1C1C" />
                    <path d="M0.8,-3.5 Q3.2,3.5 0.6,5.6 Q-0.6,6.2 -2,5.8" fill="none" stroke="#1C1C1C" strokeOpacity="0.35" strokeWidth="1.3" strokeLinecap="round" />
                    <path d="M-4.2,11 Q0,13 4.2,11" fill="none" stroke={v.sel.mc} strokeOpacity="0.9" strokeWidth="1.6" strokeLinecap="round" />
                  </g>
                </g>
                <circle cx="0" cy="0" r="44" fill="none" stroke="#1C1C1C" strokeOpacity="0.12" strokeWidth="0.8" />
                <circle cx="33" cy="33" r="13.5" fill={v.sel.badge} stroke="#FEFEFE" strokeWidth="3.2" />
                <text x="33" y="38.4" textAnchor="middle" fontSize="15.5" fontWeight="600" fill="#FEFEFE" style={{ fontFamily: "var(--mono)" }}>
                  {v.sel.num}
                </text>
              </svg>
              <div style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0", paddingRight: "18px" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.14em", color: v.sel.tc, fontWeight: "600" }}>
                  {v.sel.team}
                </span>
                <span style={{ fontFamily: "var(--serif)", fontWeight: "700", fontSize: "18px", lineHeight: "1.15", color: "#1C1C1C" }}>
                  {v.sel.name}
                </span>
                <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "14px", lineHeight: "1.3", color: "#4A4A4A" }}>
                  {v.sel.beh}
                </span>
              </div>
              <button type="button" onClick={v.closeSel} aria-label="Close" style={{ position: "absolute", right: "4px", top: "4px", width: "28px", height: "28px", border: "0", background: "transparent", color: "#555555", cursor: "pointer", fontFamily: "var(--mono)", fontSize: "12px" }}>
                ×
              </button>
            </div>
          </>
        )}
        {v.showNote && (
          <>
            <div className="mm-pop" style={{ position: "absolute", left: "12px", bottom: "12px", padding: "7px 12px", borderRadius: "999px", background: "#FEFEFE", border: "1px solid #CCCCCC", fontFamily: "var(--mono)", fontSize: "12px", color: "#1C1C1C", pointerEvents: "none" }}>
              ▸ {v.note}
            </div>
          </>
        )}
        {v.showGoal && (
          <>
            <div style={{ position: "absolute", left: "0", top: "0", right: "0", bottom: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", background: "rgba(254, 254, 254, 0.72)", pointerEvents: "none" }}>
              <span className="mm-up" style={{ fontFamily: "var(--serif)", fontWeight: "700", fontSize: "84px", lineHeight: "1", letterSpacing: "0.04em", color: "#1C1C1C" }}>
                {v.goalWord}
              </span>
              <span className="mm-up2" style={{ fontFamily: "var(--sans)", fontWeight: "700", fontSize: "12px", letterSpacing: "0.16em", textTransform: "uppercase", color: v.goalC }}>
                {v.goalTeam}
              </span>
              <span className="mm-up2" style={{ fontFamily: "var(--serif)", fontSize: "36px", color: "#1C1C1C" }}>
                {v.goalScore}
              </span>
              <span className="mm-up3" style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "#555555" }}>
                {v.goalReward}
              </span>
            </div>
          </>
        )}
        <div style={{ position: "absolute", left: "14px", bottom: "14px", boxSizing: "border-box", padding: "10px 12px", borderRadius: "12px", background: "rgba(254, 254, 254, 0.92)", display: "flex", flexDirection: "column", gap: "4px", pointerEvents: "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.08em", color: "#555555" }}>
            <span>
              WIN RATE vs BASELINE
            </span>
            <span style={{ color: "#1C1C1C", fontWeight: "600" }}>
              {v.winTxt}
            </span>
          </div>
          <svg width="200" height="64" viewBox="-4 -2 208 68" aria-hidden="true" style={{ display: "block" }}>
            <polyline points={v.curveAll} fill="none" stroke="#CCCCCC" strokeWidth="1.5" strokeDasharray="3 3" />
            <polyline points={v.curveDone} fill="none" stroke="#C8372D" strokeWidth="2.2" strokeLinejoin="round" />
            <circle cx={v.dotX} cy={v.dotY} r="4" fill="#C8372D" stroke="#FEFEFE" strokeWidth="2" />
          </svg>
          <span style={{ fontFamily: "var(--mono)", fontSize: "8px", color: "#767676" }}>
            training curve illustrative · match is live
          </span>
        </div>
        {v.showBanner && (
          <>
            <div className="mm-pop" style={{ position: "absolute", left: "50%", top: "16px", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "10px", padding: "8px 14px", borderRadius: "999px", background: "#1C1C1C", color: "#FEFEFE", fontFamily: "var(--mono)", fontSize: "11px", whiteSpace: "nowrap", pointerEvents: "none" }}>
              <span>
                {v.banA}
              </span>
              <span style={{ color: "#B7C396" }}>
                {v.banB}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Mobile({ v }) {
  return (
    <div style={{ width: "100%", boxSizing: "border-box", background: "#EDECEC", color: "#1C1C1C", fontFamily: "var(--sans)", display: "flex", flexDirection: "column", gap: "12px", paddingBottom: "14px" }}>
      <div style={{ position: "relative", width: "100%", height: `${v.boxH}px`, flexShrink: "0", overflow: "hidden", background: "#E0E7D7" }}>
        <svg width="100%" height="100%" viewBox={v.vb} preserveAspectRatio="xMidYMid slice" role="img" aria-label="Top-down football pitch: RL agents learning to play against a scripted team" style={{ display: "block" }}>
          <rect x="-6" y="-6" width="117" height="80" fill="#E0E7D7" />
          <rect x="10.5" y="0" width="10.5" height="68" fill="#D9E1CF" />
          <rect x="31.5" y="0" width="10.5" height="68" fill="#D9E1CF" />
          <rect x="52.5" y="0" width="10.5" height="68" fill="#D9E1CF" />
          <rect x="73.5" y="0" width="10.5" height="68" fill="#D9E1CF" />
          <rect x="94.5" y="0" width="10.5" height="68" fill="#D9E1CF" />
          <g fill="none" stroke="#FEFEFE" strokeWidth="0.32">
            <rect x="0" y="0" width="105" height="68" />
            <line x1="52.5" y1="0" x2="52.5" y2="68" />
            <circle cx="52.5" cy="34" r="9.15" />
            <rect x="0" y="13.84" width="16.5" height="40.32" />
            <rect x="88.5" y="13.84" width="16.5" height="40.32" />
            <rect x="0" y="24.84" width="5.5" height="18.32" />
            <rect x="99.5" y="24.84" width="5.5" height="18.32" />
            <path d="M16.5,26.7 A9.15,9.15 0 0 1 16.5,41.3" />
            <path d="M88.5,26.7 A9.15,9.15 0 0 0 88.5,41.3" />
          </g>
          <circle cx="52.5" cy="34" r="0.35" fill="#FEFEFE" />
          <circle cx="11" cy="34" r="0.3" fill="#FEFEFE" />
          <circle cx="94" cy="34" r="0.3" fill="#FEFEFE" />
          <rect x="-2.2" y="30.34" width="2.2" height="7.32" fill="#FEFEFE" fillOpacity="0.7" stroke="#1C1C1C" strokeWidth="0.28" />
          <rect x="105" y="30.34" width="2.2" height="7.32" fill="#FEFEFE" fillOpacity="0.7" stroke="#1C1C1C" strokeWidth="0.28" />
          <defs>
            <clipPath id="pnM">
              <circle cx="0" cy="0" r="44" />
            </clipPath>
          </defs>
          {v.players.map((p, p_i) => (
            <Fragment key={p_i}>
              <g transform={p.tf} opacity={p.op} onClick={p.pick} style={{ cursor: "pointer", transition: "opacity 500ms ease" }}>
                <ellipse cx="0.35" cy="2.75" rx="2.3" ry="0.6" fill="#1C1C1C" fillOpacity="0.16" />
                <circle cx="0" cy="0" r="3.55" fill="none" stroke={p.haloC} strokeWidth="0.3" strokeDasharray="0.9 0.6" strokeOpacity={p.halo} />
                <g transform="scale(0.068)">
                  <circle cx="0" cy="0" r="50" fill="#FEFEFE" stroke={p.edge} strokeWidth="3.4" />
                  <g clipPath="url(#pnM)">
                    <rect x="-44" y="-44" width="88" height="88" fill={p.bg} />
                    <path d="M-44,-44 L44,-44 L-44,30 Z" fill="#FEFEFE" fillOpacity="0.35" />
                    <g transform="translate(0 1) scale(1.12)">
                      <path d={p.hb} fill={p.hc} />
                      <path d="M-48,52 C-47,31 -31,24.5 -11,21.5 L11,21.5 C31,24.5 47,31 48,52 Z" fill={p.kit} />
                      <path d="M-48,52 C-47,31 -31,24.5 -11,21.5 L-4,21.5 C-20,27 -30,36 -33,52 Z" fill="#FEFEFE" fillOpacity="0.12" />
                      <rect x="-6.8" y="11" width="13.6" height="14" fill={p.skin} />
                      <path d="M-6.8,13 C-2,17.5 2,17.5 6.8,13 L6.8,18 C2,21 -2,21 -6.8,18 Z" fill="#1C1C1C" fillOpacity="0.16" />
                      <path d="M-11,21.5 L0,31 L11,21.5" fill="none" stroke={p.trim} strokeWidth="3.2" strokeLinejoin="round" />
                      <circle cx="-16.4" cy="-3" r="3.6" fill={p.skin} />
                      <circle cx="16.4" cy="-3" r="3.6" fill={p.skin} />
                      <path d={p.jaw} fill={p.skin} />
                      <path d="M4,-22.5 C11,-21 16,-16.5 16.2,-10 L15.4,4 C13.5,14 7,19.5 0,19.5 C5.5,15 8.8,7 9,-2 C9.2,-12 7.8,-18 4,-22.5 Z" fill="#1C1C1C" fillOpacity="0.09" />
                      <path d={p.bd} fill={p.hc} fillOpacity={p.bdo} />
                      <path d={p.hf} fill={p.hc} />
                      <path d={p.brow} fill="none" stroke={p.hc} strokeWidth="2.6" strokeLinecap="round" />
                      <path d="M-9.6,-4.6 Q-7,-6.6 -4.4,-4.6 Q-7,-3.4 -9.6,-4.6 Z M4.4,-4.6 Q7,-6.6 9.6,-4.6 Q7,-3.4 4.4,-4.6 Z" fill="#1C1C1C" />
                      <path d="M0.8,-3.5 Q3.2,3.5 0.6,5.6 Q-0.6,6.2 -2,5.8" fill="none" stroke="#1C1C1C" strokeOpacity="0.35" strokeWidth="1.3" strokeLinecap="round" />
                      <path d="M-4.2,11 Q0,13 4.2,11" fill="none" stroke={p.mc} strokeOpacity="0.9" strokeWidth="1.6" strokeLinecap="round" />
                    </g>
                  </g>
                  <circle cx="0" cy="0" r="44" fill="none" stroke="#1C1C1C" strokeOpacity="0.12" strokeWidth="0.8" />
                  <circle cx="33" cy="33" r="13.5" fill={p.badge} stroke="#FEFEFE" strokeWidth="3.2" />
                  <text x="33" y="38.4" textAnchor="middle" fontSize="15.5" fontWeight="600" fill="#FEFEFE" style={{ fontFamily: "var(--mono)" }}>
                    {p.num}
                  </text>
                </g>
              </g>
            </Fragment>
          ))}
          <polyline points={v.trail} fill="none" stroke="#1C1C1C" strokeOpacity="0.22" strokeWidth="0.45" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={v.bx} cy={v.by} r="0.78" fill="#FEFEFE" stroke="#1C1C1C" strokeWidth="0.2" />
          <circle cx={v.bx} cy={v.by} r="0.26" fill="#1C1C1C" />
        </svg>
        {v.showDec && (
          <>
            <div className="mm-pop" style={{ position: "absolute", left: `${v.dec.left}px`, top: `${v.dec.top}px`, width: "158px", boxSizing: "border-box", padding: "8px", borderRadius: "12px", background: "rgba(254, 254, 254, 0.94)", border: "1px solid #CCCCCC", fontFamily: "var(--mono)", fontSize: "10px", color: "#1C1C1C", display: "flex", flexDirection: "column", gap: "6px", pointerEvents: "none", boxShadow: "0 8px 24px rgba(28, 28, 28, 0.08)" }}>
              <span style={{ fontWeight: "500", letterSpacing: "0.08em" }}>
                {v.dec.title}
              </span>
              {v.dec.rows.map((r, r_i) => (
                <Fragment key={r_i}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: r.on }}>
                    <span style={{ width: "48px" }}>
                      {r.k}
                    </span>
                    <span style={{ flexGrow: "1", height: "4px", borderRadius: "2px", background: "#EDECEC", overflow: "hidden" }}>
                      <span style={{ display: "block", height: "4px", width: `${r.w}%`, background: r.bar, transition: "width 240ms ease" }} />
                    </span>
                    <span style={{ width: "30px", textAlign: "right" }}>
                      {r.v}
                    </span>
                  </div>
                </Fragment>
              ))}
              <span style={{ color: "#555555" }}>
                {v.dec.eps}
              </span>
              <span style={{ paddingTop: "6px", borderTop: "1px solid #EDECEC", color: v.dec.flowC, fontWeight: "500" }}>
                {v.dec.flow}
              </span>
            </div>
          </>
        )}
        {v.showSel && (
          <>
            <div className="mm-pop" style={{ position: "absolute", left: `${v.sel.left}px`, top: `${v.sel.top}px`, width: "236px", boxSizing: "border-box", padding: "10px", borderRadius: "14px", background: "#FEFEFE", border: "1px solid #1C1C1C", boxShadow: "0 10px 28px rgba(28, 28, 28, 0.12)", display: "flex", gap: "10px", alignItems: "center" }}>
              <svg width="72" height="72" viewBox="-52 -52 104 104" aria-hidden="true" style={{ flexShrink: "0" }}>
                <defs>
                  <clipPath id="selM">
                    <circle cx="0" cy="0" r="44" />
                  </clipPath>
                </defs>
                <circle cx="0" cy="0" r="50" fill="#FEFEFE" stroke={v.sel.edge} strokeWidth="3.4" />
                <g clipPath="url(#selM)">
                  <rect x="-44" y="-44" width="88" height="88" fill={v.sel.bg} />
                  <path d="M-44,-44 L44,-44 L-44,30 Z" fill="#FEFEFE" fillOpacity="0.35" />
                  <g transform="translate(0 1) scale(1.12)">
                    <path d={v.sel.hb} fill={v.sel.hc} />
                    <path d="M-48,52 C-47,31 -31,24.5 -11,21.5 L11,21.5 C31,24.5 47,31 48,52 Z" fill={v.sel.kit} />
                    <path d="M-48,52 C-47,31 -31,24.5 -11,21.5 L-4,21.5 C-20,27 -30,36 -33,52 Z" fill="#FEFEFE" fillOpacity="0.12" />
                    <rect x="-6.8" y="11" width="13.6" height="14" fill={v.sel.skin} />
                    <path d="M-6.8,13 C-2,17.5 2,17.5 6.8,13 L6.8,18 C2,21 -2,21 -6.8,18 Z" fill="#1C1C1C" fillOpacity="0.16" />
                    <path d="M-11,21.5 L0,31 L11,21.5" fill="none" stroke={v.sel.trim} strokeWidth="3.2" strokeLinejoin="round" />
                    <circle cx="-16.4" cy="-3" r="3.6" fill={v.sel.skin} />
                    <circle cx="16.4" cy="-3" r="3.6" fill={v.sel.skin} />
                    <path d={v.sel.jaw} fill={v.sel.skin} />
                    <path d="M4,-22.5 C11,-21 16,-16.5 16.2,-10 L15.4,4 C13.5,14 7,19.5 0,19.5 C5.5,15 8.8,7 9,-2 C9.2,-12 7.8,-18 4,-22.5 Z" fill="#1C1C1C" fillOpacity="0.09" />
                    <path d={v.sel.bd} fill={v.sel.hc} fillOpacity={v.sel.bdo} />
                    <path d={v.sel.hf} fill={v.sel.hc} />
                    <path d={v.sel.brow} fill="none" stroke={v.sel.hc} strokeWidth="2.6" strokeLinecap="round" />
                    <path d="M-9.6,-4.6 Q-7,-6.6 -4.4,-4.6 Q-7,-3.4 -9.6,-4.6 Z M4.4,-4.6 Q7,-6.6 9.6,-4.6 Q7,-3.4 4.4,-4.6 Z" fill="#1C1C1C" />
                    <path d="M0.8,-3.5 Q3.2,3.5 0.6,5.6 Q-0.6,6.2 -2,5.8" fill="none" stroke="#1C1C1C" strokeOpacity="0.35" strokeWidth="1.3" strokeLinecap="round" />
                    <path d="M-4.2,11 Q0,13 4.2,11" fill="none" stroke={v.sel.mc} strokeOpacity="0.9" strokeWidth="1.6" strokeLinecap="round" />
                  </g>
                </g>
                <circle cx="0" cy="0" r="44" fill="none" stroke="#1C1C1C" strokeOpacity="0.12" strokeWidth="0.8" />
                <circle cx="33" cy="33" r="13.5" fill={v.sel.badge} stroke="#FEFEFE" strokeWidth="3.2" />
                <text x="33" y="38.4" textAnchor="middle" fontSize="15.5" fontWeight="600" fill="#FEFEFE" style={{ fontFamily: "var(--mono)" }}>
                  {v.sel.num}
                </text>
              </svg>
              <div style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0", paddingRight: "18px" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "8px", letterSpacing: "0.14em", color: v.sel.tc, fontWeight: "600" }}>
                  {v.sel.team}
                </span>
                <span style={{ fontFamily: "var(--serif)", fontWeight: "700", fontSize: "15px", lineHeight: "1.15", color: "#1C1C1C" }}>
                  {v.sel.name}
                </span>
                <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "12px", lineHeight: "1.3", color: "#4A4A4A" }}>
                  {v.sel.beh}
                </span>
              </div>
              <button type="button" onClick={v.closeSel} aria-label="Close" style={{ position: "absolute", right: "4px", top: "4px", width: "28px", height: "28px", border: "0", background: "transparent", color: "#555555", cursor: "pointer", fontFamily: "var(--mono)", fontSize: "12px" }}>
                ×
              </button>
            </div>
          </>
        )}
        {v.showNote && (
          <>
            <div className="mm-pop" style={{ position: "absolute", left: "12px", bottom: "12px", padding: "7px 12px", borderRadius: "999px", background: "#FEFEFE", border: "1px solid #CCCCCC", fontFamily: "var(--mono)", fontSize: "11px", color: "#1C1C1C", pointerEvents: "none" }}>
              ▸ {v.note}
            </div>
          </>
        )}
        {v.showGoal && (
          <>
            <div style={{ position: "absolute", left: "0", top: "0", right: "0", bottom: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", background: "rgba(254, 254, 254, 0.72)", pointerEvents: "none" }}>
              <span className="mm-up" style={{ fontFamily: "var(--serif)", fontWeight: "700", fontSize: "40px", lineHeight: "1", letterSpacing: "0.04em", color: "#1C1C1C" }}>
                {v.goalWord}
              </span>
              <span className="mm-up2" style={{ fontFamily: "var(--sans)", fontWeight: "700", fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: v.goalC }}>
                {v.goalTeam}
              </span>
              <span className="mm-up2" style={{ fontFamily: "var(--serif)", fontSize: "22px", color: "#1C1C1C" }}>
                {v.goalScore}
              </span>
              <span className="mm-up3" style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "#555555" }}>
                {v.goalReward}
              </span>
            </div>
          </>
        )}
        {v.showBanner && (
          <>
            <div className="mm-pop" style={{ position: "absolute", left: "50%", top: "10px", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "10px", padding: "6px 14px", borderRadius: "999px", background: "#1C1C1C", color: "#FEFEFE", fontFamily: "var(--mono)", fontSize: "10px", whiteSpace: "nowrap", pointerEvents: "none" }}>
              <span>
                {v.banA}
              </span>
              <span style={{ color: "#B7C396" }}>
                {v.banB}
              </span>
            </div>
          </>
        )}
      </div>
      <div style={{ padding: "0 14px", display: "flex", flexDirection: "column", gap: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--mono)", color: "#1C1C1C", flexShrink: "0" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10px", letterSpacing: "0.12em", color: "#C8372D", fontWeight: "600" }}>
              <svg width="20" height="22" viewBox="-2 -2 44 49" aria-hidden="true" style={{ flexShrink: "0", filter: "drop-shadow(0 1px 1.5px rgba(28,28,28,0.18))" }}>
                <path d="M20,0 L40,6 L40,22 C40,34 31,41.5 20,45 C9,41.5 0,34 0,22 L0,6 Z" fill="#FEFEFE" />
                <path d="M20,4 L36,8.8 L36,22 C36,31.5 29,37.8 20,40.8 C11,37.8 4,31.5 4,22 L4,8.8 Z" fill="#C8372D" />
                <text x="20" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#FEFEFE" style={{ fontFamily: "var(--serif)" }}>
                  RL
                </text>
              </svg>
              RL FC
            </span>
            <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px", minWidth: "52px" }}>
              <span style={{ fontFamily: "var(--serif)", fontSize: "20px", lineHeight: "1" }}>
                {v.s0} — {v.s1}
              </span>
              <span style={{ fontSize: "9px", color: "#555555", letterSpacing: "0.08em" }}>
                {v.clock}
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10px", letterSpacing: "0.12em", color: "#3F4A55", fontWeight: "600" }}>
              BASELINE
              <svg width="20" height="22" viewBox="-2 -2 44 49" aria-hidden="true" style={{ flexShrink: "0", filter: "drop-shadow(0 1px 1.5px rgba(28,28,28,0.18))" }}>
                <path d="M20,0 L40,6 L40,22 C40,34 31,41.5 20,45 C9,41.5 0,34 0,22 L0,6 Z" fill="#FEFEFE" />
                <path d="M20,4 L36,8.8 L36,22 C36,31.5 29,37.8 20,40.8 C11,37.8 4,31.5 4,22 L4,8.8 Z" fill="#3F4A55" />
                <text x="20" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#FEFEFE" style={{ fontFamily: "var(--serif)" }}>
                  BL
                </text>
              </svg>
            </span>
          </div>
          <button type="button" onClick={v.togglePlay} style={{ flexShrink: "0", height: "30px", padding: "0", width: "34px", borderRadius: "999px", border: "1px solid #CCCCCC", background: "#FEFEFE", color: "#1C1C1C", fontFamily: "var(--mono)", fontSize: "10px", cursor: "pointer", whiteSpace: "nowrap" }}>
            {v.playShort}
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", flexGrow: "1", minWidth: "0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px", fontFamily: "var(--mono)", fontSize: "9px", color: "#555555" }}>
            <span>
              <span style={{ color: "#1C1C1C", fontWeight: "600" }}>
                TRAINING
              </span>
              {" "}· episode{" "}
              <span style={{ color: "#1C1C1C" }}>
                {v.epTxt}
              </span>
            </span>
            <span>
              ε {v.epsTxt} · {v.epsMood}
            </span>
          </div>
          <div style={{ position: "relative", height: "26px", margin: "0 26px" }}>
            <div style={{ position: "absolute", left: "0", right: "0", top: "6px", height: "2px", background: "#CCCCCC" }} />
            <div style={{ position: "absolute", left: "0", top: "6px", height: "2px", width: `${v.tlFill}%`, background: "#1C1C1C" }} />
            {v.tl.map((c, c_i) => (
              <Fragment key={c_i}>
                <button type="button" onClick={c.pick} aria-label={`Load checkpoint ${c.label}`} style={{ position: "absolute", left: `${c.left}%`, top: "0", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", padding: "0", border: "0", background: "transparent", cursor: "pointer" }}>
                  <span style={{ width: "12px", height: "12px", borderRadius: "6px", border: "2px solid #1C1C1C", boxSizing: "border-box", background: c.bg }} />
                  <span style={{ fontFamily: "var(--mono)", fontSize: "9px", whiteSpace: "nowrap", color: c.fg, fontWeight: c.w }}>
                    {c.label}
                  </span>
                </button>
              </Fragment>
            ))}
          </div>
        </div>
        <div style={{ position: "relative", height: "104px" }}>
          <div style={{ position: "absolute", left: "0", right: "0", top: "0", boxSizing: "border-box", padding: "10px 12px", borderRadius: "12px", background: "rgba(254, 254, 254, 0.92)", display: "flex", flexDirection: "column", gap: "4px", pointerEvents: "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.08em", color: "#555555" }}>
              <span>
                WIN RATE vs BASELINE
              </span>
              <span style={{ color: "#1C1C1C", fontWeight: "600" }}>
                {v.winTxt}
              </span>
            </div>
            <svg width="200" height="64" viewBox="-4 -2 208 68" aria-hidden="true" style={{ display: "block" }}>
              <polyline points={v.curveAll} fill="none" stroke="#CCCCCC" strokeWidth="1.5" strokeDasharray="3 3" />
              <polyline points={v.curveDone} fill="none" stroke="#C8372D" strokeWidth="2.2" strokeLinejoin="round" />
              <circle cx={v.dotX} cy={v.dotY} r="4" fill="#C8372D" stroke="#FEFEFE" strokeWidth="2" />
            </svg>
            <span style={{ fontFamily: "var(--mono)", fontSize: "8px", color: "#767676" }}>
              training curve illustrative · match is live
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LearnPanel({ layout = 'desktop', ...props }) {
  const v = useDCLogic(Logic, { layout, ...props });
  return layout === 'mobile' ? <Mobile v={v} /> : <Desktop v={v} />;
}
