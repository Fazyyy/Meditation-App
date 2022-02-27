document.addEventListener('DOMContentLoaded', () => {

  const app = () => {

    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');

    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    //Get playback outline
    const outlineLength = outline.getTotalLength();
    //Duration to play
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //Sound selector
    sounds.forEach(sound => {
      sound.addEventListener("click", function(){
        song.src = this.getAttribute('data-sound');
        checkPlaying(song);
      })
    });

    //play sound
    play.addEventListener("click", function() {
      checkPlaying(song);
    });

    //Select Sound
    timeSelect.forEach(option => {
      option.addEventListener("click", function() {
        fakeDuration = this.getAttribute('data-time');
        timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
      });
    });

    //Function to toggle playback
    const checkPlaying = song => {
      if(song.paused) {
        song.play();
        play.src = 'pause.svg';
      } else {
        song.pause();
        play.src = 'play.svg';
      }
    };

    //Animate playback circle
    song.ontimeupdate = () => {
      let currentTime = song.currentTime;
      let elapsed = fakeDuration - currentTime;
      let seconds = Math.floor(elapsed % 60);
      let minutes = Math.floor(elapsed / 60);

      //Animate playback
      let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
      outline.style.strokeDashoffset = progress;

      //Update text
      timeDisplay.textContent = `${minutes}:${seconds}`;

      if(currentTime >= fakeDuration) {
        song.pause();
        song.currentTime = 0;
        play.src = "play.svg";
      }

    }

  };

  app();

});
