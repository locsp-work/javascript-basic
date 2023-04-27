var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var audio = $('#audio');
const app = {
    currentSelect: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    limitRepeat: 10,
    songs: [
        {
            name: 'Goi ten em',
            singer: 'Min',
            audio: './src/assets/1.mp3',
            image: './src/assets/1.png'
        },
        {
            name: 'Mot nam moi binh an',
            singer: 'Son Tung MTP',
            audio: './src/assets/2.mp3',
            image: './src/assets/2.png'
        },
        {
            name: 'Con trong ki niem',
            singer: 'Le Quyen',
            audio: './src/assets/3.mp3',
            image: './src/assets/3.png'
        },
        {
            name: 'Goi ten em',
            singer: 'Min',
            audio: './src/assets/4.mp3',
            image: './src/assets/4.jpg'
        },
        {
            name: 'Mot nam moi binh an',
            singer: 'Son Tung MTP',
            audio: './src/assets/5.mp3',
            image: './src/assets/5.png'
        },
        {
            name: 'Con trong ki niem',
            singer: 'Le Quyen',
            audio: './src/assets/6.mp3',
            image: './src/assets/6.png'
        },
        {
            name: 'Goi ten em',
            singer: 'Min',
            audio: './src/assets/7.mp3',
            image: './src/assets/7.png'
        },
        {
            name: 'Mot nam moi binh an',
            singer: 'Son Tung MTP',
            audio: './src/assets/8.mp3',
            image: './src/assets/8.jpeg'
        },
        {
            name: 'Con trong ki niem',
            singer: 'Le Quyen',
            audio: './src/assets/9.mp3',
            image: './src/assets/9.jpeg'
        }
    ],
    defineProperties() {
        var $this = this;
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return $this.songs[$this.currentSelect]
            }
        })
    },
    handleEvent() {
        var $this = this;
        //Scroll view
        var widthScale = $('.cd').offsetWidth
        document.onscroll = function () {
            var offsetTop = document.documentElement.scrollTop
            $('.cd').style.width = widthScale - offsetTop < 0 ? '0px' : widthScale - offsetTop + 'px';
        }
        $('.btn.btn-random').onclick = function () {
            if (!this.classList.contains('active')) {
                $this.isRandom = true;
                this.classList.add('active')
            } else {
                $this.isRandom = false;
                this.classList.remove('active');
                this.limitRepeat = 10;
            }
        }
        $('.btn.btn-repeat').onclick = function () {
            if (!this.classList.contains('active')) {
                $this.isRepeat = true;
                this.classList.add('active')
            } else {
                $this.isRepeat = false;
                this.classList.remove('active')
            }
        }

    },
    playAudio() {
        this.isPlaying = !this.isPlaying;
        $('.fas.icon-pause').style.display = 'inline-block'
        $('.fas.icon-play').style.display = 'none'
        audio.play();
        this.onChangeTime();
        $('.cd-thumb').classList.add('spin');
    },
    stopAudio() {
        this.isPlaying = !this.isPlaying;
        $('.fas.icon-pause').style.display = 'none'
        $('.fas.icon-play').style.display = 'inline-block'
        audio.pause();
        $('.cd-thumb').classList.remove('spin')
    },
    controllProcess() {
        var $this = this;
        $('.btn.btn-toggle-play').onclick = function (e) {
            e.preventDefault();
            !$this.isPlaying ? $this.playAudio() : $this.stopAudio()
        }
        $this.nextSong();
        $this.prevSong();
        $this.chooseSong();
        $this.onSeekTime();
        $this.onEnded();
    },
    nextSong() {
        $('.btn.btn-next').onclick = () => {
            if (this.isRandom) {
                this.currentSelect = Math.floor(Math.random() * (this.songs.length - 1));
            } else {
                (this.currentSelect === this.songs.length - 1)  ? this.currentSelect = 0 : ++this.currentSelect
            }
            this.render();
            this.playAudio();
        }
    },
    prevSong() {
        $('.btn.btn-prev').onclick = () => {
            if (this.isRandom) {
                this.currentSelect = Math.floor(Math.random() * (this.songs.length - 1));
            } else {
                (this.currentSelect === this.songs.length - 1)  ? this.currentSelect = 0 : ++this.currentSelect
            }
            this.render();
            this.playAudio();
        }
    },
    onChangeTime() {
        audio.ontimeupdate = function () {
            var progressVal = Math.floor(audio.currentTime / (audio.duration / 100));
            $('.progress').value = progressVal;
        }
    },
    onSeekTime() {
        var $this = this;
        $('.progress').oninput = function (e) {
            var duration = audio.duration;
            var timeupdateVal = e.target.value * (duration / 100);
            audio.currentTime = timeupdateVal;
            $this.onChangeTime()
        } 
    },
    onEnded() {
        audio.onended = () => {
            if (this.isRepeat) {
                if (--this.limitRepeat >= 0) {
                    this.playAudio()
                } else {
                    if (confirm("Ban da repeat qua nhieu")) {
                        this.limitRepeat = 10;
                        this.stopAudio();
                    } else {
                        
                    }
                }
            } else {
                $('.btn.btn-next').click();
            }
        }
    },
    chooseSong() {
        var $this = this;
        $('.playlist').onclick = function (e) {
            var thisSong = e.target.closest('.song:not(.active)');
            if (thisSong) {
                $this.currentSelect = Number(thisSong.getAttribute('data-id'));
                $this.render();
                $this.playAudio();
            }
        }
    },
    render() {
        var $this = this;
        let songlistHtml = '';
        this.songs.map((song, index) => {
            songlistHtml += `<div class="song ${$this.currentSelect === index ? 'active' : ''}" data-id="${index}">
            <div
              class="thumb"
              style="
                background-image: url('${song.image}');
              "
            ></div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>`
        });
        $('.playlist').innerHTML = songlistHtml;
        $('.cd-thumb').style.backgroundImage = `url('${this.currentSong.image}')`;
        $('header h2').innerText = this.currentSong.name
        audio.setAttribute('src', this.currentSong.audio)
    },
    start() {
        this.defineProperties();
        this.render();
        this.handleEvent();
        this.controllProcess();
    },
}
app.start();