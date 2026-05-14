import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getJobs } from '../api/client';

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJobs().then(r => { setJobs(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Careers</span></div>
          <h1>Join the Panas Family</h1>
          <p>Build your career with Nepal's trusted pharmaceutical manufacturer — Fiscal Year 2081/82</p>
        </div>
      </div>

      <section className="content-section" style={{ background:'#fff' }}>
        <div className="content-inner">
          {/* Why Panas */}
          <div style={{ textAlign:'center', marginBottom:'50px' }}>
            <div className="section-tag">Why Panas?</div>
            <h2 className="section-title">A Place to <span>Grow and Thrive</span></h2>
            <p className="section-subtitle" style={{ margin:'0 auto' }}>At Panas, our people are our greatest asset. We invest in your development and well-being.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'20px', marginBottom:'70px' }}>
            {[
              { icon:'📈', color:'var(--primary)', title:'Career Growth', desc:'Structured career paths and internal promotions for high-performing employees.' },
              { icon:'🎓', color:'var(--accent-dark)', title:'Training & Development', desc:'Regular training programs, workshops, and opportunities for professional development.' },
              { icon:'💚', color:'var(--green)', title:'Health Benefits', desc:'Comprehensive health insurance and wellness programs for employees and their families.' },
              { icon:'🤝', color:'#8e44ad', title:'Inclusive Culture', desc:'A collaborative, diverse, and respectful workplace that values every team member.' },
            ].map(f => (
              <div key={f.title} className="card" style={{ textAlign:'center', padding:'30px 20px', borderTop:`4px solid ${f.color}` }}>
                <div style={{ fontSize:'2.5rem', marginBottom:'12px' }}>{f.icon}</div>
                <h4 style={{ color:f.color, marginBottom:'8px' }}>{f.title}</h4>
                <p style={{ fontSize:'0.85rem', color:'var(--text-light)' }}>{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Jobs */}
          <div className="section-tag">Open Positions</div>
          <h2 className="section-title" style={{ marginBottom:'30px' }}>Current <span>Job Openings</span></h2>
          {loading ? <div className="loading">Loading jobs</div> : jobs.map(job => (
            <div key={job.id} className="job-card">
              <h3 style={{ color:'var(--primary)', fontFamily:"'Outfit',sans-serif", fontSize:'1.2rem' }}>{job.title}</h3>
              <div className="job-meta">
                <span className="job-tag tag-dept">🏢 {job.department_display}</span>
                <span className="job-tag tag-type">⏱ {job.job_type_display}</span>
                <span className="job-tag tag-loc">📍 {job.location}</span>
              </div>
              <p style={{ fontSize:'0.9rem', color:'var(--text-light)', lineHeight:'1.7' }}>{job.description}</p>
              <p style={{ fontSize:'0.85rem', color:'var(--text-mid)', marginTop:'10px' }}><strong>Requirements:</strong> {job.requirements}</p>
              <a href={`mailto:info@panaspharma.com?subject=Application: ${job.title}`} className="btn btn-primary" style={{ marginTop:'16px', fontSize:'0.85rem', padding:'10px 22px' }}>Apply Now →</a>
            </div>
          ))}

          <div style={{ marginTop:'40px', padding:'30px', background:'rgba(3,95,170,0.06)', borderRadius:'var(--radius-lg)', border:'2px dashed rgba(3,95,170,0.2)', textAlign:'center' }}>
            <div style={{ fontSize:'2rem', marginBottom:'12px' }}>📩</div>
            <h3 style={{ color:'var(--primary)', fontFamily:"'Outfit',sans-serif", marginBottom:'10px' }}>Don't See Your Role?</h3>
            <p style={{ color:'var(--text-light)', marginBottom:'20px' }}>Send us your CV and a cover letter. We'll keep it on file and reach out when a suitable position opens.</p>
            <a href="mailto:info@panaspharma.com?subject=General Application - Panas Pharmaceutical" className="btn btn-primary">Send Your CV →</a>
          </div>
        </div>
      </section>

      <div className="contact-strip">
        <h2>Questions About Careers?</h2>
        <p>Reach out to our HR department directly.</p>
        <div className="contact-strip-btns"><Link to="/contact" className="btn btn-dark">Contact HR</Link></div>
      </div>
    </>
  );
}
