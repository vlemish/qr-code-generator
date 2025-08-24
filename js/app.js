class QRCodeBuilder {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 5;
        this.qrData = {
            content: '',
            contentType: 'url',
            qrColor: '#000000',
            bgColor: '#FFFFFF',
            cornerStyle: 'dots',
            icon: null,
            iconSize: 25,
            size: 512
        };
        
        this.qrCode = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateStepIndicators();
        this.updateNavigationButtons();
        this.generateQR(); // Generate initial QR code
    }

    setupEventListeners() {
        // Step navigation
        document.getElementById('next-btn').addEventListener('click', () => this.nextStep());
        document.getElementById('prev-btn').addEventListener('click', () => this.prevStep());
        
        // Step indicators with improved UX
        document.querySelectorAll('.step-indicator').forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                const step = parseInt(e.currentTarget.dataset.step);
                if (step <= this.currentStep) {
                    this.goToStep(step);
                }
            });
            
            // Add hover effects for better UX
            indicator.addEventListener('mouseenter', (e) => {
                if (parseInt(e.currentTarget.dataset.step) <= this.currentStep) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.cursor = 'pointer';
                }
            });
            
            indicator.addEventListener('mouseleave', (e) => {
                e.currentTarget.style.transform = 'scale(1)';
            });
        });

        // Content step
        document.getElementById('content-type').addEventListener('change', (e) => {
            this.qrData.contentType = e.target.value;
            this.updateContentPlaceholder();
        });
        
        document.getElementById('qr-content').addEventListener('input', (e) => {
            this.qrData.content = e.target.value;
            this.updateContentPreview();
            this.generateQR();
        });

        // Color step
        document.getElementById('qr-color').addEventListener('change', (e) => {
            this.qrData.qrColor = e.target.value;
            document.getElementById('qr-color-hex').value = e.target.value;
            this.generateQR();
        });
        
        document.getElementById('qr-color-hex').addEventListener('input', (e) => {
            this.qrData.qrColor = e.target.value;
            document.getElementById('qr-color').value = e.target.value;
            this.generateQR();
        });

        document.getElementById('bg-color').addEventListener('change', (e) => {
            this.qrData.bgColor = e.target.value;
            document.getElementById('bg-color-hex').value = e.target.value;
            this.generateQR();
        });
        
        document.getElementById('bg-color-hex').addEventListener('input', (e) => {
            this.qrData.bgColor = e.target.value;
            document.getElementById('bg-color').value = e.target.value;
            this.generateQR();
        });

        // Corner style
        document.querySelectorAll('.corner-style-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.corner-style-btn').forEach(b => b.classList.remove('border-blue-500', 'bg-blue-50'));
                e.target.closest('.corner-style-btn').classList.add('border-blue-500', 'bg-blue-50');
                this.qrData.cornerStyle = e.target.closest('.corner-style-btn').dataset.style;
                this.generateQR();
            });
        });

        // Icon step
        const uploadZone = document.getElementById('upload-zone');
        const iconUpload = document.getElementById('icon-upload');

        uploadZone.addEventListener('click', () => iconUpload.click());
        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.classList.add('drag-over');
        });
        uploadZone.addEventListener('dragleave', () => {
            uploadZone.classList.remove('drag-over');
        });
        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleIconUpload(files[0]);
            }
        });

        iconUpload.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleIconUpload(e.target.files[0]);
            }
        });

        document.getElementById('remove-icon').addEventListener('click', () => {
            this.removeIcon();
        });

        document.getElementById('icon-size-slider').addEventListener('input', (e) => {
            this.qrData.iconSize = parseInt(e.target.value);
            document.getElementById('icon-size-value').textContent = e.target.value + '%';
            this.generateQR();
        });

        // Size step
        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('border-blue-500', 'bg-blue-50'));
                e.target.closest('.size-btn').classList.add('border-blue-500', 'bg-blue-50');
                this.qrData.size = parseInt(e.target.closest('.size-btn').dataset.size);
                document.getElementById('custom-size').value = this.qrData.size;
                this.generateQR();
            });
        });

        document.getElementById('custom-size').addEventListener('input', (e) => {
            this.qrData.size = parseInt(e.target.value);
            this.generateQR();
        });

        // Download buttons
        document.getElementById('download-png').addEventListener('click', () => this.downloadQR('png'));
        document.getElementById('download-svg').addEventListener('click', () => this.downloadQR('svg'));
        document.getElementById('create-new').addEventListener('click', () => this.resetBuilder());

        // Initialize
        this.updateContentPlaceholder();
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateStepContent();
            this.updateStepIndicators();
            this.updateNavigationButtons();
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStepContent();
            this.updateStepIndicators();
            this.updateNavigationButtons();
        }
    }

    goToStep(step) {
        this.currentStep = step;
        this.updateStepContent();
        this.updateStepIndicators();
        this.updateNavigationButtons();
    }

    updateStepContent() {
        // Hide all step content
        document.querySelectorAll('.step-content').forEach(content => {
            content.classList.add('hidden');
        });

        // Show current step content
        const currentStepContent = document.getElementById(`step-${this.currentStep}`);
        if (currentStepContent) {
            currentStepContent.classList.remove('hidden');
            currentStepContent.classList.add('fade-in');
        }
    }

    updateStepIndicators() {
        document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
            const stepNumber = index + 1;
            indicator.classList.remove('step-active', 'step-completed', 'step-pending');
            
            if (stepNumber === this.currentStep) {
                indicator.classList.add('step-active');
                indicator.style.cursor = 'default';
            } else if (stepNumber < this.currentStep) {
                indicator.classList.add('step-completed');
                indicator.style.cursor = 'pointer';
            } else {
                indicator.classList.add('step-pending');
                indicator.style.cursor = 'default';
            }
        });
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        if (this.currentStep === 1) {
            prevBtn.classList.add('hidden');
        } else {
            prevBtn.classList.remove('hidden');
        }

        if (this.currentStep === this.totalSteps) {
            nextBtn.classList.add('hidden');
        } else {
            nextBtn.classList.remove('hidden');
        }
    }

    updateContentPlaceholder() {
        const contentInput = document.getElementById('qr-content');
        const placeholders = {
            url: 'Enter website URL (e.g., https://example.com)',
            text: 'Enter your text message',
            email: 'Enter email address (e.g., user@example.com)',
            phone: 'Enter phone number (e.g., +1234567890)',
            wifi: 'Enter WiFi network name',
            vcard: 'Enter contact information'
        };
        contentInput.placeholder = placeholders[this.qrData.contentType] || 'Enter your content';
    }

    updateContentPreview() {
        const preview = document.getElementById('content-preview');
        const previewText = document.getElementById('preview-text');
        
        if (this.qrData.content.trim()) {
            preview.classList.remove('hidden');
            previewText.textContent = this.qrData.content;
        } else {
            preview.classList.add('hidden');
        }
    }

    handleIconUpload(file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('File size must be less than 2MB.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.qrData.icon = e.target.result;
            this.showIconPreview(file);
            this.generateQR();
        };
        reader.readAsDataURL(file);
    }

    showIconPreview(file) {
        const preview = document.getElementById('icon-preview');
        const previewIcon = document.getElementById('preview-icon');
        const iconName = document.getElementById('icon-name');
        const iconSize = document.getElementById('icon-size');

        previewIcon.src = this.qrData.icon;
        iconName.textContent = file.name;
        iconSize.textContent = this.formatFileSize(file.size);
        preview.classList.remove('hidden');
    }

    removeIcon() {
        this.qrData.icon = null;
        document.getElementById('icon-preview').classList.add('hidden');
        document.getElementById('icon-upload').value = '';
        this.generateQR();
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    generateQR() {
        // Clear previous QR code
        const previewContainer = document.getElementById('qr-preview');
        previewContainer.innerHTML = '';

        // Show placeholder if no content
        if (!this.qrData.content.trim()) {
            previewContainer.innerHTML = `
                <div class="text-center">
                    <div class="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-qrcode text-6xl text-gray-400"></i>
                    </div>
                    <p class="text-gray-500">Your QR code will appear here</p>
                </div>
            `;
            return;
        }

        try {
            const options = {
                width: this.qrData.size,
                height: this.qrData.size,
                data: this.qrData.content,
                dotsOptions: {
                    color: this.qrData.qrColor,
                    type: this.qrData.cornerStyle
                },
                backgroundOptions: {
                    color: this.qrData.bgColor
                },
                cornersSquareOptions: {
                    type: this.qrData.cornerStyle
                },
                cornersDotOptions: {
                    type: this.qrData.cornerStyle
                }
            };

            if (this.qrData.icon) {
                options.image = this.qrData.icon;
                options.imageOptions = {
                    hideBackgroundDots: true,
                    imageSize: this.qrData.iconSize / 100,
                    margin: 0
                };
            }

            // Create new QR code instance
            this.qrCode = new QRCodeStyling(options);
            this.qrCode.append(previewContainer);
            
        } catch (error) {
            console.error('Error generating QR code:', error);
            previewContainer.innerHTML = `
                <div class="text-center">
                    <div class="w-64 h-64 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-exclamation-triangle text-6xl text-red-400"></i>
                    </div>
                    <p class="text-red-500">Error generating QR code</p>
                </div>
            `;
        }
    }

    downloadQR(format) {
        if (!this.qrCode || !this.qrData.content.trim()) {
            alert('Please enter content and generate a QR code first.');
            return;
        }

        try {
            const filename = `qr-code-${Date.now()}.${format}`;
            
            if (format === 'png') {
                this.qrCode.download({ name: filename, extension: 'png' });
            } else if (format === 'svg') {
                this.qrCode.download({ name: filename, extension: 'svg' });
            }
        } catch (error) {
            console.error('Error downloading QR code:', error);
            alert('Error downloading QR code. Please try again.');
        }
    }

    resetBuilder() {
        this.currentStep = 1;
        this.qrData = {
            content: '',
            contentType: 'url',
            qrColor: '#000000',
            bgColor: '#FFFFFF',
            cornerStyle: 'dots',
            icon: null,
            iconSize: 25,
            size: 512
        };

        // Reset UI
        document.getElementById('qr-content').value = '';
        document.getElementById('qr-color').value = '#000000';
        document.getElementById('qr-color-hex').value = '#000000';
        document.getElementById('bg-color').value = '#FFFFFF';
        document.getElementById('bg-color-hex').value = '#FFFFFF';
        document.getElementById('icon-size-slider').value = 25;
        document.getElementById('icon-size-value').textContent = '25%';
        document.getElementById('custom-size').value = 512;

        // Reset buttons
        document.querySelectorAll('.corner-style-btn').forEach(btn => btn.classList.remove('border-blue-500', 'bg-blue-50'));
        document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('border-blue-500', 'bg-blue-50'));
        
        // Reset icon
        this.removeIcon();

        // Update UI
        this.updateStepContent();
        this.updateStepIndicators();
        this.updateNavigationButtons();
        this.updateContentPlaceholder();
        this.updateContentPreview();
        this.generateQR();
    }
}

// Initialize the QR Code Builder when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QRCodeBuilder();
});
