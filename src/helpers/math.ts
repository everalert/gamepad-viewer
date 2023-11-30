// ranges

export const clamp = (n:number, min:number, max:number) =>
	Math.min(Math.max(n,min),max)

export const wrap = (n:number, start:number, range:number) =>
	start+((start+n)%range+range)%range

export const lerp = (n:number, target:number, rate:number) =>
	n + (target-n)*rate

export const damp = (n:number, target:number, rate:number, dt:number) =>
	lerp(n, target, 1 - rate ** dt)


export const deg2rad = (d:number) => d * Math.PI / 180
export const rad2deg = (r:number) => r * 180 / Math.PI


// x/y-axis conversion

export const ang = (x:number, y:number) => rad2deg(Math.atan2(y, x))

export const mag = (x:number, y:number) => Math.sqrt(x**2 + y**2)

export const rotVec2x = (x:number, y:number, ang:number) =>
	mag(x,y)*Math.cos(deg2rad(ang)+Math.atan2(x,y))

export const rotVec2y = (x:number, y:number, ang:number) =>
	mag(x,y)*Math.sin(deg2rad(ang)+Math.atan2(x,y))


// triangles

export const AbC2a = (A:number, b:number, C:number) =>
	(Math.sin(deg2rad(A))*b)/Math.sin(deg2rad(180-A-C))

export const AbC2c = (A:number, b:number, C:number) =>
	(Math.sin(deg2rad(C))*b)/Math.sin(deg2rad(180-A-C))

export const AbC2area = (A:number, b:number, C:number) =>
	0.5 * AbC2a(A,b,C) * b * Math.sin(deg2rad(C))

export const AbC2h = (A:number, b:number, C:number) => 2*(AbC2area(A,b,C)/b)


// chord length, sagitta, radius
// https://en.wikipedia.org/wiki/Sagitta_(geometry)

export const cs2r = (c:number, s:number) => s/2 + (c**2)/(8*s)

export const rc2s = (r:number, c:number) => r - Math.sqrt(r**2 - 0.25*(c**2))

export const sr2c = (s:number, r:number) => 2 * Math.sqrt(2*r*s - s**2)

export const rc2rad = (r:number, c:number) => 2 * Math.asin(c/2/r)

export const rc2deg = (r:number, c:number) => rc2rad(r, c) * 180 / Math.PI


// linear transformations

export const easeIn2 = (n:number) => n**2
export const easeIn3 = (n:number) => n**3
export const easeIn4 = (n:number) => n**4

export const easeOut2 = (n:number) => 1-(1-n)**2
export const easeOut3 = (n:number) => 1-(1-n)**3
export const easeOut4 = (n:number) => 1-(1-n)**4

export const easeInOut2 = (n:number) => lerp( easeIn2(n)*n, easeOut2(n), n )
export const easeInOut3 = (n:number) => lerp( easeIn3(n)*n, easeOut3(n), n )
export const easeInOut4 = (n:number) => lerp( easeIn4(n)*n, easeOut4(n), n )
