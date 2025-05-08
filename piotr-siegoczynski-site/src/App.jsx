import { useState } from 'react'
import logo from './assets/images/Piotr_Siegoczyński.jpg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [lang, setLang] = useState("pl")

  const translations = {
    pl: {
      title: "Piotr Siegoczyński",
      subtitle: "Mistrz Świata w Kickboxingu",
      quote: "Mistrzem nie zostajesz na ringu – tylko na treningu.",
      btnTraining: "Umów trening",
      btnStory: "Poznaj moją historię",
      block1: "🥇 Mistrz Świata",
      block1Desc: "Wieloletnie doświadczenie na arenie międzynarodowej",
      block2: "🧠 Trener i Mentor",
      block2Desc: "Praca z zawodnikami na różnych poziomach zaawansowania",
      block3: "🥊 30+ lat w kickboxingu",
      block3Desc: "Pasja i zaangażowanie w rozwój sportów walki",
      aboutTitle: "Poznaj moją historię",
      aboutText: "Od pierwszego treningu w małej sali do tytułu Mistrza Świata. Sport to dla mnie nie tylko technika – to droga, która uczy pokory, siły i determinacji.",
      readMore: "Czytaj więcej",
      navHome: "Strona Główna",
      navAbout: "O mnie",
      navTraining: "Treningi",
      navContact: "Kontakt",
    },
    en: {
      title: "Piotr Siegoczyński",
      subtitle: "World Kickboxing Champion",
      quote: "A champion isn’t made in the ring – they’re made in training.",
      btnTraining: "Book a Training",
      btnStory: "Discover My Story",
      block1: "🥇 World Champion",
      block1Desc: "Years of experience on the international stage",
      block2: "🧠 Coach and Mentor",
      block2Desc: "Working with athletes at all skill levels",
      block3: "🥊 30+ Years in Kickboxing",
      block3Desc: "Passion and dedication to the growth of combat sports",
      aboutTitle: "Discover My Story",
      aboutText: "From my first training session in a small gym to becoming a World Champion. For me, sport is not just about technique – it's a journey that teaches humility, strength, and determination.",
      readMore: "Read More",
      navHome: "Home",
      navAbout: "About",
      navTraining: "Training",
      navContact: "Contact",
    }
  };

  const t = translations[lang]

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <span className="logo">{t.title}</span>
        </div>
        <ul className="navbar-menu">
          <li><a href="#home">{t.navHome}</a></li>
          <li><a href="#about">{t.navAbout}</a></li>
          <li><a href="#training">{t.navTraining}</a></li>
          <li><a href="#contact">{t.navContact}</a></li>
        </ul>
        <div className="language-switcher">
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="pl">🇵🇱 PL</option>
            <option value="en">🇬🇧 EN</option>
          </select>
        </div>
      </nav>

      <main className="main">
        <section id="home" className="hero">
          <div className="hero-overlay"></div>
          <div className="hero-bg-video">
            <iframe width="951" height="535" src="https://www.youtube.com/embed/B8KQX6zDZmo?autoplay=1"
              title="Piotr Siegoczyński o 7 edycji DSF Kickboxing Challenge"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen>
            </iframe>
          </div>

          <div className="hero-content">
            <h1>{t.title}</h1>
            <p className="subtitle">{t.subtitle}</p>
            <p className="quote">“{t.quote}”</p>
            <div className="hero-buttons">
              <button className="primary-btn">{t.btnTraining}</button>
              <button className="secondary-btn">{t.btnStory}</button>
            </div>
          </div>
        </section>

        <section id="training" className="power-blocks">
          <div>
            <h3>{t.block1}</h3>
            <p>{t.block1Desc}</p>
          </div>
          <div>
            <h3>{t.block2}</h3>
            <p>{t.block2Desc}</p>
          </div>
          <div>
            <h3>{t.block3}</h3>
            <p>{t.block3Desc}</p>
          </div>
        </section>

        <section id="about" className="about">
          <img src={logo} alt="Piotr Siegoczyński" className="about-image" />
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutText}</p>
          <button className="read-more-btn">{t.readMore}</button>
        </section>

        <section id="contact" className="contact">
  <h2>{lang === "pl" ? "Kontakt" : "Contact"}</h2>
  <p>
    {lang === "pl"
      ? "Skontaktuj się ze mną w sprawie treningów, współpracy lub wydarzeń"
      : "Contact me for training, collaborations or events"}
  </p>

  <div className="contact-grid">
    {/* Contact Info */}
    <div className="contact-info">
      <p>📩 <strong>E-mail</strong><br />
        <a href="mailto:kontakt@piotrsiegoczynski.pl">kontakt@piotrsiegoczynski.pl</a>
      </p>
      <p>📱 <strong>{lang === "pl" ? "Telefon" : "Phone"}</strong><br />
        <a href="tel:+48123456789">+48 123 456 789</a>
      </p>
      <p>📍 <strong>{lang === "pl" ? "Lokalizacja" : "Location"}</strong><br />
        Warsaw, Poland
      </p>
    </div>

    {/* Contact Form */}
    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
      <input type="text" placeholder={lang === "pl" ? "Imię i nazwisko" : "Your name"} required />
      <input type="email" placeholder="Email" required />
      <textarea placeholder={lang === "pl" ? "Wiadomość" : "Message"} required></textarea>
      <button type="submit">{lang === "pl" ? "Wyślij wiadomość" : "Send Message"}</button>
    </form>

    {/* Google Map */}
    <div className="contact-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.6350600298057!2d21.01222921579972!3d52.22967517975814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc669dd06e09%3A0xe7fef3fd29db0c0b!2sWarsaw%2C%20Poland!5e0!3m2!1sen!2spl!4v1683552368729!5m2!1sen!2spl"
        width="100%"
        height="250"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  </div>
</section>
      </main>
    </>
  )
}

export default App
