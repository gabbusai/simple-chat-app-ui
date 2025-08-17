import { useEffect, useState } from "react";
import ConversationList from "../components/ConversationTabs/ConversationList"
import { useAuthContext } from "../utils/AuthContext";
import { useSearchUsers } from "../utils/queries"
import type { UserType } from "../utils/types";
import toast from "react-hot-toast";
import LoadingScreen from "../components/LoadingScreen";
import SearchUsers from "../components/ConversationTabs/SearchUsers";

function Conversations() {
  const { token } = useAuthContext();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<UserType[]>([]);
  //notes
  // - Create Search Component then add setSearch as a prop, then use parent setSearch as the value
  // - Centralize states in this parent component
  // - maybe create and use a context idk bruh



  return (
    <div className='bg-zinc-300 overflow-y-hidden h-screen w-full grid grid-cols-7 '>
      <div className="bg-red-500 w-full col-span-2 overflow-y-scroll overflow-x-visible grid z-99 relative">
        
          <div className="sticky top-0">
            <SearchUsers search={search} setSearch={setSearch} users={users} setUsers={setUsers} />
          </div>
          <ConversationList />
      </div>

      <div className="bg-blue-500 w-full col-span-5 z-0">add chat interface here

        <div className="">
          {
            
          }
        </div>
      </div>
    </div>
  )
}

export default Conversations
