import React, { useState, useEffect, useRef } from 'react';
import { INVITATION_DATA } from './invitationData';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [doves, setDoves] = useState([]);
  const [countdown, setCountdown] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  const audioRef = useRef(null);

  // Countdown timer calculation
  useEffect(() => {
    function calcTime() {
      const target = new Date(INVITATION_DATA.schedule.targetDateTime).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0')
      });
    }

    calcTime();
    const interval = setInterval(calcTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle music toggle
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Audio play prevented', err);
      });
    }
  };

  // Trigger envelope opening (Large flock of 14 doves)
  const handleOpenEnvelope = () => {
    // 1. Play background music
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.warn(err));
    }

    // 2. Launch large flock of flying doves across the sky
    const flock = [
      { id: 1, left: '46%', top: '50%', scale: 0.8, anim: 'flyDoveLeftMid 3.4s cubic-bezier(0.2, 0.8, 0.4, 1) forwards 0s' },
      { id: 2, left: '50%', top: '48%', scale: 1.05, anim: 'flyDoveCenterUp 3.2s cubic-bezier(0.2, 0.8, 0.4, 1) forwards 0.15s' },
      { id: 3, left: '53%', top: '51%', scale: 0.85, anim: 'flyDoveRightMid 3.6s cubic-bezier(0.2, 0.8, 0.4, 1) forwards 0.25s' },
      { id: 4, left: '42%', top: '46%', scale: 0.75, anim: 'flyDoveLeftFar 3.8s cubic-bezier(0.2, 0.8, 0.4, 1) forwards 0.35s' },
      { id: 5, left: '56%', top: '49%', scale: 0.9, anim: 'flyDoveRightFar 3.5s cubic-bezier(0.2, 0.8, 0.4, 1) forwards 0.45s' },
      { id: 6, left: '48%', top: '53%', scale: 1.15, anim: 'flyDoveCenterUp 3.3s cubic-bezier(0.2, 0.8, 0.4, 1) forwards 0.6s' },
      { id: 7, left: '44%', top: '47%', scale: 0.7, anim: 'flyDoveLeftMid 4.0s cubic-bezier(0.2, 0.8, 0.4, 1) forwards 0.75s' },
      { id: 8, left: '54%', top: '52%', scale: 0.8, anim: 'flyDoveRightMid 3.9s cubic-bezier(0.2, 0.8, 0.4, 1) forwards 0.85s' },
      { id: 9, left: '49%', top: '50%', scale: 1.1, anim: 'flyDoveCenterUp 3.4s cubic-bezier(0.2, 0.8, 0.4, 1) forwards 1.0s' },
      { id: 10, left: '41%', top: '48%', scale: 0.65, anim: 'flyDoveLeftFar 4.2s cubic-bezier(0.2, 0.8, 0.4, 1) forwards 1.15s' },
      { id: 11, left: '57%', top: '51%', scale: 0.75, anim: 'flyDoveRightFar 4.1s cubic-bezier(0.2, 0.8, 0.4, 1) forwards 1.25s' },
      { id: 12, left: '47%', top: '52%', scale: 0.95, anim: 'flyDoveLeftMid 3.7s cubic-bezier(0.2, 0.8, 0.4, 1) forwards 1.4s' },
      { id: 13, left: '52%', top: '49%', scale: 0.85, anim: 'flyDoveRightMid 3.8s cubic-bezier(0.2, 0.8, 0.4, 1) forwards 1.55s' },
      { id: 14, left: '50%', top: '51%', scale: 1.0, anim: 'flyDoveCenterUp 3.5s cubic-bezier(0.2, 0.8, 0.4, 1) forwards 1.7s' }
    ];
    setDoves(flock);

    // Clean up doves after flight
    setTimeout(() => {
      setDoves([]);
    }, 6000);

    // 3. Reveal the invitation sheet
    setIsOpened(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="royal-app" dir="rtl">
      {/* Background Audio */}
      <audio ref={audioRef} src={INVITATION_DATA.audioTrack} loop preload="auto" />

      {/* Floating Music Button (Matching screenshot) */}
      <button 
        className={`floating-music-btn ${isPlaying ? 'playing' : ''}`}
        onClick={toggleMusic}
        title={isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
      >
        <div className="music-bars">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Flying Doves Animation Layer */}
      {doves.length > 0 && (
        <div className="doves-flight-layer" aria-hidden="true">
          {doves.map(d => (
            <img 
              key={d.id}
              src="./assets/dove.png" 
              alt="حمامة بيضاء" 
              className="flying-dove-item"
              style={{
                left: d.left,
                top: d.top,
                animation: d.anim,
                transform: `scale(${d.scale})`
              }}
            />
          ))}
        </div>
      )}

      {/* ====================================================== */}
      {/* SCREEN 1: NEW ENVELOPE (MATCHING USER REFERENCE IMAGE) */}
      {/* ====================================================== */}
      <section className={`envelope-stage ${isOpened ? 'opened' : ''}`}>
        <div className="envelope-wrapper">
          <p className="envelope-top-subtitle">{INVITATION_DATA.envelopeHeader}</p>
          
          {/* Cursive Italic English Script Names */}
          <h1 className="envelope-names-script">
            {INVITATION_DATA.scriptNames}
          </h1>

          {/* Centered Envelope Image */}
          <div className="envelope-image-box" onClick={handleOpenEnvelope}>
            <img 
              src="./assets/new_envelope_clean.png" 
              alt="ظرف الخطوبة الملكي" 
              className="envelope-img" 
            />
          </div>

          {/* "Click here to open" exactly like user image */}
          <div className="click-to-open-text" onClick={handleOpenEnvelope}>
            Click <span className="underlined">here</span> to open
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* SCREEN 2: THE ROYAL INVITATION CARD (FULLSCREEN)       */}
      {/* ====================================================== */}
      <main className="invitation-fullscreen-container">
        <article className="invitation-sheet">

          {/* TOP-LEFT: Royal Curtain Drape (Anchored high so it never blocks text) */}
          <div className="header-drape-left">
            <img src="./assets/curtain.png" alt="ستارة مخملية فاخرة" />
          </div>

          {/* TOP-RIGHT: Elegant Rose Bouquet */}
          <div className="header-bouquet-right">
            <img src="./assets/bouquet.png" alt="باقة الورد الملكية" />
          </div>

          {/* MAIN INVITATION CONTENT (With plenty of top padding to breathe) */}
          <div className="sheet-inner">


            {/* 2. INVITATION WELCOME MESSAGE */}
            <p className="invitation-intro-msg invitation-english-intro">{INVITATION_DATA.welcomeMessage}</p>

            {/* CHIC DIVIDER */}
            <div className="chic-divider">
              <span className="divider-line"></span>
              <span className="divider-diamond"></span>
              <span className="divider-line"></span>
            </div>

            {/* 3. GROOM & BRIDE NAMES (BURGUNDY SCRIPT TYPOGRAPHY) */}
            <section className="names-container">
              <div className="person-block">
                <h2 className="person-title-script">{INVITATION_DATA.groom.name}</h2>
                <span className="person-role-tag">{INVITATION_DATA.groom.subtitle}</span>
              </div>

              <div className="ampersand-sign">&amp;</div>

              <div className="person-block">
                <h2 className="person-title-script">{INVITATION_DATA.bride.name}</h2>
                <span className="person-role-tag">{INVITATION_DATA.bride.subtitle}</span>
              </div>
            </section>

            {/* CHIC DIVIDER */}
            <div className="chic-divider">
              <span className="divider-line"></span>
              <span className="divider-diamond"></span>
              <span className="divider-line"></span>
            </div>

            {/* 4. PHOTO GALLERY (SINGLE ELEGANT COUPLE PHOTO) */}
            <section className="photo-gallery-section">
              <h3 className="gallery-section-title">{INVITATION_DATA.gallery.title}</h3>

              <div className="single-photo-card">
                <img 
                  src={INVITATION_DATA.gallery.photoMainPortrait} 
                  alt="صورة العروسين الملكية" 
                />
              </div>
            </section>

            {/* CHIC DIVIDER */}
            <div className="chic-divider">
              <span className="divider-line"></span>
              <span className="divider-diamond"></span>
              <span className="divider-line"></span>
            </div>

            {/* 5. EVENT TIMING & DATE (MATCHING SCREENSHOT RHYTHM) */}
            <section className="event-timing-section">
              <p className="timing-intro-label">{INVITATION_DATA.schedule.headingEn}</p>
              <h3 className="timing-big-hour" dir="ltr" style={{ direction: 'ltr', display: 'inline-block' }}>
                {INVITATION_DATA.schedule.timeDisplay}
              </h3>

              <div className="timing-date-row">
                <span>{INVITATION_DATA.schedule.dateDayName}</span>
                <span>|</span>
                <span className="date-day-num">{INVITATION_DATA.schedule.dateDayNumber}</span>
                <span>|</span>
                <span>{INVITATION_DATA.schedule.dateMonthYear}</span>
              </div>

            </section>

            {/* CHIC DIVIDER */}
            <div className="chic-divider">
              <span className="divider-line"></span>
              <span className="divider-diamond"></span>
              <span className="divider-line"></span>
            </div>

            {/* 6. COUNTDOWN TIMER (MATCHING EXACT STYLE OF USER IMAGE 1) */}
            <section className="countdown-container-elegant">
              <h4 className="countdown-title-tag">— COUNTDOWN —</h4>
              <div className="countdown-grid-four">
                <div className="countdown-unit-col">
                  <span className="unit-number-serif">{countdown.days}</span>
                  <span className="unit-label-caps">DAYS</span>
                </div>
                <div className="countdown-unit-col">
                  <span className="unit-number-serif">{countdown.hours}</span>
                  <span className="unit-label-caps">HOURS</span>
                </div>
                <div className="countdown-unit-col">
                  <span className="unit-number-serif">{countdown.minutes}</span>
                  <span className="unit-label-caps">MINUTES</span>
                </div>
                <div className="countdown-unit-col">
                  <span className="unit-number-serif">{countdown.seconds}</span>
                  <span className="unit-label-caps">SECONDS</span>
                </div>
              </div>
            </section>

            {/* CHIC DIVIDER */}
            <div className="chic-divider">
              <span className="divider-line"></span>
              <span className="divider-diamond"></span>
              <span className="divider-line"></span>
            </div>

            {/* 7. LOCATION & GOOGLE MAPS */}
            <section className="location-elegant-section">
              <h4 className="location-title-tag">{INVITATION_DATA.location.title}</h4>
              <h3 className="venue-name-bold">{INVITATION_DATA.location.venueName}</h3>
              <p className="hotel-name-sub">{INVITATION_DATA.location.hotelName}</p>
              <p className="address-full-text">{INVITATION_DATA.location.address}</p>

              {/* Embedded Google Map (Square and Compact) */}
              <div className="map-frame-box-square">
                <iframe
                  src={INVITATION_DATA.location.mapEmbedIframe}
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Wedding Venue Location Map"
                ></iframe>
              </div>

              {/* Direct Maps App Button (IN ENGLISH AS REQUESTED) */}
              <a 
                href={INVITATION_DATA.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="view-map-link-btn"
              >
                <span>OPEN IN GOOGLE MAPS</span>
              </a>
            </section>

            {/* 8. NOSTALGIC CHILDHOOD LOCKET (GROOM & BRIDE) */}
            <div className="bottom-locket-container">
              <img 
                src="./assets/childhood_locket.png" 
                alt="عاصم وملك في الطفولة" 
                className="childhood-locket-img"
              />
            </div>

            {/* RE-OPEN ENVELOPE BUTTON (IN ENGLISH AS REQUESTED) */}
            <button 
              className="reopen-envelope-chip" 
              onClick={() => {
                setIsOpened(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>↩ RE-OPEN ENVELOPE</span>
            </button>

          </div>
        </article>
      </main>
    </div>
  );
}
