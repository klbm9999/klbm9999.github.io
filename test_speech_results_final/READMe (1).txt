1)*ground_inference files are the speech outputs from the SV2TTS model with 
   Input is the original speech of the speaker
2)*mseloss_inference files are the speech outputs from the Image model + SV2TTS(Synthesizer and Vocoder) 
   Input as the speaker image/frame 
   Loss function for Image model used is MSE Loss function
3)*kldiv_inference files are the speech outputs from the Image model + SV2TTS(Synthesizer and Vocoder) with Input as the speaker image/frame
   Input as the speaker image/frame
   Loss function for Image model used is KL Divergence Loss function
4) The rest of the audio files are the original speaker voices

