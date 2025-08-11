import React, { useState } from "react";

const ThemeContext = React.createContext({
  dark: true,
  changeTheme: () => {},
  nav: "",
  changeNavView: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(true);
  const [nav, setNav] = useState("");

  const changeTheme = () => {
    setDark((prev) => !prev);
  };

  const changeNavView = (view) => {
    setNav(view);
  };

  return (
    <ThemeContext.Provider value={{ dark, changeTheme, nav, changeNavView }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;