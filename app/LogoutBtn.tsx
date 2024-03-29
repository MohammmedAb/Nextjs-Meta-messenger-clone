'use client';
const LogoutBtn = () => {
    return (
        <button
        onClick={() => console.log('logout')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Out
        </button>
    );
}

export default LogoutBtn;