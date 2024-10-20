/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

interface ResponsiveHeaderProps {
	children: React.ReactNode;
	className?: string;
}

const ResponsiveHeader: React.FC<ResponsiveHeaderProps> = ({
	children,
	className,
}) => {
	const [fontSize, setFontSize] = useState<number>(55); // Initial font size in pixels
	const headerRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		const resizeObserver = new ResizeObserver(() =>
			checkOverflow()
		);
		if (headerRef.current) {
			resizeObserver.observe(headerRef.current);
		}

		return () => {
			if (headerRef.current) {
				resizeObserver.unobserve(
					headerRef.current
				);
			}
		};
	}, [fontSize]);

	const checkOverflow = () => {
		if (headerRef.current) {
			const element = headerRef.current;
			const isOverflowing =
				element.scrollWidth >
					element.clientWidth ||
				element.scrollHeight >
					element.clientHeight;

			if (isOverflowing && fontSize > 20) {
				setFontSize((prevSize) => prevSize - 1);
			}
		}
	};

	useEffect(() => {
		checkOverflow();
	}, [children]);

	return (
		<h2
			ref={headerRef}
			className={className}
			style={{
				fontFamily: "Helvetica, Arial, sans-serif",
				fontWeight: "normal",
				fontSize: `${fontSize}px`,
				lineHeight: `${fontSize + 10}px`,
			}}
		>
			{children}
		</h2>
	);
};

export default ResponsiveHeader;
