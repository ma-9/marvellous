import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CloseIcon from '@material-ui/icons/Delete';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  showAction,
  post: { _id, name, text, avatar, user, likes, comments, date }
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt={name} />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <div
          id='PostActionButton'
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          {showAction && (
            <Fragment>
              <button
                style={{ display: 'flex', alignContent: 'center' }}
                type='button'
                className='btn btn-light'
                onClick={() => addLike(_id)}
              >
                <ThumbUpIcon />
                {likes.length > 0 && <span>{likes.length}</span>}
              </button>
              <button
                style={{ display: 'flex', alignContent: 'center' }}
                type='button'
                className='btn btn-light'
                onClick={() => removeLike(_id)}
              >
                <ThumbDownIcon />
              </button>
              <Link to={`/posts/${_id}`} className='btn btn-primary'>
                Discussion
                {comments.length > 0 && (
                  <span className='comment-count'>{comments.length}</span>
                )}
              </Link>
              {!auth.loading && user === auth.user._id && (
                <button
                  onClick={(e) => deletePost(_id)}
                  style={{ display: 'flex', alignContent: 'center' }}
                  type='button'
                  className='btn btn-danger'
                >
                  <CloseIcon />
                </button>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showAction: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
