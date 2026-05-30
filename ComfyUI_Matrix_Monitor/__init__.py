import os

class MatrixMonitorNode:
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {},
            "optional": {
                "anything": ("*", {}), # Optional input just to let you connect lines if you want
            }
        }

    RETURN_TYPES = ("*",)
    RETURN_NAMES = ("output",)
    FUNCTION = "monitor"
    CATEGORY = "Matrix"
    
    # This acts as a pass-through if connected, but does nothing otherwise
    def monitor(self, anything=None):
        return (anything,)

# Mappings
NODE_CLASS_MAPPINGS = {
    "MatrixMonitor": MatrixMonitorNode
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "MatrixMonitor": "Matrix Status Monitor"
}

# This is key: It tells ComfyUI to serve the files in the 'js' subdirectory
WEB_DIRECTORY = "./js"