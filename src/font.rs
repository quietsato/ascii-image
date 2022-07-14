use std::{collections::BTreeMap, ops::Deref};

use serde_json::Value;

pub const FONT_WIDTH: usize = 5;
pub const FONT_HEIGHT: usize = 12;

type FontLightness = f64;
type FontChar = char;
type FontArray = [u8; FONT_WIDTH * FONT_HEIGHT];
type FontMap = BTreeMap<FontChar, FontArray>;

#[derive(Debug)]
pub struct Font(FontMap);

#[derive(Debug)]
pub struct FontSortByLightness(Vec<(FontLightness, FontChar, FontArray)>);

impl Deref for Font {
    type Target = FontMap;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Deref for FontSortByLightness {
    type Target = Vec<(FontLightness, FontChar, FontArray)>;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Font {
    pub fn load() -> Self {
        static FONT_JSON: &str = include_str!("../font/monogram-bitmap.json");
        let obj: Value = serde_json::from_str(FONT_JSON).unwrap();

        Self(BTreeMap::from_iter(
            obj.as_object().unwrap().iter().filter_map(|(c, v)| {
                let c = c.chars().next().unwrap();
                if c.is_ascii() {
                    let v = v
                        .as_array()
                        .unwrap()
                        .iter()
                        .flat_map(|v| {
                            let v = v.as_u64().unwrap();
                            (0..FONT_WIDTH).map(move |i| ((v & (1 << i)) > 0) as u8)
                        })
                        .collect::<Vec<_>>()
                        .try_into()
                        .unwrap();
                    Some((c, v))
                } else {
                    None
                }
            }),
        ))
    }
}

impl From<&Font> for FontSortByLightness {
    fn from(font: &Font) -> Self {
        let mut v = font
            .iter()
            .map(|(c, arr)| (calc_fontarray_lightness(arr), *c, *arr))
            .collect::<Vec<_>>();
        normalize_lightness(&mut v);
        v.sort_by(|&(l1, _, _), &(l2, _, _)| {
            l1.partial_cmp(&l2).unwrap_or(std::cmp::Ordering::Equal)
        });
        Self(v)
    }
}

fn normalize_lightness(v: &mut [(f64, FontChar, FontArray)]) {
    let (min, max) = (
        v.iter()
            .map(|&(l, _, _)| l)
            .reduce(|l1, l2| l1.min(l2))
            .unwrap_or(0.0),
        v.iter()
            .map(|&(l, _, _)| l)
            .reduce(|l1, l2| l1.max(l2))
            .unwrap_or(1.0),
    );
    for v in v.iter_mut() {
        v.0 = (v.0 - min) / (max - min);
    }
}

impl FontSortByLightness {
    pub fn find_nearest_lightness_char(&self, l: f64) -> (FontChar, FontArray) {
        match self
            .binary_search_by(|(l1, _, _)| l1.partial_cmp(&l).unwrap_or(std::cmp::Ordering::Equal))
        {
            Ok(i) => {
                let (_, c, arr) = self[i];
                (c, arr)
            }
            Err(i) => {
                let (_, c, arr) = if i == 0 {
                    self[0]
                } else if i == self.len() {
                    self[self.len() - 1]
                } else {
                    let l1 = self[i - 1].0;
                    let l2 = self[i].0;
                    if (l - l1).abs() < (l - l2).abs() {
                        self[i - 1]
                    } else {
                        self[i]
                    }
                };
                (c, arr)
            }
        }
    }
}

fn calc_fontarray_lightness(arr: &FontArray) -> f64 {
    let mut l = 0.0;
    for a in arr {
        l += *a as f64;
    }
    l /= arr.len() as f64;
    l
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_load_font() {
        let font = Font::load();
        assert!(font.contains_key(&'0'));
    }
}
