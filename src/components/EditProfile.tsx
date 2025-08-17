
import type { UserBioType } from '../utils/types';
import { IoArrowBackOutline } from 'react-icons/io5';

type EditProfileProps = {
    bio: UserBioType | undefined;
    isActive: boolean;
    setActive: (isActive: boolean) => void;
}
function EditProfile({ bio, isActive, setActive }: EditProfileProps) {
    if (!isActive) return null; // If not active, return null to avoid rendering
    const handleExit = () => {
        setActive(false);
    }

  return (
    
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

    <div className='absolute top-10 h-256 w-256 bg-zinc-200 rounded-3xl 
    p-5 shadow-2xl border-6 border-dashed border-amber-300'>

        <div className="text-[3rem] mb-10 text-zinc-950" onClick={handleExit}>
            <IoArrowBackOutline  />
        </div>
        <div className="flex flex-col gap-4">
            {/* Edit Bio */}
            <div className="text-center text-4xl mb-2">Edit Bio</div>
            <textarea
                placeholder="Edit your bio..."
                className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                rows={4}
            ></textarea>

            {/* Upload Image */}
            <div className="w-full">
                <label className="block mb-2 font-semibold">
                Change Profile Picture
                </label>
                <input
                type="file"
                accept="image/*"
                className="w-full border p-2 rounded-lg"
                />
            </div>

            {/* Save Button */}
            <button className="mt-5 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
                Save Changes
            </button>
        </div>

    </div>

    </div>
    
  )
}

export default EditProfile
