const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PLAYER_STORAGE_KEY = 'Viet-Music';
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const shuffleBtn = $(".btn-shuffle");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");
const duration = $(".duration");
const remaining = $(".remaining");
var shuffleArray = [];
const app = {
    isRepeat: false,
    isRandom: false,
    currentIndex: 0,
    isPlaying: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},        
    songs: [
        
        {
            name: '500 Miles',
            singer: 'Justin Timberlake',
            path: 'https://audio.jukehost.co.uk/60r5S2rNFQpCSnKirIGNlzveSs6klXAv',
            image: 'https://i1.sndcdn.com/artworks-000112928659-83o8mj-t500x500.jpg'
        },
        {
            name: 'Lặng',
            singer: 'Rhymastic',
            path: 'https://audio.jukehost.co.uk/9ZZ66GwCfmfrO8SQYvdcGE19HhBWgMHF',
            image: 'https://i.ytimg.com/vi/4oyOg1-JI1Y/maxresdefault.jpg'
        },
        {
            name: '1000 Ánh Mắt',
            singer: 'Shiki ft Obito',
            path: 'https://audio.jukehost.co.uk/WNB42JeOxPM7ObbTLvDP6tvtD0Ogh6hX',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2024/06/25/4/4/7/1/1719254370918_640.jpg'
        },
        {
            name: 'MƯA ĐANG RƠI',
            singer: 'BABY $MOKE ft MCK',
            path: 'https://audio.jukehost.co.uk/f6t9pvHEuhZoKFvTspVBCBGzxFMKs0D2',
            image: 'https://thanhnien.mediacdn.vn/uploaded/hienht/2020_11_24/mck_DSDT.jpg?width=500'
        },
        {
            name: 'Đừng làm trái tim anh đau',
            singer: 'Sơn Tùng MTP',
            path: 'https://audio.jukehost.co.uk/xHBF8wkJq81az89jmMXlC4sgXWGRTgF0',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7zEEISvcs1XuhHOPNI0aUElsa46Fmv5NLDg&s'
        },
        {
            name: 'Cơn Mưa Cuối',
            singer: 'JustaTee ft Binz',
            path: 'https://audio.jukehost.co.uk/LdvjdcXBqKRVKd1QYMLZ3HHR7fgFRubX',
            image: 'https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/covers/a/f/af1166b25cf77fb307716eda9cc172d1_1477998573.jpg'
        },
        {
            name: 'Không thể say',
            singer: 'HIEUTHUHAI',
            path: 'https://audio.jukehost.co.uk/B8P9PRrgzy4fDolPOnBgsMq4O2Hnk1Dn',
            image: 'https://images.genius.com/8931bb264c5bf3bb7693323dfae4f2c3.900x900x1.jpg'
        },
        {
            name: 'Ổ QUỶ',
            singer: 'Dài quá nhát gõ',
            path: 'https://audio.jukehost.co.uk/PXDzOnXL57CTelnUc8LeOElRiroyEp38',
            image: 'https://i1.sndcdn.com/artworks-8aUjJhPCW2gLmcY3-4Ayzcw-t500x500.jpg'
        },
        {
            name: 'Rolling',
            singer: 'Richie D. ICY',
            path: 'https://vnso-zn-24-tf-mp3-s1-zmp3.zmdcdn.me/957521422802c15c9813/7961271563119826706?authen=exp=1722342467~acl=/957521422802c15c9813/*~hmac=4166a180c6e4706d9cbdd9fa21c53db7',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2023/02/17/3/0/c/c/1676609145447_640.jpg'
        },
        {
            name: 'Vinflow',
            singer: 'Wrxdie',
            path: 'https://audio.jukehost.co.uk/rqSFJ4Wq8GSR4ExMWPcP9exFi8m9HbF4',
            image: 'https://p16-capcut-sign-va.ibyteimg.com/tos-alisg-v-643f9f/owvyTSObABAAAW6jwEfIaJIz6N28V3xhAXBDWI~tplv-nhvfeczskr-1:250:0.webp?lk3s=44acef4b&x-expires=1744013181&x-signature=WXz%2F840Oa99%2BU%2BHhYyTEq2oEWKA%3D'
        },
        {
            name: 'BUỒN HAY VUI',
            singer: 'VSOUL x MCK x Obito x Ronboogz x Boyzed',
            path: 'https://audio.jukehost.co.uk/97FrwgbKgje9brTRsDaJcKy22SsuOhxu',
            image: 'https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/6/d/a/a/6daaea74ed8423b2a0e769011d6d3eb3.jpg'
        },
        {
            name: '3 1 0 7',
            singer: ' W/n ft Duongg ft Nâu',
            path: 'https://audio.jukehost.co.uk/XIg7F78wMcM4oiB0CLMtF6iME7zVA9vq',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2021/08/02/5/0/1/7/1627860417460_640.jpg'
        },
        {
            name: 'Chỉ là muốn nói(300)',
            singer: 'Khải',
            path: 'https://audio.jukehost.co.uk/A4qTUXqU6jf2hA8xflv5CV1YTmebaWam',
            image: 'https://i.ytimg.com/vi/uUB7wnWeMdM/sddefault.jpg'
        },
        {
            name: 'Đại lộ mặt trời',
            singer: 'Chillies',
            path: 'https://audio.jukehost.co.uk/styzeVFzFGbb6PgGTncanBnH5MmLTeR5',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2024/01/02/a/8/5/3/1704166463050_640.jpg'
        },
        {
            name: 'Ngày Đẹp Trời Để Nói Chia Tay',
            singer: 'Lou Hoàng',
            path: 'https://audio.jukehost.co.uk/bYS8cpktk0pmoTfxtWkZfCEgVRs29TnH',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2024/06/10/0/1/c/c/1718028171784_640.jpg'
        },
    ],
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.getItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config))
        },

    render: function() {
        const htlms = this.songs.map((song, index) =>{
            return `
                <div class="song ${index === this.currIndex ? 'active' : ''}" data-index="${index}">
                    <div class="thumb" style="background-image: url(${song.image});"></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })

        $('.playlist').innerHTML = htlms.join('')
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvents: function() {
        const cdWidth = cd.offsetWidth;

        const cdAniamte = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],
        {
            duration: 10000, 
            iterations: Infinity,
        })

        cdAniamte.pause();

        //phong to, thu nho
        
        document.onscroll = function () {
            const scrolls = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrolls;

            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        playBtn.onclick = function() {
            if (app.isPlaying) {
                audio.pause()
                
            } else {
                audio.play()
            }
        
        }

        audio.onplay = function() {
            setInterval(() => {
                if (audio.duration) {
                  var progressPercent = Math.floor(
                    (audio.currentTime * 100) / audio.duration
                  );
                  progress.value = progressPercent;
                 
                }
              }, 500);
              // Cập nhật trạng phái ở chế độ play
              app.isPlaying = true;
              player.classList.add("playing");
              app.render();
              cdThumbAnimate.play();
        }

        audio.onpause = function() {
            app.isPlaying = false 
            player.classList.remove("playing")
            cdAniamte.pause()
        }

        audio.ontimeupdate = function() {
            if (!audio.duration) {
                duration.textContent = "00:00";
              } else {
                duration.textContent = app.formatTime(audio.currentTime);
                remaining.textContent = app.formatTime(audio.duration);
              }
        }

        progress.oninput = function(e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        nextBtn.onclick = function() {
            if (app.isRandom) {
                app.playRandomSong()
            } else {
                app.nextSong()
            }
            audio.play()
            app.scrollTopActiveSong()
        }

        prevBtn.onclick = function() {
            if (app.isRandom) {
                app.playRandomSong()
            } else {
                app.prevSong()
            }
            audio.play()
            app.scrollTopActiveSong()
        }

        shuffleBtn.onclick = function(e) {
            app.isRandom = !app.isRandom
            app.setConfig('isRandom', app.isRandom)
            shuffleBtn.classList.toggle('active', app.isRandom)
        }

        audio.onended = function() {
            if (app.isRepeat) {
                audio.play()
            } else {
                app.nextSong()
                audio.play()
            }   
        }

        repeatBtn.onclick = function() {
            app.isRepeat = !app.isRepeat
            app.setConfig('isRepeat', app.isRepeat)
            repeatBtn.classList.toggle("active", app.isRepeat)
        }

        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');
            var songS = $$('.song')
            songS[app.currentIndex].classList.remove('active')
            

            if (songNode || e.target.closest('.option')) {
                // Clicked on a song
                if (songNode) {
                    app.currentIndex = Number(songNode.dataset.index);
                    songS[app.currentIndex].classList.add('active')
                    app.loadCurrentSong();
                    audio.play();
                }
            }   
        }
    },

    loadCurrentSong: function() {

        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    loadConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },

    formatTime: function (seconds) {
        var minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
      },

    nextSong: function() {
        let songs = $$(".song")
        songs[this.currentIndex].classList.remove("active")
        this.currentIndex++
        if (this.currentIndex >= this.songs.legnth) {
            this.currentIndex = 0
        }
        songs[this.currentIndex].classList.add("active")
        this.loadCurrentSong()
    },

    prevSong: function() {
        let songs = $$(".song")
        songs[this.currentIndex].classList.remove("active")
        this.currentIndex--
        if (this.currentIndex < 0 ) {
            this.currentIndex = this.songs.length - 1
        }
        songs[this.currentIndex].classList.add("active")
        this.loadCurrentSong()
    },

    playRandomSong: function() {
        let songs = $$('.song')
        songs[this.currentIndex].classList.remove('active')
        
        if (shuffleArray.length === 0) {
            shuffleArray = [...this.songs]; 
            for (let i = shuffleArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffleArray[i], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i]]; // Swap elements
            }
        }

        
        const nextSong = shuffleArray.pop();

        
        this.currentIndex = this.songs.indexOf(nextSong);
        songs[this.currentIndex].classList.add('active')
        this.loadCurrentSong();
    },

    scrollTopActiveSong: function() {
        setTimeout(() => {
            $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            })
        }, 300)
    },



    start: function() {
        this.loadConfig();
        this.formatTime();
        // dinh nghia properties
        this.defineProperties();
        // lang nghe, xu ly su kien
        this.handleEvents();
        //tai thong tin bai dau
        this.loadCurrentSong();
        //Render
        this.render();
        shuffleBtn.classList.toggle('active', app.isRandom);
        repeatBtn.classList.toggle("active", app.isRepeat);
    }
}

app.start();
