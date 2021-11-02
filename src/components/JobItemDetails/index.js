import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiConstants.initial,
    activeJobId: '',
    selectedJobItemDetails: {},
    similarJobsList: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  renderSimilarUpdated = similarUpdate => ({
    companyLogoUrl: similarUpdate.company_logo_url,
    employmentType: similarUpdate.employment_type,
    id: similarUpdate.id,
    jobDescription: similarUpdate.job_description,
    location: similarUpdate.location,
    rating: similarUpdate.rating,
    title: similarUpdate.title,
  })

  renderJobItemDetailsUp = eachJob => ({
    companyLogoUrl: eachJob.company_logo_url,
    companyWebsiteUrl: eachJob.company_website_url,
    employmentType: eachJob.employment_type,
    id: eachJob.id,
    skills: eachJob.skills,
    jobDescription: eachJob.job_description,
    location: eachJob.location,
    packagePerAnnum: eachJob.package_per_annum,
    rating: eachJob.rating,
  })

  getJobItemDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {activeJobId} = this.state
    this.setState({apiStatus: apiConstants.inProgress})
    const url = `https://apis.ccbp.in/jobs/${activeJobId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      /* const jobDetails = data.job_details */

      const formattedResults = {
        companyLogoUrl: data.company_logo_url,
        companyWebsiteUrl: data.company_website_url,
        employmentType: data.employment_type,
        id: data.id,
        jobDescription: data.job_description,
        skills: data.skills,
        lifeAtCompany: data.life_at_company,
        location: data.location,
        packagePerAnnum: data.package_per_annum,
        rating: data.rating,
        similarJobs: data.similar_jobs,
      }

      this.setState({
        selectedJobItemDetails: formattedResults,
        similarJobsList: formattedResults.similarJobs,

        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSimilarJob = eachSimilarJob => {
    const {
      companyLogoUrl,
      rating,
      location,
      title,
      jobDescription,
      employmentType,
    } = eachSimilarJob
    return (
      <li className="similar-job-list-item-container">
        <div>
          <div>
            <img
              src={companyLogoUrl}
              alt="similar job company logo"
              className="similar-logo"
            />
            <div>
              <h1>{title}</h1>
              <p>{rating}</p>
            </div>
          </div>
          <div className="similar-description-container">
            <p>Description</p>
            <p>{jobDescription}</p>
          </div>
          <div>
            <p>{location}</p>
            <p>{employmentType}</p>
          </div>
        </div>
      </li>
    )
  }

  renderSelectedJobItemSuccessView = () => {
    const {selectedJobItemDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      rating,
      packagePerAnnum,
      location,
      employmentType,
      jobDescription,
    } = selectedJobItemDetails
    return (
      <div>
        <div>
          <div className="main-top-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="selected-company-logo"
            />
            <div className="rating-main-container">
              <p>{rating}</p>
            </div>
          </div>
          <div className="middle-line-bg-container">
            <div className="location-emp-type">
              <p>{location}</p>
              <p>{employmentType}</p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr className="horizontal-line" />
          <div className="description-container">
            <h1>Description</h1>
            <a href={companyWebsiteUrl}>Visit</a>
            <p>{jobDescription}</p>
          </div>
          <div className="skills-bg-container">
            <h1>Skills</h1>
          </div>
          <div className="life-at-company-bg-container">
            <h1>Life at Company</h1>
          </div>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="selected-job-item-failure-image"
      />
    </div>
  )

  renderJobItemDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSelectedJobItemSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {similarJobsList} = this.state
    return (
      <div>
        <Header />
        <div>{this.renderJobItemDetails()}</div>
        <div>
          <h1>Similar Jobs</h1>
          <ul>
            {similarJobsList.map(eachSimilarJob =>
              this.renderSimilarJob(eachSimilarJob),
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default JobItemDetails
