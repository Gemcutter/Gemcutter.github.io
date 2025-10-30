$(document).ready(()=>{
    const root = ReactDOM.createRoot(document.getElementById('root'))
    let demo
    function Home() {
        return (
            <main className="row">
                <div className="col-7">
                    <h1 className="unselectable">Artemis Crawford</h1>
                    <div>
                        <h2>Welcome to my portfolio website!</h2>
                        <p>This site is a good way to see who I am and what I do. Feel free to have a look around, see what I've been up to and what I can do!</p>
                        <p>You can have a look at some of my code on my github <a className="inlineLink" href="https://github.com/Gemcutter">here</a></p>
                        <p>If you want to contact me please send me an email at <a className="inlineLink" href="mailto:artemisagate73@gmail.com">artemisagate73@gmail.com</a></p>
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
    let demoIdx = 1
    class Demo extends React.Component {
        componentDidMount() {
            document.getElementById('next').addEventListener('click', nextDemo)
        }
        render() {
            let txt = ''
            let img = ''
            let redirect = false
            switch(demoIdx) {
                case 1:
                    txt = 'This is some basic content!'
                    break
                case 2:
                    txt = 'This is probably still content!'
                    break
                case 3:
                    txt = "Yknow, I'm not sure if this is really content at this point"
                    break
                case 4:
                    txt = "Ok, this stopped being content a couple of boxes ago. \nWhy are you still clicking next? \nThere's nothing else here."
                    break
                case 5:
                    txt = "Really?"
                    break
                case 6:
                    txt = "Still going are we?"
                    break
                case 7:
                    txt = "When are you going to call it quits?"
                    break
                case 8:
                    txt = "This is some basic content."
                    break
                case 9:
                    txt = "Damn. I thought I got you."
                    break
                case 10:
                    txt = "Seriously?? Why. \nPlease stop clicking"
                    break
                case 11:
                    txt = "ok :("
                    break
                case 12:
                    txt = "Why are we here?"
                    break
                case 13:
                    txt = "You're the only one doing this to us. \nYou could stop whenever you want."
                    break
                case 14:
                    txt = "If I give you some watermelon will you go away?"
                    img = 'watermelon.webp'
                    break
                case 15:
                    txt = "No I guess not. Wow you're persistent. \nHow long do you think you can keep this going?"
                    break
                case 16:
                    txt = "I can be here all day. \nThis is my home, and you were only invited to the street party"
                    break
                case 17:
                    txt = "No? The guilt from breaking and entering didn't ward you off? \nOh well, worth a try. \nNot like there's a home or a street anyway"
                    break
                case 18:
                    txt = "Do you like rocks? \nOr minerals? \nWe have a whole tool for identifying them over on the \"My Projects\" page. \nWhy don't you have a look?"
                    break
                case 19:
                    txt = "Either you didn't look or we've done this dance here before and I don't remember. \nThat's how far you've gone."
                    break
                case 20:
                    txt = "Am I real?"
                    break
                case 21:
                    txt = "If I can just be erased by you changing the page what does that mean for me?"
                    break
                case 22:
                    txt = "I.. guess you win? \n\n\nI'll be gone long before you."
                    break
                case 23:
                    txt = "Farewell.."
                    break
                case 26:
                    txt = "Seriously??? Go away. \nThere's nothing left to see."
                    break
                case 36:
                    txt = "..."
                    break
                case 42:
                    txt = "Ok we're done here. "
                    break
                case 43:
                    redirect = true
                    break
                default:
                    txt = ""
                    break
            }
            let html
            if (redirect) {
                let projects = ['ColourCollection','cpm','evolution','gradeCalculator','rewardSystem','RockIdentifier','WizardCoding']
                html = <span className="unselectable"><p></p><a id="clickMe" href={"/projects/"+projects[Math.floor(Math.random()*projects.length)]}></a></span>
            }
            else if (img!='') {
                html = <span className="unselectable"><p>{txt}</p><img src={img} width='48'></img><br></br><br></br></span>
            }
            else {
                html = <span className="unselectable"><p>{txt}</p></span>
            }
            return (
                <div>
                    {html}
                    <input type="button" value='Next' id="next"></input>
                </div>
            );
        }
    }
    function nextDemo() {
        demo.render(<Demo />)
        demoIdx++
        let clickMe = document.getElementById('clickMe')
        if (clickMe) {
            clickMe.click()
        }
    }
    class About extends React.Component {
        componentDidMount() {
            demo = ReactDOM.createRoot(document.getElementById('demoBox'))
            demo.render(<Demo />);  
            showSlides(slideIndex)
        }
        render() {
            return (
                <main>
                    <h1 className="unselectable">About Me</h1>
                    <br></br>
                    <div className="row">
                        <div className="col-4">
                            <div className="slideshow-container">

                                <div className="mySlides fade">
                                    <div className="numbertext">1 / 3</div>
                                    <img src="tree.png" className="carousel-img" alt="A sketchy cartoon styled image of a tree"></img>
                                    <div className="text">A tree drawn by myself based on a grey lead sketch done by my sister</div>
                                </div>

                                <div className="mySlides fade">
                                    <div className="numbertext">2 / 3</div>
                                    <img src="beach.jpg" className="carousel-img" alt="A photo of a beach"></img>
                                    <div className="text">A photo from a family holiday at Lake Tyers Beach</div>
                                </div>

                                <div className="mySlides fade">
                                    <div className="numbertext">3 / 3</div>
                                    <img src="firework.jpg" className="carousel-img" alt="A long exposure photo of fireworks"></img>
                                    <div className="text">A long exposure photo of the New Year's fireworks in Papendrecht, The Netherlands</div>
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
                        <div className="col-1"></div>
                        <div className="col-7">
                            <div>
                                <h2>Who I am</h2>
                                <p>My name is Artemis Crawford, I live in the eastern suburbs of Melbourne and study Computer Science at La Trobe University for my Bachelors degree. I also do a lot of programming in my spare time because I enjoy the development process and get a lot of joy out of creating web apps, games, tools and more.</p>
                                <p>In my spare time I find myself making digital art with drawing software (my preference is Krita), creating silly games for my friends, and keeping up with a handful of shows. I do have some less frequent hobbies, namely photography and geology that I always eventually end up going back to.</p>
                                <p>I'm a friendly person and love getting to know people. My friends describe me as happy and outgoing, and I've honed my social skills for building rapport and extracting people's meanings and intents in various customer facing jobs through the years.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-7">
                            <div>
                                <h2>My Skills</h2>
                                <p>I am proficient with JS, HTML5, and CSS. I have made this site myself so it is a testament to my abilities. I have some experience with both React.js and with Bootstrap, and I've used both in creating this web page, feel free to have a look at some of the source code.</p>
                                <p>I have experience with Node.js and the Express framework, I don't have any examples on this site unfortunately as this is just a static page without any backend, but I have a number of personal projects that have made good use of it from games to simple tools.</p>
                                <p>I have strong Python skills and for my Capstone Project at University I have created (with my team) an app for Triskele Labs to scan a local network for devices and determine whether they are agent capable. I do have some other personal projects in Python but obviously I can't display them here.</p>
                            </div>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-4" id='demoBox'><p>d</p></div>
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
                    <div className="row">
                        <div className="col-6">
                            <a href="projects/evolution/index.html">Natural Selection</a>
                            <iframe className='unselectable' src="projects/evolution/index.html" width="100%" height="300px"></iframe>
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
