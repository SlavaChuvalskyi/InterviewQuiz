import Image from "next/image";

type IconProps = {
    name: string;
    size?: number;
    alt?: string;
    className?: string;
};

export function AppIcon({ name, size = 20, alt = name, className = "" }: IconProps) {
    return (
        <span
            className={`inline-block bg-current ${className}`}
            style={{
                maskImage: `url(/icons/${name}.svg)`,
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                maskSize: 'contain',
                WebkitMaskImage: `url(/icons/${name}.svg)`,
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                WebkitMaskSize: 'contain',
                width: size,
                height: size,
            }}
            role="img"
            aria-label={alt}
        />
    );
}
