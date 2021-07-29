#[macro_use]
extern crate rocket;

use std::collections::HashMap;
use rocket::serde::{json::Json};
use rocket::Config;

#[get("/ping-rust")]
fn index() -> Json<HashMap<String, String>> {
    let mut response = HashMap::new();
    response.insert("message".to_string(), "pong-rust".to_string());
    Json(response)
}

#[launch]
fn rocket() -> _ {
    rocket::custom(Config::figment().merge(("port", 8001))).mount("/", routes![index])
}
