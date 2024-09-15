const sounds = {
    boom: new Audio('sounds/boom.wav'),
    clap: new Audio('sounds/clap.wav'),
    hihat: new Audio('sounds/hihat.wav'),
    kick: new Audio('sounds/kick.wav'),
    openhat: new Audio('sounds/openhat.wav'),
    ride: new Audio('sounds/ride.wav'),
    snare: new Audio('sounds/snare.wav'),
    tink: new Audio('sounds/tink.wav'),
    tom: new Audio('sounds/tom.wav')
};

let isRecording = false;
let recordedTracks = [[], [], [], []];
let currentTrack = 0;

document.querySelectorAll('.pad').forEach(pad => {
    pad.addEventListener('click', () => {
        const sound = pad.getAttribute('data-sound');
        playSound(sound);
        if (isRecording) {
            recordedTracks[currentTrack].push({ sound, time: Date.now() });
        }
    });
});

document.getElementById('record').addEventListener('click', () => {
    isRecording = !isRecording;
    if (isRecording) {
        recordedTracks[currentTrack] = [];
        console.log(`Recording track ${currentTrack + 1}...`);
    } else {
        console.log(`Stopped recording track ${currentTrack + 1}.`);
    }
});

document.getElementById('play').addEventListener('click', () => {
    recordedTracks.forEach((track, index) => {
        playTrack(track, index);
    });
});

function playSound(sound) {
    sounds[sound].currentTime = 0;
    sounds[sound].play();
}

function playTrack(track, trackNumber) {
    track.forEach(note => {
        setTimeout(() => {
            playSound(note.sound);
        }, note.time - track[0].time);
    });
}

// Metronome functionality
let metronomeInterval;
document.getElementById('metronome').addEventListener('click', () => {
    if (metronomeInterval) {
        clearInterval(metronomeInterval);
        metronomeInterval = null;
        console.log('Metronome stopped.');
    } else {
        const bpm = document.getElementById('bpm').value || 60;
        const interval = 60000 / bpm;
        metronomeInterval = setInterval(() => {
            console.log('Metronome tick.');
        }, interval);
        console.log('Metronome started.');
    }
});
