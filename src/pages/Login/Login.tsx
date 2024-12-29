// import { LoadingOverlay } from 'react-loading-overlay';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSystemContext } from '@/hooks/useSystemContext';
import { MainApiRequest } from '@/services/MainApiRequest';

const Login = () => {
    const navigate = useNavigate();
    const context = useSystemContext();
    const {
        isLoggedIn,
        token
    } = context;

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [remember, setRemember] = React.useState(false);

    const handleRememberOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRemember(e.target.checked);
    }

    const handleLogin = async () => {
        const res = await MainApiRequest.post('/auth/signin', {
            email,
            password
        });

        if (res.status === 200) {
            const data = res.data;
            context.setToken(data.token);

            localStorage.setItem('token', data.token);

            navigate('/');
        }
    }

    useEffect(() => {
        if (!isLoggedIn && token) {
            navigate('/');
        }
    }, [isLoggedIn]);

    return (

        <section className="h-100 bg-login">
            <div className="container h-100">
                <div className="row justify-content-sm-center h-100">
                    <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                        <div className="text-center my-5">
                            <img src={require("@/assets/logo.jpg")} alt="logo" width="100" />
                        </div>
                        <div className="card shadow-lg">
                            <div className="card-body p-5">
                                <h1 className="fs-4 card-title fw-bold mb-4">Đăng nhập</h1>
                                <form method="POST" className="needs-validation">
                                    <div className="mb-3">
                                        <label className="mb-2 text-muted">E-Mail</label>
                                        <input id="email" type="email" className="form-control" name="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                                        <div className="invalid-feedback">
                                            Email không hợp lệ
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="mb-2 w-100">
                                            <label className="text-muted">Mật khẩu</label>
                                            <a href="forgot.html" className="float-end">
                                                Quên mật khẩu?
                                            </a>
                                        </div>
                                        <input id="password" type="password" className="form-control" name="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                                        <div className="invalid-feedback">
                                            Mật khẩu không hợp lệ
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <div className="form-check">
                                            <input type="checkbox" name="remember" id="remember" className="form-check-input" onChange={handleRememberOnChange} />
                                            <label className="form-check-label">Ghi nhớ đăng nhập</label>
                                        </div>
                                        <button type="button" onClick={handleLogin} className="btn btn-primary ms-auto">
                                            Đăng nhập
                                        </button>
                                    </div>

                                    <hr className="my-4" />

                                    <div className="d-flex justify-content-center mt-3">
                                        <a href="/register" className="text-muted">
                                            Chưa có tài khoản? Đăng ký ngay
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="text-center mt-5 text-muted">
                            Copyright &copy; 2024 &mdash; CXZ
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;