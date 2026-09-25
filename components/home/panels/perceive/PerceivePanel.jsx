'use client';

// v.setVideo is a callback ref returned by renderVals(); the lint mistakes `v` for a ref object.
/* eslint-disable react-hooks/refs */
// Templates converted from design-handoff/design/PerceivePanel.dc.html and PerceivePanelMobile.dc.html.
import { Fragment } from 'react';
import { useDCLogic } from '../../dc/useDCLogic';
import Logic from './logic';
import '../panels.css';

function Desktop({ v }) {
  return (
    <div style={{ width: "100%", height: "100%", boxSizing: "border-box", background: "#EDECEC", display: "flex", overflow: "hidden" }}>
      <figure style={{ margin: "0", position: "relative", width: `${v.vidW}px`, height: "100%", flexShrink: "0", overflow: "hidden", background: "#1C1C1C" }}>
        <video src="/assets/turtle-views.mp4" ref={v.setVideo} muted autoPlay={!v.reduced} loop playsInline aria-label="A sea turtle swimming over a reef with two divers behind it, shown as raw video, a segmentation map or a depth map" style={{ position: "absolute", left: `${v.viewLeft}px`, top: "0", width: `${v.vidAllW}px`, height: `${v.vidH}px`, maxWidth: "none", display: "block", transition: "left 0ms" }} />
        {v.showBoxes && (
          <>
            <div style={{ position: "absolute", left: `${v.turtle.l}px`, top: `${v.turtle.t}px`, width: `${v.turtle.w}px`, height: `${v.turtle.h}px`, boxSizing: "border-box", border: "2px solid #BA9A91", borderRadius: "6px" }}>
              <span style={{ position: "absolute", left: "-2px", top: "-21px", padding: "2px 6px", borderRadius: "4px 4px 4px 0", background: "#BA9A91", color: "#1C1C1C", fontFamily: "var(--mono)", fontSize: "11px", fontWeight: "500", whiteSpace: "nowrap" }}>
                sea_turtle {v.tConf}
              </span>
            </div>
            <div style={{ position: "absolute", left: `${v.d1.l}px`, top: `${v.d1.t}px`, width: `${v.d1.w}px`, height: `${v.d1.h}px`, boxSizing: "border-box", border: "2px solid #FEFEFE", borderRadius: "6px" }}>
              <span style={{ position: "absolute", left: "-2px", top: "-21px", padding: "2px 6px", borderRadius: "4px 4px 4px 0", background: "#FEFEFE", color: "#1C1C1C", fontFamily: "var(--mono)", fontSize: "11px", fontWeight: "500", whiteSpace: "nowrap" }}>
                diver {v.d1Conf}
              </span>
            </div>
            <div style={{ position: "absolute", left: `${v.d2.l}px`, top: `${v.d2.t}px`, width: `${v.d2.w}px`, height: `${v.d2.h}px`, boxSizing: "border-box", border: "2px solid #FEFEFE", borderRadius: "6px" }}>
              <span style={{ position: "absolute", left: "-2px", top: "-21px", padding: "2px 6px", borderRadius: "4px 4px 4px 0", background: "#FEFEFE", color: "#1C1C1C", fontFamily: "var(--mono)", fontSize: "11px", fontWeight: "500", whiteSpace: "nowrap" }}>
                diver {v.d2Conf}
              </span>
            </div>
          </>
        )}
        <div style={{ position: "absolute", left: "12px", top: "12px", display: "flex", alignItems: "center", gap: "8px", height: "26px", padding: "0 10px", borderRadius: "6px", background: "rgba(254, 254, 254, 0.92)", fontFamily: "var(--mono)", fontSize: "10px", color: "#1C1C1C" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "3px", background: "#C8372D" }} />
          LIVE · frame {v.frame}/358
        </div>
      </figure>
      <div style={{ flexGrow: "1", boxSizing: "border-box", padding: "28px 32px", display: "flex", flexDirection: "column", gap: "18px", minWidth: "0" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <span style={{ fontFamily: "var(--sans)", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#4E5A2E" }}>
            What the model sees
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div role="group" aria-label="Camera view" style={{ display: "inline-flex", gap: "2px", padding: "3px", borderRadius: "999px", background: "#FEFEFE", border: "1px solid #CCCCCC" }}>
              {v.views.map((v, v_i) => (
                <Fragment key={v_i}>
                  <button type="button" onClick={v.pick} aria-pressed={v.pressed} style={{ height: "36px", padding: "0 14px", border: "0", borderRadius: "999px", background: v.bg, color: v.fg, fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: "0.06em", cursor: "pointer", transition: "background 200ms ease, color 200ms ease" }}>
                    {v.label}
                  </button>
                </Fragment>
              ))}
            </div>
            <button type="button" onClick={v.toggle} aria-pressed={v.pressed} style={{ height: "34px", padding: "0 14px", borderRadius: "999px", border: "1px solid #CCCCCC", background: "#FEFEFE", color: "#1C1C1C", fontFamily: "var(--mono)", fontSize: "11px", cursor: "pointer" }}>
              boxes · {v.boxTxt}
            </button>
          </div>
          {v.showSeg && (
            <>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", fontFamily: "var(--mono)", fontSize: "11px", color: "#4A4A4A" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#DDE5D3" }} />
                  water
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#B7C396" }} />
                  reef
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#BA9A91" }} />
                  turtle
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#3A3A3A" }} />
                  diver
                </span>
              </div>
            </>
          )}
          {v.showDepth && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--mono)", fontSize: "11px", color: "#4A4A4A" }}>
                near
                <span style={{ width: "120px", height: "8px", borderRadius: "4px", background: "linear-gradient(90deg, #FCFDBF, #FC8961, #B73779, #51127C, #000004)" }} />
                far · relative
              </div>
            </>
          )}
          {v.showRgb && (
            <>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", fontFamily: "var(--mono)", fontSize: "11px", color: "#4A4A4A" }}>
                <span>
                  sea_turtle {v.tConf}
                </span>
                <span>
                  diver {v.d1Conf}
                </span>
                <span>
                  diver {v.d2Conf}
                </span>
              </div>
            </>
          )}
        </div>
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "10px", padding: "20px 22px", borderRadius: "16px", background: "#FEFEFE", minHeight: "172px", boxSizing: "border-box" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.08em", color: "#555555" }}>
            <span>
              VLM · {v.capMode}{" "}
              <span style={{ color: "#9A9A9A" }}>
                → {v.capWhat}
              </span>
            </span>
            <span>
              {v.capTime}
            </span>
          </div>
          <p style={{ margin: "0", fontFamily: "var(--sans)", fontSize: "22px", lineHeight: "1.5", color: "#1C1C1C" }}>
            {v.capToks.map((k, k_i) => (
              <Fragment key={k_i}>
                <span style={{ background: k.bg, color: k.fg, padding: `1px ${k.pad}px`, borderRadius: "4px", fontWeight: k.w, WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" }}>
                  {k.t}
                </span>
              </Fragment>
            ))}
            <span className="m-cursor" style={{ display: "inline-block", width: "2px", height: "1em", marginLeft: "2px", verticalAlign: "-2px", background: "#1C1C1C" }} />
          </p>
        </div>
        <span style={{ fontFamily: "var(--mono)", fontSize: "10px", lineHeight: "1.5", color: "#767676" }}>
          tracking, segmentation & depth computed on my own dive clip · captions written from the measured maps
        </span>
      </div>
    </div>
  );
}

function Mobile({ v }) {
  return (
    <div style={{ width: "100%", boxSizing: "border-box", background: "#EDECEC", display: "flex", flexDirection: "column", gap: "12px", padding: "12px", overflow: "hidden" }}>
      <div style={{ display: "flex", gap: "12px" }}>
        <div style={{ borderRadius: "10px", overflow: "hidden", flexShrink: "0" }}>
          <figure style={{ margin: "0", position: "relative", width: `${v.vidW}px`, height: `${v.vidH}px`, flexShrink: "0", overflow: "hidden", background: "#1C1C1C" }}>
            <video src="/assets/turtle-views.mp4" ref={v.setVideo} muted autoPlay={!v.reduced} loop playsInline aria-label="A sea turtle swimming over a reef with two divers behind it, shown as raw video, a segmentation map or a depth map" style={{ position: "absolute", left: `${v.viewLeft}px`, top: "0", width: `${v.vidAllW}px`, height: `${v.vidH}px`, maxWidth: "none", display: "block", transition: "left 0ms" }} />
            {v.showBoxes && (
              <>
                <div style={{ position: "absolute", left: `${v.turtle.l}px`, top: `${v.turtle.t}px`, width: `${v.turtle.w}px`, height: `${v.turtle.h}px`, boxSizing: "border-box", border: "2px solid #BA9A91", borderRadius: "6px" }}>
                  <span style={{ position: "absolute", left: "-2px", top: "-19px", padding: "2px 6px", borderRadius: "4px 4px 4px 0", background: "#BA9A91", color: "#1C1C1C", fontFamily: "var(--mono)", fontSize: "9px", fontWeight: "500", whiteSpace: "nowrap" }}>
                    sea_turtle {v.tConf}
                  </span>
                </div>
                <div style={{ position: "absolute", left: `${v.d1.l}px`, top: `${v.d1.t}px`, width: `${v.d1.w}px`, height: `${v.d1.h}px`, boxSizing: "border-box", border: "2px solid #FEFEFE", borderRadius: "6px" }}>
                  <span style={{ position: "absolute", left: "-2px", top: "-19px", padding: "2px 6px", borderRadius: "4px 4px 4px 0", background: "#FEFEFE", color: "#1C1C1C", fontFamily: "var(--mono)", fontSize: "9px", fontWeight: "500", whiteSpace: "nowrap" }}>
                    diver {v.d1Conf}
                  </span>
                </div>
                <div style={{ position: "absolute", left: `${v.d2.l}px`, top: `${v.d2.t}px`, width: `${v.d2.w}px`, height: `${v.d2.h}px`, boxSizing: "border-box", border: "2px solid #FEFEFE", borderRadius: "6px" }}>
                  <span style={{ position: "absolute", left: "-2px", top: "-19px", padding: "2px 6px", borderRadius: "4px 4px 4px 0", background: "#FEFEFE", color: "#1C1C1C", fontFamily: "var(--mono)", fontSize: "9px", fontWeight: "500", whiteSpace: "nowrap" }}>
                    diver {v.d2Conf}
                  </span>
                </div>
              </>
            )}
            <div style={{ position: "absolute", left: "8px", top: "8px", display: "flex", alignItems: "center", gap: "6px", height: "22px", padding: "0 8px", borderRadius: "6px", background: "rgba(254, 254, 254, 0.92)", fontFamily: "var(--mono)", fontSize: "9px", color: "#1C1C1C" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "3px", background: "#C8372D" }} />
              LIVE · frame {v.frame}/358
            </div>
          </figure>
        </div>
        <div style={{ flexGrow: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "12px" }}>
          <span style={{ fontFamily: "var(--sans)", fontWeight: "700", fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#4E5A2E" }}>
            What the model sees
          </span>
          <div role="group" aria-label="Camera view" style={{ display: "flex", flexDirection: "column", gap: "2px", padding: "3px", borderRadius: "18px", background: "#FEFEFE", border: "1px solid #CCCCCC" }}>
            {v.views.map((v, v_i) => (
              <Fragment key={v_i}>
                <button type="button" onClick={v.pick} aria-pressed={v.pressed} style={{ height: "32px", padding: "0 14px", border: "0", borderRadius: "999px", background: v.bg, color: v.fg, fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.06em", cursor: "pointer", transition: "background 200ms ease, color 200ms ease" }}>
                  {v.label}
                </button>
              </Fragment>
            ))}
          </div>
          <button type="button" onClick={v.toggle} aria-pressed={v.pressed} style={{ height: "34px", padding: "0 14px", borderRadius: "999px", border: "1px solid #CCCCCC", background: "#FEFEFE", color: "#1C1C1C", fontFamily: "var(--mono)", fontSize: "11px", cursor: "pointer" }}>
            boxes · {v.boxTxt}
          </button>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {v.showSeg && (
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "var(--mono)", fontSize: "10px", color: "#4A4A4A" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#DDE5D3" }} />
                    water
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#B7C396" }} />
                    reef
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#BA9A91" }} />
                    turtle
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#3A3A3A" }} />
                    diver
                  </span>
                </div>
              </>
            )}
            {v.showDepth && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--mono)", fontSize: "10px", color: "#4A4A4A" }}>
                  near
                  <span style={{ width: "60px", height: "8px", borderRadius: "4px", background: "linear-gradient(90deg, #FCFDBF, #FC8961, #B73779, #51127C, #000004)" }} />
                  far · relative
                </div>
              </>
            )}
            {v.showRgb && (
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "var(--mono)", fontSize: "10px", color: "#4A4A4A" }}>
                  <span>
                    sea_turtle {v.tConf}
                  </span>
                  <span>
                    diver {v.d1Conf}
                  </span>
                  <span>
                    diver {v.d2Conf}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div style={{ flexGrow: "1", minHeight: "132px", display: "flex", flexDirection: "column", gap: "6px", padding: "12px 14px", borderRadius: "12px", background: "#FEFEFE", boxSizing: "border-box" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.08em", color: "#555555" }}>
          <span>
            VLM · {v.capMode}{" "}
            <span style={{ color: "#9A9A9A" }}>
              → {v.capWhat}
            </span>
          </span>
          <span>
            {v.capTime}
          </span>
        </div>
        <p style={{ margin: "0", fontFamily: "var(--sans)", fontSize: "15px", lineHeight: "1.55", color: "#1C1C1C" }}>
          {v.capToks.map((k, k_i) => (
            <Fragment key={k_i}>
              <span style={{ background: k.bg, color: k.fg, padding: `1px ${k.pad}px`, borderRadius: "4px", fontWeight: k.w, WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" }}>
                {k.t}
              </span>
            </Fragment>
          ))}
          <span className="m-cursor" style={{ display: "inline-block", width: "2px", height: "1em", marginLeft: "2px", verticalAlign: "-2px", background: "#1C1C1C" }} />
        </p>
      </div>
      <span style={{ fontFamily: "var(--mono)", fontSize: "10px", lineHeight: "1.5", color: "#767676" }}>
        tracking, segmentation & depth computed on my own dive clip · captions written from the measured maps
      </span>
    </div>
  );
}

// size = the panel's measured box. Desktop: the clip fills the height. Mobile: the clip takes
// roughly half the width (kept between 150–260px wide) and the controls get the rest.
function videoHeight(layout, size) {
  if (!size) return layout === 'mobile' ? 360 : 600;
  if (layout !== 'mobile') return Math.round(size.h);
  const w = Math.max(150, Math.min(260, Math.round((size.w - 36) * 0.56)));
  return Math.round((w * 600) / 337);
}

export default function PerceivePanel({ layout = 'desktop', size, ...props }) {
  const v = useDCLogic(Logic, { layout, vidH: videoHeight(layout, size), ...props });
  return layout === 'mobile' ? <Mobile v={v} /> : <Desktop v={v} />;
}
