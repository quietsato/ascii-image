#[derive(Debug)]
pub struct Rgb {
    pub r: u8,
    pub g: u8,
    pub b: u8,
}

impl Rgb {
    pub fn new(r: u8, g: u8, b: u8) -> Self {
        Self { r, g, b }
    }
}

impl From<&Hsl> for Rgb {
    fn from(&Hsl { h, s, l }: &Hsl) -> Self {
        let max = l;
        let min = l * (1.0 - s);

        let r = if max == min {
            max
        } else if h < 180.0 {
            ((h - 60.0) * ((min - max) / 60.0) + max).max(min).min(max)
        } else {
            ((h - 240.0) * ((max - min) / 60.0) + min).max(min).min(max)
        };
        let g = if max == min {
            max
        } else if h < 120.0 {
            ((h - 0.0) * ((max - min) / 60.0) + min).max(min).min(max)
        } else {
            ((h - 180.0) * ((min - max) / 60.0) + max).max(min).min(max)
        };
        let b = if max == min {
            max
        } else if h < 240.0 {
            ((h - 120.0) * ((max - min) / 60.0) + min).max(min).min(max)
        } else {
            ((h - 300.0) * ((min - max) / 60.0) + max).max(min).min(max)
        };

        Rgb {
            r: (r * 255.0) as u8,
            g: (g * 255.0) as u8,
            b: (b * 255.0) as u8,
        }
    }
}

#[derive(Debug)]
pub struct Hsl {
    pub h: f64,
    pub s: f64,
    pub l: f64,
}

impl Hsl {
    pub fn new(h: f64, s: f64, l: f64) -> Self {
        let h = h.max(0.0).min(360.0 - 1e-9);
        let s = s.max(0.0).min(1.0);
        let l = l.max(0.0).min(1.0);
        Self { h, s, l }
    }
}

impl From<&Rgb> for Hsl {
    fn from(&Rgb { r, g, b }: &Rgb) -> Self {
        let (r, g, b): (f64, f64, f64) = (r.into(), g.into(), b.into());
        let max = r.max(g).max(b);
        let min = r.min(g).min(b);

        let h = {
            let h = if r == g && g == b {
                0.0
            } else if r >= g && r >= b {
                60.0 * ((g - b) / (max - min))
            } else if g >= r && g >= b {
                60.0 * ((b - r) / (max - min)) + 120.0
            } else {
                60.0 * ((r - g) / (max - min)) + 240.0
            };
            if h >= 0.0 {
                h
            } else {
                360.0 + h
            }
        };
        let s = if max == 0.0 { 0.0 } else { (max - min) / max };
        let l = max / u8::MAX as f64;
        Hsl { h, s, l }
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use test_case::test_case;
    #[test_case(0, 0, 0 => (0, 0, 0))]
    #[test_case(255, 255, 255 => (0, 0, 100))]
    #[test_case(255, 0, 0 => (0, 100, 100))]
    #[test_case(0, 255, 0 => (120, 100, 100))]
    #[test_case(0, 0, 255 => (240, 100, 100))]
    #[test_case(127, 127, 255 => (240, 50, 100))]
    #[test_case(255, 136, 0 => (32, 100, 100))]
    #[test_case(0, 255, 34 => (128, 100, 100))]
    #[test_case(68, 0, 255 => (256, 100, 100))]
    fn test_rgb_to_hsl(r: u8, g: u8, b: u8) -> (u32, u32, u32) {
        let rgb = Rgb::new(r, g, b);
        let hsl = Hsl::from(&rgb);
        (hsl.h as u32, (hsl.s * 100.0) as u32, (hsl.l * 100.0) as u32)
    }

    #[test_case(0.0, 0.0, 0.0 => (0, 0, 0))]
    #[test_case(0.0, 0.0, 1.0 => (255, 255, 255))]
    #[test_case(0.0, 1.0, 1.0 => (255, 0, 0))]
    #[test_case(120.0, 1.0, 1.0 => (0, 255, 0))]
    #[test_case(240.0, 1.0, 1.0 => (0, 0, 255))]
    #[test_case(240.0, 0.5, 1.0 => (127, 127, 255))]
    #[test_case(32.0, 1.0, 1.0 => (255, 136, 0))]
    #[test_case(128.0, 1.0, 1.0 => (0, 255, 34))]
    #[test_case(256.0, 1.0, 1.0 => (68, 0, 255))]
    fn test_hsl_to_rgb(h: f64, s: f64, l: f64) -> (u8, u8, u8) {
        let hsl = Hsl::new(h, s, l);
        let rgb = Rgb::from(&hsl);
        (rgb.r, rgb.g, rgb.b)
    }
}
