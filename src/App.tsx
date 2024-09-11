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

  return (
    <>
      <div className="flex justify-center items-center mt-5 text-6xl">
        <h1>Boxy OrderItemFilterMaker</h1>
      </div>
      <div className="flex min-h-screen">
        <div className="flex flex-col justify-center items-center w-1/2 p-4">
          <div className="w-full">
            <textarea
              placeholder="Másold be a filterezni kívánt SKU-kat"
              className="textarea textarea-bordered textarea-lg w-full h-[50vh]"
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
        <div className="flex flex-col justify-center items-center w-1/2 p-4">
          <h1>{orderItemFilterresult}</h1>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default App;
