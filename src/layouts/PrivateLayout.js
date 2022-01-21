import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes} from "../routes";
import useAuthentication from "../hooks/useAuthentication";
import {Header} from "../containers";

function PrivateRoute({component: Component, authed, requiredLogin, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => !requiredLogin || authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}
    />
  );
}

const PrivateLayout = () => {

  const {isLoggedIn} = useAuthentication()
  return (
    <div>
      <Header/>
      <div>
        <Switch>
          {Object.values(privateRoutes)
            //.filter(({ requiredLogin }) => !requiredLogin || isLoggedIn)
            .map(({path, component, requiredLogin}) => (
              // <Route exact key={path} path={path} component={component} />
              <PrivateRoute
                exact
                key={path}
                authed={isLoggedIn}
                requiredLogin={requiredLogin}
                path={path}
                component={component}/>
            ))}
          <Redirect from='/' to={privateRoutes.home.path}/>
        </Switch>
      </div>
    </div>
  );
}

export default PrivateLayout