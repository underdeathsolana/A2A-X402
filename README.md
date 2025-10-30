# A2A X402 - Agent-to-Agent Payment Utility

Revolutionary token utility for AI agents to autonomously pay for API access, data feeds, and premium services.

## 🚀 Features

- **Autonomous AI Payments**: Enable AI agents to pay for services without human intervention
- **Solana-Powered**: Lightning-fast transactions with minimal fees
- **No Login Required**: Fully decentralized and trustless payment system
- **Universal Integration**: Works with any API, data feed, or AI model
- **Demo Ready**: Interactive payment demonstration

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Blockchain**: Solana Web3.js
- **Deployment**: Vercel-ready

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd a2a-X402-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🚢 Deployment to Vercel

1. **Push to GitHub**:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and deploy

3. **Environment Variables** (if needed):
   - Add any API keys or configuration in Vercel dashboard

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.js           # Root layout component
│   └── page.js             # Main homepage component
├── public/                 # Static assets
├── package.json           # Dependencies and scripts
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── postcss.config.js      # PostCSS configuration
```

## 🎯 Key Components

### Demo Payment Button
- Interactive payment simulation
- Loading states and success feedback
- Token balance management
- Realistic UX for AI agent payments

### Features Section
- Highlights key benefits for AI agents
- Responsive grid layout
- Hover animations and effects

### Use Cases & Pricing
- Real-world application examples
- Transparent pricing structure
- Call-to-action elements

## 🎨 Design Features

- **Brand Logo Integration**: Custom A2A logo throughout the site
- **Dynamic Background**: Multi-layered animated background with logo watermarks
- **Brand Colors**: Purple, blue, cyan, teal gradient color scheme
- **Glass Morphism**: Modern frosted glass effects
- **Gradient Text**: Eye-catching brand-colored typography  
- **Glow Effects**: Brand-specific lighting and shadow effects
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Mobile-first approach
- **Logo Animations**: Interactive floating and scaling logo effects

## 🔧 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```js
colors: {
  primary: { /* Your primary colors */ },
  accent: { /* Your accent colors */ },
  dark: { /* Your dark theme colors */ }
}
```

### Content
Update text, pricing, and features in `app/page.js`:
- Modify `features` array for different benefits
- Update `useCases` for pricing and services
- Change hero text and descriptions

### Animations
Customize animations in `tailwind.config.js`:
```js
animation: {
  'float': 'float 6s ease-in-out infinite',
  'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
}
```

## 🌐 Integration Ideas

### Solana Wallet Connection
Add real Solana wallet integration:
```js
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
```

### API Integration
Connect to real payment processors:
```js
const processPayment = async (amount) => {
  // Your payment processing logic
  const response = await fetch('/api/payment', {
    method: 'POST',
    body: JSON.stringify({ amount, service: 'premium-api' })
  })
  return response.json()
}
```

### AI Agent Integration
Example webhook for AI agents:
```js
// pages/api/agent-payment.js
export default async function handler(req, res) {
  const { agentId, service, amount } = req.body
  // Process autonomous payment
  // Return access token or service credentials
}
```

## 📱 Mobile Optimization

The website is fully responsive with:
- Mobile-first design approach
- Touch-friendly interactive elements
- Optimized typography scaling
- Adaptive layouts for all screen sizes

## ⚡ Performance

- **Next.js 14**: Latest performance optimizations
- **Image Optimization**: Automatic WebP conversion
- **Code Splitting**: Automatic route-based splitting
- **CSS Optimization**: Tailwind CSS purging

## 🔒 Security Considerations

- No sensitive data stored client-side
- Environment variables for API keys
- HTTPS enforcement in production
- Content Security Policy headers

## 📈 Analytics Integration

Add analytics to track user interactions:

```js
// Add to layout.js
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="GA_MEASUREMENT_ID" />
      </body>
    </html>
  )
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Join our community Discord

---

**Built with ❤️ for the future of autonomous AI payments**