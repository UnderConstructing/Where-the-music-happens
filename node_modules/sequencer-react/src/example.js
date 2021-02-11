const musicData = [
    [0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]
  ]
  
  setTimeout(() => {
    audioScene()
  }, 0)
  
  function audioScene () {
    ReactDOM.render((
      <MusicBox data={musicData} />
    ), document.getElementById('js-app'))
  }
  
  class MusicBox extends React.Component {
    state = {
      index: 0
    }
  
    constructor (props) {
      super(props)
      const keys = new Tone.Synth({
        'A': 'A4',
        'C#': 'C#4',
        'E': 'E#4',
        'F#': 'F#4'
      }, {
        fadeOut: '64n'
      }).toDestination()
      const noteNames = 'F# E C# A'.split(' ')
      this.loop = new Tone.Sequence((time, x) => {
        for (let y = 0; y < noteNames.length; y++) {
          if (this.props.data[y][x]) {
            keys.get(noteNames[y]).start(time, 0, '32n', 0)
          }
        }
        this.setState({index: x})
      }, [...new Array(16)].map((_, i) => i), '16n')
      Tone.Transport.start()
    }
  
    render () {
      return (
        <div>
          <ScorePlot
              width={this.props.data[0].length}
              height={this.props.data.length}
              data={this.props.data}
              index={this.state.index}
          />
          <PlayButton loop={this.loop} />
        </div>
      )
    }
  }
  
  class ScorePlot extends React.Component {
    handleChange = (x, y) => {
      return e => {
        this.props.data[y][x] = +e.currentTarget.checked
        this.forceUpdate()
      }
    }
  
    render () {
      return (
        <table>
          <tbody>
            {[...new Array(this.props.height)].map((_, y) => (
              <tr key={y}>
                {[...new Array(this.props.width)].map((_, x) => (
                  <td key={x}>
                    <input
                        type="checkbox"
                        checked={this.props.data[y][x]}
                        onChange={this.handleChange(x, y)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              {[...new Array(this.props.width)].map((_, x) => (
                <td key={x}>
                  <input
                      type="checkbox"
                      checked={x === this.props.index}
                      disabled
                  />
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      )
    }
  }
  
  class PlayButton extends React.Component {
    state = {
      isPlaying: false
    }
  
    onClick = () => {
      const isPlaying = !this.state.isPlaying
      this.setState({isPlaying})
      if (isPlaying) {
        this.props.loop.start()
      } else {
        this.props.loop.stop()
      }
    }
  
    render () {
      return (
        <button
            type="button"
            onClick={this.onClick}
        >{this.state.isPlaying ? 'Stop' : 'Play'}</button>
      )
    }
  }




  const [playArray, setPlayArray] = useState({
    columns: [
      {
        id: 1,
        isActive: false
      },
      {
        id: 2,
        isActive: false
      },
      {
        id: 3,
        isActive: false
      },
      {
        id: 4,
        isActive: false
      },
      {
        id: 5,
        isActive: false
      },
      {
        id: 6,
        isActive: false
      },
      {
        id: 7,
        isActive: false
      },
      {
        id: 8,
        isActive: false
      }
    ]
  })
  function toggleNote(index) {
  let notesPlayed = [...playArray.columns]
    notesPlayed[index].isActive
    ? notesPlayed[index].isActive = false
    : notesPlayed[index].isActive = true
    setPlayArray({...playArray, columns: notesPlayed})
    console.log(playArray)
  }