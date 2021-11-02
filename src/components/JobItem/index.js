import {Link} from 'react-router-dom'
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
      <Link to={`/jobs/${id}`}>
        <div className="top-main-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-item-company-logo"
          />

          <div className="top-center-container">
            <p className="title">{title}</p>
            <div className="rating-container">
              <img src="" alt="" className="star-image" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="middle-line-container">
          <div className="location-employment-container">
            <div className="location-container">
              <p className="location">{location}</p>
            </div>
            <div className="employment-type-container">
              <p className="employment-type">{employmentType}</p>
            </div>
          </div>
          <div className="package-container">
            <p className="package-per-annum">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <div className="job-item-bottom-container">
          <p>Description</p>
          <p>{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default JobItem
