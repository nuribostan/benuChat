import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

function Login() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className='register-container'>
    <div className="register-box">
        <h1>Benu <span>Chat</span></h1>
        <small>Giriş</small>
        <form onSubmit={handleSubmit}>
            <input type="text" name='email' placeholder='Email' />
            <input type="password" name='password' placeholder='Şifre' />
            <input style={{display:"none"}} type="file" id='file' />
            <button className='signUp'>Giriş Yap</button>
            {error && <p className='error'>Kullanıcı Adı veya Şifre Hatalı</p>}
            <p className="refLogin">
                Üye Değil misin ? <a href="/register">Kayıt Ol</a>
            </p>
        </form>
    </div>
</div>
  )
}

export default Login