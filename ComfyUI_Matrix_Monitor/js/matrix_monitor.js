import { app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";

app.registerExtension({
    name: "Comfy.MatrixMonitor",
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name === "MatrixMonitor") {
            
            // --- Custom Logic & Event Listeners ---
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                const r = onNodeCreated ? onNodeCreated.apply(this, arguments) : undefined;
                
                this.monitorStatus = "System Idle";
                this.monitorStep = "";
                this.monitorPercent = "";
                
                // Set default size nice and wide for status text
                this.size = [350, 120];
                
                // Matrix Rain State
                this.rainColumns = [];
                this.rainFontSize = 14;
                this.lastDrawTime = Date.now();
                
                // Setup Event Listeners for Global Status
                const self = this;
                
                // 1. Listen for Execution Start
                api.addEventListener("executing", (e) => {
                    if (e.detail) {
                        const nodeId = e.detail;
                        const executingNode = app.graph.getNodeById(nodeId);
                        if (executingNode) {
                            self.monitorStatus = `Executing: ${executingNode.title || executingNode.type}`;
                        } else {
                            self.monitorStatus = "System Idle";
                            self.monitorStep = "";
                        }
                    } else {
                        self.monitorStatus = "System Idle";
                        self.monitorStep = "";
                    }
                    self.setDirtyCanvas(true, true); 
                });

                // 2. Listen for Progress
                api.addEventListener("progress", (e) => {
                    const { value, max } = e.detail;
                    const percent = Math.floor((value / max) * 100);
                    self.monitorStep = `Step: ${value}/${max}`;
                    self.monitorPercent = `${percent}%`;
                    self.setDirtyCanvas(true, true);
                });

                // 3. Status check (catches queue clear)
                api.addEventListener("status", (e) => {
                    if (e.detail && e.detail.exec_info && e.detail.exec_info.queue_remaining === 0) {
                        self.monitorStatus = "System Idle";
                        self.monitorStep = "";
                        self.monitorPercent = "";
                        self.setDirtyCanvas(true, true);
                    }
                });

                return r;
            };

            // --- The Draw Loop ---
            const onDrawForeground = nodeType.prototype.onDrawForeground;
            nodeType.prototype.onDrawForeground = function (ctx) {
                const r = onDrawForeground ? onDrawForeground.apply(this, arguments) : undefined;
                
                if (this.flags.collapsed) return r;

                const width = this.size[0];
                const height = this.size[1];
                const now = Date.now();

                // Start main drawing block block
                ctx.save();

                // --- FIX: APPLY CLIPPING ---
                // This ensures nothing is drawn outside the node boundaries
                ctx.beginPath();
                ctx.rect(0, 0, width, height);
                ctx.clip();
                // ---------------------------

                // 1. Draw Black Background (Force Override)
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, width, height);

                // 2. Initialize Rain Columns if size changed
                const cols = Math.floor(width / this.rainFontSize);
                if (this.rainColumns.length !== cols || this.rainColumns.length === 0) {
                     // Initialize drops randomly above the canvas
                    this.rainColumns = Array(cols).fill(0).map(() => Math.random() * -height);
                }

                // 3. Draw Digital Rain Animation
                ctx.fillStyle = "#00FF41"; // Matrix Green
                ctx.font = `${this.rainFontSize}px monospace`;
                
                // Throttling animation speed slightly
                const animate = (now - this.lastDrawTime > 40);
                if(animate) this.lastDrawTime = now;

                ctx.globalAlpha = 0.5; // Base transparency for rain

                for (let i = 0; i < this.rainColumns.length; i++) {
                    // Use Katakana characters for more authentic Matrix look
                    const char = String.fromCharCode(0x30A0 + Math.random() * 96);
                    
                    ctx.fillText(char, i * this.rainFontSize, this.rainColumns[i]);
                    
                    if (animate) {
                        // Reset drop to top randomly after it passes bottom
                        if (this.rainColumns[i] > height && Math.random() > 0.95) {
                             // Reset to just above the top
                            this.rainColumns[i] = -this.rainFontSize;
                        }
                        // Move down
                        this.rainColumns[i] += this.rainFontSize; 
                    }
                }
                
                // Reset alpha for text overlay
                ctx.globalAlpha = 1.0; 

                // 4. Draw Status Text Overlay
                
                // Semi-transparent box background for readability
                ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
                ctx.fillRect(5, 5, width - 10, height - 10);

                // Text Settings
                ctx.textAlign = "center";
                ctx.fillStyle = "#00FF41";
                ctx.font = "bold 16px monospace";
                // Add neon glow effect
                ctx.shadowColor = "#00FF41";
                ctx.shadowBlur = 10; 

                // Status Text
                const centerY = height / 2;
                ctx.fillText(this.monitorStatus, width / 2, centerY - 10);

                // Steps / Percentage Text
                if (this.monitorStep) {
                    ctx.font = "14px monospace";
                    // Less glow for secondary text
                    ctx.shadowBlur = 5; 
                    ctx.fillText(`${this.monitorStep}  [${this.monitorPercent}]`, width / 2, centerY + 20);
                }

                // Restore context to undo clipping before exiting function
                ctx.restore();

                // Force constant redraw for animation loop
                this.setDirtyCanvas(true, true); 

                return r;
            };
        }
    }
});