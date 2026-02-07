# ⚙️ Clockwork Atelier - Portfolio Website

<p align="center">
   <img src="logo.svg" alt="Clockwork Atelier logo" width="120" height="120" />
</p>

Live Demo: https://anilkumarputta.github.io/Clockwork-Atelier/

> *"From any corner of the world, a good idea finds its way to the workshop."*

Hey there! Welcome to my portfolio repository. This is where I showcase my work in mechanical design, restoration, and sculptural builds - all with that steampunk aesthetic I absolutely love.

## 📸 Screenshots
<img width="1863" height="935" alt="Screenshot 2026-02-07 140739" src="https://github.com/user-attachments/assets/bc65590c-1403-46a4-a19e-43365b7afab1" />
<img width="1856" height="921" alt="Screenshot 2026-02-07 140810" src="https://github.com/user-attachments/assets/523a666f-16bd-4d3e-a86b-0da4edb38db6" />
<img width="1861" height="924" alt="Screenshot 2026-02-07 140843" src="https://github.com/user-attachments/assets/24532438-e831-49d9-8d85-490354e6ffb0" />
<img width="1872" height="930" alt="Screenshot 2026-02-07 140908" src="https://github.com/user-attachments/assets/17b56d35-7e54-4ddf-84db-327345b508a4" />


## 🎨 What's This All About?

This is my personal portfolio website where I share my passion for creating intricate mechanical art pieces, clockwork mechanisms, and brass sculptures. Whether it's restoring vintage timepieces or building something entirely new from gears and imagination, this site is a window into my workshop.

The design itself is inspired by the industrial revolution era - lots of brass tones, mechanical elements, and that warm vintage feel that makes you want to reach out and turn a gear.

## ✨ Features

- **Featured Project Card**: A hero spotlight with a short story and call-to-action
- **Interactive Portfolio**: Filter projects by category (Gears, Restoration, Sculpture) and open images in a lightbox
- **Tools & Materials Strip**: Quick scan of brass, steel, engraving, and restoration capabilities
- **Preloaded Hero & Top Projects**: Faster initial visual impact
- **Smooth Animations**: Scroll-based reveals powered by Intersection Observer
- **Responsive Design**: Looks great across desktop, tablet, and mobile
- **Contact Form**: Powered by EmailJS for collaboration and commission requests
- **Dark Theme**: Brass-toned palette tuned for the steampunk aesthetic

## 🛠️ Built With

- **HTML5** - Structure and semantic markup
- **CSS3** - All those brass borders and smooth transitions
- **Vanilla JavaScript** - Keeping it simple and fast
- **EmailJS** - For the contact form functionality
- **Intersection Observer API** - For those smooth scroll animations

## 📂 Project Structure

```
Clockwork-Atelier/
├── index.html              # Main HTML file
├── styles.css              # All the styling magic
├── animations.js           # Scroll animations and interactions
├── email.js                # Contact form handling
└── images/                 # Project screenshots and assets
```

## 🚀 Getting Started

Want to run this locally? It's super easy:

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anilkumarputta/Clockwork-Atelier.git
   ```

2. **Navigate to the project folder**
   ```bash
   cd Clockwork-Atelier
   ```

3. **Open in your browser**
   ```bash
   # Just open index.html in your favorite browser
   # Or use a local server (recommended):
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

That's it! No build process, no npm installs - just pure web goodness.

## 📧 Contact Form Setup

If you want to use the contact form, you'll need to set up EmailJS:

1. Create a free account at [EmailJS](https://www.emailjs.com/)
2. Set up an email service
3. Create an email template
4. Update the credentials in `email.js`:
   ```javascript
   emailjs.init("YOUR_USER_ID");
   // and update service and template IDs
   ```

## 🎯 Features Breakdown

### Smooth Scroll Animations
Elements fade and slide into view as you scroll - adds that extra polish to the experience.

### Portfolio Filtering
Click on any category (All, Gears, Restoration, Sculpture) to filter projects. Simple but effective.

### Responsive Navigation
The header smoothly appears/disappears based on scroll direction. No clutter, just what you need.

### Form Validation
The contact form includes basic validation and bot protection (that "I am not a bot" checkbox).

## 🌟 Highlights

- **No dependencies** - Except for EmailJS, everything is vanilla
- **Fast loading** - Optimized images and minimal code
- **Clean code** - Organized, commented, and easy to modify
- **Accessible** - Semantic HTML and proper ARIA labels
- **SEO friendly** - Meta tags and proper structure

## 🔧 Customization

Want to make it your own? Here's where to look:

- **Colors**: Check out the CSS variables in `styles.css` (top of the file)
- **Content**: All text is in `index.html` - easy to find and edit
- **Projects**: Update the portfolio section in `index.html`
- **Animations**: Tweak timing and effects in `animations.js`

## 📝 To-Do List

- [ ] Add a blog section for project write-ups
- [x] Implement a lightbox for project images
- [ ] Add more project categories
- [ ] Create a timeline of work history
- [ ] Add dark/light theme toggle

## 🤝 Contributing

This is my personal portfolio, but if you spot a bug or have a suggestion, feel free to open an issue! I'm always open to learning and improving.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💬 Let's Connect

I'm always open to collaborations, commissions, and portfolio reviews. Whether you're looking to build something unique or just want to chat about mechanical art, don't hesitate to reach out!

- **Website**: [https://anilkumarputta.github.io/Clockwork-Atelier/](https://anilkumarputta.github.io/Clockwork-Atelier/)
- **GitHub**: [@Anilkumarputta](https://github.com/Anilkumarputta)
- **LinkedIn**: [Anil Putta](http://linkedin.com/in/anil-putta)
- **Email**: Through the contact form on the site

---

*"We build with people in mind. Every mechanism grows from collaboration and the stories clients bring into the atelier."*

**- Anil Kumar**

---

Made with ⚙️ and lots of coffee in the workshop
