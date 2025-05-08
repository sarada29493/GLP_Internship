import { useState } from 'react'
import logo from './assets/images/Piotr_Siegoczyński.jpg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
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
    }
  };
  const [lang, setLang] = useState("pl");
  const t = translations[lang];
  return (
    <main className="main">
      <div className="language-switcher">
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="pl">🇵🇱 PL</option>
          <option value="en">🇬🇧 EN</option>
        </select>
      </div>

      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-bg-video">
        <iframe width="951" height="535" src="https://www.youtube.com/embed/B8KQX6zDZmo?autoplay=1"
 title="Piotr Siegoczyński o 7 edycji DSF Kickboxing Challenge" 
 frameborder="0" 
 allow="autoplay; encrypted-media"  
 allowfullscreen>
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

      <section className="power-blocks">
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

      <section className="about">
        <img src={logo} alt="Piotr Siegoczyński" className="about-image" />
        <h2>{t.aboutTitle}</h2>
        <p>{t.aboutText}</p>
        <button className="read-more-btn">{t.readMore}</button>
      </section>
    </main>
  );
}

export default App
