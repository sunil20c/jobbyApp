import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {FaStar} from 'react-icons/fa'

import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiConstants.initial,

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

  renderLifeAtCompany = life => ({
    description: life.description,
    imageUrl: life.image_url,
  })

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    this.setState({apiStatus: apiConstants.inProgress})
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const fetchedJobData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        skills: data.job_details.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        title: data.job_details.title,
        lifeAtCompany: this.renderLifeAtCompany(
          data.job_details.life_at_company,
        ),
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
      }

      this.setState({
        selectedJobItemDetails: fetchedJobData,
        similarJobsList: data.similar_jobs.map(eachSimilarJob =>
          this.renderSimilarUpdated(eachSimilarJob),
        ),
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onClickJobItemRetry = () => {
    this.getJobItemDetails()
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
          <div className="similar-logo-container">
            <img
              src={companyLogoUrl}
              alt="similar job company logo"
              className="similar-logo"
            />
            <div className="similar-title-rating-container">
              <h1>{title}</h1>
              <div className="jb-rating-container">
                <FaStar className="fa-star" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="similar-description-container">
            <h1>Description</h1>
            <p>{jobDescription}</p>
          </div>
          <div className="similar-location-emp-type-container">
            <p>{location}</p>
            <p>{employmentType}</p>
          </div>
        </div>
      </li>
    )
  }

  renderSkill = skill => {
    const {imageUrl, name} = skill
    return (
      <li>
        <img src={imageUrl} alt={name} className="skill-image" />
        <p>{name}</p>
      </li>
    )
  }

  renderSelectedJobItemSuccessView = () => {
    const {selectedJobItemDetails, similarJobsList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      rating,
      packagePerAnnum,
      location,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      title,
    } = selectedJobItemDetails

    return (
      <div className="">
        <div className="job-item-details-bg-container">
          <div className="main-top-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="selected-company-logo"
            />
            <div className="rating-main-container">
              <h1 className="jid-heading">{title}</h1>
              <div className="jb-rating-container">
                <FaStar className="fa-star" />
                <p className="jid-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="middle-line-bg-container">
            <div className="location-emp-type">
              <p className="jid-location">{location}</p>
              <p className="jid-employment-type">{employmentType}</p>
            </div>
            <p className="jid-package">{packagePerAnnum}</p>
          </div>
          <hr className="horizontal-line" />
          <div className="description-container">
            <div className="description-visit-container">
              <h1 className="jid-heading">Description</h1>
              <a href={companyWebsiteUrl}>Visit</a>
            </div>
            <p className="jid-job-description">{jobDescription}</p>
          </div>
          <div className="skills-bg-container">
            <h1 className="jid-skills-heading">Skills</h1>
            <ul className="skills-list-container">
              {skills.map(skill => this.renderSkill(skill))}
            </ul>
          </div>
          <div className="life-at-company-bg-container">
            <h1 className="jid-life-heading">Life at Company</h1>
            <div className="life-text-image-container">
              <p className="jid-life-description">
                {lifeAtCompany.description}
              </p>
              <img
                src={lifeAtCompany.imageUrl}
                alt="life at company"
                className="life-image"
              />
            </div>
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list-container">
          {similarJobsList.map(eachSimilarJob =>
            this.renderSimilarJob(eachSimilarJob),
          )}
        </ul>
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
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="selected-job-item-failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.onClickJobItemRetry}>
        Retry
      </button>
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
    return (
      <div className=" job-item-details-app-bg-container">
        <Header />
        <div>{this.renderJobItemDetails()}</div>
      </div>
    )
  }
}

export default JobItemDetails
