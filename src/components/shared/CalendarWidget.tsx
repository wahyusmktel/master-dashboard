import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  MapPin,
  Calendar as CalendarIcon,
  MoreHorizontal,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Tipe Data Event
type Event = {
  id: number;
  title: string;
  time: string;
  type: "meeting" | "work" | "break";
  status: "active" | "upcoming" | "done";
  location?: string;
  description?: string;
};

// MOCK DATA AGENDA
const initialEvents: Event[] = [
  {
    id: 1,
    title: "Daily Standup Team",
    time: "09:00 - 09:30",
    type: "meeting",
    status: "done",
    location: "Google Meet",
  },
  {
    id: 2,
    title: "Review UI/UX Dashboard",
    time: "10:00 - 11:30", // Anggap ini Waktu SEKARANG
    type: "work",
    status: "active", // STATUS ACTIVE
    location: "Office / Room 302",
    description: "Finalisasi desain widget tracking dan chart pendapatan.",
  },
  {
    id: 3,
    title: "Lunch Break",
    time: "12:00 - 13:00",
    type: "break",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Client Presentation (PT. Maju)",
    time: "14:00 - 15:00",
    type: "meeting",
    status: "upcoming",
    location: "Zoom Meeting",
  },
];

export default function CalendarWidget() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Filter Event (Di real app ini difilter berdasarkan tanggal yang dipilih di kalender)
  const activeEvent = initialEvents.find((e) => e.status === "active");
  const upcomingEvents = initialEvents.filter((e) => e.status === "upcoming");

  return (
    <Card className="h-full shadow-sm dark:bg-slate-900 dark:border-slate-800 flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center gap-2 dark:text-white">
          <CalendarIcon className="h-5 w-5 text-red-600" />
          Agenda & Jadwal
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 grid lg:grid-cols-[280px_1fr] gap-6">
        {/* KOLOM KIRI: KALENDER MINI */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 dark:bg-slate-800 dark:border-slate-700 flex justify-center p-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
              classNames={{
                day_selected:
                  "bg-red-600 text-white hover:bg-red-600 focus:bg-red-600", // Ganti warna biru default jadi merah
                day_today:
                  "bg-slate-100 text-slate-900 font-bold dark:bg-slate-700 dark:text-white",
              }}
            />
          </div>

          {/* Info Tanggal Terpilih */}
          <div className="text-center space-y-1">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
              Terpilih
            </p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {date?.toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* KOLOM KANAN: LIST AGENDA */}
        <div className="flex flex-col gap-4">
          {/* 1. SECTION: HAPPENING NOW (Jika Ada) */}
          {activeEvent && (
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-rose-600 p-5 text-white shadow-lg shadow-red-500/20">
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wide text-red-100">
                  Sedang Berlangsung
                </span>
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-1">{activeEvent.title}</h3>
                <p className="text-red-100 text-sm mb-4 line-clamp-1">
                  {activeEvent.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 gap-1 backdrop-blur-sm">
                    <Clock className="h-3 w-3" /> {activeEvent.time}
                  </Badge>
                  {activeEvent.location && (
                    <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 gap-1 backdrop-blur-sm">
                      {activeEvent.location.includes("Meet") ||
                      activeEvent.location.includes("Zoom") ? (
                        <Video className="h-3 w-3" />
                      ) : (
                        <MapPin className="h-3 w-3" />
                      )}
                      {activeEvent.location}
                    </Badge>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="text-red-600 font-bold h-8"
                  >
                    Join Meeting
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent border-white/40 text-white hover:bg-white/10 h-8"
                  >
                    Detail
                  </Button>
                </div>
              </div>

              {/* Hiasan Background */}
              <Clock className="absolute -bottom-4 -right-4 h-32 w-32 text-white/10 rotate-12" />
            </div>
          )}

          {/* 2. SECTION: UPCOMING LIST */}
          <div className="flex-1 overflow-y-auto pr-2">
            <h4 className="text-sm font-bold text-slate-500 mb-3 flex items-center justify-between">
              <span>Berikutnya</span>
              <span className="text-xs font-normal bg-slate-100 px-2 py-0.5 rounded-full dark:bg-slate-800 dark:text-slate-400">
                {upcomingEvents.length} Agenda
              </span>
            </h4>

            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="group flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-white hover:border-red-200 hover:shadow-sm transition-all dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700"
                >
                  {/* Kotak Waktu */}
                  <div className="flex flex-col items-center justify-center h-12 w-14 rounded-lg bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                    <span className="text-xs font-bold">
                      {event.time.split("-")[0]}
                    </span>
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-slate-800 text-sm dark:text-white group-hover:text-red-600 transition-colors">
                        {event.title}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-slate-300"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 h-5 text-slate-500 dark:border-slate-700"
                      >
                        {event.type}
                      </Badge>
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {upcomingEvents.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed rounded-xl">
                  Tidak ada agenda lagi hari ini.
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
