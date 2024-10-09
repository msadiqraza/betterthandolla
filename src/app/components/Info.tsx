"use client";

interface InformationProps {
	info: {
		a: string;
	b: string;
	list: {
		a: string;
		b: string;
		c: string;
		d: string;
	};
	c: string;
	}
	
}
export default function Information({info}:InformationProps): JSX.Element {
	return (
		<div className="col-start-3 col-end-4 row-start-5 row-end-7 text-md font-semibold">
			<p className="mb-3">{info.a}</p>
			<p className="mb-3">{info.b}</p>
			<ul className="list-[upper-alpha] pl-6 mb-3">
				<li>{info.list.a}</li>
				<li>{info.list.b}</li>
				<li>{info.list.c}</li>
				<li>{info.list.d}</li>
			</ul>
			<p>{info.c}</p>
		</div>
	);
}
