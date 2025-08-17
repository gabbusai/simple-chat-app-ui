import React, { useEffect, useState } from 'react'
import { useSearchUsers } from '../../utils/queries';
import { useAuthContext } from '../../utils/AuthContext';
import toast from 'react-hot-toast';
import LoadingScreen from '../LoadingScreen';
import type { UserType } from '../../utils/types';

type SearchUsersProps = {
  search: string;
  setSearch: (search: string) => void;
  users: UserType[];
  setUsers: (users: UserType[]) => void;
}
function SearchUsers({ search, setSearch, users, setUsers }: SearchUsersProps) {
    const { token } = useAuthContext();
    const { data, fetchNextPage, hasNextPage, isFetching,
        isFetchingNextPage, isLoading, isError, error, refetch } = useSearchUsers(token, search, 10);
    const [showResults, setShowResults] = useState(false);

    if(isError){
        toast.error(`${error}`);
        setUsers([]);
    }

    useEffect(() => {
    if (data) {
        setUsers(data.pages.flatMap(page => page.users));
        
    }
    }, [data, setUsers]);



const handleSearch = (searchTerm: string) => {
  const sanitizedSearchTerm = searchTerm.trim();
  if (sanitizedSearchTerm) {
    toast.success(`Searching for users... ${sanitizedSearchTerm}`);
    setSearch(sanitizedSearchTerm);
    setShowResults(true);
    refetch();
    // ❌ remove manual refetch
  } else {
    setUsers([]);
    toast.error("Search term cannot be empty.");
  }
};

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowResults(false);
        setSearch(e.target.value);
    };

    return (
    <div className='relative overflow-x-visible grid place-items-center'>
        <div className="bg-zinc-50 rounded-2xl w-[95%] h-20 flex items-center justify-between px-4 mt-5">
          <input
            type="text"
            value={search}
            onChange={(e) => handleChange(e)}
            placeholder="Search users..."
            minLength={1}
            required
          />
          <button onClick={() => handleSearch(search)}>Search</button>
        </div>
        

        {
        showResults && (
        <div className="sticky top-10 h-128 w-[95%] rounded-2xl mt-5 mx-4 bg-zinc-50 overflow-y-scroll">
            {
                isLoading || isFetching ? (
                    <div className="p-4 border-b border-zinc-200">
                        <LoadingScreen message="Loading users..." size={45} color="#2c2c2c"/>
                    </div>
                ) : (
                    users.map(user => (
                        <div key={user.id} className="p-4 border-b border-zinc-200">
                            {user.name}
                        </div>
                    ))
                )
            }
        </div>
        )
        }


    </div>
  )
}

export default SearchUsers
