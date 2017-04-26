import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, Switch } from 'react-router';
import { App } from "./App";
import { createBrowserHistory } from 'history';

ReactDOM.render(
    <Router history={createBrowserHistory()}>
        <Switch>
            <Route path="/" component={App} />
        </Switch>
    </Router>,
    document.getElementById("root")
);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);