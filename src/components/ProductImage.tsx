import { useState } from "react";
import fallback from "@/assets/perfume-1.jpg";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
}

const ProductImage = ({ src, alt, className = "", ...rest }: Props) => {
  const [errored, setErrored] = useState(false);
  return (
    <img
      src={!src || errored ? fallback : src}
      alt={alt}
      onError={() => setErrored(true)}
      loading="lazy"
      className={`object-cover rounded-md ${className}`}
      {...rest}
    />
  );
};

export default ProductImage;
