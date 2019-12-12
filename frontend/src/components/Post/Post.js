import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import { getSinglePost } from '../../actions/post';
import PostItem from '../Posts/PostItem';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getSinglePost, post: { post, loading }, match }) => {
  useEffect(() => {
    getSinglePost(match.params.id);
  }, [getSinglePost, match.params.id]);
  if (loading) {
    return <Spinner />;
  }
  if (!loading && !post) {
    return <p>Data Empty</p>;
  }
  return (
    <Fragment>
      <Link to='/posts' className='btn btn-dark'>
        <div style={{ display: 'flex' }}>
          <ArrowBackIosIcon />
          Back to Posts
        </div>
      </Link>
      <PostItem post={post} showAction={false} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getSinglePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getSinglePost })(Post);
