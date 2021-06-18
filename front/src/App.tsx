import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { SignUp, Tags } from './components';
import {
  ExploreContainer,
  HomeContainer,
  LoginContainer,
  PostDetailModalContainer,
  UploadContainer,
} from './containers';
import AuthRoute from './AuthRoute';
import { Redirect, StaticContext, withRouter } from 'react-router';
import { Post } from './store/post/types';

function App({
  location,
}: RouteComponentProps<
  {},
  StaticContext,
  { postDetail: any; mode: 'home' | 'explore'; post: Post }
>) {
  const postDetail = location.state && location.state.postDetail;

  return (
    <>
      <Switch location={postDetail || location}>
        <AuthRoute
          authenticated="loggedIn"
          path="/"
          component={() => <HomeContainer />}
          exact
        />

        <Route path="/login" component={() => <LoginContainer />} />
        <AuthRoute
          authenticated="notLoggedIn"
          path="/signup"
          component={() => <SignUp />}
        />
        <AuthRoute
          authenticated="loggedIn"
          path="/explore/tags/:tag"
          component={() => <Tags />}
        />
        <AuthRoute
          authenticated="loggedIn"
          path="/explore"
          component={() => <ExploreContainer />}
        />
        <AuthRoute
          authenticated="loggedIn"
          path="/upload"
          component={() => <UploadContainer />}
        />
        <AuthRoute
          authenticated="loggedIn"
          path="/post-detail/:postId"
          component={() => <div>hi</div>} // TODO: modal x
          exact
        />
        <Redirect path="*" to="/" />
      </Switch>

      {postDetail && (
        <AuthRoute
          authenticated="loggedIn"
          path="/post-detail/:postId"
          component={() => (
            <PostDetailModalContainer
              mode={location.state.mode}
              post={location.state.post}
            />
          )}
          exact
        />
      )}
    </>
  );
}

export default withRouter(App);
