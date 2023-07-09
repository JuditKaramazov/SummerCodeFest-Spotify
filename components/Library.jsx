import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';

const Library = ({ setView, setGlobalPlaylistId }) => {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);

  function selectPlaylist(playlist) {
    setView('playlist');
    setGlobalPlaylistId(playlist.id);
  }

  useEffect(() => {
    async function fetchPlaylists() {
      if (session && session.accessToken) {
        const response = await fetch('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        const data = await response.json();
        setPlaylists(data.items);
      }
    }
    fetchPlaylists();
  }, [session]);

  return (
    <div className='flex-grow'>
      <header className='text-white sticky top-0 h-20 z-10 text-4xl'></header>
      <div onClick={() => signOut()} className='absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
        <img className='rounded-full w-7 h-7' src={session?.user.image} alt='profile pic' />
        <p className='text-sm'>Log Out</p>
        <ChevronDownIcon className='h-5 w-5' />
      </div>
      <div className='flex flex-col gap-4 px-8'>
        <h2 className='text-xl font-bold'>Playlists</h2>
        <div className='flex flex-wrap gap-6 mb-48' style={{ maxHeight: 'calc(100vh - 220px)', overflowY: 'auto' }}>
          {playlists.map((playlist) => {
            return (
              <div onClick={() => selectPlaylist(playlist)} key={playlist.id} className='cursor-pointer relative group w-56 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4'>
                <div className='absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[156px] group-hover:top-[148px] right-6'>
                  <PlayIcon className='h-6 w-6 text-black' />
                </div>
                <img className='w-48 h-48 mb-4' src={playlist.images[0].url} alt={playlist.name} />
                <p className='text-base text-white mb-1 w-48 truncate'>{playlist.name}</p>
                <p className='text-sm text-neutral-400 mb-8 w-48 truncate'>By {playlist.owner.display_name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Library;
