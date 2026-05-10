import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

/** Положите свой трек в `public/audio/ambient.mp3` (loop). Иначе включается тихий синтезированный фон. */
const AMBIENT_MP3 = '/audio/ambient.mp3';

function waitCanPlay(audio: HTMLAudioElement): Promise<void> {
  return new Promise((resolve, reject) => {
    if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      resolve();
      return;
    }
    const onOk = () => {
      audio.removeEventListener('canplaythrough', onOk);
      audio.removeEventListener('error', onErr);
      resolve();
    };
    const onErr = () => {
      audio.removeEventListener('canplaythrough', onOk);
      audio.removeEventListener('error', onErr);
      reject(new Error('audio-load'));
    };
    audio.addEventListener('canplaythrough', onOk, { once: true });
    audio.addEventListener('error', onErr, { once: true });
    audio.load();
  });
}

async function startAmbientDrone(): Promise<() => void> {
  const ctx = new AudioContext();
  await ctx.resume();

  const master = ctx.createGain();
  master.gain.value = 0.018;

  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 520;
  lp.Q.value = 0.7;
  lp.connect(master);
  master.connect(ctx.destination);

  const oscs: OscillatorNode[] = [];
  for (const freq of [36, 54, 81]) {
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = freq;
    o.connect(lp);
    o.start();
    oscs.push(o);
  }

  return () => {
    for (const o of oscs) {
      try {
        o.stop();
      } catch {
        /* noop */
      }
    }
    void ctx.close();
  };
}

type AmbientCtx = {
  isOn: boolean;
  toggle: () => void;
};

const AmbientAudioContext = createContext<AmbientCtx | null>(null);

export function AmbientAudioProvider({ children }: { children: ReactNode }) {
  const [isOn, setIsOn] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  const stop = useCallback(() => {
    cleanupRef.current?.();
    cleanupRef.current = null;
    setIsOn(false);
  }, []);

  const start = useCallback(async () => {
    if (cleanupRef.current) return;

    const audio = new Audio(AMBIENT_MP3);
    audio.loop = true;
    audio.volume = 0.2;

    try {
      await waitCanPlay(audio);
      await audio.play();
      setIsOn(true);
      cleanupRef.current = () => {
        audio.pause();
        audio.removeAttribute('src');
        audio.load();
      };
    } catch {
      try {
        const endDrone = await startAmbientDrone();
        setIsOn(true);
        cleanupRef.current = endDrone;
      } catch {
        setIsOn(false);
      }
    }
  }, []);

  const toggle = useCallback(() => {
    if (cleanupRef.current) stop();
    else void start();
  }, [start, stop]);

  useEffect(() => () => cleanupRef.current?.(), []);

  const value = useMemo(() => ({ isOn, toggle }), [isOn, toggle]);

  return <AmbientAudioContext.Provider value={value}>{children}</AmbientAudioContext.Provider>;
}

export function useAmbientAudio() {
  const ctx = useContext(AmbientAudioContext);
  if (!ctx) {
    throw new Error('useAmbientAudio must be used within AmbientAudioProvider');
  }
  return ctx;
}
