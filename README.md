# EXIF.EXE - Retro EXIF Metadata Viewer

<div align="center">

```
   ███████╗██╗  ██╗██╗███████╗
   ██╔════╝╚██╗██╔╝██║██╔════╝
   █████╗   ╚███╔╝ ██║█████╗
   ██╔══╝   ██╔██╗ ██║██╔══╝
   ███████╗██╔╝ ██╗██║██║
   ╚══════╝╚═╝  ╚═╝╚═╝╚═╝
        VIEWER v1.0
```

**A privacy-focused, offline-first EXIF metadata viewer with a nostalgic 90s aesthetic**

[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff.svg)](https://vitejs.dev/)

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [Privacy](#privacy) • [Contributing](#contributing)

</div>

---

## 📖 Overview

EXIF.EXE is a modern web application that extracts and displays EXIF metadata from image files while maintaining complete user privacy. All processing happens locally in your browser—no uploads, no servers, no tracking. Wrapped in a retro 90s terminal aesthetic for a nostalgic experience.

### 🎯 Key Highlights

- **🔒 100% Privacy**: All processing happens client-side
- **🌐 Offline-First**: Works without internet connection
- **📷 Comprehensive Metadata**: Extract camera, lens, GPS, and technical data
- **🎨 Retro Interface**: Authentic 90s terminal aesthetics
- **📱 Responsive Design**: Works on desktop and mobile devices
- **🚀 Zero Dependencies on Backend**: Pure frontend application

---

## ✨ Features

### Privacy & Security
- **Client-Side Processing**: Images never leave your device
- **No Data Collection**: Zero tracking, analytics, or cookies
- **No Server Required**: Runs entirely in your browser
- **Open Source**: Transparent codebase for security audit

### Metadata Extraction
- **Camera Information**: Make, model, lens details
- **Technical Settings**: ISO, aperture, shutter speed, focal length
- **GPS Data**: Location coordinates with map integration
- **Timestamps**: Original, created, and modified dates
- **Image Properties**: Dimensions, orientation, color space
- **Creator Info**: Artist, copyright, software used

### Supported Formats
- **Common Formats**: JPG/JPEG, PNG, WebP, GIF
- **Professional Formats**: TIFF, BMP, HEIC/HEIF
- **RAW Formats**: CR2, NEF, ARW (browser-dependent)

### User Interface
- **Retro Terminal Design**: CRT monitor effects and scanlines
- **Typewriter Animation**: Real-time metadata display
- **Drag & Drop**: Easy file upload interface
- **Interactive Map**: View GPS coordinates on Google Maps
- **Sound Effects**: Optional retro beeps (toggle on/off)

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ and npm 8+
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/MdSagorMunshi/exif-viewer.git
cd exif-viewer

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Scripts

```bash
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
```

---

## 💻 Usage

### Basic Usage

1. **Open the Application**: Navigate to the deployed URL or local development server
2. **Upload an Image**: 
   - Drag and drop an image file onto the upload area, or
   - Click "BROWSE FILES" to select from your device
3. **View Metadata**: The EXIF data will be displayed in the terminal interface
4. **GPS Coordinates**: If available, click "VIEW ON MAP" to see the location

### Advanced Features

#### Sound Effects
Click the speaker icon in the header to toggle retro sound effects on/off.

#### About Information
Click the info icon (ℹ️) to view detailed information about the application, supported formats, and privacy policy.

#### Clearing Data
Click the X button on the image preview to clear the current image and start over.

---

## 🔒 Privacy

### Our Privacy Commitment

EXIF.EXE is built with privacy as the foundation:

- **No Server Uploads**: Images are processed entirely in your browser using JavaScript
- **No Data Storage**: Nothing is saved to any database or server
- **No Tracking**: No analytics, cookies, or third-party scripts
- **No Network Requests**: Apart from loading the app itself, no data leaves your device
- **Open Source**: Full code transparency for security verification

### How It Works

1. You select an image file from your device
2. The file is read using the browser's FileReader API
3. The `exifr` library extracts metadata directly in your browser
4. Results are displayed in the interface
5. When you close or refresh, everything is cleared

**Your images and metadata never touch our servers.**

---

## 🛠️ Technology Stack

### Core Technologies
- **React 18.3**: UI framework
- **TypeScript 5.5**: Type-safe development
- **Vite 5.4**: Build tool and dev server
- **Tailwind CSS 3.4**: Utility-first styling

### Key Libraries
- **exifr 7.1.3**: EXIF metadata extraction
- **lucide-react**: Icon library
- **@supabase/supabase-js**: Future cloud storage (optional)

### Development Tools
- **ESLint**: Code linting
- **TypeScript ESLint**: TypeScript-specific linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

---

## 📂 Project Structure

```
exif-viewer/
├── src/
│   ├── components/
│   │   ├── AboutModal.tsx      # About/Info modal
│   │   ├── ExifViewer.tsx      # EXIF data display component
│   │   └── SplashScreen.tsx    # Loading screen
│   ├── App.tsx                 # Main application component
│   ├── main.tsx                # Application entry point
│   ├── index.css               # Global styles
│   └── vite-env.d.ts           # Vite type definitions
├── public/                     # Static assets
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── README.md                   # This file
```

---

## 🎨 Customization

### Styling

The application uses Tailwind CSS with custom retro styling. Key style files:
- `src/index.css`: Global styles and custom utilities
- Retro effects: Scanlines, CRT vignette, terminal effects

### Theming

Modify colors in `tailwind.config.js` or customize CSS variables in `src/index.css`:

```css
/* Example color customization */
.retro-window {
  border-color: #00ffff; /* Cyan border */
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5); /* Neon glow */
}
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Commit Changes**: `git commit -m 'Add amazing feature'`
4. **Push to Branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Maintain existing code style
- Add comments for complex logic
- Test on multiple browsers
- Update documentation as needed

---

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

**Ryan Shelby**

- GitHub: [@MdSagorMunshi](https://github.com/MdSagorMunshi)
- GitLab: [@rynex](https://gitlab.com/rynex)
- Telegram: [@leesiwoo_s](https://t.me/leesiwoo_s)

---

## 🙏 Acknowledgments

- **exifr**: Excellent EXIF extraction library
- **Vite**: Lightning-fast build tool
- **React**: Powerful UI library
- **Tailwind CSS**: Utility-first styling
- **VT323 Font**: Authentic retro terminal font

---

## 📞 Support

Need help? Have questions?

- 📧 Open an issue on GitHub
- 💬 Contact via Telegram: [@leesiwoo_s](https://t.me/leesiwoo_s)
- 📖 Check the [documentation](#usage)

---

## 🎯 Roadmap

- [ ] Batch processing for multiple images
- [ ] Export metadata to JSON/CSV
- [ ] Compare EXIF data between images
- [ ] Additional retro themes
- [ ] PWA support for offline usage
- [ ] More file format support

---

<div align="center">

**Made with ❤️ and 90s nostalgia**

© 1995 RETRO SYSTEMS INC. • ALL RIGHTS RESERVED

</div>
