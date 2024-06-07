import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export function formatDate(date, formatPattern = 'd MMMM yyyy  HH:mm') {
  return format(new Date(date), formatPattern, {
    locale: ru,
  });
}
