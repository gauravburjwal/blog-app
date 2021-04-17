import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './components/Create';
import BlogDetails from './components/BlogDetails';

const App = () => {
    return (
        <Router>
            <div className='App'>
                <Navbar />
                <div className='content'>
                    <Switch>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route exact path='/create'>
                            <Create />
                        </Route>
                        <Route exact path='/blogs/:id'>
                            <BlogDetails />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;
