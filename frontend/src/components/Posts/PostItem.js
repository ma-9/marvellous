import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CloseIcon from '@material-ui/icons/Delete';

const PostItem = ({
  auth,
  post: { _id, name, text, avatar, user, likes, comments, date }
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <a href='profile.html'>
          <img className='round-img' src={avatar} alt={name} />
          <h4>{name}</h4>
        </a>
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
          <button type='button' className='btn btn-light'>
            <ThumbUpIcon />
            {likes.length > 0 && <span>{likes.length}</span>}
          </button>
          <button type='button' className='btn btn-light'>
            <ThumbDownIcon />
          </button>
          <Link to={`/post/${_id}`} className='btn btn-primary'>
            Discussion
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button type='button' className='btn btn-danger'>
              <CloseIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(PostItem);
