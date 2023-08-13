import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Regsiter() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target.displayName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const file = e.target.file.files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              displayName,
              photoURL: downloadURL,
              uid: res.user.uid,
              email,
            });
          });
        }
      );
      await setDoc(doc(db,"userChats",res.user.uid),{});
      navigate("/login");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>
          Benu <span>Chat</span>
        </h1>
        <small>Kayıt</small>
        <form onSubmit={handleSubmit}>
          <input type="text" name="displayName" placeholder="Takma Adın" />
          <input type="text" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Şifre" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src="https://i.hizliresim.com/w2cwcw5.png" alt="add-image" />
            <p>Resim ekleyin</p>
          </label>
          <button className="signUp">Kayıt Ol</button>
          {error && <p className="error">Bir hata oluştu</p>}
          <p className="refLogin">
            Zaten üye misin ? <a href="/login">Giriş yap</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Regsiter;
