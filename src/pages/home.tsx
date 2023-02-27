import { invoke } from "@tauri-apps/api/tauri";
import { ReactElement, useContext, useEffect, useState } from "react";
import AddProductForm from "../components/AddProductForm";
import { NotificationContext } from "../context/NotificationContext";
type Props = {};

type Product = {
  name: string;
  date: string;
};

const Home = (props: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  const { setMessage } = useContext(NotificationContext);

  useEffect(() => {
    const getData = async () => {
      const productsFromRust = (await invoke("get_items")) as Product[];
      setProducts(productsFromRust);
    };

    getData();
  }, []);

  const addProduct = async (name: string, date: string) => {
    try {
      await invoke("add_item", {
        name,
        date,
      });

      const newProduct = {
        name,
        date,
      };
      setProducts([...products, newProduct]);
    } catch (error) {}
  };

  return (
    <div>
      <div>
        <h1>Welcome to your skafferi</h1>
        <h4>These are your current items in inventory:</h4>
        <ul>
          {products
            ? products.map((product) => (
                <li key={product.name}>
                  {product.date} : {product.name}
                </li>
              ))
            : null}
        </ul>
      </div>
      <div>
        <AddProductForm setMessage={setMessage} submitProduct={addProduct} />
      </div>
    </div>
  );
};

export default Home;
