import Link from "next/link";

interface logoProps {
  width: number;
  height: number;
}
const Logo:React.FC<logoProps> = ({
  width,
  height
}) => {
  return (
    <Link href="/">
    <img
      src="/images/logo.png"
      width={width}
      height={height}
      alt="Logo"
    />
    </Link>
  );
};

export default Logo;
