import { ArrowsRightLeftIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';
import {
  ArrowUturnLeftIcon,
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default function Player({
  globalCurrentTrackId,
  setGlobalCurrentTrackId,
  globalIsTrackPlaying,
  setGlobalIsTrackPlaying,
}) {
  const [songInfo, setSongInfo] = useState(null);
  const { data: session, status } = useSession();
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);
  const [timePassed, setTimePassed] = useState('00:00');
  const [totalDuration, setTotalDuration] = useState('00:00');

  async function getCurrentlyPlaying() {
    if (session?.user?.accessToken) {
      let token = session.user.accessToken;
      const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        console.log('204 response from currently playing');
        return;
      }
      const data = await response.json();
      return data;
    }
  }

  async function handlePlayPause() {
    const currentlyPlayingData = await getCurrentlyPlaying();
    if (currentlyPlayingData && currentlyPlayingData.is_playing) {
      if (session && session.user && session.user.accessToken) {
        let token = session.user.accessToken;
        const response = await fetch('https://api.spotify.com/v1/me/player/pause', {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 204) {
          setGlobalIsTrackPlaying(false);
        }
      }
    } else {
      if (session && session.user && session.user.accessToken) {
        let token = session.user.accessToken;
        const response = await fetch('https://api.spotify.com/v1/me/player/play', {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 204) {
          setGlobalIsTrackPlaying(true);
        }
      }
    }
  }

  useEffect(() => {
    async function fetchSongInfo(trackId) {
      if (trackId) {
        let token = session.user.accessToken;
        const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const trackInfo = await response.json();
        setSongInfo(trackInfo);
      }
    }

    async function updatePlaybackInfo() {
      const playbackInfo = await getCurrentlyPlaying();

      if (playbackInfo && playbackInfo.is_playing) {
        const { progress_ms, item } = playbackInfo;
        const { duration_ms } = item;

        const calculatedProgress = Math.floor((progress_ms / duration_ms) * 100);
        setProgress(calculatedProgress);

        const formattedTimePassed = formatTime(progress_ms);
        setTimePassed(formattedTimePassed);

        const formattedTotalDuration = formatTime(duration_ms);
        setTotalDuration(formattedTotalDuration);
      }
    }

    const intervalId = setInterval(updatePlaybackInfo, 1000);

    updatePlaybackInfo();

    return () => {
      clearInterval(intervalId);
    };
  }, [globalCurrentTrackId, session]);

  useEffect(() => {
    async function fetchTrackInfo() {
      if (session && session.user && session.user.accessToken) {
        if (!globalCurrentTrackId) {
          const data = await getCurrentlyPlaying();
          setGlobalCurrentTrackId(data?.item?.id);
          if (data?.is_playing) {
            setGlobalIsTrackPlaying(true);
          }
          await fetchSongInfo(data?.item?.id);
          setVolume(50);
        } else {
          await fetchSongInfo(globalCurrentTrackId);
        }
      }
    }

    fetchTrackInfo();
  }, [globalCurrentTrackId, session]);

  return (
    <div className="h-24 bg-neutral-800 border-t border-neutral-700 text-white px-2 md:px-8 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {songInfo?.album?.images[0]?.url && (
            <img className="hidden md:inline h-10 w-10" src={songInfo?.album?.images[0]?.url} alt="" />
          )}
          <div>
            <h3 className="text-white text-sm">{songInfo?.name}</h3>
            <p className="text-neutral-400 text-xs">{songInfo?.artists[0]?.name}</p>
          </div>
        </div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center justify-evenly space-x-4">
            <ArrowsRightLeftIcon className="text-neutral-400 hover:text-white h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
            <BackwardIcon className="text-neutral-400 hover:text-white h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
            {globalIsTrackPlaying ? (
              <PauseCircleIcon
                onClick={handlePlayPause}
                className="cursor-pointer hover:scale-125 transition transform duration-100 ease-out h-10 w-10"
              />
            ) : (
              <PlayCircleIcon
                onClick={handlePlayPause}
                className="cursor-pointer hover:scale-125 transition transform duration-100 ease-out h-10 w-10"
              />
            )}
            <ForwardIcon className="text-neutral-400 hover:text-white h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
            <ArrowUturnLeftIcon className="text-neutral-400 hover:text-white h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
          </div>
        </div>
      </div>
      <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/12">
        <div className="flex items-center justify-between">
          <span className="text-neutral-400">{timePassed}</span>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            className="accent-white hover:accent-green-600 flex-grow"
          />
          <span className="text-neutral-400">{totalDuration}</span>
        </div>
      </div>
      <div className="flex items-center space-x-4 absolute top-1/3 right-10 transform translate-y-1/2">
        <div className="flex items-center space-x-3 md:space-x-4">
          <SpeakerWaveIcon className="h-5 w-5 text-neutral-400 hover:text-white" />
          <input type="range" min={0} max={100} className="accent-white hover:accent-green-600 w-14 md:w-28" />
        </div>
      </div>
    </div>
  );
}
