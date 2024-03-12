import {
  FailView,
  FailImage,
  FailHeading,
  FailNote,
  RetryButton,
} from './styledComponents'
import ThemeContext from '../../context/ThemeContext'

const FailureView = props => {
  const {onRetry} = props
  const onButton = () => {
    onRetry()
  }
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value

        const headingColor = isDark ? '#f1f5f9' : '#1e293b'
        const noteColor = isDark ? '#e2e8f0' : '#475569'
        const failureImageUrl = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        return (
          <FailView>
            <FailImage src={failureImageUrl} alt="failure view" />
            <FailHeading headingColor={headingColor}>
              Oops! something went wrong
            </FailHeading>
            <FailNote noteColor={noteColor}>
              We are having some trouble to complete your request. <br /> Please
              try again later.
            </FailNote>
            <RetryButton type="button" onClick={onButton}>
              Retry
            </RetryButton>
          </FailView>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default FailureView
