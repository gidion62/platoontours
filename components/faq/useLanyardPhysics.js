'use client';

import { useRef } from 'react';

/**
 * Small spring-physics "pendulum card" — a swing-and-settle interaction
 * standing in for React Bits' Lanyard component, which needs a full React
 * Three Fiber + Rapier (WASM rope physics) + GLB model stack with no
 * equivalent here. Ported as-is: drag the card to swing it, release to let
 * it spring back to rest via requestAnimationFrame.
 *
 * Returns { cardRef, settleIn, reset } — attach cardRef to the card element,
 * call settleIn() when its FAQ answer opens and reset() when it closes.
 */
export default function useLanyardPhysics() {
  const cardRef = useRef(null);
  const stateRef = useRef({ angle: 0, velocity: 0, dragging: false, dragStartX: 0, lastX: 0, lastT: 0, rafId: null, bound: false });

  function bind() {
    const cardEl = cardRef.current;
    const st = stateRef.current;
    if (!cardEl || st.bound) return;
    st.bound = true;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function render() {
      cardEl.style.transform = `rotate(${st.angle}deg)`;
    }

    function physicsStep() {
      if (!st.dragging) {
        const stiffness = 0.012;
        const damping = 0.92;
        st.velocity += -st.angle * stiffness;
        st.velocity *= damping;
        st.angle += st.velocity;
        render();
        if (Math.abs(st.angle) > 0.02 || Math.abs(st.velocity) > 0.02) {
          st.rafId = requestAnimationFrame(physicsStep);
        } else {
          st.angle = 0;
          st.velocity = 0;
          render();
          st.rafId = null;
        }
      }
    }

    function onPointerDown(e) {
      if (reduce) return;
      st.dragging = true;
      cardEl.classList.add('dragging');
      st.dragStartX = e.clientX;
      st.lastX = e.clientX;
      st.lastT = performance.now();
      if (st.rafId) cancelAnimationFrame(st.rafId);
      cardEl.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e) {
      if (!st.dragging) return;
      const dx = e.clientX - st.dragStartX;
      st.angle = Math.max(-30, Math.min(30, dx * 0.16));
      render();
      const now = performance.now();
      const dt = now - st.lastT;
      if (dt > 0) {
        st.velocity = ((e.clientX - st.lastX) / dt) * 6;
        st.lastX = e.clientX;
        st.lastT = now;
      }
    }
    function onPointerUp() {
      if (!st.dragging) return;
      st.dragging = false;
      cardEl.classList.remove('dragging');
      st.rafId = requestAnimationFrame(physicsStep);
    }

    cardEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    st.physicsStep = physicsStep;
    st.render = render;
    st.reduce = reduce;
  }

  function settleIn() {
    bind();
    const cardEl = cardRef.current;
    const st = stateRef.current;
    if (!cardEl) return;
    st.angle = -5;
    st.velocity = 0;
    st.render && st.render();
    if (!st.reduce) st.rafId = requestAnimationFrame(st.physicsStep);
  }

  function reset() {
    const st = stateRef.current;
    if (st.rafId) cancelAnimationFrame(st.rafId);
    st.angle = 0;
    st.velocity = 0;
    st.render && st.render();
  }

  return { cardRef, settleIn, reset };
}
