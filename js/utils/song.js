export const song = {
    /* ------------------ PROPRIETES ---------------- */
    music_on_off: 1,
    sound_effects_on_off: 1,
    music_on_svg: document.querySelector('.music_on'),
    music_off_svg: document.querySelector('.music_off'),
    sound_effects_on_svg: document.querySelector('.sound_effects_on'),
    sound_effects_off_svg: document.querySelector('.sound_effects_off'),
    /* ------------------ PROPRIETES ---------------- */

    /* ------------------- METHODES ----------------- */
    init: () => {
        song.handle_music_on_svg();
        song.handle_music_off_svg();
        song.handle_sound_effects_on_svg();
        song.handle_sound_effects_off_svg();
    },

    spin_song: () => {
        const audio = new Audio();
        audio.src = "../../song/eaten_apple_song.mp3";
        if(song.on_off === 1) {
            audio.play();
        }
    },

    complete_line_song: () => {
        const audio = new Audio();
        audio.src = "../../song/eaten_apple_song.mp3";
        if(song.on_off === 1) {
            audio.play();
        }
    },

    seat_piece_song: () => {
        const audio = new Audio();
        audio.src = "../../song/eaten_apple_song.mp3";
        if(song.on_off === 1) {
            audio.play();
        }
    },

    music: () => {

    },

    handle_music_on_svg: () => {
        song.music_on_svg.addEventListener('click', (event) => {
            song.music_on_svg.style.display = 'none';
            song.music_off_svg.style.display = 'block';
            song.music_on_off = 0;
        })
    },

    handle_music_off_svg: () => {
        song.music_off_svg.addEventListener('click', (event) => {
            song.music_off_svg.style.display = 'none';
            song.music_on_svg.style.display = 'block';
            song.music_on_off = 1;
        })
    },

    handle_sound_effects_on_svg: () => {
        song.sound_effects_on_svg.addEventListener('click', (event) => {
            song.sound_effects_on_svg.style.display = 'none';
            song.sound_effects_off_svg.style.display = 'block';
            song.sound_effects_on_off = 0;
        })
    },

    handle_sound_effects_off_svg: () => {
        song.sound_effects_off_svg.addEventListener('click', (event) => {
            song.sound_effects_off_svg.style.display = 'none';
            song.sound_effects_on_svg.style.display = 'block';
            song.sound_effects_on_off = 1;
        })
    },

    /* ------------------- METHODES ----------------- */

};

/*
TODO DOCUMENTATION
*/