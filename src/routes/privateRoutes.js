import {Home} from "../pages";


const privateRoutes = {
  home: {
    path: '/',
    component: Home,
    requiredLogin: true,
  },
}

export default privateRoutes