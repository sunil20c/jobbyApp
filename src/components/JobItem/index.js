import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    jobDescription,
    employmentType,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails
  return (
    <li className="job-list-item-container">
      <Link to={`/jobs/${id}`} className="link-style-container">
        <div className="top-main-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-item-company-logo"
          />
          <div className="top-center-container">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <FaStar className="fa-star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="middle-line-container">
          <div className="location-container">
            <p className="location">{location}</p>
          </div>
          <div className="employment-type-container">
            <p className="employment-type">{employmentType}</p>
          </div>
          <p className="package-per-annum">{packagePerAnnum}</p>
        </div>
        <hr className="horizontal-line" />
        <div className="job-item-bottom-container">
          <h1>Description</h1>
          <p className="job-item-description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default JobItem
