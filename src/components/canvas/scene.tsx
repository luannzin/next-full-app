"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Sphere, Box, Torus } from "@react-three/drei";
import { motion } from "motion/react";
import { useRef } from "react";
import type * as THREE from "three";

function FloatingGeometry({
	position,
	geometry,
}: {
	position: [number, number, number];
	geometry: "sphere" | "box" | "torus";
}) {
	const meshRef = useRef<THREE.Mesh>(null);

	const GeometryComponent =
		geometry === "sphere" ? Sphere : geometry === "box" ? Box : Torus;

	return (
		<Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
			<GeometryComponent
				ref={meshRef}
				position={position}
				args={geometry === "torus" ? [0.3, 0.1, 16, 32] : [0.5, 0.5, 0.5]}
			>
				<meshStandardMaterial
					color="#fafafa"
					transparent
					opacity={0.05}
					emissive="#fafafa"
					emissiveIntensity={0.02}
					roughness={0.7}
					metalness={0.1}
				/>
			</GeometryComponent>
		</Float>
	);
}

function Scene() {
	return (
		<Canvas
			camera={{
				position: [0, 0, 10],
				fov: 60,
				near: 0.1,
				far: 1000,
			}}
			dpr={[1, 2]}
			performance={{ min: 0.5 }}
		>
			{/* Ambient lighting for soft illumination */}
			<ambientLight intensity={0.3} color="#fafafa" />

			{/* Directional light for depth */}
			<directionalLight position={[5, 5, 5]} intensity={0.5} color="#fafafa" />

			{/* Point light for subtle highlights */}
			<pointLight position={[-5, 5, 5]} intensity={0.3} color="#a1a1aa" />

			{/* Floating geometric shapes */}
			<FloatingGeometry position={[-4, 2, -2]} geometry="sphere" />
			<FloatingGeometry position={[4, -1, -3]} geometry="box" />
			<FloatingGeometry position={[-2, -3, -1]} geometry="torus" />
			<FloatingGeometry position={[3, 3, -4]} geometry="sphere" />
			<FloatingGeometry position={[-1, 1, -5]} geometry="box" />
			<FloatingGeometry position={[2, -2, -2]} geometry="torus" />
			<FloatingGeometry position={[-3, 0, -3]} geometry="sphere" />
			<FloatingGeometry position={[1, 4, -1]} geometry="box" />
		</Canvas>
	);
}

export default function Scene3D() {
	return (
		<motion.div
			className="fixed inset-0 w-full h-full -z-10"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 2, ease: "easeOut" }}
		>
			<Scene />
		</motion.div>
	);
}
