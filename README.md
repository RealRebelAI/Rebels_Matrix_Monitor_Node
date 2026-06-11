# Rebel's Matrix Monitor (v2.0)
<img width="913" height="355" alt="Screenshot (162)" src="https://github.com/user-attachments/assets/b47d6ba9-e3db-4bde-8d13-209cde297ef8" />

A high-performance, hardware-accelerated terminal monitor and visualization node for ComfyUI.

Tired of staring at a frozen ComfyUI UI while your terminal does all the heavy lifting in the background? Rebel's Matrix Monitor intercepts your server logs and streams them live directly onto your workflow canvas.

Built specifically to track complex quantization pipelines—like the JoyAI-Echo GGUF staggered CPU/GPU offloading—this monitor ensures you always know exactly what your system is doing, wrapped in 12 premium, fully animated visual themes.

🚀 What's New in Version 2.0 (The Premium Upgrade)
Native Hardware Acceleration: Completely rebuilt from the ground up. V2 ditches the old HTML overlay for a pure LiteGraph onDrawBackground native canvas engine. Zero memory leaks, zero UI lag, and butter-smooth 60fps animations.

Dynamic DOM Clipping & Scaling: No more UI bleed. The monitor window now mathematically calculates your node's geometry. Drag, scale, and resize the node however you want—the terminal window and animations stay perfectly locked inside the frame.

Smart Context Header: The monitor now knows what you are running. If it detects [StagedJE] or [Rebels JE] tags, the header dynamically updates to track your JoyAI-Echo pipeline. If it detects standard progress, it switches to global graph tracking.

12 Premium Physics-Driven Themes: We replaced the static themes with fully animated, procedural visualizers that react smoothly without lagging your generation times.

🎨 The V2 Animation Engine (12 Themes)
Every theme is fully animated directly on the ComfyUI canvas layer:

Movie-Accurate Matrix Rain: Authentic, stutter-stepped ~18fps code drop featuring Katakana and Latin characters with glowing leading edges.

Stick Figure (City Walk): A forward-kinematic stick figure walking past a parallax cityscape.

Stick Figure (Parkour Jump): Anticipation/launch physics as a figure jumps over moving geometric obstacles.

Hoop Physics (Dynamic): A complete physics state-machine. The ball calculates random arcs to swish, brick, or rattle out of the rim.

Car Driving (Depth Pass): A cruising wireframe car with spinning spokes against 3-layer parallax mountains.

Car Drifting (Track Hairpin): A top-down race car tackling a hairpin apex, complete with counter-steering and persistent tire skid marks.

Neon HUD (Geo-Pulse): A cyberpunk rotating geometric pulse with deep shadow-blur glowing effects.

Neon HUD (Radar Scan): Smooth sweeping radar visualizer with center blip tracking.

System Defrag Grid: Smoothly fading diagnostic data blocks mimicking a hard drive defrag.

Oscilloscope Sync: Intersecting sine waves mapping motion blur trails.

Thermal Embers: Hardware-blended (lighter composite) fire particles drifting upwards.

Ball Rolling (Color Path): A color-shifting ball tracking a complex sine wave track.

🧠 Why use this? (The Low VRAM Advantage)
When pushing frontier models on consumer hardware like an 8GB RTX 3070, UI progress bars often freeze while the system is quietly swapping models from RAM to VRAM or processing tokenizers on the CPU.

Instead of guessing if ComfyUI crashed, the Matrix Monitor catches those specific backend stages (like layer swaps and GGUF materialization) and prints them live. It is the ultimate diagnostic tool for complex custom node workflows.

## Installation

1. Navigate to your `ComfyUI/custom_nodes/` directory.
2. Clone the repository:

`git clone https://github.com/RealRebelAI/Rebels_Matrix_Monitor_Node.git`

3. Restart ComfyUI.

## Usage

* **Node Name:** `Rebels Matrix Monitor`
* **Workflow Integration:** This node can be placed anywhere within your node graph. It functions independently of your primary workflow logic, providing a persistent view of your progress without interrupting your data flow.

> **Note:** The terminal must remain running for this node to function. Please do not close your command prompt window; simply minimize it.

## Troubleshooting & Updates

If you encounter issues while updating ComfyUI, please follow these steps:
1. Temporarily move the `Rebels_Matrix_Monitor_Node` folder out of your `custom_nodes` directory (e.g., move it to your desktop).
2. Perform your ComfyUI update.
3. Move the folder back into your `custom_nodes` directory.
