use std::ops::Deref;

use wasm_bindgen::{prelude::*, JsCast};

pub struct CanvasRenderingContext(web_sys::CanvasRenderingContext2d);

impl Deref for CanvasRenderingContext {
    type Target = web_sys::CanvasRenderingContext2d;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl CanvasRenderingContext {
    #[allow(dead_code)]
    pub fn new(context: web_sys::CanvasRenderingContext2d) -> Self {
        Self(context)
    }

    pub fn from_canvas(canvas: &web_sys::HtmlCanvasElement) -> Result<Self, JsValue> {
        let context = canvas
            .get_context("2d")
            .unwrap()
            .unwrap()
            .dyn_into::<web_sys::CanvasRenderingContext2d>()?;
        Ok(Self(context))
    }
}
