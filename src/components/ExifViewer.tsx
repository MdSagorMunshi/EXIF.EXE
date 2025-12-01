import { useState, useEffect } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

interface ExifViewerProps {
  data: any;
}

function ExifViewer({ data }: ExifViewerProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!data) return;

    setIsTyping(true);
    setDisplayedText('');

    const formattedData = formatExifData(data);
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < formattedData.length) {
        setDisplayedText(formattedData.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 10);

    return () => clearInterval(typingInterval);
  }, [data]);

  const formatExifData = (data: any): string => {
    let output = '> INITIALIZING EXIF PARSER v1.0\n';
    output += '> LOADING METADATA...\n';
    output += '> ' + '='.repeat(50) + '\n\n';

    if (data.error) {
      output += `ERROR: ${data.error}\n\n`;
    }

    output += '=== FILE INFORMATION ===\n';
    if (data.fileName) output += `File Name: ${data.fileName}\n`;
    if (data.fileSize) output += `File Size: ${(data.fileSize / 1024).toFixed(2)} KB\n`;
    if (data.fileType) output += `MIME Type: ${data.fileType}\n`;
    if (data.lastModified) output += `Last Modified: ${new Date(data.lastModified).toLocaleString()}\n`;

    if (data.ImageWidth || data.ExifImageWidth) {
      output += `\n=== IMAGE DIMENSIONS ===\n`;
      output += `Width: ${data.ImageWidth || data.ExifImageWidth || 'N/A'} px\n`;
      output += `Height: ${data.ImageHeight || data.ExifImageHeight || 'N/A'} px\n`;
    }

    if (data.Make || data.Model) {
      output += `\n=== CAMERA INFORMATION ===\n`;
      if (data.Make) output += `Make: ${data.Make}\n`;
      if (data.Model) output += `Model: ${data.Model}\n`;
      if (data.LensModel) output += `Lens: ${data.LensModel}\n`;
      if (data.LensMake) output += `Lens Make: ${data.LensMake}\n`;
    }

    if (data.ISO || data.FNumber || data.ExposureTime || data.FocalLength) {
      output += `\n=== CAMERA SETTINGS ===\n`;
      if (data.ISO) output += `ISO: ${data.ISO}\n`;
      if (data.FNumber) output += `Aperture: f/${data.FNumber}\n`;
      if (data.ExposureTime) {
        const expTime = data.ExposureTime < 1 ? `1/${Math.round(1 / data.ExposureTime)}` : data.ExposureTime;
        output += `Shutter Speed: ${expTime} sec\n`;
      }
      if (data.FocalLength) output += `Focal Length: ${data.FocalLength}mm\n`;
      if (data.ExposureProgram) output += `Exposure Program: ${getExposureProgram(data.ExposureProgram)}\n`;
      if (data.MeteringMode) output += `Metering Mode: ${getMeteringMode(data.MeteringMode)}\n`;
      if (data.Flash) output += `Flash: ${getFlashMode(data.Flash)}\n`;
      if (data.WhiteBalance !== undefined) output += `White Balance: ${data.WhiteBalance === 0 ? 'Auto' : 'Manual'}\n`;
    }

    if (data.DateTimeOriginal || data.CreateDate || data.ModifyDate) {
      output += `\n=== DATE & TIME ===\n`;
      if (data.DateTimeOriginal) output += `Original: ${formatDate(data.DateTimeOriginal)}\n`;
      if (data.CreateDate) output += `Created: ${formatDate(data.CreateDate)}\n`;
      if (data.ModifyDate) output += `Modified: ${formatDate(data.ModifyDate)}\n`;
    }

    if (data.latitude && data.longitude) {
      output += `\n=== GPS LOCATION ===\n`;
      output += `Latitude: ${data.latitude.toFixed(6)}°\n`;
      output += `Longitude: ${data.longitude.toFixed(6)}°\n`;
      if (data.GPSAltitude) output += `Altitude: ${data.GPSAltitude.toFixed(2)}m\n`;
      output += `Map: https://www.google.com/maps?q=${data.latitude},${data.longitude}\n`;
    }

    if (data.Orientation) {
      output += `\n=== IMAGE ORIENTATION ===\n`;
      output += `Orientation: ${getOrientation(data.Orientation)}\n`;
    }

    if (data.ColorSpace || data.ColorMode) {
      output += `\n=== COLOR INFORMATION ===\n`;
      if (data.ColorSpace) output += `Color Space: ${getColorSpace(data.ColorSpace)}\n`;
      if (data.ColorMode) output += `Color Mode: ${data.ColorMode}\n`;
    }

    if (data.Software) {
      output += `\n=== SOFTWARE ===\n`;
      output += `Software: ${data.Software}\n`;
    }

    if (data.Artist || data.Copyright || data.Creator) {
      output += `\n=== CREATOR INFORMATION ===\n`;
      if (data.Artist) output += `Artist: ${data.Artist}\n`;
      if (data.Creator) output += `Creator: ${data.Creator}\n`;
      if (data.Copyright) output += `Copyright: ${data.Copyright}\n`;
    }

    const excludeKeys = [
      'fileName', 'fileSize', 'fileType', 'lastModified', 'error',
      'Make', 'Model', 'LensModel', 'LensMake', 'ISO', 'FNumber',
      'ExposureTime', 'FocalLength', 'ExposureProgram', 'MeteringMode',
      'Flash', 'WhiteBalance', 'ImageWidth', 'ImageHeight', 'ExifImageWidth',
      'ExifImageHeight', 'DateTimeOriginal', 'CreateDate', 'ModifyDate',
      'latitude', 'longitude', 'GPSAltitude', 'Orientation', 'ColorSpace',
      'ColorMode', 'Software', 'Artist', 'Copyright', 'Creator'
    ];

    const additionalData = Object.keys(data).filter(key => !excludeKeys.includes(key));

    if (additionalData.length > 0) {
      output += `\n=== ADDITIONAL METADATA ===\n`;
      additionalData.forEach(key => {
        const value = data[key];
        if (value !== null && value !== undefined && value !== '') {
          output += `${key}: ${formatValue(value)}\n`;
        }
      });
    }

    output += `\n${'='.repeat(50)}\n`;
    output += '> EXIF PARSING COMPLETE\n';
    output += '> READY_\n';

    return output;
  };

  const formatValue = (value: any): string => {
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  };

  const formatDate = (date: any): string => {
    if (date instanceof Date) {
      return date.toLocaleString();
    }
    return String(date);
  };

  const getExposureProgram = (value: number): string => {
    const programs = ['Not defined', 'Manual', 'Normal program', 'Aperture priority', 'Shutter priority', 'Creative program', 'Action program', 'Portrait mode', 'Landscape mode'];
    return programs[value] || `Unknown (${value})`;
  };

  const getMeteringMode = (value: number): string => {
    const modes = ['Unknown', 'Average', 'Center-weighted average', 'Spot', 'Multi-spot', 'Pattern', 'Partial'];
    return modes[value] || `Unknown (${value})`;
  };

  const getFlashMode = (value: number): string => {
    return value === 0 ? 'No Flash' : 'Flash Fired';
  };

  const getOrientation = (value: number): string => {
    const orientations = ['', 'Horizontal (normal)', 'Mirror horizontal', 'Rotate 180', 'Mirror vertical', 'Mirror horizontal and rotate 270 CW', 'Rotate 90 CW', 'Mirror horizontal and rotate 90 CW', 'Rotate 270 CW'];
    return orientations[value] || `Unknown (${value})`;
  };

  const getColorSpace = (value: number): string => {
    return value === 1 ? 'sRGB' : value === 65535 ? 'Uncalibrated' : `Unknown (${value})`;
  };

  const hasGPS = data?.latitude && data?.longitude;

  return (
    <div className="retro-window">
      <div className="retro-window-title">
        <span>💾 EXIF DATA TERMINAL</span>
      </div>
      <div className="retro-window-content p-0">
        <div className="terminal-screen">
          <pre className="terminal-text">
            {displayedText}
            {isTyping && <span className="terminal-cursor">█</span>}
          </pre>
        </div>
        {hasGPS && (
          <div className="p-4 border-t-2 border-cyan-700">
            <a
              href={`https://www.google.com/maps?q=${data.latitude},${data.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="retro-button-large inline-flex items-center justify-center gap-2"
            >
              <MapPin size={16} />
              VIEW ON MAP
              <ExternalLink size={16} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExifViewer;
