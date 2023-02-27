#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::vec;
use serde::ser::{Serialize, SerializeStruct, Serializer};

struct Product {
  name: String,
  date: String
}

impl Serialize for Product {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer {
        let mut s = serializer.serialize_struct("Product", 2)?;
        s.serialize_field("name", &self.name)?;
        s.serialize_field("date", &self.date)?;
        s.end()
    }
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_items, add_item])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn get_items() -> Vec<Product> {
  let mut products: Vec<Product> = Vec::new();
  let product_one = Product {
    name: String::from("Tomatsås"),
    date: String::from("2023-10-15")
  };

  let product_two = Product {
    name: String::from("Ärtsoppa"),
    date: String::from("2023-07-15")
  };

  products.push(product_one);
  products.push(product_two);
  products
}

#[tauri::command]
fn add_item(name: String, date: String) -> Product {  
  let product_one = Product {
    name,
    date
  };
  println!("product was added! {} : {}", product_one.name, product_one.date);
  product_one
}
