import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { Dashboard } from '../Pages';
import { DetailsPage } from '../Pages';
import { EditPage, ApplyPage, AddAdminPage } from '../Pages';
import { Header } from '../_components';
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        const { loggedIn } = this.props;
        console.log({loggedIn: loggedIn});
        console.log(localStorage.getItem('user'));
        return (
            <div className='App-background'>
                
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <Header />
                                <PrivateRoute exact path="/" component={Dashboard} />
                                <Route exact path="/login" component={LoginPage} />
                                <PrivateRoute exact path="/details" component={DetailsPage} />
                                <PrivateRoute exact path="/edit" component={EditPage} />
                                <PrivateRoute exact path="/apply" component={ApplyPage} />
                                <PrivateRoute exact path="/addAdmin" component={AddAdminPage} />
                                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                            </div>
                        </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 