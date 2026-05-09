import { useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DottedMap from 'dotted-map';

const HQ = { lat: 29.69, lng: 76.99, label: 'Karnal HQ' };

const LOCATIONS = [
  { lat: 28.61, lng: 77.21, label: 'Delhi NCR',  anchor: 'start', ldx:  10, ldy:  14 },
  { lat: 30.73, lng: 76.78, label: 'Chandigarh', anchor: 'end',   ldx:  -9, ldy: -12 },
  { lat: 26.85, lng: 80.95, label: 'Lucknow',    anchor: 'start', ldx:   8, ldy:  -7 },
  { lat: 26.91, lng: 75.79, label: 'Jaipur',     anchor: 'end',   ldx:  -8, ldy:   8 },
  { lat: 19.07, lng: 72.87, label: 'Mumbai',     anchor: 'end',   ldx:  -8, ldy:   6 },
  { lat: 18.52, lng: 73.86, label: 'Pune',       anchor: 'start', ldx:   8, ldy:  11 },
  { lat: 23.02, lng: 72.57, label: 'Ahmedabad',  anchor: 'end',   ldx:  -8, ldy:  -1 },
  { lat: 12.97, lng: 77.59, label: 'Bangalore',  anchor: 'end',   ldx:  -8, ldy:   6 },
  { lat: 17.38, lng: 78.48, label: 'Hyderabad',  anchor: 'start', ldx:   8, ldy:  -6 },
  { lat: 22.57, lng: 88.36, label: 'Kolkata',    anchor: 'start', ldx:   8, ldy:  -6 },
  { lat: 13.08, lng: 80.27, label: 'Chennai',    anchor: 'start', ldx:   8, ldy:   6 },
  { lat: 21.25, lng: 81.63, label: 'Raipur',     anchor: 'start', ldx:   8, ldy:   8 },
  { lat: 23.25, lng: 77.41, label: 'Bhopal',     anchor: 'end',   ldx:  -8, ldy:  -6 },
  { lat: 25.20, lng: 55.27, label: 'Dubai',      anchor: 'end',   ldx:  -8, ldy:  -7 },
  { lat: 27.70, lng: 85.31, label: 'Kathmandu',  anchor: 'start', ldx:   8, ldy:  10 },
  { lat: 23.81, lng: 90.41, label: 'Dhaka',      anchor: 'start', ldx:   8, ldy:   6 },
  { lat:  6.93, lng: 79.84, label: 'Colombo',    anchor: 'start', ldx:   8, ldy:   9 },
  { lat: 24.69, lng: 46.72, label: 'Riyadh',     anchor: 'end',   ldx:  -8, ldy:   6 },
  { lat: 23.58, lng: 58.40, label: 'Muscat',     anchor: 'end',   ldx:  -8, ldy:  10 },
];

export const MAP_DOTS = LOCATIONS.map(loc => ({ start: HQ, end: loc }));

function projectPoint(lat, lng) {
  const x = (lng + 180) * (800 / 360);
  const y = (90 - lat) * (400 / 180);
  return { x, y };
}

function createCurvedPath(start, end) {
  const ddx  = end.x - start.x;
  const ddy  = end.y - start.y;
  const dist = Math.sqrt(ddx * ddx + ddy * ddy);
  const arcH = Math.max(14, dist * 0.40);
  const midX = (start.x + end.x) / 2 + ddx * 0.12;
  const midY = Math.min(start.y, end.y) - arcH;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
}

const VX = 462, VY = 100, VW = 180, VH = 90;

export function WorldMap({
  dots = MAP_DOTS,
  lineColor = '#e8521a',
  animationDuration = 1.5,
  loop = true,
}) {
  const svgRef = useRef(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);

  const map = useMemo(() => new DottedMap({ height: 100, grid: 'diagonal' }), []);

  const svgMapDataUrl = useMemo(() => {
    const svg = map.getSVG({
      radius: 0.22,
      color: '#0D1B2A2E',
      shape: 'circle',
      backgroundColor: 'transparent',
    });
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }, [map]);

  const staggerDelay  = 0.30;
  const totalAnimTime = dots.length * staggerDelay + animationDuration;
  const fullCycle     = totalAnimTime + 2.0;

  const hqPt = projectPoint(HQ.lat, HQ.lng);

  // Pre-compute arc points for gradient definitions
  const arcPoints = useMemo(() =>
    dots.map(dot => ({
      sp: projectPoint(dot.start.lat, dot.start.lng),
      ep: projectPoint(dot.end.lat,   dot.end.lng),
    })),
  [dots]);

  return (
    <div style={{
      width: '100%', aspectRatio: '2 / 1',
      position: 'relative', overflow: 'hidden', borderRadius: '4px',
    }}>
      {/* Left/right edge fades */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '20%',
        background: 'linear-gradient(to right, rgba(247,244,239,0.97) 0%, rgba(247,244,239,0.6) 55%, transparent 100%)',
        pointerEvents: 'none', zIndex: 4,
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '20%',
        background: 'linear-gradient(to left, rgba(247,244,239,0.97) 0%, rgba(247,244,239,0.6) 55%, transparent 100%)',
        pointerEvents: 'none', zIndex: 4,
      }} />

      <svg
        ref={svgRef}
        viewBox={`${VX} ${VY} ${VW} ${VH}`}
        style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 2 }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Top/bottom fade mask */}
          <linearGradient
            id="gm-bg-fade"
            x1="0" y1={VY} x2="0" y2={VY + VH}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%"   stopColor="white" stopOpacity="0" />
            <stop offset="14%"  stopColor="white" stopOpacity="1" />
            <stop offset="86%"  stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="gm-bg-mask">
            <rect x="0" y="0" width="800" height="400" fill="url(#gm-bg-fade)" />
          </mask>

          {/* Per-arc directional gradients — each follows its own Karnal→city direction */}
          {arcPoints.map(({ sp, ep }, i) => (
            <linearGradient
              key={`grad-${i}`}
              id={`gm-arc-grad-${i}`}
              x1={sp.x} y1={sp.y}
              x2={ep.x} y2={ep.y}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%"   stopColor={lineColor} stopOpacity="0"   />
              <stop offset="10%"  stopColor={lineColor} stopOpacity="0.85" />
              <stop offset="90%"  stopColor={lineColor} stopOpacity="0.85" />
              <stop offset="100%" stopColor={lineColor} stopOpacity="0"   />
            </linearGradient>
          ))}

          <filter id="gm-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Dotted world map */}
        <image
          href={svgMapDataUrl}
          x="0" y="0" width="800" height="400"
          mask="url(#gm-bg-mask)"
          style={{ pointerEvents: 'none' }}
        />

        {/* Animated flight arcs */}
        {dots.map((dot, i) => {
          const { sp, ep } = arcPoints[i];
          const pathD = createCurvedPath(sp, ep);
          const t0 = (i * staggerDelay) / fullCycle;
          const t1 = (i * staggerDelay + animationDuration) / fullCycle;
          const tr = totalAnimTime / fullCycle;

          return (
            <g key={`arc-${i}`}>
              <motion.path
                d={pathD}
                fill="none"
                stroke={`url(#gm-arc-grad-${i})`}
                strokeWidth="0.65"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: loop ? [0, 0, 1, 1, 0] : 1 }}
                transition={loop ? {
                  duration: fullCycle, times: [0, t0, t1, tr, 1],
                  ease: 'easeInOut', repeat: Infinity,
                } : { duration: animationDuration, delay: i * staggerDelay, ease: 'easeInOut' }}
              />
              {loop && (
                <circle r="1.4" fill={lineColor} filter="url(#gm-glow)">
                  <animateMotion
                    dur={`${fullCycle}s`}
                    repeatCount="indefinite"
                    calcMode="spline"
                    keyTimes={`0;${t0.toFixed(5)};${t1.toFixed(5)};1`}
                    keyPoints="0;0;1;1"
                    keySplines="0 0 1 1;0.42 0 0.58 1;0 0 1 1"
                    path={pathD}
                  />
                  <animate
                    attributeName="opacity"
                    dur={`${fullCycle}s`}
                    repeatCount="indefinite"
                    calcMode="linear"
                    keyTimes={`0;${t0.toFixed(5)};${Math.min(t0 + 0.008, t1).toFixed(5)};${Math.max(t1 - 0.008, t0).toFixed(5)};${t1.toFixed(5)};1`}
                    values="0;0;1;1;0;0"
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* Karnal HQ — origin marker */}
        <g>
          {/* Outer pulse ring — starts beyond the filled dot so it doesn't overlap */}
          <circle cx={hqPt.x} cy={hqPt.y} r="4.5" fill="none" stroke={lineColor} strokeWidth="0.8" opacity="0.6">
            <animate attributeName="r"       from="4.5" to="14"  dur="2.2s" begin="0s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.6"  to="0"   dur="2.2s" begin="0s" repeatCount="indefinite" />
          </circle>
          {/* Filled dot */}
          <circle cx={hqPt.x} cy={hqPt.y} r="3.5" fill={lineColor} filter="url(#gm-glow)" />
          {/* White centre pip */}
          <circle cx={hqPt.x} cy={hqPt.y} r="1.2" fill="white" />
          <motion.text
            x={hqPt.x + 5} y={hqPt.y - 6}
            fontSize="4.5" fontWeight="700"
            fill="#0D1B2A"
            textAnchor="start"
            style={{ pointerEvents: 'none', fontFamily: 'Inter, sans-serif' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Karnal HQ
          </motion.text>
        </g>

        {/* Destination dots + labels */}
        {dots.map((dot, i) => {
          const ep  = arcPoints[i].ep;
          const loc = LOCATIONS[i];

          return (
            <g key={`dest-${i}`}>
              <motion.g
                onHoverStart={() => setHoveredLocation(dot.end.label)}
                onHoverEnd={() => setHoveredLocation(null)}
                whileHover={{ scale: 1.5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                style={{ cursor: 'pointer' }}
              >
                {/* Pulse ring — separate from the filled dot so pulse is clearly outside */}
                <circle cx={ep.x} cy={ep.y} r="3" fill="none" stroke={lineColor} strokeWidth="0.5" opacity="0">
                  <animate attributeName="r"       from="3"   to="7"   dur="3s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0"   dur="3s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
                </circle>
                {/* Filled dot */}
                <circle cx={ep.x} cy={ep.y} r="2"   fill={lineColor} filter="url(#gm-glow)" />
                {/* White centre pip */}
                <circle cx={ep.x} cy={ep.y} r="0.7" fill="white" />
              </motion.g>

              <motion.text
                x={ep.x + loc.ldx}
                y={ep.y + loc.ldy}
                fontSize="4"
                fontWeight="500"
                textAnchor={loc.anchor}
                fill="rgba(13,27,42,0.72)"
                style={{ pointerEvents: 'none', fontFamily: 'Inter, sans-serif' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.06, duration: 0.5 }}
              >
                {dot.end.label}
              </motion.text>
            </g>
          );
        })}
      </svg>

      {/* Hover tooltip */}
      <AnimatePresence>
        {hoveredLocation && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            style={{
              position: 'absolute', bottom: '1rem', left: '1rem',
              background: 'rgba(13,27,42,0.88)', color: 'white',
              padding: '6px 12px', borderRadius: '6px',
              fontSize: '0.78rem', fontWeight: 500,
              border: '1px solid rgba(232,82,26,0.35)',
              backdropFilter: 'blur(8px)', zIndex: 10,
            }}
          >
            {hoveredLocation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
