import React from "react";
import "./About.css";
import Express from "./express.svg";
import Js from "./js.svg";
import HtmlCss from "./HtmlCss.svg";
import Postgres from "./postgres.svg";
import ReactSvg from "./react2.svg";
import Redux from "./redux.svg";
import Sequelize from "./sequelize.svg";
import Linkedin from "./linkedin.svg";
import Gmail from "./gmail.svg";
import Github from "./github.svg";

const About = () => {
    return (
        <div className="About">
            <div className="About-Background">
                <div className="About-Title">
                    <h1>PI-Food</h1>
                    <p>
                        Y ACA ALGUNAS COSAS SOBRE MI
                    </p>
                </div>

                <h1 className="About-Text">TECNOLOGIAS:</h1>
                <div className="technologies-div">
                    <img
                        className="technologies"
                        alt="JsImg"
                        src={Js}
                    ></img>
                    <img
                        className="technologies"
                        alt="HtmlCssImg"
                        src={HtmlCss}
                    ></img>

                    <img
                        className="technologies"
                        alt="ExpressImg"
                        src={Express}
                    ></img>
                    <img
                        className="technologies"
                        alt="PostgresImg"
                        src={Postgres}
                    ></img>
                    <img
                        className="technologies"
                        alt="ReactSvg"
                        src={ReactSvg}
                    ></img>
                    <img
                        className="technologies"
                        alt="ReduxImg"
                        src={Redux}
                    ></img>
                    <img
                        className="technologies"
                        alt="SequelizeImg"
                        src={Sequelize}
                    ></img>
                </div>

                <div className="About-My">
                    <h1 className="About-Text">contact:</h1>
                    <a
                        href="mailto:rochaeloy11@gmail.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            className="links"
                            alt="GmailImg"
                            src={Gmail}
                        ></img>{" "}
                    </a>

                    <a
                        href="https://www.linkedin.com/in/eloy-rocha-6a92901b3/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {" "}
                        <img
                            className="links"
                            alt="LinkedinImg"
                            src={Linkedin}
                        ></img>{" "}
                    </a>

                    <a
                        href="https://github.com/EloyRocha97"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            className="links"
                            alt="Github"
                            src={Github}
                        ></img>{" "}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;
