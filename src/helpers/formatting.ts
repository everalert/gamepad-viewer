const precision = 4

export const numf = (n:number, sign:boolean=false, p:number=precision) => {
	const m = 10**p
	const newNum = Math.abs(Math.floor(n*m)/m).toString().split('.')
	return `${sign?(n<0?'−':'+'):''}${newNum[0]}.${(newNum[1]||'').padEnd(p,'0')}`
}
