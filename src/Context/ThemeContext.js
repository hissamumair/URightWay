// import React, { createContext, useState, useContext } from "react";
// import { lightTheme, darkTheme } from "../constants/theme";

// // Create Context
// const ThemeContext = createContext();

// // Custom Hook for easy access
// export const useTheme = () => useContext(ThemeContext);

// // Theme Provider Component
// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(lightTheme);

//   // Toggle between light and dark themes
//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme.mode === "light" ? darkTheme : lightTheme));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
