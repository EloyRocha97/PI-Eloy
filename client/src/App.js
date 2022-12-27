import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import AddRecipe from "./components/AddRecipe/AddRecipe";
import { NavBar } from "./components/Nav/NavBar";
import About from "./components/About/About";

function App() {
	return (
		<div className="App">
			<Route
				exact
				path="/"
				component={LandingPage}
			/>
			<Route
				path={["/home", "/recipes", "/about", "/addrecipes"]}
				component={NavBar}
			/>
			<Route
				path="/home"
				component={Home}
			/>
			<Route
				path="/recipes/:id"
				component={Details}
			/>
			<Route
				path="/about"
				component={About}
			/>
			<Route
				path="/addrecipes"
				component={AddRecipe}
			/>
		</div>
	);
}

export default App;
