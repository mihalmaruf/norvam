import AiChat from "../../components/aiInput/aiChat/AiChat";
import NavCard from "../../components/navCard/NavCard"
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className='wrapper'>
    <div className="main">
      <div className="title-container">
      <span className="homeTitle">Quick Tools</span>
      </div>
      <div className='dash-container'>
      <NavCard title={"Image Reader"} description={"Let Ai read your image"} />
      <NavCard title={"Email Generator"} description={"Let Ai construct the perfect email"} />
      <NavCard title={"Caption Generator"} description={"Allow Ai to create captions"} />
      </div>

      <div className="title-container">
      <span className="homeTitle">Notes</span>
      </div>
      <div className='dash-container'>
      <NavCard title={"Image Reader"} description={"Let Ai read your image"} />
      <NavCard title={"Email Generator"} description={"Let Ai construct the perfect email"} />
      </div>

      <div className="title-container">
      <span className="homeTitle">Priority Tasks</span>
      </div>
      <div className="list-container">
      <NavCard title={"Image Reader"} description={"Let Ai read your image"} />
      <NavCard title={"Image Reader"} description={"Let Ai read your image"} />
      </div>
    </div>

    <div className="aiChat">
    <AiChat />
    </div>
    </div>
  )
}

export default HomePage