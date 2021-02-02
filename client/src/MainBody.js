import ExampleModal from './ExampleModal'

function MainBody() {
    return (
        <div>
        <h1 class="h1">MAKE BEATS WITH YOUR FRIENDS</h1>
          <img src="https://www.pngfind.com/pngs/m/102-1029511_vaporwave-png-90s-cup-pattern-transparent-png.png" alt="FuckJerry"/>
        <h2>How it works</h2>
        <p class="lead">With our virtual pad controller, you can create music virtually with your friends and bandmates without needing any hardware other than your computer. We have virtual sounds native to the app including drum kits and synthesizers and has capabilities to upload your own samples so you can make the next hit record right from your PC!
          Let's make some music!
          .</p>
        <p class="lead">
          <a href="#" class="btn btn-lg btn-secondary fw-bold border-white bg-white" href="signup.html
        ">Sign up</a>
        </p>
        <ExampleModal />
        </div>
      
    );
  }
  export default MainBody;