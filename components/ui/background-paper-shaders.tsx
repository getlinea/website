"use client"

import React, { useRef, useMemo, useEffect } from "react"
import { useThree } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"

const vertexShader = `
varying vec2 vUv;
void main() { 
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uContainerRes;
uniform float uProgress;
uniform vec3 uColor;
uniform float uGridSize;
varying vec2 vUv;

float random(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

vec2 getCoverUv(vec2 uv, vec2 imgRes, vec2 containerRes) {
    float containerAspect = containerRes.x / containerRes.y;
    float imageAspect = imgRes.x / imgRes.y;
    vec2 scale = vec2(
        min(containerAspect / imageAspect, 1.0),
        min(imageAspect / containerAspect, 1.0)
    );
    return vec2(
        (uv.x - 0.5) * scale.x + 0.5,
        (uv.y - 0.5) * scale.y + 0.5
    );
}

void main() {
    vec2 textureUv = getCoverUv(vUv, uResolution, uContainerRes);
    vec4 texColor = texture2D(uTexture, textureUv);
    
    float containerAspect = uContainerRes.x / uContainerRes.y;
    vec2 gridUv = vUv * vec2(uGridSize * containerAspect, uGridSize);
    vec2 cellId = floor(gridUv);
    
    // threshold goes from 1.2 (progress 0) to -0.2 (progress 1)
    float threshold = (1.0 - uProgress) * 1.4 - 0.2;
    float noise = random(cellId);
    
    // Reveal from top (y=1) to bottom (y=0)
    float isRevealed = step(threshold, vUv.y + (noise - 0.5) * 0.3);
    
    vec3 finalColor = mix(uColor, texColor.rgb, isRevealed);
    gl_FragColor = vec4(finalColor, 1.0);
}
`

export function GridRevealShader({ 
  imagePath, 
  color = "#000000",
  progress = 0 
}: { 
  imagePath: string, 
  color?: string,
  progress: number 
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const originalTexture = useTexture(imagePath)
  const { viewport, size } = useThree()

  const texture = useMemo(() => {
    if (originalTexture) {
      originalTexture.flipY = true
      originalTexture.needsUpdate = true
    }
    return originalTexture
  }, [originalTexture])

  const uniforms = useMemo(() => {
    const img = texture?.image as { width?: number; height?: number } | undefined
    return {
      uTexture: { value: texture },
      uResolution: { value: new THREE.Vector2(img?.width ?? 1024, img?.height ?? 1024) },
      uProgress: { value: progress },
      uColor: { value: new THREE.Color(color) },
      uContainerRes: { value: new THREE.Vector2(size.width, size.height) },
      uGridSize: { value: 30.0 }
    }
  }, [texture, color])

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = progress
      materialRef.current.uniforms.uContainerRes.value.set(size.width, size.height)
    }
  }, [progress, size.width, size.height])

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  )
}
