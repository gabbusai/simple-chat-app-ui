import { useState } from 'react';
import { useBioMutate } from '../utils/mutations';
import type { UserBioType } from '../utils/types';
import { IoArrowBackOutline } from 'react-icons/io5';
import LoadingScreen from './LoadingScreen';

type EditProfileProps = {
    bio: UserBioType | undefined;
    isActive: boolean;
    setActive: (isActive: boolean) => void;
}

function EditProfile({ bio, isActive, setActive }: EditProfileProps) {
    const [bioText, setBioText] = useState(bio?.bio ?? "");
    const [file, setFile] = useState<File | null>(null);

    const { mutate, isPending, error } = useBioMutate();

    if (!isActive) return null;

    const handleExit = () => {
        setActive(false);
    };

    const handleSave = () => {
        mutate(
            { bio: bioText, profile_picture: file },
            {
                onSuccess: (data) => {
                    console.log("Updated Bio:", data);
                    setActive(false);
                },
                onError: (err) => {
                    console.error("Failed:", err);
                },
                
            }
        );
    };

    if(isPending){
        return <LoadingScreen />
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="absolute top-10 h-256 w-256 bg-zinc-200 rounded-3xl 
                p-5 shadow-2xl border-6 border-dashed border-amber-300">

                <div className="text-[3rem] mb-10 text-zinc-950" onClick={handleExit}>
                    <IoArrowBackOutline />
                </div>

                <div className="flex flex-col gap-4">
                    <div className="text-center text-4xl mb-2">Edit Bio</div>

                    {/* Edit Bio */}
                    <textarea
                        placeholder="Edit your bio..."
                        className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                        rows={4}
                        value={bioText}
                        onChange={(e) => setBioText(e.target.value)}
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
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        disabled={isPending}
                        className="mt-5 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50"
                    >
                        {isPending ? "Saving..." : "Save Changes"}
                    </button>

                    {error && (
                        <div className="text-red-500 mt-2">
                            {(error as Error).message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
