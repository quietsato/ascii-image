use std::collections::BTreeMap;

use serde_json::Value;

pub type Font = BTreeMap<char, [u8; 3 * 4]>;

pub fn load_font() -> Font {
    static FONT_JSON: &str = include_str!("../font/monogram-bitmap.json");
    let obj: Value = serde_json::from_str(FONT_JSON).unwrap();

    BTreeMap::from_iter(obj.as_object().unwrap().iter().map(|(c, v)| {
        let c = c.chars().next().unwrap();
        let v = v
            .as_array()
            .unwrap()
            .iter()
            .map(|v| v.as_u64().unwrap() as u8)
            .collect::<Vec<_>>()
            .try_into()
            .unwrap();
        (c, v)
    }))
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_load_font() {
        let font = load_font();
        assert!(font.contains_key(&'0'));
    }
}
