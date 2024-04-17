import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    pg: {
        background: 'linear-gradient(to bottom,   #26B1FF, #fff )',
        alignContent: 'center',
    },
  paper: {
    padding: '2rem',
    textAlign: 'center',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    background: 'linear-gradient(to bottom, #3498db, #2c3e50 )',
    transition: 'background 0.5s ease',
  },
  avatar: {
    width: '150px',
    height: '150px',
    margin: '1rem auto',
    cursor: 'pointer',
    border: '4px solid #fff',
    borderRadius: '50%',
    transition: 'transform 0.3s ease',
  },
  uploadButton: {
    marginTop: '2.5rem',
    marginBottom: '2.5rem',
    backgroundColor: '#2c3e50',
    color: 'white',
    transition: 'background 0.3s ease',
  },
  typo: {
    color: '#fff',
  },
  detailsContainer: {
    marginTop: '2rem',
  },
  goBackButton: {
    marginTop: '1.5rem',
    marginBottom: '1rem',
    background: '#B1FF26',
    fontWeight: 'bold',
    color: 'black',
    transition: 'background 0.3s ease',
  },
  groupList: {
    listStyle: 'none',
    padding: 0,
    margin: '0.5rem 0',
  },  
}));

export default useStyles;
