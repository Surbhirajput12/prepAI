import { useAuth } from "../../hooks/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-bold">
            Welcome, {user?.name || "User"}
          </h1>

          <p className="text-white/60 mt-3">
            Your AI interview workspace
          </p>
        </div>

        <button
          onClick={logout}
          className="border border-white/20 px-5 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;