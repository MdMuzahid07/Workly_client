/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import countries from '@/data/globe.json';
import { OrbitControls } from '@react-three/drei';
import { Canvas, extend, useThree } from '@react-three/fiber';
import { useEffect, useRef, useMemo, memo, useCallback } from 'react';
import { Color, Fog, PerspectiveCamera, Scene, Vector3, Group } from 'three';
import ThreeGlobe from 'three-globe';

declare module '@react-three/fiber' {
  interface ThreeElements {
    threeGlobe: ThreeElements['mesh'] & {
      new (): ThreeGlobe;
    };
  }
}

extend({ ThreeGlobe: ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

// Pre-computed, stable light position vectors (avoids new Vector3() on every render)
const DIRECTIONAL_LEFT_POS = new Vector3(-400, 100, 400);
const DIRECTIONAL_TOP_POS = new Vector3(-200, 500, 200);
const POINT_LIGHT_POS = new Vector3(-200, 500, 200);

// Stable arc stroke values (avoids allocation per-arc)
const ARC_STROKES = [0.32, 0.28, 0.3] as const;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

// Stable accessor functions (avoids re-creating closures causing three-globe to rebuild geometry)
const arcStartLat = (d: any) => (d as { startLat: number }).startLat;
const arcStartLng = (d: any) => (d as { startLng: number }).startLng;
const arcEndLat = (d: any) => (d as { endLat: number }).endLat;
const arcEndLng = (d: any) => (d as { endLng: number }).endLng;
const arcColor = (e: any) => (e as { color: string }).color;
const arcAltitude = (e: any) => (e as { arcAlt: number }).arcAlt;
const arcStroke = () => ARC_STROKES[Math.round(Math.random() * 2)];
const arcDashInitialGap = (e: any) => (e as { order: number }).order;
const pointColor = (e: any) => (e as { color: string }).color;

export const Globe = memo(function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef<Group>(null);

  // Memoize merged config to avoid re-creating on every render
  const config = useMemo(
    () => ({
      pointSize: 1,
      atmosphereColor: '#ffffff',
      showAtmosphere: true,
      atmosphereAltitude: 0.1,
      polygonColor: 'rgba(255,255,255,0.7)',
      globeColor: '#969696',
      emissive: '#5CFF98',
      emissiveIntensity: 0.1,
      shininess: 0.9,
      arcTime: 2000,
      arcLength: 0.9,
      rings: 1,
      maxRings: 3,
      ...globeConfig,
    }),
    [globeConfig],
  );

  // Pre-compute deduplicated points from data (O(n) with Set instead of O(n²) with findIndex)
  const filteredPoints = useMemo(() => {
    if (!data) return [];
    const seen = new Set<string>();
    const points: {
      size: number;
      order: number;
      color: string;
      lat: number;
      lng: number;
    }[] = [];

    for (let i = 0; i < data.length; i++) {
      const arc = data[i];
      const startKey = `${arc.startLat}:${arc.startLng}`;
      const endKey = `${arc.endLat}:${arc.endLng}`;

      if (!seen.has(startKey)) {
        seen.add(startKey);
        points.push({
          size: config.pointSize,
          order: arc.order,
          color: arc.color,
          lat: arc.startLat,
          lng: arc.startLng,
        });
      }

      if (!seen.has(endKey)) {
        seen.add(endKey);
        points.push({
          size: config.pointSize,
          order: arc.order,
          color: arc.color,
          lat: arc.endLat,
          lng: arc.endLng,
        });
      }
    }

    return points;
  }, [data, config.pointSize]);

  // Stable polygon color accessor (depends on config value)
  const polygonColorFn = useCallback(() => config.polygonColor, [config.polygonColor]);
  const arcTimeFn = useCallback(() => config.arcTime, [config.arcTime]);

  // Initialize globe only once, with cleanup to prevent GPU memory leaks
  useEffect(() => {
    if (globeRef.current || !groupRef.current) return;

    const group = groupRef.current;
    const globe = new ThreeGlobe();
    globeRef.current = globe;
    group.add(globe);

    // Force a single re-render to trigger data-building effects
    // We use a microtask to batch with React's scheduler
    return () => {
      if (group && globeRef.current) {
        group.remove(globeRef.current);
      }
      // Dispose three-globe internal geometries and materials
      if (globeRef.current) {
        const g = globeRef.current;
        g.arcsData([]);
        g.pointsData([]);
        g.ringsData([]);
        g.hexPolygonsData([]);
      }
      globeRef.current = null;
    };
  }, []);

  // Build material — only when material-related config values change
  useEffect(() => {
    if (!globeRef.current) return;

    const globeMaterial = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };
    globeMaterial.color = new Color(config.globeColor);
    globeMaterial.emissive = new Color(config.emissive);
    globeMaterial.emissiveIntensity = config.emissiveIntensity;
    globeMaterial.shininess = config.shininess;
  }, [config.globeColor, config.emissive, config.emissiveIntensity, config.shininess]);

  // Build globe data — only when data or relevant config values change
  useEffect(() => {
    if (!globeRef.current || !data) return;

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(config.showAtmosphere)
      .atmosphereColor(config.atmosphereColor)
      .atmosphereAltitude(config.atmosphereAltitude)
      .hexPolygonColor(polygonColorFn);

    globeRef.current
      .arcsData(data)
      .arcStartLat(arcStartLat)
      .arcStartLng(arcStartLng)
      .arcEndLat(arcEndLat)
      .arcEndLng(arcEndLng)
      .arcColor(arcColor)
      .arcAltitude(arcAltitude)
      .arcStroke(arcStroke)
      .arcDashLength(config.arcLength)
      .arcDashInitialGap(arcDashInitialGap)
      .arcDashGap(15)
      .arcDashAnimateTime(arcTimeFn);

    globeRef.current
      .pointsData(filteredPoints)
      .pointColor(pointColor)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);

    globeRef.current
      .ringsData([])
      .ringColor(polygonColorFn)
      .ringMaxRadius(config.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod((config.arcTime * config.arcLength) / config.rings);
  }, [
    data,
    filteredPoints,
    config.showAtmosphere,
    config.atmosphereColor,
    config.atmosphereAltitude,
    config.arcLength,
    config.arcTime,
    config.rings,
    config.maxRings,
    polygonColorFn,
    arcTimeFn,
  ]);

  // Handle rings animation with cleanup
  useEffect(() => {
    if (!globeRef.current || !data || data.length === 0) return;

    const interval = setInterval(() => {
      if (!globeRef.current) return;

      const ringIndices = genRandomNumbers(0, data.length, Math.floor((data.length * 4) / 5));

      const ringsData = data
        .filter((_, i) => ringIndices.has(i))
        .map((d) => ({
          lat: d.startLat,
          lng: d.startLng,
          color: d.color,
        }));

      globeRef.current.ringsData(ringsData);
    }, 2000);

    return () => clearInterval(interval);
  }, [data]);

  return <group ref={groupRef} />;
});

export function WebGLRendererConfig() {
  const { gl } = useThree();

  useEffect(() => {
    // Cap pixel ratio at 2 — 3x/4x screens render 9-16x pixels for negligible visual gain
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1;
    gl.setPixelRatio(dpr);
    gl.setClearColor(0xffaaff, 0);
  }, [gl]);

  return null;
}

export const World = memo(function World(props: WorldProps) {
  const { globeConfig } = props;

  const scene = useMemo(() => {
    const s = new Scene();
    s.fog = new Fog(0xffffff, 400, 2000);
    return s;
  }, []);

  const camera = useMemo(() => {
    return new PerspectiveCamera(50, aspect, 180, 1800);
  }, []);

  return (
    <Canvas scene={scene} camera={camera} frameloop="demand">
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight color={globeConfig.directionalLeftLight} position={DIRECTIONAL_LEFT_POS} />
      <directionalLight color={globeConfig.directionalTopLight} position={DIRECTIONAL_TOP_POS} />
      <pointLight color={globeConfig.pointLight} position={POINT_LIGHT_POS} intensity={0.8} />
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotateSpeed={1}
        autoRotate={true}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
});

export function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Generate `count` unique random integers in [min, max).
 * Uses a Set for O(1) membership checks instead of Array.indexOf O(n).
 */
export function genRandomNumbers(min: number, max: number, count: number): Set<number> {
  const set = new Set<number>();
  // Guard against impossible requests (avoids infinite loop)
  const maxPossible = max - min;
  const safeCount = Math.min(count, maxPossible);
  while (set.size < safeCount) {
    set.add(Math.floor(Math.random() * (max - min)) + min);
  }
  return set;
}
