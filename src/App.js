import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import ThemeContext from './context/ThemeContext'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import VideoDetailView from './components/VideoDetailView'
import TrendingVideos from './components/TrendingVideos'
import SavedVideos from './components/SavedVideos'
import GamingVideos from './components/GamingVideos'

import './App.css'

class App extends Component {
  state = {isDark: false, savedVideos: [], activeTab: 'Home'}

  changeTab = tabs => {
    this.setState({activeTab: tabs})
  }

  toggleTheme = () => {
    this.setState(prev => ({isDark: !prev.isDark}))
  }

  addVideo = v => {
    const {savedVideos} = this.state
    const index = savedVideos.findIndex(each => each.id === v.id)
    if (index === -1) {
      this.setState({savedVideos: [...savedVideos, v]})
    } else {
      savedVideos.splice(index, 1)
      this.setState({savedVideos})
    }
  }

  removeVideo = id => {
    const {savedVideos} = this.state
    const udata = savedVideos.filter(each => each.id !== id)
    this.setState({savedVideos: udata})
  }

  render() {
    const {savedVideos, isDark, activeTab} = this.state
    return (
      <ThemeContext.Provider
        value={{
          savedVideos,
          isDark,
          activeTab,
          toggleTheme: this.toggleTheme,
          addVideo: this.addVideo,
          changeTab: this.changeTab,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoDetailView}
          />
          <ProtectedRoute exact path="/trending" component={TrendingVideos} />
          <ProtectedRoute exact path="/gaming" component={GamingVideos} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
