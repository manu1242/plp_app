import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://plp-app-server.vercel.app/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: signInEmail,
          password: signInPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('email', data.user.email);
      navigate('/home');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (signUpName && signUpEmail && signUpPassword) {
      try {
        const response = await fetch('https://plp-app-server.vercel.app/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: signUpName,
            email: signUpEmail,
            password: signUpPassword,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Sign up failed');
        }

        await response.json();
        alert('Account created successfully! Please sign in.');

        setSignInEmail(signUpEmail);
        setSignInPassword(signUpPassword);

        setSignUpName('');
        setSignUpEmail('');
        setSignUpPassword('');
        setIsSignIn(true);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen flex font-roboto bg-gray-100">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <img
              src="https://storage.googleapis.com/a1aa/image/03sSrbeVXOHWEnof7qHnos-G1mUKQCmTLkdloNocYuQ.jpg"
              alt="Logo"
              className="h-12 w-12"
            />
          </div>
          <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
            {isSignIn ? 'Sign in to Diprella' : 'Create an Account'}
          </h2>
          <div className="flex justify-center space-x-4 mb-4">
            <button className="bg-gray-200 p-2 rounded-full">
              <i className="fab fa-facebook-f text-green-600"></i>
            </button>
            <button className="bg-gray-200 p-2 rounded-full">
              <i className="fab fa-google text-green-600"></i>
            </button>
            <button className="bg-gray-200 p-2 rounded-full">
              <i className="fab fa-linkedin-in text-green-600"></i>
            </button>
          </div>
          <p className="text-center text-gray-500 mb-4">
            or use your email {isSignIn ? 'account:' : 'for registration:'}
          </p>
          <form onSubmit={isSignIn ? handleLogin : handleSignUp}>
            {!isSignIn && (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={isSignIn ? signInEmail : signUpEmail}
                onChange={(e) =>
                  isSignIn
                    ? setSignInEmail(e.target.value)
                    : setSignUpEmail(e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={isSignIn ? signInPassword : signUpPassword}
                onChange={(e) =>
                  isSignIn
                    ? setSignInPassword(e.target.value)
                    : setSignUpPassword(e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
            {isSignIn && (
              <div className="flex justify-end mb-4">
                <a href="#" className="text-gray-500">
                  Forgot your password?
                </a>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
            >
              {isSignIn ? 'SIGN IN' : 'SIGN UP'}
            </button>
          </form>
          <p className="text-center mt-6 text-gray-600">
            {isSignIn ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              className="text-green-600 font-semibold hover:underline ml-1"
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 bg-green-600 text-white flex-col justify-center items-center p-8">
        <h2 className="text-3xl font-bold mb-4">
          {isSignIn ? 'Hello, Friend!' : 'Welcome Back!'}
        </h2>
        <p className="text-center mb-8 px-4">
          {isSignIn
            ? 'Enter your personal details and start your journey with us'
            : 'To keep connected with us please login with your personal info'}
        </p>
        <button
          className="bg-transparent border border-white text-white p-3 rounded-lg hover:bg-white hover:text-green-600 transition"
          onClick={() => setIsSignIn(!isSignIn)}
        >
          {isSignIn ? 'SIGN UP' : 'SIGN IN'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
