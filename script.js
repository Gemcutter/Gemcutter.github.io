$(document).ready(()=>{
    const root = ReactDOM.createRoot(document.getElementById('root'))
    function Home() {
        return (
            <main className="row">
                <div className="col-7">
                    <h1 className="unselectable">Artemis Crawford</h1>
                    <div>
                        <h2>Welcome to my portfolio website!</h2>
                        <p>This site is a good way to see who I am and what I do. Feel free to have a look around, see what I've been up to and what I can do!</p>
                        <p>You can have a look at some of my code on my github <a className="inlineLink" href="https://github.com/Gemcutter">here</a></p>
                    </div>
                </div>
                <div className="col-1"></div>
                <div className="col-4">
                    <img src="photo.jpg" width="100%" alt="A photo of Artemis in an outdoor setting. She is wearing a loose white shirt and blue jeans."></img>
                </div>
            </main>
        );
    }
    let slideIndex = 1;
    // Next/previous controls
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            slides[slideIndex-1].style.opacity = 0;
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";
        slides[slideIndex-1].style.opacity = 1;
        dots[slideIndex-1].className += " active";
    }
    function next() {
        plusSlides(1)
    }
    function prev() {
        plusSlides(-1)
    }
    function slide1() {
        currentSlide(1)
    }
    function slide2() {
        currentSlide(2)
    }
    function slide3() {
        currentSlide(3)
    }
    class About extends React.Component {
        componentDidMount() {
            
            showSlides(slideIndex)
        }
        render() {
            return (
                <main>
                    <h1 className="unselectable">About Me</h1>
                    <br></br>
                    <div className="row">
                        <div className="col-7">
                            <div>
                                <h2>Who I am</h2>
                                <p>My name Artemis Crawford, I live in the eastern suburbs of melbourne and study Computer Science at La Trobe University for my Bachelors degree. I also do a lot of programming in my spare time because I enjoy the development process and get a lot of joy out of creating web apps, games, tools and more.</p>
                                <p>In my spare time I find myself making digital art with drawing software (my preference is Krita), creating silly games for my friends, and keeping up with a handful of shows. I do have some less frequent hobbies, namely photography and geology that I always eventually end up going back to.</p>
                                <p>I'm a friendly person and love getting to know people. My friends describe me as happy and outgoing, and I've honed my social skills for building rapport and extracting peoples meanings and intents in various customer facing jobs through the years.</p>
                            </div>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-4">
                            <div className="slideshow-container">

                                <div className="mySlides fade">
                                    <div className="numbertext">1 / 3</div>
                                    <img src="tree.png" className="carousel-img" alt="A sketchy cartoon styled image of a tree"></img>
                                    <div className="text">A tree drawn by myself based on a greyled sketch done by my sister</div>
                                </div>

                                <div className="mySlides fade">
                                    <div className="numbertext">2 / 3</div>
                                    <img src="beach.jpg" className="carousel-img" alt="A photo of a beach"></img>
                                    <div className="text">A photo from a family holiday at Lake Tyers Beach</div>
                                </div>

                                <div className="mySlides fade">
                                    <div className="numbertext">3 / 3</div>
                                    <img src="firework.jpg" className="carousel-img" alt="A long exposure photo of fireworks"></img>
                                    <div className="text">A long exposure photo of the new years fireworks in Papendrecht, The Netherlands</div>
                                </div>

                                <a className="prev" onClick={prev}>&#10094;</a>
                                <a className="next" onClick={next}>&#10095;</a>
                            </div>
                            <br></br>

                            <div className="text-center">
                                <span className="dot" onClick={slide1}></span>
                                <span className="dot" onClick={slide2}></span>
                                <span className="dot" onClick={slide3}></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-1"></div>
                        <div className="col-7">
                            <div>
                                <h2>My Skills</h2>
                                <p>I am proficient with JS, HTML5, and CSS. Given that I made this site I'd say I'm pretty decent. I have some experience with both React.js and with Bootstrap, and I've used both in creating this web page, feel free to have a look at some of the source code.</p>
                                <p>I have experience with Node.js and the Express framework, I don't have any examples on this site unfortunately as this is just a static page without any backend, but I have a number of personal projects that have made good use of it from games to simple tools.</p>
                                <p>I have strong python skills and for my capstone project at University I have created (with my team) an app for Triskele Labs to scan a local network for devices and determine whether they are agent capable. I do have some other personal projects in python but obviously I can't display them here.</p>
                            </div>
                        </div>
                    </div>
                    
                </main>
            );
        }
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
    
    
})
