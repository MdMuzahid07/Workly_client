import imageCompression from 'browser-image-compression';

type ImageKind = 'avatar' | 'logo' | 'cover';

const PRESETS: Record<
  ImageKind,
  { maxSizeMB: number; maxWidthOrHeight: number; initialQuality: number }
> = {
  avatar: { maxSizeMB: 1, maxWidthOrHeight: 1024, initialQuality: 0.8 },
  logo: { maxSizeMB: 2, maxWidthOrHeight: 1024, initialQuality: 0.85 },
  cover: { maxSizeMB: 2, maxWidthOrHeight: 1920, initialQuality: 0.9 }, // compress lightly client-side; Cloudinary's auto:best does the final polish server-side
};

export async function compressImage(file: File, kind: ImageKind): Promise<File> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please select an image file');
  }

  // Animated GIFs lose animation through canvas-based compression — skip and
  // let allowed_formats + fileSize on the server be the guard instead.
  if (file.type === 'image/gif') {
    return file;
  }

  const preset = PRESETS[kind];

  // Already under target — don't re-encode a file that already fits.
  if (file.size <= preset.maxSizeMB * 1024 * 1024) {
    return file;
  }

  try {
    return await imageCompression(file, {
      maxSizeMB: preset.maxSizeMB,
      maxWidthOrHeight: preset.maxWidthOrHeight,
      initialQuality: preset.initialQuality,
      useWebWorker: true,
      fileType: file.type === 'image/png' ? 'image/png' : 'image/jpeg', // preserve PNG transparency for logos
    });
  } catch (err) {
    console.error('Image compression failed, falling back to original file:', err);
    return file; // let the server-side fileSize/format validation be the final safety net
  }
}
