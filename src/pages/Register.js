import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', phone:'', password:'' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const set = (k) => (e) => setForm(p => ({...p, [k]: e.target.value}));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      navigate('/');
    } catch {
      toast.success('Compte créé ! Bienvenue sur LIVRR 🎉');
      navigate('/');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--white-2)', padding:'24px' }}>
      <div style={{ width:'100%', maxWidth:'460px' }}>
        <div style={{ textAlign:'center', marginBottom:'40px' }}>
          <Link to="/" style={{ fontFamily:'var(--font-display)', fontSize:'36px', fontWeight:'400', letterSpacing:'0.15em', color:'var(--noir)' }}>LIVRR</Link>
          <p style={{ color:'var(--gray)', marginTop:'8px', fontSize:'15px' }}>Créez votre compte gratuitement</p>
        </div>
        <div style={{ background:'var(--white)', borderRadius:'var(--radius-xl)', padding:'40px', border:'1px solid rgba(0,0,0,0.06)' }}>
          {/* Promo reminder */}
          <div style={{ background:'linear-gradient(135deg, var(--gold), var(--gold-dark))', borderRadius:'var(--radius-md)', padding:'14px 16px', marginBottom:'24px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ fontSize:'14px', fontWeight:'500' }}>🎁 Offre de bienvenue</div>
            <div style={{ background:'rgba(0,0,0,0.15)', padding:'4px 12px', borderRadius:'6px', fontFamily:'var(--font-display)', fontWeight:'500', letterSpacing:'0.1em' }}>LIVRR15</div>
          </div>

          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
              {[['firstName','Prénom'],['lastName','Nom']].map(([k,l]) => (
                <div key={k}>
                  <label style={{ fontSize:'13px', fontWeight:'500', display:'block', marginBottom:'6px' }}>{l}</label>
                  <input className="input-field" value={form[k]} onChange={set(k)} required />
                </div>
              ))}
            </div>
            <div>
              <label style={{ fontSize:'13px', fontWeight:'500', display:'block', marginBottom:'6px' }}>Email</label>
              <input className="input-field" type="email" value={form.email} onChange={set('email')} required />
            </div>
            <div>
              <label style={{ fontSize:'13px', fontWeight:'500', display:'block', marginBottom:'6px' }}>Téléphone</label>
              <input className="input-field" type="tel" value={form.phone} onChange={set('phone')} placeholder="+33 6 12 34 56 78" />
            </div>
            <div>
              <label style={{ fontSize:'13px', fontWeight:'500', display:'block', marginBottom:'6px' }}>Mot de passe</label>
              <input className="input-field" type="password" value={form.password} onChange={set('password')} required minLength="8" />
            </div>
            <p style={{ fontSize:'12px', color:'var(--gray)', lineHeight:'1.5' }}>
              En créant un compte, vous acceptez nos <span style={{ color:'var(--gold)' }}>Conditions d'utilisation</span> et notre <span style={{ color:'var(--gold)' }}>Politique de confidentialité</span>.
            </p>
            <button type="submit" className="btn-gold" style={{ width:'100%', padding:'16px', fontSize:'15px', marginTop:'8px' }} disabled={loading}>
              {loading ? 'Création…' : 'Créer mon compte'}
            </button>
            <div style={{ textAlign:'center', fontSize:'14px', color:'var(--gray)' }}>
              Déjà un compte ? <Link to="/login" style={{ color:'var(--gold)', fontWeight:'500' }}>Se connecter</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
