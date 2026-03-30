// Login.js — export default Login
// Register.js — export default Register
// Both in separate usage but combined here for compactness

import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get('next') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate(next);
    } catch {
      // Demo: allow any login
      toast.success('Bienvenue !');
      navigate(next);
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--white-2)', padding:'24px' }}>
      <div style={{ width:'100%', maxWidth:'420px' }}>
        <div style={{ textAlign:'center', marginBottom:'40px' }}>
          <Link to="/" style={{ fontFamily:'var(--font-display)', fontSize:'36px', fontWeight:'400', letterSpacing:'0.15em', color:'var(--noir)' }}>LIVRR</Link>
          <p style={{ color:'var(--gray)', marginTop:'8px', fontSize:'15px' }}>Connectez-vous à votre compte</p>
        </div>
        <div style={{ background:'var(--white)', borderRadius:'var(--radius-xl)', padding:'40px', border:'1px solid rgba(0,0,0,0.06)' }}>
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
            <div>
              <label style={{ fontSize:'13px', fontWeight:'500', display:'block', marginBottom:'6px' }}>Email</label>
              <input className="input-field" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="vous@exemple.com" required />
            </div>
            <div>
              <label style={{ fontSize:'13px', fontWeight:'500', display:'block', marginBottom:'6px' }}>Mot de passe</label>
              <input className="input-field" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <div style={{ textAlign:'right' }}>
              <span style={{ fontSize:'13px', color:'var(--gold)', cursor:'pointer' }}>Mot de passe oublié ?</span>
            </div>
            <button type="submit" className="btn-primary" style={{ width:'100%', padding:'16px', marginTop:'8px', fontSize:'15px' }} disabled={loading}>
              {loading ? 'Connexion…' : 'Se connecter'}
            </button>
            <div style={{ textAlign:'center', fontSize:'14px', color:'var(--gray)' }}>
              Pas encore de compte ? <Link to="/register" style={{ color:'var(--gold)', fontWeight:'500' }}>S'inscrire</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
