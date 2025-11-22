# 🎉 Anniversary Wish Website - Customization Guide

## ✨ How to Add Your Sister's and Spouse's Names

Open `index.html` and find these lines (around line 15-16):

```html
<div class="floating-name name-1" data-name="sister">Your Sister's Name</div>
<div class="floating-name name-2" data-name="spouse">&amp; Spouse's Name</div>
```

**Replace:**
- `Your Sister's Name` with your sister's actual name
- `Spouse's Name` with her spouse's actual name

**Example:**
```html
<div class="floating-name name-1" data-name="sister">Sarah</div>
<div class="floating-name name-2" data-name="spouse">&amp; Michael</div>
```

## 🎨 Features Included

### 1. **Floating Names Animation**
- Names float beautifully in the air
- When you click "REVEAL WISH", they settle into place with sparkle trails
- Massive sparkle burst when they reach their destination

### 2. **Mobile-Optimized Design**
- Gorgeous gradient backgrounds
- High contrast colors for easy reading
- Touch-friendly button sizes (minimum 48px)
- Responsive layout that works perfectly on all phone sizes

### 3. **Enhanced Visual Effects**
- **Vibrant Color Palette**: Hot pink (#FF006E), electric purple (#8A2BE2), bright gold (#FFD700)
- **Animated Gradients**: Background shifts between colors
- **Glowing Text**: Pulsing glow effects on headings
- **Rainbow Borders**: Modal and button borders cycle through colors
- **Canvas Sparkles**: Real-time particle system with glowing sparkles

### 4. **Confetti & Sparkles**
- 350+ confetti particles on reveal
- Multiple burst patterns from different angles
- Canvas-based sparkle system with 5 vibrant colors
- Continuous sparkle rain effect

### 5. **Floating Emojis**
- Hearts and celebration emojis float continuously in background
- 10 different emoji types
- Randomized sizes and timing for natural effect

### 6. **Touch Feedback**
- Visual feedback when touching buttons on mobile
- Ripple effects on click
- Sparkle burst at touch location

## 🎨 Color Customization

Want to change colors? Edit `src/css/variables.css`:

```css
--primary-color: #FF006E; /* Hot Pink */
--secondary-color: #8A2BE2; /* Purple */
--accent-color: #FFD700; /* Gold */
```

## 📱 Testing on Mobile

1. Open the website on your phone
2. The design is optimized for portrait mode
3. Click "REVEAL WISH" to see the magic!
4. Names float down with sparkles
5. Modal opens with enhanced animations

## 🌟 Special Effects

- **Glow Pulse**: Text glows and pulses
- **Button Shine**: Shimmer effect across button
- **Modal Bounce**: Modal enters with bounce animation
- **Sparkle Trails**: Names leave sparkle trails as they settle
- **Heart Pulse**: Hearts beat rhythmically

## 🎯 Browser Support

Works best on:
- Chrome (Mobile & Desktop)
- Safari (iOS)
- Firefox
- Edge

## 💝 Tips for Best Experience

1. **Use on mobile phone** for the full responsive experience
2. **Portrait orientation** is optimal
3. **Good lighting** helps see the vibrant colors
4. **Share** with your sister for the surprise!

## 🚀 How to Open

1. Double-click `index.html` 
2. Or use a local server for best results

Enjoy the celebration! 🎉✨💖
