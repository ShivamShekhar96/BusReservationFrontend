import logo from './logo.svg';
import './App.css';
import AppRoutes from './app/AppRoutes';
import { getObjectClassNames } from './design/utils';

const classes = getObjectClassNames({
  appContainer: {
    display: 'flex',
    flexDirection: 'column'
  }
})

function App() {
  return (
    <div className={classes.appContainer}>
      <AppRoutes />
    </div>
  );
}

export default App;
