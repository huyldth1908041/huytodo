import {QueryClient, QueryClientProvider} from "react-query";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import PrivateLayout from "./layouts/PrivateLayout";
import {LoginPage, RegisterPage} from "./pages";
// import { Link } from "react-router-dom";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <Route exact path='/login' component={LoginPage}/>
            <Route exact path='/register' component={RegisterPage}/>
            <PrivateLayout/>
          </Switch>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
