export const clamp = (n:number, min:number, max:number) => Math.min(Math.max(n,min),max)

export const ang = (x:number, y:number) => Math.atan2(y, x) * 180 / Math.PI
export const mag = (x:number, y:number) => Math.sqrt(x**2 + y**2)

// chord length, sagitta, radius
// https://en.wikipedia.org/wiki/Sagitta_(geometry)
export const cs2r = (c:number, s:number) => s/2 + (c**2)/(8*s)
export const rc2s = (r:number, c:number) => r - Math.sqrt(r**2 - 0.25*(c**2))
export const sr2c = (s:number, r:number) => 2 * Math.sqrt(2*r*s - s**2)
export const rc2rad = (r:number, c:number) => 2 * Math.asin(c/2/r)
export const rc2deg = (r:number, c:number) => rc2rad(r, c) * 180 / Math.PI
