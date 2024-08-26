import TrustedBusiness from "SvelteApp/TrustedBusiness";
import ProductSlider from "VueApp/ProductSlider";
import { SvelteWrapper, VueWrapper } from "./components/wrappers";

function App() {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <VueWrapper component={ProductSlider} />
        </div>

        <div className="w-full md:w-1/2 border-l-2 border-gray-200 p-4">
          <h2 className="text-3xl">Featured Products</h2>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            vehicula, odio nec tincidunt suscipit, nunc eros ultricies nunc, nec
            fermentum justo nisl quis eros.
          </p>
          <h2 className="text-2xl mt-7 uppercase text-red-500">
            some other content
          </h2>
        </div>
      </div>

      <div className="mt-7">
        <SvelteWrapper component={TrustedBusiness} />
      </div>
    </>
  );
}

export default App;
