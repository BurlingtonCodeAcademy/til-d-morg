import Home from "./components/Home";
import AllPosts from "./components/AllPosts";
import OnePost from "./components/OnePost";
import OnePostB from "./components/OnePostB"
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./Styles/App.css";


//--------------App function with all the routes-------------------------//
function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/facts/:title" component={OnePost} />
          <Route exact path="/facts" component={AllPosts} />
          <Route path = "/altfacts/:id" component ={OnePostB} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
