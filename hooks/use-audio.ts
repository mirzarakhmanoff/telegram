import useSound from "use-sound";

const useAudio = () => {
  const [play1] = useSound("/audio/notification.mp3");
  const [play2] = useSound("/audio/notification2.mp3");
  const [play3] = useSound("/audio/sending.mp3");
  const [play4] = useSound("/audio/sending2.mp3");

  const soundMap: Record<string, () => void> = {
    "notification.mp3": play1,
    "notification2.mp3": play2,
    "sending.mp3": play3,
    "sending2.mp3": play4,
  };

  const playSound = (sound: string) => {
    if (soundMap[sound]) {
      soundMap[sound]();
    } else {
      console.warn(`Sound "${sound}" not found`);
    }
  };

  return { playSound };
};

export default useAudio;
