import { useEffect, useState } from "react";
import ConversationList from "../components/ConversationTabs/ConversationList"
import { useAuthContext } from "../utils/AuthContext";
import { useSearchUsers } from "../utils/queries"
import type { UserType } from "../utils/types";

function Conversations() {
  const { token } = useAuthContext();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useSearchUsers(token, "a", 10);
  const [users, setUsers] = useState<UserType[]>([]);
  console.log('test')
  useEffect(() => {
    if (data) {
      const queryUsers = data.pages.flatMap(page => page.users);
      setUsers(queryUsers);
    }
  }, [data]); // The effect runs whenever 'data' changes


  return (
    <div className='bg-zinc-300 overflow-y-hidden h-screen w-full grid grid-cols-7 '>
      <div className="bg-red-500 w-full col-span-2 overflow-scroll">
        <ConversationList />
      </div>
      <div className="bg-blue-500 w-full col-span-5">add chat interface here</div>
    </div>
  )
}

export default Conversations
