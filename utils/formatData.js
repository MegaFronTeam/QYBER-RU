import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export function formatDate(date) {
  return format(new Date(date), 'd MMMM yyyy  HH:mm', {
    locale: ru,
  });
}
