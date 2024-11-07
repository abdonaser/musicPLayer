import { Artist, Playlist, TrackWithPlaylist } from "@/helpers/types";
import { Track } from "react-native-track-player";
import { create } from "zustand";
import library from "@/assets/data/library.json";
import { useMemo } from "react";
import { unknownTrackImageUri } from "@/constants/images";
interface libraryState {
  tracks: TrackWithPlaylist[];
  toggleTrackFavorite: (track: Track) => void;
  addToPlaylist: (track: Track, playlistName: string) => void;
}
//' Main Store
export const useLibraryStore = create<libraryState>()((set) => ({
  tracks: library,
  toggleTrackFavorite: () => {},
  addToPlaylist: () => {},
}));

export const useTracks = () => useLibraryStore((state) => state.tracks);

//' Favorites
export const useFavorites = () => {
  const favorites = useMemo(
    () =>
      useLibraryStore.getState().tracks.filter((track) => track.rating === 1),
    [useLibraryStore]
  );

  const toggleTrackFavorite = useLibraryStore(
    (state) => state.toggleTrackFavorite
  );

  return {
    favorites,
    toggleTrackFavorite,
  };
};

//'Artists
export const useArtists = () => {
  const tracks = useLibraryStore((state) => state.tracks);
  const artists = useMemo(() => {
    return tracks.reduce((acc, track) => {
      const existingArtist = acc.find((artist) => artist.name === track.artist);
      if (existingArtist) {
        existingArtist.tracks.push(track);
      } else {
        acc.push({
          name: track.artist ?? "Unknown",
          tracks: [track],
        });
      }
      return acc;
    }, [] as Artist[]);
  }, [tracks]);

  return artists;
};

//'Playlists
export const usePlaylists = () => {
  const tracks = useLibraryStore((state) => state.tracks);

  const playlists = useMemo(() => {
    return tracks.reduce((acc, track) => {
      if (track.playlist) {
        track.playlist?.forEach((playlistName) => {
          const existingPlaylist = acc.find(
            (track) => track.name === playlistName
          );
          if (existingPlaylist) {
            existingPlaylist.tracks.push(track);
          } else {
            acc.push({
              name: playlistName,
              tracks: [track],
              artworkPreview: track.artwork ?? unknownTrackImageUri,
            });
          }
        });
      }
      return acc;
    }, [] as Playlist[]);
  }, [tracks]);

  const addToPlaylist = useLibraryStore((state) => state.addToPlaylist);

  return { playlists, addToPlaylist };
};
