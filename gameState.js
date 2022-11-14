let actx;
        let samples;

        const setupSamplesBtn = document.querySelector(".setup-samples")
        const playSampleBtn = document.querySelector(".play-sample")

        const samplePaths = ["./audio/jump2.mp3", "./audio/jump.wav"]

        //CREATE LISTENERS FOR BUTTONS;

        startCtxBtn.addEventListener("click", () => {
        actx = new AudioContext();}
        )

        setupSamplesBtn.addEventListener("click", () =>{
            setupSamples(samplePaths).then((response) => {
                samples = response;
                playSampleBtn.addEventListener("click", () => { 
                const playing = playSample(samples[0], 0);
                console.log(playing);
                setTimeout(() => {
                    playing.stop();
                }, 3000)
                })
            } )
        })

        //CREATE FUNCTIONS FOR LISTENERS;

        async function getFile(filePath){
            const response = await fetch(filePath);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await actx.decodeAudioData(arrayBuffer)
            return audioBuffer;
        }

        async function setupSamples(paths) {
            const audioBuffers = [];

            for (const path of paths) {
                const sample = await getFile(path);
                audioBuffers.push(sample);
            }
            return audioBuffers;

        }

        function playSample(audioBuffer, time) {
            const sampleSource = audioContext.createBufferSource();
            sampleSource.buffer = audioBuffer;
            sampleSource.connect(audioContext.destination);
            sampleSource.start(time)
            return sampleSource;
        }

        function playSample(audioBuffer, time) {
            const sampleSource = actx.createBufferSource();
            sampleSource.buffer = audioBuffer;
            sampleSource.connect(actx.destination)
            sampleSource.start(time)
        }