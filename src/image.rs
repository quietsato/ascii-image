use crate::canvas::*;
use crate::color::*;
use crate::font::FONT_HEIGHT;
use crate::font::FONT_WIDTH;
use crate::FONT_SORT_BY_LIGHTNESS;
use wasm_bindgen::prelude::*;
use wasm_bindgen::Clamped;

#[allow(dead_code)]
#[wasm_bindgen(js_name = drawAsciiArtFromImage)]
pub fn draw_ascii_art_from_image(
    image: web_sys::HtmlImageElement,
    src_canvas: web_sys::HtmlCanvasElement,
    dest_canvas: web_sys::HtmlCanvasElement,
    size_max: u32,
) -> Result<(), JsValue> {
    let (width, height) = calc_image_size(image.width(), image.height(), size_max);

    let src_image_data = {
        let context = CanvasRenderingContext::from_canvas(&src_canvas)?;
        src_canvas.set_width(width);
        src_canvas.set_height(height);
        context.draw_image_with_html_image_element_and_dw_and_dh(
            &image,
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

    Ok(())
}

fn generate_ascii_image_vec(data: &[u8], width: usize, height: usize) -> Result<Vec<u8>, JsValue> {
    let mut dest_data = vec![0u8; width * height * 4]; // RGBA

    for y in (0..height).step_by(FONT_HEIGHT) {
        for x in (0..width).step_by(FONT_WIDTH) {
            let mean_hsl = calc_mean_hsl(data, x, y, width, FONT_WIDTH, FONT_HEIGHT);

            let (_c, font) = FONT_SORT_BY_LIGHTNESS
                .get()
                .unwrap()
                .find_nearest_lightness_char(mean_hsl.l);

            let char_rgb = {
                let mut hsl = mean_hsl;
                hsl.l = 1.0;
                Rgb::from(&hsl)
            };

            draw_char(
                &mut dest_data,
                &font,
                x,
                y,
                width,
                FONT_WIDTH,
                FONT_HEIGHT,
                &char_rgb,
            );
        }
    }

    Ok(dest_data)
}

fn calc_image_size(w: u32, h: u32, size_max: u32) -> (u32, u32) {
    let (w, h) = if w >= h {
        let (wf, hf) = (w as f64, h as f64);
        (
            w.min(size_max),
            (hf * (wf.min(size_max as f64) / wf)) as u32,
        )
    } else {
        let (wf, hf) = (w as f64, h as f64);
        (
            (wf * (hf.min(size_max as f64) / hf)) as u32,
            h.min(size_max),
        )
    };

    (w - w % FONT_WIDTH as u32, h - h % FONT_HEIGHT as u32)
}

fn calc_mean_hsl(
    data: &[u8],
    sx: usize,
    sy: usize,
    image_width: usize,
    area_width: usize,
    area_height: usize,
) -> Hsl {
    let (mut h, mut s, mut l) = (0.0, 0.0, 0.0);

    for dy in 0..area_height {
        for dx in 0..area_width {
            let i = ((sy + dy) * image_width + (sx + dx)) * 4; // RGBA
            let (r, g, b, _a) = (data[i], data[i + 1], data[i + 2], data[i + 3]);
            let hsl: Hsl = (&Rgb::new(r, g, b)).into();
            h += hsl.h;
            s += hsl.s;
            l += hsl.l;
        }
    }

    h /= (area_width * area_height) as f64;
    s /= (area_width * area_height) as f64;
    l /= (area_width * area_height) as f64;

    Hsl::new(h, s, l)
}

#[allow(clippy::too_many_arguments)]
#[rustfmt::skip]
fn draw_char(
    data: &mut [u8],
    font: &[u8],
    sx: usize,
    sy: usize,
    image_width: usize,
    font_width: usize,
    font_height: usize,
    color: &Rgb,
) {
    for dy in 0..font_height {
        for dx in 0..font_width {
            let di = ((sy + dy) * image_width + (sx + dx)) * 4; // RGBA
            let fi = dy * font_width + dx;
            data[di]     = font[fi] * color.r;
            data[di + 1] = font[fi] * color.g;
            data[di + 2] = font[fi] * color.b;
            data[di + 3] = 255;
        }
    }
}
