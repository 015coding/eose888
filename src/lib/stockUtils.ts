// lib/stockUtils.ts

export const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = d.toLocaleString("en", { month: "short" });
  const year = d.getFullYear().toString().slice(-2);
  return `${day} ${month} '${year}`;
};

export const formatTime = (dateStr: string): string => {
  const d = new Date(dateStr);
  const bangkokHours = (d.getUTCHours() + 7) % 24;
  const bangkokMinutes = d.getUTCMinutes();
  return `${bangkokHours.toString().padStart(2, "0")}:${bangkokMinutes.toString().padStart(2, "0")}`;
};

export const isEvery3Hours = (dateStr: string): boolean => {
  const d = new Date(dateStr);
  const bangkokHours = (d.getUTCHours() + 7) % 24;
  const minutes = d.getUTCMinutes();
  return minutes === 0 && bangkokHours % 3 === 0;
};