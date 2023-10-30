import Image from "next/image";

interface logoProps {
  width: number;
  height: number;
}
const Logo:React.FC<logoProps> = ({
  width,
  height
}) => {
  return (
    <Image
      src="/images/logo.png"
      width={width}
      height={height}
      alt="Logo"
      priority
    />
  );
};

export default Logo;
