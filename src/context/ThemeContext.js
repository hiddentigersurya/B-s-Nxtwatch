import React from 'react'

const ThemeContext = React.createContext({
  isDark: false,
  savedVideos: [],
  activeTab: 'Home',
  toggleTheme: () => {},
  changeTab: () => {},
  addVideo: () => {},
})

export default ThemeContext
