export const zeros = (num: number) => Array.from(Array(num),() => 0);


// source: https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
export const RGB2HSL = (r: number, g: number, b: number) => {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h = 0, s = 0, l = (max + min) / 2;

    /* if(max == min)
        h = s = 0; // achromatic */
    if (max != min) {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return [h, s, l];
};

export const HUE2RGB = (p: number, q: number, t: number) => {
    if(t < 0) t += 1;
    if(t > 1) t -= 1;
    if(t < 1/6) return p + (q - p) * 6 * t;
    if(t < 1/2) return q;
    if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
};

export const HSL2RGB = (h: number, s: number, l: number) => {
    var r = l, g = l, b = l;

    /* if(s == 0){
        r = g = b = l; // achromatic */
    if (s != 0){
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = HUE2RGB(p, q, h + 1/3);
        g = HUE2RGB(p, q, h);
        b = HUE2RGB(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

export interface IEvent {
    target: { 
        name: string,
        value: string
    }
};

export const handleChange = (event: IEvent, scope: any) => {
    let safeName: string = event.target.name;
    let safeValue: string = event.target.value;
    scope.setState({[safeName]: safeValue});
};
