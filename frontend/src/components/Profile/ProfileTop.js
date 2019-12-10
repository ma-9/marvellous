import React from 'react';
import PropTypes from 'prop-types';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import GlobalIcon from '@material-ui/icons/Language';
import GitHubIcon from '@material-ui/icons/GitHub';

const ProfileTop = ({
  profile: {
    status,
    company,
    website,
    location,
    githubusername,
    twitter,
    facebook,
    instagram,
    linkedin,
    youtube,
    user: { name, avatar }
  }
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-img my-1' src={avatar} alt={name} />
      <h1 className='large'>{name}</h1>
      <p className='lead'>
        {status} at {company}
      </p>
      <p> {location} </p>
      <div className='icons my-1'>
        {githubusername && (
          <a
            href={`https://github.com/${githubusername}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <GitHubIcon fontSize='large' color='inherit' />
          </a>
        )}
        {website && (
          <a href={website} target='_blank' rel='noopener noreferrer'>
            <GlobalIcon fontSize='large' color='error' />
          </a>
        )}
        {twitter && (
          <a href={twitter} target='_blank' rel='noopener noreferrer'>
            <TwitterIcon fontSize='large' color='primary' />
          </a>
        )}
        {youtube && (
          <a href={youtube} target='_blank' rel='noopener noreferrer'>
            <YouTubeIcon fontSize='large' color='error' />
          </a>
        )}
        {facebook && (
          <a href={facebook} target='_blank' rel='noopener noreferrer'>
            <FacebookIcon fontSize='large' color='primary' />
          </a>
        )}
        {instagram && (
          <a href={instagram} target='_blank' rel='noopener noreferrer'>
            <InstagramIcon fontSize='large' color='secondary' />
          </a>
        )}
        {linkedin && (
          <a href={linkedin} target='_blank' rel='noopener noreferrer'>
            <LinkedInIcon fontSize='large' color='primary' />
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
