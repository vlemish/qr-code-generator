# QR Code Builder

A modern, step-by-step QR code generator with advanced customization options. Built with vanilla JavaScript, HTML, and Tailwind CSS.

## ✨ Features

### 🎨 **Advanced Customization**
- **6 Corner Styles**: Dots, Square, Rounded, Extra Rounded, Classy, Classy Rounded
- **Color Customization**: QR code and background colors with hex input
- **Icon Overlay**: Upload custom logos with size control (10-50%)
- **Multiple Sizes**: 256px to 2048px with custom size option

### 📱 **Content Types**
- Website URLs
- Plain Text
- Email Addresses
- Phone Numbers
- WiFi Networks
- Contact Cards (vCard)

### 🎯 **User Experience**
- **Step-by-Step Builder**: 5 intuitive steps with progress indicators
- **Real-time Preview**: Live QR code updates as you customize
- **Drag & Drop**: Intuitive file upload for icons
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Multiple Export Formats**: PNG and SVG download options

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd qr-code-generator
   ```

2. **Open in browser**
   ```bash
   # Using Python (if available)
   python -m http.server 8000
   
   # Using Node.js (if available)
   npx serve .
   
   # Or simply open index.html in your browser
   ```

3. **Start creating QR codes!**

## 📁 Project Structure

```
qr-code-generator/
├── index.html          # Main HTML file
├── js/
│   └── app.js         # JavaScript functionality
├── README.md          # Project documentation
└── .gitignore         # Git ignore file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Styling with Tailwind CSS framework
- **Vanilla JavaScript**: No frameworks, pure ES6+
- **qrcode-styling**: Advanced QR code generation library
- **Font Awesome**: Icons for better UX

## 🎨 Customization Options

### Corner Styles
- **Dots**: Traditional circular dots
- **Square**: Sharp square corners
- **Rounded**: Rounded square corners
- **Extra Rounded**: More rounded corners
- **Classy**: Elegant rounded style
- **Classy Rounded**: Enhanced rounded style

### Color Options
- **QR Code Color**: Customize the main QR code color
- **Background Color**: Set the background color
- **Hex Input**: Direct hex color input for precise control

### Icon Features
- **File Upload**: Drag & drop or click to upload
- **Size Control**: Adjustable from 10% to 50% of QR code size
- **File Validation**: Image files only, max 2MB
- **Preview**: See uploaded icon before applying

### Size Options
- **Small (256px)**: Perfect for web use
- **Medium (512px)**: Ideal for print materials
- **Large (1024px)**: High quality for professional use
- **Extra Large (2048px)**: Maximum quality for special projects
- **Custom Size**: Any size from 100px to 4096px

## 🔧 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📱 Mobile Support

The application is fully responsive and works great on:
- Smartphones
- Tablets
- Desktop computers

## 🎯 Usage Guide

### Step 1: Content
1. Select the content type (URL, text, email, etc.)
2. Enter your content in the text area
3. Preview your content before proceeding

### Step 2: Colors
1. Choose your QR code color using the color picker or hex input
2. Select your background color
3. Pick your preferred corner style from 6 options

### Step 3: Icon (Optional)
1. Upload an image file (drag & drop or click to browse)
2. Adjust the icon size using the slider
3. Preview the icon before applying

### Step 4: Size
1. Choose from preset sizes or enter a custom size
2. See the size preview in the live preview area

### Step 5: Download
1. Review your QR code in the live preview
2. Download as PNG or SVG format
3. Create another QR code if needed

## 🔒 Privacy & Security

- **No Server Required**: Everything runs locally in your browser
- **No Data Collection**: Your content never leaves your device
- **File Validation**: Secure file upload with type and size validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [qrcode-styling](https://github.com/kozakdenys/qrcode-styling) - Advanced QR code styling library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Font Awesome](https://fontawesome.com/) - Icon library

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Happy QR Code Creating! 🎉**
