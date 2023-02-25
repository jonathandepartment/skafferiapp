import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
type Props = {};

type Product = {
  name: string;
  date: string;
};

const Home = (props: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getData = async () => {
      const productsFromRust = (await invoke("get_items")) as Product[];
      setProducts(productsFromRust);
    };

    getData();
  }, []);

  return (
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
  );
};

export default Home;
