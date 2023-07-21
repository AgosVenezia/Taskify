import { useState } from "react";
import { UserContextProvider } from "../context/userContext";
import { Card } from "flowbite-react";
import ProfileCard from "../components/ProfileCard";
import ProfileForm from "../components/ProfileForm";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);

  const handleEditMode = (v) => setEditMode(v);

  return (
    <div className="pt-32 h-screen">
      <Card className="max-w-md mx-auto">
        {editMode ? (
          <ProfileForm handleEditMode={handleEditMode} />
        ) : (
          <ProfileCard handleEditMode={handleEditMode} />
        )}
      </Card>
    </div>
  );
};

export default function ProfileContextWrapper() {
  return (
    <UserContextProvider>
      <Profile />
    </UserContextProvider>
  );
}
