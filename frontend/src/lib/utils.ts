import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);

  // Check if the date is from a different year
  if (date.getFullYear() !== now.getFullYear()) {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  }

  // Within the last minute
  if (diffInSeconds < 60) {
    return 'Just now';
  }

  // Within the last hour
  if (diffInMinutes < 60) {
    if (diffInMinutes < 5) return 'Few minutes ago';
    if (diffInMinutes < 15) return 'About 10 minutes ago';
    if (diffInMinutes < 25) return 'About 20 minutes ago';
    if (diffInMinutes < 35) return 'About 30 minutes ago';
    if (diffInMinutes < 45) return 'About 40 minutes ago';
    return 'About 50 minutes ago';
  }

  // Within the last day
  if (diffInHours < 24) {
    if (diffInHours === 1) return 'An hour ago';
    if (diffInHours < 3) return 'Couple of hours ago';
    if (diffInHours < 12) return `${diffInHours} hours ago`;
    return 'Today';
  }

  // Within the last week
  if (diffInDays < 7) {
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays === 2) return 'Day before yesterday';
    if (diffInDays < 4) return 'Few days ago';
    return `${diffInDays} days ago`;
  }

  // Within the last month
  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    if (weeks === 1) return 'A week ago';
    return `${weeks} weeks ago`;
  }

  // More than a month
  if (diffInMonths === 1) return 'Last month';
  if (diffInMonths < 12) return `${diffInMonths} months ago`;

  // Fallback to month and day
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}
