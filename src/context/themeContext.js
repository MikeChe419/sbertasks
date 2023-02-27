import { createContext } from "react";

// Убедитесь, что форма значения по умолчанию,
// передаваемого в createContext, совпадает с формой объекта,
// которую ожидают потребители контекста.

export const themes = {
	light: {
		color: '#000000',
	  	background: '#ffffff',
	},
	dark: {
		color: '#ffffff',
	  	background: '#222222',
	},
  };

  export const ThemeContext = createContext({
	theme: themes.dark,
	toggleTheme: () => {},
  });
