import { Plus } from "lucide-react";
import ProductModal from "~/components/store/product-modal";

export default function StoreProducts() {
  return (
    <>
      <div>
        <button className="border rounded-sm flex gap-1 p-2 font-semibold">
          <a href="#create-product">New product</a>
          <Plus size={22} />
        </button>

        <ProductModal />
      </div>
    </>
  );
}
