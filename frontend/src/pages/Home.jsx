import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDivisions, getNews, getStats, getCertifications } from '../api/client';
import { useSettings } from '../components/Layout';

export default function Home() {
  const s = useSettings();
  const [divisions, setDivisions] = useState([]);
  const [news, setNews] = useState([]);
  const [certs, setCerts] = useState([]);
  const [stats, setStats] = useState({ years: 25, products: 200, divisions: 4, certifications: 5 });

  useEffect(() => {
    getDivisions().then(r => setDivisions(r.data)).catch(() => {});
    getNews().then(r => setNews(r.data)).catch(() => {});
    getStats().then(r => setStats(r.data)).catch(() => {});
    getCertifications().then(r => setCerts(r.data)).catch(() => {});
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-shapes">
          <div className="circle" /><div className="circle" /><div className="circle" />
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-tag">Nepal's Premier Pharmaceutical Manufacturer</div>
            <h1>{s.hero_heading ? (
              <>
                {s.hero_heading.split(' ').slice(0, 4).join(' ')}<br />
                <span>{s.hero_heading.split(' ').slice(4).join(' ')}</span>
              </>
            ) : (
              <>Lighting the Lamp for<br /><span>Living a Healthy Life</span></>
            )}</h1>
            <p>{s.hero_subtext || 'Panas Pharmaceutical P. Ltd. has been delivering safety and peace of mind through health care products manufactured under the highest international standards since 1995.'}</p>
            <div className="hero-btns">
              <Link to="/products" className="btn btn-primary">🧪 Explore Products</Link>
              <Link to="/about" className="btn btn-outline">Learn About Us →</Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><span className="num">{stats.years}+</span><span className="label">Years</span></div>
              <div className="hero-stat"><span className="num">{stats.products}+</span><span className="label">Products</span></div>
              <div className="hero-stat"><span className="num">{stats.divisions}</span><span className="label">Divisions</span></div>
              <div className="hero-stat"><span className="num">ISO</span><span className="label">Certified</span></div>
            </div>
          </div>
          <div className="hero-card-group">
            {(divisions.length > 0 ? divisions : [
              { id:1, slug:'kalash', icon:'🏺', name:'Kalash', description:'Ayurvedic & herbal formulations' },
              { id:2, slug:'nuzen', icon:'🧠', name:'nuZEN', description:'Nutraceuticals & wellness products' },
              { id:3, slug:'spandan', icon:'❤️', name:'Spandan', description:'Cardiovascular healthcare range' },
              { id:4, slug:'general', icon:'💊', name:'General', description:'Allopathic pharmaceutical products' },
            ]).map(d => (
              <Link key={d.id} to={`/products?div=${d.slug}`} className="hero-division-card">
                <div className="icon">{d.icon}</div>
                <div>
                  <h3>{d.name} Division</h3>
                  <p>{d.description.length > 50 ? d.description.slice(0, 50) + '...' : d.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CERT STRIP — Dynamic */}
      <div className="cert-strip">
        {(certs.length > 0 ? certs.map(c => (
          <div key={c.id} className="cert-badge"><span className="dot" />{c.short_name}</div>
        )) : (
          ['WHO-GMP Certified','ISO 9001:2015','ISO 14001:2015','CGMP Compliant','Nepal Pharma Standard'].map(c => (
            <div key={c} className="cert-badge"><span className="dot" />{c}</div>
          ))
        ))}
      </div>

      {/* ABOUT */}
      <section style={{ background: '#fff' }}>
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-img">
              <img src="/images/factory.png" alt="Panas Pharmaceutical Manufacturing Facility" />
              <div className="about-img-badge">🏭 State-of-the-Art GMP Facility</div>
            </div>
            <div>
              <div className="section-tag">About Panas</div>
              <h2 className="section-title">30 Years of <span>Pharmaceutical Excellence</span></h2>
              <p className="section-subtitle">{s.about_short || 'From a humble beginning in Banke, Nepal, Panas Pharmaceuticals has grown into one of Nepal\'s most trusted names in healthcare manufacturing.'}</p>
              <div className="about-features">
                {[
                  { icon: '🏆', title: 'International Certifications', desc: 'Manufactured under strict WHO, CGMP, ISO 9001 and ISO 14001 guidelines ensuring world-class quality.' },
                  { icon: '🌱', title: 'Sustainable Manufacturing', desc: 'Committed to environmental responsibility — ISO 14001 certified for our green manufacturing practices.' },
                  { icon: '🤝', title: 'Community First', desc: 'Deeply rooted in the Banke community, creating employment and improving public health access across Nepal.' },
                ].map(f => (
                  <div key={f.title} className="about-feature">
                    <div className="feature-icon">{f.icon}</div>
                    <div className="feature-text"><h4>{f.title}</h4><p>{f.desc}</p></div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn btn-primary">Read Our Story →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* DIVISIONS — Dynamic */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="section-inner">
          <div className="section-tag">Our Divisions</div>
          <h2 className="section-title">Four Specialized <span>Product Divisions</span></h2>
          <p className="section-subtitle">Each division is dedicated to a unique therapeutic area, ensuring focused expertise and uncompromising quality.</p>
          <div className="divisions-grid">
            {(divisions.length > 0 ? divisions : [
              { id:1, slug:'kalash', icon:'🏺', name:'Kalash', color:'#8e44ad', description:'Traditional Ayurvedic and herbal formulations blending ancient wisdom with modern pharmaceutical science for holistic healing.' },
              { id:2, slug:'nuzen', icon:'🧠', name:'nuZEN', color:'#27ae60', description:'Premium nutraceuticals, dietary supplements, and wellness products designed to support an active and balanced lifestyle.' },
              { id:3, slug:'spandan', icon:'❤️', name:'Spandan', color:'#e74c3c', description:'Cardiovascular and vital healthcare products, focused on supporting heart health and circulatory system well-being.' },
              { id:4, slug:'general', icon:'💊', name:'General', color:'#035faa', description:'A comprehensive range of essential allopathic pharmaceutical products covering a wide spectrum of therapeutic categories.' },
            ]).map(d => (
              <Link key={d.id} to={`/products?div=${d.slug}`} className="division-card" style={{ '--card-color': d.color }}>
                <div className="division-icon">{d.icon}</div>
                <h3>{d.name}</h3>
                <p>{d.description}</p>
                <div className="division-arrow">Explore {d.name} →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card"><div><span className="num">{stats.years}</span><span className="unit">+</span></div><div className="label">Years in Operation</div></div>
          <div className="stat-card"><div><span className="num">{stats.products}</span><span className="unit">+</span></div><div className="label">Registered Products</div></div>
          <div className="stat-card"><div><span className="num">{stats.divisions}</span></div><div className="label">Specialized Divisions</div></div>
          <div className="stat-card"><div><span className="num">{stats.certifications}</span><span className="unit">★</span></div><div className="label">International Certifications</div></div>
        </div>
      </section>

      {/* R&D HIGHLIGHT */}
      <section style={{ background: '#fff' }}>
        <div className="section-inner">
          <div className="about-grid">
            <div>
              <div className="section-tag">Research &amp; Development</div>
              <h2 className="section-title">Innovation at the<br /><span>Heart of Panas</span></h2>
              <p style={{ color: 'var(--text-light)', marginBottom: '24px', lineHeight: '1.9' }}>Our dedicated R&amp;D department continuously works on developing new formulations, improving existing products, and adopting cutting-edge pharmaceutical technologies.</p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
                {['In-house formulation development lab','Quality Control & Assurance testing','Stability testing facilities','Collaboration with research institutions'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: '700' }}>✔</span><span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/randd" className="btn btn-primary">Our R&amp;D Journey →</Link>
            </div>
            <div className="about-img">
              <img src="/images/randd.png" alt="Panas R&D Laboratory" />
              <div className="about-img-badge">🔬 Dedicated R&amp;D Lab</div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS — Dynamic */}
      <section style={{ background: 'var(--bg-white)' }}>
        <div className="section-inner">
          <div className="section-tag">Latest Updates</div>
          <h2 className="section-title">News &amp; <span>Announcements</span></h2>
          <p className="section-subtitle">Stay updated with the latest happenings at {s.company_name || 'Panas Pharmaceutical'}.</p>
          <div className="news-grid">
            {(news.length > 0 ? news.slice(0, 3) : [
              { id:1, tag_display:'New Product', title:'Spandan Division Expands Its Product Line', body:'New Spandan cardiovascular products launched for FY 2081/82.' },
              { id:2, tag_display:'Certification', title:'ISO 14001:2015 Certification Renewed', body:'Commitment to environmental responsibility continues.' },
              { id:3, tag_display:'Careers', title:'We Are Hiring -- Join the Panas Family', body:'View open positions on our Careers page.' },
            ]).map(n => (
              <div key={n.id} className="news-card">
                <span className="news-card-tag">{n.tag_display}</span>
                <h4>{n.title}</h4>
                <p>{n.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="contact-strip">
        <h2>Ready to Partner with Panas?</h2>
        <p>Distributors, healthcare professionals, and partners — get in touch with us today.</p>
        <div className="contact-strip-btns">
          <Link to="/contact" className="btn btn-dark">📞 Contact Us</Link>
          <Link to="/careers" className="btn btn-outline" style={{ borderColor: 'var(--text-dark)', color: 'var(--text-dark)' }}>View Careers</Link>
        </div>
      </div>
    </>
  );
}
