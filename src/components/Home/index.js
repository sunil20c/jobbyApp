import {Redirect} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => {
  const onClickFindJobs = () => <Redirect to="/jobs" />
  return (
    <div className="home-container">
      <Header />
      <div className="home-main-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-text">
          Millions of people are searching for jobs, salary, information,
          company reviews. Find the job that fits your abilities and potential.
        </p>
        <button type="button" className="home-button" onClick={onClickFindJobs}>
          Find Jobs
        </button>
      </div>
    </div>
  )
}
export default Home
