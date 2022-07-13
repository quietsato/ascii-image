use wasm_bindgen::Clamped;
use wasm_bindgen::{prelude::wasm_bindgen, JsValue};

use crate::canvas::*;
use crate::image::*;

#[allow(dead_code)]
#[wasm_bindgen(js_name = drawAsciiArtFromVideo)]
pub fn draw_ascii_art_from_video(
    video: web_sys::HtmlVideoElement,
    src_canvas: web_sys::HtmlCanvasElement,
    dest_canvas: web_sys::HtmlCanvasElement,
    size_max: u32,
) -> Result<Option<String>, JsValue> {
    let (width, height) = calc_image_size(video.video_width(), video.video_height(), size_max);
    if width == 0 || height == 0 {
        return Ok(Some("Output size is too small".into()));
    }

    let src_image_data = {
        let context = CanvasRenderingContext::from_canvas(&src_canvas)?;
        src_canvas.set_width(width);
        src_canvas.set_height(height);
        context.draw_image_with_html_video_element_and_dw_and_dh(
            &video,
            0.0,
            0.0,
            width as f64,
            height as f64,
        )?;
        context.get_image_data(0.0, 0.0, width as f64, height as f64)
    }?;

    let image_data = {
        let image_data_vec = generate_ascii_image_vec(
            src_image_data.data().as_ref(),
            width as usize,
            height as usize,
        )?;
        web_sys::ImageData::new_with_u8_clamped_array(Clamped(&image_data_vec), width)?
    };

    let context = CanvasRenderingContext::from_canvas(&dest_canvas)?;
    dest_canvas.set_width(width);
    dest_canvas.set_height(height);
    context.put_image_data(&image_data, 0.0, 0.0)?;
    context.set_image_smoothing_enabled(false);

    Ok(None)
}
