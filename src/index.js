import { register } from "./Components/BaseComponent";
import PostComponent from "./components/Post";
import UserComponent from "./Components/UserComponent";
import App from "./pages/App";

register("dv-user", UserComponent);
register("dv-post", PostComponent);
register("dv-app", App);
