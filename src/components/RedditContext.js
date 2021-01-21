import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getPostsBySubreddit } from '../services/redditAPI';

const Context = createContext();
const { Provider, Consumer } = Context;

// class RedditProvider extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       postsBySubreddit: {
//         frontend: {},
//         reactjs: {},
//       },
//       selectedSubreddit: 'reactjs',
//       shouldRefreshSubreddit: false,
//       isFetching: false,
//     };

//     this.fetchPosts = this.fetchPosts.bind(this);
//     this.shouldFetchPosts = this.shouldFetchPosts.bind(this);
//     this.handleFetchSuccess = this.handleFetchSuccess.bind(this);
//     this.handleFetchError = this.handleFetchError.bind(this);
//     this.handleSubredditChange = this.handleSubredditChange.bind(this);
//     this.handleRefreshSubreddit = this.handleRefreshSubreddit.bind(this);
//   }
function RedditProvider({ children }){
  const [postsBySubreddit, setPostsBySubreddit] = useState({
    frontend: {},
    reactjs: {},
  });
  const [selectedSubreddit, setSelectedSubreddit] = useState('reactjs');
  const [shouldRefreshSubreddit, setShouldRefreshSubreddit] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // componentDidUpdate(_prevProps, prevState) {
  //   const { state } = this;
  //   const { shouldRefreshSubreddit } = state;
  //   const selectedSubredditChanged = prevState.selectedSubreddit !== state.selectedSubreddit;

  //   if (selectedSubredditChanged || shouldRefreshSubreddit) {
  //     this.fetchPosts();
  //   }
  // }

  function fetchPosts() {
    if (!shouldFetchPosts()) return;

    setShouldRefreshSubreddit(false);
    setIsFetching(true);

    getPostsBySubreddit(selectedSubreddit)
      .then(handleFetchSuccess, handleFetchError);
  }

  //shouldFetchPosts() {
  const shouldFetchPosts = () => {
    // const {
    //   selectedSubreddit,
    //   postsBySubreddit,
    //   shouldRefreshSubreddit,
    //   isFetching,
    // } = this.state;
    const posts = postsBySubreddit[selectedSubreddit];

    if (!posts.items) return true;
    if (isFetching) return false;
    return shouldRefreshSubreddit;
  }

  //handleFetchSuccess(json) {
  const handleFetchSuccess = (json) => {
    const lastUpdated = Date.now();
    const items = json.data.children.map((child) => child.data);

    // this.setState((state) => {
    //   const newState = {
    //     ...state,
    //     shouldRefreshSubreddit: false,
    //     isFetching: false,
    //   };

    //   newState.postsBySubreddit[state.selectedSubreddit] = {
    //     items,
    //     lastUpdated,
    //   };

    //   return newState;
    //});
    const newPostsBySubreddit = {
      ...postsBySubreddit,
      [selectedSubreddit]: { items, lastUpdated },
    };

    setPostsBySubreddit(newPostsBySubreddit);
    setShouldRefreshSubreddit(false);
    setIsFetching(false);    
  }

  // handleFetchError(error) {
  //   this.setState((state) => {
  //     const newState = {
  //       ...state,
  //       shouldRefreshSubreddit: false,
  //       isFetching: false,
  //     };

  //     newState.postsBySubreddit[state.selectedSubreddit] = {
  //       error: error.message,
  //       items: [],
  //     };

  //     return newState;
  //   });
  // }
  const handleFetchError = (error) => {
    const newPostsBySubreddit = {
      ...postsBySubreddit,
      [selectedSubreddit]: {
        error: error.message,
        items: [],
      },
    };

    setPostsBySubreddit(newPostsBySubreddit);
    setShouldRefreshSubreddit(false);
    setIsFetching(false);
  }

  //handleSubredditChange(selectedSubreddit) {
  const handleSubredditChange = (selectedSubreddit) => {
    //this.setState({ selectedSubreddit });
    setSelectedSubreddit(selectedSubreddit);
  }

  //handleRefreshSubreddit() {
  const handleRefreshSubreddit = () => {
    //this.setState({ shouldRefreshSubreddit: true });
    setShouldRefreshSubreddit(true);
  }

  //render() {
    //const { children } = this.props;
    //const { selectedSubreddit, postsBySubreddit } = this.state;
    // const context = {
    //   ...this.state,
    //   selectSubreddit: this.handleSubredditChange,
    //   fetchPosts: this.fetchPosts,
    //   refreshSubreddit: this.handleRefreshSubreddit,
    //   availableSubreddits: Object.keys(postsBySubreddit),
    //   posts: postsBySubreddit[selectedSubreddit].items,
    // };
    useEffect(() => {
      fetchPosts();
    }, [fetchPosts, selectedSubreddit, shouldRefreshSubreddit]);

    const context = {
      postsBySubreddit,
      selectedSubreddit,
      shouldRefreshSubreddit,
      isFetching,
      selectSubreddit: setSelectedSubreddit,
      fetchPosts,
      refreshSubreddit: handleRefreshSubreddit,
      availableSubreddits: Object.keys(postsBySubreddit),
      posts: postsBySubreddit[selectedSubreddit].items,
    };

    return (
      <Provider value={context}>
        {children}
      </Provider>
    );
  
}

RedditProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { RedditProvider as Provider, Consumer, Context };