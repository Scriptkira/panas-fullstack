import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getDivisions, getProducts } from '../api/client';

const DIVISION_META = {
  kalash:  { color: 'linear-gradient(135deg,#6c3483,#8e44ad)' },
  nuzen:   { color: 'linear-gradient(135deg,#1a7a3c,#27ae60)' },
  spandan: { color: 'linear-gradient(135deg,#b03a2e,#e74c3c)' },
  general: { color: 'linear-gradient(135deg,#035faa,#1a7bc4)' },
};

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [divisions, setDivisions] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const activeDiv = searchParams.get('div') || 'kalash';

  useEffect(() => {
    getDivisions().then(r => setDivisions(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    getProducts(activeDiv)
      .then(r => { setProducts(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [activeDiv]);

  const currentDiv = divisions.find(d => d.slug === activeDiv) || {};
  const meta = DIVISION_META[activeDiv] || {};

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Products</span></div>
          <h1>Our Product Divisions</h1>
          <p>Over 200 registered products across 4 specialized healthcare divisions</p>
        </div>
      </div>

      <section className="content-section" style={{ background: '#fff' }}>
        <div className="content-inner">
          <div className="product-tabs">
            {[
              { slug:'kalash',  label:'🏺 Kalash' },
              { slug:'nuzen',   label:'🧠 nuZEN' },
              { slug:'spandan', label:'❤️ Spandan' },
              { slug:'general', label:'💊 General' },
            ].map(tab => (
              <button
                key={tab.slug}
                className={`tab-btn ${activeDiv === tab.slug ? 'active' : ''}`}
                onClick={() => setSearchParams({ div: tab.slug })}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Division Header */}
          <div className="division-header" style={{ background: meta.color || 'var(--primary)' }}>
            <div className="div-icon">{currentDiv.icon || '💊'}</div>
            <div>
              <h2>{currentDiv.name || activeDiv} Division</h2>
              <p>{currentDiv.description || 'High-quality pharmaceutical products.'}</p>
            </div>
          </div>

          {/* Product Table */}
          {loading ? (
            <div className="loading">Loading products</div>
          ) : (
            <table className="product-table">
              <thead>
                <tr><th>#</th><th>Product Name</th><th>Form</th><th>Indication</th></tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id}>
                    <td>{i + 1}</td>
                    <td><strong>{p.name}</strong></td>
                    <td style={{ textTransform: 'capitalize' }}>{p.form}</td>
                    <td>{p.indication}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div style={{ marginTop:'40px', padding:'24px', background:'rgba(3,95,170,0.06)', borderRadius:'var(--radius)', borderLeft:'4px solid var(--primary)' }}>
            <strong style={{ color: 'var(--primary)' }}>📋 Need our complete product catalogue?</strong>
            <p style={{ marginTop:'8px', color:'var(--text-light)', fontSize:'0.9rem' }}>Contact our sales team for the full list and pricing for FY 2081/82.</p>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop:'14px' }}>Contact Sales Team →</Link>
          </div>
        </div>
      </section>

      <div className="contact-strip">
        <h2>Interested in Our Products?</h2>
        <p>Get in touch with our distribution and sales team.</p>
        <div className="contact-strip-btns"><Link to="/contact" className="btn btn-dark">Contact Us</Link></div>
      </div>
    </>
  );
}
