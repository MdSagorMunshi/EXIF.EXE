import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');

  useEffect(() => {
    const messages = [
      'INITIALIZING SYSTEM...',
      'LOADING RETRO.DLL...',
      'MOUNTING DISK DRIVES...',
      'CALIBRATING CRT MONITOR...',
      'LOADING EXIF PARSER...',
      'SYSTEM READY',
    ];

    let messageIndex = 0;
    let progressValue = 0;

    const interval = setInterval(() => {
      progressValue += 2;
      setProgress(progressValue);

      if (progressValue % 17 === 0 && messageIndex < messages.length) {
        setLoadingText(messages[messageIndex]);
        messageIndex++;
      }

      if (progressValue >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="retro-scanlines"></div>
      <div className="retro-vignette"></div>

      <div className="relative z-10 text-center max-w-2xl px-4">
        <div className="mb-8 animate-pulse">
          <pre className="text-cyan-400 text-xs md:text-sm pixel-text glow-text">
{`
    ███████╗██╗  ██╗██╗███████╗
    ██╔════╝╚██╗██╔╝██║██╔════╝
    █████╗   ╚███╔╝ ██║█████╗
    ██╔══╝   ██╔██╗ ██║██╔══╝
    ███████╗██╔╝ ██╗██║██║
    ╚══════╝╚═╝  ╚═╝╚═╝╚═╝
`}
          </pre>
        </div>

        <div className="mb-8">
          <p className="text-green-400 pixel-text text-xl md:text-2xl glow-text mb-2">
            VIEWER v1.0
          </p>
          <p className="text-yellow-400 pixel-text text-xs md:text-sm">
            COPYRIGHT © 1995 RETRO SYSTEMS INC.
          </p>
        </div>

        <div className="pixel-border bg-black p-4 mb-4">
          <div className="h-8 bg-gray-900 border-2 border-cyan-700 relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-100 loading-bar"
              style={{ width: `${progress}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white pixel-text text-xs font-bold">
                {progress}%
              </span>
            </div>
          </div>
        </div>

        <div className="h-6">
          <p className="text-green-400 pixel-text text-xs md:text-sm terminal-text">
            {loadingText && (
              <>
                {loadingText}
                <span className="terminal-cursor inline-block ml-1">█</span>
              </>
            )}
          </p>
        </div>

        <div className="mt-12 text-gray-500 pixel-text text-xs">
          <p>PRESS ANY KEY TO CONTINUE...</p>
          <p className="mt-2 animate-pulse">▼</p>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
