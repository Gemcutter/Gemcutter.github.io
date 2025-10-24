$(document).ready(()=>{
    const root = ReactDOM.createRoot(document.getElementById('root'))
    function Home() {
        return (
            <main className="row">
                <div className="col-8">
                    <h1 className="unselectable">Artemis Crawford</h1>
                    <div>
                        <h2>Welcome to my portfolio website!</h2>
                        <p>This site is a good way to see who I am and what I do. Feel free to have a look around, see what I've been up to and what I can do.</p>
                    </div>
                </div>
                <div className="col-4">
                    <img src="photo.jpg" width="100%"></img>
                </div>
            </main>
        );
    }
    function About() {
        return (
            <main className="row">
                <div className="col-8">
                    <h1 className="unselectable">About Me</h1>
                    <br></br>
                    <div>
                        <h2>My Skills and Projects</h2>
                        <h4>Skills</h4>
                        <p>I am proficient with Js, HTML, and CSS. Given that I made this site I'd say I'm pretty decent. I have some experience with both React.js and with Bootstrap, and I've used both in creating this web page, feel free to have a look at some of the source code.</p>
                    </div>
                </div>
            </main>
        );
    }
    function Projects() {
        return (
            <main>
                <h1 className="unselectable title">My Projects</h1>
                <div className="table">
                    <div className="row">
                        <div className="col-6">
                            <a href="projects/RockIdentifier/index.html">Rock Identifier</a>
                            <iframe className='unselectable' src="projects/RockIdentifier/index.html" width="100%" height="300px"></iframe>
                        </div>
                        <div className="col-6">
                            <a href="projects/WizardCoding/index.html">Wizard Coding</a>
                            <iframe className='unselectable' src="projects/WizardCoding/index.html" width="100%" height="300px"></iframe>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <a href="projects/ColourCollection/index.html">Colour Data Collection</a>
                            <iframe className='unselectable' src="projects/ColourCollection/index.html" width="100%" height="300px"></iframe>
                        </div>
                        <div className="col-6">
                            <a href="projects/cpm/index.html">Clicks Per Minute</a>
                            <iframe className='unselectable' src="projects/cpm/index.html" width="100%" height="300px"></iframe>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <a href="projects/gradeCalculator/index.html">Grade Calculator</a>
                            <iframe className='unselectable' src="projects/gradeCalculator/index.html" width="100%" height="300px"></iframe>
                        </div>
                        <div className="col-6">
                            <a href="projects/rewardSystem/index.html">Rewards System</a>
                            <iframe className='unselectable' src="projects/rewardSystem/index.html" width="100%" height="300px"></iframe>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
    root.render(<Home />);  
    // Navigation link highlighting
    $(document).ready(function() {
        const path = window.location.pathname;
        const page = path.split("/").pop();
        $('#home').on('click', function() {
            root.render(<Home />);  ;
        });
        $('#about').on('click', function() {
            root.render(<About />);
        });
        $('#projects').on('click', function() {
            root.render(<Projects />);
        });
    }); 
})
