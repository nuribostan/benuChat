import React, { useContext, useState } from "react";
import { collection, query, where, getDoc, setDoc, updateDoc, serverTimestamp, doc, getDocs } from "firebase/firestore";
import { db, } from "../firebase";
import { AuthContext } from "../context/AuthContext";

function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setError(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // check whether the group exists or not

    const combineId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid; 

    try {
      const res = await getDoc(doc(db,"chats", combineId));

      if(!res.exists()){
        await setDoc(doc(db,"chats", combineId),{messages: []})

        await updateDoc(doc(db,"userChats", currentUser.uid),{
          [combineId+".userInfo"] : {
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
          },
          [combineId+".date"] : serverTimestamp(),
        })

        await updateDoc(doc(db,"userChats", user.uid),{
          [combineId+".userInfo"] : {
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            uid: currentUser.uid,
          },
          [combineId+".date"] : serverTimestamp(),
        })
      }

    } catch (error) {
      setError(true);
    }

    
    setUser(null);
    setUsername("");
  }

  return (
    <div className="search-container">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Ara..."
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {error && <p className="error">Kullanıcı Bulunamadı</p>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <p className="userChatInfo-name">{user.displayName}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
