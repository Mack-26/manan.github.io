'use client';

import { useEffect, useReducer, useState } from 'react';

// The design prototypes (design-handoff/design/*.dc.html) express each demo as a
// React-class-like "DCLogic" object: `state`, synchronous `setState`, lifecycle hooks
// and a `renderVals()` that returns everything the template reads. This shim lets
// those classes run unchanged inside a function component.
export class DCLogic {
  constructor(props) {
    this.props = props || {};
    this.state = {};
    this._notify = null;
  }

  setState(patch) {
    this.state = { ...this.state, ...patch };
    if (this._notify) this._notify();
  }
}

// The instance is a mutable external store (like a class component's `this`), so the
// React Compiler immutability rule doesn't apply; this project doesn't enable the compiler.
/* eslint-disable react-hooks/immutability */
export function useDCLogic(Logic, props) {
  // One long-lived logic instance per mounted panel (it owns timers and simulation state).
  const [inst] = useState(() => new Logic(props));
  const [, rerender] = useReducer((n) => (n + 1) % 1e9, 0);
  // renderVals() reads this.props, so they must be current during render.
  inst.props = props;

  useEffect(() => {
    inst._notify = rerender;
    inst.componentDidMount?.();
    return () => {
      inst._notify = null;
      inst.componentWillUnmount?.();
    };
  }, [inst]);

  return inst.renderVals();
}
