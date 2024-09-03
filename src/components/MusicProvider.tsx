"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { IBeat, IPhrase, Player, PlayerListener } from "textalive-app-api";

export type MusicType = {
  beat: IBeat | undefined;
  phrase: IPhrase | undefined;
  player: Player | undefined;
  setBeat: Dispatch<SetStateAction<IBeat | undefined>> | undefined;
  setPhrase: Dispatch<SetStateAction<IPhrase | undefined>> | undefined;
  setPlayer: Dispatch<SetStateAction<Player | undefined>> | undefined;
};

export const MusicContext = createContext<MusicType>({
  beat: undefined,
  phrase: undefined,
  player: undefined,
  setBeat: undefined,
  setPhrase: undefined,
  setPlayer: undefined,
});

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [beat, setBeat] = useState<IBeat | undefined>(undefined);
  const [phrase, setPhrase] = useState<IPhrase | undefined>(undefined);
  const [player, setPlayer] = useState<Player | undefined>(undefined);
  const mediaElementRef = useRef(null);

  const delay = 100;

  useEffect(() => {
    const player = new Player({
      app: {
        token: process.env.NEXT_PUBLIC_TEXTALIVE_TOKEN || "",
      },
      mediaElement: mediaElementRef.current!,
    });

    const playerListener: PlayerListener = {
      onTimerReady: () => {
        let phrase = player.video.firstPhrase;

        while (phrase) {
          phrase.animate = (now, unit) => {
            if (unit.startTime - delay <= now && unit.endTime - delay > now) {
              setPhrase(unit);
            }
          };

          if (phrase.next === null) {
            break;
          }

          phrase = phrase.next;
        }

        setPlayer(player);
      },
      onTimeUpdate: (position) => {
        if (!player.video.findPhrase(position + delay)) {
          setPhrase(undefined);
        }
        setBeat(player.findBeat(position + delay) ?? undefined);
      },
    };

    void player.createFromSongUrl("https://piapro.jp/t/Wk83/20230203141007", {
      video: {
        beatId: 4267381,
        chordId: 2405285,
        repetitiveSegmentId: 2475676,
        lyricId: 56812,
        lyricDiffId: 10668,
      },
    });
    player.addListener(playerListener);
  }, []);

  return (
    <MusicContext.Provider
      value={{
        beat,
        phrase,
        player,
        setBeat,
        setPhrase,
        setPlayer,
      }}
    >
      <div className="hidden" ref={mediaElementRef} />
      {children}
    </MusicContext.Provider>
  );
};
