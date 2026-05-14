import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGallery } from '../api/client';

const FALLBACK_PHOTOS = [
  { id:1, title: 'GMP Manufacturing Facility', image_url: '/images/factory.png', caption: 'GMP Manufacturing Facility -- Banke, Nepal', is_featured: true },
  { id:2, title: 'Research & Development Lab', image_url: '/images/randd.png', caption: 'Research & Development Lab', is_featured: false },
  { id:3, title: 'Quality & Innovation', image_url: '/images/hero-banner.png', caption: 'Quality & Innovation', is_featured: false },
  { id:4, title: 'Quality Control Testing', image_url: '/images/randd.png', caption: 'Quality Control Testing', is_featured: false },
  { id:5, title: 'Production Floor', image_url: '/images/factory.png', caption: 'Production Floor', is_featured: false },
  { id:6, title: 'Product Packaging Line', image_url: '/images/hero-banner.png', caption: 'Product Packaging Line', is_featured: false },
];

export default function Gallery() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getGallery()
      .then(r => setPhotos(r.data.length > 0 ? r.data : FALLBACK_PHOTOS))
      .catch(() => setPhotos(FALLBACK_PHOTOS));
  }, []);

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Gallery</span></div>
          <h1>Photo Gallery</h1>
          <p>A glimpse inside Panas Pharmaceutical — our facility, team, and milestones</p>
        </div>
      </div>

      <section className="content-section" style={{ background:'#fff' }}>
        <div className="content-inner">
          <div style={{ textAlign:'center', marginBottom:'40px' }}>
            <div className="section-tag">Our Facility</div>
            <h2 className="section-title">See <span>Panas in Action</span></h2>
            <p className="section-subtitle" style={{ margin:'0 auto' }}>Our state-of-the-art manufacturing facility in Banke, Nepal — where quality medicines are born.</p>
          </div>
          <div className="gallery-grid">
            {photos.map((p) => (
              <div key={p.id} className={`gallery-item ${p.is_featured ? 'featured' : ''}`}>
                <img src={p.image_url} alt={p.title} />
                <div className="gallery-overlay"><span>{p.caption || p.title}</span></div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:'50px', padding:'30px', background:'rgba(3,95,170,0.05)', borderRadius:'var(--radius-lg)', textAlign:'center', border:'2px dashed rgba(3,95,170,0.15)' }}>
            <div style={{ fontSize:'2rem', marginBottom:'12px' }}>📸</div>
            <h3 style={{ color:'var(--primary)', fontFamily:"'Outfit',sans-serif", marginBottom:'8px' }}>More Photos Coming Soon</h3>
            <p style={{ color:'var(--text-light)', marginBottom:'20px' }}>We are building our digital gallery. Visit us or follow us for more updates.</p>
            <Link to="/contact" className="btn btn-primary">Arrange a Factory Visit →</Link>
          </div>
        </div>
      </section>

      <div className="contact-strip">
        <h2>Visit Our Facility</h2>
        <p>Healthcare professionals and distributors are welcome to tour our GMP facility.</p>
        <div className="contact-strip-btns"><Link to="/contact" className="btn btn-dark">Book a Visit</Link></div>
      </div>
    </>
  );
}
