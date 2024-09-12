import { useState, useEffect } from 'react';
import './App.css';
import Modal from './modal'; // Importáld a Modal komponenst

function App() {
  const [skuInput, setskuInput] = useState('');
  const [PropertyInput, setPropertyInput] = useState('');
  const [skuArray, setskuArray] = useState<string[]>([]);
  const [orderItemFilterresult, setorderItemFilterresult] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const skuInputToArray = (str: string) => str.split(/[\s,]+/);

  const skuArraytoObject = (strArray: string[], propertystr: string) =>
    strArray.map(item =>
      `{"Property": "${propertystr}", "FilterValue": "${item}", "FilterType": "NOTEQUALS"}`
    ).join(', ');

  useEffect(() => {
    if (skuArray.length > 0 && PropertyInput !== '') {
      setorderItemFilterresult(skuArraytoObject(skuArray, PropertyInput));
    }
  }, [skuArray, PropertyInput]);

  const handleButtonClick = () => {
    if (skuInput === '' || PropertyInput === '') {
      setIsModalOpen(true);
      return;
    }

    setskuArray(skuInputToArray(skuInput));
  };


  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
  
    document.body.appendChild(a);
    a.click();
  
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="flex justify-center items-center h-[10vh] text-6xl">
        <h1>Boxy OrderItemFilterMaker</h1>
      </div>
      <div className="flex flex-row min-h-[90vh] h-[90vh]">
        <div className="flex flex-col justify-center items-center w-full h-full p-4">
          <div className="w-full h-full flex flex-col justify-center">
            <textarea
              placeholder="Másold be a filterezni kívánt SKU-kat"
              className="textarea textarea-bordered textarea-lg w-full h-[40vh] resize-none"
              onChange={(e) => {
                setskuInput(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="w-full mt-10 flex flex-col justify-center items-center">
            <input
              type="text"
              placeholder="Írd be a Property-t"
              className="input input-bordered input-primary w-full max-w-xs mr-3"
              onChange={(e) => {
                setPropertyInput(e.target.value);
              }}
            />
            <button
              className="btn btn-outline btn-primary mt-5"
              onClick={handleButtonClick}
            >
              Make OrderItemFilter
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full p-4">
          <h1>{orderItemFilterresult}</h1>
          <button
              className="btn btn-outline btn-primary mt-5"
              onClick={() => downloadFile(orderItemFilterresult, 'orderItemFilter.txt')}
            >
              Letöltés TXT fájlban
            </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default App;
