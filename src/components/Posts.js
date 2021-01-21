import React, { useContext } from 'react';

import { Context } from './RedditContext';

const Posts = () => {
  //<Consumer>  }
  const { posts } = useContext(Context);
  //{({ posts }) => (   
  return(
    <ul>
      {posts.map(({ id, title }) => <li key={id}>{title}</li>)}
    </ul>
  );
  //)}
  //</Consumer>
};

export default Posts;