import { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitContact } from '../api/client';
import { useSettings } from '../components/Layout';

export default function Contact() {
  const s = useSettings();
  const [form, setForm] = useState({ first_name:'', last_name:'', email:'', phone:'', subject:'', message:'' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(form);
      setStatus('success');
      setForm({ first_name:'', last_name:'', email:'', phone:'', subject:'', message:'' });
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Contact Us</span></div>
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you — distributors, healthcare professionals, or general enquiries</p>
        </div>
      </div>

      <section className="content-section" style={{ background:'#fff' }}>
        <div className="content-inner">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:'50px', alignItems:'start' }}>
            {/* Info */}
            <div>
              <div className="section-tag">Our Details</div>
              <h2 className="section-title" style={{ marginBottom:'30px' }}>Contact <span>Information</span></h2>
              {[
                { icon:'📍', title:'Head Office', content:`${s.address_line1 || 'Janaki-6, Ganapur'}\n${s.address_line2 || 'Banke, Nepal'}` },
                { icon:'📞', title:'Phone Numbers', content:`${s.phone_primary || '(977) 81-403004'}\n${s.phone_secondary || '081-523668'}` },
                { icon:'✉', title:'Email', content: s.email || 'info@panaspharma.com' },
                { icon:'🌐', title:'Website', content: s.website_url ? s.website_url.replace(/^https?:\/\//, '') : 'www.panaspharma.com' },
              ].map(item => (
                <div key={item.title} className="card" style={{ marginBottom:'16px', display:'flex', gap:'16px', alignItems:'flex-start' }}>
                  <div style={{ width:'48px', height:'48px', background:'var(--primary)', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', flexShrink:0 }}>{item.icon}</div>
                  <div>
                    <h4 style={{ color:'var(--primary)', marginBottom:'4px' }}>{item.title}</h4>
                    <p style={{ color:'var(--text-light)', fontSize:'0.9rem', lineHeight:'1.7', whiteSpace:'pre-line' }}>{item.content}</p>
                  </div>
                </div>
              ))}
              <div style={{ background:'linear-gradient(135deg,#e8f5e9,#c8e6c9)', borderRadius:'var(--radius)', padding:'40px', textAlign:'center', border:'2px dashed #81c784' }}>
                <div style={{ fontSize:'3rem', marginBottom:'12px' }}>🗺️</div>
                <h4 style={{ color:'#2e7d32', marginBottom:'8px' }}>Find Us on Google Maps</h4>
                <p style={{ color:'#388e3c', fontSize:'0.85rem', marginBottom:'16px' }}>{s.address_line1 || 'Janaki-6, Ganapur'}, {s.address_line2 || 'Banke, Nepal'}</p>
                <a href={s.google_maps_url || 'https://maps.google.com/?q=Banke,Nepal'} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ fontSize:'0.85rem', padding:'10px 20px' }}>Open in Maps →</a>
              </div>
            </div>

            {/* Form */}
            <div className="card" style={{ padding:'40px' }}>
              <div className="section-tag">Send a Message</div>
              <h2 className="section-title" style={{ marginBottom:'24px', fontSize:'1.8rem' }}>We'd Love to<br /><span>Hear From You</span></h2>
              {status === 'success' && <div className="alert alert-success">Thank you! Your message has been sent. We'll get back to you within 24 hours.</div>}
              {status === 'error'   && <div className="alert alert-error">Something went wrong. Please try again or email us directly.</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-grid-2">
                  <div className="form-group"><label>First Name *</label><input name="first_name" value={form.first_name} onChange={handleChange} placeholder="Ram" required /></div>
                  <div className="form-group"><label>Last Name *</label><input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Sharma" required /></div>
                </div>
                <div className="form-group"><label>Email Address *</label><input type="email" name="email" value={form.email} onChange={handleChange} placeholder="ram@example.com" required /></div>
                <div className="form-group"><label>Phone Number</label><input name="phone" value={form.phone} onChange={handleChange} placeholder="+977 98XXXXXXXX" /></div>
                <div className="form-group">
                  <label>Subject *</label>
                  <select name="subject" value={form.subject} onChange={handleChange} required>
                    <option value="">Select a subject...</option>
                    <option>Product Enquiry</option>
                    <option>Distribution Partnership</option>
                    <option>Careers / Jobs</option>
                    <option>General Information</option>
                    <option>Feedback / Complaint</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group"><label>Message *</label><textarea name="message" value={form.message} onChange={handleChange} placeholder="Write your message here..." required /></div>
                <button type="submit" className="btn btn-primary" style={{ width:'100%', justifyContent:'center', fontSize:'1rem', padding:'16px' }} disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message 📨'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="contact-strip">
        <h2>Visit Our Factory</h2>
        <p>We welcome healthcare professionals and distributors to visit our GMP-certified manufacturing facility.</p>
        <div className="contact-strip-btns"><a href={`tel:${s.phone_primary || '+97781403004'}`} className="btn btn-dark">📞 Call to Schedule a Visit</a></div>
      </div>
    </>
  );
}
