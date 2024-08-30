import { getCurrentUser } from "@/utils/actions";
import UserAccount from "@/components/UserAccount"
const Header = async () => {

  const user = await getCurrentUser()

  return (
    <header className="w-full h-12 py-2 px-4 flex items-center justify-between">
      <h2 className="text-2xl font-bold">CodeStreak</h2>
      <UserAccount user={user}/>
     
    </header>
  );
};

export default Header;
