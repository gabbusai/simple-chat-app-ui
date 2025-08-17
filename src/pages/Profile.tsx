import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import EditProfile from "../components/EditProfile";
import { useAuthContext } from "../utils/AuthContext";
import { useGetBioId, useGetSelfBio } from "../utils/queries";
import { useParams } from "react-router-dom";


    

function Profile() {

  const imageTemp = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3SwwQp_JZ1vjxqXeC6Oikp-TLWUWzSSR9hQ&s"
  const { userId } = useParams();
  const { data: userBio, isLoading, error, isError } = useGetBioId(userId);
  const { user } = useAuthContext();

  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [editingMode, setEditingMode] = useState(false);

  useEffect(() => {
    if (user && userBio) {
      setIsOwnProfile(user.id === userBio.user.id);
    }
  }, [user, userBio]);

  if(isLoading){
    return <LoadingScreen color="#2c2c2c"/>;
  }
  return (
    <div className='bg-zinc-300 h-full w-full grid place-items-center'
    style={ 
      editingMode ? { backdropFilter: "blur(5px)" } : {}
     }>
      <div className="h-[1200px] w-[1200px] bg-zinc-100 rounded-3xl
      shadow-xl inset-4">
        <div className="inset-0 bg-gradient-to-r from-amber-500 to-amber-300 w-full h-1/5 rounded-t-2xl relative">
          <div className="absolute top-[calc(40%)] left-[calc(50%-7.5rem)] h-[15rem] w-[15rem] bg-zinc-500 rounded-full
          border-dashed border-7 border-amber-500">
            <img src={userBio?.profile_photo || imageTemp} alt="Profile Picture" className="h-full w-full object-cover rounded-full" />
          </div>
          
        </div>
        <div className="mt-[7.5rem]"></div>
        <h1 className="text-center text-[3rem] font-bold">{userBio?.user.name}</h1>
        <h2 className="text-center opacity-55 text-2xl mb-10">{userBio?.user.email}</h2>
        <div className="grid place-items-center mx-5 px-12">
          <p className="mt-5 text-center text-[1.5rem]">{userBio?.bio}</p>
          {
            isOwnProfile && (
              <button className="mt-5 px-4 py-2 bg-amber-500 text-white rounded-lg"
              onClick={() => setEditingMode(!editingMode)}>
                Edit Profile
              </button>

            )},

              {editingMode && (
                <EditProfile bio={userBio} isActive={editingMode} setActive={setEditingMode} />
              )}
          
        </div>
      </div>
    </div>
  )
}

export default Profile

