import '../mainBody.scss'

function MainBody() {
  return (

    <div className='main-container'>
      <div className="whole">
      <h1 className='main-title'>MAKE BEATS WITH YOUR FRIENDS</h1>
      </div>
      <img className="main-img" src='https://www.pngfind.com/pngs/b/102-1029511_vaporwave-png.png” alt=“FuckJerry' />
      <h2 className="main-h2">How it works</h2>
      <p className="main-p">With our virtual pad controller, you can create music remotely with your friends and bandmates without any hardware other than your computer. We have virtual sounds native to the app including drum kits and synthesizers as well as capabilities to upload your own samples so you can make the next hit record right from your PC!
      Let’s make some music!
          </p>
      <div>
      <h2 className="main-h3">Step 1</h2>
      <h2 className="main-h3">Step 2</h2>
      <h2 className="main-h3">Step 3</h2>
      </div>
      <p className="main-p">
        <a onClick={() => window.location.href = '/register'} className="main-a">Sign up</a>
      </p>
      {/* <ExampleModal /> */}
      </div>
  );
}
export default MainBody;