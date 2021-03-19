import { useState, useRef } from "react";
import { default as MonacoEditor } from "@monaco-editor/react";

const Editor = () => {
  const [fileHandle, setFileHandle] = useState();
  const [fileContent, setFileContent] = useState("");
  const editorRef = useRef(null);

  const openFile = async () => {
    const [myFileHandle] = await window.showOpenFilePicker();
    setFileHandle(myFileHandle);

    const file = await myFileHandle.getFile();
    const contents = await file.text();
    setFileContent(contents);
  };

  const saveFile = async () => {
    // Create a FileSystemWritableFileStream to write to.
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(editorRef.current.getValue());
    // Close the file and write the contents to disk.
    await writable.close();
  };

  return (
    <>
      <button
        type="button"
        className="m-4 bg-blue-100 hover:bg-blue-200 text-blue-700 text-base font-semibold px-6 py-2 rounded-lg"
        onClick={() => openFile()}
      >
        Open File
      </button>
      <button
        type="button"
        className="m-4 bg-green-100 hover:bg-green-200 text-green-700 text-base font-semibold px-6 py-2 rounded-lg"
        onClick={() => saveFile()}
      >
        Save file
      </button>
      <MonacoEditor
        defaultLanguage="python"
        defaultValue={`# please select the code.py file 
# from your CIRCUITPY volume`}
        value={fileContent}
        onMount={(editor, monaco) => {
          editorRef.current = editor;
        }}
      />
      {/* <iframe
              className="w-full h-full"
              src="https://googlechromelabs.github.io/text-editor/"
            ></iframe> */}
    </>
  );
};

export default Editor;
