import { invoke } from "@tauri-apps/api/tauri";
import { ReactElement, useContext, useEffect, useState } from "react";
import { NotificationContext } from "../context/NotificationContext";
type Props = {};

type Product = {
  name: string;
  date: string;
};

type ProductFormData = {
  name: string;
  date: Date;
};

const initialFormValue = {
  name: "",
  date: new Date(),
};

const Home = (props: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productForm, setProductForm] =
    useState<ProductFormData>(initialFormValue);

  const { setMessage } = useContext(NotificationContext);

  useEffect(() => {
    const getData = async () => {
      const productsFromRust = (await invoke("get_items")) as Product[];
      setProducts(productsFromRust);
    };

    getData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (productForm.name === "") {
      setMessage(
        "Please enter correct product details. Fields can't be empty."
      );
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else if (new Date(productForm.date).getTime() < new Date().getTime()) {
      setMessage(
        "The items expiration date has to can't be older than todays date."
      );
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      await invoke("add_item", {
        name: productForm.name,
        date: productForm.date,
      });

      const newProduct = {
        name: productForm.name,
        date: productForm.date.toString(),
      };
      setProducts([...products, newProduct]);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductForm({ ...productForm, [event.target.name]: event.target.value });
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
        <form onSubmit={handleSubmit}>
          <div>
            <label>Productname</label>
            <input
              name="name"
              value={productForm.name}
              onChange={onChange}
              type="text"
            />
          </div>
          <div>
            <label>Expiry date</label>
            <input name="date" onChange={onChange} type="date" />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
