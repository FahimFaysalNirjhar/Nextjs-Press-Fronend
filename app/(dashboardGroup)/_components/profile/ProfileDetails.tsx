import { CalendarDays, Mail, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProfileEditDialog } from "./ProfileEditDialog";

type Profile = {
  name: string;
  email: string;
  role: string;
  activeStatus: string;
  createdAt: string;
  profile?: {
    bio?: string | null;
    profilePhoto?: string | null;
  };
};

export function ProfileDetails({ profile }: { profile: Profile }) {
  const joined = new Date(profile.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const bio = profile.profile?.bio;
  const photo = profile.profile?.profilePhoto;

  return (
    <div className="rounded-xl border">
      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-16">
            <AvatarImage src={photo ?? undefined} alt={profile.name} />
            <AvatarFallback className="text-lg">
              {profile.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-lg font-semibold">{profile.name}</h2>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{profile.role}</Badge>
              <Badge
                variant={
                  profile.activeStatus === "ACTIVE" ? "default" : "destructive"
                }
              >
                {profile.activeStatus}
              </Badge>
            </div>
          </div>
        </div>

        <ProfileEditDialog
          profile={{ name: profile.name, bio, profilePhoto: photo }}
        />
      </div>

      <Separator />

      <div className="space-y-4 p-6">
        <div className="flex items-center gap-3 text-sm">
          <Mail className="size-4 text-muted-foreground" aria-hidden />
          <span>{profile.email}</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <CalendarDays className="size-4 text-muted-foreground" aria-hidden />
          <span>Joined {joined}</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <ShieldCheck className="size-4 text-muted-foreground" aria-hidden />
          <span>Role: {profile.role}</span>
        </div>

        {bio ? (
          <div className="pt-2">
            <p className="text-sm font-medium text-muted-foreground">Bio</p>
            <p className="mt-1 whitespace-pre-line text-sm">{bio}</p>
          </div>
        ) : (
          <p className="pt-2 text-sm text-muted-foreground">
            No bio added yet. Click &quot;Edit profile&quot; to add one.
          </p>
        )}
      </div>
    </div>
  );
}
