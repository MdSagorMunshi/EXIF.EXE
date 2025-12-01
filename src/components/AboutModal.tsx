import { X } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
}

function AboutModal({ onClose }: AboutModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="retro-window max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="retro-window-title flex justify-between items-center">
          <span>ℹ️ ABOUT EXIF.EXE</span>
          <button onClick={onClose} className="retro-button-small">
            <X size={14} />
          </button>
        </div>
        <div className="retro-window-content">
          <div className="space-y-6">
            <div>
              <pre className="text-cyan-400 text-xs pixel-text glow-text">
{`
   ███████╗██╗  ██╗██╗███████╗
   ██╔════╝╚██╗██╔╝██║██╔════╝
   █████╗   ╚███╔╝ ██║█████╗
   ██╔══╝   ██╔██╗ ██║██╔══╝
   ███████╗██╔╝ ██╗██║██║
   ╚══════╝╚═╝  ╚═╝╚═╝╚═╝
        VIEWER v1.0
`}
              </pre>
            </div>

            <div className="text-green-400 pixel-text text-sm space-y-4">
              <div>
                <p className="text-yellow-400 mb-2">═══ ABOUT THIS SOFTWARE ═══</p>
                <p className="leading-relaxed">
                  EXIF.EXE is a privacy-focused, offline-first EXIF metadata viewer designed with a retro 90s aesthetic. Extract and view comprehensive metadata from your images without ever uploading them to a server.
                </p>
              </div>

              <div>
                <p className="text-yellow-400 mb-2">═══ FEATURES ═══</p>
                <ul className="space-y-1 ml-4">
                  <li>→ 100% Client-Side Processing</li>
                  <li>→ Zero Data Collection</li>
                  <li>→ Complete Privacy Protection</li>
                  <li>→ Support for Multiple Image Formats</li>
                  <li>→ GPS Location Mapping</li>
                  <li>→ Camera & Lens Information</li>
                  <li>→ Full EXIF Metadata Display</li>
                  <li>→ Retro Terminal Interface</li>
                </ul>
              </div>

              <div>
                <p className="text-yellow-400 mb-2">═══ SUPPORTED FORMATS ═══</p>
                <p className="leading-relaxed">
                  JPG/JPEG • PNG • WebP • GIF • TIFF • BMP • HEIC/HEIF • RAW (CR2, NEF, ARW)*
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  * RAW format support varies by browser capability
                </p>
              </div>

              <div>
                <p className="text-yellow-400 mb-2">═══ PRIVACY GUARANTEE ═══</p>
                <p className="leading-relaxed">
                  All image processing happens exclusively in your browser. Your images never leave your device. No servers. No tracking. No analytics. No cookies. Your privacy is 100% protected.
                </p>
              </div>

              <div>
                <p className="text-yellow-400 mb-2">═══ HOW TO USE ═══</p>
                <ol className="space-y-1 ml-4">
                  <li>1. Drag & drop an image file, or click to browse</li>
                  <li>2. View extracted EXIF metadata in the terminal</li>
                  <li>3. Check GPS location on map (if available)</li>
                  <li>4. Clear and analyze another image</li>
                </ol>
              </div>

              <div>
                <p className="text-yellow-400 mb-2">═══ SYSTEM REQUIREMENTS ═══</p>
                <ul className="space-y-1 ml-4">
                  <li>→ Modern Web Browser (Chrome, Firefox, Safari, Edge)</li>
                  <li>→ JavaScript Enabled</li>
                  <li>→ No Internet Connection Required</li>
                  <li>→ Works on Desktop & Mobile</li>
                </ul>
              </div>

              <div className="border-t-2 border-cyan-700 pt-4 space-y-4">
                <div>
                  <p className="text-yellow-400 mb-2">═══ DEVELOPER CREDITS ═══</p>
                  <p className="text-green-400">
                    <span className="text-cyan-400">Developer:</span> Ryan Shelby
                  </p>
                  <p className="text-xs space-y-1 ml-4 mt-2">
                    <p><span className="text-cyan-400">GitHub:</span> <a href="https://github.com/MdSagorMunshi" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-400 underline">github.com/MdSagorMunshi</a></p>
                    <p><span className="text-cyan-400">GitLab:</span> <a href="https://gitlab.com/rynex" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-400 underline">gitlab.com/rynex</a></p>
                    <p><span className="text-cyan-400">Telegram:</span> <a href="https://t.me/leesiwoo_s" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-400 underline">@leesiwoo_s</a></p>
                  </p>
                </div>
                <p className="text-center text-cyan-400">
                  COPYRIGHT © 1995 RETRO SYSTEMS INC.<br />
                  ALL RIGHTS RESERVED
                </p>
              </div>
            </div>

            <div className="text-center">
              <button onClick={onClose} className="retro-button-large">
                [OK]
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutModal;
