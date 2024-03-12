import {
  NoVideosView,
  NoVideosImage,
  NoVideosHeading,
  NoVideosNote,
  RetryButton,
  VideoCardList,
} from './styledComponents'

import ThemeContext from '../../context/ThemeContext'
import HomeVideoCard from '../HomeVideoCard'

const HomeVideos = props => {
  const {homeVideos, onRetry} = props
  const count = homeVideos.length

  const onButton = () => {
    onRetry()
  }
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const headingColor = isDark ? '#f1f5f9' : '#1e293b'
        const noteColor = isDark ? '#e2e8f0' : '#475569'
        return count > 0 ? (
          <VideoCardList>
            {homeVideos.map(each => (
              <HomeVideoCard video={each} key={each.id} />
            ))}
          </VideoCardList>
        ) : (
          <NoVideosView>
            <NoVideosImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <NoVideosHeading headingColor={headingColor}>
              No Search results found
            </NoVideosHeading>
            <NoVideosNote noteColor={noteColor}>
              Try diffrent keywords or remove search filter
            </NoVideosNote>
            <RetryButton type="button" onClick={onButton}>
              Retry
            </RetryButton>
          </NoVideosView>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default HomeVideos
