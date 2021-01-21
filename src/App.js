import React, { Component, useContext } from 'react';

import Posts from './components/Posts';
import Selector from './components/Selector';
import { Context } from './components/RedditContext';

// class App extends Component {
function App(){
  // componentDidMount() {
  //   const { fetchPosts } = this.context;
  //   fetchPosts();
  // }

  // renderLastUpdatedAt() {
  //   const { selectedSubreddit, postsBySubreddit } = this.context;
  //   const { lastUpdated } = postsBySubreddit[selectedSubreddit];

  //   if (!lastUpdated) return null;

  //   return (
  //     <span>
  //       {`Last updated at ${new Date(lastUpdated).toLocaleTimeString()}.`}
  //     </span>
  //   );
  // }

  const renderLastUpdatedAt = (selectedSubreddit, postsBySubreddit) => {
    //const { selectedSubreddit, postsBySubreddit } = useContext(Context);
    const { lastUpdated } = postsBySubreddit[selectedSubreddit];

    if (!lastUpdated) return null;

    return (
      <span>
        {`Last updated at ${new Date(lastUpdated).toLocaleTimeString()}.`}
      </span>
    );

  }

  //renderRefreshButton() {
  //  const { isFetching, refreshSubreddit } = this.context;
  const renderRefreshButton = (isFetching, refreshSubreddit) => {
    //const { isFetching, refreshSubreddit } = useContext(Context);
    if (isFetching) return null;

    return (
      <button
        type="button"
        onClick={(event) => refreshSubreddit(event)}
        disabled={isFetching}
      >
        Refresh
      </button>
    );
  }

  //render() {
    const { selectedSubreddit, postsBySubreddit, isFetching, refreshSubreddit } = useContext(Context);    
    const { items: posts = [] } = postsBySubreddit[selectedSubreddit];
    const isEmpty = posts.length === 0;

    return (
      <div>
        <Selector />
        <div>
          {renderLastUpdatedAt(selectedSubreddit, postsBySubreddit)}
          {renderRefreshButton(isFetching, refreshSubreddit)}
        </div>
        {isFetching && <h2>Loading...</h2>}
        {!isFetching && isEmpty && <h2>Empty.</h2>}
        {!isFetching && !isEmpty && <Posts />}
      </div>
    );
  
}

//App.contextType = Context;

export default App;