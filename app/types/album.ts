export interface Album {
  'im:name': {
    label: string;
  };
  'im:artist': {
    label: string;
  };
  'im:image': Array<{
    label: string;
    attributes: {
      height: string;
    };
  }>;
  id: {
    attributes: {
      'im:id': string;
    };
  };
  link: {
    attributes: {
      href: string;
    };
  };
  originalIndex?: number;
}

export interface AlbumWithIndex extends Album {
  originalIndex: number;
}

export interface BaseAlbumProps {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  index: number;
  link: string;
}
