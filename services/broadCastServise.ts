export default function broadCast(broadcast: string): string {
  if (!broadcast) return '';
  if (broadcast.includes('rutube')) {
    return broadcast.replace('video/', 'play/embed/') + '?skinColor=dbaf4f&autoplay=1' || '';
  } else if (broadcast.includes('vk.com')) {
    const regex = /video(-?\d+)_(\d+)/;
    const match = broadcast.match(regex);

    const oid = match[1];
    const id = match[2];

    return `https://vk.com/video_ext.php?oid=${oid}&id=${id}&loop=1&autoplay=1&mute=1` || '';
  } else {
    return broadcast.replace('watch?v=', 'embed/') + '?autoplay=1&mute=1' || '';
  }
}
