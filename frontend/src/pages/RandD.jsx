import { Link } from 'react-router-dom';

export default function RandD() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>R &amp; D</span></div>
          <h1>Research &amp; Development</h1>
          <p>Innovating for a healthier Nepal — Our commitment to pharmaceutical science</p>
        </div>
      </div>

      <section className="content-section" style={{ background:'#fff' }}>
        <div className="content-inner">
          <div className="about-grid">
            <div>
              <div className="section-tag">Our R&amp;D</div>
              <h2 className="section-title">Science at the <span>Core of Everything</span></h2>
              <p style={{ color:'var(--text-light)', lineHeight:'1.9', marginBottom:'20px' }}>Panas Pharmaceutical's Research and Development department is the engine that drives our innovation. Our team of experienced pharmacists, chemists, and researchers work tirelessly to develop new formulations and ensure that every medicine meets the highest standards of safety and efficacy.</p>
              <p style={{ color:'var(--text-light)', lineHeight:'1.9', marginBottom:'30px' }}>Our R&amp;D efforts span across all four product divisions — Ayurvedic formulations in Kalash, nutraceuticals in nuZEN, cardiovascular products in Spandan, and the broader General division.</p>
              <Link to="/products" className="btn btn-primary">View Our Products →</Link>
            </div>
            <div className="about-img">
              <img src="/images/randd.png" alt="Panas R&D Laboratory" />
              <div className="about-img-badge">🔬 State-of-the-Art R&amp;D Lab</div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section" style={{ background:'var(--bg)' }}>
        <div className="content-inner">
          <div style={{ textAlign:'center', marginBottom:'50px' }}>
            <div className="section-tag">Our Capabilities</div>
            <h2 className="section-title">R&amp;D <span>Infrastructure</span></h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'24px' }}>
            {[
              { icon:'🧪', title:'Formulation Development', desc:'In-house formulation development for tablets, capsules, syrups, and powders using modern pharmaceutical techniques.' },
              { icon:'🔍', title:'Quality Control Lab', desc:'Equipped with HPLC, UV-Vis Spectrophotometer, and dissolution apparatus for rigorous quality testing.' },
              { icon:'🌡️', title:'Stability Testing', desc:'ICH-guideline compliant stability testing chambers to validate shelf-life and storage conditions.' },
              { icon:'🌿', title:'Herbal Research', desc:"Dedicated research into Nepal's rich botanical heritage to identify and standardize active herbal ingredients." },
              { icon:'📊', title:'Documentation & Compliance', desc:'Comprehensive documentation systems aligned with WHO-GMP, ICH, and Nepal Drug Standards Board requirements.' },
              { icon:'🤝', title:'Academic Collaboration', desc:'Collaboration with pharmacy colleges and research institutions in Nepal to foster innovation.' },
            ].map(c => (
              <div key={c.title} className="card">
                <div style={{ fontSize:'2.5rem', marginBottom:'14px' }}>{c.icon}</div>
                <h4 style={{ color:'var(--primary)', marginBottom:'10px', fontFamily:"'Outfit',sans-serif" }}>{c.title}</h4>
                <p style={{ color:'var(--text-light)', fontSize:'0.88rem', lineHeight:'1.8' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section" style={{ background:'#fff' }}>
        <div className="content-inner">
          <div style={{ textAlign:'center', marginBottom:'50px' }}>
            <div className="section-tag">Our Process</div>
            <h2 className="section-title">From <span>Idea to Medicine</span></h2>
          </div>
          {[
            { step:1, accent:false, title:'Needs Assessment & Research', desc:'Identifying unmet healthcare needs in Nepal and researching existing therapies, active ingredients, and global pharmaceutical trends.' },
            { step:2, accent:false, title:'Pre-formulation Studies', desc:'Characterizing the physicochemical properties of APIs to guide optimal formulation design.' },
            { step:3, accent:false, title:'Formulation & Development', desc:'Developing and optimizing the product formula through systematic trials, ensuring correct dosage, stability, and patient acceptability.' },
            { step:4, accent:false, title:'Quality Testing & Stability', desc:'Rigorous QC testing and stability studies under real-time and accelerated conditions to confirm product shelf-life and safety.' },
            { step:5, accent:true,  title:'Regulatory Filing & Launch', desc:'Filing dossiers with the Nepal Drug Standards Board (NDSB) for product registration, followed by GMP-compliant commercial manufacturing and market launch.' },
          ].map((s, i, arr) => (
            <div key={s.step} style={{ display:'flex', gap:'24px', alignItems:'flex-start', padding:'24px 0', borderBottom: i < arr.length-1 ? '1px dashed #e2e8f0' : 'none' }}>
              <div style={{ width:'60px', height:'60px', background: s.accent ? 'var(--accent)' : 'var(--primary)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color: s.accent ? 'var(--text-dark)' : '#fff', fontWeight:'800', fontSize:'1.2rem', flexShrink:0 }}>{s.step}</div>
              <div>
                <h4 style={{ color: s.accent ? 'var(--accent-dark)' : 'var(--primary)', fontFamily:"'Outfit',sans-serif", marginBottom:'6px' }}>{s.title}</h4>
                <p style={{ color:'var(--text-light)', fontSize:'0.9rem', lineHeight:'1.7' }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="contact-strip">
        <h2>Collaborate With Our R&amp;D Team</h2>
        <p>We welcome academic and industry collaborations that advance pharmaceutical science in Nepal.</p>
        <div className="contact-strip-btns"><Link to="/contact" className="btn btn-dark">Get In Touch</Link></div>
      </div>
    </>
  );
}
