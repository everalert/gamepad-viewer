// numbers

const precision = 4

export const numf = (n:number, sign:boolean=false, p:number=precision) => {
	const m = 10**p
	const newNum = Math.abs(Math.floor(n*m)/m).toString().split('.')
	return `${sign?(n<0?'−':'+'):''}${newNum[0]}.${(newNum[1]||'').padEnd(p,'0')}`
}


// search params

export const ps2obj = (params:string):{[key:string]:string} => {
	if (!params) return {}
	return params.slice(params.startsWith('?')?1:0)
	.split('&')
	.reduce((a:any, p:string) => {
		const [k,v] = p.split('=')	
		return k.length>0 ? {...a, [k]:v} : a
	}, {})
}

export const obj2ps = (params:{[key:string]:string}) => {
	const s = Object.keys(params)
	.map(k=>`${k}${params[k]!==undefined?`=${params[k]}`:''}`)
	.join('&')
	return s.length>0 ? `?${s}` : ''
}

export const filterParams = (params:string, incl:string, excl?:string[]) => {
	let p = ps2obj(params)
	p = Object.keys(p)
		.filter(k => !excl?.includes(k))
		.reduce((a:any, k:string) => { return {...a, [k]:p[k]} }, {})
	return obj2ps({...p, ...ps2obj(incl)})
}
