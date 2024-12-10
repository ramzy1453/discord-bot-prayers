export interface PrayerResponse {
  code: number;
  status: string;
  data: Data;
}

interface Data {
  timings: Timings;
  date: Date;
  meta: Meta;
}

interface PrayersTiming {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
  Firstthird: string;
  Lastthird: string;
}

interface Date {
  readable: string;
  timestamp: string;
  hijri: Hijri;
  gregorian: Gregorian;
}

interface Hijri {
  date: string;
  format: string;
  day: string;
  weekday: Weekday;
  month: Month;
  year: string;
  designation: Designation;
  holidays: any[];
}

interface Weekday {
  en: string;
  ar: string;
}

interface Month {
  number: number;
  en: string;
  ar: string;
}

interface Designation {
  abbreviated: string;
  expanded: string;
}

interface Gregorian {
  date: string;
  format: string;
  day: string;
  weekday: Weekday2;
  month: Month2;
  year: string;
  designation: Designation2;
}

interface Weekday2 {
  en: string;
}

interface Month2 {
  number: number;
  en: string;
}

interface Designation2 {
  abbreviated: string;
  expanded: string;
}

interface Meta {
  latitude: number;
  longitude: number;
  timezone: string;
  method: Method;
  latitudeAdjustmentMethod: string;
  midnightMode: string;
  school: string;
  offset: Offset;
}

interface Method {
  id: number;
  name: string;
  params: Params;
  location: Location;
}

interface Params {
  Fajr: number;
  Isha: number;
}

interface Location {
  latitude: number;
  longitude: number;
}

interface Offset {
  Imsak: number;
  Fajr: number;
  Sunrise: number;
  Dhuhr: number;
  Asr: number;
  Maghrib: number;
  Sunset: number;
  Isha: number;
  Midnight: number;
}
