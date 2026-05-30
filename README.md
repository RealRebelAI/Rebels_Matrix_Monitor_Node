Matrix Monitor Node for ComfyUI
A lightweight utility node designed to display your current workflow step count directly within the ComfyUI interface.

By surfacing real-time processing data, this node eliminates the need to keep your terminal/command prompt active on your screen—simply minimize it and stay focused on your workspace.

Installation
Navigate to your ComfyUI/custom_nodes/ directory.

Clone the repository:

Bash
git clone https://github.com/RealRebelAI/Rebels_Matrix_Monitor_Node.git
3. Restart ComfyUI.

### Usage

* **Node Name:** `Matrix_Monitor`
* **Workflow Integration:** This node can be placed anywhere within your node graph. It functions independently of your primary workflow logic, providing a persistent view of your progress without interrupting your data flow.

> **Note:** The terminal must remain running for this node to function. Please do not close your command prompt window; simply minimize it.

### Troubleshooting & Updates

If you encounter issues while updating ComfyUI, please follow these steps:
1. Temporarily move the `Rebels_Matrix_Monitor_Node` folder out of your `custom_nodes` directory (e.g., move it to your desktop).
2. Perform your ComfyUI update.
3. Move the folder back into your `custom_nodes` directory.
