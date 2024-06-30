const AuthService = {
    setUser: (userData) => {
      localStorage.setItem('user', JSON.stringify(userData));
    },
  
    getUser: () => {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    },
  
    clearUser: () => {
      localStorage.removeItem('user');
    },
  
    isLoggedIn: () => {
      return !!localStorage.getItem('user');
    }
  };
  
  export default AuthService;
  