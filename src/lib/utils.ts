import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isShowtimeExpired = (
  dateStr: string,
  showtime: string,
): boolean => {
  const [hour, minutePart] = showtime.split(":");
  const minute = parseInt(minutePart.slice(0, 2));
  const meridian = minutePart.slice(3).toUpperCase();

  let hours = parseInt(hour);
  if (meridian === "PM" && hours !== 12) hours += 12;
  if (meridian === "AM" && hours === 12) hours = 0;

  const showDate = new Date(dateStr);
  showDate.setHours(hours, minute, 0, 0);

  return showDate < new Date();
};
