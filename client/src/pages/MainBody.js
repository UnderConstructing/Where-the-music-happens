import '../mainBody.scss'
import Toast from '../toast'
function MainBody() {
  return (
    <div className='main-container'>
      <div className="whole">
      <h1 className='main-title'>MAKE BEATS WITH YOUR FRIENDS</h1>
      </div>
      <div className='main-img'>
      <div className="title-profile">
                {/* <!-- Select the text in the preview and type in your own --> */}
                <h1 className="text" data-text="Re-Note"></h1>
                <div className="gradient"></div>
                <div className="spotlight"></div>
            </div>
      </div>
      <h2 className="main-h2">How it works</h2>
      <p className="main-p">With our virtual pad controller, you can create music remotely with your friends and bandmates without any hardware other than your computer. We have virtual sounds native to the app including drum kits and synthesizers as well as capabilities to upload your own samples so you can make the next hit record right from your PC!
      Let’s make some music!
          </p>
      <div className='container1'>
      <h3 className="main-h3">Step 1: Click the sign up button and make an account with a username unique to you!</h3>
      <h3 className="main-h3">Step 2: Go to the sequencer page and make some beautiful music by clicking the buttons. Chat with your friends to collab on music together.</h3>
      <h4 className="main-h3">Step 3: Once you are done with the sequence, save it! If you want to come back to it just log back in and open the saved sequence. Voila MUSIC!</h4>
      </div>
      <div>
        <button className="mainpage-signup" onClick={() => window.location.href = '/registeruser'}>Sign up</button>
        </div>
      </div>
  );
}
export default MainBody;