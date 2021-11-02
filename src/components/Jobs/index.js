import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const apiJobsConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    apiProfileStatus: apiConstants.initial,
    apiJobsStatus: apiConstants.initial,
    profileData: {},
    jobsList: [],
    activeEmploymentType: '',
    activeSalaryRange: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedProfile = data.profile_details
      const fetchedProfileDetails = {
        name: fetchedProfile.name,
        shortBio: fetchedProfile.short_bio,
        profileImageUrl: fetchedProfile.profile_image_url,
      }
      this.setState({
        profileData: fetchedProfileDetails,
        apiProfileStatus: apiConstants.success,
      })
      console.log(fetchedProfileDetails)
    }
  }

  renderJobDetailView = job => ({
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    id: job.id,
    jobDescription: job.description,
    location: job.location,
    PackagePerAnnum: job.package_per_annum,
    rating: job.rating,
    title: job.title,
  })

  getJobs = async () => {
    const {searchInput, activeEmploymentType, activeSalaryRange} = this.state
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiJobsStatus: apiJobsConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentType}&minimum_package=${activeSalaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedJobs = await response.json()
      const updatedJobs = fetchedJobs.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedJobs,
        apiJobsStatus: apiJobsConstants.success,
      })
    } else {
      this.setState({apiJobsStatus: apiJobsConstants.failure})
    }
  }

  renderJobsSuccessView = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-list-container">
        {jobsList.map(eachJobItem => (
          <JobItem key={eachJobItem.id} jobDetails={eachJobItem} />
        ))}
      </ul>
    )
  }

  renderProfileSuccessView = () => {
    const {profileData} = this.state
    const {profileImageUrl, name, shortBio} = profileData
    return (
      <div className="profile-view-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <p>{name}</p>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderSalariesList = salary => (
    <li className="salary-type-list">
      <input type="radio" id="salary" value={salary.salaryRangeId} />
      <label htmlFor="salary">{salary.label}</label>
    </li>
  )

  renderEmploymentTypesList = employment => (
    <li className="employment-type-list">
      <input
        type="checkbox"
        id="Employment"
        value={employment.employmentTypeId}
      />
      <label htmlFor="Employment">{employment.label}</label>
    </li>
  )

  renderJobsFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-image"
      />
    </div>
  )

  renderProfileLoadingView = () => (
    <div className="jobs-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobsLoadingView = () => (
    <div className="jobs-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSearchInputView = () => (
    <div>
      <input type="search" className="search-input" />
    </div>
  )

  renderProfileDetails = () => {
    const {apiProfileStatus} = this.state

    switch (apiProfileStatus) {
      case apiConstants.success:
        return this.renderProfileSuccessView()
      case apiConstants.failure:
        return this.renderProfileFailureView()
      case apiConstants.inProgress:
        return this.renderProfileLoadingView()
      default:
        return null
    }
  }

  renderJobsDetails = () => {
    const {apiJobsStatus} = this.state

    switch (apiJobsStatus) {
      case apiJobsConstants.success:
        return this.renderJobsSuccessView()
      case apiJobsConstants.failure:
        return this.renderJobsFailureView()
      case apiJobsConstants.inProgress:
        return this.renderJobsLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="jobs-main-bg-container">
          <div className="jobs-left-side-container">
            <div>{this.renderProfileDetails()}</div>
            <hr className="horizontal-line" />
            <h1 className="heading">Type of Employment</h1>
            {employmentTypesList.map(eachEmploymentType =>
              this.renderEmploymentTypesList(eachEmploymentType),
            )}

            <hr className="horizontal-line" />
            <h1 className="heading">Salary Range</h1>
            {salaryRangesList.map(eachSalary =>
              this.renderSalariesList(eachSalary),
            )}
          </div>
          <div>{this.renderSearchInputView()}</div>
          <div>{this.renderJobsDetails()}</div>
        </div>
      </div>
    )
  }
}

export default Jobs
