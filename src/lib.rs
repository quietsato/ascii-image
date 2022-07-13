mod canvas;
mod color;
mod font;
mod image;
mod utils;
mod video;

use font::{Font, FontSortByLightness};
use once_cell::sync::OnceCell;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

pub static FONT: OnceCell<Font> = OnceCell::new();
pub static FONT_SORT_BY_LIGHTNESS: OnceCell<FontSortByLightness> = OnceCell::new();

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn init() {
    utils::set_panic_hook();
    FONT.set(Font::load()).ok();
    FONT_SORT_BY_LIGHTNESS
        .set(FontSortByLightness::from(FONT.get().unwrap()))
        .ok();
}

#[wasm_bindgen]
pub fn greet() {
    log("Hello World")
}
