import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, User, Lock, Save, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
  return (
    <div className="flex flex-col gap-6">
      {/* --- HEADER PROFILE (FULL CARD STYLE) --- */}
      {/* Kita gabungkan Banner dan Info dalam satu kotak rounded merah */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 p-8 shadow-xl shadow-red-500/20">
        {/* Background Pattern Halus */}
        <div
          className="absolute inset-0 bg-white/10 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        <div className="relative z-10 flex flex-col items-center gap-6 md:flex-row md:items-start">
          {/* Avatar */}
          <div className="relative group shrink-0">
            <Avatar className="h-32 w-32 border-4 border-white/30 shadow-2xl">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>WG</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-1 right-1 rounded-full bg-white p-2 text-red-600 shadow-lg hover:bg-slate-100 transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>

          {/* Nama & Role (Teks Putih) */}
          <div className="flex-1 text-center md:text-left md:mt-2">
            <h1 className="text-3xl font-bold text-white mb-1">
              Wahyu Ganteng
            </h1>
            <p className="text-red-100 font-medium text-lg opacity-90">
              Senior Fullstack Developer
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-red-50 font-medium">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                <MapPin className="h-3.5 w-3.5" /> Jakarta, Indonesia
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                <Mail className="h-3.5 w-3.5" /> admin@master.com
              </span>
            </div>
          </div>

          {/* Action Button (Putih biar Kontras) */}
          <div className="mt-4 md:mt-2">
            <Button className="bg-white text-red-600 hover:bg-red-50 font-bold shadow-lg border-0">
              <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
            </Button>
          </div>
        </div>
      </div>

      {/* --- TABS SECTION (FORM) --- */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px] bg-slate-100 dark:bg-slate-800">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-950"
          >
            <User className="mr-2 h-4 w-4" /> General Info
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-950"
          >
            <Lock className="mr-2 h-4 w-4" /> Security
          </TabsTrigger>
        </TabsList>

        {/* --- TAB 1: GENERAL INFO --- */}
        <TabsContent value="general" className="mt-6">
          <Card className="shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Informasi Pribadi</CardTitle>
              <CardDescription>
                Update foto profil dan detail pribadi Anda di sini.
              </CardDescription>
            </CardHeader>
            <Separator className="mb-6" />
            <CardContent className="space-y-6">
              {/* Grid Nama */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nama Depan</Label>
                  <Input
                    id="firstName"
                    placeholder="Wahyu"
                    defaultValue="Wahyu"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nama Belakang</Label>
                  <Input
                    id="lastName"
                    placeholder="Ganteng"
                    defaultValue="Ganteng"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    defaultValue="admin@master.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input id="phone" type="tel" placeholder="+62..." />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio Singkat</Label>
                <Textarea
                  id="bio"
                  placeholder="Ceritakan sedikit tentang diri Anda..."
                  className="min-h-[100px]"
                  defaultValue="Seorang developer yang hobi ngoding sambil ngopi."
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  Bio ini akan muncul di profil publik Anda.
                </p>
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t bg-slate-50/50 p-4 dark:bg-slate-900/50 dark:border-slate-800">
              <Button className="bg-red-600 hover:bg-red-700">
                Simpan Profile
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* --- TAB 2: SECURITY --- */}
        <TabsContent value="security" className="mt-6">
          <Card className="shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Password & Keamanan</CardTitle>
              <CardDescription>
                Kelola password akun Anda untuk menjaga keamanan.
              </CardDescription>
            </CardHeader>
            <Separator className="mb-6" />
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Password Saat Ini</Label>
                <Input id="current" type="password" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new">Password Baru</Label>
                  <Input id="new" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Konfirmasi Password Baru</Label>
                  <Input id="confirm" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t bg-slate-50/50 p-4 dark:bg-slate-900/50 dark:border-slate-800">
              <Button className="bg-red-600 hover:bg-red-700">
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
