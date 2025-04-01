import { useCallback, useState } from "react";
import MultiSelectBox from "./components/multiSelectBox/MultiSelectBox";
import "./global.scss";
import { Toaster } from "react-hot-toast";

const DEFAULT_OPTIONS = [
  "Science 🧪",
  "Education 🎓",
  "Art 🎨",
  "Sport ⚽",
  "Games 🎮",
  "Health 🏥",
  "Yeeeah, science! 🧪",
];

function App() {

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelect = useCallback((option: string) => {
    setSelectedItems((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  }, []);

  return (
    <>
    <div className="container">
      <MultiSelectBox
        defaultOptions={DEFAULT_OPTIONS}
        onSelect={handleSelect}
        selectedItems={selectedItems}
      />
    </div>
    <Toaster position="top-center" />
    </>
  );
}

export default App;
