import exampleVideoData from '../data/exampleVideoData.js';
import VideoList from './VideoList.js';
import VideoListEntry from './VideoListEntry.js';
import VideoPlayer from './VideoPlayer.js';
import Search from './Search.js';
import searchYouTube from '../lib/searchYouTube.js';

var App = () => {

  const { useState, useEffect } = React;
  // initial video in useState is first video
  const [listOfVideos, setlistOfVideos] = useState([]);
  const [videoSelected, setVideoSelected] = useState(exampleVideoData[0]);
  // create helper function
  // useEffect helper function ---------------------
  // WILL RUN ON PAGE LOAD
  useEffect(() => {
    searchYouTube('OpTic Yay', function(data) {
      setlistOfVideos(data);
      setVideoSelected(data[0]);
    });
  }, []);

  var selectedVideo = (video) => { // selectedVideo helper function -----------------
    // setVideoSelcted is setting state of each video being selected
    setVideoSelected(video);
  };

  var searchVideo = (query) => { // selectedVideo helper function -----------------
    // setVideoSelcted is setting state of each video being selected
    searchYouTube(query, function(data) {
      setlistOfVideos(data);
      setVideoSelected(data[0]); //nice work
    });
  };


  // search youtube function and pass it down to searchbar
  // on change, run function everytime on current entry
  // useeffect -> videolist

  return (
    <div>
      <nav className="navbar">
        <div className="col-md-6 offset-md-3">
          <div><h5><em>search</em> view goes here</h5>
            <Search search={videoSelected} searchVideo={searchVideo}/>
          </div>
        </div>
      </nav>
      <div className="row">
        <div className="col-md-7">
          <div>
            <h5><em>videoPlayer</em> view goes here</h5>
            <VideoPlayer video={videoSelected}/>
          </div>
        </div>
        <div className="col-md-5">
          <div>
            <h5><em>videoList</em> view goes here</h5>
            <VideoList videos={listOfVideos} selectedVideo={selectedVideo}/>
          </div>
        </div>
      </div>
    </div>
  );
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
