import React, { useState } from "react";

type Props = {
  submitProduct: (name: string, date: string) => void;
  setMessage: (message: string) => void;
};

type ProductFormData = {
  name: string;
  date: Date;
};

const initialFormValue = {
  name: "",
  date: new Date(),
};

const AddProductForm = (props: Props) => {
  const [productForm, setProductForm] =
    useState<ProductFormData>(initialFormValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (productForm.name === "") {
      props.setMessage(
        "Please enter correct product details. Fields can't be empty."
      );
      setTimeout(() => {
        props.setMessage("");
      }, 3000);
    } else if (new Date(productForm.date).getTime() < new Date().getTime()) {
      props.setMessage(
        "The items expiration date has to can't be older than todays date."
      );
      setTimeout(() => {
        props.setMessage("");
      }, 3000);
    } else {
      props.submitProduct(productForm.name, productForm.date);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductForm({ ...productForm, [event.target.name]: event.target.value });
  };

  return (
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
  );
};

export default AddProductForm;
