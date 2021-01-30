class Record {
  getAudioStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      this.stream = stream;
      return stream;
    } catch (error) {
      return error;
    }
  };

  mediaRecorder = async (stream) => {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    this.recorder = mediaRecorder;
    return mediaRecorder;
  };

  startRec = () => {
    const chunk = [];
    this.recorder.addEventListener('dataavailable', async (e) => {
      chunk.push(e.data);
    });

    this.recorder.addEventListener('stop', async (e) => {
      const blob = new Blob(chunk, { type: 'audio/mpeg-3' });
      const formData = new FormData();
      formData.append('record', blob, 'recordName.mp3');
      this.blob = blob;
      this.formData = formData;
      this.audio_url = URL.createObjectURL(this.blob);
    });
  };

  stopRec = async () => {
    this.recorder.stop();
    //? this promise is for testing purposes to wait 5 milliseconds until the record is ready
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5);
    });
  };
}

export default Record;
