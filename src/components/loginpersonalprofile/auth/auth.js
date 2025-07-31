export const isAuthenticated = () => {
    const token = localStorage.getItem("access");
    return Boolean(token); // true или false
  };
  