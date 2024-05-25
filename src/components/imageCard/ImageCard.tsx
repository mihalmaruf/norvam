import { IoArrowForwardOutline } from "react-icons/io5"
import "./ImageCard.scss"
import { Link } from "react-router-dom"

const ImageCard = ({title}: any) => {
  return (
    <div className="card-grid">
        <div>
            {title}
        </div>
        <div>
        <Link to="/ai">
        <IoArrowForwardOutline size={20} />
        </Link>
    </div>
    </div>
  )
}

export default ImageCard