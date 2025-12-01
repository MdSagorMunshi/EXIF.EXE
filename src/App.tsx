import { useState, useRef } from 'react';
import { Upload, X, Info, Volume2, VolumeX } from 'lucide-react';
import ExifViewer from './components/ExifViewer';
import SplashScreen from './components/SplashScreen';
import AboutModal from './components/AboutModal';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [exifData, setExifData] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [showSplash, setShowSplash] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const playSound = (type: 'click' | 'beep') => {
    if (!soundEnabled) return;
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'click') {
      oscillator.frequency.value = 800;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } else {
      oscillator.frequency.value = 440;
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    }
  };

  const handleFileSelect = async (file: File) => {
    playSound('click');
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const exifr = await import('exifr');
      const data = await exifr.parse(file, {
        tiff: true,
        xmp: true,
        icc: true,
        iptc: true,
        jfif: true,
        ihdr: true,
        gps: true,
        exif: true,
      });

      const fileData = {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        lastModified: new Date(file.lastModified).toISOString(),
      };

      setExifData({ ...fileData, ...data });
      playSound('beep');
    } catch (error) {
      console.error('Error reading EXIF data:', error);
      setExifData({
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        lastModified: new Date(file.lastModified).toISOString(),
        error: 'No EXIF data found or unsupported format',
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const clearFile = () => {
    playSound('click');
    setSelectedFile(null);
    setExifData(null);
    setImagePreview('');
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="retro-scanlines"></div>
      <div className="retro-vignette"></div>

      <div className="relative z-10">
        <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-cyan-900 border-b-4 border-cyan-400 shadow-neon">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="pixel-border bg-black p-2">
                  <div className="text-cyan-400 text-2xl font-bold pixel-text glow-text">
                    📷 EXIF.EXE
                  </div>
                </div>
                <div className="text-white text-sm pixel-text hidden md:block">
                  v1.0 © 1995
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    playSound('click');
                    setSoundEnabled(!soundEnabled);
                  }}
                  className="retro-button p-2"
                >
                  {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                <button
                  onClick={() => {
                    playSound('click');
                    setShowAbout(true);
                  }}
                  className="retro-button p-2"
                >
                  <Info size={16} />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="retro-window mb-6">
            <div className="retro-window-title">
              <span>⚠️ PRIVACY NOTICE ⚠️</span>
            </div>
            <div className="retro-window-content">
              <p className="text-green-400 pixel-text text-center text-sm md:text-base leading-relaxed">
                🔒 <strong>WE RESPECT YOUR PRIVACY</strong> 🔒<br />
                All processing happens locally on your device.<br />
                No data is uploaded or stored on any server.<br />
                100% offline • 100% private • 100% secure
              </p>
            </div>
          </div>

          {!selectedFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`retro-window ${dragOver ? 'border-yellow-400 shadow-yellow' : ''}`}
            >
              <div className="retro-window-title">
                <span>📁 FILE MANAGER</span>
              </div>
              <div className="retro-window-content">
                <div className="text-center py-12">
                  <div className="mb-6">
                    <Upload size={64} className="mx-auto text-cyan-400 animate-pulse" />
                  </div>
                  <p className="text-green-400 pixel-text mb-4 text-sm md:text-base">
                    DRAG & DROP IMAGE FILE HERE
                  </p>
                  <p className="text-yellow-400 pixel-text mb-6 text-xs md:text-sm">
                    or
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                    className="hidden"
                  />
                  <button
                    onClick={() => {
                      playSound('click');
                      fileInputRef.current?.click();
                    }}
                    className="retro-button-large"
                  >
                    🖱️ CLICK TO BROWSE FILES
                  </button>
                  <div className="mt-6 text-gray-400 pixel-text text-xs">
                    <p>Supported formats:</p>
                    <p>JPG • PNG • WebP • GIF • TIFF • BMP • HEIC</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="retro-window">
                <div className="retro-window-title flex justify-between items-center">
                  <span>🖼️ IMAGE PREVIEW</span>
                  <button onClick={clearFile} className="retro-button-small">
                    <X size={14} />
                  </button>
                </div>
                <div className="retro-window-content">
                  <div className="bg-black p-4 border-2 border-cyan-700">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-auto pixel-image"
                    />
                  </div>
                  <div className="mt-4 text-green-400 pixel-text text-xs space-y-1">
                    <p>FILE: {selectedFile.name}</p>
                    <p>SIZE: {(selectedFile.size / 1024).toFixed(2)} KB</p>
                    <p>TYPE: {selectedFile.type}</p>
                  </div>
                </div>
              </div>

              <ExifViewer data={exifData} />
            </div>
          )}
        </main>

        <footer className="border-t-4 border-cyan-400 bg-gradient-to-r from-purple-900 via-blue-900 to-cyan-900 py-4 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-cyan-400 pixel-text text-xs md:text-sm">
              EXIF VIEWER 1.0 • POWERED BY RETRO TECHNOLOGY • NO COOKIES • NO TRACKING
            </p>
          </div>
        </footer>
      </div>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </div>
  );
}

export default App;
