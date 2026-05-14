import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCertifications } from '../api/client';
import { useSettings } from '../components/Layout';

export default function About() {
  const s = useSettings();
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    getCertifications().then(r => setCerts(r.data)).catch(() => {});
  }, []);

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>About Us</span></div>
          <h1>About {s.company_name || 'Panas Pharmaceuticals'}</h1>
          <p>Our story, our mission, and our unwavering commitment to the health of Nepal</p>
        </div>
      </div>

      <section className="content-section" style={{ background:'#fff' }}>
        <div className="content-inner">
          <div className="about-grid">
            <div>
              <div className="section-tag">Our Overview</div>
              <h2 className="section-title">A Legacy of <span>Healthcare Excellence</span></h2>
              <p style={{ color:'var(--text-light)', lineHeight:'1.9', marginBottom:'20px' }}>{s.about_full || 'Panas Pharmaceutical P. Ltd. was established with a clear and noble purpose — to make quality, affordable medicines accessible to every Nepali.'}</p>
              <p style={{ color:'var(--text-light)', lineHeight:'1.9', marginBottom:'20px' }}>Our name, <strong style={{ color:'var(--primary)' }}>Panas</strong> (meaning "lamp"), reflects our philosophy — we strive to light the way to better health for our communities. Every product we manufacture is guided by this vision.</p>
              <p style={{ color:'var(--text-light)', lineHeight:'1.9', marginBottom:'30px' }}>Today, Panas operates four specialized divisions — <strong>Kalash</strong>, <strong>nuZEN</strong>, <strong>Spandan</strong>, and <strong>General</strong> — catering to a broad spectrum of healthcare needs.</p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
                {[{ icon:'🏭', val: String(s.established_year || 1995), label:'Year Established' },{ icon:'🌏', val:'Banke', label:'Head Office Location' },{ icon:'💊', val:'200+', label:'Registered Products' },{ icon:'🏆', val:`${certs.length || 5} Certs`, label:'WHO, ISO, GMP' }].map(item => (
                  <div key={item.label} className="card" style={{ textAlign:'center', padding:'20px' }}>
                    <div style={{ fontSize:'2rem', marginBottom:'8px' }}>{item.icon}</div>
                    <strong style={{ color:'var(--primary)', display:'block', fontSize:'1.4rem' }}>{item.val}</strong>
                    <span style={{ fontSize:'0.82rem', color:'var(--text-light)' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-img">
              <img src="/images/factory.png" alt="Panas Manufacturing Facility" />
              <div className="about-img-badge">🏭 Banke, Nepal HQ</div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section" style={{ background:'var(--bg)' }}>
        <div className="content-inner">
          <div style={{ textAlign:'center', marginBottom:'50px' }}>
            <div className="section-tag">Our Direction</div>
            <h2 className="section-title">Mission, Vision &amp; <span>Values</span></h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'24px' }}>
            {[
              { icon:'🎯', color:'var(--primary)', borderColor:'var(--primary)', title:'Our Mission', text: s.mission || "To manufacture and deliver high-quality, safe, and effective pharmaceutical products." },
              { icon:'🔭', color:'var(--accent-dark)', borderColor:'var(--accent)', title:'Our Vision', text: s.vision || '"To live healthy and enjoy life to the fullest every day."' },
              { icon:'💚', color:'var(--green)', borderColor:'var(--green)', title:'Our Values', text: s.values || 'Quality, Integrity, Innovation, and Community.' },
            ].map(c => (
              <div key={c.title} className="card" style={{ borderTop:`4px solid ${c.borderColor}` }}>
                <div style={{ fontSize:'2.5rem', marginBottom:'16px' }}>{c.icon}</div>
                <h3 style={{ color:c.color, fontFamily:"'Outfit',sans-serif", fontSize:'1.3rem', marginBottom:'12px' }}>{c.title}</h3>
                <p style={{ color:'var(--text-light)', lineHeight:'1.8' }}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section" style={{ background:'#fff' }}>
        <div className="content-inner">
          <div style={{ textAlign:'center', marginBottom:'50px' }}>
            <div className="section-tag">Quality Standards</div>
            <h2 className="section-title">Our <span>Certifications</span></h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'20px' }}>
            {(certs.length > 0 ? certs : [
              { id:1, icon:'🏅', short_name:'WHO-GMP', description:'World Health Organization Good Manufacturing Practices' },
              { id:2, icon:'📋', short_name:'ISO 9001:2015', description:'Quality Management System Certification' },
              { id:3, icon:'🌿', short_name:'ISO 14001:2015', description:'Environmental Management System Certification' },
              { id:4, icon:'✅', short_name:'CGMP', description:'Current Good Manufacturing Practice Compliant' },
            ]).map(cert => (
              <div key={cert.id} className="card" style={{ textAlign:'center', padding:'30px 20px' }}>
                <div style={{ fontSize:'2.5rem', marginBottom:'12px' }}>{cert.icon}</div>
                <h4 style={{ color:'var(--primary)', marginBottom:'8px' }}>{cert.short_name}</h4>
                <p style={{ fontSize:'0.82rem', color:'var(--text-light)' }}>{cert.description || cert.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="contact-strip">
        <h2>Want to Know More?</h2>
        <p>Reach out to our team — we're happy to answer any questions.</p>
        <div className="contact-strip-btns"><Link to="/contact" className="btn btn-dark">Contact Us Today</Link></div>
      </div>
    </>
  );
}
