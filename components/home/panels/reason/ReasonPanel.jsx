'use client';

// Templates converted from design-handoff/design/AnswerPanel.dc.html and AnswerPanelMobile.dc.html.
import { Fragment } from 'react';
import { useDCLogic } from '../../dc/useDCLogic';
import Logic from './logic';
import '../panels.css';

function Desktop({ v }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", boxSizing: "border-box", padding: "16px 22px", borderRadius: "0", background: "#FEFEFE", color: "#1C1C1C", fontFamily: "var(--sans)", display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "2px 16px", fontFamily: "var(--mono)", fontSize: "12px" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "#555555" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "4px", background: "#BA9A91" }} />
          manan-gpt · decoder-only · 6 blocks · 4 heads · d_model 64
        </span>
        <span style={{ color: "#555555" }}>
          weights illustrative · math real
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "#555555" }}>
          <span style={{ color: "#4E5A2E" }}>
            {v.autoTag}
          </span>
          prompt · click any token to make it the query — arcs show where it looks
        </div>
        <div style={{ position: "relative", width: "100%", height: "108px" }}>
          <svg width="100%" height="68" aria-hidden="true" style={{ position: "absolute", left: "0", top: "0", overflow: "visible" }}>
            {v.arcs.map((a, a_i) => (
              <Fragment key={a_i}>
                <path d={a.d} fill="none" stroke="#4E5A2E" strokeWidth={a.sw} strokeOpacity={a.op} strokeLinecap="round" />
              </Fragment>
            ))}
          </svg>
          <div style={{ position: "absolute", left: "0", top: "64px", display: "flex", gap: "6px" }}>
            {v.chips.map((c, c_i) => (
              <Fragment key={c_i}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", width: `${c.w}px`, flexShrink: "0" }}>
                  <button type="button" onClick={c.pick} title={c.idTxt} style={{ width: "100%", height: "36px", padding: "0", borderRadius: "9px", border: `2px solid ${c.border}`, background: c.bg, color: c.fg, fontFamily: "var(--mono)", fontSize: "13px", cursor: "pointer" }}>
                    {c.label}
                  </button>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: c.weightColor }}>
                    {c.weightTxt}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div style={{ flexGrow: "1", display: "grid", gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1fr) minmax(0, 1fr)", gap: "12px", minHeight: "0" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "12px 14px", borderRadius: "14px", background: "#EDECEC", boxSizing: "border-box", minHeight: "0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#4E5A2E" }}>
              Attention
            </span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "#555555" }}>
              block 3 · 4 heads
            </span>
          </div>
          <div role="group" aria-label="Attention head" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "6px" }}>
            {v.heads.map((hd, hd_i) => (
              <Fragment key={hd_i}>
                <button type="button" onClick={hd.pick} aria-pressed={hd.pressed} style={{ height: "28px", minWidth: "0", overflow: "hidden", textOverflow: "ellipsis", padding: "0 8px", borderRadius: "8px", border: "1px solid #CCCCCC", background: hd.bg, whiteSpace: "nowrap", fontSize: "12px", color: hd.fg, fontFamily: "var(--mono)", textAlign: "left", cursor: "pointer" }}>
                  {hd.label}
                </button>
              </Fragment>
            ))}
          </div>
          <div style={{ fontSize: "13px", lineHeight: "1.4", color: "#4A4A4A" }}>
            {v.headDesc}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: "11px", color: "#555555" }}>
              <span>
                query ↓ · key →
              </span>
              <span>
                masked = future
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: v.gridCols, gap: "2px" }}>
              {v.heat.map((hc, hc_i) => (
                <Fragment key={hc_i}>
                  <button type="button" aria-label="Select query row" onClick={hc.pick} style={{ height: `${v.cellPx}px`, padding: "0", borderRadius: "3px", border: `1px solid ${hc.bd}`, background: hc.bg, cursor: "pointer" }} />
                </Fragment>
              ))}
            </div>
          </div>
          <div style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "#4E5A2E" }}>
            {v.readout}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "12px 14px", borderRadius: "14px", background: "#EDECEC", boxSizing: "border-box", minHeight: "0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#4E5A2E" }}>
              Forward pass
            </span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "#555555" }}>
              residual stream ↓
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            {v.stages.map((s, s_i) => (
              <Fragment key={s_i}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", height: "20px", padding: "0 10px", borderRadius: "6px", background: s.bg, color: s.fg, fontFamily: "var(--mono)", fontSize: "12px" }}>
                  <span style={{ width: "92px", flexShrink: "0" }}>
                    {s.label}
                  </span>
                  <span style={{ flexGrow: "1", height: "6px", borderRadius: "3px", background: "#EDECEC", overflow: "hidden" }}>
                    <span style={{ display: "block", width: `${s.bar}%`, height: "6px", borderRadius: "3px", background: s.barColor }} />
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
          <div style={{ minHeight: "34px", fontFamily: "var(--mono)", fontSize: "11px", lineHeight: "1.5", color: "#1C1C1C" }}>
            ▸ {v.detail}
          </div>
          <button type="button" onClick={v.onGenerate} style={{ height: "38px", border: "0", borderRadius: "999px", background: "#1C1C1C", color: "#FEFEFE", fontFamily: "var(--sans)", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
            {v.genLabel}
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "12px 14px", borderRadius: "14px", background: "#EDECEC", boxSizing: "border-box", minHeight: "0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#4E5A2E" }}>
              Next token
            </span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "#555555" }}>
              entropy {v.entropy} bits
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {v.bars.map((b, b_i) => (
              <Fragment key={b_i}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--mono)", fontSize: "13px" }}>
                  <span style={{ width: "92px", flexShrink: "0", color: "#1C1C1C", whiteSpace: "nowrap", overflow: "hidden" }}>
                    {b.label}
                  </span>
                  <span style={{ height: "12px", width: `${b.w}px`, borderRadius: "4px", background: b.color, transition: "width 160ms ease" }} />
                  <span style={{ color: "#555555", fontSize: "12px" }}>
                    {b.pTxt}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: "12px", color: "#4A4A4A" }}>
              <label htmlFor="tf-temp-p">
                temperature
              </label>
              <span>
                T = {v.tempTxt} · {v.tempMood}
              </span>
            </div>
            <input id="tf-temp-p" type="range" min="0.2" max="2" step="0.05" value={v.tempVal} onChange={v.setTemp} style={{ width: "100%", height: "28px", accentColor: "#4E5A2E" }} />
          </div>
          <div style={{ padding: "10px 12px", borderRadius: "10px", background: "#FEFEFE", fontSize: "14px", lineHeight: "1.45", color: "#1C1C1C" }}>
            {v.sentence}
            <span className="tf-cursor" style={{ display: "inline-block", width: "8px", height: "1em", marginLeft: "3px", verticalAlign: "-2px", background: "#BA9A91" }} />
          </div>
          <button type="button" onClick={v.onReset} style={{ alignSelf: "flex-start", height: "34px", padding: "0 14px", borderRadius: "999px", border: "1px solid #CCCCCC", background: "transparent", color: "#4A4A4A", fontFamily: "var(--mono)", fontSize: "12px", cursor: "pointer" }}>
            Reset prompt
          </button>
        </div>
        {v.isCompact && (
          <>
            <div style={{ position: "absolute", left: "0", top: "0", right: "0", bottom: "0", background: "#FEFEFE", display: "flex", justifyContent: "center" }}>
              <div style={{ width: `${v.peekW}px`, maxWidth: "100%", boxSizing: "border-box", padding: "30px 28px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: "11px", color: "#555555" }}>
                  <span>
                    <span style={{ color: "#4E5A2E" }}>
                      {v.autoTag}
                    </span>
                    manan-gpt
                  </span>
                  <span>
                    {v.stageTxt}
                  </span>
                </div>
                <p style={{ margin: "0", fontFamily: "var(--serif)", fontSize: "27px", lineHeight: "1.45", color: "#1C1C1C" }}>
                  {v.sent.map((w, w_i) => (
                    <Fragment key={w_i}>
                      <span>
                        {w.sp}
                      </span>
                      <span style={{ background: w.bg, color: w.fg, borderRadius: "5px", padding: w.pad, transition: "background 200ms ease, color 200ms ease" }}>
                        {w.t}
                      </span>
                    </Fragment>
                  ))}
                  <span className="tf-cursor" style={{ display: "inline-block", width: "3px", height: "0.9em", marginLeft: "4px", verticalAlign: "-2px", background: "#BA9A91" }} />
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.1em", color: "#4E5A2E" }}>
                    NEXT WORD
                  </span>
                  {v.topBars.map((b, b_i) => (
                    <Fragment key={b_i}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--mono)", fontSize: "12px", height: "18px" }}>
                        <span style={{ width: "96px", whiteSpace: "nowrap", overflow: "hidden" }}>
                          {b.label}
                        </span>
                        <span style={{ height: "10px", width: `${b.w}px`, borderRadius: "3px", background: b.color }} />
                        <span style={{ color: "#555555", fontSize: "11px" }}>
                          {b.pTxt}
                        </span>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Mobile({ v }) {
  return (
    <div style={{ width: "100%", boxSizing: "border-box", padding: "14px", background: "#FEFEFE", color: "#1C1C1C", fontFamily: "var(--sans)", display: "flex", flexDirection: "column", gap: "10px", overflow: "hidden" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "2px 10px", fontFamily: "var(--mono)", fontSize: "10px", color: "#555555" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "4px", background: "#BA9A91" }} />
          manan-gpt · 6 blocks · 4 heads
        </span>
        <span>
          weights illustrative
        </span>
      </div>
      <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "#555555" }}>
        <span style={{ color: "#4E5A2E" }}>
          {v.autoTag}
        </span>
        tap a word to make it the query · numbers = attention
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 5px" }}>
        {v.chips.map((c, c_i) => (
          <Fragment key={c_i}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", width: `${c.w}px`, flexShrink: "0" }}>
              <button type="button" onClick={c.pick} title={c.idTxt} style={{ width: "100%", height: "32px", padding: "0", borderRadius: "8px", border: `2px solid ${c.border}`, background: c.bg, color: c.fg, fontFamily: "var(--mono)", fontSize: "12px", cursor: "pointer" }}>
                {c.label}
              </button>
              <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: c.weightColor }}>
                {c.weightTxt}
              </span>
            </div>
          </Fragment>
        ))}
      </div>
      <div role="group" aria-label="Attention head" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "5px" }}>
        {v.heads.map((hd, hd_i) => (
          <Fragment key={hd_i}>
            <button type="button" onClick={hd.pick} aria-pressed={hd.pressed} style={{ height: "28px", minWidth: "0", overflow: "hidden", textOverflow: "ellipsis", padding: "0 8px", borderRadius: "8px", border: "1px solid #CCCCCC", background: hd.bg, color: hd.fg, fontFamily: "var(--mono)", fontSize: "10px", textAlign: "left", whiteSpace: "nowrap", overflow: "hidden", cursor: "pointer" }}>
              {hd.label}
            </button>
          </Fragment>
        ))}
      </div>
      <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "#4E5A2E" }}>
        {v.readout}
      </div>
      <div style={{ flexGrow: "1", display: "flex", flexDirection: "column", gap: "6px", padding: "12px", borderRadius: "12px", background: "#EDECEC", minHeight: "0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: "10px" }}>
          <span style={{ letterSpacing: "0.1em", color: "#4E5A2E" }}>
            NEXT WORD
          </span>
          <span style={{ color: "#555555" }}>
            entropy {v.entropy} bits
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {v.bars.map((b, b_i) => (
            <Fragment key={b_i}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--mono)", fontSize: "11px", height: "15px" }}>
                <span style={{ width: "86px", flexShrink: "0", whiteSpace: "nowrap", overflow: "hidden" }}>
                  {b.label}
                </span>
                <span style={{ height: "10px", width: `${b.w}px`, borderRadius: "3px", background: b.color }} />
                <span style={{ color: "#555555", fontSize: "10px" }}>
                  {b.pTxt}
                </span>
              </div>
            </Fragment>
          ))}
        </div>
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "2px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: "10px", color: "#4A4A4A" }}>
            <label htmlFor="tf-temp-pm">
              temperature
            </label>
            <span>
              T = {v.tempTxt} · {v.tempMood}
            </span>
          </div>
          <input id="tf-temp-pm" type="range" min="0.2" max="2" step="0.05" value={v.tempVal} onChange={v.setTemp} style={{ width: "100%", height: "24px", margin: "0", accentColor: "#4E5A2E" }} />
        </div>
        <div style={{ padding: "8px 10px", borderRadius: "8px", background: "#FEFEFE", fontSize: "14px", lineHeight: "1.4" }}>
          {v.sentence}
          <span className="tf-cursor" style={{ display: "inline-block", width: "6px", height: "1em", marginLeft: "3px", verticalAlign: "-2px", background: "#BA9A91" }} />
        </div>
        <button type="button" onClick={v.onGenerate} style={{ height: "38px", border: "0", borderRadius: "999px", background: "#1C1C1C", color: "#FEFEFE", fontFamily: "var(--sans)", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
          {v.genLabel}
        </button>
      </div>
    </div>
  );
}

export default function ReasonPanel({ layout = 'desktop', ...props }) {
  const v = useDCLogic(Logic, { layout, ...props });
  return layout === 'mobile' ? <Mobile v={v} /> : <Desktop v={v} />;
}
