import { Link } from 'react-router-dom'
import ImageCard from '../../components/imageCard/ImageCard'
import "./AiPage.scss"

const Marketing = () => {
  return (
    <div className='marketingContainer'>
        <span className='title'>Pick An Option</span>
        <div className='cards'>
            <Link to={"/ai/social"}>
            <ImageCard title={"Social Media Caption"} />
            </Link>
        <ImageCard title={"Email Marketing Pitch"} />
        <ImageCard title={"Website Content"} />
        <ImageCard title={"Blogs & Artiles"} />
        </div>
    </div>
  )
}

export default Marketing