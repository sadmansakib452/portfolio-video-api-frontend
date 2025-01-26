export interface Video {
  _id: string;
  title: string;
  slug: string;
  description: string;
  version: number;
  videoFile: {
    filename: string;
    size: number;
    mimetype: string;
  };
  thumbnailFile: {
    filename: string;
    size: number;
    mimetype: string;
  };
  videoUrl: string;
  thumbnailUrl: string;
}

export interface VideoStats {
  totalVideos: number;
}

export interface VideoResponse {
  status: string;
  data: {
    videos: Video[];
  };
} 