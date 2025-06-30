import { format, formatDistanceToNow, parseISO } from "date-fns";
import { z } from "zod";


export function formatDate(dateString: string) {
  const dateObject = parseISO(dateString);
  return format(dateObject, "dd MMM yyyy h:mm a");
}

// Do the same for the timeAgo function.
export function timeAgo(dateString: string) {
  const dateObject = parseISO(dateString); 
  return formatDistanceToNow(dateObject) + " ago";
}


export const requiredString = (fieldName: string) =>
  z
    .string({ required_error: `${fieldName} is required` })
    .min(1, { message: `${fieldName} is required` });
