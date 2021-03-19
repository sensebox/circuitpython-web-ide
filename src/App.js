import Editor from "./components/Editor";
import SerialMonitor from "./components/SerialMonitor";

export default function App() {
  return (
    <div className="bg-purple-50 dark:bg-gray-800 h-screen">
      <div className="container mx-auto flex h-full p-4">
        <div className="flex-1 shadow rounded-lg bg-white mx-4 p-4 overflow-hidden">
          <Editor></Editor>
        </div>
        <div className="flex-1 shadow rounded-lg bg-white mx-4 p-4 overflow-y-scroll">
          <SerialMonitor></SerialMonitor>
        </div>
      </div>
    </div>
  );
}
