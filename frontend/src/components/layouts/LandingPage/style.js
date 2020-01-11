import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  title: {
    color: '#240b36',
    fontFamily: 'Muli',
    fontSize: '3rem',
    letterSpacing: 2
  },
  tagLine: {
    color: '#333',
    fontSize: '1rem',
    letterSpacing: 4
  },
  paraGraph: {
    fontSize: '1.4rem',
    fontFamily: 'Muli',
    wordSpacing: 2
  },
  centerHeading: {
    fontSize: '3rem',
    fontFamily: 'Muli',
    textAlign: 'center',
    letterSpacing: 2,
    color: '#240b36'
  },
  missionContent: {
    fontFamily: 'Muli',
    textAlign: 'center',
    wordSpacing: 5,
    fontSize: '1rem'
  },
  ourMissionTabs: {
    backgroundColor: '#D7D3D7',
    padding: '1rem',
    height: '8rem',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#F99A9A',
      color: '#fff'
    }
  }
});

export default useStyles;
