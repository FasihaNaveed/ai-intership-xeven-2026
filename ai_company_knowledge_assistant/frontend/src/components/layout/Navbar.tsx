export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600">
          Welcome, Employee
        </div>

        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          F
        </div>
      </div>
    </header>
  );
}