import { useState } from "react";

const SerialMonitor = () => {
  const [serialPortContent, setSerialPortContent] = useState([]);

  const [checked, setChecked] = useState(false);
  const handleClick = () => setChecked(!checked);

  const connectPort = async () => {
    try {
      const port = await navigator.serial.requestPort();

      await port.open({ baudRate: 115200 });

      while (port.readable) {
        const reader = port.readable.getReader();

        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) {
              // Allow the serial port to be closed later.
              reader.releaseLock();
              break;
            }
            if (value) {
              //   byte array to string: https://stackoverflow.com/a/37542820
              const text = String.fromCharCode.apply(null, value);
              console.log(text);
              setSerialPortContent((prevContent) => [
                ...prevContent,
                [new Date(), text],
              ]);
            }
          }
        } catch (error) {
          setSerialPortContent((prevContent) => [
            ...prevContent,
            [new Date(), error],
          ]);
        }
      }
    } catch (error) {
      setSerialPortContent((prevContent) => [
        ...prevContent,
        [new Date(), error],
      ]);
    }
  };

  return (
    <>
      <div className="flex items-center">
        <button
          type="button"
          className="m-4 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-base font-semibold px-6 py-2 rounded-lg"
          onClick={() => connectPort()}
        >
          Connect to senseBox
        </button>
        <label className="m-4 text-gray-700 text-base font-semibold px-6 py-3 rounded-lg">
          Show timestamps
          <input
            onChange={handleClick}
            checked={checked}
            type="checkbox"
            className="mx-4"
          />
        </label>
        <button
          type="button"
          className="m-4 bg-red-100 hover:bg-red-200 text-red-700 text-base font-semibold px-6 py-2 rounded-lg"
          onClick={() => setSerialPortContent([])}
        >
          Clear
        </button>
      </div>
      <div className="font-mono">
        {serialPortContent.map((log) => {
          return (
            <p>
              {checked && (
                <span className="font-medium mr-4">{log[0].toISOString()}</span>
              )}

              <span>{log[1]}</span>
            </p>
          );
        })}
      </div>
      {/* <iframe
              className="w-full h-full"
              src="https://googlechromelabs.github.io/serial-terminal/"
            ></iframe> */}
    </>
  );
};

export default SerialMonitor;
