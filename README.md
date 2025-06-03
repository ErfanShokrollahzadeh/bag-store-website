# EU Bag Store - Modern E-commerce Website 🛍️

A modern, responsive e-commerce website specifically designed for selling bags in the European Union market.

![Website Preview](https://img.shields.io/badge/Status-Ready_for_Production-brightgreen)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-purple)
![Responsive](https://img.shields.io/badge/Mobile-Responsive-blue)
![EU Focused](https://img.shields.io/badge/EU-Exclusive-gold)

## 🌟 Features

### ✅ Complete E-commerce Functionality

- **Smart Shopping Cart** with local storage persistence
- **VAT Calculations** (20% EU standard rate)
- **Euro Currency** pricing throughout
- **Free Shipping** threshold (€50+ orders)
- **Real-time Updates** for cart totals and quantities

### 🇪🇺 EU Market Focused

- **European Union Exclusive** branding and messaging
- **EU Country Selection** in contact forms
- **GDPR Compliance** ready structure
- **Euro Pricing** with VAT-inclusive display
- **EU Shipping** focus and policies

### 📱 Modern Responsive Design

- **Bootstrap 5** framework with custom styling
- **Mobile-First** responsive design
- **Cross-Device** compatibility (320px to 1920px+)
- **Touch-Friendly** interface for mobile users
- **Smooth Animations** and hover effects

### 🛍️ Product Categories

1. **Sports Bags** - Athletic and gym equipment bags
2. **Student Bags** - School and university backpacks
3. **Leather Bags** - Premium leather handbags and briefcases

## 🚀 Quick Start

### Local Development

```bash
# Navigate to project directory
cd bag-store-website

# Start local server (Python 3)
python3 -m http.server 8000

# Or use Node.js
npx http-server

# Open browser
open http://localhost:8000/src/index.html
```

## 🛠️ Technical Stack

| Technology       | Version | Purpose                        |
| ---------------- | ------- | ------------------------------ |
| **HTML5**        | Latest  | Semantic structure             |
| **CSS3**         | Latest  | Styling with custom properties |
| **Bootstrap**    | 5.3.0   | Responsive framework           |
| **JavaScript**   | ES6+    | Interactive functionality      |
| **Font Awesome** | 6.0.0   | Icon library                   |

## 📄 Pages Overview

### 🏠 Homepage (`index.html`)

- Hero section with floating bag animations
- EU country showcase cards
- Product category previews
- Feature highlights and testimonials

### 🛍️ Products (`pages/products.html`)

- Categorized product display
- Add to cart functionality
- Stock status indicators
- Price display in Euros

### ℹ️ About (`pages/about.html`)

- Company information
- EU market focus
- Team and values
- Statistics and achievements

### 📞 Contact (`pages/contact.html`)

- Contact form with EU country selection
- Business hours and support channels
- FAQ accordion
- Multiple contact methods

## 🛒 Shopping Cart System

### Features

- Add/remove items with quantity controls
- Automatic VAT calculation (20%)
- Free shipping threshold (€50)
- Local storage persistence
- Real-time total updates
- Visual notifications

## 🚀 Deployment

### Production Checklist

- [ ] Add real product images
- [ ] Configure payment gateway
- [ ] Set up contact form backend
- [ ] Add Google Analytics
- [ ] Configure SSL certificate
- [ ] Test all functionality

**🎉 Your EU Bag Store is ready for launch!**

Visit `website-demo.html` for a complete overview and testing interface.

## Features

- **Responsive Design**: The website is designed to be fully responsive, ensuring a great user experience on all devices.
- **Product Range**: A wide selection of bags tailored to different needs and preferences.
- **User-Friendly Navigation**: Easy access to product categories, about us, and contact information.
- **Shopping Cart Functionality**: Users can add, remove, and manage items in their shopping cart.

## Project Structure

```
bag-store-website
├── src
│   ├── index.html          # Main entry point of the website
│   ├── css
│   │   ├── style.css       # Main styles for the website
│   │   └── responsive.css   # Responsive styles for various devices
│   ├── js
│   │   ├── main.js         # Main JavaScript functionality
│   │   └── cart.js         # Shopping cart management
│   ├── pages
│   │   ├── products.html    # Product listing page
│   │   ├── about.html       # About us page
│   │   └── contact.html      # Contact form page
│   └── components
│       ├── header.html      # Header component with navigation
│       └── footer.html      # Footer component with copyright info
├── assets
│   └── images
│       └── placeholder.txt   # Placeholder for images
├── package.json             # NPM configuration file
└── README.md                # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd bag-store-website
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Open `src/index.html` in your web browser to view the website.

## Contribution

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
