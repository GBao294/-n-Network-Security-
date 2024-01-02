import React, { useState, useContext } from 'react';
import '../Styles/register.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase-config";
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { doc, getDoc } from 'firebase/firestore';

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { setUser } = useContext(UserContext);

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const userId = userCredential.user.uid;
            return getDoc(doc(db, 'users', userId)).then(userDoc => {
                return { userId, userDoc };
            });
        })
        .then(({ userId, userDoc }) => {
            let userRole = 'user';
            if (userDoc.exists()) {
                const userData = userDoc.data();
                if (userData.role === 'admin') {
                    userRole = 'admin';
                }
            }
            const userInfo = { uid: userId, role: userRole };
            localStorage.setItem('user', JSON.stringify(userInfo)); // Lưu vào localStorage
            setUser(userInfo); // Cập nhật trạng thái người dùng trong UserContext
            navigate('/Home');
        })
        .catch((error) => {
            console.error('Lỗi đăng nhập:', error);
            setError(error.message); // Hiển thị thông báo lỗi
        });
    };

    return (
        <div>
            <title>NerdyGrooves Login</title>
            <div>
                <section>
                    {/* <div className="background2"></div> */}
                    <div className="form-box form2">
                        <div className="button-box">
                            <div className="form-value">
                                <form action="" onSubmit={signIn}>
                                    <h2 className='Register-head'>Login</h2>
                                    <div className="inputbox">
                                        <ion-icon name="mail-outline"></ion-icon>
                                        <input type="email" required
                                               value={email}
                                               onChange={(e) => setEmail(e.target.value)}  />
                                        <label htmlFor="">Email</label>
                                    </div>
                                    <div className="inputbox">
                                        <ion-icon name="lock-closed-outline"></ion-icon>
                                        <input type="password" required
                                               value={password}
                                               onChange={(e) => setPassword(e.target.value)}  />
                                        <label htmlFor="">Password</label>
                                    </div>
                                    <div className="remember">
                                        <label htmlFor=""><input type="checkbox" /> Remember Me</label>
                                    </div>
                                    {error && <div className="error-message">{error}</div>}
                                    <button type="submit">Login</button>
                                    <div className="register">
                                        <p>Or <a href="/Register">Register</a> if you do not have an account</p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export  default SignIn;
